import { expect, test, type Page } from '@playwright/test';

import {
  captureApiCall,
  errorEnvelope,
  extractErrorCode,
  successEnvelope,
} from './helpers/api-capture';
import { gotoOk } from './helpers/page-signals';

const SIGN_UP_ROUTE = '**/api/auth/sign-up';
const FEEDBACK = '#register-form-errors';

async function fillRegisterForm(page: Page, email: string): Promise<void> {
  await page.getByLabel('Business or practice name', { exact: true }).fill('E2E Business');
  await page.getByLabel('Work email', { exact: true }).fill(email);
  await page.getByLabel('Industry', { exact: true }).selectOption('dental');
}

test.describe('Registration', () => {
  test('submits JSON via fetch without navigating', async ({ page }) => {
    const capture = await captureApiCall(page, SIGN_UP_ROUTE, {
      status: 200,
      body: successEnvelope({ tenantId: 'e2e-tenant' }),
    });

    await gotoOk(page, '/register');
    const feedback = page.locator(FEEDBACK);
    await expect(feedback).toHaveText('');

    await fillRegisterForm(page, 'e2e-success@example.com');
    const requestPromise = page.waitForRequest(
      (request) =>
        request.url().includes('/api/auth/sign-up') && request.method() === 'POST',
    );
    await page.getByRole('button', { name: 'Create account' }).click();
    await requestPromise;

    await expect(feedback).toContainText('Account created');
    await expect(feedback).not.toHaveClass(/sr-only/);
    await expect(page).toHaveURL(/\/register$/);

    expect(capture.count()).toBe(1);
    const request = capture.first();
    expect(request.resourceType, 'the form must use fetch, not navigation').toBe('fetch');
    expect(request.method).toBe('POST');
    expect(request.contentType).toContain('application/json');
    expect(request.jsonBody).toEqual({
      business_name: 'E2E Business',
      email: 'e2e-success@example.com',
      vertical: 'dental',
    });
  });

  test('shows an API error in the page and announces it as an alert', async ({ page }) => {
    const capture = await captureApiCall(page, SIGN_UP_ROUTE, {
      status: 429,
      body: errorEnvelope('rate_limited', 'Rate limit exceeded. Retry after 900s'),
    });

    await gotoOk(page, '/register');

    await fillRegisterForm(page, 'e2e-error@example.com');
    const requestPromise = page.waitForRequest(
      (request) =>
        request.url().includes('/api/auth/sign-up') && request.method() === 'POST',
    );
    await page.getByRole('button', { name: 'Create account' }).click();
    await requestPromise;

    const feedback = page.locator(FEEDBACK);
    await expect(feedback).not.toHaveText('');
    await expect(feedback).toHaveAttribute('role', 'alert');
    await expect(page).toHaveURL(/\/register$/);

    expect(capture.count()).toBe(1);
    expect(capture.first().jsonBody).toEqual({
      business_name: 'E2E Business',
      email: 'e2e-error@example.com',
      vertical: 'dental',
    });
  });

  test('real route accepts the body produced by the form', async ({ page }) => {
    await gotoOk(page, '/register');

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/api/auth/sign-up') && response.request().method() === 'POST',
    );

    await fillRegisterForm(page, 'e2e-real@example.com');
    await page.getByRole('button', { name: 'Create account' }).click();

    const response = await responsePromise;
    expect(response.status(), 'the route must exist and accept POST').not.toBe(404);
    expect(response.status()).not.toBe(405);
    expect(
      response.headers()['content-type'],
      'the route must return a JSON envelope, not an error page',
    ).toContain('application/json');

    const payload: unknown = await response.json();
    expect(
      extractErrorCode(payload),
      'the form body was rejected by the route schema',
    ).not.toBe('bad_request');

    await expect(page).toHaveURL(/\/register$/);
    await expect(page.locator(FEEDBACK)).not.toHaveText('');
  });
});
