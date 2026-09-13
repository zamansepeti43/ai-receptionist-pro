import { expect, test, type Page } from '@playwright/test';

import {
  captureApiCall,
  errorEnvelope,
  extractErrorCode,
  successEnvelope,
} from './helpers/api-capture';
import { gotoOk } from './helpers/page-signals';

const CONTACT_ROUTE = '**/api/contact';
const FEEDBACK = '#contact-form-errors';

interface ContactInput {
  readonly email: string;
  readonly company: string | null;
}

async function fillContactForm(page: Page, input: ContactInput): Promise<void> {
  await page.getByLabel('Nome', { exact: true }).fill('Mario Rossi');
  await page.getByLabel('Email', { exact: true }).fill(input.email);
  if (input.company !== null) {
    await page.getByLabel('Studio o azienda', { exact: true }).fill(input.company);
  }
  await page.getByLabel('Di cosa vuoi parlare?', { exact: true }).selectOption('sales');
  await page.getByLabel('Messaggio', { exact: true }).fill('Vorrei provare Ambrogio nel mio studio.');
  await page.getByLabel(/Acconsento al trattamento dei dati/).check();
}

async function submitAndWaitForRequest(page: Page): Promise<void> {
  const requestPromise = page.waitForRequest(
    (request) => request.url().includes('/api/contact') && request.method() === 'POST',
  );
  await page.getByRole('button', { name: 'Invia messaggio' }).click();
  await requestPromise;
}

test.describe('Contact form', () => {
  test('normalizes fields into the JSON body expected by the schema', async ({ page }) => {
    const capture = await captureApiCall(page, CONTACT_ROUTE, {
      status: 200,
      body: successEnvelope({ submissionId: 'e2e-submission' }),
    });

    await gotoOk(page, '/contact');
    const feedback = page.locator(FEEDBACK);
    await expect(feedback).toHaveText('');

    await fillContactForm(page, { email: 'e2e-contact@example.com', company: null });
    await submitAndWaitForRequest(page);

    await expect(feedback).toContainText('Messaggio inviato');
    await expect(feedback).not.toHaveClass(/sr-only/);
    await expect(page).toHaveURL(/\/contact$/);

    expect(capture.count()).toBe(1);
    const request = capture.first();
    expect(request.resourceType, 'the form must use fetch, not navigation').toBe('fetch');
    expect(request.method).toBe('POST');
    expect(request.contentType).toContain('application/json');
    expect(request.jsonBody).toEqual({
      name: 'Mario Rossi',
      email: 'e2e-contact@example.com',
      company: null,
      topic: 'sales',
      message: 'Vorrei provare Ambrogio nel mio studio.',
      consent: true,
    });
  });

  test('sends the company name when provided', async ({ page }) => {
    const capture = await captureApiCall(page, CONTACT_ROUTE, {
      status: 200,
      body: successEnvelope({ submissionId: 'e2e-submission' }),
    });

    await gotoOk(page, '/contact');
    await fillContactForm(page, { email: 'e2e-company@example.com', company: 'Studio Rossi' });
    await submitAndWaitForRequest(page);

    await expect(page.locator(FEEDBACK)).toContainText('Messaggio inviato');
    expect(capture.first().jsonBody).toMatchObject({ company: 'Studio Rossi' });
  });

  test('shows an API error in the page and announces it as an alert', async ({ page }) => {
    await captureApiCall(page, CONTACT_ROUTE, {
      status: 500,
      body: errorEnvelope('internal_error', 'Internal server error'),
    });

    await gotoOk(page, '/contact');
    await fillContactForm(page, { email: 'e2e-fail@example.com', company: null });
    await submitAndWaitForRequest(page);

    const feedback = page.locator(FEEDBACK);
    await expect(feedback).toContainText('Il servizio non è raggiungibile');
    await expect(feedback).toHaveAttribute('role', 'alert');
    await expect(page).toHaveURL(/\/contact$/);
  });

  test('real route accepts the body produced by the form', async ({ page }) => {
    await gotoOk(page, '/contact');

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/api/contact') && response.request().method() === 'POST',
    );

    await fillContactForm(page, { email: 'e2e-real@example.com', company: null });
    await page.getByRole('button', { name: 'Invia messaggio' }).click();

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

    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.locator(FEEDBACK)).not.toHaveText('');
  });
});
