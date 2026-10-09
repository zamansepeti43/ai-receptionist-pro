import type { Metadata } from 'next';
import type React from 'react';
import Link from 'next/link';
import { DashboardTranslations } from '@/components/dashboard/DashboardTranslations';

import { requireSession, type AuthSession } from '@/lib/auth/session';
import { toAppError } from '@/lib/errors/app-error';
import { logger } from '@/lib/logging/logger';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import type { AppointmentStatus, BookingSource } from '@/server/appointments/booking';
import { createTenantSettingsService } from '@/server/settings/tenant-settings';

export const metadata: Metadata = {
  title: 'Calendario · Ambrogio.ai',
};

/**
 * Quanti giorni in avanti mostra l'agenda. Nessuna data e' scritta a mano:
 * la finestra parte sempre dall'istante della richiesta e viene ricalcolata
 * nel fuso orario del tenant.
 */
const DAYS_AHEAD = 14;
const DAY_MS = 24 * 60 * 60 * 1000;
const FETCH_LIMIT = 300;
const DEFAULT_TIMEZONE = 'Europe/Rome';

const STATUS_CONFIG: Record<AppointmentStatus, { readonly tr: string; readonly en: string; readonly badge: string }> = {
  confirmed: { tr: 'Onaylandı', en: 'Confirmed', badge: 'badge-success' },
  cancelled: { tr: 'İptal edildi', en: 'Cancelled', badge: 'badge-danger' },
  completed: { tr: 'Tamamlandı', en: 'Completed', badge: 'badge-neutral' },
  no_show: { tr: 'Gelmedi', en: 'No-show', badge: 'badge-warm' },
};

const SOURCE_LABEL: Record<BookingSource, { tr: string; en: string }> = {
  manual: { tr: 'Elle girildi', en: 'Entered manually' },
  whatsapp_ai: { tr: 'Ambrogio tarafından WhatsApp ile alındı', en: 'Booked by Ambrogio on WhatsApp' },
  dashboard: { tr: 'Kontrol panelinden oluşturuldu', en: 'Created from dashboard' },
  api: { tr: 'API üzerinden oluşturuldu', en: 'Created via API' },
};

type CalendarAppointment = {
  readonly id: string;
  readonly dayKey: string;
  readonly scheduledAt: Date;
  readonly durationMinutes: number | null;
  readonly customerName: string;
  readonly serviceName: string | null;
  readonly status: AppointmentStatus;
  readonly bookingSource: BookingSource;
};

type CalendarDay = {
  readonly key: string;
  readonly label: string;
  readonly appointments: readonly CalendarAppointment[];
};

type CalendarData = {
  readonly timezone: string;
  readonly rangeLabel: string;
  readonly days: readonly CalendarDay[];
  readonly todayCount: number;
  readonly weekCount: number;
  readonly confirmedCount: number;
  readonly aiBookedCount: number;
};

type CalendarResult = { readonly ok: true; readonly data: CalendarData } | { readonly ok: false };

export default async function CalendarPage() {
  const session = await requireSession();
  const result = await loadCalendar(session);

  if (!result.ok) {
    return (
      <>
        <CalendarHeader subtitle={<DashboardTranslations tr="Takvim şu anda kullanılamıyor." en="Calendar is unavailable right now." />} />
        <section className="card card-padded stack stack-3">
          <h2 style={{ fontSize: 'var(--text-lg)' }}><DashboardTranslations tr="Randevular okunamıyor" en="Could not load appointments" /></h2>
          <p className="muted">
            <DashboardTranslations tr="Takvim yüklenemedi. Biraz sonra sayfayı yenileyin; sorun sürerse hizmet durumunu kontrol edin." en="The calendar could not be loaded. Refresh in a moment; if the problem persists, check service status." />
          </p>
          <Link href="/status" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
            Stato del servizio
          </Link>
        </section>
      </>
    );
  }

  const { data } = result;

  return (
    <>
      <CalendarHeader subtitle={<><DashboardTranslations tr={buildRangeLabel(data.days.map((day) => day.key), data.timezone, true)} en={buildRangeLabel(data.days.map(d => d.key), data.timezone, false)} /> · <DashboardTranslations tr="Saat dilimi" en="Timezone" /> {data.timezone}</>} />

      <div
        className="kpi-grid"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
      >
        <article className="kpi">
          <span className="kpi-label"><DashboardTranslations tr="Bugün" en="Today" /></span>
          <span className="kpi-value">{data.todayCount}</span>
        </article>
        <article className="kpi">
          <span className="kpi-label"><DashboardTranslations tr="Önümüzdeki 7 gün" en="Next 7 days" /></span>
          <span className="kpi-value">{data.weekCount}</span>
        </article>
        <article className="kpi">
          <span className="kpi-label"><DashboardTranslations tr="Onaylananlar" en="Confirmed" /></span>
          <span className="kpi-value">{data.confirmedCount}</span>
        </article>
        <article className="kpi">
          <span className="kpi-label"><DashboardTranslations tr="Ambrogio tarafından oluşturulan" en="Booked by Ambrogio" /></span>
          <span className="kpi-value">{data.aiBookedCount}</span>
        </article>
      </div>

      {data.days.length === 0 ? (
        <section className="card">
          <div className="empty-state">
            <p className="empty-state-title"><DashboardTranslations tr="Takvimde randevu yok" en="No appointments on the calendar" /></p>
            <p className="empty-state-text">
              <DashboardTranslations tr="Ambrogio, hizmetler ve çalışma saatleri ayarlandığında otomatik randevu oluşturur. Takvim boşsa önce bu ayarları tamamlayın." en="Ambrogio can book automatically once services and opening hours are configured. If the calendar is empty, start with those settings." />
            </p>
            <div className="row" style={{ gap: 'var(--space-2)' }}>
              <Link href="/settings" className="btn btn-primary">
                Configura servizi e orari
              </Link>
              <Link href="/conversations" className="btn btn-ghost">
                Vedi le conversazioni
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <div className="stack stack-6">
          {data.days.map((day) => (
            <section key={day.key} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <header
                style={{
                  padding: 'var(--space-4) var(--space-6)',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  background: 'var(--color-surface-sunken)',
                }}
              >
                <h2 style={{ fontSize: 'var(--text-lg)' }}>{day.label}</h2>
                <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>
                  {day.appointments.length === 1
                    ? <DashboardTranslations tr="1 randevu" en="1 appointment" />
                    : <DashboardTranslations tr={`${day.appointments.length} randevu`} en={`${day.appointments.length} appointments`} />}
                </span>
              </header>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {day.appointments.map((appointment, index) => (
                  <li
                    key={appointment.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '96px 1fr auto',
                      gap: 'var(--space-4)',
                      alignItems: 'center',
                      padding: 'var(--space-4) var(--space-6)',
                      borderTop: index === 0 ? 'none' : '1px solid var(--color-border)',
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 700,
                        color: 'var(--color-accent)',
                      }}
                    >
                      {formatTime(appointment.scheduledAt, data.timezone)}
                    </span>
                    <div>
                      <p style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                        {appointment.customerName}
                      </p>
                      <p className="muted" style={{ fontSize: 'var(--text-sm)', marginTop: '2px' }}>
                        {describeAppointment(appointment)}
                      </p>
                    </div>
                    <span className={`badge ${STATUS_CONFIG[appointment.status].badge}`}>
                      <DashboardTranslations tr={STATUS_CONFIG[appointment.status].tr} en={STATUS_CONFIG[appointment.status].en} />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

function CalendarHeader({ subtitle }: { readonly subtitle: React.ReactNode }) {
  return (
    <div className="dashboard-header">
      <div className="stack stack-2">
        <span className="eyebrow"><DashboardTranslations tr="Takvim" en="Calendar" /></span>
        <h1><DashboardTranslations tr="Randevu takvimi" en="Appointment calendar" /></h1>
        <p className="muted">{subtitle}</p>
      </div>
    </div>
  );
}

async function loadCalendar(session: AuthSession): Promise<CalendarResult> {
  const timezone = await loadTimezone(session);
  const now = new Date();
  const dayKeys = buildDayKeys(now, timezone);
  const todayKey = dayKeys[0] ?? formatDayKey(now, timezone);
  const weekKeys = new Set(dayKeys.slice(0, 7));
  const windowKeys = new Set(dayKeys);

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from('appointments')
      .select(
        'id, customer_name, customer_identifier, scheduled_at, duration_minutes, service_type, status, booking_source',
      )
      .eq('tenant_id', session.tenantId)
      .gte('scheduled_at', new Date(now.getTime() - 2 * DAY_MS).toISOString())
      .lte('scheduled_at', new Date(now.getTime() + (DAYS_AHEAD + 2) * DAY_MS).toISOString())
      .order('scheduled_at', { ascending: true })
      .limit(FETCH_LIMIT);

    if (error) {
      throw error;
    }

    const rows: unknown[] = Array.isArray(data) ? data : [];
    const appointments = rows
      .map((row) => toCalendarAppointment(row, timezone))
      .filter((appointment): appointment is CalendarAppointment => appointment !== null)
      .filter((appointment) => windowKeys.has(appointment.dayKey));

    const days = dayKeys
      .map((key): CalendarDay | null => {
        const dayAppointments = appointments.filter((appointment) => appointment.dayKey === key);

        const first = dayAppointments[0];

        if (!first) {
          return null;
        }

        return {
          key,
          label: buildDayLabel(first.scheduledAt, key, dayKeys, timezone),
          appointments: dayAppointments,
        };
      })
      .filter((day): day is CalendarDay => day !== null);

    const active = appointments.filter((appointment) => appointment.status !== 'cancelled');

    return {
      ok: true,
      data: {
        timezone,
        rangeLabel: buildRangeLabel(dayKeys, timezone),
        days,
        todayCount: active.filter((appointment) => appointment.dayKey === todayKey).length,
        weekCount: active.filter((appointment) => weekKeys.has(appointment.dayKey)).length,
        confirmedCount: appointments.filter((appointment) => appointment.status === 'confirmed')
          .length,
        aiBookedCount: appointments.filter(
          (appointment) => appointment.bookingSource === 'whatsapp_ai',
        ).length,
      },
    };
  } catch (error) {
    const appError = toAppError(error);

    logger.error(
      { tenantId: session.tenantId, code: appError.code, cause: appError.cause },
      'Failed to load dashboard calendar',
    );

    return { ok: false };
  }
}

/**
 * Il fuso orario e' un dato del tenant, non una costante: se le impostazioni
 * non sono leggibili si ricade sul default usato anche dalle notifiche, senza
 * far fallire tutta la pagina.
 */
async function loadTimezone(session: AuthSession): Promise<string> {
  try {
    const snapshot = await createTenantSettingsService().getSnapshot({ session });

    return snapshot.tenant.timezone.trim() || DEFAULT_TIMEZONE;
  } catch (error) {
    logger.warn(
      { tenantId: session.tenantId, code: toAppError(error).code },
      'Failed to read tenant timezone for calendar',
    );

    return DEFAULT_TIMEZONE;
  }
}

function buildDayKeys(now: Date, timezone: string): string[] {
  const todayKey = formatDayKey(now, timezone);
  const anchor = new Date(`${todayKey}T12:00:00Z`);
  const keys = new Set<string>([todayKey]);

  for (let offset = 0; offset <= DAYS_AHEAD; offset += 1) {
    keys.add(formatDayKey(new Date(anchor.getTime() + offset * DAY_MS), timezone));
  }

  return [...keys].sort().slice(0, DAYS_AHEAD + 1);
}

function buildDayLabel(
  date: Date,
  key: string,
  dayKeys: readonly string[],
  timezone: string,
): string {
  const formatted = new Intl.DateTimeFormat('tr-TR', {
    timeZone: timezone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);

  if (key === dayKeys[0]) {
    return `Bugün · ${formatted}`;
  }

  if (key === dayKeys[1]) {
    return `Yarın · ${formatted}`;
  }

  return formatted;
}

function buildRangeLabel(dayKeys: readonly string[], timezone: string, tr = true): string {
  const first = dayKeys[0];
  const last = dayKeys[dayKeys.length - 1];

  if (!first || !last) {
    return tr ? 'Önümüzdeki günler' : 'Upcoming days';
  }

  const formatter = new Intl.DateTimeFormat(tr ? 'tr-TR' : 'en-US', {
    timeZone: timezone,
    day: 'numeric',
    month: 'long',
  });

  return tr ? ` ${formatter.format(new Date(`${first}T12:00:00Z`))} – ${formatter.format(new Date(`${last}T12:00:00Z`))}` : `${formatter.format(new Date(`${first}T12:00:00Z`))} – ${formatter.format(new Date(`${last}T12:00:00Z`))}`;
}

function describeAppointment(appointment: CalendarAppointment): string {
  const parts = [
    appointment.serviceName ?? '—',
    appointment.durationMinutes !== null ? `${appointment.durationMinutes} min` : null,
  ].filter((part): part is string => part !== null);
  const source = SOURCE_LABEL[appointment.bookingSource];
  parts.push(source.tr);
  return parts.join(' · ');
}

function formatTime(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/** Chiave giorno `YYYY-MM-DD` nel fuso del tenant, ordinabile come stringa. */
function formatDayKey(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function toCalendarAppointment(row: unknown, timezone: string): CalendarAppointment | null {
  if (typeof row !== 'object' || row === null) {
    return null;
  }

  const record = row as Record<string, unknown>;
  const id = readString(record['id']);
  const scheduledAtRaw = readString(record['scheduled_at']);
  const status = record['status'];
  const bookingSource = record['booking_source'];

  if (!id || !scheduledAtRaw || !isAppointmentStatus(status) || !isBookingSource(bookingSource)) {
    return null;
  }

  const scheduledAt = new Date(scheduledAtRaw);

  if (Number.isNaN(scheduledAt.getTime())) {
    return null;
  }

  const durationMinutes = record['duration_minutes'];

  return {
    id,
    dayKey: formatDayKey(scheduledAt, timezone),
    scheduledAt,
    durationMinutes: typeof durationMinutes === 'number' ? durationMinutes : null,
    customerName:
      readString(record['customer_name']) ??
      readString(record['customer_identifier']) ??
      'Contatto senza nome',
    serviceName: readString(record['service_type']),
    status,
    bookingSource,
  };
}

function readString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}

function isAppointmentStatus(value: unknown): value is AppointmentStatus {
  return (
    value === 'confirmed' || value === 'cancelled' || value === 'completed' || value === 'no_show'
  );
}

function isBookingSource(value: unknown): value is BookingSource {
  return value === 'manual' || value === 'whatsapp_ai' || value === 'dashboard' || value === 'api';
}
