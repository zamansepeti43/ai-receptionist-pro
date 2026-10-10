import { type NextRequest } from 'next/server';
import { z } from 'zod';
import { readJsonBody } from '@/lib/api/body';
import { jsonHandler } from '@/lib/api/json';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
const schema = z.object({ email: z.string().trim().email().max(254) }).strict();

export async function POST(request: NextRequest): Promise<Response> {
  return jsonHandler(async () => {
    const { email } = schema.parse(await readJsonBody(request));
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase(), {
      redirectTo: new URL('/auth/reset-password', request.url).toString(),
    });
    if (error) throw error;
    return { sent: true };
  }, request);
}
