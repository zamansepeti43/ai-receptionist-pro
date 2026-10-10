create extension if not exists "pgcrypto";
create extension if not exists "vector";
create extension if not exists "btree_gist";

-- Isolate AI Receptionist tables and functions from other apps sharing this project.
create schema if not exists ai_receptionist;
grant usage on schema ai_receptionist to anon, authenticated, service_role;
grant all on all tables in schema ai_receptionist to anon, authenticated, service_role;
grant all on all routines in schema ai_receptionist to anon, authenticated, service_role;
grant all on all sequences in schema ai_receptionist to anon, authenticated, service_role;
alter default privileges for role postgres in schema ai_receptionist
  grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema ai_receptionist
  grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema ai_receptionist
  grant all on sequences to anon, authenticated, service_role;
alter role authenticator set pgrst.db_schemas = 'public, graphql_public, ai_receptionist';
notify pgrst, 'reload config';


create table if not exists ai_receptionist.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  plan text not null default 'trial' check (plan in ('trial', 'starter', 'professional', 'agency')),
  status text not null default 'active' check (status in ('active', 'expired', 'suspended', 'cancelled')),
  billing_email text not null,
  vat_number text,
  fiscal_code text,
  country text not null default 'IT',
  timezone text not null default 'Europe/Rome',
  business_type text,
  trial_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists ai_receptionist.users (
  id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  full_name text,
  phone text,
  avatar_url text,
  mfa_enabled boolean not null default false,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_receptionist.tenant_config (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null unique references ai_receptionist.tenants(id) on delete cascade,
  studio_name text not null,
  assistant_name text not null default 'Ambrogio',
  city text,
  address text,
  phone text,
  email text,
  default_locale text not null default 'it-IT',
  ai_disclosure_enabled boolean not null default true,
  auto_reply_enabled boolean not null default false,
  voice_messages_enabled boolean not null default true,
  voice_replies_enabled boolean not null default false,
  booking_min_lead_minutes integer not null default 120 check (booking_min_lead_minutes >= 0),
  booking_slot_step_minutes integer not null default 15 check (booking_slot_step_minutes > 0),
  booking_buffer_minutes integer not null default 0 check (booking_buffer_minutes >= 0),
  booking_max_days_ahead integer not null default 30 check (booking_max_days_ahead > 0),
  elevenlabs_voice_id text,
  elevenlabs_stt_model text not null default 'scribe_v2',
  elevenlabs_tts_model text not null default 'eleven_flash_v2_5',
  human_escalation_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_receptionist.services (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  name text not null,
  description text,
  duration_minutes integer not null default 30 check (duration_minutes > 0),
  price_cents integer check (price_cents is null or price_cents >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_receptionist.business_hours (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  weekday integer not null check (weekday between 0 and 6),
  opens_at time not null,
  closes_at time not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, weekday, opens_at, closes_at)
);

create table if not exists ai_receptionist.conversations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  channel text not null check (channel in ('whatsapp', 'instagram_dm', 'web_chat', 'sms')),
  customer_identifier text not null,
  customer_name text,
  status text not null default 'active' check (status in ('active', 'escalated', 'closed', 'spam')),
  ai_enabled boolean not null default true,
  last_message_at timestamptz not null default now(),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, channel, customer_identifier)
);

create table if not exists ai_receptionist.messages (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  conversation_id uuid not null references ai_receptionist.conversations(id) on delete cascade,
  direction text not null check (direction in ('inbound', 'outbound')),
  sender_type text not null check (sender_type in ('customer', 'ai', 'human', 'system')),
  content text,
  media_urls text[] not null default '{}',
  message_type text not null default 'text' check (message_type in ('text', 'image', 'audio', 'document', 'location', 'status')),
  status text not null default 'received' check (status in ('received', 'pending', 'sent', 'delivered', 'read', 'failed')),
  transcript_text text,
  transcript_language text,
  audio_duration_secs numeric(10,3),
  generated_audio_url text,
  voice_id text,
  voice_model_id text,
  intent text,
  confidence numeric(3,2),
  tokens_used integer,
  cost_cents integer,
  external_id text,
  provider_message_id text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, external_id)
);

create table if not exists ai_receptionist.appointments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  conversation_id uuid references ai_receptionist.conversations(id),
  service_id uuid references ai_receptionist.services(id),
  customer_identifier text not null,
  customer_name text not null,
  customer_phone text,
  scheduled_at timestamptz not null,
  duration_minutes integer not null default 30,
  service_type text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed', 'no_show')),
  calendar_event_id text,
  calendar_provider text check (calendar_provider is null or calendar_provider in ('google_calendar')),
  calendar_sync_status text not null default 'not_configured' check (calendar_sync_status in ('not_configured', 'pending', 'synced', 'failed')),
  calendar_sync_error text,
  calendar_event_html_link text,
  booking_source text not null default 'manual' check (booking_source in ('manual', 'whatsapp_ai', 'dashboard', 'api')),
  notes text,
  confirmation_queued_at timestamptz,
  reminder_24h_queued_at timestamptz,
  reminder_1h_queued_at timestamptz,
  cancellation_queued_at timestamptz,
  reminded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_receptionist.knowledge_base (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  title text not null,
  content text not null,
  category text,
  embedding vector(1536),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_receptionist.integrations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  provider text not null check (provider in ('whatsapp_360dialog', 'google_calendar', 'cal_com', 'calendly', 'fatture_in_cloud', 'stripe')),
  external_account_id text,
  external_display_id text,
  status text not null default 'active' check (status in ('active', 'paused', 'error', 'revoked')),
  credentials jsonb not null default '{}',
  config jsonb not null default '{}',
  last_sync_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_receptionist.opt_outs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  channel text not null check (channel in ('whatsapp', 'instagram_dm', 'web_chat', 'sms')),
  customer_identifier text not null,
  reason text,
  opted_out_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (tenant_id, channel, customer_identifier)
);

create table if not exists ai_receptionist.usage_metrics (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  metric_month date not null,
  conversations_count integer not null default 0 check (conversations_count >= 0),
  messages_count integer not null default 0 check (messages_count >= 0),
  ai_cost_cents integer not null default 0 check (ai_cost_cents >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, metric_month)
);

create table if not exists ai_receptionist.invoices (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  stripe_invoice_id text not null unique,
  fattureincloud_invoice_id text,
  invoice_number text,
  amount_cents integer not null check (amount_cents >= 0),
  vat_cents integer not null default 0 check (vat_cents >= 0),
  currency text not null default 'EUR',
  status text not null default 'draft' check (status in ('draft', 'sent', 'paid', 'void', 'failed')),
  sdi_status text check (sdi_status in ('not_required', 'not_sent', 'sent', 'accepted', 'rejected')),
  issued_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_receptionist.ai_prompts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references ai_receptionist.tenants(id) on delete cascade,
  prompt_key text not null,
  version integer not null,
  model text not null,
  prompt_text text not null,
  active boolean not null default false,
  created_by uuid references ai_receptionist.users(id),
  created_at timestamptz not null default now(),
  unique (tenant_id, prompt_key, version)
);

create table if not exists ai_receptionist.voice_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  message_id uuid references ai_receptionist.messages(id) on delete set null,
  provider text not null default 'elevenlabs',
  direction text not null check (direction in ('stt', 'tts')),
  model text not null,
  voice_id text,
  input_chars integer,
  audio_duration_secs numeric(10,3),
  cost_cents integer,
  status text not null default 'completed' check (status in ('pending', 'completed', 'failed')),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists ai_receptionist.webhook_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references ai_receptionist.tenants(id) on delete cascade,
  provider text not null,
  event_type text not null,
  external_id text not null,
  idempotency_key text not null unique,
  status text not null default 'received' check (status in ('received', 'processed', 'duplicate', 'failed')),
  payload jsonb not null default '{}',
  error_code text,
  error_message text,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

create table if not exists ai_receptionist.whatsapp_outbox_jobs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  message_id uuid not null unique references ai_receptionist.messages(id) on delete cascade,
  provider text not null default 'whatsapp_360dialog' check (provider in ('whatsapp_360dialog')),
  status text not null default 'pending' check (status in ('pending', 'processing', 'retry', 'sent', 'failed', 'dead_letter')),
  recipient_identifier text not null,
  payload jsonb not null default '{}',
  attempt_count integer not null default 0 check (attempt_count >= 0),
  max_attempts integer not null default 5 check (max_attempts > 0),
  next_attempt_at timestamptz not null default now(),
  locked_at timestamptz,
  locked_by text,
  provider_message_id text,
  last_error_code text,
  last_error_message text,
  last_attempt_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_receptionist.whatsapp_message_templates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  provider text not null default 'whatsapp_360dialog' check (provider in ('whatsapp_360dialog')),
  name text not null,
  language_code text not null default 'it',
  category text not null check (category in ('utility', 'marketing', 'authentication')),
  status text not null default 'pending' check (status in ('draft', 'pending', 'approved', 'rejected', 'paused', 'disabled')),
  external_id text,
  quality_rating text,
  components jsonb not null default '[]',
  last_synced_at timestamptz,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, provider, name, language_code)
);

create table if not exists ai_receptionist.whatsapp_voice_jobs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  message_id uuid not null unique references ai_receptionist.messages(id) on delete cascade,
  provider text not null default 'whatsapp_360dialog' check (provider in ('whatsapp_360dialog')),
  status text not null default 'pending' check (status in ('pending', 'processing', 'retry', 'completed', 'failed', 'dead_letter')),
  media_id text not null,
  media_mime_type text,
  media_sha256 text,
  payload jsonb not null default '{}',
  attempt_count integer not null default 0 check (attempt_count >= 0),
  max_attempts integer not null default 5 check (max_attempts > 0),
  next_attempt_at timestamptz not null default now(),
  locked_at timestamptz,
  locked_by text,
  last_error_code text,
  last_error_message text,
  last_attempt_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_receptionist.audit_log (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references ai_receptionist.tenants(id),
  user_id uuid references ai_receptionist.users(id),
  action text not null,
  resource_type text,
  resource_id uuid,
  ip_address inet,
  user_agent text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists ai_receptionist.billing_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references ai_receptionist.tenants(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  event_type text not null,
  amount_cents integer,
  currency text not null default 'EUR',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists users_tenant_id_idx on ai_receptionist.users(tenant_id);
create index if not exists services_tenant_id_idx on ai_receptionist.services(tenant_id);
create index if not exists business_hours_tenant_id_idx on ai_receptionist.business_hours(tenant_id);
create index if not exists conversations_tenant_last_message_idx on ai_receptionist.conversations(tenant_id, last_message_at desc);
create index if not exists messages_conversation_created_idx on ai_receptionist.messages(conversation_id, created_at desc);
create unique index if not exists messages_tenant_provider_message_unique_idx
  on ai_receptionist.messages(tenant_id, provider_message_id)
  where provider_message_id is not null;
create index if not exists appointments_tenant_scheduled_idx on ai_receptionist.appointments(tenant_id, scheduled_at);
create index if not exists appointments_tenant_status_scheduled_idx
  on ai_receptionist.appointments(tenant_id, status, scheduled_at);
create index if not exists appointments_reminder_due_idx
  on ai_receptionist.appointments(status, scheduled_at)
  where status = 'confirmed'
    and (reminder_24h_queued_at is null or reminder_1h_queued_at is null);
create index if not exists knowledge_base_tenant_idx on ai_receptionist.knowledge_base(tenant_id);
create index if not exists integrations_tenant_idx on ai_receptionist.integrations(tenant_id);
create unique index if not exists integrations_provider_external_account_unique_idx
  on ai_receptionist.integrations(provider, external_account_id)
  where external_account_id is not null;
create unique index if not exists integrations_tenant_singleton_provider_unique_idx
  on ai_receptionist.integrations(tenant_id, provider)
  where external_account_id is null;
create index if not exists integrations_provider_external_account_lookup_idx
  on ai_receptionist.integrations(provider, external_account_id)
  where external_account_id is not null;
create index if not exists opt_outs_tenant_idx on ai_receptionist.opt_outs(tenant_id);
create index if not exists usage_metrics_tenant_month_idx on ai_receptionist.usage_metrics(tenant_id, metric_month);
create index if not exists invoices_tenant_idx on ai_receptionist.invoices(tenant_id);
create index if not exists ai_prompts_tenant_key_idx on ai_receptionist.ai_prompts(tenant_id, prompt_key);
create index if not exists voice_events_tenant_created_idx on ai_receptionist.voice_events(tenant_id, created_at desc);
create index if not exists webhook_events_tenant_received_idx on ai_receptionist.webhook_events(tenant_id, received_at desc);
create index if not exists webhook_events_provider_external_idx on ai_receptionist.webhook_events(provider, external_id);
create index if not exists whatsapp_outbox_jobs_tenant_status_idx on ai_receptionist.whatsapp_outbox_jobs(tenant_id, status);
create index if not exists whatsapp_outbox_jobs_ready_idx
  on ai_receptionist.whatsapp_outbox_jobs(next_attempt_at, created_at)
  where status in ('pending', 'retry');
create index if not exists whatsapp_message_templates_tenant_status_idx
  on ai_receptionist.whatsapp_message_templates(tenant_id, status, category);
create index if not exists whatsapp_voice_jobs_tenant_status_idx on ai_receptionist.whatsapp_voice_jobs(tenant_id, status);
create index if not exists whatsapp_voice_jobs_ready_idx
  on ai_receptionist.whatsapp_voice_jobs(next_attempt_at, created_at)
  where status in ('pending', 'retry');
create index if not exists audit_log_tenant_created_idx on ai_receptionist.audit_log(tenant_id, created_at desc);
create index if not exists billing_events_tenant_idx on ai_receptionist.billing_events(tenant_id);

do $$
begin
  if exists (select 1 from pg_extension where extname = 'vector') then
    create index if not exists knowledge_base_embedding_idx
      on ai_receptionist.knowledge_base using hnsw (embedding vector_cosine_ops);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'appointments_no_confirmed_overlap'
      and conrelid = 'ai_receptionist.appointments'::regclass
  ) then
    alter table ai_receptionist.appointments
      add constraint appointments_no_confirmed_overlap
      exclude using gist (
        tenant_id with =,
        tsrange(
          scheduled_at at time zone 'UTC',
          (scheduled_at at time zone 'UTC') + duration_minutes * interval '1 minute',
          '[)'
        ) with &&
      )
      where (status = 'confirmed');
  end if;
end $$;

create or replace function ai_receptionist.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function ai_receptionist.current_tenant_id()
returns uuid
language sql
stable
as $$
  with claim as (
    select nullif(
      coalesce(
        auth.jwt() ->> 'tenant_id',
        auth.jwt() -> 'app_metadata' ->> 'tenant_id'
      ),
      ''
    ) as tenant_id
  )
  select case
    when tenant_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      then tenant_id::uuid
    else null
  end
  from claim;
$$;

create or replace function ai_receptionist.current_tenant_role()
returns text
language sql
stable
as $$
  select coalesce(
    auth.jwt() ->> 'role',
    auth.jwt() -> 'app_metadata' ->> 'role',
    ''
  );
$$;

create or replace function ai_receptionist.increment_usage_metrics(
  p_tenant_id uuid,
  p_metric_month date,
  p_messages_delta integer default 0,
  p_conversations_delta integer default 0,
  p_ai_cost_cents_delta integer default 0
)
returns void
language plpgsql
security definer
set search_path = ai_receptionist, public, extensions
as $$
begin
  insert into ai_receptionist.usage_metrics (
    tenant_id,
    metric_month,
    messages_count,
    conversations_count,
    ai_cost_cents
  )
  values (
    p_tenant_id,
    p_metric_month,
    greatest(p_messages_delta, 0),
    greatest(p_conversations_delta, 0),
    greatest(p_ai_cost_cents_delta, 0)
  )
  on conflict (tenant_id, metric_month)
  do update set
    messages_count = ai_receptionist.usage_metrics.messages_count + greatest(p_messages_delta, 0),
    conversations_count = ai_receptionist.usage_metrics.conversations_count + greatest(p_conversations_delta, 0),
    ai_cost_cents = ai_receptionist.usage_metrics.ai_cost_cents + greatest(p_ai_cost_cents_delta, 0),
    updated_at = now();
end;
$$;

revoke execute on function ai_receptionist.increment_usage_metrics(uuid, date, integer, integer, integer)
  from public, anon, authenticated;
grant execute on function ai_receptionist.increment_usage_metrics(uuid, date, integer, integer, integer)
  to service_role;

create or replace function ai_receptionist.match_knowledge_base(
  p_tenant_id uuid,
  p_query_embedding vector(1536),
  p_match_count integer default 3,
  p_min_similarity double precision default 0.72
)
returns table (
  id uuid,
  title text,
  content text,
  category text,
  similarity double precision,
  updated_at timestamptz
)
language sql
security definer
set search_path = ai_receptionist, public, extensions
as $$
  select
    kb.id,
    kb.title,
    kb.content,
    kb.category,
    1 - (kb.embedding <=> p_query_embedding) as similarity,
    kb.updated_at
  from ai_receptionist.knowledge_base kb
  where kb.tenant_id = p_tenant_id
    and kb.active = true
    and kb.embedding is not null
    and 1 - (kb.embedding <=> p_query_embedding) >= p_min_similarity
  order by kb.embedding <=> p_query_embedding
  limit greatest(least(p_match_count, 10), 1);
$$;

revoke execute on function ai_receptionist.match_knowledge_base(uuid, vector(1536), integer, double precision)
  from public, anon, authenticated;
grant execute on function ai_receptionist.match_knowledge_base(uuid, vector(1536), integer, double precision)
  to service_role;

create or replace function ai_receptionist.claim_whatsapp_outbox_jobs(
  p_limit integer default 10,
  p_lock_id text default null,
  p_lock_ttl_seconds integer default 300
)
returns table (
  id uuid,
  tenant_id uuid,
  message_id uuid,
  recipient_identifier text,
  customer_service_window_expires_at timestamptz,
  payload jsonb,
  attempt_count integer,
  max_attempts integer
)
language plpgsql
security definer
set search_path = ai_receptionist, public, extensions
as $$
begin
  return query
  with candidates as (
    select
      job.id,
      conversation.last_message_at + interval '24 hours' as customer_service_window_expires_at
    from ai_receptionist.whatsapp_outbox_jobs job
    join ai_receptionist.messages message
      on message.id = job.message_id
      and message.tenant_id = job.tenant_id
      and message.direction = 'outbound'
    join ai_receptionist.conversations conversation
      on conversation.id = message.conversation_id
      and conversation.tenant_id = job.tenant_id
    where job.status in ('pending', 'retry')
      and job.next_attempt_at <= now()
      and (
        job.locked_at is null
        or job.locked_at < now() - make_interval(secs => greatest(p_lock_ttl_seconds, 1))
      )
    order by job.next_attempt_at asc, job.created_at asc
    limit greatest(least(p_limit, 50), 1)
    for update of job skip locked
  )
  update ai_receptionist.whatsapp_outbox_jobs job
  set
    status = 'processing',
    locked_at = now(),
    locked_by = coalesce(nullif(p_lock_id, ''), gen_random_uuid()::text),
    attempt_count = job.attempt_count + 1,
    last_attempt_at = now(),
    updated_at = now()
  from candidates
  where job.id = candidates.id
  returning
    job.id,
    job.tenant_id,
    job.message_id,
    job.recipient_identifier,
    candidates.customer_service_window_expires_at,
    job.payload,
    job.attempt_count,
    job.max_attempts;
end;
$$;

revoke execute on function ai_receptionist.claim_whatsapp_outbox_jobs(integer, text, integer)
  from public, anon, authenticated;
grant execute on function ai_receptionist.claim_whatsapp_outbox_jobs(integer, text, integer)
  to service_role;

create or replace function ai_receptionist.complete_whatsapp_outbox_job(
  p_job_id uuid,
  p_provider_message_id text,
  p_provider_response jsonb,
  p_message_metadata jsonb
)
returns void
language plpgsql
security definer
set search_path = ai_receptionist, public, extensions
as $$
declare
  v_job ai_receptionist.whatsapp_outbox_jobs%rowtype;
begin
  select *
  into v_job
  from ai_receptionist.whatsapp_outbox_jobs
  where id = p_job_id
  for update;

  if not found then
    raise exception 'whatsapp_outbox_job_not_found';
  end if;

  update ai_receptionist.whatsapp_outbox_jobs
  set
    status = 'sent',
    provider_message_id = p_provider_message_id,
    payload = jsonb_set(
      payload,
      '{provider_response}',
      coalesce(p_provider_response, '{}'::jsonb),
      true
    ),
    last_error_code = null,
    last_error_message = null,
    locked_at = null,
    locked_by = null,
    sent_at = now(),
    updated_at = now()
  where id = p_job_id;

  update ai_receptionist.messages
  set
    status = 'sent',
    provider_message_id = p_provider_message_id,
    metadata = coalesce(p_message_metadata, metadata),
    updated_at = now()
  where id = v_job.message_id
    and tenant_id = v_job.tenant_id
    and direction = 'outbound';
end;
$$;

revoke execute on function ai_receptionist.complete_whatsapp_outbox_job(uuid, text, jsonb, jsonb)
  from public, anon, authenticated;
grant execute on function ai_receptionist.complete_whatsapp_outbox_job(uuid, text, jsonb, jsonb)
  to service_role;

create or replace function ai_receptionist.fail_whatsapp_outbox_job(
  p_job_id uuid,
  p_status text,
  p_next_attempt_at timestamptz,
  p_error_code text,
  p_error_message text,
  p_message_metadata jsonb
)
returns void
language plpgsql
security definer
set search_path = ai_receptionist, public, extensions
as $$
declare
  v_job ai_receptionist.whatsapp_outbox_jobs%rowtype;
begin
  if p_status not in ('retry', 'failed', 'dead_letter') then
    raise exception 'invalid_whatsapp_outbox_failure_status';
  end if;

  select *
  into v_job
  from ai_receptionist.whatsapp_outbox_jobs
  where id = p_job_id
  for update;

  if not found then
    raise exception 'whatsapp_outbox_job_not_found';
  end if;

  update ai_receptionist.whatsapp_outbox_jobs
  set
    status = p_status,
    next_attempt_at = case
      when p_status = 'retry' then coalesce(p_next_attempt_at, now())
      else next_attempt_at
    end,
    last_error_code = p_error_code,
    last_error_message = p_error_message,
    locked_at = null,
    locked_by = null,
    updated_at = now()
  where id = p_job_id;

  if p_status in ('failed', 'dead_letter') then
    update ai_receptionist.messages
    set
      status = 'failed',
      metadata = coalesce(p_message_metadata, metadata),
      updated_at = now()
    where id = v_job.message_id
      and tenant_id = v_job.tenant_id
      and direction = 'outbound';
  end if;
end;
$$;

revoke execute on function ai_receptionist.fail_whatsapp_outbox_job(uuid, text, timestamptz, text, text, jsonb)
  from public, anon, authenticated;
grant execute on function ai_receptionist.fail_whatsapp_outbox_job(uuid, text, timestamptz, text, text, jsonb)
  to service_role;

create or replace function ai_receptionist.claim_whatsapp_voice_jobs(
  p_limit integer default 10,
  p_lock_id text default null,
  p_lock_ttl_seconds integer default 300
)
returns table (
  id uuid,
  tenant_id uuid,
  message_id uuid,
  media_id text,
  media_mime_type text,
  media_sha256 text,
  payload jsonb,
  attempt_count integer,
  max_attempts integer
)
language plpgsql
security definer
set search_path = ai_receptionist, public, extensions
as $$
begin
  return query
  with candidates as (
    select job.id
    from ai_receptionist.whatsapp_voice_jobs job
    where job.status in ('pending', 'retry')
      and job.next_attempt_at <= now()
      and (
        job.locked_at is null
        or job.locked_at < now() - make_interval(secs => greatest(p_lock_ttl_seconds, 1))
      )
    order by job.next_attempt_at asc, job.created_at asc
    limit greatest(least(p_limit, 50), 1)
    for update skip locked
  )
  update ai_receptionist.whatsapp_voice_jobs job
  set
    status = 'processing',
    locked_at = now(),
    locked_by = coalesce(nullif(p_lock_id, ''), gen_random_uuid()::text),
    attempt_count = job.attempt_count + 1,
    last_attempt_at = now(),
    updated_at = now()
  from candidates
  where job.id = candidates.id
  returning
    job.id,
    job.tenant_id,
    job.message_id,
    job.media_id,
    job.media_mime_type,
    job.media_sha256,
    job.payload,
    job.attempt_count,
    job.max_attempts;
end;
$$;

revoke execute on function ai_receptionist.claim_whatsapp_voice_jobs(integer, text, integer)
  from public, anon, authenticated;
grant execute on function ai_receptionist.claim_whatsapp_voice_jobs(integer, text, integer)
  to service_role;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'tenants',
    'users',
    'tenant_config',
    'services',
    'business_hours',
    'conversations',
    'messages',
    'appointments',
    'knowledge_base',
    'integrations',
    'usage_metrics',
    'invoices',
    'whatsapp_outbox_jobs',
    'whatsapp_message_templates',
    'whatsapp_voice_jobs'
  ]
  loop
    execute format('drop trigger if exists set_updated_at on ai_receptionist.%I', table_name);
    execute format(
      'create trigger set_updated_at before update on ai_receptionist.%I for each row execute function ai_receptionist.update_updated_at_column()',
      table_name
    );
  end loop;
end $$;

alter table ai_receptionist.tenants enable row level security;
alter table ai_receptionist.users enable row level security;
alter table ai_receptionist.tenant_config enable row level security;
alter table ai_receptionist.services enable row level security;
alter table ai_receptionist.business_hours enable row level security;
alter table ai_receptionist.conversations enable row level security;
alter table ai_receptionist.messages enable row level security;
alter table ai_receptionist.appointments enable row level security;
alter table ai_receptionist.knowledge_base enable row level security;
alter table ai_receptionist.integrations enable row level security;
alter table ai_receptionist.opt_outs enable row level security;
alter table ai_receptionist.usage_metrics enable row level security;
alter table ai_receptionist.invoices enable row level security;
alter table ai_receptionist.ai_prompts enable row level security;
alter table ai_receptionist.voice_events enable row level security;
alter table ai_receptionist.webhook_events enable row level security;
alter table ai_receptionist.whatsapp_outbox_jobs enable row level security;
alter table ai_receptionist.whatsapp_message_templates enable row level security;
alter table ai_receptionist.whatsapp_voice_jobs enable row level security;
alter table ai_receptionist.audit_log enable row level security;
alter table ai_receptionist.billing_events enable row level security;

create policy tenants_select_own on ai_receptionist.tenants
  for select using (id = ai_receptionist.current_tenant_id());

create policy tenants_owner_update_own on ai_receptionist.tenants
  for update using (id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() = 'owner')
  with check (id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() = 'owner');

create policy users_tenant_select on ai_receptionist.users
  for select using (tenant_id = ai_receptionist.current_tenant_id());

create policy users_admin_write on ai_receptionist.users
  for all using (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() in ('owner', 'admin'))
  with check (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() in ('owner', 'admin'));

create policy tenant_config_tenant_all on ai_receptionist.tenant_config
  for all using (tenant_id = ai_receptionist.current_tenant_id())
  with check (tenant_id = ai_receptionist.current_tenant_id());

create policy services_tenant_all on ai_receptionist.services
  for all using (tenant_id = ai_receptionist.current_tenant_id())
  with check (tenant_id = ai_receptionist.current_tenant_id());

create policy business_hours_tenant_all on ai_receptionist.business_hours
  for all using (tenant_id = ai_receptionist.current_tenant_id())
  with check (tenant_id = ai_receptionist.current_tenant_id());

create policy conversations_tenant_all on ai_receptionist.conversations
  for all using (tenant_id = ai_receptionist.current_tenant_id())
  with check (tenant_id = ai_receptionist.current_tenant_id());

create policy messages_tenant_all on ai_receptionist.messages
  for all using (tenant_id = ai_receptionist.current_tenant_id())
  with check (tenant_id = ai_receptionist.current_tenant_id());

create policy appointments_tenant_all on ai_receptionist.appointments
  for all using (tenant_id = ai_receptionist.current_tenant_id())
  with check (tenant_id = ai_receptionist.current_tenant_id());

create policy knowledge_base_tenant_all on ai_receptionist.knowledge_base
  for all using (tenant_id = ai_receptionist.current_tenant_id())
  with check (tenant_id = ai_receptionist.current_tenant_id());

create policy integrations_tenant_all on ai_receptionist.integrations
  for all using (tenant_id = ai_receptionist.current_tenant_id())
  with check (tenant_id = ai_receptionist.current_tenant_id());

create policy opt_outs_tenant_all on ai_receptionist.opt_outs
  for all using (tenant_id = ai_receptionist.current_tenant_id())
  with check (tenant_id = ai_receptionist.current_tenant_id());

create policy usage_metrics_tenant_select on ai_receptionist.usage_metrics
  for select using (tenant_id = ai_receptionist.current_tenant_id());

create policy invoices_tenant_select on ai_receptionist.invoices
  for select using (tenant_id = ai_receptionist.current_tenant_id());

create policy ai_prompts_tenant_select on ai_receptionist.ai_prompts
  for select using (tenant_id is null or tenant_id = ai_receptionist.current_tenant_id());

create policy ai_prompts_admin_write on ai_receptionist.ai_prompts
  for all using (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() in ('owner', 'admin'))
  with check (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() in ('owner', 'admin'));

create policy voice_events_admin_select on ai_receptionist.voice_events
  for select using (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() in ('owner', 'admin'));

create policy webhook_events_admin_select on ai_receptionist.webhook_events
  for select using (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() in ('owner', 'admin'));

create policy whatsapp_outbox_jobs_admin_select on ai_receptionist.whatsapp_outbox_jobs
  for select using (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() in ('owner', 'admin'));

create policy whatsapp_message_templates_admin_all on ai_receptionist.whatsapp_message_templates
  for all using (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() in ('owner', 'admin'))
  with check (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() in ('owner', 'admin'));

create policy whatsapp_voice_jobs_admin_select on ai_receptionist.whatsapp_voice_jobs
  for select using (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() in ('owner', 'admin'));

create policy audit_log_admin_select on ai_receptionist.audit_log
  for select using (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() in ('owner', 'admin'));

create policy billing_events_owner_select on ai_receptionist.billing_events
  for select using (tenant_id = ai_receptionist.current_tenant_id() and ai_receptionist.current_tenant_role() = 'owner');
