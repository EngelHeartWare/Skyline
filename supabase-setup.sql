-- ============================================================
-- SUPABASE SETUP FOR SKYLINE EXPLORER LEADERBOARD
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Make sure user_buildings table exists with the right columns
-- (You likely already have this, skip if so)
CREATE TABLE IF NOT EXISTS user_buildings (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wikidata_id TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'none' CHECK (status IN ('visited', 'wishlist', 'none')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, wikidata_id)
);

-- 2. Enable Row Level Security
ALTER TABLE user_buildings ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Users can read ALL rows (needed for leaderboard aggregation)
-- but can only insert/update/delete their OWN rows

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Anyone can read for leaderboard" ON user_buildings;
DROP POLICY IF EXISTS "Users manage own rows" ON user_buildings;

-- SELECT: allow all authenticated users to read all rows
-- This is safe because user_buildings only contains wikidata_id + status,
-- no sensitive personal data. The user_id is a UUID, not an email.
CREATE POLICY "Anyone can read for leaderboard"
  ON user_buildings FOR SELECT
  TO authenticated
  USING (true);

-- INSERT/UPDATE/DELETE: only own rows
CREATE POLICY "Users manage own rows"
  ON user_buildings FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. Index for faster leaderboard queries
CREATE INDEX IF NOT EXISTS idx_user_buildings_status
  ON user_buildings (status, wikidata_id)
  WHERE status != 'none';

-- 5. (Optional) If you want a materialized view for better performance
--    at scale, you can create one and refresh it periodically:
--
-- CREATE MATERIALIZED VIEW IF NOT EXISTS leaderboard_stats AS
-- SELECT
--   wikidata_id,
--   COUNT(*) FILTER (WHERE status = 'visited') AS visited_count,
--   COUNT(*) FILTER (WHERE status = 'wishlist') AS wishlist_count,
--   COUNT(*) AS total_count
-- FROM user_buildings
-- WHERE status != 'none'
-- GROUP BY wikidata_id
-- ORDER BY total_count DESC;
--
-- CREATE UNIQUE INDEX ON leaderboard_stats (wikidata_id);
--
-- -- Refresh it (run periodically via cron or Supabase Edge Function):
-- REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_stats;

-- ============================================================
-- DONE! The leaderboard should now work.
-- ============================================================
