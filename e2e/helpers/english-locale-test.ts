import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const STORAGE_KEY = 'ai-receptionist-language';

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await page.addInitScript((key) => {
      window.localStorage.setItem(key, 'en');
    }, STORAGE_KEY);
    await use(page);
  },
});

export { expect };
