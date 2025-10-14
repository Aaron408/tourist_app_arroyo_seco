import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:8081",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] }
    },
    {
      name: "WebKit",
      use: { ...devices["Desktop Safari"] }
    }
  ]
});
