import { expect, test } from '@playwright/test';

import { gotoOk } from './helpers/page-signals';

test.describe('Turkish and English language switching', () => {
  test('switches page copy and keeps the selected language across navigation and reload', async ({ page }) => {
    await gotoOk(page, '/');
    await page.evaluate(() => window.localStorage.removeItem('ai-receptionist-language'));
    await page.reload();

    const language = page.getByRole('combobox', { name: 'Dil / Language' });
    const hero = page.getByRole('heading', { level: 1 });

    await language.selectOption('en');
    await expect(hero).toHaveText('Your front desk, always on.');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');

    await gotoOk(page, '/pricing');
    await expect(page.getByRole('combobox', { name: 'Dil / Language' })).toHaveValue('en');
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();

    await page.getByRole('combobox', { name: 'Dil / Language' }).selectOption('tr');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr-TR');

    await page.reload();
    await expect(page.getByRole('combobox', { name: 'Dil / Language' })).toHaveValue('tr');
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr-TR');
    await expect(page.getByRole('navigation', { name: 'Ana gezinme' })).toBeVisible();
  });
});
