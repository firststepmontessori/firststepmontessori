import { useMemo, useState } from "preact/hooks";
import type { SiteDocument } from "../../content/schema";
import type { RevisionSummary } from "../../lib/db";

interface Props {
  initialDocument: SiteDocument;
  initialVersion: number;
  initialRevisions: RevisionSummary[];
  actor: string;
  databaseAvailable: boolean;
}

export default function AdminEditor({ initialDocument, initialVersion, initialRevisions, actor, databaseAvailable }: Props) {
  const [document, setDocument] = useState(initialDocument);
  const [version, setVersion] = useState(initialVersion);
  const [revisions, setRevisions] = useState(initialRevisions);
  const [status, setStatus] = useState(databaseAvailable ? "Draft ready." : "D1 is not bound. The editor is read-only until local or remote D1 is configured.");
  const [busy, setBusy] = useState(false);
  const previewUrl = useMemo(() => `/?preview=draft&version=${version}`, [version]);

  const updateSettings = (key: keyof SiteDocument["settings"], value: string) => setDocument((current) => ({ ...current, settings: { ...current.settings, [key]: value } }));
  const updatePage = (page: keyof SiteDocument["pages"], key: "title" | "introduction" | "heroTitle" | "heroSummary", value: string) => setDocument((current) => ({ ...current, pages: { ...current.pages, [page]: { ...current.pages[page], [key]: value } } } as SiteDocument));
  const updateProgramme = (index: number, key: "name" | "ageRange" | "summary", value: string) => setDocument((current) => ({ ...current, programmes: current.programmes.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item) }));

  async function request(path: string, init: RequestInit): Promise<any> {
    const response = await fetch(path, { ...init, headers: { "Content-Type": "application/json", ...(init.headers || {}) } });
    const body: any = await response.json().catch(() => ({}));
    if (!response.ok) throw Object.assign(new Error(body.error || "Request failed"), { status: response.status, body });
    return body;
  }

  async function save() {
    setBusy(true); setStatus("Saving draft…");
    try {
      const body = await request("/api/admin/draft", { method: "PUT", body: JSON.stringify({ document, version }) });
      setVersion(body.version); setDocument(body.document); setStatus(`Draft v${body.version} saved.`);
    } catch (error: any) {
      setStatus(error.status === 409 ? "Someone else changed this draft. Reload before editing further." : `Could not save: ${error.message}`);
    } finally { setBusy(false); }
  }

  async function publish() {
    setBusy(true); setStatus("Publishing immutable revision…");
    try {
      const body = await request("/api/admin/publish", { method: "POST", body: JSON.stringify({ version }) });
      setRevisions((current) => [body.revision, ...current.filter((item) => item.id !== body.revision.id)]);
      setStatus(`Revision ${body.revision.revision} published.`);
    } catch (error: any) {
      setStatus(error.status === 409 ? "This draft version has already changed or been published. Save or reload first." : `Could not publish: ${error.message}`);
    } finally { setBusy(false); }
  }

  async function restore(id: string) {
    if (!confirm("Restore this published revision into the editable draft? It will not go live until you publish again.")) return;
    setBusy(true); setStatus("Restoring revision to draft…");
    try {
      const body = await request(`/api/admin/revisions/${id}/restore`, { method: "POST", body: JSON.stringify({ version }) });
      setVersion(body.version); setDocument(body.document); setStatus(`Revision restored as draft v${body.version}. Review before publishing.`);
    } catch (error: any) {
      setStatus(error.status === 409 ? "The draft changed before restore. Reload and try again." : `Could not restore: ${error.message}`);
    } finally { setBusy(false); }
  }

  return <div class="admin-shell">
    <header class="admin-header"><div><p class="section-label">Protected content editor</p><h1 style="font-size:clamp(2.2rem,5vw,4rem)">First Step content</h1><p>Signed in as {actor}</p></div><div class="button-row"><a class="button button-secondary" href={previewUrl} target="_blank">Preview draft</a><button class="button button-primary" type="button" disabled={busy || !databaseAvailable} onClick={publish}>Publish</button></div></header>
    <p class="status-message" role="status" aria-live="polite">{status}</p>
    <div class="admin-grid">
      <section class="admin-panel"><h2 style="font-size:1.8rem">Contact details</h2>
        {(["phone", "whatsapp", "email", "instagram", "address", "locality", "hours"] as const).map((key) => <div class="field"><label for={`settings-${key}`}>{key}</label>{key === "address" ? <textarea id={`settings-${key}`} value={document.settings[key]} onInput={(event) => updateSettings(key, event.currentTarget.value)} /> : <input id={`settings-${key}`} value={document.settings[key]} onInput={(event) => updateSettings(key, event.currentTarget.value)} />}</div>)}
      </section>
      <section class="admin-panel"><h2 style="font-size:1.8rem">Homepage</h2><div class="field"><label for="hero-title">Hero title</label><input id="hero-title" value={document.pages.home.heroTitle} onInput={(event) => updatePage("home", "heroTitle", event.currentTarget.value)} /></div><div class="field"><label for="hero-summary">Hero summary</label><textarea id="hero-summary" value={document.pages.home.heroSummary} onInput={(event) => updatePage("home", "heroSummary", event.currentTarget.value)} /></div><h2 style="font-size:1.8rem;margin-top:2rem">SEO defaults</h2><div class="field"><label for="seo-suffix">Title suffix</label><input id="seo-suffix" value={document.seo.titleSuffix} onInput={(event) => setDocument((current) => ({ ...current, seo: { ...current.seo, titleSuffix: event.currentTarget.value } }))} /></div><div class="field"><label for="seo-description">Default description</label><textarea id="seo-description" value={document.seo.defaultDescription} onInput={(event) => setDocument((current) => ({ ...current, seo: { ...current.seo, defaultDescription: event.currentTarget.value } }))} /></div></section>
      <section class="admin-panel admin-panel-full"><h2 style="font-size:1.8rem">Programmes</h2><div class="card-grid">{document.programmes.map((programme, index) => <div class="card"><div class="field"><label for={`programme-${index}-name`}>Name</label><input id={`programme-${index}-name`} value={programme.name} onInput={(event) => updateProgramme(index, "name", event.currentTarget.value)} /></div><div class="field"><label for={`programme-${index}-age`}>Age range</label><input id={`programme-${index}-age`} value={programme.ageRange} onInput={(event) => updateProgramme(index, "ageRange", event.currentTarget.value)} /></div><div class="field"><label for={`programme-${index}-summary`}>Summary</label><textarea id={`programme-${index}-summary`} value={programme.summary} onInput={(event) => updateProgramme(index, "summary", event.currentTarget.value)} /></div></div>)}</div></section>
      <section class="admin-panel admin-panel-full"><div class="admin-header"><div><h2 style="font-size:1.8rem">Published revisions</h2><p>Restore creates a new editable draft; it never silently changes the live site.</p></div><button class="button button-secondary" type="button" disabled={busy || !databaseAvailable} onClick={save}>Save draft v{version}</button></div>{revisions.length ? <ol class="revision-list">{revisions.map((revision) => <li class="revision-item"><span><strong>Revision {revision.revision}</strong><br /><small>{new Date(revision.publishedAt).toLocaleString()} · {revision.publishedBy}</small></span><button class="button button-secondary" type="button" disabled={busy} onClick={() => restore(revision.id)}>Restore to draft</button></li>)}</ol> : <p>No published revisions yet.</p>}</section>
    </div>
  </div>;
}
