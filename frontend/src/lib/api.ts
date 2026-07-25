// frontend/src/lib/api.ts
// AbhyasAI API client — typed interface to the backend

import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  console.error('FATAL: VITE_API_URL is not set. API calls will fail.');
}

async function apiHeaders(extra?: Record<string, string>): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Content-Type': 'application/json',
    ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    ...extra,
  };
}

// ============================================================
// Types
// ============================================================
export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'behavioral';
}

export interface Session {
  id: string;
  status: string;
  current_question_index: number;
  total_questions: number;
}

export interface Question {
  id: string;
  questionText: string;
  questionType: string;
}

export interface AnswerResult {
  score: number;
  strengths: string[];
  gaps: string[];
  resources: string[];
}

export interface EloUpdate {
  skillId: string;
  skillName: string;
  oldRating: number;
  newRating: number;
  delta: number;
}

export interface AnswerResponse {
  evaluation: AnswerResult;
  eloUpdates: EloUpdate[];
  nextQuestion: Question | null;
  sessionComplete: boolean;
}

// ============================================================
// API Functions
// ============================================================

const DEFAULT_TIMEOUT_MS = 30000;

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs: number = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(id);
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

// ============================================================
// Skills API
// ============================================================
export async function extractSkills(rawInput: string, type: 'topic' | 'job_role') {
  const res = await fetchWithTimeout(`${API_URL}/api/skills/extract`, {
    method: 'POST',
    headers: await apiHeaders(),
    body: JSON.stringify({ rawInput, type }),
  });
  if (!res.ok) throw new Error('Failed to extract skills');
  return res.json(); // { topicOrRole, skills, meta }
}

export async function getSkills(topicOrRoleId: string) {
  const res = await fetchWithTimeout(`${API_URL}/api/skills/${topicOrRoleId}`, { headers: await apiHeaders() });
  if (!res.ok) throw new Error('Failed to fetch skills');
  return res.json(); // { skills }
}

// ============================================================
// Questions API
// ============================================================
export async function generateQuestions(
  topicOrRoleId: string, 
  count: number = 5,
  previousScore?: number,
  previousQuestions?: string[]
) {
  const res = await fetchWithTimeout(`${API_URL}/api/questions/generate`, {
    method: 'POST',
    headers: await apiHeaders(),
    body: JSON.stringify({ topicOrRoleId, count, previousScore, previousQuestions }),
  });
  if (!res.ok) throw new Error('Failed to generate questions');
  return res.json();
}

// ============================================================
// Sessions API
// ============================================================
export async function startSession(topicOrRoleId: string, totalQuestions: number = 5, questionIds?: string[]) {
  const res = await fetchWithTimeout(`${API_URL}/api/sessions/start`, {
    method: 'POST',
    headers: await apiHeaders(),
    body: JSON.stringify({ topicOrRoleId, totalQuestions, questionIds }),
  });
  if (!res.ok) throw new Error('Failed to start session');
  return res.json(); // { session, firstQuestion, initialRatings }
}

export async function submitAnswer(sessionId: string, questionId: string, answerText: string): Promise<AnswerResponse> {
  const res = await fetchWithTimeout(`${API_URL}/api/sessions/${sessionId}/answer`, {
    method: 'POST',
    headers: await apiHeaders(),
    body: JSON.stringify({ questionId, answerText }),
  });
  if (!res.ok) throw new Error('Failed to submit answer');
  return res.json();
}

export async function getSession(sessionId: string) {
  const res = await fetchWithTimeout(`${API_URL}/api/sessions/${sessionId}`, { headers: await apiHeaders() });
  if (!res.ok) throw new Error('Failed to fetch session');
  return res.json();
}

// ============================================================
// Reports API
// ============================================================
export async function generateReport(sessionId: string) {
  const res = await fetchWithTimeout(`${API_URL}/api/reports/generate`, {
    method: 'POST',
    headers: await apiHeaders(),
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) throw new Error('Failed to generate report');
  return res.json();
}

export async function getReportHTML(sessionId: string, format: 'standard' | 'dyslexia' | 'adhd'): Promise<string> {
  const res = await fetchWithTimeout(`${API_URL}/api/reports/session/${sessionId}/render?format=${format}`, { headers: await apiHeaders() });
  if (!res.ok) throw new Error('Failed to get report HTML');
  return res.text();
}

export async function downloadReport(sessionId: string, format: string, type: 'pdf' | 'docx') {
  const reqRes = await fetchWithTimeout(`${API_URL}/api/reports/session/${sessionId}/${type}?format=${format}`, {
    method: 'POST',
    headers: await apiHeaders(),
  });
  if (!reqRes.ok) throw new Error(`Failed to request ${type.toUpperCase()} report`);
  
  const reqData = await reqRes.json();
  let { jobId, status } = reqData;
  let url = reqData.url;

  while (status === 'processing' && jobId) {
    // Poll every 3 seconds
    await new Promise(r => setTimeout(r, 3000));
    const pollRes = await fetchWithTimeout(`${API_URL}/api/reports/job/${jobId}`, {
      headers: await apiHeaders(),
    });
    if (!pollRes.ok) throw new Error('Failed to check job status');
    
    const pollData = await pollRes.json();
    status = pollData.status;
    url = pollData.url;
    
    if (status === 'failed') {
      throw new Error(pollData.error || 'Document generation failed');
    }
  }

  if (url) {
    const fileRes = await fetch(url);
    const blobUrl = URL.createObjectURL(await fileRes.blob());
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `abhyasai-report.${type}`;
    link.click();
    URL.revokeObjectURL(blobUrl);
  }
}

// ============================================================
// STUBS FOR NEW ENDPOINTS (Dashboard & Settings)
// ============================================================
export async function getSessionList() {
  const res = await fetchWithTimeout(`${API_URL}/api/dashboard/sessions`, { headers: await apiHeaders() });
  if (!res.ok) throw new Error('Failed to fetch sessions');
  return res.json();
}

export async function getDashboardStats() {
  const res = await fetchWithTimeout(`${API_URL}/api/dashboard/stats`, { headers: await apiHeaders() });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

// ============================================================
// Audio API
// ============================================================
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  
  const headers = await apiHeaders();
  // Remove Content-Type so fetch can automatically set multipart boundary
  delete (headers as any)['Content-Type'];

  const res = await fetchWithTimeout(`${API_URL}/api/transcribe`, {
    method: 'POST',
    headers,
    body: formData,
  });
  
  if (!res.ok) throw new Error('Transcription failed');
  const data = await res.json();
  return data.text;
}
