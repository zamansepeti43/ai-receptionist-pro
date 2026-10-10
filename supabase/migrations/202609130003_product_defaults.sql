-- Product defaults: remove upstream customer-facing defaults from existing and future tenants.
alter table ai_receptionist.tenant_config
  alter column assistant_name set default 'AI Receptionist',
  alter column default_locale set default 'en-US';

update ai_receptionist.tenant_config
set assistant_name = 'AI Receptionist'
where assistant_name = 'Ambrogio';

update ai_receptionist.tenant_config
set default_locale = 'en-US'
where default_locale = 'it-IT';
