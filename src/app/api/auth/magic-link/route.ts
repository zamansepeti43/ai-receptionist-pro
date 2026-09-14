// POST /api/auth/magic-link — sends a Supabase magic link.
// The response stays uniform to avoid account enumeration.

import { type NextRequest } from 'next/server';
import { z } from 'zod';

import { readJsonBody } from '@/lib/api/body';
import { jsonHandler } from '@/lib/api/json';
import { applyRateLimit } from '@/lib/rate-limit/apply';
import { env } from '@/lib/env';
import { createMagicLinkService, normalizeEmail } from '@/server/auth/magic-link';

export const runtime = 'nodejs';

const MagicLinkBodySchema = z
  .object({
    email: z.string().trim().min(3).max(254),
  })
  .strict();

export async function POST(request: NextRequest): Promise<Response> {
  return jsonHandler(async (context) => {
    const parsed = MagicLinkBodySchema.parse(await readJsonBody(request));
    const normalized = normalizeEmail(parsed.email);

    const identifier = normalized
      ? ({ kind: 'email', value: normalized } as const)
      : ({ kind: 'ip', value: context.ipAddress } as const);

    await applyRateLimit('authMagicLink', identifier);

    const service = createMagicLinkService();
    await service.request({
      email: parsed.email,
      requestId: context.requestId,
      // In local development, use the actual browser origin. This prevents
      // links from being generated for localhost:3000 while the app runs on 3002.
      ...(env.NODE_ENV === 'development'
        ? { redirectTo: `${request.nextUrl.origin}/auth/callback` }
        : {}),
    });

    return { sent: true };
  }, request);
}
