import { type NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logging/logger';
import { safeDestination } from '@/lib/auth/safe-destination';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Supabase Auth callback used by password-recovery email links and legacy
 * verification links. Supports PKCE (`?code=`) and token-hash verification.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams, origin } = request.nextUrl;

  const next = safeDestination(searchParams.get('next'));

  // Recovery links must reach the password form with a valid recovery session.
  // After the password is changed, that route can send the user back to sign-in.

  // Supabase segnala i fallimenti (link scaduto, già usato) via query string.
  const providerError = searchParams.get('error_description') ?? searchParams.get('error');
  if (providerError) {
    logger.warn({ providerError }, 'Auth callback ricevuto con errore dal provider');
    return NextResponse.redirect(new URL(loginWithError('link_non_valido'), origin));
  }

  const supabase = await createSupabaseServerClient();

  const code = searchParams.get('code');
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      logger.warn({ err: error }, 'Scambio del code per la sessione fallito');
      return NextResponse.redirect(new URL(loginWithError('link_non_valido'), origin));
    }
    return NextResponse.redirect(new URL(next, origin));
  }

  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as 'magiclink' | 'signup' | 'email' | 'recovery' | 'invite',
    });
    if (error) {
      logger.warn({ err: error }, 'Verifica OTP fallita');
      return NextResponse.redirect(new URL(loginWithError('link_non_valido'), origin));
    }
    return NextResponse.redirect(new URL(next, origin));
  }

  logger.warn('Auth callback invocato senza code né token_hash');
  return NextResponse.redirect(new URL(loginWithError('link_incompleto'), origin));
}

function loginWithError(reason: string): string {
  return `/login?error=${encodeURIComponent(reason)}`;
}
