-- 001: Add user_id for multi-tenant data isolation
-- ⚠️ Run in Supabase SQL Editor before deploying

-- 1. Add user_id to topics_or_roles
ALTER TABLE topics_or_roles ADD COLUMN IF NOT EXISTS user_id UUID;
CREATE INDEX IF NOT EXISTS idx_topics_or_roles_user ON topics_or_roles(user_id);

-- 2. Add user_id to sessions
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS user_id UUID;
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

-- 3. Backfill existing dev data (optional — or just DELETE FROM sessions; DELETE FROM topics_or_roles;)
-- UPDATE topics_or_roles SET user_id = '<your-dev-user-uuid>' WHERE user_id IS NULL;
-- UPDATE sessions SET user_id = '<your-dev-user-uuid>' WHERE user_id IS NULL;

-- 4. Make NOT NULL after backfill
-- ALTER TABLE topics_or_roles ALTER COLUMN user_id SET NOT NULL;
-- ALTER TABLE sessions ALTER COLUMN user_id SET NOT NULL;

-- 5. Fix missing ON DELETE CASCADE
ALTER TABLE sessions DROP CONSTRAINT IF EXISTS sessions_topic_or_role_id_fkey;
ALTER TABLE sessions ADD CONSTRAINT sessions_topic_or_role_id_fkey
  FOREIGN KEY (topic_or_role_id) REFERENCES topics_or_roles(id) ON DELETE CASCADE;
