export type Locale = 'tr' | 'en';
export const STORAGE_KEY = 'ai-receptionist-language';

const EN = {
  navFeatures: 'Features',
  navSectors: 'Sectors',
  navPricing: 'Pricing',
  navHelp: 'Help',
  menu: 'Menu',
  signIn: 'Sign in',
  getStarted: 'Get started',
  heroEyebrow: '24/7 AI receptionist · WhatsApp first',
  heroTitle: 'Your front desk, always on.',
  heroBody:
    'AI Receptionist Pro answers customer questions, checks real availability, books appointments, confirms changes, and hands conversations to a human when needed.',
  startSetup: 'Start your setup',
  seeHow: 'See how it works',
  customerCoverage: 'Customer coverage',
  sectorPresets: 'Sector presets',
  humanHandoff: 'Human handoff',
  coreCapabilities: 'Core capabilities',
  featureHeading: 'Everything the receptionist needs, in one workflow.',
  featureIntro:
    'Focused on the customer journey: understand the request, check the real business state, take the right action, and escalate when automation should stop.',
  whatsapp: 'WhatsApp conversations',
  whatsappBody:
    'Receive customer text and voice messages, understand intent, collect missing details, and respond consistently.',
  booking: 'Real appointment booking',
  bookingBody:
    'Check actual availability and create appointments without offering times that are already occupied.',
  handoff: 'Human handoff',
  handoffBody:
    'Stop automation when a customer asks for a person or a configured guardrail is triggered, while preserving conversation context.',
  knowledge: 'Knowledge base',
  knowledgeBody:
    'Answer from business-approved information such as services, policies, FAQs and location details.',
  whiteLabel: 'White-label controls',
  whiteLabelBody:
    'Configure the business name, logo, colors and assistant identity for each tenant.',
  usage: 'Usage and billing',
  usageBody:
    'Track usage and connect billing so the application can be operated as a controlled SaaS product.',
  sectorHeading: 'One core product. Seven starting points.',
  sectorIntro:
    'Each preset gives the business a useful starting configuration. Services, hours, assistant behavior and branding remain editable.',
  explore: 'Explore preset',
  howHeading: 'Three steps from setup to a working digital receptionist.',
  howIntro:
    'The product keeps configuration separate from the business logic, so a buyer can adapt the same application to different service businesses.',
  step1: 'Configure the business',
  step1Body:
    'Set the business identity, sector, services, working hours, assistant behavior and knowledge base.',
  step2: 'Connect the integrations',
  step2Body:
    'Connect WhatsApp Business, Google Calendar and any optional providers using accounts owned by the business.',
  step3: 'Let the workflow run',
  step3Body:
    'Customers ask questions and request appointments. The assistant checks real availability, books, confirms, and hands off to a human when needed.',
  pricingEyebrow: 'EXAMPLE SAAS PLANS',
  pricingHeading: 'Example models — configure your own commercial offer.',
  pricingIntro:
    'Prices shown as 0 are placeholders for example configurations, not live commercial offers. Configure the actual plans, limits, prices and billing rules before launch.',
  starter: 'Starter',
  professional: 'Professional',
  agency: 'Agency',
  examplePlan: 'Example plan',
  starterBody: 'Example starter configuration for one business and one calendar.',
  professionalBody: 'Example higher-capacity configuration for growing businesses.',
  agencyBody: 'Example white-label configuration for agencies and service providers.',
  configure: 'Configure this model',
  discuss: 'Discuss configuration',
  ctaEyebrow: 'Ready to configure your receptionist?',
  ctaHeading: 'Turn customer messages into completed appointments.',
  ctaBody:
    'Start with a sector preset, connect the business integrations, and adapt the assistant to the way the business actually works.',
  viewPlans: 'View plans',
  product: 'Product',
  resources: 'Resources',
  company: 'Company',
  legal: 'Legal',
  helpCenter: 'Help center',
  documentation: 'Documentation',
  changelog: 'Changelog',
  about: 'About',
  contact: 'Contact',
  status: 'Service status',
  privacy: 'Privacy',
  terms: 'Terms',
  security: 'Security',
  whiteLabelBadge: 'White label',
  multiSectorBadge: 'Multi-sector',
} as const;

const TR = {
  navFeatures: 'Özellikler',
  navSectors: 'Sektörler',
  navPricing: 'Fiyatlar',
  navHelp: 'Yardım',
  menu: 'Menü',
  signIn: 'Giriş yap',
  getStarted: 'Başlayın',
  heroEyebrow: '7/24 AI resepsiyon · WhatsApp öncelikli',
  heroTitle: 'Resepsiyonunuz, her zaman açık.',
  heroBody:
    'AI Receptionist Pro müşteri sorularını yanıtlar, gerçek uygunluğu kontrol eder, randevuları oluşturur, değişiklikleri onaylar ve gerektiğinde görüşmeyi bir insana aktarır.',
  startSetup: 'Kuruluma başlayın',
  seeHow: 'Nasıl çalıştığını görün',
  customerCoverage: 'Müşteri kapsamı',
  sectorPresets: 'Sektör şablonları',
  humanHandoff: 'İnsan aktarımı',
  coreCapabilities: 'Temel yetenekler',
  featureHeading: 'Resepsiyonun ihtiyaç duyduğu her şey, tek bir akışta.',
  featureIntro:
    'Müşteri yolculuğuna odaklanır: talebi anlayın, işletmenin gerçek durumunu kontrol edin, doğru işlemi yapın ve otomasyonun durması gerektiğinde insan desteğine aktarın.',
  whatsapp: 'WhatsApp görüşmeleri',
  whatsappBody:
    'Müşteri metin ve sesli mesajlarını alın, amacı anlayın, eksik bilgileri toplayın ve tutarlı yanıtlar verin.',
  booking: 'Gerçek randevu oluşturma',
  bookingBody:
    'Gerçek uygunluğu kontrol edin ve dolu saatleri önermeden randevu oluşturun.',
  handoff: 'İnsan aktarımı',
  handoffBody:
    'Müşteri bir kişi istediğinde veya bir kural tetiklendiğinde otomasyonu durdurun; görüşme bağlamını koruyun.',
  knowledge: 'Bilgi tabanı',
  knowledgeBody:
    'Hizmetler, politikalar, SSS ve konum bilgileri gibi işletmenin onayladığı bilgilerle yanıt verin.',
  whiteLabel: 'Beyaz etiket ayarları',
  whiteLabelBody:
    'Her işletme için ad, logo, renkler ve asistan kimliğini yapılandırın.',
  usage: 'Kullanım ve faturalandırma',
  usageBody:
    'Kullanımı izleyin ve faturalandırmayı bağlayarak ürünü kontrollü bir SaaS olarak yönetin.',
  sectorHeading: 'Tek ürün. Yedi başlangıç noktası.',
  sectorIntro:
    'Her şablon işletmeye kullanışlı bir başlangıç yapılandırması sunar. Hizmetler, çalışma saatleri, asistan davranışı ve marka ayarları düzenlenebilir.',
  explore: 'Şablonu inceleyin',
  howHeading: 'Kurulumdan çalışan dijital resepsiyona üç adım.',
  howIntro:
    'Ürün, yapılandırmayı iş mantığından ayrı tutar; böylece aynı uygulama farklı hizmet işletmelerine uyarlanabilir.',
  step1: 'İşletmeyi yapılandırın',
  step1Body:
    'İşletme kimliğini, sektörü, hizmetleri, çalışma saatlerini, asistan davranışını ve bilgi tabanını ayarlayın.',
  step2: 'Entegrasyonları bağlayın',
  step2Body:
    'WhatsApp Business, Google Takvim ve isteğe bağlı sağlayıcıları işletmenin kendi hesaplarıyla bağlayın.',
  step3: 'Akışı çalıştırın',
  step3Body:
    'Müşteriler soru sorar ve randevu ister. Asistan gerçek uygunluğu kontrol eder, randevu oluşturur, onaylar ve gerektiğinde insana aktarır.',
  pricingEyebrow: 'ÖRNEK SAAS PLANLARI',
  pricingHeading: 'Örnek modeller — ticari teklifinizi kendiniz yapılandırın.',
  pricingIntro:
    'Fiyatların 0 görünmesi, bunların gerçek ticari teklif değil örnek yapılandırmalar olduğunu belirtir. Yayına almadan önce gerçek planları, limitleri, fiyatları ve faturalandırma kurallarını belirleyin.',
  starter: 'Başlangıç',
  professional: 'Profesyonel',
  agency: 'Ajans',
  examplePlan: 'Örnek plan',
  starterBody: 'Tek işletme ve tek takvim için örnek başlangıç yapılandırması.',
  professionalBody: 'Büyüyen işletmeler için örnek, daha yüksek kapasiteli yapılandırma.',
  agencyBody: 'Ajanslar ve hizmet sağlayıcılar için örnek beyaz etiket yapılandırması.',
  configure: 'Bu modeli yapılandırın',
  discuss: 'Yapılandırmayı görüşün',
  ctaEyebrow: 'Resepsiyonunuzu yapılandırmaya hazır mısınız?',
  ctaHeading: 'Müşteri mesajlarını tamamlanmış randevulara dönüştürün.',
  ctaBody:
    'Bir sektör şablonuyla başlayın, işletme entegrasyonlarını bağlayın ve asistanı işletmenizin gerçek çalışma biçimine göre uyarlayın.',
  viewPlans: 'Planları görün',
  product: 'Ürün',
  resources: 'Kaynaklar',
  company: 'Şirket',
  legal: 'Yasal',
  helpCenter: 'Yardım merkezi',
  documentation: 'Dokümantasyon',
  changelog: 'Değişiklik günlüğü',
  about: 'Hakkımızda',
  contact: 'İletişim',
  status: 'Hizmet durumu',
  privacy: 'Gizlilik',
  terms: 'Koşullar',
  security: 'Güvenlik',
  whiteLabelBadge: 'Beyaz etiket',
  multiSectorBadge: 'Çoklu sektör',
} as const;

export type MarketingCopy = typeof EN;
export const MARKETING_COPY = { en: EN, tr: TR } as const;
