import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const STORAGE_KEY = 'ai-receptionist-language';

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await page.addInitScript((key) => {
      if (window.location.origin !== 'null') {
        window.localStorage.setItem(key, 'en');
      }
    }, STORAGE_KEY);
    // Playwright fixture callback uses `use`; this is not a React Hook.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);
  },
});

export { expect };
export type { Page };
