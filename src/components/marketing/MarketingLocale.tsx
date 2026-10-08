'use client';

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
  ['Collega WhatsApp', "WhatsApp'ı bağla"],
  ['Consumo del piano', 'Plan kullanımı'],
  ['Limite raggiunto', 'Limit doldu'],
  ['Soglia in avvicinamento', 'Eşiğe yaklaşılıyor'],
  ['Cambia piano', 'Planı değiştir'],
  ['Vedi il piano', 'Planı görüntüle'],
  ['data non disponibile', 'tarih bulunamadı'],
  ['adesso', 'şimdi'],
  ['Come configurare Ambrogio.ai per il tuo studio', "Ambrogio.ai'yi işletmeniz için nasıl yapılandırırsınız"],
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
  ['Connect WhatsApp', "WhatsApp'ı bağla"],
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
];

const EN_TO_TR = new Map(PAIRS);
const TR_TO_EN = new Map(PAIRS.map(([en, tr]) => [tr, en]));

function normalize(value: string | null): Locale {
  return value === 'tr' ? 'tr' : 'en';
}

function translateText(text: string, locale: Locale): string | null {
  const map = locale === 'tr' ? EN_TO_TR : TR_TO_EN;
  const translated = map.get(text.trim());
  return translated ? text.replace(text.trim(), translated) : null;
}

function translateDom(locale: Locale) {
  if (typeof document === 'undefined') return;

  document.documentElement.lang = locale === 'tr' ? 'tr-TR' : 'en-US';

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const textNode = node as Text;
    if (textNode.parentElement?.closest('.language-selector')) continue;

    const original = textNode.nodeValue ?? '';
    const translated = translateText(original, locale);
    if (translated) textNode.nodeValue = translated;
  }

  document.querySelectorAll<HTMLElement>('[title],[placeholder],[aria-label]').forEach((element) => {
    for (const attribute of ['title', 'placeholder', 'aria-label'] as const) {
      const value = element.getAttribute(attribute);
      const translated = value ? translateText(value, locale) : null;
      if (translated) element.setAttribute(attribute, translated);
    }
  });

  const translatedTitle = translateText(document.title, locale);
  if (translatedTitle) document.title = translatedTitle;
}

export function MarketingLocale() {
  useEffect(() => {
    const apply = () => translateDom(normalize(window.localStorage.getItem(STORAGE_KEY)));
    apply();

    const onLanguageChange = (event: Event) => {
      const detail = (event as CustomEvent<Locale>).detail;
      applyLocaleSafely(normalize(detail ?? window.localStorage.getItem(STORAGE_KEY)));
    };

    window.addEventListener('languagechange', onLanguageChange);
    return () => window.removeEventListener('languagechange', onLanguageChange);
  }, []);

  function applyLocaleSafely(locale: Locale) {
    translateDom(locale);
  }

  return null;
}
