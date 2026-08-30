import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const mode of ["light", "night"] as const) {
  test(`homepage has no automated WCAG A/AA violations in ${mode} mode`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator(`[data-mode-choice="${mode}"]:visible`).first().click();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test("global semantics, names and primary tap targets are accessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(await page.title()).not.toBe("");
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.locator('nav[aria-label="Primary navigation"]')).toHaveCount(1);
  await expect(page.locator("details.mobile-nav")).toHaveCount(1);
  const unnamed = await page.locator("header button, header a[href], main button, main a[href], footer button, footer a[href]").evaluateAll((elements) => elements.filter((element) => element.getRootNode() === document && !(element.getAttribute("aria-label") || element.getAttribute("title") || element.textContent?.trim())).map((element) => element.outerHTML));
  expect(unnamed).toEqual([]);
  const targets = await page.locator(".site-header [data-mode-choice]:visible").evaluateAll((elements) => elements.map((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }));
  for (const target of targets) {
    expect(target.width).toBeGreaterThanOrEqual(44);
    expect(target.height).toBeGreaterThanOrEqual(44);
  }
});
