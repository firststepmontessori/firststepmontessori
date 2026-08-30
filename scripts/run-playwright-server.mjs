import { spawn } from "node:child_process";

const sharedEnvironment = {
  ...process.env,
  ASTRO_TELEMETRY_DISABLED: "1",
  SITE_THEME: process.env.SITE_THEME || "garden",
  SITE_ENV: "preview",
  WRANGLER_LOG_PATH: "/tmp/first-step-playwright-wrangler.log"
};

const run = (command, args) => new Promise((resolve) => {
  const child = spawn(command, args, {
    cwd: process.cwd(),
    env: sharedEnvironment,
    stdio: "inherit"
  });
  child.on("exit", (code) => resolve(code ?? 1));
});

const buildExitCode = await run(process.execPath, [
  "node_modules/astro/bin/astro.mjs",
  "build"
]);

if (buildExitCode !== 0) {
  process.exit(buildExitCode);
}

const migrationExitCode = await run(process.execPath, [
  "node_modules/wrangler/bin/wrangler.js",
  "d1",
  "migrations",
  "apply",
  "first-step-montessori-preview",
  "--local",
  "--config",
  "dist/server/wrangler.json"
]);

if (migrationExitCode !== 0) {
  process.exit(migrationExitCode);
}

const child = spawn(process.execPath, [
  "node_modules/wrangler/bin/wrangler.js",
  "dev",
  "--config",
  "dist/server/wrangler.json",
  "--ip",
  "127.0.0.1",
  "--port",
  "4321",
  "--show-interactive-dev-session=false"
], {
  cwd: process.cwd(),
  env: sharedEnvironment,
  stdio: "inherit"
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code) => process.exit(code ?? 0));
