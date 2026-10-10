// Fatto da Claude Code l'8 maggio 2026.
//
// Email/password registration: create a suspended tenant, then its owner identity.
// The tenant remains inactive until the owner completes onboarding.

import { randomUUID } from 'node:crypto';

import { AppError } from '@/lib/errors/app-error';
import { logger } from '@/lib/logging/logger';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { normalizeEmail } from '@/server/auth/magic-link';

export type SignUpVertical = 'dental' | 'beauty' | 'fitness' | 'professional' | 'other';

export type SignUpInput = {
  businessName: string;
  email: string;
  vertical: SignUpVertical;
  requestId: string;
  password: string;
};

export type SignUpResult = {
  tenantId: string;
};

export type PendingTenantInsertInput = {
  name: string;
  slug: string;
  billingEmail: string;
  businessType: SignUpVertical;
};

export interface SignUpRepository {
  findTenantByBillingEmail(email: string): Promise<{ id: string } | null>;
  insertPendingTenant(input: PendingTenantInsertInput): Promise<{ id: string }>;
  deletePendingTenant(tenantId: string): Promise<void>;
}

export class SignUpService {
  constructor(private readonly repository: SignUpRepository) {}

  async signUp(input: SignUpInput): Promise<SignUpResult> {
    const businessName = normalizeBusinessName(input.businessName);
    const email = normalizeEmail(input.email);

    if (!email) {
      throw new AppError('bad_request', 'A valid email is required');
    }

    const existing = await this.repository.findTenantByBillingEmail(email);
    if (existing) {
      throw new AppError('conflict', 'A tenant with this email already exists');
    }

    const tenant = await this.repository.insertPendingTenant({
      name: businessName,
      slug: makeSlug(businessName),
      billingEmail: email,
      businessType: input.vertical,
    });

    // Create a password-based Supabase identity and attach the tenant/owner claims.
    // Roll back the tenant if identity creation fails to prevent orphan rows.
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password: input.password,
      email_confirm: true,
      app_metadata: { tenant_id: tenant.id, role: 'owner' },
      user_metadata: { business_name: businessName, vertical: input.vertical },
    });
    if (error || !data.user) {
      logger.error({ requestId: input.requestId, tenantId: tenant.id, err: error }, 'Password account creation failed');
      try {
        await this.repository.deletePendingTenant(tenant.id);
      } catch (cleanupError) {
        logger.error(
          { requestId: input.requestId, tenantId: tenant.id, err: cleanupError },
          'Failed to roll back tenant after account creation failure',
        );
      }
      throw new AppError('upstream_error', 'Account could not be created. Please try again.', {
        cause: error,
        expose: true,
      });
    }

    return { tenantId: tenant.id };
  }
}

export class SupabaseSignUpRepository implements SignUpRepository {
  constructor(private readonly supabase = createSupabaseAdminClient()) {}

  async findTenantByBillingEmail(email: string): Promise<{ id: string } | null> {
    const { data, error } = await this.supabase
      .from('tenants')
      .select('id')
      .eq('billing_email', email)
      .maybeSingle();

    if (error) {
      throw new AppError('upstream_error', 'Failed to read tenants', {
        cause: error,
        expose: false,
      });
    }

    return data ? { id: String(data.id) } : null;
  }

  async insertPendingTenant(input: PendingTenantInsertInput): Promise<{ id: string }> {
    const { data, error } = await this.supabase
      .from('tenants')
      .insert({
        name: input.name,
        slug: input.slug,
        billing_email: input.billingEmail,
        business_type: input.businessType,
        status: 'suspended',
        plan: 'trial',
        country: 'IT',
        timezone: 'Europe/Rome',
      })
      .select('id')
      .single();

    if (error || !data) {
      throw new AppError('upstream_error', 'Failed to insert pending tenant', {
        cause: error,
        expose: false,
      });
    }

    return { id: String(data.id) };
  }

  async deletePendingTenant(tenantId: string): Promise<void> {
    const { error } = await this.supabase.from('tenants').delete().eq('id', tenantId);
    if (error) {
      throw new AppError('upstream_error', 'Failed to roll back pending tenant', {
        cause: error,
        expose: false,
      });
    }
  }
}

export function createSignUpService(): SignUpService {
  return new SignUpService(new SupabaseSignUpRepository());
}

function normalizeBusinessName(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length < 2 || trimmed.length > 120) {
    throw new AppError('bad_request', 'Business name must be 2-120 chars');
  }
  return trimmed;
}

function makeSlug(name: string): string {
  const base =
    name
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'studio';

  return `${base}-${randomUUID().slice(0, 8)}`;
}
