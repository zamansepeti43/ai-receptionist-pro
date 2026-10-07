'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const STORAGE_KEY = 'ai-receptionist-language';
type Locale = 'en' | 'tr';

const PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['Business', 'İşletme'],
  ['Business identity, language, timezone and operating rules.', 'İşletme kimliği, dil, saat dilimi ve çalışma kuralları.'],
  ['Business profile', 'İşletme profili'],
  ['Business hours', 'Çalışma saatleri'],
  ['Services and pricing', 'Hizmetler ve fiyatlandırma'],
  ['Team and operators', 'Ekip ve operatörler'],
  ['Integrations', 'Entegrasyonlar'],
  ['Connect the communication and scheduling providers used by the business.', 'İşletmenin kullandığı iletişim ve randevu sağlayıcılarını bağlayın.'],
  ['WhatsApp Business', 'WhatsApp Business'],
  ['Google Calendar', 'Google Takvim'],
  ['Voice', 'Ses'],
  ['Custom webhooks', 'Özel web kancaları'],
  ['Assistant behavior, knowledge and escalation boundaries.', 'Asistan davranışı, bilgi ve insan aktarımı sınırları.'],
  ['Tone and personality', 'Ton ve kişilik'],
  ['Escalation rules', 'İnsan aktarımı kuralları'],
  ['Account and security', 'Hesap ve güvenlik'],
  ['Plan, billing, privacy and account controls.', 'Plan, faturalandırma, gizlilik ve hesap kontrolleri.'],
  ['Plan and billing', 'Plan ve faturalandırma'],
  ['Export your data', 'Verilerinizi dışa aktarın'],
  ['Delete account', 'Hesabı sil'],
  ['Active subscription', 'Aktif abonelik'],
  ['Trial period', 'Deneme dönemi'],
  ['Payment overdue', 'Ödeme gecikmiş'],
  ['Cancelled', 'İptal edildi'],
  ['Payment to complete', 'Tamamlanması gereken ödeme'],
  ['Invoice unpaid', 'Fatura ödenmedi'],
  ['Subscription paused', 'Abonelik duraklatıldı'],
  ['Failed to load dashboard calendar', 'Takvim yüklenemedi'],
  ['Failed to read tenant timezone for calendar', 'İşletmenin takvim saat dilimi okunamadı'],
  ['Prossimi giorni', 'Gelecek günler'],
  ['Servizio non indicato', 'Hizmet belirtilmedi'],
  ['Contatto senza nome', 'İsimsiz kişi'],
  ['Nessuna data', 'Tarih yok'],
  ['Confermato', 'Onaylandı'],
  ['Cancellato', 'İptal edildi'],
  ['Concluso', 'Tamamlandı'],
  ['Non presentato', 'Gelmedi'],
  ['Inserito a mano', 'Elle eklendi'],
  ['Prenotato da Ambrogio su WhatsApp', 'Ambrogio tarafından WhatsApp üzerinden rezerve edildi'],
  ['Creato dalla dashboard', 'Panelden oluşturuldu'],
  ['Creato via API', 'API üzerinden oluşturuldu'],
  ['Nessuna conversazione con questi filtri', 'Bu filtrelerle eşleşen görüşme yok'],
  ['Ancora nessuna conversazione', 'Henüz görüşme yok'],
  ['Prova ad allargare i filtri: potrebbero esserci chat in un altro stato o su un altro canale.', 'Filtreleri genişletmeyi deneyin; başka bir durumda veya kanalda görüşmeler olabilir.'],
  ["Collega WhatsApp", "WhatsApp'ı bağla"],
  ['Consumo del piano', 'Plan kullanımı'],
  ['Limite raggiunto', 'Limit doldu'],
  ['Soglia in avvicinamento', 'Eşiğe yaklaşılıyor'],
  ['Cambia piano', 'Planı değiştir'],
  ['Vedi il piano', 'Planı görüntüle'],
  ['data non disponibile', 'tarih bulunamadı'],
  ['adesso', 'şimdi'],
  ["Come configurare Ambrogio.ai per il tuo studio", "Ambrogio.ai'yi işletmeniz için nasıl yapılandırırsınız"],
  ['Profilo studio', 'İşletme profili'],
  ['Orari e servizi', 'Çalışma saatleri ve hizmetler'],
  ['Connetti canali', 'Kanalları bağlayın'],
  ['Test conversazione', 'Görüşme testi'],
  ['Select your industry', 'Sektörünüzü seçin'],
  ['Other', 'Diğer'],
  ['Email', 'E-posta'],
  ['Work email', 'İş e-postası'],
  ['Business or practice name', 'İşletme veya muayenehane adı'],
  ['Industry', 'Sektör'],
  ['This email will be the primary account for your workspace.', 'Bu e-posta çalışma alanınızın ana hesabı olacaktır.'],
  ['We will send you a secure sign-in link that expires after 10 minutes.', '10 dakika sonra süresi dolan güvenli bir giriş bağlantısı göndereceğiz.'],
  ['Sending…', 'Gönderiliyor…'],
  ['Create account…', 'Hesap oluşturuluyor…'],
  ['Something went wrong.', 'Bir sorun oluştu.'],
  ['The requested resource was not found.', 'İstenen kaynak bulunamadı.'],
  ['not available', 'kullanılamıyor'],
  ['month', 'ay'],
  ['managed by Ambrogio', 'Ambrogio tarafından yönetiliyor'],
  ['managed by an operator', 'operatör tarafından yönetiliyor'],
  ['View plan', 'Planı görüntüle'],
  ['Threshold approaching', 'Eşiğe yaklaşılıyor'],
  ['Change plan', 'Planı değiştir'],
  ['Limit reached', 'Limit doldu'],
  ['Plan usage', 'Plan kullanımı'],
  ['Connect WhatsApp', 'WhatsApp'ı bağla'],
  ['No conversations yet', 'Henüz görüşme yok'],
  ['All →', 'Tümü →'],
  ['Recent conversations', 'Son görüşmeler'],
  ['Suspended', 'Askıya alındı'],
  ['Active', 'Aktif'],
  ['Automatic replies', 'Otomatik yanıtlar'],
  ['Voice messages transcribed', 'Transkribe edilen sesli mesajlar'],
  ['Messages exchanged', 'Alınan ve gönderilen mesajlar'],
  ['Conversations this month', 'Bu ayki görüşmeler'],
  ['Go to calendar', 'Takvime git'],
  ['See conversations', 'Görüşmeleri gör'],
  ['Tenant', 'İşletme'],
  ['Active tenant', 'Aktif işletme'],
  ['Overview', 'Genel bakış'],
  ['Billing', 'Faturalandırma'],
  ['Conversations', 'Görüşmeler'],
  ['Calendar', 'Takvim'],
  ['Settings', 'Ayarlar'],
  ['Account', 'Hesap'],
  ['Dashboard', 'Panel'],
  ['Features', 'Özellikler'],
  ['Sectors', 'Sektörler'],
  ['Pricing', 'Fiyatlar'],
  ['Help', 'Yardım'],
  ['Help center', 'Yardım merkezi'],
  ['Documentation', 'Dokümantasyon'],
  ['Changelog', 'Değişiklik günlüğü'],
  ['About', 'Hakkımızda'],
  ['Contact', 'İletişim'],
  ['Service status', 'Hizmet durumu'],
  ['Privacy', 'Gizlilik'],
  ['Terms', 'Koşullar'],
  ['Security', 'Güvenlik'],
  ['Product', 'Ürün'],
  ['Resources', 'Kaynaklar'],
  ['Company', 'Şirket'],
  ['Legal', 'Yasal'],
  ['Sign in', 'Giriş yap'],
  ['Get started', 'Başlayın'],
  ['Menu', 'Menü'],
  ['Welcome back', 'Tekrar hoş geldiniz'],
  ["Don't have an account yet?", 'Henüz hesabınız yok mu?'],
  ['Send sign-in link', 'Giriş bağlantısı gönder'],
  ['Guided setup', 'Yönlendirmeli kurulum'],
  ['Create your account', 'Hesabınızı oluşturun'],
  ['Already have an account?', 'Zaten bir hesabınız var mı?'],
  ['Core capabilities', 'Temel yetenekler'],
  ['Sector presets', 'Sektör şablonları'],
  ['How it works', 'Nasıl çalışır'],
  ['EXAMPLE SAAS PLANS', 'ÖRNEK SAAS PLANLARI'],
  ['EXAMPLE PRICING — NOT A LIVE OFFER', 'ÖRNEK FİYATLAR — GERÇEK TEKLİF DEĞİLDİR'],
  ['Your front desk, always on.', 'Resepsiyonunuz, her zaman açık.'],
  ['24/7 AI receptionist · WhatsApp first', '7/24 AI resepsiyon · WhatsApp öncelikli'],
  ['Customer coverage', 'Müşteri kapsamı'],
  ['Human handoff', 'İnsan aktarımı'],
  ['Start your setup', 'Kuruluma başlayın'],
  ['See how it works', 'Nasıl çalıştığını görün'],
  ['Everything the receptionist needs, in one workflow.', 'Resepsiyonun ihtiyaç duyduğu her şey, tek bir akışta.'],
  ['WhatsApp conversations', 'WhatsApp görüşmeleri'],
  ['Real appointment booking', 'Gerçek randevu oluşturma'],
  ['Knowledge base', 'Bilgi tabanı'],
  ['White-label controls', 'Beyaz etiket ayarları'],
  ['Usage and billing', 'Kullanım ve faturalandırma'],
  ['One core product. Seven starting points.', 'Tek ürün. Yedi başlangıç noktası.'],
  ['Explore preset', 'Şablonu inceleyin'],
  ['How it works', 'Nasıl çalışır'],
  ['Ready to configure your receptionist?', 'Resepsiyonunuzu yapılandırmaya hazır mısınız?'],
  ['Start setup', 'Kurulumu başlatın'],
  ['View plans', 'Planları görün'],
  ['Starter', 'Başlangıç'],
  ['Professional', 'Profesyonel'],
  ['Agency', 'Ajans'],
  ['Example plan', 'Örnek plan'],
  ['Configure this model', 'Bu modeli yapılandırın'],
  ['Discuss configuration', 'Yapılandırmayı görüşün'],
  ['White label', 'Beyaz etiket'],
  ['Multi-sector', 'Çoklu sektör'],
  ['Skip to content', 'İçeriğe geç'],
  ['Salon & Barber', 'Kuaför ve Berber'],
  ['Beauty & Wellness', 'Güzellik ve Yaşam'],
  ['Dental & Clinic', 'Diş ve Klinik'],
  ['Veterinary', 'Veteriner'],
  ['Gym & Fitness', 'Spor Salonu ve Fitness'],
  ['Auto Service', 'Oto Servis'],
  ['Consulting', 'Danışmanlık'],
  ['Choose a starting model. Make it yours.', 'Bir başlangıç modeli seçin. Kendinize göre uyarlayın.'],
  ['Questions buyers usually ask', 'Alıcıların sık sorduğu sorular'],
  ['Contact us', 'Bize ulaşın'],
  ['Settings · AI Receptionist Pro', 'Ayarlar · AI Receptionist Pro'],
  ['Knowledge base · Ambrogio.ai', 'Bilgi tabanı · Ambrogio.ai'],
  ['Conversazioni · Ambrogio.ai', 'Görüşmeler · Ambrogio.ai'],
  ['Calendario · Ambrogio.ai', 'Takvim · Ambrogio.ai'],
  ['Fatturazione · Ambrogio.ai', 'Faturalandırma · Ambrogio.ai'],
  ['Onboarding · Ambrogio.ai', 'Kurulum · Ambrogio.ai'],
  ['Escalation', 'İnsan aktarımı'],
  ['Chiusa', 'Kapalı'],
  ['Spam', 'Spam'],
  ['Instagram DM', 'Instagram DM'],
  ['Chat web', 'Web sohbeti'],
  ['Rinnovo del periodo', 'Dönem yenilemesi'],
  ['Abbonamento in disdetta: non verrà rinnovato a fine periodo.', 'Abonelik iptal edildi: dönem sonunda yenilenmeyecek.'],
  ['Fine della prova', 'Deneme süresi sonu'],
  ['Cliente Stripe', 'Stripe müşterisi'],
  ['Collegato', 'Bağlı'],
  ['Non ancora collegato', 'Henüz bağlı değil'],
  ['Email non disponibile', 'E-posta kullanılamıyor'],
  ['Indirizzo non disponibile', 'Adres kullanılamıyor'],
  ['Non disponibile', 'Kullanılamıyor'],
  ['Onboarding · Ambrogio.ai', 'Kurulum · Ambrogio.ai'],
  ['Account Meta Business Manager', 'Meta Business Manager hesabı'],
  ['Numero WhatsApp Business', 'WhatsApp Business numarası'],
  ['Listino servizi', 'Hizmet listesi'],
  ['Orari di apertura', 'Çalışma saatleri'],
  ['Dati fatturazione (P.IVA, Codice Destinatario SDI)', 'Faturalandırma bilgileri (Vergi no / SDI)'],
  ['Inserisci nome studio, settore (dental, beauty, fitness, professional), fuso orario e lingua. Tempo: 30 secondi.', 'İşletme adını, sektörü, saat dilimini ve dili girin. Süre: 30 saniye.'],
  ['Configura gli orari di apertura per ogni giorno della settimana e carica il listino servizi (manuale o tramite import CSV).', 'Haftanın her günü için çalışma saatlerini yapılandırın ve hizmet listesini manuel olarak veya CSV içe aktarma ile yükleyin.'],
  ["Autorizza il numero WhatsApp Business tramite Meta Business Manager e collega Google Calendar per i booking automatici.", "Meta Business Manager üzerinden WhatsApp Business numarasını yetkilendirin ve otomatik randevular için Google Takvim'i bağlayın."],
  ["Invia un messaggio di prova al tuo numero WhatsApp e verifica che Ambrogio risponda correttamente. Setup completo in 24h.", "WhatsApp numaranıza test mesajı gönderin ve Ambrogio'nun doğru yanıt verdiğini kontrol edin. Kurulum 24 saatte tamamlanır."],
  ['Studio dentistico', 'Diş kliniği'],
  ['Centro estetico / SPA', 'Güzellik merkezi / SPA'],
  ['Palestra / personal trainer', 'Spor salonu / kişisel antrenör'],
  ['Studio professionale', 'Profesyonel ofis'],
  ['Altro', 'Diğer'],
  ['Europe/Rome', 'Europe/Rome'],
  ['Europe/Madrid', 'Europe/Madrid'],
  ['Europe/Paris', 'Europe/Paris'],
  ['Europe/Berlin', 'Europe/Berlin'],
  ['Receive customer text and voice messages, understand intent, collect missing details, and respond consistently.', 'Müşteri metin ve sesli mesajlarını alın, amacı anlayın, eksik bilgileri toplayın ve tutarlı yanıtlar verin.'],
  ['Check actual availability and create appointments without offering times that are already occupied.', 'Gerçek uygunluğu kontrol edin ve dolu saatleri önermeden randevu oluşturun.'],
  ['Stop automation when a customer asks for a person or a configured guardrail is triggered, while preserving conversation context.', 'Müşteri bir kişi istediğinde veya bir kural tetiklendiğinde otomasyonu durdurun; görüşme bağlamını koruyun.'],
  ['Answer from business-approved information such as services, policies, FAQs and location details.', 'Hizmetler, politikalar, SSS ve konum bilgileri gibi işletmenin onayladığı bilgilerle yanıt verin.'],
  ['Configure the business name, logo, colors and assistant identity for each tenant.', 'Her işletme için ad, logo, renkler ve asistan kimliğini yapılandırın.'],
  ['Track usage and connect billing so the application can be operated as a controlled SaaS product.', 'Kullanımı izleyin ve faturalandırmayı bağlayarak ürünü kontrollü bir SaaS olarak yönetin.'],
  ['Focused on the customer journey: understand the request, check the real business state, take the right action, and escalate when automation should stop.', 'Müşteri yolculuğuna odaklanır: talebi anlayın, işletmenin gerçek durumunu kontrol edin, doğru işlemi yapın ve otomasyonun durması gerektiğinde insan desteğine aktarın.'],
  ['Appointments by service and duration, with business hours and optional staff-aware configuration.', 'Hizmet ve süreye göre, çalışma saatleri ve isteğe bağlı personel ayarlarıyla randevu oluşturun.'],
  ['Handle treatment questions, service durations and appointment requests from one workflow.', 'Bakım sorularını, hizmet sürelerini ve randevu taleplerini tek akışta yönetin.'],
  ['Administrative scheduling and customer communication only — no diagnosis or treatment advice.', 'Yalnızca idari randevu ve müşteri iletişimi — tanı veya tedavi tavsiyesi yoktur.'],
  ['Appointment intake, service information and human escalation for cases that need staff attention.', 'Randevu talepleri, hizmet bilgileri ve personel ilgisi gereken durumlarda insan desteğine aktarım.'],
  ['Coordinate consultations, personal training and other bookable services around real availability.', 'Danışmanlık, kişisel antrenman ve diğer rezervasyonlu hizmetleri gerçek uygunluğa göre koordine edin.'],
  ['Turn service requests into structured appointment requests with duration and resource-aware booking.', 'Servis taleplerini süre ve kaynak farkındalığı olan yapılandırılmış randevulara dönüştürün.'],
  ['Qualify meeting requests, answer approved FAQs and schedule consultations without double-booking.', 'Görüşme taleplerini nitelendirin, onaylı SSS’leri yanıtlayın ve çakışma olmadan danışmanlık planlayın.'],
  ['Each preset gives the business a useful starting configuration. Services, hours, assistant behavior and branding remain editable.', 'Her şablon işletmeye kullanışlı bir başlangıç yapılandırması sunar. Hizmetler, çalışma saatleri, asistan davranışı ve marka ayarları düzenlenebilir.'],
  ['Set the business identity, sector, services, working hours, assistant behavior and knowledge base.', 'İşletme kimliğini, sektörü, hizmetleri, çalışma saatlerini, asistan davranışını ve bilgi tabanını ayarlayın.'],
  ['Connect WhatsApp Business, Google Calendar and any optional providers using accounts owned by the business.', 'WhatsApp Business, Google Takvim ve isteğe bağlı sağlayıcıları işletmenin kendi hesaplarıyla bağlayın.'],
  ['Customers ask questions and request appointments. The assistant checks real availability, books, confirms, and hands off to a human when needed.', 'Müşteriler soru sorar ve randevu ister. Asistan gerçek uygunluğu kontrol eder, randevu oluşturur, onaylar ve gerektiğinde insana aktarır.'],
  ['The product keeps configuration separate from the business logic, so a buyer can adapt the same application to different service businesses.', 'Ürün, yapılandırmayı iş mantığından ayrı tutar; böylece alıcı aynı uygulamayı farklı hizmet işletmelerine uyarlayabilir.'],
  ['Start with a sector preset, connect the business integrations, and adapt the assistant to the way the business actually works.', 'Bir sektör şablonuyla başlayın, işletme entegrasyonlarını bağlayın ve asistanı işletmenizin gerçek çalışma biçimine göre uyarlayın.'],
  ['1 WhatsApp Business number', '1 WhatsApp Business numarası'],
  ['1 Google Calendar', '1 Google Takvim'],
  ['AI conversations', 'AI görüşmeleri'],
  ['Voice transcription', 'Sesli mesaj yazıya çevirme'],
  ['Core dashboard', 'Temel panel'],
  ['Multiple WhatsApp numbers', 'Birden fazla WhatsApp numarası'],
  ['Operator workflows', 'Operatör akışları'],
  ['Higher AI usage', 'Daha yüksek AI kullanımı'],
  ['Reminders', 'Hatırlatıcılar'],
  ['Custom knowledge base', 'Özel bilgi tabanı'],
  ['Priority support', 'Öncelikli destek'],
  ['Multi-client setup', 'Çoklu müşteri kurulumu'],
  ['White-label dashboard', 'Beyaz etiket paneli'],
  ['API and webhooks', 'API ve web kancaları'],
  ['Usage controls', 'Kullanım kontrolleri'],
  ['Client onboarding tools', 'Müşteri onboarding araçları'],
  ['Custom support', 'Özel destek'],
  ['Example starter configuration for one business and one calendar.', 'Tek işletme ve tek takvim için örnek başlangıç yapılandırması.'],
  ['Example higher-capacity configuration for growing businesses.', 'Büyüyen işletmeler için örnek, daha yüksek kapasiteli yapılandırma.'],
  ['Example white-label configuration for agencies and service providers.', 'Ajanslar ve hizmet sağlayıcılar için örnek beyaz etiket yapılandırması.'],
  ['The prices shown here are 0 because these are example configurations, not live commercial offers. Before launch, the buyer defines the actual plans, limits, prices and billing rules.', 'Buradaki fiyatlar 0’dır çünkü bunlar gerçek ticari teklifler değil, örnek yapılandırmalardır. Yayına almadan önce alıcı gerçek planları, limitleri, fiyatları ve faturalandırma kurallarını belirler.'],
  ['Choose a starting model. Make it yours.', 'Bir başlangıç modeli seçin. Kendinize göre uyarlayın.'],
  ['These plans are example defaults for the application. The 0 values are intentional placeholders. Configure the actual prices, limits, features and billing rules before presenting an offer to customers.', 'Bu planlar uygulama için örnek varsayılanlardır. 0 değerleri kasıtlı yer tutuculardır. Müşterilere teklif sunmadan önce gerçek fiyatları, limitleri, özellikleri ve faturalandırma kurallarını yapılandırın.'],
  ['Questions buyers usually ask', 'Alıcıların sık sorduğu sorular'],
  ['Are the prices shown here real commercial prices?', 'Burada gösterilen fiyatlar gerçek ticari fiyatlar mı?'],
  ['Can I change the plan structure?', 'Plan yapısını değiştirebilir miyim?'],
  ['Do customers need their own provider accounts?', 'Müşterilerin kendi sağlayıcı hesapları gerekli mi?'],
  ['Can I use a different calendar provider?', 'Farklı bir takvim sağlayıcısı kullanabilir miyim?'],
  ['Is the application white-label?', 'Uygulama beyaz etiketli mi?'],
  ['Does the AI make medical decisions?', 'AI tıbbi karar verir mi?'],
  ['What happens when automation should stop?', 'Otomasyon durduğunda ne olur?'],
  ['Need a custom commercial setup?', 'Özel bir ticari yapılandırmaya mı ihtiyacınız var?'],
  ['Contact us', 'Bize ulaşın'],
];

const EN_TO_TR = new Map(PAIRS);
const TR_TO_EN = new Map(PAIRS.map(([en, tr]) => [tr, en]));

function normalize(value: string | null): Locale {
  return value === 'tr' ? 'tr' : 'en';
}

function translateText(text: string, locale: Locale) {
  const map = locale === 'tr' ? EN_TO_TR : TR_TO_EN;
  const trimmed = text.trim();
  const translated = map.get(trimmed);
  if (translated) return text.replace(trimmed, translated);

  if (locale === 'tr') {
    for (const [en, tr] of PAIRS) {
      if (trimmed.includes(en) && en !== trimmed) {
        return text.replace(trimmed, trimmed.split(en).join(tr));
      }
    }
  } else {
    for (const [en, tr] of PAIRS) {
      if (trimmed.includes(tr) && tr !== trimmed) {
        return text.replace(trimmed, trimmed.split(tr).join(en));
      }
    }
  }

  return null;
}

function translateDom(locale: Locale) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = locale === 'tr' ? 'tr-TR' : 'en-US';

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;

  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest('.language-selector')) continue;
    nodes.push(node as Text);
  }

  for (const textNode of nodes) {
    const next = translateText(textNode.nodeValue ?? '', locale);
    if (next) textNode.nodeValue = next;
  }

  document.querySelectorAll<HTMLElement>('[title],[placeholder],[aria-label]').forEach((element) => {
    for (const attribute of ['title', 'placeholder', 'aria-label'] as const) {
      const value = element.getAttribute(attribute);
      const translated = value ? translateText(value, locale) : null;
      if (translated) element.setAttribute(attribute, translated);
    }
  });
}

export function MarketingLocale() {
  const pathname = usePathname();

  useEffect(() => {
    const apply = () => {
      const locale = normalize(window.localStorage.getItem(STORAGE_KEY));
      translateDom(locale);

      const title = document.title.trim();
      const translatedTitle = translateText(title, locale);
      if (translatedTitle) document.title = translatedTitle;
    };

    const initialTranslationTimer = window.setTimeout(apply, 0);

    const onLanguageChange = () => apply();
    window.addEventListener('languagechange', onLanguageChange);

    return () => {
      window.clearTimeout(initialTranslationTimer);
      window.removeEventListener('languagechange', onLanguageChange);
    };
  }, [pathname]);

  return null;
}
