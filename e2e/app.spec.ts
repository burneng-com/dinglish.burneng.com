import { test, expect } from '@playwright/test';

test.describe('Dinglish Garden', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for JS to fully load and render
    await page.waitForSelector('#stat-learned');
  });

  test('loads homepage with header and modes', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Dinglish Garden');
    await expect(page.locator('.mode-card')).toHaveCount(6);
    await expect(page.locator('.stat-card')).toHaveCount(4);
  });

  test('switches language to Chinese', async ({ page }) => {
    // Clear any saved lang preference
    await page.evaluate(() => localStorage.removeItem('dinglish_lang'));
    await page.reload();
    await page.waitForSelector('#stat-learned');

    await page.locator('#lang-toggle').click();
    await expect(page.locator('.tagline')).toHaveText('每天一個字，英文自然好。');
    await expect(page.locator('.stat-label').first()).toHaveText('已學會');
    await expect(page.locator('.mode-title').first()).toHaveText('每日單字');
  });

  test('switches language back to English', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('dinglish_lang'));
    await page.reload();
    await page.waitForSelector('#stat-learned');

    await page.locator('#lang-toggle').click();
    await expect(page.locator('.tagline')).toHaveText('每天一個字，英文自然好。');
    await page.locator('#lang-toggle').click();
    await expect(page.locator('.tagline')).toHaveText('Grow your English, one word at a time.');
  });

  test('navigates to Daily Word mode', async ({ page }) => {
    await page.locator('.mode-card[data-mode="daily"]').click();
    await expect(page.locator('#view-daily.active')).toBeVisible();
    await expect(page.locator('#daily-word')).not.toBeEmpty();
  });

  test('navigates to Flashcard mode', async ({ page }) => {
    await page.locator('.mode-card[data-mode="flashcard"]').click();
    await expect(page.locator('#view-flashcard.active')).toBeVisible();
    await expect(page.locator('#fc-word')).not.toBeEmpty();
  });

  test('flips flashcard on click', async ({ page }) => {
    await page.locator('.mode-card[data-mode="flashcard"]').click();
    await expect(page.locator('#view-flashcard.active')).toBeVisible();
    await page.locator('#fc-card').click();
    await expect(page.locator('.flashcard.flipped')).toBeVisible();
  });

  test('navigates to Quiz mode', async ({ page }) => {
    await page.locator('.mode-card[data-mode="quiz"]').click();
    await expect(page.locator('#view-quiz.active')).toBeVisible();
    await expect(page.locator('#quiz-word')).not.toBeEmpty();
    await expect(page.locator('.quiz-option')).toHaveCount(4);
  });

  test('quiz answer selection works', async ({ page }) => {
    await page.locator('.mode-card[data-mode="quiz"]').click();
    await expect(page.locator('#view-quiz.active')).toBeVisible();
    await page.locator('.quiz-option').first().click();
    await expect(page.locator('.quiz-option.correct')).toBeVisible();
  });

  test('navigates to Matching mode', async ({ page }) => {
    await page.locator('.mode-card[data-mode="matching"]').click();
    await expect(page.locator('#view-matching.active')).toBeVisible();
    await expect(page.locator('.matching-card')).toHaveCount(10);
  });

  test('navigates to Fill-in-the-Blank mode', async ({ page }) => {
    await page.locator('.mode-card[data-mode="fillblank"]').click();
    await expect(page.locator('#view-fillblank.active')).toBeVisible();
    await expect(page.locator('#fb-input')).toBeVisible();
  });

  test('navigates to Garden mode', async ({ page }) => {
    await page.locator('.mode-card[data-mode="garden"]').click();
    await expect(page.locator('#view-garden.active')).toBeVisible();
    await expect(page.locator('.garden-plant')).toHaveCount(55);
  });

  test('back button returns to home', async ({ page }) => {
    await page.locator('.mode-card[data-mode="daily"]').click();
    await expect(page.locator('#view-daily.active')).toBeVisible();
    await page.locator('[data-back]').first().click();
    await expect(page.locator('#view-home.active')).toBeVisible();
  });

  test('reset button shows modal', async ({ page }) => {
    await page.locator('#reset-btn').click();
    await expect(page.locator('#modal-reset')).toHaveClass(/active/);
    await page.locator('#modal-cancel').click();
    await expect(page.locator('#modal-reset')).not.toHaveClass(/active/);
  });

  test('export CSV button exists', async ({ page }) => {
    await expect(page.locator('#btn-export')).toBeVisible();
  });

  test('dashboard shows zeros initially', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('#stat-learned');
    await expect(page.locator('#stat-learned')).toHaveText('0');
    await expect(page.locator('#stat-review')).toHaveText('0');
    await expect(page.locator('#stat-streak')).toHaveText('0');
    await expect(page.locator('#stat-accuracy')).toHaveText('0%');
  });
});
