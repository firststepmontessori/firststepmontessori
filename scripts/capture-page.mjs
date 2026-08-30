import { chromium } from "playwright";

const [output = "/tmp/first-step-home.png", mode = "light", width = "1440", height = "900"] = process.argv.slice(2);
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
});
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) }, deviceScaleFactor: 1 });
await page.emulateMedia({ reducedMotion: "reduce", colorScheme: mode === "night" ? "dark" : "light" });
await page.addInitScript((preference) => localStorage.setItem("fsm:colour-mode:v1", preference), mode);
await page.goto("http://127.0.0.1:4321/", { waitUntil: "networkidle" });
await page.screenshot({ path: output, fullPage: true });
await browser.close();
console.log(output);
