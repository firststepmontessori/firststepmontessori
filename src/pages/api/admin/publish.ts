import type { APIRoute } from "astro";
import { getAdminIdentity, jsonError } from "../../../lib/admin";
import { getDatabase, publishDraft } from "../../../lib/db";

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
  if (!Number.isInteger(version) || version < 1) return jsonError("Invalid version", 422);
  const revision = await publishDraft(db, version, actor);
  if (!revision) return jsonError("Draft changed or this version is already published", 409);
  return Response.json({ revision }, { status: 201, headers: { "Cache-Control": "no-store" } });
};
