import { spawn } from "node:child_process";

const sharedEnvironment = {
  ...process.env,
  ASTRO_TELEMETRY_DISABLED: "1",
  SITE_THEME: process.env.SITE_THEME || "garden",
  SITE_ENV: "preview"
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

const child = spawn(process.execPath, [
  "node_modules/vite/bin/vite.js",
  "preview",
  "--host",
  "127.0.0.1",
  "--port",
  "4321"
], {
  cwd: process.cwd(),
  env: sharedEnvironment,
  stdio: "inherit"
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code) => process.exit(code ?? 0));
