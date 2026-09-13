import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env['E2E_PORT'] ?? 3100);
const EXTERNAL_BASE_URL = process.env['E2E_BASE_URL'];
const BASE_URL = EXTERNAL_BASE_URL ?? `http://127.0.0.1:${PORT}`;
const isCI = process.env['CI'] !== undefined && process.env['CI'] !== '';

const PLACEHOLDER_ENV: Record<string, string> = {
  NEXT_TELEMETRY_DISABLED: '1',
  NEXT_PUBLIC_APP_URL: BASE_URL,
  NEXT_PUBLIC_SITE_URL: BASE_URL,
  NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'placeholder',
  SUPABASE_SERVICE_ROLE_KEY: 'placeholder',
  STRIPE_SECRET_KEY: 'placeholder',
  STRIPE_WEBHOOK_SECRET: 'placeholder',
  WHATSAPP_VERIFY_TOKEN: 'placeholder',
  WHATSAPP_APP_SECRET: 'placeholder',
  WHATSAPP_ACCESS_TOKEN: 'placeholder',
  WHATSAPP_WEBHOOK_HEADER_SECRET: 'placeholder',
  ELEVENLABS_API_KEY: 'placeholder',
  INTERNAL_JOB_SECRET: 'placeholder',
};

export default defineConfig({
  testDir: './e2e',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  ...(isCI ? { workers: 1 } : {}),
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: isCI
    ? [['github'], ['list'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    locale: 'it-IT',
    timezoneId: 'Europe/Rome',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  ...(EXTERNAL_BASE_URL === undefined
    ? {
        webServer: {
          command: `npm run build && npm run start -- --port ${PORT}`,
          url: BASE_URL,
          env: PLACEHOLDER_ENV,
          reuseExistingServer: !isCI,
          timeout: 420_000,
          stdout: 'pipe' as const,
          stderr: 'pipe' as const,
        },
      }
    : {}),
});
