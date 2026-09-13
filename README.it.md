# AI Receptionist Pro

Versione italiana della documentazione principale.

AI Receptionist Pro è un receptionist AI white-label per attività di servizi. Gestisce conversazioni WhatsApp, raccoglie i dati necessari per una richiesta, verifica la disponibilità dell'agenda, crea o modifica appuntamenti e trasferisce la conversazione a un operatore quando l'automazione deve fermarsi.

## Funzionalità

- WhatsApp con messaggi testuali e vocali
- Classificazione dell'intento e contesto conversazionale
- Prenotazioni e riprogrammazioni con controllo dei conflitti
- Sincronizzazione con Google Calendar
- Escalation a un operatore umano
- Knowledge base per le informazioni dell'attività
- Configurazione multi-tenant
- Branding white-label
- Preset per 7 settori
- Stripe per la fatturazione, quando abilitato
- Workflow GDPR per esportazione e cancellazione
- Deploy con Docker o piattaforme Node.js compatibili

## Settori di lancio

1. Salon & Barber
2. Beauty & Wellness
3. Dental & Clinic
4. Veterinary
5. Gym & Fitness
6. Auto Service
7. Consulting & Professional Services

## Avvio rapido

```bash
npm ci
npm run dev
```

Configura le variabili in `.env.product.example` e crea un progetto Supabase prima di usare autenticazione e dati persistenti.

Per la procedura completa consulta `docs/BUYER-QUICKSTART.md` e `docs/BUYER-SETUP.md`.

## Ambito dichiarato

La versione di lancio include il workflow di disponibilità e calendario già implementato. Non include un modulo dedicato di pianificazione multi-operatore/risorsa; tale funzione non deve essere pubblicizzata come inclusa.

## Licenza

Il prodotto contiene codice proveniente da un progetto upstream distribuito con licenza MIT. La licenza MIT e le relative attribuzioni devono rimanere nelle copie distribuite. Per i dettagli consulta `LICENSE` e `docs/UPSTREAM-ATTRIBUTION.md`.
