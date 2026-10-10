// Sign-up service tests: password registration and rollback behavior.

import { afterEach, describe, expect, it, vi } from 'vitest';

import { AppError } from '@/lib/errors/app-error';
import type { PendingTenantInsertInput, SignUpRepository } from '@/server/auth/sign-up';
import { SignUpService } from '@/server/auth/sign-up';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

vi.mock('@/lib/supabase/admin', () => ({
  createSupabaseAdminClient: vi.fn(),
}));

const createUser = vi.fn();

afterEach(() => {
  vi.clearAllMocks();
});

describe('SignUpService', () => {
  it('creates a tenant and a password-based owner identity', async () => {
    const repository = new FakeRepo();
    createUser.mockResolvedValueOnce({ data: { user: { id: 'user_001' } }, error: null });
    mockAdmin();

    const service = new SignUpService(repository);
    const result = await service.signUp({
      businessName: '  Studio Test ',
      email: '  Mario@Example.IT  ',
      password: 'StrongPass123!',
      vertical: 'dental',
      requestId: 'req_1',
    });

    expect(result.tenantId).toBe('tenant_001');
    expect(repository.inserts).toHaveLength(1);
    expect(repository.inserts[0]).toMatchObject({
      name: 'Studio Test',
      billingEmail: 'mario@example.it',
      businessType: 'dental',
    });
    expect(repository.inserts[0]?.slug).toMatch(/^studio-test-[a-f0-9-]{8}$/);
    expect(createUser).toHaveBeenCalledWith({
      email: 'mario@example.it',
      password: 'StrongPass123!',
      email_confirm: true,
      app_metadata: { tenant_id: 'tenant_001', role: 'owner' },
      user_metadata: { business_name: 'Studio Test', vertical: 'dental' },
    });
    expect(repository.deletedTenants).toEqual([]);
  });

  it('rolls back the pending tenant when Supabase cannot create the owner identity', async () => {
    const repository = new FakeRepo();
    const providerError = new Error('provider unavailable');
    createUser.mockResolvedValueOnce({ data: { user: null }, error: providerError });
    mockAdmin();

    const service = new SignUpService(repository);
    await expect(
      service.signUp({
        businessName: 'Studio Test',
        email: 'mario@example.it',
        password: 'StrongPass123!',
        vertical: 'dental',
        requestId: 'req_rollback',
      }),
    ).rejects.toMatchObject({
      code: 'upstream_error',
      message: 'Account could not be created. Please try again.',
    });

    expect(repository.deletedTenants).toEqual(['tenant_001']);
  });

  it('still returns an account error if tenant rollback also fails, and logs the cleanup failure', async () => {
    const repository = new FakeRepo();
    repository.failDelete = true;
    const providerError = new Error('provider unavailable');
    createUser.mockResolvedValueOnce({ data: { user: null }, error: providerError });
    mockAdmin();

    const service = new SignUpService(repository);
    await expect(
      service.signUp({
        businessName: 'Studio Test',
        email: 'mario@example.it',
        password: 'StrongPass123!',
        vertical: 'dental',
        requestId: 'req_cleanup_failure',
      }),
    ).rejects.toMatchObject({ code: 'upstream_error' });

    expect(repository.deletedTenants).toEqual(['tenant_001']);
  });

  it('rejects when business name is shorter than 2 chars', async () => {
    const service = new SignUpService(new FakeRepo());
    await expect(
      service.signUp({
        businessName: 'A',
        email: 'mario@example.it',
        password: 'StrongPass123!',
        vertical: 'dental',
        requestId: 'req_2',
      }),
    ).rejects.toMatchObject({ code: 'bad_request' });
    expect(createUser).not.toHaveBeenCalled();
  });

  it('throws conflict when email already maps to a tenant', async () => {
    const repository = new FakeRepo();
    repository.byEmail.set('mario@example.it', { id: 'existing_tenant' });
    const service = new SignUpService(repository);

    await expect(
      service.signUp({
        businessName: 'Studio Doppio',
        email: 'mario@example.it',
        password: 'StrongPass123!',
        vertical: 'beauty',
        requestId: 'req_3',
      }),
    ).rejects.toMatchObject({ code: 'conflict' });
    expect(repository.inserts).toHaveLength(0);
    expect(createUser).not.toHaveBeenCalled();
  });
});

class FakeRepo implements SignUpRepository {
  readonly inserts: PendingTenantInsertInput[] = [];
  readonly byEmail = new Map<string, { id: string }>();
  readonly deletedTenants: string[] = [];
  failDelete = false;

  async findTenantByBillingEmail(email: string): Promise<{ id: string } | null> {
    return this.byEmail.get(email) ?? null;
  }

  async insertPendingTenant(input: PendingTenantInsertInput): Promise<{ id: string }> {
    this.inserts.push(input);
    return { id: 'tenant_001' };
  }

  async deletePendingTenant(tenantId: string): Promise<void> {
    this.deletedTenants.push(tenantId);
    if (this.failDelete) throw new Error('cleanup failed');
  }
}

function mockAdmin() {
  vi.mocked(createSupabaseAdminClient).mockReturnValue({
    auth: { admin: { createUser } },
  } as unknown as ReturnType<typeof createSupabaseAdminClient>);
}
