// frontend/src/lib/api.ts
// AbhyasAI API client — typed interface to the backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_KEY = import.meta.env.VITE_API_SECRET_KEY || '';

function apiHeaders(extra?: Record<string, string>): Record<string, string> {
  return { 'Content-Type': 'application/json', 'x-api-key': API_KEY, ...extra };
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

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

// ============================================================
// Skills API
// ============================================================
export async function extractSkills(rawInput: string, type: 'topic' | 'job_role') {
  const res = await fetch(`${API_URL}/api/skills/extract`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ rawInput, type }),
  });
  if (!res.ok) throw new Error('Failed to extract skills');
  return res.json(); // { topicOrRole, skills, meta }
}

export async function getSkills(topicOrRoleId: string) {
  const res = await fetch(`${API_URL}/api/skills/${topicOrRoleId}`, { headers: apiHeaders() });
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
  const res = await fetch(`${API_URL}/api/questions/generate`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ topicOrRoleId, count, previousScore, previousQuestions }),
  });
  if (!res.ok) throw new Error('Failed to generate questions');
  return res.json();
}

// ============================================================
// Sessions API
// ============================================================
export async function startSession(topicOrRoleId: string, totalQuestions: number = 5, questionIds?: string[]) {
  const res = await fetch(`${API_URL}/api/sessions/start`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ topicOrRoleId, totalQuestions, questionIds }),
  });
  if (!res.ok) throw new Error('Failed to start session');
  return res.json(); // { session, firstQuestion, initialRatings }
}

export async function submitAnswer(sessionId: string, questionId: string, answerText: string): Promise<AnswerResponse> {
  const res = await fetch(`${API_URL}/api/sessions/${sessionId}/answer`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ questionId, answerText }),
  });
  if (!res.ok) throw new Error('Failed to submit answer');
  return res.json();
}

export async function getSession(sessionId: string) {
  const res = await fetch(`${API_URL}/api/sessions/${sessionId}`, { headers: apiHeaders() });
  if (!res.ok) throw new Error('Failed to fetch session');
  return res.json();
}

// ============================================================
// Reports API
// ============================================================
export async function generateReport(sessionId: string) {
  const res = await fetch(`${API_URL}/api/reports/generate`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) throw new Error('Failed to generate report');
  return res.json();
}

export async function getReportHTML(sessionId: string, format: 'standard' | 'dyslexia' | 'adhd'): Promise<string> {
  const res = await fetch(`${API_URL}/api/reports/session/${sessionId}/render?format=${format}`, { headers: apiHeaders() });
  if (!res.ok) throw new Error('Failed to get report HTML');
  return res.text();
}

export function getReportPdfUrl(sessionId: string, format: string): string {
  return `${API_URL}/api/reports/session/${sessionId}/pdf?format=${format}`;
}

export function getReportDocxUrl(sessionId: string, format: string): string {
  return `${API_URL}/api/reports/session/${sessionId}/docx?format=${format}`;
}

// ============================================================
// STUBS FOR NEW ENDPOINTS (Dashboard & Settings)
// ============================================================
export async function getSessionList() {
  const res = await fetch(`${API_URL}/api/dashboard/sessions`, { headers: apiHeaders() });
  if (!res.ok) throw new Error('Failed to fetch sessions');
  return res.json();
}

export async function getDashboardStats() {
  const res = await fetch(`${API_URL}/api/dashboard/stats`, { headers: apiHeaders() });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

// ============================================================
// Audio API
// ============================================================
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  
  const headers = apiHeaders();
  // Remove Content-Type so fetch can automatically set multipart boundary
  delete (headers as any)['Content-Type'];

  const res = await fetch(`${API_URL}/api/transcribe`, {
    method: 'POST',
    headers,
    body: formData,
  });
  
  if (!res.ok) throw new Error('Transcription failed');
  const data = await res.json();
  return data.text;
}
