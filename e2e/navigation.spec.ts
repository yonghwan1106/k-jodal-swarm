import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate to landing page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/K-조달 AI 스웜/);
  });

  test("should navigate to dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("h1")).toContainText("대시보드");
  });

  test("should navigate to bids page", async ({ page }) => {
    await page.goto("/dashboard/bids");
    await expect(page.locator("h1")).toContainText("입찰공고");
  });

  test("should navigate to agents page", async ({ page }) => {
    await page.goto("/dashboard/agents");
    await expect(page.locator("h1")).toContainText("에이전트 모니터링");
  });

  test("should navigate to simulation page", async ({ page }) => {
    await page.goto("/dashboard/simulation");
    await expect(page.locator("h1")).toContainText("시뮬레이션");
  });

  test("should navigate to proposals page", async ({ page }) => {
    await page.goto("/dashboard/proposals");
    await expect(page.locator("h1")).toContainText("제안서");
  });

  test("should navigate to voice page", async ({ page }) => {
    await page.goto("/dashboard/voice");
    await expect(page.locator("h1")).toContainText("AI 음성 상담");
  });
});

test.describe("Sidebar Navigation", () => {
  test("should navigate using sidebar links", async ({ page }) => {
    await page.goto("/dashboard");

    // Click on bids link
    await page.click('a[href="/dashboard/bids"]');
    await expect(page).toHaveURL("/dashboard/bids");

    // Click on agents link
    await page.click('a[href="/dashboard/agents"]');
    await expect(page).toHaveURL("/dashboard/agents");

    // Click on simulation link
    await page.click('a[href="/dashboard/simulation"]');
    await expect(page).toHaveURL("/dashboard/simulation");

    // Click on proposals link
    await page.click('a[href="/dashboard/proposals"]');
    await expect(page).toHaveURL("/dashboard/proposals");

    // Click on voice link
    await page.click('a[href="/dashboard/voice"]');
    await expect(page).toHaveURL("/dashboard/voice");

    // Return to dashboard
    await page.click('a[href="/dashboard"]');
    await expect(page).toHaveURL("/dashboard");
  });
});
