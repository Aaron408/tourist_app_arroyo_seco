import { test, expect } from "@playwright/test";

test("placeholder e2e test", async ({ page }) => {
  await page.goto("about:blank");
  await expect(page).toHaveTitle("");
});
