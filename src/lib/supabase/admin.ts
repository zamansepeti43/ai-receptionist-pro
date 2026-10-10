import { createClient } from '@supabase/supabase-js';

import { AppError } from '@/lib/errors/app-error';
import { env } from '@/lib/env';

export function createSupabaseAdminClient() {
  const adminKey = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !adminKey) {
    throw new AppError('internal', 'Supabase admin credentials are not configured', {
      expose: false,
    });
  }

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, adminKey, {
    db: { schema: 'ai_receptionist' },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
