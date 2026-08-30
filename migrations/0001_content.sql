CREATE TABLE IF NOT EXISTS site_drafts (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  document_json TEXT NOT NULL CHECK (json_valid(document_json)),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  updated_at TEXT NOT NULL,
  updated_by TEXT NOT NULL,
  published_revision_id TEXT
);

CREATE TABLE IF NOT EXISTS site_revisions (
  id TEXT PRIMARY KEY,
  revision_no INTEGER NOT NULL UNIQUE,
  document_json TEXT NOT NULL CHECK (json_valid(document_json)),
  published_at TEXT NOT NULL,
  published_by TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_site_revisions_published_at ON site_revisions(published_at DESC);

CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  details_json TEXT NOT NULL CHECK (json_valid(details_json)),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at DESC);
