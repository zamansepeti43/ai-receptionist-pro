import { expect, type Page, type Response } from '@playwright/test';

/**
 * Navigates to a path and requires an HTTP 200 response.
 */
export async function gotoOk(page: Page, path: string): Promise<Response> {
  const response = await page.goto(path);

  expect(response, `No HTTP response for ${path}`).not.toBeNull();
  if (response === null) {
    throw new Error(`No HTTP response for ${path}`);
  }

  expect(response.status(), `${path} did not respond with 200`).toBe(200);
  return response;
}

export interface ConsoleWatcher {
  readonly errors: () => readonly string[];
}

/**
 * Collects page JavaScript errors and console.error messages.
 * Only browser-generated favicon noise is ignored; application errors remain
 * visible so the E2E suite fails rather than hiding a broken page.
 */
const BROWSER_INITIATED_NOISE = /favicon/i;

export function watchPageErrors(page: Page): ConsoleWatcher {
  const collected: string[] = [];

  page.on('pageerror', (error) => {
    collected.push(`pageerror: ${error.message}`);
  });

  page.on('console', (message) => {
    if (message.type() !== 'error') {
      return;
    }

    const text = message.text();
    if (BROWSER_INITIATED_NOISE.test(text)) {
      return;
    }

    collected.push(`console.error: ${text}`);
  });

  return { errors: () => [...collected] };
}
