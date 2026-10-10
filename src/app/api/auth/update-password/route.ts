import { type NextRequest } from 'next/server';
import { z } from 'zod';
import { readJsonBody } from '@/lib/api/body';
import { jsonHandler } from '@/lib/api/json';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { AppError } from '@/lib/errors/app-error';

export const runtime = 'nodejs';
const schema = z.object({ password: z.string().min(8).max(128) }).strict();

export async function POST(request: NextRequest): Promise<Response> {
  return jsonHandler(async () => {
    const { password } = schema.parse(await readJsonBody(request));
    const supabase = await createSupabaseServerClient();
    const { data, error: userError } = await supabase.auth.getUser();
    if (userError || !data.user) throw new AppError('unauthorized', 'Şifre yenileme bağlantısı geçersiz veya süresi dolmuş.');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw new AppError('upstream_error', 'Şifre güncellenemedi.');
    return { updated: true };
  }, request);
}
