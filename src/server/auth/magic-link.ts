// Magic-link login service.
// Uses Supabase OTP and keeps account-enumeration details masked from the client.

import { logger } from '@/lib/logging/logger';
import { env } from '@/lib/env';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

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
    } else {
      logger.info({ requestId: input.requestId }, 'Magic link dispatched');
    }

    return { ok: true };
  }
}

class SupabaseMagicLinkSender implements MagicLinkSender {
  private readonly supabase = createSupabaseAdminClient();

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
