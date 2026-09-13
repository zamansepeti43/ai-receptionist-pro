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
  ANTHROPIC_API_KEY: 'placeholder',
  ANTHROPIC_MODEL_PRIMARY: 'placeholder',
  ANTHROPIC_MODEL_FAST: 'placeholder',
  STRIPE_SECRET_KEY: 'placeholder',
  STRIPE_WEBHOOK_SECRET: 'placeholder',
  DIALOG360_API_KEY: 'placeholder',
  DIALOG360_WEBHOOK_SECRET: 'placeholder',
  ELEVENLABS_API_KEY: 'placeholder',
  UPSTASH_REDIS_REST_URL: 'https://placeholder.upstash.io',
  UPSTASH_REDIS_REST_TOKEN: 'placeholder',
  INTERNAL_JOB_SECRET: 'placeholder',
  CRON_SECRET: 'placeholder',
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
    locale: 'en-US',
    timezoneId: 'Europe/Istanbul',
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
          command: `npm run build && node scripts/start-e2e-standalone.mjs`,
          url: `${BASE_URL}/`,
          env: {
            ...PLACEHOLDER_ENV,
            PORT: String(PORT),
            HOSTNAME: '127.0.0.1',
          },
          reuseExistingServer: false,
          timeout: 420_000,
          stdout: 'pipe' as const,
          stderr: 'pipe' as const,
        },
      }
    : {}),
});
