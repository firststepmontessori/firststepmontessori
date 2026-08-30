import type { APIRoute } from "astro";
import { getAdminIdentity, jsonError } from "../../../../lib/admin";
import { getDatabase, listRevisions } from "../../../../lib/db";

export const GET: APIRoute = async (context) => {
  if (!getAdminIdentity(context)) return jsonError("Authentication required", 401);
  const db = getDatabase(context.locals);
  if (!db) return jsonError("D1 binding unavailable", 503);
  return Response.json({ revisions: await listRevisions(db) }, { headers: { "Cache-Control": "no-store" } });
};
