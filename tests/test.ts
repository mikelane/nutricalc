import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Nutrition Calculators' })).toBeVisible();
});

test('hyperp index has expected h1', async ({ page }) => {
	await page.goto('/hyperp');
	await expect(page.getByRole('heading', { name: 'Hyperpalatability Calculator' })).toBeVisible();
});