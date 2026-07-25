const { supabase } = require('./supabaseClient');
const { sendText } = require('./whatsappService');
const { downloadAndTranscribeAudio } = require('./audioService');

// Local helper to hit our own API for sessions (simulates the frontend)
const API_URL = process.env.WORKER_API_URL;
const API_KEY = process.env.API_SECRET_KEY;
if ((!API_URL || !API_KEY) && process.env.NODE_ENV === 'production') {
  console.error('❌ WORKER_API_URL and API_SECRET_KEY are required for the coaching worker.');
  process.exit(1);
}

async function localApiCall(path, method, body, retries = 2) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `API error ${res.status}`);
    }
    return res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (retries > 0) {
      console.warn(`API call to ${path} failed, retrying... (${retries} left)`);
      await new Promise(r => setTimeout(r, 2000));
      return localApiCall(path, method, body, retries - 1);
    }
    throw err;
  }
}

async function updateSession(phone, updates, database = supabase) {
  await database.from('whatsapp_sessions').upsert({
    phone_number: phone,
    ...updates,
    last_message_at: new Date().toISOString()
  });
}

async function processWhatsAppMessage(message, {
  database = supabase,
  send = sendText,
  transcribe = downloadAndTranscribeAudio
} = {}) {
  const from = message.from;
  const messageType = message.type;
  
  let text = '';

  if (messageType === 'audio') {
    const mediaId = message.audio?.id;
    if (mediaId) {
      await send(from, 'Listening to your voice note... 🎧');
      try {
        text = await transcribe(mediaId);
      } catch (err) {
        console.error('Audio processing error:', err);
        await send(from, "Sorry, I couldn't understand that audio. Can you type it out?");
        return;
      }
    }
  } else if (messageType === 'text') {
    text = message.text?.body?.trim() || '';
  } else {
    await send(from, 'Please send a text message or a voice note!');
    return;
  }
  
  const lowerText = text.toLowerCase();

  // Load or create session
  let { data: waSession } = await database
    .from('whatsapp_sessions')
    .select('*')
    .eq('phone_number', from)
    .single();

  if (!waSession) {
    await updateSession(from, { conversation_state: 'greeting' }, database);
    waSession = { conversation_state: 'greeting' };
  }

  // Handle reset
  if (['new', 'reset', 'hi', 'hello'].includes(lowerText)) {
    await updateSession(from, { conversation_state: 'awaiting_topic', current_session_id: null }, database);
    await send(from, "Welcome to AbhyasAI Coaching! 🎯\nWhat topic or role would you like to practice today?");
    return;
  }

  const state = waSession.conversation_state || 'greeting';

  if (state === 'greeting') {
    await updateSession(from, { conversation_state: 'awaiting_topic' }, database);
    await send(from, "Welcome to AbhyasAI Coaching! 🎯\nWhat topic or role would you like to practice today?");
    return;
  }

  if (state === 'awaiting_topic') {
    await sendText(from, "Setting up your practice session... ⏳");
    try {
      // 1. Extract skills from the topic text
      const skillsRes = await localApiCall('/api/skills/extract', 'POST', {
        rawInput: text,
        type: 'topic'
      });
      const topicOrRoleId = skillsRes.topicOrRole.id;

      // 2. Generate questions
      const questionsRes = await localApiCall('/api/questions/generate', 'POST', {
        topicOrRoleId,
        count: 5
      });
      const questionIds = questionsRes.questions.map((q) => q.id);

      // 3. Start session
      const startRes = await localApiCall('/api/sessions/start', 'POST', {
        topicOrRoleId,
        totalQuestions: 5,
        questionIds
      });
      
      const sessionId = startRes.session.id;
      const firstQuestionId = startRes.firstQuestion.id;
      
      await updateSession(from, { 
        conversation_state: 'in_session',
        current_session_id: sessionId,
        current_question_id: firstQuestionId
      });
      
      const qText = startRes.firstQuestion.questionText;
      await sendText(from, `Session started!\n\n*Question 1/5:*\n${qText}`);
    } catch (err) {
      console.error('Failed to start session in worker:', err);
      await sendText(from, "Sorry, I couldn't start the session. Please try another topic.");
    }
    return;
  }

  if (state === 'in_session') {
    const sessionId = waSession.current_session_id;
    if (!sessionId) {
      await updateSession(from, { conversation_state: 'greeting' });
      await sendText(from, "Your session expired. Say 'hi' to start a new one.");
      return;
    }

    try {
      // Fetch current question index to know which question we are answering
      const { data: sessionInfo } = await supabase
        .from('sessions')
        .select('current_question_index, total_questions')
        .eq('id', sessionId)
        .single();
        
      if (!sessionInfo) {
        await sendText(from, "Session not found. Say 'hi' to start a new one.");
        return;
      }

      const questionId = waSession.current_question_id;
      if (!questionId) {
        await sendText(from, "Could not find current question. Say 'hi' to start over.");
        return;
      }

      await sendText(from, "Evaluating your answer... 🧠");

      // Submit answer via API
      const answerRes = await localApiCall(`/api/sessions/${sessionId}/answer`, 'POST', {
        questionId,
        answerText: text
      });

      // Format feedback
      const score = Math.round((answerRes.evaluation.score || 0) * 100);
      let feedback = `*Score: ${score}/100*\n\n`;
      
      if (answerRes.evaluation.strengths?.length > 0) {
        feedback += `*Strengths:*\n- ${answerRes.evaluation.strengths[0]}\n\n`;
      }
      if (answerRes.evaluation.gaps?.length > 0) {
        feedback += `*To Improve:*\n- ${answerRes.evaluation.gaps[0]}\n\n`;
      }

      if (answerRes.sessionComplete) {
        await updateSession(from, { conversation_state: 'greeting', current_session_id: null, current_question_id: null });
        feedback += "🎉 *Session Complete!*\nGreat job! Say 'hi' to start a new practice session.";
        await sendText(from, feedback);
      } else {
        const nextQIndex = sessionInfo.current_question_index + 1;
        const total = sessionInfo.total_questions;
        const nextQText = answerRes.nextQuestion.questionText;
        
        await updateSession(from, { current_question_id: answerRes.nextQuestion.id });
        
        feedback += `*Question ${nextQIndex + 1}/${total}:*\n${nextQText}`;
        await sendText(from, feedback);
      }
    } catch (err) {
      console.error(err);
      await sendText(from, "Sorry, I had trouble processing your answer. Please try again.");
    }
    return;
  }
}

module.exports = { processWhatsAppMessage };
