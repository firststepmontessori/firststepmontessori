import type { APIContext } from "astro";

export function getAdminIdentity(context: APIContext): string | null {
  const email = context.request.headers.get("cf-access-authenticated-user-email");
  if (email) return email;
  const hostname = new URL(context.request.url).hostname;
  if (import.meta.env.DEV && (hostname === "localhost" || hostname === "127.0.0.1")) return "local-admin@example.invalid";
  return null;
}

export function jsonError(message: string, status: number, details?: unknown): Response {
  return Response.json({ error: message, details }, { status, headers: { "Cache-Control": "no-store" } });
}
