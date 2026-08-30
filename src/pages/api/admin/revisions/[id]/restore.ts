import type { APIRoute } from "astro";
import { getAdminIdentity, jsonError } from "../../../../../lib/admin";
import { getDatabase, restoreRevision } from "../../../../../lib/db";

export const POST: APIRoute = async (context) => {
  const actor = getAdminIdentity(context);
  if (!actor) return jsonError("Authentication required", 401);
  const origin = context.request.headers.get("Origin");
  if (origin && origin !== new URL(context.request.url).origin) return jsonError("Cross-origin request rejected", 403);
  const db = getDatabase(context.locals);
  if (!db) return jsonError("D1 binding unavailable", 503);
  let body: any;
  try { body = await context.request.json(); } catch { return jsonError("Invalid JSON", 400); }
  const version = Number(body?.version);
  if (!context.params.id || !Number.isInteger(version) || version < 0) return jsonError("Invalid restore request", 422);
  const draft = await restoreRevision(db, context.params.id, version, actor);
  if (!draft) return jsonError("Revision missing or draft version conflict", 409);
  return Response.json(draft, { headers: { "Cache-Control": "no-store" } });
};
