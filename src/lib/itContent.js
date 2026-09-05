const sharedSmartLinkFaqs = [
  {
    q: "Posso combinare App Store, Google Play e sito in un solo link?",
    a: "Sì. Link My App rileva il dispositivo e manda iPhone ad App Store, Android a Google Play e desktop alla URL alternativa che imposti.",
  },
  {
    q: "Posso modificare la destinazione dopo?",
    a: "Sì. La URL breve e il QR code restano uguali. Puoi cambiare App Store, Google Play o fallback dalla dashboard quando vuoi.",
  },
  {
    q: "Posso vedere da dove arrivano i clic?",
    a: "Sì. La dashboard mostra clic per dispositivo, sorgente, campagna e QR code, così capisci quali canali portano download.",
  },
  {
    q: "Serve installare un SDK nella app?",
    a: "No. Per creare il link di download non serve SDK né modificare la app. Link My App lavora prima dell'installazione, sul link e sul QR.",
  },
];

function buildUseCase({
  slug,
  label,
  title,
  metaTitle,
  metaDescription,
  h1,
  eyebrow,
  intro,
  painPoints,
  benefits,
  metrics,
  examples,
  tutorial,
}) {
  return {
    slug,
    label,
    title,
    metaTitle,
    metaDescription,
    h1,
    eyebrow,
    intro,
    painPoints,
    benefits,
    metrics,
    beforeAfter: {
      before: {
        title: "Senza smart link",
        rows: [
          "Due pulsanti store competono per l'attenzione.",
          "Gli utenti cliccano lo store sbagliato o abbandonano.",
          "QR code e campagne diventano difficili da misurare.",
          "Ogni canale richiede spiegazioni manuali.",
        ],
      },
      after: {
        title: "Con Link My App",
        rows: [
          "Un link porta ogni dispositivo alla destinazione corretta.",
          "Un QR code funziona per iPhone, Android e desktop.",
          "I clic sono separati per sorgente, dispositivo e campagna.",
          "Puoi cambiare destinazioni senza cambiare link o ristampare QR.",
        ],
      },
    },
    realExamples: examples,
    tutorial,
    faqs: sharedSmartLinkFaqs,
  };
}

export const italianUseCases = {
  ecommerce: buildUseCase({
    slug: "link-download-app-ecommerce",
    label: "Ecommerce",
    title: "Link di download per app ecommerce",
    metaTitle: "Link download app ecommerce - un QR code per App Store e Google Play",
    metaDescription:
      "Crea uno smart link e QR code per l'app del tuo negozio. iPhone, Android e desktop vengono mandati automaticamente alla destinazione corretta.",
    h1: "Un link per ottenere più download dell'app del tuo negozio",
    eyebrow: "App ecommerce",
    intro:
      "Quando i clienti devono scaricare la tua app da packaging, newsletter, Instagram o negozio fisico, un solo link di download è più chiaro di due pulsanti store.",
    painPoints: [
      "Packaging con due badge store diventa visivamente confuso.",
      "I clienti cliccano lo store sbagliato e abbandonano prima del download.",
      "Newsletter con due CTA perdono clic perché obbligano a scegliere.",
      "Campagne influencer sono difficili da confrontare se tutti condividono le stesse URL.",
      "QR code su scontrini o scatole non possono puntare a un solo store.",
      "Gli annunci pagati sprecano budget quando mandano utenti allo store sbagliato.",
    ],
    benefits: [
      { title: "Un CTA per tutti i canali", text: "Usa la stessa URL breve in email, annunci, bio Instagram, packaging, scontrini e sito." },
      { title: "QR code per packaging e negozio", text: "Un QR code copre iPhone, Android e desktop." },
      { title: "Campagne misurabili", text: "Crea uno smart link per canale o influencer e confronta i clic." },
      { title: "Meno frizione nel momento d'acquisto", text: "I clienti arrivano direttamente allo store corretto senza una decisione extra." },
      { title: "Destinazioni modificabili", text: "Cambia URL degli store senza ristampare packaging, flyer o QR code." },
      { title: "Perfetto per retention", text: "Riporta clienti esistenti da email, packaging e social dentro la app." },
    ],
    metrics: [
      { value: "1 QR", label: "per packaging e negozio" },
      { value: "100%", label: "iOS, Android e desktop coperti" },
      { value: "+18%", label: "meno frizione di due pulsanti" },
    ],
    examples: [
      { title: "Negozio moda", text: "Stampa un QR sulle etichette così i clienti scaricano la app al momento dell'acquisto." },
      { title: "Marketplace beauty", text: "Sostituisce due pulsanti newsletter con uno smart link e misura ogni campagna." },
      { title: "Brand caffè", text: "Usa un QR su bicchieri e scontrini per promuovere la app fedeltà." },
      { title: "Brand D2C", text: "Inserisce una card con QR in ogni ordine, funzionante su qualsiasi dispositivo." },
    ],
    tutorial: [
      { title: "Inserisci i link degli store", text: "Aggiungi App Store, Google Play e un'alternativa web per visitatori desktop." },
      { title: "Scegli uno slug breve", text: "Usa una URL come link-my.app/il-tuo-brand per packaging e annunci." },
      { title: "Scarica il QR code", text: "Mettilo su packaging, scontrino, vetrina o insert." },
      { title: "Confronta canali", text: "Crea link separati per newsletter, influencer o paid ads." },
    ],
  }),

  saas: buildUseCase({
    slug: "link-download-app-saas",
    label: "SaaS",
    title: "Link di download per app SaaS e B2B",
    metaTitle: "Link download app SaaS - smart link per App Store, Google Play e web app",
    metaDescription:
      "Porta utenti SaaS da onboarding, email, help center e vendite direttamente alla app mobile o web app corretta.",
    h1: "Uno smart link per la tua app SaaS, web app ed email di onboarding",
    eyebrow: "SaaS e B2B",
    intro:
      "I team SaaS hanno spesso web app, iOS e Android insieme. Con Link My App condividi un solo link in onboarding, vendite, supporto e annunci.",
    painPoints: [
      "Le email di onboarding hanno troppi link e confondono i nuovi utenti.",
      "I team sales inviano URL diverse ai clienti.",
      "Desktop deve andare alla web app, mobile allo store corretto.",
      "Gli articoli help center diventano obsoleti quando cambiano URL.",
      "Le campagne B2B sono difficili da misurare senza link per canale.",
      "La comunicazione di lancio diventa pesante se ogni piattaforma va spiegata a parte.",
    ],
    benefits: [
      { title: "Un link in onboarding", text: "Porta ogni utente alla app o web app corretta senza chiedere piattaforma." },
      { title: "Materiali sales puliti", text: "Un link breve sta bene in deck, PDF, demo e firme email." },
      { title: "Meno supporto", text: "Customer success non deve chiedere se il cliente usa iOS o Android." },
      { title: "Campagne per segmento", text: "Crea link per settore, account, regione o wave di lancio." },
      { title: "Nessun SDK", text: "Funziona subito per routing pre-installazione e QR code." },
      { title: "Fallback alla web app", text: "Desktop va a login, landing o pagina prodotto." },
    ],
    metrics: [
      { value: "3 destinazioni", label: "iOS, Android e web app" },
      { value: "0 SDK", label: "per il link di download" },
      { value: "1 URL", label: "per sales, supporto e marketing" },
    ],
    examples: [
      { title: "SaaS B2B", text: "Aggiunge uno smart link alle email di onboarding per far scaricare la app ai nuovi utenti." },
      { title: "Tool field service", text: "Stampa un QR code nei materiali di formazione per tecnici." },
      { title: "Software HR", text: "Crea link per cliente enterprise per misurare i rollout." },
      { title: "App produttività", text: "Desktop va alla web app e mobile allo store corretto." },
    ],
    tutorial: [
      { title: "Definisci fallback web", text: "Usa login, pagina prodotto o help center come destinazione desktop." },
      { title: "Crea master link", text: "Crea un link generale di download per onboarding e supporto." },
      { title: "Duplica per campagna", text: "Usa link propri per annunci, vendite, webinar e rollout." },
      { title: "Analizza metriche", text: "Confronta clic per sorgente e dispositivo nella dashboard." },
    ],
  }),

  restaurants: buildUseCase({
    slug: "qr-code-app-ristorante",
    label: "Ristoranti",
    title: "QR code e link di download per app ristoranti",
    metaTitle: "QR code per app ristorante - un link per App Store e Google Play",
    metaDescription:
      "Un QR code su tavolo, conto, flyer o vetrina che porta ogni cliente alla app del ristorante nello store corretto.",
    h1: "Un QR code per far scaricare la app del tuo ristorante",
    eyebrow: "Ristoranti e hospitality",
    intro:
      "Nei ristoranti il momento conta: tavolo, conto, area takeaway o vetrina. Un QR code porta clienti iPhone e Android direttamente allo store giusto.",
    painPoints: [
      "I clienti non sanno quale store aprire.",
      "Il personale deve spiegare il download della app ripetutamente.",
      "Flyer con due QR code sembrano confusi.",
      "I programmi fedeltà perdono utenti prima dell'installazione.",
      "Le azioni in locale sono difficili da misurare senza tracking QR.",
      "Desktop dovrebbe andare a menu, prenotazioni o sito.",
    ],
    benefits: [
      { title: "Un QR su ogni tavolo", text: "I clienti scansionano e arrivano automaticamente allo store corretto." },
      { title: "Più download fedeltà", text: "Riduci i passaggi tra conto e installazione." },
      { title: "Misurazione offline chiara", text: "Confronta tavolo, flyer, vetrina ed eventi." },
      { title: "Ideale per più sedi", text: "Crea link per location o campagna." },
      { title: "Fallback al menu", text: "Desktop o dispositivi sconosciuti possono andare al menu web." },
      { title: "Senza setup tecnico", text: "Ti servono solo le URL degli store e puoi stampare il QR." },
    ],
    metrics: [
      { value: "1 scan", label: "fino allo store corretto" },
      { value: "4 luoghi", label: "tavolo, conto, flyer, vetrina" },
      { value: "24/7", label: "link sempre attivo" },
    ],
    examples: [
      { title: "Catena burger", text: "Misura scansioni per punto vendita e promuove la app fedeltà al bancone." },
      { title: "Ristorante premium", text: "Inserisce un QR discreto sul conto per prenotazioni e download app." },
      { title: "Brand delivery", text: "Stampa lo smart QR su packaging e card promozionali." },
      { title: "Caffè locale", text: "Porta clienti alla app punti senza due badge sul tavolo." },
    ],
    tutorial: [
      { title: "Aggiungi destinazioni app", text: "Definisci App Store, Google Play e sito o menu come fallback." },
      { title: "Scarica QR per stampa", text: "Esporta e testa il QR con iPhone e Android." },
      { title: "Duplica per location", text: "Crea link propri per sedi, eventi o campagne stagionali." },
      { title: "Controlla scansioni", text: "Vedi nella dashboard quale posizione porta più clic." },
    ],
  }),

  fitness: buildUseCase({
    slug: "link-download-app-fitness",
    label: "Fitness",
    title: "Link di download per palestre e app benessere",
    metaTitle: "Link download app fitness - QR code per palestre, corsi e membri",
    metaDescription:
      "Uno smart link per la tua app fitness: iPhone ad App Store, Android a Google Play e desktop a sito o prenotazione.",
    h1: "Un link per far installare la tua app fitness ai membri",
    eyebrow: "Fitness e benessere",
    intro:
      "Palestre, studi yoga e app coaching hanno bisogno di un percorso semplice per il download su poster, orari, specchi, email e social.",
    painPoints: [
      "I membri cercano il nome sbagliato della app nello store.",
      "Orari con due QR code o badge diventano sovraccarichi.",
      "Le prove gratuite non portano gli interessati alla app in modo chiaro.",
      "I trainer condividono link diversi nei gruppi WhatsApp.",
      "Il materiale offline non mostra quale superficie genera download.",
      "Desktop deve andare alla pagina prenotazioni, non a uno store.",
    ],
    benefits: [
      { title: "QR code in palestra", text: "Un codice su specchio, reception, orario o flyer porta ogni telefono allo store corretto." },
      { title: "WhatsApp e community", text: "I trainer possono condividere un link breve nei gruppi." },
      { title: "Campagne per corso", text: "Misura se yoga, HIIT, PT o newsletter genera più clic." },
      { title: "Fallback alle prenotazioni", text: "Desktop va a sito, calendario o area membri." },
      { title: "Meno supporto", text: "Nessuno deve spiegare quale store corrisponde a quale telefono." },
      { title: "Aggiornabile rapidamente", text: "Cambia destinazioni senza ridisegnare il materiale stampato." },
    ],
    metrics: [
      { value: "1 link", label: "per membri e lead" },
      { value: "0 dubbi", label: "sullo store corretto" },
      { value: "Tutti", label: "i canali misurabili" },
    ],
    examples: [
      { title: "Studio boutique", text: "Mette uno smart QR alla reception per prenotazioni via app." },
      { title: "Catena palestre", text: "Crea link per sede e confronta la domanda di download." },
      { title: "Insegnante yoga", text: "Condivide un link breve su Instagram e WhatsApp." },
      { title: "App wellness", text: "Usa un link per flyer QR e paid social." },
    ],
    tutorial: [
      { title: "Definisci fallback prenotazioni", text: "Desktop deve andare a orari, sito o area membri." },
      { title: "Testa il QR", text: "Testa con iPhone e Android prima di stampare." },
      { title: "Misura per superficie", text: "Usa link diversi per reception, sala, email e social." },
      { title: "Ottimizza regolarmente", text: "Confronta clic e sposta i QR nei punti migliori." },
    ],
  }),

  creators: buildUseCase({
    slug: "link-download-app-creator",
    label: "Creator",
    title: "Link di download per creator, influencer e community",
    metaTitle: "Link download app creator - un link per Instagram, TikTok e YouTube",
    metaDescription:
      "Uno smart link breve per app di creator, community e campagne influencer. Funziona in bio, stories, video ed email.",
    h1: "Un link app per bio, stories, video e community",
    eyebrow: "Creator e influencer",
    intro:
      "I creator hanno poco spazio: link in bio, sticker story, descrizione video o newsletter. Con uno smart link nessuno sceglie tra App Store e Google Play.",
    painPoints: [
      "Instagram e TikTok danno poco spazio a più link store.",
      "Le pagine link-in-bio aggiungono un passaggio prima del download.",
      "I follower cliccano da mobile, desktop e browser interni.",
      "Le partnership influencer sono difficili da valutare senza link propri.",
      "URL lunghe degli store sembrano poco professionali nelle caption.",
      "I QR code per eventi hanno bisogno di un unico link affidabile.",
    ],
    benefits: [
      { title: "Un link in bio", text: "Breve, chiaro e diretto allo store corretto." },
      { title: "Link per creator", text: "Dai una URL propria a ogni influencer e confronta i clic." },
      { title: "Funziona nei browser interni", text: "Il link decide sul server e manda alla destinazione corretta." },
      { title: "QR per eventi", text: "Usa lo stesso smart link come QR in meetup, merch o slide." },
      { title: "Campagne pulite", text: "Separa TikTok, Instagram, YouTube, newsletter e podcast." },
      { title: "Meglio di due pulsanti", text: "I follower non devono pensare a che telefono hanno." },
    ],
    metrics: [
      { value: "1 bio", label: "un link app basta" },
      { value: "∞", label: "link campagna" },
      { value: "3 destinazioni", label: "iOS, Android, web" },
    ],
    examples: [
      { title: "Creator fitness", text: "Condivide uno smart link su TikTok e misura clic separati da Instagram." },
      { title: "Community newsletter", text: "Invia un CTA che da mobile va allo store e da desktop alla web app." },
      { title: "Podcast", text: "Usa una URL breve nelle note e QR negli eventi live." },
      { title: "Campagna influencer", text: "Ogni creator riceve il proprio link per confronto nel report." },
    ],
    tutorial: [
      { title: "Crea link della bio", text: "Scegli uno slug breve collegato al brand o alla campagna." },
      { title: "Usalo in tutti i profili", text: "Metti il link su Instagram, TikTok, YouTube, X e newsletter." },
      { title: "Duplica per creator", text: "Crea smart link per creator, post o fase di lancio." },
      { title: "Analizza clic", text: "Confronta sorgenti e dispositivi prima di aumentare budget." },
    ],
  }),

  agencies: {
    slug: "per-agenzie",
    label: "Agenzie",
    title: "Smart link per agenzie",
    metaTitle: "Smart link per agenzie - link download app per clienti, campagne e QR code",
    metaDescription:
      "Le agenzie creano uno smart link per cliente, campagna, sede o QR code e misurano clic per App Store, Google Play e web fallback.",
    h1: "Link di download per ogni cliente della tua agenzia",
    eyebrow: "Per agenzie e partner",
    intro:
      "Smetti di inviare due URL store a ogni cliente. Crea uno smart link per cliente, canale o campagna, consegna un solo QR code e mostra dati di clic in una dashboard chiara.",
    faqs: [
      { q: "Un'agenzia può gestire più clienti?", a: "Sì. Puoi creare smart link, slug, QR code e campagne propri per ogni cliente." },
      { q: "Posso creare un QR per campagna?", a: "Sì. Crea link separati per retail, eventi, influencer, paid social o print e misura ogni canale." },
      { q: "Posso usare Link My App nei report cliente?", a: "Sì. I dati di clic per dispositivo, sorgente e campagna sono facili da inserire nei report." },
      { q: "Va bene per lanci white-glove?", a: "Sì. Puoi creare link per mercato, regione o fase di campagna e modificarli dopo." },
    ],
  },
};

function buildHowTo({ slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps }) {
  return { slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps };
}

export const italianHowTos = {
  "instagram-share": buildHowTo({
    slug: "condividere-app-instagram",
    label: "Condividere app su Instagram",
    metaTitle: "Condividere app su Instagram - bio, stories e annunci con un link",
    metaDescription:
      "Come condividere la tua app su Instagram con uno smart link che manda iPhone ad App Store e Android a Google Play.",
    h1: "Come condividere la tua app su Instagram con un solo link",
    eyebrow: "Instagram",
    intro:
      "Instagram offre poco spazio. Con uno smart link usi una URL breve in bio, stories, reels e annunci, senza mostrare due link store.",
    problem:
      "Due link store in bio creano frizione. Molti utenti non proseguono se devono scegliere tra App Store e Google Play.",
    totalTime: "PT3M",
    steps: [
      { name: "Crea smart link", text: "Aggiungi App Store, Google Play e opzionalmente un'alternativa web in Link My App." },
      { name: "Sostituisci il link in bio", text: "Vai su Modifica profilo in Instagram e inserisci la URL link-my.app come sito." },
      { name: "Usalo in stories e reels", text: "Usa lo stesso link nello sticker story, nelle caption dei reels o negli annunci." },
      { name: "Separa campagne", text: "Crea link propri per post importanti o influencer per confrontare i clic." },
      { name: "Vedi risultati", text: "Nella dashboard vedi quanti clic arrivano da Instagram, iOS, Android o desktop." },
    ],
  }),

  "whatsapp-link": buildHowTo({
    slug: "link-download-app-whatsapp",
    label: "Condividere app via WhatsApp",
    metaTitle: "Condividere app via WhatsApp - un link per iPhone e Android",
    metaDescription:
      "Crea un link download app ideale per WhatsApp, che porta ogni telefono automaticamente allo store corretto.",
    h1: "Come condividere la tua app su WhatsApp senza due link store",
    eyebrow: "WhatsApp",
    intro:
      "I messaggi WhatsApp devono essere brevi. Uno smart link sostituisce URL lunghe di App Store e Google Play con un link chiaro.",
    problem:
      "Quando mandi entrambi i link in un messaggio, diventa lungo e l'utente deve decidere da solo.",
    totalTime: "PT2M",
    steps: [
      { name: "Scegli slug breve", text: "Usa uno slug leggibile perché il link sembri affidabile nelle chat." },
      { name: "Definisci destinazioni", text: "Aggiungi iOS, Android e fallback." },
      { name: "Mantieni il messaggio breve", text: "Scrivi qualcosa di diretto: Scarica la nostra app qui: link-my.app/la-tua-app." },
      { name: "Testa i broadcast", text: "Testa il link su iPhone e Android prima di inviarlo a gruppi o clienti." },
      { name: "Misura i clic", text: "Crea un link dedicato a WhatsApp se vuoi misurare il canale separatamente." },
    ],
  }),

  "redirect-by-device": buildHowTo({
    slug: "reindirizzare-app-store-google-play",
    label: "Reindirizzare per dispositivo",
    metaTitle: "Reindirizzare automaticamente verso App Store o Google Play",
    metaDescription:
      "Come mandare iPhone, Android e desktop automaticamente alla destinazione corretta senza pagina JavaScript e senza SDK.",
    h1: "Come reindirizzare utenti automaticamente verso App Store o Google Play",
    eyebrow: "Rilevamento dispositivo",
    intro:
      "Uno smart link legge segnali tecnici del dispositivo e decide sul server se l'utente deve vedere App Store, Google Play o una pagina web.",
    problem:
      "Una URL store normale funziona solo per una piattaforma. Se mandi tutto il traffico lì, perdi una parte dei download.",
    totalTime: "PT4M",
    steps: [
      { name: "Aggiungi destinazione iOS", text: "Copia la URL pubblica App Store della tua app." },
      { name: "Aggiungi destinazione Android", text: "Copia la URL Google Play." },
      { name: "Definisci fallback desktop", text: "Usa landing page, web app o pagina download per visitatori desktop." },
      { name: "Pubblica smart link", text: "Condividi solo la URL breve link-my.app in campagne, bio, annunci e QR code." },
      { name: "Testa reindirizzamento", text: "Testa iPhone, Android e desktop prima del lancio." },
    ],
  }),

  "download-button-website": buildHowTo({
    slug: "pulsante-download-app-sito",
    label: "Pulsante download sul sito",
    metaTitle: "Pulsante download app per sito - un pulsante per App Store e Google Play",
    metaDescription:
      "Sostituisci due badge store con un pulsante download che manda ogni dispositivo alla piattaforma corretta.",
    h1: "Come creare un pulsante download app con un solo link",
    eyebrow: "Sito",
    intro:
      "Nelle landing mobile lo spazio è poco. Un solo pulsante è spesso più chiaro di due badge affiancati.",
    problem:
      "Due pulsanti occupano spazio, si spezzano su schermi piccoli e obbligano il visitatore a scegliere.",
    totalTime: "PT5M",
    steps: [
      { name: "Crea smart link", text: "Definisci iOS, Android e fallback web in Link My App." },
      { name: "Scegli testo pulsante", text: "Usa testi chiari come Scarica app o Installa ora." },
      { name: "Collega il pulsante", text: "Inserisci la URL link-my.app come destinazione del pulsante." },
      { name: "Testa su mobile", text: "Verifica che il pulsante sia visibile e non si rompa su schermi piccoli." },
      { name: "Distingui campagne", text: "Se il sito ha più pagine, crea link dedicati per pagina per statistiche migliori." },
    ],
  }),

  "qr-physical-campaigns": buildHowTo({
    slug: "qr-code-download-app",
    label: "QR code per download app",
    metaTitle: "Creare QR code per download app - un QR per iPhone e Android",
    metaDescription:
      "Crea un QR code che manda iPhone ad App Store, Android a Google Play e desktop al sito.",
    h1: "Come creare un QR code per download app",
    eyebrow: "QR code",
    intro:
      "Un QR code per app non dovrebbe puntare a un solo store. Con Link My App, un QR diventa uno smart link per tutti i dispositivi.",
    problem:
      "Un QR code con una sola URL store esclude iOS o Android. Due QR code sembrano confusi e vengono scansionati meno.",
    totalTime: "PT6M",
    steps: [
      { name: "Crea smart link", text: "Aggiungi App Store, Google Play e fallback." },
      { name: "Scarica QR", text: "Usa il QR code generato per stampa, packaging o eventi." },
      { name: "Mantieni CTA breve", text: "Scrivi qualcosa come: Scansiona e scarica la app." },
      { name: "Testa dimensione di stampa", text: "Testa il QR a una distanza realistica con iPhone e Android." },
      { name: "Misura per superficie", text: "Crea QR code separati per packaging, flyer, vetrina ed eventi." },
    ],
  }),
};

export const italianLegalPages = {
  privacy: {
    path: "/privacy",
    title: "Informativa sulla Privacy",
    shortTitle: "Privacy",
    intro:
      "Questa Informativa sulla Privacy spiega come David Trotonda tratta dati personali quando usi Link My App per creare smart link, QR code e statistiche di clic per app.",
    sections: [
      {
        title: "Titolare del trattamento",
        paragraphs: [
          "Il titolare del trattamento è David Trotonda.",
          "Contatto: info@skeilapps.com.",
          "Servizio: Link My App, disponibile su link-my.app.",
        ],
      },
      {
        title: "Dati trattati",
        paragraphs: [
          "Dati account, come nome, email, ID utente e foto profilo quando accedi con Google.",
          "Dati smart link, come nome app, URL App Store, URL Google Play, URL alternativa, slug, stato e QR code associato.",
          "Dati di utilizzo e analytics, come clic, data e ora, destinazione scelta, sorgente, dispositivo approssimativo, browser, sistema operativo e segnali tecnici per sicurezza e prevenzione abusi.",
        ],
      },
      {
        title: "Finalità",
        paragraphs: [
          "Creare e gestire il tuo account.",
          "Salvare smart link e reindirizzare visitatori alla destinazione configurata.",
          "Creare QR code e mostrare statistiche di clic nella dashboard.",
          "Proteggere il servizio da abusi, link fraudolenti, accessi non autorizzati e problemi tecnici.",
        ],
      },
      {
        title: "Basi giuridiche",
        paragraphs: [
          "Esecuzione di contratto o misure precontrattuali quando crei account o usi smart link.",
          "Consenso quando ci contatti o attivi servizi opzionali.",
          "Interesse legittimo per garantire sicurezza, stabilità e miglioramento del servizio.",
          "Adempimento di obblighi legali quando necessario per contabilità, imposte o diritti privacy.",
        ],
      },
      {
        title: "Fornitori",
        paragraphs: [
          "Usiamo fornitori tecnici come Firebase e Google Cloud per hosting, autenticazione, database e sicurezza.",
          "Alcuni fornitori possono trattare dati fuori dallo Spazio Economico Europeo. In questi casi usiamo garanzie adeguate, come clausole contrattuali standard o decisioni di adeguatezza.",
        ],
      },
      {
        title: "Conservazione e diritti",
        paragraphs: [
          "Conserviamo dati account finché l'account è attivo o finché esistono obblighi legali.",
          "Puoi richiedere accesso, rettifica, cancellazione, limitazione, opposizione e portabilità contattandoci.",
          "Se ritieni che i tuoi dati non siano trattati correttamente, puoi contattare un'autorità di controllo privacy.",
        ],
      },
    ],
  },

  cookies: {
    path: "/cookies",
    title: "Politica sui Cookie",
    shortTitle: "Cookie",
    intro:
      "Questa Cookie Policy spiega quali tecnologie Link My App può usare per login, sicurezza, preferenze e misurazione.",
    sections: [
      {
        title: "Cosa sono i cookie",
        paragraphs: [
          "Cookie e tecnologie simili, come LocalStorage, aiutano un sito a salvare informazioni nel browser.",
          "Alcune tecnologie sono necessarie per login, sicurezza e funzionalità di base.",
        ],
      },
      {
        title: "Tecnologie necessarie",
        paragraphs: [
          "Possiamo usare tecnologie necessarie per autenticare utenti, proteggere sessioni, prevenire abusi e salvare impostazioni.",
          "Queste tecnologie sono necessarie per fornire il servizio richiesto e di norma non richiedono consenso preventivo.",
        ],
      },
      {
        title: "Analytics e misurazione",
        paragraphs: [
          "Link My App misura clic sugli smart link, tipi di dispositivo, sorgenti e utilizzo QR nella dashboard.",
          "Strumenti opzionali di web analytics saranno usati solo quando esistono basi giuridiche e consensi necessari.",
        ],
      },
      {
        title: "Gestione",
        paragraphs: [
          "Puoi bloccare o eliminare cookie e dati locali dal browser.",
          "Eliminare dati necessari può terminare la sessione o impedire il corretto funzionamento di alcune funzionalità.",
        ],
      },
    ],
  },

  terms: {
    path: "/termini",
    title: "Termini e Condizioni",
    shortTitle: "Termini",
    intro:
      "Questi termini regolano l'uso di Link My App, un servizio per creare smart link app, QR code e statistiche di clic.",
    sections: [
      {
        title: "Descrizione del servizio",
        paragraphs: [
          "Link My App permette di creare uno smart link per App Store, Google Play e una URL alternativa.",
          "Il servizio può fornire QR code e statistiche di clic per i tuoi link.",
        ],
      },
      {
        title: "Uso del servizio",
        paragraphs: [
          "Sei responsabile della correttezza delle URL inserite e del diritto a utilizzarle.",
          "Non puoi usare Link My App per contenuti illegali, fraudolenti, ingannevoli o abusivi.",
          "Possiamo rimuovere o disattivare link che violano diritti di terzi, leggi o regole di sicurezza.",
        ],
      },
      {
        title: "Disponibilità",
        paragraphs: [
          "Cerchiamo di mantenere un servizio stabile, ma non garantiamo disponibilità senza interruzioni.",
          "Manutenzione, guasti tecnici, fornitori esterni o forza maggiore possono influire sul servizio.",
        ],
      },
      {
        title: "Responsabilità",
        paragraphs: [
          "Link My App non sostituisce la revisione legale, tecnica o marketing delle tue campagne.",
          "Nei limiti consentiti dalla legge, non rispondiamo di danni indiretti, mancati profitti o conseguenze di URL inserite in modo errato.",
        ],
      },
      {
        title: "Modifiche",
        paragraphs: [
          "Possiamo aggiornare questi termini quando servizio, legge o requisiti tecnici cambiano.",
          "In caso di modifiche rilevanti, informeremo in modo adeguato.",
        ],
      },
    ],
  },
};
