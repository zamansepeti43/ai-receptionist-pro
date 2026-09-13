-- Product defaults: remove upstream customer-facing defaults from existing and future tenants.
alter table public.tenant_config
  alter column assistant_name set default 'AI Receptionist',
  alter column default_locale set default 'en-US';

update public.tenant_config
set assistant_name = 'AI Receptionist'
where assistant_name = 'Ambrogio';

update public.tenant_config
set default_locale = 'en-US'
where default_locale = 'it-IT';
