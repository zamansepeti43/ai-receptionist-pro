import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';

import { DashboardTranslations } from '@/components/dashboard/DashboardTranslations';
import { requireSession } from '@/lib/auth/session';
import type { AuthSession } from '@/lib/auth/session';
import { createConversationInboxService } from '@/server/conversations/inbox';
import type { ConversationChannel, ConversationSummary } from '@/server/conversations/inbox';
import { createTenantSettingsService } from '@/server/settings/tenant-settings';
import type { TenantSettingsSnapshot } from '@/server/settings/tenant-settings';
import { createUsageLimitsService } from '@/server/usage/limits';
import type { UsageMetricSnapshot, UsagePlanKey } from '@/server/usage/limits';

export const metadata: Metadata = { title: 'Dashboard · AI Receptionist Pro' };
const RECENT_CONVERSATIONS_LIMIT = 8;
const PLAN_LABEL: Record<UsagePlanKey, string> = { trial: 'Trial', starter: 'Starter', professional: 'Professional', agency: 'Agency' };
const CHANNEL_LABELS: Record<ConversationChannel, string> = { whatsapp: 'WhatsApp', instagram_dm: 'Instagram DM', web_chat: 'Web chat', sms: 'SMS' };
const STATUS_PRESENTATION: Record<string, { tr: string; en: string; badge: string }> = {
  active: { tr: 'Etkin', en: 'Active', badge: 'badge-success' },
  escalated: { tr: 'İlgilenilmeli', en: 'Needs attention', badge: 'badge-warm' },
  closed: { tr: 'Kapalı', en: 'Closed', badge: 'badge-neutral' },
  spam: { tr: 'Spam', en: 'Spam', badge: 'badge-danger' },
};

export default async function DashboardPage() {
  const session = await requireSession();
  const [usage, inbox, settings] = await Promise.all([
    createUsageLimitsService().getDashboardSnapshot({ session }),
    createConversationInboxService().listConversations({ session, filters: { limit: RECENT_CONVERSATIONS_LIMIT } }),
    loadTenantSettings(session),
  ]);
  const timezone = settings?.tenant.timezone ?? null;
  const displayName = settings ? settings.config.studioName || settings.tenant.name : null;
  const conversations = inbox.conversations;

  return (
    <>
      <div className="dashboard-header">
        <div className="stack stack-2">
          <span className="eyebrow"><DashboardTranslations tr="Genel bakış" en="Overview" /></span>
          <h1>{displayName ?? <DashboardTranslations tr="İşletmeniz" en="Your business" />}</h1>
          <p className="muted"><DashboardTranslations tr={`Plan ${PLAN_LABEL[usage.plan]} · dönem ${formatMetricMonth(usage.metricMonth, 'tr')}`} en={`Plan ${PLAN_LABEL[usage.plan]} · period ${formatMetricMonth(usage.metricMonth, 'en')}`} /></p>
        </div>
        <div className="row" style={{ gap: 'var(--space-3)' }}>
          <Link href="/conversations" className="btn btn-secondary"><DashboardTranslations tr="Görüşmeleri görüntüle" en="View conversations" /></Link>
          <Link href="/calendar" className="btn btn-primary"><DashboardTranslations tr="Takvime git" en="Go to calendar" /></Link>
        </div>
      </div>

      <div className="kpi-grid">
        <article className="kpi">
          <span className="kpi-label"><DashboardTranslations tr="Bu ayki görüşmeler" en="Conversations this month" /></span>
          <span className="kpi-value">{formatNumber(usage.conversations.used)}</span>
          <span className="muted" style={{ fontSize: 'var(--text-sm)' }}><DashboardTranslations tr={`Plana dâhil: ${formatNumber(usage.conversations.limit)}`} en={`Included in plan: ${formatNumber(usage.conversations.limit)}`} /></span>
        </article>
        <article className="kpi">
          <span className="kpi-label"><DashboardTranslations tr="Gönderilen ve alınan mesajlar" en="Messages exchanged" /></span>
          <span className="kpi-value">{formatNumber(usage.messages.used)}</span>
          <span className="muted" style={{ fontSize: 'var(--text-sm)' }}><DashboardTranslations tr="Bu ayki toplam gelen ve giden mesajlar" en="Monthly total, inbound and outbound" /></span>
        </article>
        <article className="kpi">
          <span className="kpi-label"><DashboardTranslations tr="Yazıya çevrilen sesli mesajlar" en="Voice messages transcribed" /></span>
          <span className="kpi-value">{formatNumber(usage.voiceMessages.used)}</span>
          <span className="muted" style={{ fontSize: 'var(--text-sm)' }}><DashboardTranslations tr={`Plana dâhil: ${formatNumber(usage.voiceMessages.limit)}`} en={`Included in plan: ${formatNumber(usage.voiceMessages.limit)}`} /></span>
        </article>
        <article className="kpi">
          <span className="kpi-label"><DashboardTranslations tr="Otomatik yanıtlar" en="Automatic replies" /></span>
          <span className="kpi-value">{usage.autoReplyAllowed ? <DashboardTranslations tr="Etkin" en="Active" /> : <DashboardTranslations tr="Duraklatıldı" en="Paused" />}</span>
          <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>{describeAutoReply(usage.autoReplyAllowed, usage.blockReason)}</span>
        </article>
      </div>

      <div className="dashboard-content-grid">
        <section className="card stack stack-4">
          <div className="row-between">
            <h2 style={{ fontSize: 'var(--text-xl)' }}><DashboardTranslations tr="Son görüşmeler" en="Recent conversations" /></h2>
            {conversations.length > 0 ? <Link href="/conversations" className="btn-link"><DashboardTranslations tr="Tümü →" en="All →" /></Link> : null}
          </div>
          {conversations.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-title"><DashboardTranslations tr="Henüz görüşme yok" en="No conversations yet" /></p>
              <p className="empty-state-text"><DashboardTranslations tr="Ambrogio, işletmenizin WhatsApp numarası bağlandıktan sonra yanıt verir. Bağlantı etkinleşene kadar burada görüşme görünmez." en="Ambrogio responds after you connect your business WhatsApp number. No conversations appear here until the connection is active." /></p>
              <Link href="/settings/whatsapp" className="btn btn-primary"><DashboardTranslations tr="WhatsApp’ı bağla" en="Connect WhatsApp" /></Link>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }} className="stack stack-3">
              {conversations.map((conversation) => <li key={conversation.id}><ConversationRow conversation={conversation} timezone={timezone} /></li>)}
            </ul>
          )}
        </section>
        <aside className="stack stack-4">
          <div className="card stack stack-3">
            <span className="eyebrow"><DashboardTranslations tr="Plan kullanımı" en="Plan usage" /></span>
            <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
              {formatNumber(usage.conversations.used)}<span className="muted" style={{ fontSize: 'var(--text-base)' }}>/{formatNumber(usage.conversations.limit)}</span>
            </p>
            <p className="muted" style={{ fontSize: 'var(--text-sm)' }}><DashboardTranslations tr={`Bu ayki görüşme kullanımı: ${PLAN_LABEL[usage.plan]} planı.`} en={`Monthly conversations on the ${PLAN_LABEL[usage.plan]} plan.`} /></p>
            <UsageMeter label="Conversations this month" metric={usage.conversations} />
            <div className="stack stack-2" style={{ marginTop: 'var(--space-2)' }}>
              <p className="muted" style={{ fontSize: 'var(--text-sm)' }}><DashboardTranslations tr={`Sesli mesajlar: ${formatNumber(usage.voiceMessages.used)}/${formatNumber(usage.voiceMessages.limit)}`} en={`Voice messages: ${formatNumber(usage.voiceMessages.used)}/${formatNumber(usage.voiceMessages.limit)}`} /></p>
              <UsageMeter label="Voice messages this month" metric={usage.voiceMessages} />
            </div>
          </div>
          {usage.blockReason !== null ? (
            <div className="card stack stack-3">
              <span className="eyebrow"><DashboardTranslations tr="Limite ulaşıldı" en="Limit reached" /></span>
              <p style={{ fontSize: 'var(--text-sm)' }}>{usage.blockReason === 'conversations_exceeded'
                ? <DashboardTranslations tr="Plana dâhil görüşme hakkınız bitti. Aylık yenilemeye kadar otomatik yanıtlar duraklatıldı." en="You have used all conversations in your plan. Automatic replies are paused until the monthly reset." />
                : <DashboardTranslations tr="Plana dâhil sesli mesaj hakkınız bitti. Aylık yenilemeye kadar ses transkripsiyonu duraklatıldı." en="You have used all voice messages in your plan. Audio transcription is paused until the monthly reset." />}</p>
              <Link href="/billing" className="btn btn-primary btn-sm"><DashboardTranslations tr="Planı değiştir" en="Change plan" /></Link>
            </div>
          ) : usage.softWarning ? (
            <div className="card stack stack-3">
              <span className="eyebrow"><DashboardTranslations tr="Kullanım sınırına yaklaşıyorsunuz" en="Approaching usage limit" /></span>
              <p style={{ fontSize: 'var(--text-sm)' }}><DashboardTranslations tr="Plan limitlerinden birinin %80’inden fazlasını kullandınız. %100’e ulaşıldığında aylık yenilemeye kadar otomatik yanıtlar durur." en="You have used more than 80% of a plan allowance. At 100%, automatic replies pause until the monthly reset." /></p>
              <Link href="/billing" className="btn btn-secondary btn-sm"><DashboardTranslations tr="Planı görüntüle" en="View plan" /></Link>
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}

function ConversationRow({ conversation, timezone }: Readonly<{ conversation: ConversationSummary; timezone: string | null }>) {
  const presentation = STATUS_PRESENTATION[conversation.status];
  const timestamp = formatTimestampParts(conversation.lastMessageAt, timezone);
  return (
    <Link href={`/conversations/${conversation.id}`} className="activity-row" style={{ color: 'inherit', textDecoration: 'none' }}>
      <span className="mono muted activity-row-time"><span style={{ display: 'block' }}>{timestamp.date}</span><span style={{ display: 'block' }}>{timestamp.time}</span></span>
      <div style={{ minWidth: 0 }}>
        <p className="activity-row-title">{conversation.customerName ?? conversation.customerIdentifier}</p>
        <p className="muted activity-row-detail">{CHANNEL_LABELS[conversation.channel]} · <DashboardTranslations tr={conversation.aiEnabled ? 'Ambrogio yönetiyor' : 'Operatör yönetiyor'} en={conversation.aiEnabled ? 'Handled by Ambrogio' : 'Handled by an operator'} /></p>
      </div>
      <span className={`badge ${presentation.badge}`}><DashboardTranslations tr={presentation.tr} en={presentation.en} /></span>
    </Link>
  );
}

function UsageMeter({ label, metric }: Readonly<{ label: string; metric: UsageMetricSnapshot }>) {
  const fill = metric.exceeded ? 'var(--color-danger)' : metric.warning ? 'var(--color-warning)' : 'var(--color-accent)';
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={metric.percent} aria-valuetext={`${metric.percent}% of limit`} style={{ height: 6, borderRadius: 'var(--radius-full)', background: 'var(--color-surface-sunken)', overflow: 'hidden' }}>
      <div style={{ width: `${metric.percent}%`, height: '100%', background: fill }} />
    </div>
  );
}

async function loadTenantSettings(session: AuthSession): Promise<TenantSettingsSnapshot | null> {
  try { return await createTenantSettingsService().getSnapshot({ session }); } catch { return null; }
}
function describeAutoReply(allowed: boolean, blockReason: 'conversations_exceeded' | 'voice_exceeded' | null): ReactNode {
  if (allowed) return <DashboardTranslations tr="Plan kullanım sınırları içinde" en="Within plan usage limits" />;
  return blockReason === 'voice_exceeded'
    ? <DashboardTranslations tr="Sesli mesaj sınırı doldu" en="Voice-message limit reached" />
    : <DashboardTranslations tr="Görüşme sınırı doldu" en="Conversation limit reached" />;
}
function formatNumber(value: number): string { return new Intl.NumberFormat('tr-TR').format(value); }
function formatMetricMonth(metricMonth: string, locale: 'tr' | 'en'): string {
  const date = new Date(`${metricMonth}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return locale === 'tr' ? 'kullanılamıyor' : 'not available';
  return new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}
function formatTimestampParts(isoDate: string, timezone: string | null): { date: string; time: string } {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return { date: '—', time: '—' };
  const zone = timezone !== null ? { timeZone: timezone } : {};
  return {
    date: new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: '2-digit', ...zone }).format(date),
    time: new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit', ...zone }).format(date),
  };
}
