import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4321",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } }
      : {})
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { viewport: { width: 390, height: 844 }, hasTouch: true } }
  ],
  ...(process.env.PLAYWRIGHT_USE_EXISTING_SERVER ? {} : {
    webServer: {
      command: "node scripts/run-playwright-server.mjs",
      url: "http://127.0.0.1:4321",
      reuseExistingServer: true,
      timeout: 120_000
    }
  })
});
