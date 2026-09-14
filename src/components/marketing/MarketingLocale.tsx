'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'ai-receptionist-language';

type Locale = 'en' | 'it';

const PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['Features', 'Funzionalità'],
  ['Sectors', 'Settori'],
  ['Pricing', 'Prezzi'],
  ['Help', 'Assistenza'],
  ['Help center', 'Centro assistenza'],
  ['Documentation', 'Documentazione'],
  ['Changelog', 'Registro modifiche'],
  ['About', 'Chi siamo'],
  ['Contact', 'Contatti'],
  ['Service status', 'Stato del servizio'],
  ['Privacy', 'Privacy'],
  ['Terms', 'Termini'],
  ['Security', 'Sicurezza'],
  ['Product', 'Prodotto'],
  ['Resources', 'Risorse'],
  ['Company', 'Azienda'],
  ['Legal', 'Legale'],
  ['Sign in', 'Accedi'],
  ['Get started', 'Inizia'],
  ['Menu', 'Menu'],
  ['Core capabilities', 'Funzionalità principali'],
  ['Sector presets', 'Preset per settore'],
  ['How it works', 'Come funziona'],
  ['EXAMPLE SAAS PLANS', 'PIANI SAAS DI ESEMPIO'],
  ['EXAMPLE PRICING — NOT A LIVE OFFER', 'PREZZI DI ESEMPIO — NON È UN’OFFERTA COMMERCIALE'],
  ['Your front desk, always on.', 'La tua reception, sempre attiva.'],
  ['24/7 AI receptionist · WhatsApp first', 'Receptionist AI 24/7 · prima di tutto WhatsApp'],
  ['Customer coverage', 'Copertura clienti'],
  ['Sector presets', 'Preset per settore'],
  ['Human handoff', 'Passaggio a un operatore'],
  ['Start your setup', 'Inizia la configurazione'],
  ['See how it works', 'Scopri come funziona'],
  ['Everything the receptionist needs, in one workflow.', 'Tutto ciò che serve alla reception, in un unico flusso.'],
  ['WhatsApp conversations', 'Conversazioni WhatsApp'],
  ['Real appointment booking', 'Prenotazione reale degli appuntamenti'],
  ['Knowledge base', 'Base di conoscenza'],
  ['White-label controls', 'Controlli white-label'],
  ['Usage and billing', 'Utilizzo e fatturazione'],
  ['One core product. Seven starting points.', 'Un prodotto. Sette punti di partenza.'],
  ['Explore preset', 'Esplora il preset'],
  ['Three steps from setup to a working digital receptionist.', 'Tre passaggi dalla configurazione a una reception digitale funzionante.'],
  ['Configure the business', 'Configura l’attività'],
  ['Connect the integrations', 'Collega le integrazioni'],
  ['Let the workflow run', 'Avvia il flusso di lavoro'],
  ['Ready to configure your receptionist?', 'Pronto a configurare la tua reception?'],
  ['Turn customer messages into completed appointments.', 'Trasforma i messaggi dei clienti in appuntamenti completati.'],
  ['Start setup', 'Inizia configurazione'],
  ['View plans', 'Vedi i piani'],
  ['Starter', 'Starter'],
  ['Professional', 'Professional'],
  ['Agency', 'Agency'],
  ['Example plan', 'Piano di esempio'],
  ['Example models — configure your own commercial offer.', 'Modelli di esempio — configura la tua offerta commerciale.'],
  ['Configure this model', 'Configura questo modello'],
  ['Discuss configuration', 'Parla della configurazione'],
  ['White label', 'White-label'],
  ['Multi-sector', 'Multi-settore'],
  ['Skip to content', 'Vai al contenuto'],
  ['Centro assistenza', 'Help center'],
  ['Come possiamo aiutarti?', 'How can we help?'],
  ['Cerca nel centro assistenza', 'Search the help center'],
  ['Cerca una guida o domanda', 'Search for a guide or question'],
  ['Cerca', 'Search'],
  ['Non hai trovato quello che cercavi?', 'Didn’t find what you were looking for?'],
  ['Contattaci direttamente. Rispondiamo entro 4 ore lavorative.', 'Contact us directly. We reply within 4 business hours.'],
  ['Apri un ticket', 'Open a ticket'],
  ['Email diretta:', 'Direct email:'],
  ['Setup e onboarding', 'Setup and onboarding'],
  ['Conversazioni', 'Conversations'],
  ['Calendario e booking', 'Calendar and booking'],
  ['Account e fatturazione', 'Account and billing'],
  ['Come collegare il numero WhatsApp Business', 'How to connect the WhatsApp Business number'],
  ['Come autorizzare Google Calendar', 'How to authorize Google Calendar'],
  ['Caricare il listino servizi', 'Upload the service list'],
  ['Configurare gli orari di apertura', 'Configure opening hours'],
  ['Come funziona il filtro AI', 'How the AI filter works'],
  ['Quando interviene un umano', 'When a human takes over'],
  ['Gestire vocali e media', 'Handle voice messages and media'],
  ['Risposte rapide preconfezionate', 'Predefined quick replies'],
  ['Come Ambrogio prenota appuntamenti', 'How Ambrogio books appointments'],
  ['Gestire conflitti calendario', 'Manage calendar conflicts'],
  ['Reminder automatici', 'Automatic reminders'],
  ['Gestire le disdette', 'Manage cancellations'],
  ['Cambiare piano', 'Change plan'],
  ['Scaricare fatture elettroniche SDI', 'Download SDI electronic invoices'],
  ['Aggiornare dati P.IVA', 'Update VAT details'],
  ['Esportare i miei dati (GDPR)', 'Export my data (GDPR)'],
  ['Cancellare account', 'Delete account'],
];

const EN_TO_IT = new Map(PAIRS);
const IT_TO_EN = new Map(PAIRS.map(([en, it]) => [it, en]));

function normalize(value: string | null): Locale {
  return value === 'it' ? 'it' : 'en';
}

function translateText(text: string, locale: Locale) {
  const map = locale === 'it' ? EN_TO_IT : IT_TO_EN;
  const trimmed = text.trim();
  const translated = map.get(trimmed);
  if (!translated) return null;
  return text.replace(trimmed, translated);
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
      if (!value) continue;
      const translated = translateText(value, locale);
      if (translated) element.setAttribute(attribute, translated);
    }
  });
}

export function MarketingLocale() {
  useEffect(() => {
    let locale = normalize(window.localStorage.getItem(STORAGE_KEY));
    translateDom(locale);

    const onLanguageChange = (event: Event) => {
      const custom = event as CustomEvent<string>;
      locale = normalize(custom.detail);
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
