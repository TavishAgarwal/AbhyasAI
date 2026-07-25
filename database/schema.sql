-- ============================================================
-- AbhyasAI — Complete Database Schema
-- Run this entire file in the Supabase SQL editor to set up
-- a fresh database for the project.
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Table 1: chapters
-- Stores pre-processed NCERT chapter content.
-- ============================================================
CREATE TABLE IF NOT EXISTS chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_num INTEGER NOT NULL CHECK (class_num BETWEEN 1 AND 10),
  subject VARCHAR(50) NOT NULL,
  chapter_num INTEGER NOT NULL CHECK (chapter_num > 0),
  chapter_title VARCHAR(200) NOT NULL,
  language VARCHAR(20) DEFAULT 'english',
  content_json JSONB NOT NULL,
  learning_objectives TEXT[],
  word_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(class_num, subject, chapter_num, language)
);

CREATE INDEX IF NOT EXISTS idx_chapters_class_subject
  ON chapters(class_num, subject);
CREATE INDEX IF NOT EXISTS idx_chapters_language
  ON chapters(language);

-- ============================================================
-- Table 2: generation_jobs
-- Tracks every generation request for caching and analytics.
-- ============================================================
CREATE TABLE IF NOT EXISTS generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
  source_type VARCHAR(20) NOT NULL CHECK (source_type IN ('library', 'upload', 'camera')),
  versions_requested TEXT[] NOT NULL,
  language VARCHAR(20) DEFAULT 'english',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'done', 'failed', 'expired')),
  standard_file_url TEXT,
  dyslexia_file_url TEXT,
  adhd_file_url TEXT,
  standard_docx_url TEXT,
  dyslexia_docx_url TEXT,
  adhd_docx_url TEXT,
  quality_score JSONB,
  generation_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_generation_jobs_status
  ON generation_jobs(status);
CREATE INDEX IF NOT EXISTS idx_generation_jobs_expires
  ON generation_jobs(expires_at);
CREATE INDEX IF NOT EXISTS idx_generation_jobs_created
  ON generation_jobs(created_at);



-- ============================================================
-- Table 4: topics_or_roles
-- Stores topics or job roles submitted by learners.
-- ============================================================
CREATE TABLE IF NOT EXISTS topics_or_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL CHECK (type IN ('topic', 'job_role')),
  raw_input TEXT NOT NULL,
  created_by UUID,
  user_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_topics_or_roles_type
  ON topics_or_roles(type);
CREATE INDEX IF NOT EXISTS idx_topics_or_roles_created
  ON topics_or_roles(created_at);
CREATE INDEX IF NOT EXISTS idx_topics_or_roles_user
  ON topics_or_roles(user_id);

-- ============================================================
-- Table 5: skills
-- Each skill extracted from a topic or job role, tagged with
-- a category (technical or behavioral).
-- ============================================================
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_or_role_id UUID NOT NULL REFERENCES topics_or_roles(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(20) NOT NULL CHECK (category IN ('technical', 'behavioral')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(topic_or_role_id, name)
);

CREATE INDEX IF NOT EXISTS idx_skills_topic
  ON skills(topic_or_role_id);
CREATE INDEX IF NOT EXISTS idx_skills_category
  ON skills(category);

-- ============================================================
-- Table 6: questions
-- Practice questions generated for a topic/role, each with an
-- Elo difficulty rating (β_i).
-- ============================================================
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_or_role_id UUID NOT NULL REFERENCES topics_or_roles(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('technical', 'behavioral')),
  difficulty_level VARCHAR(10) DEFAULT 'medium' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  difficulty_rating FLOAT DEFAULT 0.0,
  expected_answer_points JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_topic
  ON questions(topic_or_role_id);
CREATE INDEX IF NOT EXISTS idx_questions_type
  ON questions(question_type);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty
  ON questions(difficulty_rating);

-- ============================================================
-- Table 7: question_skill_map (Q-matrix)
-- Maps each question to the skill(s) it tests, with a weight
-- indicating how strongly it tests that skill (0.0–1.0).
-- ============================================================
CREATE TABLE IF NOT EXISTS question_skill_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  weight FLOAT DEFAULT 1.0 CHECK (weight >= 0.0 AND weight <= 1.0),
  UNIQUE(question_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_qsm_question
  ON question_skill_map(question_id);
CREATE INDEX IF NOT EXISTS idx_qsm_skill
  ON question_skill_map(skill_id);

-- ============================================================
-- Table 8: sessions
-- A practice session tying a learner to a topic.
-- ============================================================
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_or_role_id UUID NOT NULL REFERENCES topics_or_roles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  current_question_index INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 10,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sessions_topic
  ON sessions(topic_or_role_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status
  ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_sessions_user
  ON sessions(user_id);

-- ============================================================
-- Table 9: skill_ratings
-- Per-skill Elo rating (θ_u) for a learner in a session.
-- ============================================================
CREATE TABLE IF NOT EXISTS skill_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id),
  rating FLOAT DEFAULT 0.0,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(session_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_skill_ratings_session
  ON skill_ratings(session_id);
CREATE INDEX IF NOT EXISTS idx_skill_ratings_skill
  ON skill_ratings(skill_id);

-- ============================================================
-- Table 10: answers
-- Every submitted answer and its AI evaluation + Elo updates.
-- ============================================================
CREATE TABLE IF NOT EXISTS answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  score FLOAT CHECK (score >= 0.0 AND score <= 1.0),
  evaluation JSONB DEFAULT '{}'::jsonb,
  elo_updates JSONB DEFAULT '{}'::jsonb,
  question_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_answers_session
  ON answers(session_id);
CREATE INDEX IF NOT EXISTS idx_answers_question
  ON answers(question_id);

-- ============================================================
-- Table 11: reports
-- Synthesized end-of-session reports in JSON format.
-- ============================================================
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL UNIQUE REFERENCES sessions(id) ON DELETE CASCADE,
  report_json JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_session
  ON reports(session_id);

-- ============================================================
-- Table 11: whatsapp_sessions
-- WhatsApp conversation state per phone number.
-- ============================================================
CREATE TABLE IF NOT EXISTS whatsapp_sessions (
  phone_number VARCHAR(20) PRIMARY KEY,
  conversation_state VARCHAR(50) DEFAULT 'greeting',
  current_session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
  current_question_id UUID REFERENCES questions(id) ON DELETE SET NULL,
  last_message_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_whatsapp_sessions_state
  ON whatsapp_sessions(conversation_state);
CREATE INDEX IF NOT EXISTS idx_whatsapp_sessions_last_message
  ON whatsapp_sessions(last_message_at);

-- ============================================================
-- Row Level Security
-- The browser uses Supabase Auth only; application data is accessed through
-- the Railway backend's service-role client, which bypasses these policies.
-- This blocks direct anon/authenticated table access by default.
-- ============================================================
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics_or_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_skill_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_sessions ENABLE ROW LEVEL SECURITY;

-- Create reports bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', false) ON CONFLICT (id) DO NOTHING;

-- Policies for service role (optional as service role bypasses RLS, but good practice)
-- No anon/authenticated access is needed since the backend downloads it using service role, or signs the URL.
