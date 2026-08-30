import { describe, expect, it } from "vitest";
import { defaultSiteDocument } from "./default-site";
import { siteDocumentSchema } from "./schema";

describe("siteDocumentSchema", () => {
  it("accepts the repository fallback content", () => {
    expect(siteDocumentSchema.parse(defaultSiteDocument)).toEqual(defaultSiteDocument);
  });

  it("rejects arbitrary extra content and invalid email", () => {
    const candidate = structuredClone(defaultSiteDocument) as any;
    candidate.settings.email = "not-an-email";
    expect(siteDocumentSchema.safeParse(candidate).success).toBe(false);
  });

  it("enforces the four approved programme identifiers", () => {
    const candidate = structuredClone(defaultSiteDocument) as any;
    candidate.programmes.pop();
    expect(siteDocumentSchema.safeParse(candidate).success).toBe(false);
  });
});
