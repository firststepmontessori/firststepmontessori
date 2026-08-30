import { spawn } from "node:child_process";

const child = spawn(process.execPath, ["node_modules/astro/bin/astro.mjs", "dev", "--host", "127.0.0.1", "--port", "4321"], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: "1",
    ADMIN_DEV_BYPASS: "true",
    SITE_THEME: process.env.SITE_THEME || "garden",
    SITE_ENV: "preview",
    WRANGLER_LOG_PATH: "/tmp/first-step-playwright-wrangler.log"
  },
  stdio: "inherit"
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code) => process.exit(code ?? 0));
