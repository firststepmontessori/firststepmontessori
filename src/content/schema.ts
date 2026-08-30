import { z } from "zod";

const boundedText = (max: number) => z.string().trim().min(1).max(max);

export const programmeSchema = z.object({
  id: z.enum(["buds", "caterpillar", "cocoon", "butterfly"]),
  name: boundedText(40),
  ageRange: boundedText(40),
  summary: boundedText(240)
});

export const siteDocumentSchema = z.object({
  settings: z.object({
    schoolName: boundedText(100),
    shortName: boundedText(60),
    phone: boundedText(30),
    whatsapp: boundedText(30),
    email: z.email().max(160),
    instagram: boundedText(80),
    address: boundedText(300),
    locality: boundedText(120),
    hours: boundedText(120),
    mapUrl: z.url().max(500)
  }),
  pages: z.object({
    home: z.object({ heroTitle: boundedText(120), heroSummary: boundedText(360) }),
    about: z.object({ title: boundedText(120), introduction: boundedText(1000) }),
    approach: z.object({ title: boundedText(120), introduction: boundedText(1000) }),
    programmes: z.object({ title: boundedText(120), introduction: boundedText(1000) }),
    daycare: z.object({ title: boundedText(120), introduction: boundedText(1000) }),
    admissions: z.object({ title: boundedText(120), introduction: boundedText(1000) })
  }),
  programmes: z.array(programmeSchema).length(4),
  announcements: z.array(z.object({ id: boundedText(80), text: boundedText(240), active: z.boolean() })).max(5),
  seo: z.object({
    titleSuffix: boundedText(80),
    defaultDescription: boundedText(180),
    localityKeywords: z.array(boundedText(80)).max(12)
  })
});

export type SiteDocument = z.infer<typeof siteDocumentSchema>;
export type Programme = z.infer<typeof programmeSchema>;
