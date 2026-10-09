import type { Metadata } from 'next';
import Link from 'next/link';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

import { requireSession } from '@/lib/auth/session';
import type { AuthSession } from '@/lib/auth/session';
import { createConversationInboxService } from '@/server/conversations/inbox';
import type { ConversationChannel, ConversationSummary } from '@/server/conversations/inbox';
import { createTenantSettingsService } from '@/server/settings/tenant-settings';
import type { TenantSettingsSnapshot } from '@/server/settings/tenant-settings';
import { createUsageLimitsService } from '@/server/usage/limits';
import type { UsageMetricSnapshot, UsagePlanKey } from '@/server/usage/limits';

export const metadata: Metadata = {
  title: 'Panoramica · Ambrogio.ai',
};

const RECENT_CONVERSATIONS_LIMIT = 8;

const PLAN_LABELS: Record<UsagePlanKey, string> = {
  trial: 'Trial',
  starter: 'Starter',
  professional: 'Professional',
  agency: 'Agency',
};

const CHANNEL_LABELS: Record<ConversationChannel, string> = {
  whatsapp: 'WhatsApp',
  instagram_dm: 'Instagram DM',
  web_chat: 'Chat web',
  sms: 'SMS',
};

const STATUS_PRESENTATION = {
  active: { label: 'Attiva', badge: 'badge-success' },
  escalated: { label: 'Da gestire', badge: 'badge-warm' },
  closed: { label: 'Chiusa', badge: 'badge-neutral' },
  spam: { label: 'Spam', badge: 'badge-danger' },
} as const;

export default async function DashboardPage() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  const session = await requireSession();

  const [usage, inbox, settings] = await Promise.all([
    createUsageLimitsService().getDashboardSnapshot({ session }),
    createConversationInboxService().listConversations({
      session,
      filters: { limit: RECENT_CONVERSATIONS_LIMIT },
    }),
    loadTenantSettings(session),
  ]);

  const timezone = settings?.tenant.timezone ?? null;
  const displayName = settings ? settings.config.studioName || settings.tenant.name : null;
  const conversations = inbox.conversations;

  return (
    <>
      <div className="dashboard-header">
        <div className="stack stack-2">
          <span className="eyebrow">{tr ? 'Genel bakış' : 'Overview'}</span>
          <h1>{displayName ?? (tr ? 'İşletmeniz' : 'Your business')}</h1>
          <p className="muted">
            {tr ? 'Plan' : 'Plan'} {PLAN_LABELS[usage.plan]} · {tr ? 'dönem' : 'period'} {formatMetricMonth(usage.metricMonth, language === 'tr')}
          </p>
        </div>
        <div className="row" style={{ gap: 'var(--space-3)' }}>
          <Link href="/conversations" className="btn btn-secondary">
            {tr ? 'Görüşmeleri görüntüle' : 'View conversations'}
          </Link>
          <Link href="/calendar" className="btn btn-primary">
            {tr ? 'Takvime git' : 'Go to calendar'}
          </Link>
        </div>
      </div>

      <div className="kpi-grid">
        <article className="kpi">
          <span className="kpi-label">{tr ? 'Bu ayki görüşmeler' : 'Conversations this month'}</span>
          <span className="kpi-value">{formatNumber(usage.conversations.used)}</span>
          <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>
            {tr ? 'Plana dâhil' : 'Included in plan'}: {formatNumber(usage.conversations.limit)}
          </span>
        </article>

        <article className="kpi">
          <span className="kpi-label">{tr ? 'Gönderilen ve alınan mesajlar' : 'Messages exchanged'}</span>
          <span className="kpi-value">{formatNumber(usage.messages.used)}</span>
          <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>
            {tr ? 'Bu ayki toplam gelen ve giden mesajlar' : 'Monthly total, inbound and outbound'}
          </span>
        </article>

        <article className="kpi">
          <span className="kpi-label">{tr ? 'Yazıya çevrilen sesli mesajlar' : 'Voice messages transcribed'}</span>
          <span className="kpi-value">{formatNumber(usage.voiceMessages.used)}</span>
          <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>
            {tr ? 'Plana dâhil' : 'Included in plan'}: {formatNumber(usage.voiceMessages.limit)}
          </span>
        </article>

        <article className="kpi">
          <span className="kpi-label">{tr ? 'Otomatik yanıtlar' : 'Automatic replies'}</span>
          <span className="kpi-value">{usage.autoReplyAllowed ? (tr ? 'Etkin' : 'Active') : (tr ? 'Duraklatıldı' : 'Paused')}</span>
          <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>
            {describeAutoReply(usage.autoReplyAllowed, usage.blockReason, tr)}
          </span>
        </article>
      </div>

      <div className="dashboard-content-grid">
        <section className="card stack stack-4">
          <div className="row-between">
            <h2 style={{ fontSize: 'var(--text-xl)' }}>{tr ? 'Son görüşmeler' : 'Recent conversations'}</h2>
            {conversations.length > 0 ? (
              <Link href="/conversations" className="btn-link">
                {tr ? 'Tümü →' : 'All →'}
              </Link>
            ) : null}
          </div>

          {conversations.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-title">{tr ? 'Henüz görüşme yok' : 'No conversations yet'}</p>
              <p className="empty-state-text">
                Ambrogio risponde solo dopo che hai collegato il numero WhatsApp della tua attività.
                Finché il collegamento non è attivo, qui non arriva nulla.
              </p>
              <Link href="/settings/whatsapp" className="btn btn-primary">
                {tr ? 'WhatsApp’ı bağla' : 'Connect WhatsApp'}
              </Link>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }} className="stack stack-3">
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <ConversationRow conversation={conversation} timezone={timezone} language={language} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="stack stack-4">
          <div className="card stack stack-3">
            <span className="eyebrow">{tr ? 'Plan kullanımı' : 'Plan usage'}</span>
            <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
              {formatNumber(usage.conversations.used)}
              <span className="muted" style={{ fontSize: 'var(--text-base)' }}>
                /{formatNumber(usage.conversations.limit)}
              </span>
            </p>
            <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
              {tr ? 'Bu ayki görüşme kullanımı: ' : 'Monthly conversations on the '} {PLAN_LABELS[usage.plan]}{tr ? ' planı.' : ' plan.'}
            </p>
            <UsageMeter label="{tr ? 'Bu ayki görüşmeler' : 'Conversations this month'}" metric={usage.conversations} />

            <div className="stack stack-2" style={{ marginTop: 'var(--space-2)' }}>
              <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
                Vocali: {formatNumber(usage.voiceMessages.used)}/
                {formatNumber(usage.voiceMessages.limit)}
              </p>
              <UsageMeter label="{tr ? 'Bu ayki sesli mesajlar' : 'Voice messages this month'}" metric={usage.voiceMessages} />
            </div>
          </div>

          {usage.blockReason !== null ? (
            <div className="card stack stack-3">
              <span className="eyebrow">{tr ? 'Limiteye ulaşıldı' : 'Limit reached'}</span>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                {usage.blockReason === 'conversations_exceeded'
                  ? 'Hai esaurito le conversazioni {tr ? 'plana dâhil' : 'included in plan'}: Ambrogio ha smesso di rispondere in automatico fino al rinnovo del mese.'
                  : '{tr ? 'Plana dâhil sesli mesaj hakkınız bitti. Aylık yenilemeye kadar ses transkripsiyonu duraklatıldı.' : 'You have used all voice messages in your plan. Audio transcription is paused until the monthly reset.'}'}
              </p>
              <Link href="/billing" className="btn btn-primary btn-sm">
                {tr ? 'Planı değiştir' : 'Change plan'}
              </Link>
            </div>
          ) : usage.softWarning ? (
            <div className="card stack stack-3">
              <span className="eyebrow">{tr ? 'Kullanım sınırına yaklaşıyorsunuz' : 'Approaching usage limit'}</span>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                Hai superato l&apos;80% di una delle soglie {tr ? 'plana dâhil' : 'included in plan'}. Al 100% le risposte
                automatiche si fermano fino al rinnovo del mese.
              </p>
              <Link href="/billing" className="btn btn-secondary btn-sm">
                {tr ? 'Planı görüntüle' : 'View plan'}
              </Link>
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}

function ConversationRow({
  conversation,
  timezone,
  language = 'tr',
}: Readonly<{ conversation: ConversationSummary; timezone: string | null; language?: 'tr' | 'en' }>) {
  const presentation = STATUS_PRESENTATION[conversation.status];
  const timestamp = formatTimestampParts(conversation.lastMessageAt, timezone, language);

  return (
    <Link
      href={`/conversations/${conversation.id}`}
      className="activity-row"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <span className="mono muted activity-row-time">
        <span style={{ display: 'block' }}>{timestamp.date}</span>
        <span style={{ display: 'block' }}>{timestamp.time}</span>
      </span>
      <div style={{ minWidth: 0 }}>
        <p className="activity-row-title">
          {conversation.customerName ?? conversation.customerIdentifier}
        </p>
        <p className="muted activity-row-detail">
          {CHANNEL_LABELS[conversation.channel]} ·{' '}
          {conversation.aiEnabled ? 'gestita da Ambrogio' : 'gestita da un operatore'}
        </p>
      </div>
      <span className={`badge ${presentation.badge}`}>{presentation.label}</span>
    </Link>
  );
}

function UsageMeter({ label, metric }: Readonly<{ label: string; metric: UsageMetricSnapshot }>) {
  const fill = metric.exceeded
    ? 'var(--color-danger)'
    : metric.warning
      ? 'var(--color-warning)'
      : 'var(--color-accent)';

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={metric.percent}
      aria-valuetext={`${metric.percent}% del limite`}
      style={{
        height: 6,
        borderRadius: 'var(--radius-full)',
        background: 'var(--color-surface-sunken)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${metric.percent}%`,
          height: '100%',
          background: fill,
        }}
      />
    </div>
  );
}

/**
 * Il nome dell'attività è un dato di contorno: se il tenant non ha ancora
 * completato l'onboarding, la dashboard deve comunque mostrare i numeri reali
 * invece di andare in errore.
 */
async function loadTenantSettings(session: AuthSession): Promise<TenantSettingsSnapshot | null> {
  try {
    return await createTenantSettingsService().getSnapshot({ session });
  } catch {
    return null;
  }
}

function describeAutoReply(
  allowed: boolean,
  blockReason: 'conversations_exceeded' | 'voice_exceeded' | null,
  tr = true,
): string {
  if (allowed) {
    return '{tr ? 'Ambrogio planınızın sınırları içinde yanıt verir' : 'Ambrogio replies within your plan limits'}';
  }

  return blockReason === 'voice_exceeded'
    ? '{tr ? 'Sesli mesaj sınırı aylık yenilemeye kadar doldu' : 'Voice-message limit reached until monthly reset'}'
    : '{tr ? 'Görüşme sınırı aylık yenilemeye kadar doldu' : 'Conversation limit reached until monthly reset'}';
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('it-IT').format(value);
}

function formatMetricMonth(metricMonth: string, tr = true): string {
  const date = new Date(`${metricMonth}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return tr ? 'kullanılamıyor' : 'not available';
  }

  return new Intl.DateTimeFormat(tr ? 'tr-TR' : 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function formatTimestampParts(
  isoDate: string,
  timezone: string | null,
  language: 'tr' | 'en' = 'tr',
): { date: string; time: string } {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return { date: '—', time: '—' };
  }

  const zone = timezone !== null ? { timeZone: timezone } : {};

  return {
    date: new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      ...zone,
    }).format(date),
    time: new Intl.DateTimeFormat('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      ...zone,
    }).format(date),
  };
}
