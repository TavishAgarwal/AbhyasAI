import React, { useState, useRef } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router';
import { submitAnswer, transcribeAudio, type Question, type AnswerResponse } from '../../lib/api';
import { Loader2, ArrowRight, Mic, Square } from 'lucide-react';
import { ErrorState } from '../components/states/ErrorState';

export function PracticeSessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Load initial state from router state
  const initialState = location.state as {
    firstQuestion: Question;
    sessionDetails: any;
    topic: string;
  };

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(initialState?.firstQuestion || null);
  const [qIndex, setQIndex] = useState(1);
  const [totalQuestions] = useState(initialState?.sessionDetails?.totalQuestions || 5);
  const [topic] = useState(initialState?.topic || 'Practice Session');

  const [answerText, setAnswerText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFeedback, setLastFeedback] = useState<AnswerResponse | null>(null);

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  if (!initialState || !sessionId) {
    return (
      <div className="py-20">
        <ErrorState 
          title="Session State Lost"
          message="We couldn't load the active session. Please start a new one."
          actionText="Start New Session"
          actionHref="/session/new"
        />
      </div>
    );
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setIsTranscribing(true);
        try {
          const text = await transcribeAudio(audioBlob);
          setAnswerText(prev => prev ? `${prev} ${text}` : text);
        } catch (err: any) {
          setError(err.message || 'Failed to transcribe audio');
        } finally {
          setIsTranscribing(false);
          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
    } catch (err: any) {
      setError('Microphone access denied or unavailable.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!sessionId || !answerText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await submitAnswer(sessionId, currentQuestion.id, answerText);
      setLastFeedback(data);
      setAnswerText('');
      
      if (data.sessionComplete) {
        navigate(`/session/${sessionId}/report`);
      } else {
        setCurrentQuestion(data.nextQuestion);
        setQIndex(prev => prev + 1);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div className="glass-panel p-4 flex justify-between items-center bg-white/40">
        <span className="font-semibold text-[#0b1c30]">Question {qIndex} of {totalQuestions}</span>
        <span className="text-sm font-medium text-[#4f46e5] bg-[#4f46e5]/10 px-3 py-1 rounded-full">{topic}</span>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* AI Feedback block removed - results shown at the end */}

      {/* Current Question */}
      {currentQuestion && (
        <div className="glass-panel p-8 animate-slide-up bg-white/60">
          <div className="inline-block px-3 py-1 bg-[#4f46e5]/10 text-[#4f46e5] rounded-full text-[10px] font-bold mb-4 uppercase tracking-wider">
            {currentQuestion.questionType}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#0b1c30] mb-6 leading-relaxed">
            {currentQuestion.questionText}
          </h2>
          
          <div className="relative">
            <textarea
              value={answerText}
              onChange={e => setAnswerText(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full h-48 p-4 pb-14 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] outline-none resize-none mb-6 text-[#0b1c30] leading-relaxed transition-all"
              disabled={loading || isTranscribing}
            />
            
            <div className="absolute bottom-10 right-4 flex items-center gap-2">
              {isTranscribing && (
                <span className="text-xs font-medium text-[#4f46e5] flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Transcribing...
                </span>
              )}
              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="p-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition-colors flex items-center gap-1 shadow-sm"
                  title="Stop recording"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold uppercase tracking-wider pr-1">Stop</span>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  disabled={loading || isTranscribing}
                  className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
                  title="Answer with voice"
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(`/session/${sessionId}/report`)}
              className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
            >
              End Session Early
            </button>
            <button
              onClick={handleSubmitAnswer}
              disabled={loading || !answerText.trim()}
              className="primary-btn disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Evaluating
                </>
              ) : (
                <>
                  Submit Answer <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
