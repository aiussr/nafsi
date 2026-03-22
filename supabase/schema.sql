-- WarScope Social Features — Supabase Database Schema
-- Run this in the Supabase SQL Editor to set up all tables
--
-- SETUP STEPS:
-- 1. Create a Supabase project at https://supabase.com
-- 2. Run this SQL in the SQL Editor
-- 3. Enable Twitter/X provider in Authentication > Providers
--    - Get API Key + Secret from https://developer.twitter.com
--    - Set callback URL to: https://YOUR_PROJECT.supabase.co/auth/v1/callback
-- 4. Copy project URL and anon key to .env.local:
--    VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
--    VITE_SUPABASE_ANON_KEY=your_anon_key_here

-- User profiles (auto-created on first login)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  provider TEXT DEFAULT 'twitter',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Comments on events or general discussions
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  event_id TEXT,
  discussion_id UUID,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (length(content) <= 2000),
  sentiment_score REAL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Comment votes (upvote/downvote)
CREATE TABLE IF NOT EXISTS comment_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  vote SMALLINT NOT NULL CHECK (vote IN (-1, 1)),
  UNIQUE(comment_id, user_id)
);

-- Discussion threads
CREATE TABLE IF NOT EXISTS discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL CHECK (length(title) <= 200),
  content TEXT CHECK (length(content) <= 5000),
  category TEXT NOT NULL DEFAULT 'general',
  pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Polls
CREATE TABLE IF NOT EXISTS polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL CHECK (length(question) <= 300),
  options JSONB NOT NULL,
  category TEXT DEFAULT 'general',
  closes_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Poll votes
CREATE TABLE IF NOT EXISTS poll_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  option_index INTEGER NOT NULL,
  UNIQUE(poll_id, user_id)
);

-- Page view analytics
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- User feedback
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  page TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT CHECK (length(comment) <= 1000),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_comments_event_id ON comments(event_id);
CREATE INDEX IF NOT EXISTS idx_comments_discussion_id ON comments(discussion_id);
CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views(page);
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX IF NOT EXISTS idx_feedback_page ON feedback(page);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, owner write
CREATE POLICY "Public profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Comments: public read, auth insert, owner update/delete
CREATE POLICY "Public comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Auth users insert comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners update comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Owners delete comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Comment votes
CREATE POLICY "Public comment votes" ON comment_votes FOR SELECT USING (true);
CREATE POLICY "Auth vote on comments" ON comment_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owner remove comment vote" ON comment_votes FOR DELETE USING (auth.uid() = user_id);

-- Discussions
CREATE POLICY "Public discussions" ON discussions FOR SELECT USING (true);
CREATE POLICY "Auth create discussion" ON discussions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owner update discussion" ON discussions FOR UPDATE USING (auth.uid() = user_id);

-- Polls
CREATE POLICY "Public polls" ON polls FOR SELECT USING (true);
CREATE POLICY "Auth create poll" ON polls FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Poll votes
CREATE POLICY "Public poll votes" ON poll_votes FOR SELECT USING (true);
CREATE POLICY "Auth vote on poll" ON poll_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owner remove poll vote" ON poll_votes FOR DELETE USING (auth.uid() = user_id);

-- Page views: anyone can insert, public read
CREATE POLICY "Anyone inserts page views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read page views" ON page_views FOR SELECT USING (true);

-- Feedback: anyone can insert, public read
CREATE POLICY "Anyone inserts feedback" ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read feedback" ON feedback FOR SELECT USING (true);

-- Enable Realtime for comments
ALTER PUBLICATION supabase_realtime ADD TABLE comments;
