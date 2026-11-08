import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
const localChrome =
  process.env.PLAYWRIGHT_CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:3100",
    launchOptions: {
      executablePath: existsSync(localChrome) ? localChrome : undefined,
    },
  },
  webServer: {
    command: "bun run start --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
