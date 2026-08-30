import type { APIRoute } from "astro";
import { siteDocumentSchema } from "../../../content/schema";
import { getAdminIdentity, jsonError } from "../../../lib/admin";
import { getDatabase, getDraft, saveDraft } from "../../../lib/db";

function validOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  return !origin || origin === new URL(request.url).origin;
}

export const GET: APIRoute = async (context) => {
  if (!getAdminIdentity(context)) return jsonError("Authentication required", 401);
  const db = getDatabase(context.locals);
  if (!db) return jsonError("D1 binding unavailable", 503);
  return Response.json(await getDraft(db), { headers: { "Cache-Control": "no-store" } });
};

export const PUT: APIRoute = async (context) => {
  const actor = getAdminIdentity(context);
  if (!actor) return jsonError("Authentication required", 401);
  if (!validOrigin(context.request)) return jsonError("Cross-origin request rejected", 403);
  const db = getDatabase(context.locals);
  if (!db) return jsonError("D1 binding unavailable", 503);
  let body: unknown;
  try { body = await context.request.json(); } catch { return jsonError("Invalid JSON", 400); }
  const parsed = siteDocumentSchema.safeParse((body as any)?.document);
  const version = Number((body as any)?.version);
  if (!parsed.success || !Number.isInteger(version) || version < 0) return jsonError("Invalid draft", 422, parsed.success ? undefined : parsed.error.issues);
  const saved = await saveDraft(db, parsed.data, version, actor);
  if (!saved) return jsonError("Draft version conflict", 409);
  return Response.json(saved, { headers: { "Cache-Control": "no-store" } });
};
