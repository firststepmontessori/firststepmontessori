const base = process.env.ADMIN_TEST_BASE_URL || "http://127.0.0.1:4321";

async function request(path, init) {
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) }
  });
  const body = await response.json().catch(() => ({}));
  return { response, body };
}

const initial = await request("/api/admin/draft");
if (initial.response.status !== 200) throw new Error(`GET draft failed: ${initial.response.status}`);

const saved = await request("/api/admin/draft", {
  method: "PUT",
  body: JSON.stringify({ document: initial.body.document, version: initial.body.version })
});
if (saved.response.status !== 200 || saved.body.version !== initial.body.version + 1) throw new Error(`Save failed: ${saved.response.status}`);

const stale = await request("/api/admin/draft", {
  method: "PUT",
  body: JSON.stringify({ document: initial.body.document, version: initial.body.version })
});
if (stale.response.status !== 409) throw new Error(`Expected stale save 409, received ${stale.response.status}`);

const published = await request("/api/admin/publish", {
  method: "POST",
  body: JSON.stringify({ version: saved.body.version })
});
if (published.response.status !== 201) throw new Error(`Publish failed: ${published.response.status}`);

const revisions = await request("/api/admin/revisions");
if (revisions.response.status !== 200 || !revisions.body.revisions.some((item) => item.id === published.body.revision.id)) throw new Error("Published revision not listed");

const restored = await request(`/api/admin/revisions/${published.body.revision.id}/restore`, {
  method: "POST",
  body: JSON.stringify({ version: saved.body.version })
});
if (restored.response.status !== 200 || restored.body.version !== saved.body.version + 1) throw new Error(`Restore failed: ${restored.response.status}`);

console.log(`Admin flow passed: draft v${saved.body.version}, stale conflict 409, revision ${published.body.revision.revision}, restored draft v${restored.body.version}.`);
