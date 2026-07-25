// frontend/src/lib/api.ts
// AbhyasAI API client — typed interface to the backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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
  question_text: string;
  question_type: string;
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
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch chapters');
  const data = await res.json();
  return data.chapters || [];
}

export async function getSubjects(classNum: number): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/chapters/subjects?class=${classNum}`);
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rawInput, type }),
  });
  if (!res.ok) throw new Error('Failed to extract skills');
  return res.json(); // { topicOrRole, skills, meta }
}

export async function getSkills(topicOrRoleId: string) {
  const res = await fetch(`${API_URL}/api/skills/${topicOrRoleId}`);
  if (!res.ok) throw new Error('Failed to fetch skills');
  return res.json(); // { skills }
}

// ============================================================
// Sessions API
// ============================================================
export async function startSession(topicOrRoleId: string, totalQuestions: number = 5) {
  const res = await fetch(`${API_URL}/api/sessions/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topicOrRoleId, totalQuestions }),
  });
  if (!res.ok) throw new Error('Failed to start session');
  return res.json(); // { session, firstQuestion, initialRatings }
}

export async function submitAnswer(sessionId: string, answerText: string): Promise<AnswerResponse> {
  const res = await fetch(`${API_URL}/api/sessions/${sessionId}/answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answerText }),
  });
  if (!res.ok) throw new Error('Failed to submit answer');
  return res.json();
}

export async function getSession(sessionId: string) {
  const res = await fetch(`${API_URL}/api/sessions/${sessionId}`);
  if (!res.ok) throw new Error('Failed to fetch session');
  return res.json();
}

// ============================================================
// Reports API
// ============================================================
export async function generateReport(sessionId: string) {
  const res = await fetch(`${API_URL}/api/reports/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) throw new Error('Failed to generate report');
  return res.json();
}

export async function getReportHTML(sessionId: string, format: 'standard' | 'dyslexia' | 'adhd'): Promise<string> {
  const res = await fetch(`${API_URL}/api/reports/session/${sessionId}/render?format=${format}`);
  if (!res.ok) throw new Error('Failed to get report HTML');
  return res.text();
}

export function getReportPdfUrl(sessionId: string, format: string): string {
  return `${API_URL}/api/reports/session/${sessionId}/pdf?format=${format}`;
}
