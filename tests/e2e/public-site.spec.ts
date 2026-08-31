import { expect, test } from "@playwright/test";

const publicRoutes = ["/", "/about", "/montessori-approach", "/programmes", "/daycare", "/admissions-contact", "/blog/", "/blog/why-montessori-begins-with-practical-life/", "/blog/topic/montessori/", "/privacy", "/child-safety-media", "/accessibility"];

test("all public routes render useful semantic content", async ({ page }) => {
  for (const route of publicRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
  }
});

test("shipped pages contain no photography or upload surface", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("img, picture, video, input[type=file]")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /WhatsApp us/i }).first()).toBeVisible();
});

test("journal routes are static, linked and semantically described", async ({ page }) => {
  await page.goto("/blog/");
  await page.getByRole("link", { name: "Why Montessori begins with practical life", exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/why-montessori-begins-with-practical-life\/$/);
  await expect(page.locator("main article h1")).toHaveText("Why Montessori begins with practical life");
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain("BlogPosting");
  await expect(page.locator("main img, main picture, main video, input[type=file]")).toHaveCount(0);
});

test("family-facing policies do not expose implementation details", async ({ page }) => {
  for (const route of ["/privacy", "/child-safety-media", "/accessibility"]) {
    await page.goto(route);
    await expect(page.locator("main")).not.toContainText(/Cloudflare|D1|repository|API|framework/i);
  }
});

test("colour preference persists and System resumes device changes", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator("html").getAttribute("data-mode-preference")).toBe("system");
  expect(await page.locator("html").getAttribute("data-resolved-mode")).toBe("light");

  await page.locator('[data-mode-choice="night"]:visible').first().click();
  await expect(page.locator("html")).toHaveAttribute("data-mode-preference", "night");
  await expect(page.locator("html")).toHaveAttribute("data-resolved-mode", "night");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-mode-preference", "night");

  await page.locator('[data-mode-choice="system"]:visible').first().click();
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-resolved-mode", "night");
});

test("homepage fits viewport without horizontal overflow", async ({ page }) => {
  await page.goto("/");
  const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
});

test("public homepage remains meaningful without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("thoughtful first step");
  await expect(page.getByRole("link", { name: /WhatsApp us/i }).first()).toBeVisible();
  await expect(page.locator(".program-card")).toHaveCount(4);
  await expect(page.locator(".program-card").first()).toBeVisible();
  await expect(page.locator(".program-card").last()).toBeVisible();
  await context.close();
});
