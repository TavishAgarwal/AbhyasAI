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
export interface Chapter {
  id: string;
  class_num: number;
  subject: string;
  chapter_num: number;
  chapter_title: string;
  language: string;
  learning_objectives: string[];
  word_count: number;
}

export interface VersionResult {
  html: string | null;
  pdfUrl: string | null;
  docxUrl: string | null;
  fidelityScore?: number;
  flagged?: boolean;
  flaggedSections?: { version: string; section: string; reason: string; severity: string }[];
  unavailable?: boolean;
}

export interface QualityReport {
  standard_fidelity: number;
  dyslexia_fidelity: number;
  adhd_fidelity: number;
  flagged_sections: { version: string; section: string; reason: string; severity: string }[];
  all_objectives_verified: boolean;
  objectives_covered: number;
  objectives_total: number;
}

export interface GenerateResponse {
  jobId: string;
  status: string;
  generationTimeMs: number;
  versions: Record<string, VersionResult>;
  qualityReport: QualityReport;
  chapterMeta: { class: number; subject: string; chapterNum: number; title: string };
  fromCache: boolean;
}

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

export async function getChapters(params?: {
  classNum?: number;
  subject?: string;
  language?: string;
}): Promise<Chapter[]> {
  const searchParams = new URLSearchParams();
  if (params?.classNum) searchParams.set('class', String(params.classNum));
  if (params?.subject) searchParams.set('subject', params.subject);
  if (params?.language) searchParams.set('language', params.language);

  const url = `${API_URL}/api/chapters?${searchParams.toString()}`;
  const res = await fetch(url, { headers: apiHeaders() });
  if (!res.ok) throw new Error('Failed to fetch chapters');
  const data = await res.json();
  return data.chapters || [];
}

export async function getSubjects(classNum: number): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/chapters/subjects?class=${classNum}`, { headers: apiHeaders() });
  if (!res.ok) throw new Error('Failed to fetch subjects');
  const data = await res.json();
  return data.subjects || [];
}

export async function generateWorksheet(params: {
  source: 'library' | 'upload' | 'camera';
  chapterId?: string;
  language: string;
  versions: string[];
  files?: File[];
}): Promise<GenerateResponse> {
  const formData = new FormData();
  formData.append('source', params.source);
  formData.append('language', params.language);
  formData.append('versions', JSON.stringify(params.versions));

  if (params.chapterId) {
    formData.append('chapterId', params.chapterId);
  }

  if (params.files) {
    for (const file of params.files) {
      formData.append('files', file);
    }
  }

  const res = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: { 'x-api-key': API_KEY },
    body: formData
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Generation failed' }));
    throw new Error(err.error || 'Generation failed');
  }

  return res.json();
}

export function getDownloadUrl(jobId: string, version: string, format: 'pdf' | 'docx'): string {
  return `${API_URL}/api/download/${jobId}?version=${version}&format=${format}`;
}

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
// Study Material API
// ============================================================
export async function generateStudyMaterial(sessionId: string, format: string = 'standard'): Promise<string> {
  const res = await fetch(`${API_URL}/api/study-material/generate`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ sessionId, format }),
  });
  if (!res.ok) throw new Error('Failed to generate study material');
  return res.text();
}

export async function downloadStudyMaterial(sessionId: string, format: string, topicName: string, type: 'pdf' | 'docx') {
  const html = await generateStudyMaterial(sessionId, format);
  
  const res = await fetch(`${API_URL}/api/study-material/download/${type}`, {
    method: 'POST',
    headers: {
      ...apiHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ html, format, topic: topicName })
  });
  
  if (!res.ok) throw new Error(`Failed to download ${type.toUpperCase()}`);
  return res.blob();
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
