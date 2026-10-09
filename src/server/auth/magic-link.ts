// Magic-link login service.
// Production responses remain uniform to avoid account enumeration. In development,
// fail the request when the provider rejects delivery so the problem is visible.
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logging/logger';
import { env } from '@/lib/env';

export type MagicLinkInput = {
  email: string;
  requestId: string;
  /** Optional trusted redirect override, used by local development. */
  redirectTo?: string;
};

export type MagicLinkResult = {
  ok: true;
};

export interface MagicLinkSender {
  send(input: { email: string; redirectTo: string }): Promise<{ error: Error | null }>;
}

export class MagicLinkService {
  constructor(
    private readonly sender: MagicLinkSender,
    private readonly redirectTo: string,
  ) {}

  async request(input: MagicLinkInput): Promise<MagicLinkResult> {
    const email = normalizeEmail(input.email);

    if (!email) {
      logger.info(
        { requestId: input.requestId },
        'Magic link request rejected: invalid email format',
      );
      return { ok: true };
    }

    const redirectTo = input.redirectTo ?? this.redirectTo;
    const { error } = await this.sender.send({ email, redirectTo });

    if (error) {
      logger.warn(
        { requestId: input.requestId, err: error },
        'Magic link sender returned error (response masked for anti-enumeration)',
      );

      // In production, keep the same response for existing and non-existing
      // accounts. In local development, do not pretend delivery succeeded:
      // return an error so the developer can see the provider failure in logs.
      if (env.NODE_ENV === 'development') {
        throw new Error('Magic-link provider rejected the request; inspect the development server log.');
      }
    } else {
      logger.info({ requestId: input.requestId }, 'Magic link dispatched');
    }

    return { ok: true };
  }
}

class SupabaseMagicLinkSender implements MagicLinkSender {
  // OTP sign-in is an end-user Auth operation. Use the project's publishable/anon
  // key here; the newer sb_secret_* server key is not an Auth API key.
  private readonly supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  async send(input: { email: string; redirectTo: string }): Promise<{ error: Error | null }> {
    const { error } = await this.supabase.auth.signInWithOtp({
      email: input.email,
      options: {
        emailRedirectTo: input.redirectTo,
      },
    });

    return { error: error ?? null };
  }
}

export function createMagicLinkService(): MagicLinkService {
  const redirectTo = `${env.NEXT_PUBLIC_APP_URL}/auth/callback`;
  return new MagicLinkService(new SupabaseMagicLinkSender(), redirectTo);
}

export function normalizeEmail(value: string): string | null {
  const trimmed = value.trim().toLowerCase();
  if (trimmed.length === 0 || trimmed.length > 254) {
    return null;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return null;
  }
  return trimmed;
}
