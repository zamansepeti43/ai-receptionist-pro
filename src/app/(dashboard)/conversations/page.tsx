import type { Metadata } from 'next';
import Link from 'next/link';

import { requireSession } from '@/lib/auth/session';
import {
  createConversationInboxService,
  type ConversationChannel,
  type ConversationStatus,
  type ListConversationsResult,
} from '@/server/conversations/inbox';
import { DashboardTranslations } from '@/components/dashboard/DashboardTranslations';

export const metadata: Metadata = { title: 'Conversations · Ambrogio.ai' };
const PAGE_SIZE = 30;
const STATUS_LABELS: Record<ConversationStatus, { it: string; en: string; badge: string }> = {
  active: { it: 'Attiva', en: 'Active', badge: 'badge' },
  escalated: { it: 'Da gestire', en: 'Needs attention', badge: 'badge badge-danger' },
  closed: { it: 'Chiusa', en: 'Closed', badge: 'badge badge-neutral' },
  spam: { it: 'Spam', en: 'Spam', badge: 'badge badge-warm' },
};
const CHANNEL_LABELS: Record<ConversationChannel, string> = {
  whatsapp: 'WhatsApp', instagram_dm: 'Instagram DM', web_chat: 'Web chat', sms: 'SMS',
};
type SearchParams = Record<string, string | string[] | undefined>;

export default async function ConversationsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const session = await requireSession();
  const params = await searchParams;
  const status = readStatus(params.status);
  const channel = readChannel(params.channel);
  const before = readDate(params.before);
  let result: ListConversationsResult | null = null;
  let failed = false;
  try {
    result = await createConversationInboxService().listConversations({
      session, filters: { limit: PAGE_SIZE, ...(status !== null ? { status } : {}), ...(channel !== null ? { channel } : {}), before },
    });
  } catch { failed = true; }
  const hasFilters = status !== null || channel !== null || before !== null;

  return (
    <>
      <div className="dashboard-header">
        <div className="stack stack-2">
          <span className="eyebrow"><DashboardTranslations tr="Görüşmeler" en="Conversations" /></span>
          <h1>Inbox</h1>
          <p className="muted"><DashboardTranslations tr="Ambrogio tarafından yönetilen görüşmeleri görüntüleyin. Geçmişi okumak veya elle yanıtlamak için bir görüşme açın." en="View conversations handled by Ambrogio. Open a conversation to read its history or reply manually." /></p>
        </div>
        <form method="get" className="row" style={{ gap: 'var(--space-2)', alignItems: 'flex-end' }}>
          <div className="field">
            <label htmlFor="filter-status" className="label"><DashboardTranslations tr="Durum" en="Status" /></label>
            <select id="filter-status" name="status" className="select" defaultValue={status ?? ''} style={{ minWidth: '160px' }}>
              <option value=""><DashboardTranslations tr="Tümü" en="All" /></option>
              {(Object.keys(STATUS_LABELS) as ConversationStatus[]).map(value => <option key={value} value={value}>{STATUS_LABELS[value].it}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="filter-channel" className="label"><DashboardTranslations tr="Kanal" en="Channel" /></label>
            <select id="filter-channel" name="channel" className="select" defaultValue={channel ?? ''} style={{ minWidth: '160px' }}>
              <option value=""><DashboardTranslations tr="Tümü" en="All" /></option>
              {(Object.keys(CHANNEL_LABELS) as ConversationChannel[]).map(value => <option key={value} value={value}>{CHANNEL_LABELS[value]}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn-secondary"><DashboardTranslations tr="Uygula" en="Apply" /></button>
        </form>
      </div>
      {failed ? <div className="card card-padded stack stack-3" role="alert">
        <h2 style={{fontSize:'var(--text-lg)'}}><DashboardTranslations tr="Görüşmeler yüklenemiyor" en="Could not load conversations" /></h2>
        <p className="muted" style={{fontSize:'var(--text-sm)'}}><DashboardTranslations tr="Hizmet yanıt vermedi. Sayfayı yenileyin; sorun devam ederse sistem durumunu kontrol edin." en="The service did not respond. Refresh the page and check system status if the problem persists." /></p>
        <div className="row" style={{gap:'var(--space-3)'}}><Link href="/conversations" className="btn btn-secondary btn-sm"><DashboardTranslations tr="Yeniden dene" en="Retry" /></Link><Link href="/status" className="btn btn-ghost btn-sm"><DashboardTranslations tr="Hizmet durumu" en="Service status" /></Link></div>
      </div> : null}
      {!failed && result !== null && result.conversations.length === 0 ? <div className="card"><div className="empty-state">
        <p className="empty-state-title">{hasFilters ? <DashboardTranslations tr="Bu filtrelerle görüşme bulunamadı" en="No conversations match these filters" /> : <DashboardTranslations tr="Henüz görüşme yok" en="No conversations yet" />}</p>
        <p className="empty-state-text">{hasFilters ? <DashboardTranslations tr="Başka bir durum veya kanal deneyin." en="Try a different status or channel." /> : <DashboardTranslations tr="Müşteriler bağlı WhatsApp numarasına yazdığında görüşmeler burada görünür." en="Conversations appear here when customers message your connected WhatsApp number." />}</p>
        {hasFilters ? <Link href="/conversations" className="btn btn-secondary btn-sm"><DashboardTranslations tr="Filtreleri temizle" en="Clear filters" /></Link> : <Link href="/settings/whatsapp" className="btn btn-primary btn-sm"><DashboardTranslations tr="WhatsApp’ı bağla" en="Connect WhatsApp" /></Link>}
      </div></div> : null}
      {!failed && result !== null && result.conversations.length > 0 ? <div className="card" style={{padding:0}}>
        <ul style={{listStyle:'none',padding:0,margin:0}}>
          {result.conversations.map((conversation,index)=> <li key={conversation.id} style={{borderTop:index===0?'none':'1px solid var(--color-border)'}}>
            <Link href={`/conversations/${conversation.id}`} className="card-interactive" style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'var(--space-4)',padding:'var(--space-4) var(--space-6)',border:'none',borderRadius:0,background:'transparent',color:'inherit'}}>
              <div className="stack stack-2">
                <div className="row" style={{gap:'var(--space-3)',flexWrap:'wrap'}}><span style={{fontSize:'var(--text-base)',fontWeight:600}}>{conversation.customerName ?? conversation.customerIdentifier}</span><span className={STATUS_LABELS[conversation.status].badge}>{STATUS_LABELS[conversation.status].it}</span></div>
                <p className="muted" style={{fontSize:'var(--text-sm)'}}>{CHANNEL_LABELS[conversation.channel]} · {conversation.aiEnabled ? <DashboardTranslations tr="Ambrogio yönetiyor" en="Handled by Ambrogio" /> : <DashboardTranslations tr="Operatör yönetiyor" en="Handled by an operator" />}</p>
                <p className="muted" style={{fontSize:'var(--text-sm)'}}>{conversation.lastMessagePreview ?? <DashboardTranslations tr="Mesaj önizlemesi yok" en="No message preview" />}</p>
              </div>
              <span className="muted mono" style={{fontSize:'var(--text-xs)'}}>{formatTimestamp(conversation.lastMessageAt)}</span>
            </Link>
          </li>)}
        </ul>
      </div> : null}
      {!failed && result !== null && result.nextBefore !== null ? <div className="row" style={{justifyContent:'center',marginTop:'var(--space-6)'}}><Link href={buildNextHref({status,channel,before:result.nextBefore})} className="btn btn-secondary"><DashboardTranslations tr="Daha eski görüşmeler" en="Older conversations" /></Link></div> : null}
    </>
  );
}

function readStatus(value: SearchParams[string]): ConversationStatus | null {
  const v = single(value); return v === 'active' || v === 'escalated' || v === 'closed' || v === 'spam' ? v : null;
}
function readChannel(value: SearchParams[string]): ConversationChannel | null {
  const v = single(value); return v === 'whatsapp' || v === 'instagram_dm' || v === 'web_chat' || v === 'sms' ? v : null;
}
function readDate(value: SearchParams[string]): string | null {
  const v = single(value); return v && /^\d{4}-\d{2}-\d{2}T/.test(v) ? v : null;
}
function single(value: SearchParams[string]): string | null { return typeof value === 'string' ? value : null; }
function formatTimestamp(value: string): string {
  const date = new Date(value); if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' }).format(date);
}
function buildNextHref(input: {status: ConversationStatus|null;channel:ConversationChannel|null;before:string}): string {
  const params = new URLSearchParams(); if(input.status) params.set('status',input.status); if(input.channel) params.set('channel',input.channel); params.set('before',input.before);
  return '/conversations?' + params.toString();
}
