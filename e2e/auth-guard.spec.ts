import { expect, test } from '@playwright/test';

const TENANT_PATHS = [
  '/dashboard',
  '/conversations',
  '/calendar',
  '/knowledge',
  '/settings',
  '/settings/whatsapp',
  '/billing',
] as const;

const ADMIN_PATHS = [
  '/admin',
  '/admin/tenants',
  '/admin/users',
  '/admin/billing',
  '/admin/audit',
  '/admin/system',
] as const;

const DASHBOARD_SHELL_MARKER = 'Navigazione dashboard';
const ADMIN_SHELL_MARKER = 'Esci da admin';
const LOGIN_URL = /\/login(\?.*)?$/;
const LOGIN_ACTION = 'Send sign-in link';

test.describe('Protected tenant area', () => {
  for (const path of TENANT_PATHS) {
    test(`${path} redirects to login without a session`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveURL(LOGIN_URL);
      await expect(page.getByRole('button', { name: LOGIN_ACTION })).toBeVisible();
      await expect(page.getByLabel(DASHBOARD_SHELL_MARKER)).toHaveCount(0);
    });
  }
});

test.describe('Protected admin area', () => {
  for (const path of ADMIN_PATHS) {
    test(`${path} redirects to login without a session`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveURL(LOGIN_URL);
      await expect(page.getByRole('button', { name: LOGIN_ACTION })).toBeVisible();
      await expect(page.getByRole('link', { name: new RegExp(ADMIN_SHELL_MARKER) })).toHaveCount(0);
    });
  }
});

test.describe('Reserved content absent from HTTP response', () => {
  for (const path of [...TENANT_PATHS, ...ADMIN_PATHS]) {
    test(`${path} does not serve reserved shell markup`, async ({ request }) => {
      const response = await request.get(path);
      const html = await response.text();

      expect(html, `${path} exposes the dashboard shell`).not.toContain(DASHBOARD_SHELL_MARKER);
      expect(html, `${path} exposes the admin shell`).not.toContain(ADMIN_SHELL_MARKER);
    });
  }
});
