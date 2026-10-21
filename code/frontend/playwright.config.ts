import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/browser", testMatch: "**/*.pw.mjs", workers: 1,
  reporter: "list", outputDir: "../tests/output/browser-artifacts",
  use: { baseURL: "http://127.0.0.1:4173", channel: "chrome", trace: "retain-on-failure" },
  webServer: { command: process.env.CIRCLE_BROWSER_PREVIEW ? "bun x --no-install vite preview --host 127.0.0.1 --port 4173" : "bun run dev --host 127.0.0.1 --port 4173", url: "http://127.0.0.1:4173", reuseExistingServer: false },
});
