const request = require('supertest');
const app = require('../server');
const { supabase } = require('../services/supabaseClient');

describe('Core Loop Integration', () => {
  let topicOrRoleId;
  let questionIds = [];
  let sessionId;
  let firstQuestionId;
  
  // Set API key for requests
  const API_KEY = process.env.API_SECRET_KEY || 'test-secret';
  const apiHeaders = { 'x-api-key': API_KEY };

  beforeAll(async () => {
    // Note: This relies on Supabase being connected.
  });

  afterAll(async () => {
    // Cleanup generated data
    if (sessionId) {
      await supabase.from('answers').delete().eq('session_id', sessionId);
      await supabase.from('skill_ratings').delete().eq('session_id', sessionId);
      await supabase.from('sessions').delete().eq('id', sessionId);
    }
    if (questionIds.length > 0) {
      await supabase.from('question_skill_map').delete().in('question_id', questionIds);
      await supabase.from('questions').delete().in('id', questionIds);
    }
    if (topicOrRoleId) {
      await supabase.from('skills').delete().eq('topic_or_role_id', topicOrRoleId);
      await supabase.from('topics_roles').delete().eq('id', topicOrRoleId);
    }
  });

  it('should extract skills from a topic', async () => {
    const res = await request(app)
      .post('/api/skills/extract')
      .set(apiHeaders)
      .send({ rawInput: 'React Developer for Integration Test', type: 'job_role' });

    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('topicOrRole');
    expect(res.body).toHaveProperty('skills');
    expect(res.body.skills.length).toBeGreaterThan(0);
    
    topicOrRoleId = res.body.topicOrRole.id;
  }, 30000); // 30s timeout for LLM

  it('should generate questions', async () => {
    expect(topicOrRoleId).toBeDefined();
    
    const res = await request(app)
      .post('/api/questions/generate')
      .set(apiHeaders)
      .send({ topicOrRoleId, count: 3 });

    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('questions');
    expect(res.body.questions.length).toBeGreaterThan(0);
    
    questionIds = res.body.questions.map(q => q.id);
  }, 60000); // 60s timeout for LLM

  it('should start a session', async () => {
    expect(topicOrRoleId).toBeDefined();
    expect(questionIds.length).toBeGreaterThan(0);

    const res = await request(app)
      .post('/api/sessions/start')
      .set(apiHeaders)
      .send({ topicOrRoleId, totalQuestions: 3, questionIds });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('session');
    expect(res.body).toHaveProperty('firstQuestion');
    expect(res.body).toHaveProperty('skillRatings');
    
    sessionId = res.body.session.id;
    firstQuestionId = res.body.firstQuestion.id;
    
    // Check initial skill ratings are created
    const { data: initialRatings } = await supabase
      .from('skill_ratings')
      .select('*')
      .eq('session_id', sessionId);
      
    expect(initialRatings.length).toBeGreaterThan(0);
  });

  it('should process an answer, evaluate, and update ratings', async () => {
    expect(sessionId).toBeDefined();
    expect(firstQuestionId).toBeDefined();
    
    // First, verify initial difficulty rating
    const { data: initialQuestion } = await supabase
      .from('questions')
      .select('difficulty_rating')
      .eq('id', firstQuestionId)
      .single();

    const res = await request(app)
      .post(`/api/sessions/${sessionId}/answer`)
      .set(apiHeaders)
      .send({ questionId: firstQuestionId, answerText: 'React uses a virtual DOM for efficient rendering and state management.' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('evaluation');
    expect(res.body).toHaveProperty('eloUpdates');
    
    // Verify answer row exists
    const { data: answerRow } = await supabase
      .from('answers')
      .select('*')
      .eq('session_id', sessionId)
      .eq('question_id', firstQuestionId)
      .single();
      
    expect(answerRow).toBeDefined();
    expect(answerRow.score).toBe(res.body.evaluation.score);
    
    // Verify question difficulty changed
    const { data: updatedQuestion } = await supabase
      .from('questions')
      .select('difficulty_rating')
      .eq('id', firstQuestionId)
      .single();
      
    expect(updatedQuestion.difficulty_rating).not.toBe(initialQuestion.difficulty_rating);
    
    // Should have nextQuestion or sessionComplete
    if (!res.body.sessionComplete) {
      expect(res.body).toHaveProperty('nextQuestion');
      expect(res.body.nextQuestion).not.toBeNull();
    }
  }, 30000); // 30s timeout for LLM
});
