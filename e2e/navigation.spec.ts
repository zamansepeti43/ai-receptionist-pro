import { expect, test } from '@playwright/test';

import { gotoOk } from './helpers/page-signals';

/**
 * Flow 1: the landing responds and primary navigation works.
 *
 * Assertions avoid coupling the suite to marketing copy: they verify structure
 * and destinations rather than transient wording.
 */
test.describe('Landing and primary navigation', () => {
  test('landing responds 200 with exactly one level-one heading', async ({ page }) => {
    await gotoOk(page, '/');

    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  });

  test('main navigation reaches the declared pages', async ({ page }) => {
    await gotoOk(page, '/');

    const mainNav = page.getByRole('navigation', { name: 'Main navigation' });

    await mainNav.getByRole('link', { name: 'Pricing' }).click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await page.goBack();
    await mainNav.getByRole('link', { name: 'Sectors' }).click();
    await expect(page).toHaveURL(/\/verticali$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await page.goBack();
    await mainNav.getByRole('link', { name: 'Help' }).click();
    await expect(page).toHaveURL(/\/help$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('header actions lead to registration and sign-in', async ({ page }) => {
    await gotoOk(page, '/');
    const header = page.getByRole('banner');

    await header.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(page.getByRole('button', { name: 'Create account' })).toBeVisible();

    await gotoOk(page, '/');
    await header.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('button', { name: 'Send sign-in link' })).toBeVisible();
  });

  test('logo returns to home from an internal page', async ({ page }) => {
    await gotoOk(page, '/pricing');

    await page
      .getByRole('banner')
      .getByRole('link', { name: /AI Receptionist Pro - homepage/ })
      .click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  });
});
