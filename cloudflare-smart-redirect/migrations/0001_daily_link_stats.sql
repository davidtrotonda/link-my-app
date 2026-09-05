CREATE TABLE IF NOT EXISTS daily_link_stats (
  owner_id TEXT NOT NULL,
  link_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  day TEXT NOT NULL,
  destination TEXT NOT NULL CHECK (destination IN ('ios', 'android', 'fallback')),
  source TEXT NOT NULL CHECK (source IN ('qr', 'written')),
  clicks INTEGER NOT NULL DEFAULT 0 CHECK (clicks >= 0),
  last_click_at INTEGER NOT NULL,
  PRIMARY KEY (link_id, day, destination, source)
);

CREATE INDEX IF NOT EXISTS daily_link_stats_owner_day
  ON daily_link_stats (owner_id, day DESC);

CREATE INDEX IF NOT EXISTS daily_link_stats_day
  ON daily_link_stats (day DESC);

CREATE TABLE IF NOT EXISTS analytics_migrations (
  id TEXT PRIMARY KEY,
  applied_at INTEGER NOT NULL,
  source_rows INTEGER NOT NULL DEFAULT 0
);
