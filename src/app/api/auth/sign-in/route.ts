import { type NextRequest } from 'next/server';
import { z } from 'zod';
import { readJsonBody } from '@/lib/api/body';
import { jsonHandler } from '@/lib/api/json';
import { applyRateLimit } from '@/lib/rate-limit/apply';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { AppError } from '@/lib/errors/app-error';

export const runtime = 'nodejs';
const schema = z.object({ email: z.string().trim().email().max(254), password: z.string().min(1).max(128) }).strict();

export async function POST(request: NextRequest): Promise<Response> {
  return jsonHandler(async (context) => {
    const body = schema.parse(await readJsonBody(request));
    await applyRateLimit('authLogin', { kind: 'ip', value: context.ipAddress });
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email: body.email.toLowerCase(), password: body.password });
    if (error) throw new AppError('unauthorized', 'E-posta veya şifre hatalı.');
    return { signedIn: true };
  }, request);
}
