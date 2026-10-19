import { resolve } from "node:path";

const code = resolve(import.meta.dir, "..");
const backend = Bun.spawn(["bun", "--watch", "src/main.ts"], {
  cwd: code,
  env: { ...process.env, PORT: "3000", PUBLIC_ORIGIN: "http://localhost:5173" },
  stdout: "inherit", stderr: "inherit",
});
const frontend = Bun.spawn(["bun", "run", "dev"], {
  cwd: resolve(code, "frontend"),
  stdout: "inherit", stderr: "inherit",
});
function stop() { backend.kill(); frontend.kill(); }
process.once("SIGINT", stop);
process.once("SIGTERM", stop);
const exitCode = await Promise.race([backend.exited, frontend.exited]);
stop();
await Promise.all([backend.exited, frontend.exited]);
process.exit(exitCode);
