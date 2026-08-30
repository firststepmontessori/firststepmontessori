import { defaultSiteDocument } from "../content/default-site";
import { siteDocumentSchema, type SiteDocument } from "../content/schema";
import { env } from "cloudflare:workers";

export interface DraftRecord {
  document: SiteDocument;
  version: number;
  updatedAt: string;
  updatedBy: string;
  publishedRevisionId: string | null;
}

export interface RevisionSummary {
  id: string;
  revision: number;
  publishedAt: string;
  publishedBy: string;
}

interface DraftRow {
  document_json: string;
  version: number;
  updated_at: string;
  updated_by: string;
  published_revision_id: string | null;
}

function parseDocument(value: string): SiteDocument {
  return siteDocumentSchema.parse(JSON.parse(value));
}

export function getDatabase(_locals?: App.Locals): D1Database | undefined {
  return (env as CloudflareEnv).DB;
}

export async function getPublishedDocument(db?: D1Database): Promise<SiteDocument> {
  if (!db) return defaultSiteDocument;
  try {
    const row = await db.prepare(
      "SELECT document_json FROM site_revisions ORDER BY revision_no DESC LIMIT 1"
    ).first<{ document_json: string }>();
    return row ? parseDocument(row.document_json) : defaultSiteDocument;
  } catch (error) {
    if (import.meta.env.DEV && String(error).includes("no such table")) return defaultSiteDocument;
    throw error;
  }
}

export async function getDraft(db?: D1Database): Promise<DraftRecord> {
  if (!db) {
    return { document: defaultSiteDocument, version: 0, updatedAt: new Date(0).toISOString(), updatedBy: "local fallback", publishedRevisionId: null };
  }
  let row: DraftRow | null;
  try {
    row = await db.prepare(
      "SELECT document_json, version, updated_at, updated_by, published_revision_id FROM site_drafts WHERE id = 1"
    ).first<DraftRow>();
  } catch (error) {
    if (import.meta.env.DEV && String(error).includes("no such table")) {
      return { document: defaultSiteDocument, version: 0, updatedAt: new Date(0).toISOString(), updatedBy: "unmigrated local database", publishedRevisionId: null };
    }
    throw error;
  }
  if (!row) {
    return { document: defaultSiteDocument, version: 0, updatedAt: new Date(0).toISOString(), updatedBy: "seed", publishedRevisionId: null };
  }
  return {
    document: parseDocument(row.document_json),
    version: row.version,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
    publishedRevisionId: row.published_revision_id
  };
}

export async function saveDraft(db: D1Database, document: SiteDocument, expectedVersion: number, actor: string): Promise<DraftRecord | null> {
  const now = new Date().toISOString();
  const json = JSON.stringify(siteDocumentSchema.parse(document));
  if (expectedVersion === 0) {
    const result = await db.prepare(
      "INSERT OR IGNORE INTO site_drafts (id, document_json, version, updated_at, updated_by) VALUES (1, ?1, 1, ?2, ?3)"
    ).bind(json, now, actor).run();
    if (!result.meta.changes) return null;
  } else {
    const result = await db.prepare(
      "UPDATE site_drafts SET document_json = ?1, version = version + 1, updated_at = ?2, updated_by = ?3 WHERE id = 1 AND version = ?4"
    ).bind(json, now, actor, expectedVersion).run();
    if (!result.meta.changes) return null;
  }
  await writeAudit(db, actor, "draft.saved", { expectedVersion });
  return getDraft(db);
}

export async function publishDraft(db: D1Database, expectedVersion: number, actor: string): Promise<RevisionSummary | null> {
  const draft = await getDraft(db);
  if (draft.version !== expectedVersion) return null;
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  try {
    await db.batch([
      db.prepare("INSERT INTO site_revisions (id, revision_no, document_json, published_at, published_by) VALUES (?1, ?2, ?3, ?4, ?5)")
        .bind(id, draft.version, JSON.stringify(draft.document), now, actor),
      db.prepare("UPDATE site_drafts SET published_revision_id = ?1 WHERE id = 1 AND version = ?2").bind(id, expectedVersion),
      db.prepare("INSERT INTO audit_log (id, actor, action, details_json, created_at) VALUES (?1, ?2, ?3, ?4, ?5)")
        .bind(crypto.randomUUID(), actor, "revision.published", JSON.stringify({ id, revision: draft.version }), now)
    ]);
  } catch (error) {
    if (String(error).includes("UNIQUE")) return null;
    throw error;
  }
  return { id, revision: draft.version, publishedAt: now, publishedBy: actor };
}

export async function listRevisions(db: D1Database): Promise<RevisionSummary[]> {
  const result = await db.prepare(
    "SELECT id, revision_no, published_at, published_by FROM site_revisions ORDER BY revision_no DESC LIMIT 50"
  ).all<{ id: string; revision_no: number; published_at: string; published_by: string }>();
  return result.results.map((row) => ({ id: row.id, revision: row.revision_no, publishedAt: row.published_at, publishedBy: row.published_by }));
}

export async function restoreRevision(db: D1Database, id: string, expectedVersion: number, actor: string): Promise<DraftRecord | null> {
  const revision = await db.prepare("SELECT document_json FROM site_revisions WHERE id = ?1").bind(id).first<{ document_json: string }>();
  if (!revision) return null;
  const document = parseDocument(revision.document_json);
  const saved = await saveDraft(db, document, expectedVersion, actor);
  if (saved) await writeAudit(db, actor, "revision.restored_to_draft", { id, newVersion: saved.version });
  return saved;
}

async function writeAudit(db: D1Database, actor: string, action: string, details: unknown): Promise<void> {
  await db.prepare("INSERT INTO audit_log (id, actor, action, details_json, created_at) VALUES (?1, ?2, ?3, ?4, ?5)")
    .bind(crypto.randomUUID(), actor, action, JSON.stringify(details), new Date().toISOString()).run();
}
