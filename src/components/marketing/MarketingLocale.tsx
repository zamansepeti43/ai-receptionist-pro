'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const STORAGE_KEY = 'ai-receptionist-language';
type Locale = 'en' | 'tr';

const PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['Features', 'Özellikler'], ['Sectors', 'Sektörler'], ['Pricing', 'Fiyatlar'], ['Help', 'Yardım'],
  ['Help center', 'Yardım merkezi'], ['Documentation', 'Dokümantasyon'], ['Changelog', 'Değişiklik günlüğü'],
  ['About', 'Hakkımızda'], ['Contact', 'İletişim'], ['Service status', 'Hizmet durumu'], ['Privacy', 'Gizlilik'],
  ['Terms', 'Koşullar'], ['Security', 'Güvenlik'], ['Product', 'Ürün'], ['Resources', 'Kaynaklar'],
  ['Company', 'Şirket'], ['Legal', 'Yasal'], ['Sign in', 'Giriş yap'], ['Get started', 'Başlayın'], ['Menu', 'Menü'],
  ['Core capabilities', 'Temel yetenekler'], ['Sector presets', 'Sektör şablonları'], ['How it works', 'Nasıl çalışır'],
  ['EXAMPLE SAAS PLANS', 'ÖRNEK SAAS PLANLARI'], ['EXAMPLE PRICING — NOT A LIVE OFFER', 'ÖRNEK FİYATLAR — GERÇEK TEKLİF DEĞİLDİR'],
  ['Your front desk, always on.', 'Resepsiyonunuz, her zaman açık.'],
  ['24/7 AI receptionist · WhatsApp first', '7/24 AI resepsiyon · WhatsApp öncelikli'],
  ['Customer coverage', 'Müşteri kapsamı'], ['Human handoff', 'İnsan aktarımı'],
  ['Start your setup', 'Kuruluma başlayın'], ['See how it works', 'Nasıl çalıştığını görün'],
  ['Everything the receptionist needs, in one workflow.', 'Resepsiyonun ihtiyaç duyduğu her şey, tek bir akışta.'],
  ['WhatsApp conversations', 'WhatsApp görüşmeleri'], ['Real appointment booking', 'Gerçek randevu oluşturma'],
  ['Knowledge base', 'Bilgi tabanı'], ['White-label controls', 'Beyaz etiket ayarları'], ['Usage and billing', 'Kullanım ve faturalandırma'],
  ['One core product. Seven starting points.', 'Tek ürün. Yedi başlangıç noktası.'], ['Explore preset', 'Şablonu inceleyin'],
  ['Three steps from setup to a working digital receptionist.', 'Kurulumdan çalışan dijital resepsiyona üç adım.'],
  ['Configure the business', 'İşletmeyi yapılandırın'], ['Connect the integrations', 'Entegrasyonları bağlayın'],
  ['Let the workflow run', 'Akışın çalışmasına izin verin'], ['Ready to configure your receptionist?', 'Resepsiyonunuzu yapılandırmaya hazır mısınız?'],
  ['Turn customer messages into completed appointments.', 'Müşteri mesajlarını tamamlanmış randevulara dönüştürün.'],
  ['Start setup', 'Kurulumu başlatın'], ['View plans', 'Planları görün'], ['Starter', 'Başlangıç'], ['Professional', 'Profesyonel'], ['Agency', 'Ajans'],
  ['Example plan', 'Örnek plan'], ['Example models — configure your own commercial offer.', 'Örnek modeller — ticari teklifinizi siz yapılandırın.'],
  ['Configure this model', 'Bu modeli yapılandırın'], ['Discuss configuration', 'Yapılandırmayı görüşün'],
  ['White label', 'Beyaz etiket'], ['Multi-sector', 'Çoklu sektör'], ['Skip to content', 'İçeriğe geç'],
  ['Salon & Barber', 'Kuaför ve Berber'], ['Beauty & Wellness', 'Güzellik ve Yaşam'], ['Dental & Clinic', 'Diş ve Klinik'],
  ['Veterinary', 'Veteriner'], ['Gym & Fitness', 'Spor Salonu ve Fitness'], ['Auto Service', 'Oto Servis'], ['Consulting', 'Danışmanlık'],
  ['Explore preset', 'Şablonu inceleyin'],
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
  ['1 WhatsApp Business number', '1 WhatsApp Business numarası'], ['1 Google Calendar', '1 Google Takvim'], ['AI conversations', 'AI görüşmeleri'],
  ['Voice transcription', 'Sesli mesaj yazıya çevirme'], ['Core dashboard', 'Temel panel'], ['Multiple WhatsApp numbers', 'Birden fazla WhatsApp numarası'],
  ['Operator workflows', 'Operatör akışları'], ['Higher AI usage', 'Daha yüksek AI kullanımı'], ['Reminders', 'Hatırlatıcılar'], ['Custom knowledge base', 'Özel bilgi tabanı'],
  ['Priority support', 'Öncelikli destek'], ['Multi-client setup', 'Çoklu müşteri kurulumu'], ['White-label dashboard', 'Beyaz etiket paneli'],
  ['API and webhooks', 'API ve web kancaları'], ['Usage controls', 'Kullanım kontrolleri'], ['Client onboarding tools', 'Müşteri onboarding araçları'],
  ['Custom support', 'Özel destek'], ['Example starter configuration for one business and one calendar.', 'Tek işletme ve tek takvim için örnek başlangıç yapılandırması.'],
  ['Example higher-capacity configuration for growing businesses.', 'Büyüyen işletmeler için örnek, daha yüksek kapasiteli yapılandırma.'],
  ['Example white-label configuration for agencies and service providers.', 'Ajanslar ve hizmet sağlayıcılar için örnek beyaz etiket yapılandırması.'],
  ['The prices shown here are 0 because these are example configurations, not live commercial offers. Before launch, the buyer defines the actual plans, limits, prices and billing rules.', 'Buradaki fiyatlar 0’dır çünkü bunlar gerçek ticari teklifler değil, örnek yapılandırmalardır. Yayına almadan önce alıcı gerçek planları, limitleri, fiyatları ve faturalandırma kurallarını belirler.'],
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
  return translated ? text.replace(trimmed, translated) : null;
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

  document.querySelectorAll<HTMLElement>('[placeholder],[aria-label]').forEach((element) => {
    for (const attribute of ['placeholder', 'aria-label'] as const) {
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
