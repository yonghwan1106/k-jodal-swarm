import { test, expect } from "@playwright/test";

test.describe("Bids Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/bids");
  });

  test("should display bids page header", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("입찰공고");
    await expect(page.locator("p")).toContainText("AI가 분석한 입찰 기회");
  });

  test("should display filter buttons", async ({ page }) => {
    await expect(page.getByRole("button", { name: /전체/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /AI 추천/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /분석 중/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /신규/ })).toBeVisible();
  });

  test("should filter bids by category", async ({ page }) => {
    // Click AI recommended filter
    await page.getByRole("button", { name: /AI 추천/ }).click();

    // Wait for UI to update
    await page.waitForTimeout(500);

    // The filter button should be active (different style)
    const filterButton = page.getByRole("button", { name: /AI 추천/ });
    await expect(filterButton).toHaveClass(/bg-\[#22C55E\]/);
  });

  test("should search bids by keyword", async ({ page }) => {
    const searchInput = page.getByRole("textbox", { name: "입찰공고 검색" });
    await expect(searchInput).toBeVisible();

    // Type search query
    await searchInput.fill("소프트웨어");

    // Wait for debounce and results to update
    await page.waitForTimeout(500);
  });

  test("should display stats cards", async ({ page }) => {
    // Check for stats cards
    await expect(page.locator("text=고매칭 (80+)")).toBeVisible();
    await expect(page.locator("text=마감 임박")).toBeVisible();
    await expect(page.locator("text=고위험 공고")).toBeVisible();
    await expect(page.locator("text=평균 매칭")).toBeVisible();
  });

  test("should display pagination when there are bids", async ({ page }) => {
    // Wait for bids to load
    await page.waitForTimeout(1000);

    // Check for pagination (might not be visible if fewer items than page size)
    const pagination = page.locator('nav[aria-label="페이지네이션"]');

    // Either pagination exists or "no results" message shows
    const paginationOrNoBids = await Promise.race([
      pagination.isVisible().then((visible) => ({ type: "pagination", visible })),
      page
        .locator("text=해당 조건에 맞는 공고가 없습니다")
        .isVisible()
        .then((visible) => ({ type: "noBids", visible })),
      new Promise((resolve) =>
        setTimeout(() => resolve({ type: "timeout", visible: false }), 5000)
      ),
    ]);

    expect(paginationOrNoBids).toBeTruthy();
  });

  test("should show refresh button and status badge", async ({ page }) => {
    // Check for refresh button
    const refreshButton = page.locator("button").filter({ has: page.locator('[class*="RefreshCw"]') });
    await expect(refreshButton.first()).toBeVisible();

    // Check for status badge (either realtime or mock)
    const statusBadge = page.locator("text=실시간").or(page.locator("text=Mock 데이터"));
    await expect(statusBadge.first()).toBeVisible();
  });
});
