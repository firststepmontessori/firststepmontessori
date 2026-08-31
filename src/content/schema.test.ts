import { describe, expect, it } from "vitest";
import { siteDocumentSchema } from "./schema";

const validDocument = {
  settings: {
    schoolName: "First Step Montessori",
    shortName: "First Step",
    phone: "+91 97310 02324",
    whatsapp: "919731002324",
    email: "school@example.com",
    instagram: "first_step_montessori",
    address: "Vidyaranyapura, Bangalore 560097",
    locality: "Vidyaranyapura, North Bangalore",
    hours: "Daycare: 9:00 AM–5:00 PM",
    mapUrl: "https://example.com/map"
  },
  pages: Object.fromEntries(["home", "about", "approach", "programmes", "daycare", "admissions"].map((key) => [key, key === "home"
    ? { heroTitle: "A thoughtful first step", heroSummary: "A prepared learning environment." }
    : { title: "Page title", introduction: "Page introduction." }
  ])),
  programmes: ["buds", "caterpillar", "cocoon", "butterfly"].map((id) => ({ id, name: id, ageRange: "1–5 years", summary: "Programme summary." })),
  announcements: [],
  seo: { titleSuffix: "First Step Montessori", defaultDescription: "Montessori school in Vidyaranyapura.", localityKeywords: [] }
};

describe("siteDocumentSchema", () => {
  it("accepts a complete site document", () => {
    expect(siteDocumentSchema.safeParse(validDocument).success).toBe(true);
  });

  it("rejects invalid contact data", () => {
    const candidate = structuredClone(validDocument);
    candidate.settings.email = "not-an-email";
    expect(siteDocumentSchema.safeParse(candidate).success).toBe(false);
  });

  it("enforces the four approved programme identifiers", () => {
    const candidate = structuredClone(validDocument);
    candidate.programmes.pop();
    expect(siteDocumentSchema.safeParse(candidate).success).toBe(false);
  });
});
