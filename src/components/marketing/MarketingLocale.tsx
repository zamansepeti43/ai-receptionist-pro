'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'ai-receptionist-language';
type Locale = 'en' | 'it';

const PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['Features', 'Funzionalità'], ['Sectors', 'Settori'], ['Pricing', 'Prezzi'], ['Help', 'Assistenza'],
  ['Help center', 'Centro assistenza'], ['Documentation', 'Documentazione'], ['Changelog', 'Registro modifiche'],
  ['About', 'Chi siamo'], ['Contact', 'Contatti'], ['Service status', 'Stato del servizio'], ['Privacy', 'Privacy'],
  ['Terms', 'Termini'], ['Security', 'Sicurezza'], ['Product', 'Prodotto'], ['Resources', 'Risorse'],
  ['Company', 'Azienda'], ['Legal', 'Legale'], ['Sign in', 'Accedi'], ['Get started', 'Inizia'], ['Menu', 'Menu'],
  ['Core capabilities', 'Funzionalità principali'], ['Sector presets', 'Preset per settore'], ['How it works', 'Come funziona'],
  ['EXAMPLE SAAS PLANS', 'PIANI SAAS DI ESEMPIO'],
  ['EXAMPLE PRICING — NOT A LIVE OFFER', 'PREZZI DI ESEMPIO — NON È UN’OFFERTA COMMERCIALE'],
  ['Your front desk, always on.', 'La tua reception, sempre attiva.'],
  ['24/7 AI receptionist · WhatsApp first', 'Receptionist AI 24/7 · prima di tutto WhatsApp'],
  ['Customer coverage', 'Copertura clienti'], ['Human handoff', 'Passaggio a un operatore'],
  ['Start your setup', 'Inizia la configurazione'], ['See how it works', 'Scopri come funziona'],
  ['Everything the receptionist needs, in one workflow.', 'Tutto ciò che serve alla reception, in un unico flusso.'],
  ['WhatsApp conversations', 'Conversazioni WhatsApp'], ['Real appointment booking', 'Prenotazione reale degli appuntamenti'],
  ['Knowledge base', 'Base di conoscenza'], ['White-label controls', 'Controlli white-label'], ['Usage and billing', 'Utilizzo e fatturazione'],
  ['One core product. Seven starting points.', 'Un prodotto. Sette punti di partenza.'], ['Explore preset', 'Esplora il preset'],
  ['Three steps from setup to a working digital receptionist.', 'Tre passaggi dalla configurazione a una reception digitale funzionante.'],
  ['Configure the business', 'Configura l’attività'], ['Connect the integrations', 'Collega le integrazioni'],
  ['Let the workflow run', 'Avvia il flusso di lavoro'], ['Ready to configure your receptionist?', 'Pronto a configurare la tua reception?'],
  ['Turn customer messages into completed appointments.', 'Trasforma i messaggi dei clienti in appuntamenti completati.'],
  ['Start setup', 'Inizia configurazione'], ['View plans', 'Vedi i piani'], ['Starter', 'Starter'], ['Professional', 'Professional'], ['Agency', 'Agency'],
  ['Example plan', 'Piano di esempio'], ['Example models — configure your own commercial offer.', 'Modelli di esempio — configura la tua offerta commerciale.'],
  ['Configure this model', 'Configura questo modello'], ['Discuss configuration', 'Parla della configurazione'],
  ['White label', 'White-label'], ['Multi-sector', 'Multi-settore'], ['Skip to content', 'Vai al contenuto'],
  ['Centro assistenza', 'Help center'], ['Come possiamo aiutarti?', 'How can we help?'], ['Cerca nel centro assistenza', 'Search the help center'],
  ['Cerca una guida o domanda', 'Search for a guide or question'], ['Cerca', 'Search'], ['Non hai trovato quello che cercavi?', 'Didn’t find what you were looking for?'],
  ['Contattaci direttamente. Rispondiamo entro 4 ore lavorative.', 'Contact us directly. We reply within 4 business hours.'],
  ['Apri un ticket', 'Open a ticket'], ['Email diretta:', 'Direct email:'], ['Setup e onboarding', 'Setup and onboarding'],
  ['Conversazioni', 'Conversations'], ['Calendario e booking', 'Calendar and booking'], ['Account e fatturazione', 'Account and billing'],
  ['Come collegare il numero WhatsApp Business', 'How to connect the WhatsApp Business number'],
  ['Come autorizzare Google Calendar', 'How to authorize Google Calendar'], ['Caricare il listino servizi', 'Upload the service list'],
  ['Configurare gli orari di apertura', 'Configure opening hours'], ['Come funziona il filtro AI', 'How the AI filter works'],
  ['Quando interviene un umano', 'When a human takes over'], ['Gestire vocali e media', 'Handle voice messages and media'],
  ['Risposte rapide preconfezionate', 'Predefined quick replies'], ['Come Ambrogio prenota appuntamenti', 'How Ambrogio books appointments'],
  ['Gestire conflitti calendario', 'Manage calendar conflicts'], ['Reminder automatici', 'Automatic reminders'], ['Gestire le disdette', 'Manage cancellations'],
  ['Cambiare piano', 'Change plan'], ['Scaricare fatture elettroniche SDI', 'Download SDI electronic invoices'],
  ['Aggiornare dati P.IVA', 'Update VAT details'], ['Esportare i miei dati (GDPR)', 'Export my data (GDPR)'], ['Cancellare account', 'Delete account'],
  ['Receive customer text and voice messages, understand intent, collect missing details, and respond consistently.', 'Ricevi messaggi di testo e vocali, comprendi l’intento, raccogli i dati mancanti e rispondi in modo coerente.'],
  ['Check actual availability and create appointments without offering times that are already occupied.', 'Controlla la disponibilità reale e crea appuntamenti senza offrire orari già occupati.'],
  ['Stop automation when a customer asks for a person or a configured guardrail is triggered, while preserving conversation context.', 'Ferma l’automazione quando il cliente chiede una persona o si attiva una regola, mantenendo il contesto della conversazione.'],
  ['Answer from business-approved information such as services, policies, FAQs and location details.', 'Rispondi usando informazioni approvate dall’attività, come servizi, policy, FAQ e dettagli sulla sede.'],
  ['Configure the business name, logo, colors and assistant identity for each tenant.', 'Configura nome, logo, colori e identità dell’assistente per ogni attività.'],
  ['Track usage and connect billing so the application can be operated as a controlled SaaS product.', 'Monitora l’utilizzo e collega la fatturazione per gestire l’applicazione come prodotto SaaS controllato.'],
  ['Focused on the customer journey: understand the request, check the real business state, take the right action, and escalate when automation should stop.', 'Progettato per il percorso del cliente: comprendi la richiesta, verifica lo stato reale dell’attività, esegui l’azione corretta ed esegui l’escalation quando l’automazione deve fermarsi.'],
  ['Appointments by service and duration, with business hours and optional staff-aware configuration.', 'Appuntamenti per servizio e durata, con orari dell’attività e configurazione opzionale in base al personale.'],
  ['Handle treatment questions, service durations and appointment requests from one workflow.', 'Gestisci domande sui trattamenti, durate dei servizi e richieste di appuntamento in un unico flusso.'],
  ['Administrative scheduling and customer communication only — no diagnosis or treatment advice.', 'Solo programmazione amministrativa e comunicazione con il cliente — nessuna diagnosi o consulenza medica.'],
  ['Appointment intake, service information and human escalation for cases that need staff attention.', 'Raccolta delle richieste, informazioni sui servizi ed escalation umana per i casi che richiedono attenzione del personale.'],
  ['Coordinate consultations, personal training and other bookable services around real availability.', 'Coordina consulenze, personal training e altri servizi prenotabili in base alla disponibilità reale.'],
  ['Turn service requests into structured appointment requests with duration and resource-aware booking.', 'Trasforma le richieste di servizio in richieste di appuntamento strutturate con durata e prenotazione basata sulle risorse.'],
  ['Qualify meeting requests, answer approved FAQs and schedule consultations without double-booking.', 'Qualifica le richieste di incontro, rispondi alle FAQ approvate e programma consulenze senza doppie prenotazioni.'],
  ['Each preset gives the business a useful starting configuration. Services, hours, assistant behavior and branding remain editable.', 'Ogni preset offre all’attività una configurazione iniziale utile. Servizi, orari, comportamento dell’assistente e branding restano modificabili.'],
  ['Set the business identity, sector, services, working hours, assistant behavior and knowledge base.', 'Imposta identità dell’attività, settore, servizi, orari di lavoro, comportamento dell’assistente e base di conoscenza.'],
  ['Connect WhatsApp Business, Google Calendar and any optional providers using accounts owned by the business.', 'Collega WhatsApp Business, Google Calendar e gli eventuali provider usando account di proprietà dell’attività.'],
  ['Customers ask questions and request appointments. The assistant checks real availability, books, confirms, and hands off to a human when needed.', 'I clienti fanno domande e richiedono appuntamenti. L’assistente verifica la disponibilità reale, prenota, conferma e passa a una persona quando necessario.'],
  ['The product keeps configuration separate from the business logic, so a buyer can adapt the same application to different service businesses.', 'Il prodotto separa la configurazione dalla logica applicativa, così l’acquirente può adattare la stessa applicazione a diverse attività di servizi.'],
  ['Start with a sector preset, connect the business integrations, and adapt the assistant to the way the business actually works.', 'Inizia con un preset di settore, collega le integrazioni dell’attività e adatta l’assistente al modo in cui l’attività lavora realmente.'],
  ['1 WhatsApp Business number', '1 numero WhatsApp Business'], ['1 Google Calendar', '1 Google Calendar'], ['AI conversations', 'Conversazioni AI'],
  ['Voice transcription', 'Trascrizione vocale'], ['Core dashboard', 'Dashboard principale'], ['Multiple WhatsApp numbers', 'Più numeri WhatsApp'],
  ['Operator workflows', 'Flussi per operatori'], ['Higher AI usage', 'Maggiore utilizzo AI'], ['Reminders', 'Promemoria'], ['Custom knowledge base', 'Base di conoscenza personalizzata'],
  ['Priority support', 'Supporto prioritario'], ['Multi-client setup', 'Configurazione multi-cliente'], ['White-label dashboard', 'Dashboard white-label'],
  ['API and webhooks', 'API e webhook'], ['Usage controls', 'Controlli sull’utilizzo'], ['Client onboarding tools', 'Strumenti di onboarding clienti'],
  ['Custom support', 'Supporto personalizzato'], ['Example starter configuration for one business and one calendar.', 'Configurazione iniziale di esempio per un’attività e un calendario.'],
  ['Example higher-capacity configuration for growing businesses.', 'Configurazione di esempio a maggiore capacità per attività in crescita.'],
  ['Example white-label configuration for agencies and service providers.', 'Configurazione white-label di esempio per agenzie e fornitori di servizi.'],
  ['The prices shown here are 0 because these are example configurations, not live commercial offers. Before launch, the buyer defines the actual plans, limits, prices and billing rules.', 'I prezzi mostrati qui sono 0 perché si tratta di configurazioni di esempio, non di offerte commerciali attive. Prima del lancio, l’acquirente definisce piani, limiti, prezzi e regole di fatturazione reali.'],
  ['Configure the business', 'Configura l’attività'],
];

const EN_TO_IT = new Map(PAIRS);
const IT_TO_EN = new Map(PAIRS.map(([en, it]) => [it, en]));

function normalize(value: string | null): Locale { return value === 'it' ? 'it' : 'en'; }

function translateText(text: string, locale: Locale) {
  const map = locale === 'it' ? EN_TO_IT : IT_TO_EN;
  const trimmed = text.trim();
  const translated = map.get(trimmed);
  return translated ? text.replace(trimmed, translated) : null;
}

function translateDom(locale: Locale) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = locale === 'it' ? 'it-IT' : 'en-US';
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
  useEffect(() => {
    let locale = normalize(window.localStorage.getItem(STORAGE_KEY));
    translateDom(locale);
    const onLanguageChange = (event: Event) => {
      locale = normalize((event as CustomEvent<string>).detail);
      translateDom(locale);
    };
    window.addEventListener('languagechange', onLanguageChange);
    const observer = new MutationObserver(() => translateDom(locale));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener('languagechange', onLanguageChange);
      observer.disconnect();
    };
  }, []);
  return null;
}
