const sharedSmartLinkFaqs = [
  {
    q: "Kann ich App Store, Google Play und eine Webseite in einem Link kombinieren?",
    a: "Ja. Link My App erkennt das Gerät und leitet iPhone-Nutzer zum App Store, Android-Nutzer zu Google Play und Desktop-Besucher zur hinterlegten Alternative weiter.",
  },
  {
    q: "Kann ich den Ziel-Link später ändern?",
    a: "Ja. Die kurze URL und der QR-Code bleiben gleich. Du kannst App-Store-Link, Google-Play-Link oder Fallback jederzeit im Dashboard ändern.",
  },
  {
    q: "Sehe ich, woher die Klicks kommen?",
    a: "Ja. Im Dashboard siehst du Klicks nach Gerät, Quelle, Kampagne und QR-Code, damit du erkennst, welche Kanäle wirklich App-Downloads bringen.",
  },
  {
    q: "Brauche ich ein SDK in meiner App?",
    a: "Nein. Für den App-Download-Link brauchst du kein SDK und keine App-Änderung. Link My App arbeitet vor der Installation auf Link- und QR-Ebene.",
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
        title: "Ohne Smartlink",
        rows: [
          "Zwei Store-Buttons konkurrieren um Aufmerksamkeit.",
          "Nutzer tippen auf den falschen Store oder brechen ab.",
          "QR-Codes und Kampagnen lassen sich schwer sauber messen.",
          "Jeder Kanal braucht eigene manuelle Erklärungen.",
        ],
      },
      after: {
        title: "Mit Link My App",
        rows: [
          "Ein Link führt jedes Gerät zum richtigen Ziel.",
          "Ein QR-Code funktioniert für iPhone, Android und Desktop.",
          "Klicks werden nach Quelle, Gerät und Kampagne getrennt.",
          "Du kannst Ziele ändern, ohne den Link oder QR-Code neu zu drucken.",
        ],
      },
    },
    realExamples: examples,
    tutorial,
    faqs: sharedSmartLinkFaqs,
  };
}

export const germanUseCases = {
  ecommerce: buildUseCase({
    slug: "ecommerce-app-download-link",
    label: "Ecommerce",
    title: "App-Download-Link für Ecommerce-Apps",
    metaTitle: "App-Download-Link für Ecommerce - ein QR-Code für App Store und Google Play",
    metaDescription:
      "Erstelle einen Smartlink und QR-Code für die App deines Shops. iPhone, Android und Desktop werden automatisch zum richtigen Ziel geleitet.",
    h1: "Ein Link, um mehr Downloads für deine Shop-App zu bekommen",
    eyebrow: "Ecommerce-Apps",
    intro:
      "Wenn Kunden auf Verpackung, Newsletter, Instagram oder im Store deine App herunterladen sollen, ist ein einziger App-Download-Link klarer als zwei Store-Buttons. Link My App erkennt das Gerät und leitet direkt weiter.",
    painPoints: [
      "Auf Verpackungen wirken zwei Store-Badges unruhig und nehmen Platz weg.",
      "Kunden klicken auf den falschen Store und brechen vor dem Download ab.",
      "Newsletter mit zwei CTAs verlieren Klicks, weil Nutzer erst wählen müssen.",
      "Influencer-Kampagnen sind schwer vergleichbar, wenn alle dieselben Store-URLs teilen.",
      "QR-Codes auf Belegen oder Kartons können nicht einfach auf nur einen Store zeigen.",
      "Paid Ads verschwenden Budget, wenn iPhone-Nutzer auf Google Play oder Android-Nutzer im App Store landen.",
    ],
    benefits: [
      { title: "Ein CTA für alle Kanäle", text: "Nutze dieselbe kurze URL in E-Mail, Ads, Instagram Bio, Verpackung, Kassenbon und Website." },
      { title: "QR-Code für Verpackung und Laden", text: "Ein QR-Code reicht für iPhone, Android und Desktop-Fallback." },
      { title: "Kampagnen sauber messen", text: "Erstelle je Kanal oder Influencer einen eigenen Smartlink und vergleiche die Klicks." },
      { title: "Weniger Reibung im Kaufmoment", text: "Kunden landen direkt im richtigen Store, ohne eine Zwischenentscheidung." },
      { title: "Ziele später anpassen", text: "Ändere Store-URLs, ohne Verpackungen, Flyer oder QR-Codes neu zu drucken." },
      { title: "Perfekt für Retention", text: "Bring Bestandskunden aus E-Mail, Packaging und Social zur App zurück." },
    ],
    metrics: [
      { value: "1 QR", label: "für Verpackung und Storefront" },
      { value: "100%", label: "iOS, Android und Desktop abgedeckt" },
      { value: "+18%", label: "weniger Reibung als zwei Buttons" },
    ],
    examples: [
      { title: "Mode-Shop", text: "Druckt einen QR-Code auf Hangtags, damit Kunden die App direkt in der Umkleide laden." },
      { title: "Beauty-Marketplace", text: "Ersetzt zwei Newsletter-Buttons durch einen Smartlink und misst jede Kampagne getrennt." },
      { title: "Coffee Brand", text: "Nutzt einen QR-Code auf Bechern und Belegen für die Loyalty-App." },
      { title: "D2C-Marke", text: "Legt jeder Bestellung eine Karte mit einem QR-Code bei, der jedes Gerät richtig weiterleitet." },
    ],
    tutorial: [
      { title: "Store-Links einfügen", text: "Füge App Store, Google Play und eine Web-Alternative für Desktop-Besucher ein." },
      { title: "Kurzen Slug wählen", text: "Nutze eine URL wie link-my.app/deine-marke, damit sie sauber auf Verpackungen und in Ads aussieht." },
      { title: "QR-Code herunterladen", text: "Platziere den QR-Code auf Verpackung, Beleg, Storefront oder Versandbeilage." },
      { title: "Kanäle vergleichen", text: "Erstelle je Newsletter, Influencer oder Paid-Ad-Kampagne einen eigenen Smartlink." },
    ],
  }),

  saas: buildUseCase({
    slug: "saas-app-download-link",
    label: "SaaS",
    title: "App-Download-Link für SaaS und B2B-Produkte",
    metaTitle: "SaaS App-Download-Link - ein Smartlink für App Store, Google Play und Web-App",
    metaDescription:
      "Führe SaaS-Nutzer von Onboarding, E-Mail, Help Center und Sales direkt zur richtigen mobilen App oder Web-App.",
    h1: "Ein Smartlink für deine SaaS-App, Web-App und Onboarding-Mails",
    eyebrow: "SaaS und B2B",
    intro:
      "SaaS-Teams haben oft Web-App, iOS-App und Android-App gleichzeitig. Mit Link My App teilst du einen einzigen Link in Onboarding, Sales, Support und Ads.",
    painPoints: [
      "Onboarding-Mails enthalten zu viele Links und verwirren neue Nutzer.",
      "Sales-Teams schicken unterschiedliche Store-URLs an Kunden.",
      "Desktop-Nutzer brauchen die Web-App, mobile Nutzer den passenden Store.",
      "Help-Center-Artikel veralten, wenn Store-URLs geändert werden.",
      "B2B-Kampagnen lassen sich ohne eigene Links pro Kanal schwer messen.",
      "Launch-Kommunikation wirkt unruhig, wenn jede Plattform einzeln erklärt werden muss.",
    ],
    benefits: [
      { title: "Ein Link im Onboarding", text: "Führe jeden Nutzer zur richtigen App oder Web-App, ohne Plattformfragen." },
      { title: "Saubere Sales-Unterlagen", text: "Ein kurzer Link passt in Decks, PDFs, Demos und E-Mail-Signaturen." },
      { title: "Support spart Zeit", text: "Support und Customer Success müssen nicht mehr nach iOS oder Android fragen." },
      { title: "Kampagnen je Segment", text: "Erstelle eigene Links für Branchen, Accounts, Regionen oder Launch-Wellen." },
      { title: "Kein SDK nötig", text: "Funktioniert sofort für Pre-Install-Routing und QR-Codes." },
      { title: "Fallback zur Web-App", text: "Desktop-Besucher landen direkt dort, wo sie sich anmelden oder informieren können." },
    ],
    metrics: [
      { value: "3 Ziele", label: "iOS, Android und Web-App" },
      { value: "0 SDK", label: "für den Download-Link" },
      { value: "1 URL", label: "für Sales, Support und Marketing" },
    ],
    examples: [
      { title: "B2B-SaaS", text: "Fügt einen Smartlink in Onboarding-Mails ein, damit neue Nutzer sofort die richtige App laden." },
      { title: "Field-Service-Tool", text: "Druckt einen QR-Code in Schulungsunterlagen für Techniker." },
      { title: "HR-Software", text: "Erstellt Links pro Unternehmenskunde, um Rollouts getrennt zu messen." },
      { title: "Produktivitäts-App", text: "Leitet Desktop-Besucher zur Web-App und mobile Nutzer zum passenden Store." },
    ],
    tutorial: [
      { title: "Web-Fallback definieren", text: "Nutze Login, Produktseite oder Help Center als Desktop-Ziel." },
      { title: "Master-Link erstellen", text: "Erstelle einen allgemeinen Download-Link für Onboarding und Support." },
      { title: "Kampagnen-Links duplizieren", text: "Nutze eigene Links für Ads, Sales, Webinare und Kundenrollouts." },
      { title: "Metriken auswerten", text: "Vergleiche Klicks nach Quelle und Gerät im Dashboard." },
    ],
  }),

  restaurants: buildUseCase({
    slug: "restaurant-app-download-link",
    label: "Restaurants",
    title: "QR-Code und Download-Link für Restaurant-Apps",
    metaTitle: "Restaurant App QR-Code - ein Link für App Store und Google Play",
    metaDescription:
      "Ein QR-Code auf Tisch, Rechnung, Flyer oder Schaufenster, der jeden Gast zur richtigen Restaurant-App leitet.",
    h1: "Ein QR-Code, damit Gäste deine Restaurant-App sofort laden",
    eyebrow: "Restaurants und Hospitality",
    intro:
      "Bei Restaurants zählt der Moment: Tisch, Rechnung, Abholbereich oder Schaufenster. Ein einziger QR-Code bringt iPhone- und Android-Gäste direkt zur richtigen App.",
    painPoints: [
      "Gäste wissen nicht, welchen Store sie öffnen sollen.",
      "Mitarbeiter müssen App-Downloads immer wieder erklären.",
      "Flyer mit zwei QR-Codes sehen unaufgeräumt aus.",
      "Loyalty-Programme verlieren Nutzer, bevor die App installiert ist.",
      "Aktionen im Laden lassen sich ohne QR-Tracking schwer messen.",
      "Desktop-Besucher brauchen eher Menü, Reservierung oder Website.",
    ],
    benefits: [
      { title: "Ein QR-Code auf jedem Tisch", text: "Gäste scannen und landen automatisch im richtigen Store." },
      { title: "Mehr Loyalty-Downloads", text: "Reduziere die Schritte zwischen Rechnung und App-Installation." },
      { title: "Saubere Offline-Messung", text: "Vergleiche Tischaufsteller, Flyer, Schaufenster und Events." },
      { title: "Ideal für Filialen", text: "Erstelle eigene Links pro Standort oder Kampagne." },
      { title: "Fallback zur Speisekarte", text: "Desktop oder unbekannte Geräte können zur Web-Speisekarte gehen." },
      { title: "Ohne technische Einrichtung", text: "Du brauchst nur die Store-URLs und kannst den QR-Code direkt drucken." },
    ],
    metrics: [
      { value: "1 Scan", label: "bis zum richtigen Store" },
      { value: "4 Orte", label: "Tisch, Rechnung, Flyer, Schaufenster" },
      { value: "24/7", label: "Download-Link immer aktiv" },
    ],
    examples: [
      { title: "Burger-Kette", text: "Misst QR-Scans pro Filiale und bewirbt die Loyalty-App am Tresen." },
      { title: "Fine-Dining-Restaurant", text: "Legt einen dezenten QR-Code auf die Rechnung für Reservierungen und App-Downloads." },
      { title: "Delivery-Marke", text: "Druckt den Smart-QR auf Verpackungen und Gutscheinkarten." },
      { title: "Cafe", text: "Führt Stammkunden zur Stempel-App, ohne zwei Store-Icons auf den Tischsteller zu setzen." },
    ],
    tutorial: [
      { title: "App-Ziele eintragen", text: "Hinterlege App Store, Google Play und Website oder Menü als Fallback." },
      { title: "QR-Code für Print laden", text: "Exportiere den QR-Code und teste ihn mit iPhone und Android." },
      { title: "Pro Standort duplizieren", text: "Erstelle eigene Links für Filialen, Events oder saisonale Aktionen." },
      { title: "Scans kontrollieren", text: "Prüfe im Dashboard, welche Platzierung die meisten App-Klicks bringt." },
    ],
  }),

  fitness: buildUseCase({
    slug: "fitness-app-download-link",
    label: "Fitness",
    title: "App-Download-Link für Fitnessstudios und Wellness-Apps",
    metaTitle: "Fitness-App Download-Link - QR-Code für Studios, Kurse und Mitglieder",
    metaDescription:
      "Ein Smartlink für deine Fitness-App: iPhone zu App Store, Android zu Google Play, Desktop zur Website oder Buchung.",
    h1: "Ein Link, damit Mitglieder deine Fitness-App direkt installieren",
    eyebrow: "Fitness und Wellness",
    intro:
      "Fitnessstudios, Yoga-Studios und Coaching-Apps brauchen einen einfachen Download-Weg auf Plakaten, Kursplänen, Spiegeln, E-Mails und Social Media.",
    painPoints: [
      "Mitglieder suchen im Store nach dem falschen App-Namen.",
      "Kurspläne mit zwei QR-Codes oder Badges wirken überladen.",
      "Probetrainings bringen Interessenten nicht sauber in die App.",
      "Trainer teilen unterschiedliche Links in WhatsApp-Gruppen.",
      "Offline-Material zeigt nicht, welche Fläche wirklich Downloads bringt.",
      "Desktop-Besucher sollen eher zur Buchungsseite als in einen Store.",
    ],
    benefits: [
      { title: "QR-Code im Studio", text: "Ein Code auf Spiegel, Tresen, Kursplan oder Flyer führt jedes Handy zum richtigen Store." },
      { title: "WhatsApp und Community", text: "Trainer können einen kurzen Link in Gruppen teilen." },
      { title: "Kampagnen pro Kurs", text: "Miss, ob Yoga, HIIT, Personal Training oder Newsletter mehr App-Klicks bringt." },
      { title: "Fallback zur Buchung", text: "Desktop-Besucher gehen zur Website, Buchung oder Mitgliederplattform." },
      { title: "Weniger Support", text: "Keine Erklärung mehr, welcher Store für welches Handy passt." },
      { title: "Schnell aktualisierbar", text: "Ändere Ziele, ohne Printmaterial neu zu gestalten." },
    ],
    metrics: [
      { value: "1 Link", label: "für Mitglieder und Interessenten" },
      { value: "0 Fragen", label: "welcher Store richtig ist" },
      { value: "Alle", label: "Kurse getrennt messbar" },
    ],
    examples: [
      { title: "Boutique-Studio", text: "Platziert einen Smart-QR am Empfang für Kursbuchungen per App." },
      { title: "Gym-Kette", text: "Erstellt pro Standort eigene Links und vergleicht die Download-Nachfrage." },
      { title: "Yoga-Lehrerin", text: "Teilt einen kurzen App-Link in Instagram und WhatsApp." },
      { title: "Wellness-App", text: "Nutzt einen Link für QR-Flyer und Paid Social." },
    ],
    tutorial: [
      { title: "Fallback zur Buchungsseite setzen", text: "Desktop-Nutzer sollen direkt zu Kursplan oder Mitgliederbereich." },
      { title: "QR-Code testen", text: "Teste den Code mit iPhone und Android, bevor du ihn druckst." },
      { title: "Pro Fläche messen", text: "Nutze eigene Smartlinks für Empfang, Kursraum, E-Mail und Social." },
      { title: "Regelmäßig optimieren", text: "Vergleiche die Klicks und verschiebe QR-Codes an bessere Stellen." },
    ],
  }),

  creators: buildUseCase({
    slug: "creator-app-download-link",
    label: "Creator",
    title: "App-Download-Link für Creator, Influencer und Communities",
    metaTitle: "Creator App-Download-Link - ein Link für Instagram, TikTok und YouTube",
    metaDescription:
      "Ein kurzer Smartlink für Creator-Apps, Community-Apps und Influencer-Kampagnen. Funktioniert in Bio, Stories, Videos und E-Mail.",
    h1: "Ein App-Link für Bio, Stories, Videos und Community",
    eyebrow: "Creator und Influencer",
    intro:
      "Creator haben wenig Platz: Bio-Link, Story-Sticker, Videobeschreibung oder Newsletter. Mit einem Smartlink muss niemand zwischen App Store und Google Play wählen.",
    painPoints: [
      "Instagram und TikTok bieten wenig Platz für mehrere Store-Links.",
      "Link-in-Bio-Seiten fügen einen extra Schritt vor dem Download hinzu.",
      "Follower klicken mobil, Desktop und In-App-Browser gemischt.",
      "Influencer-Deals lassen sich ohne eigene Links schwer bewerten.",
      "Lange Store-URLs sehen in Captions unseriös aus.",
      "QR-Codes für Events brauchen einen einzigen verlässlichen Link.",
    ],
    benefits: [
      { title: "Ein Link in der Bio", text: "Kurz, klar und direkt zum passenden Store." },
      { title: "Links pro Creator", text: "Gib jedem Influencer eine eigene URL und vergleiche Klicks." },
      { title: "Funktioniert in In-App-Browsern", text: "Der Link entscheidet serverseitig und führt zum richtigen Ziel." },
      { title: "QR für Events", text: "Nutze denselben Smartlink als QR-Code auf Meetups, Merch oder Slides." },
      { title: "Saubere Kampagnen", text: "Trenne TikTok, Instagram, YouTube, Newsletter und Podcast." },
      { title: "Besser als zwei Buttons", text: "Follower müssen nicht überlegen, welches Handy sie haben." },
    ],
    metrics: [
      { value: "1 Bio", label: "ein App-Link reicht" },
      { value: "∞", label: "Kampagnen-Links möglich" },
      { value: "3 Ziele", label: "iOS, Android, Web" },
    ],
    examples: [
      { title: "Fitness-Creator", text: "Teilt einen Smartlink in TikTok und misst Klicks getrennt von Instagram." },
      { title: "Newsletter-Community", text: "Schickt einen CTA, der mobil zum Store und am Desktop zur Web-App geht." },
      { title: "Podcast", text: "Nutzt eine kurze URL in Shownotes und QR auf Live-Events." },
      { title: "Influencer-Kampagne", text: "Jeder Creator bekommt einen eigenen Link für den Reporting-Vergleich." },
    ],
    tutorial: [
      { title: "Bio-Link erstellen", text: "Wähle einen kurzen Slug, der zu Marke oder Kampagne passt." },
      { title: "In allen Profilen einsetzen", text: "Nutze den Link in Instagram, TikTok, YouTube, X und Newsletter." },
      { title: "Pro Creator duplizieren", text: "Erstelle eigene Smartlinks für Creator, Posts oder Launch-Wellen." },
      { title: "Klicks auswerten", text: "Vergleiche Quellen und Geräte, bevor du Budget erhöhst." },
    ],
  }),

  agencies: {
    slug: "fuer-agenturen",
    label: "Agenturen",
    title: "Smartlinks für Agenturen",
    metaTitle: "Smartlinks für Agenturen - App-Download-Links für Kunden, Kampagnen und QR-Codes",
    metaDescription:
      "Agenturen erstellen einen Smartlink pro Kunde, Kampagne, Standort oder QR-Code und messen Klicks für App Store, Google Play und Web-Fallback.",
    h1: "App-Download-Links für jeden Kunden deiner Agentur",
    eyebrow: "Für Agenturen und Partner",
    intro:
      "Hör auf, Kunden zwei Store-URLs zu schicken. Erstelle pro Kunde, Kanal oder Kampagne einen Smartlink, liefere einen einzigen QR-Code und zeige Klickdaten in einem verständlichen Dashboard.",
    faqs: [
      {
        q: "Kann eine Agentur mehrere Kunden verwalten?",
        a: "Ja. Du kannst für jeden Kunden eigene Smartlinks, Slugs, QR-Codes und Kampagnen anlegen.",
      },
      {
        q: "Kann ich pro Kampagne einen eigenen QR-Code erstellen?",
        a: "Ja. Erstelle separate Links für Retail, Events, Influencer, Paid Social oder Print und miss jeden Kanal getrennt.",
      },
      {
        q: "Kann ich Link My App in Kundenreportings nutzen?",
        a: "Ja. Die Klickdaten nach Gerät, Quelle und Kampagne lassen sich einfach in Reportings übernehmen.",
      },
      {
        q: "Ist Link My App für White-Glove-Launches geeignet?",
        a: "Ja. Du kannst Launch-Links pro Markt, Region oder Kampagnenphase erstellen und später wieder anpassen.",
      },
    ],
  },
};

function buildHowTo({ slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps }) {
  return { slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps };
}

export const germanHowTos = {
  "instagram-share": buildHowTo({
    slug: "app-auf-instagram-teilen",
    label: "App auf Instagram teilen",
    metaTitle: "App auf Instagram teilen - Bio, Stories und Ads mit einem Link",
    metaDescription:
      "So teilst du deine App auf Instagram mit einem Smartlink, der iPhone-Nutzer zum App Store und Android-Nutzer zu Google Play führt.",
    h1: "So teilst du deine App auf Instagram mit einem einzigen Link",
    eyebrow: "Instagram",
    intro:
      "Instagram gibt dir nur wenig Platz. Mit einem Smartlink nutzt du eine kurze URL in Bio, Stories, Reels und Ads, ohne zwei Store-Links zu zeigen.",
    problem:
      "Zwei App-Store-Links in der Bio erzeugen Reibung. Viele Nutzer tippen nicht weiter, wenn sie erst zwischen App Store und Google Play wählen müssen.",
    totalTime: "PT3M",
    steps: [
      { name: "Smartlink erstellen", text: "Füge App Store, Google Play und optional eine Web-Alternative in Link My App ein." },
      { name: "Bio-Link austauschen", text: "Gehe in Instagram auf Profil bearbeiten und setze deine link-my.app-URL als Website." },
      { name: "Stories und Reels nutzen", text: "Nutze denselben Link im Story-Sticker, in Reels-Captions oder in Ads." },
      { name: "Kampagnen trennen", text: "Erstelle für wichtige Posts oder Influencer eigene Links, damit du die Klicks vergleichen kannst." },
      { name: "Ergebnisse prüfen", text: "Sieh im Dashboard, wie viele Klicks von Instagram, iOS, Android oder Desktop kamen." },
    ],
  }),

  "whatsapp-link": buildHowTo({
    slug: "app-download-link-whatsapp",
    label: "App per WhatsApp teilen",
    metaTitle: "App per WhatsApp teilen - ein Download-Link für iPhone und Android",
    metaDescription:
      "Erstelle einen WhatsApp-freundlichen App-Download-Link, der jedes Handy automatisch zum richtigen Store führt.",
    h1: "So teilst du deine App per WhatsApp ohne zwei Store-Links",
    eyebrow: "WhatsApp",
    intro:
      "WhatsApp-Nachrichten müssen kurz sein. Ein Smartlink ersetzt lange App-Store- und Google-Play-URLs durch eine klare Download-URL.",
    problem:
      "Wenn du beide Store-Links in eine WhatsApp-Nachricht setzt, wirkt die Nachricht lang und der Nutzer muss selbst entscheiden.",
    totalTime: "PT2M",
    steps: [
      { name: "Kurzen Slug wählen", text: "Nutze einen lesbaren Slug, damit der Link in Chats vertrauenswürdig wirkt." },
      { name: "Download-Ziele setzen", text: "Füge iOS, Android und Fallback hinzu." },
      { name: "Nachricht kurz halten", text: "Schreibe einen klaren Satz wie: Lade unsere App hier herunter: link-my.app/deine-app." },
      { name: "Broadcasts testen", text: "Teste den Link auf iPhone und Android, bevor du ihn an Gruppen oder Kunden sendest." },
      { name: "Klicks messen", text: "Erstelle bei Bedarf einen eigenen WhatsApp-Link, um den Kanal sauber zu erkennen." },
    ],
  }),

  "redirect-by-device": buildHowTo({
    slug: "app-store-google-play-weiterleitung",
    label: "Nach Gerät weiterleiten",
    metaTitle: "App Store oder Google Play automatisch weiterleiten",
    metaDescription:
      "So leitest du iPhone, Android und Desktop automatisch zum richtigen Ziel weiter, ohne JavaScript-Seite und ohne SDK.",
    h1: "So leitest du Nutzer automatisch zu App Store oder Google Play",
    eyebrow: "Geräteerkennung",
    intro:
      "Ein Smartlink liest technische Gerätesignale und entscheidet serverseitig, ob ein Nutzer App Store, Google Play oder eine Web-Seite sehen soll.",
    problem:
      "Eine normale Store-URL funktioniert nur für eine Plattform. Wer alle Nutzer dorthin schickt, verliert einen Teil der potenziellen Downloads.",
    totalTime: "PT4M",
    steps: [
      { name: "iOS-Ziel eintragen", text: "Kopiere die öffentliche App-Store-URL deiner App." },
      { name: "Android-Ziel eintragen", text: "Kopiere die Google-Play-URL deiner App." },
      { name: "Desktop-Fallback setzen", text: "Nutze Landingpage, Web-App oder Download-Seite für Desktop-Besucher." },
      { name: "Smartlink veröffentlichen", text: "Teile nur noch die kurze link-my.app-URL in Kampagnen, Bio, Ads und QR-Codes." },
      { name: "Weiterleitung prüfen", text: "Teste iPhone, Android und Desktop, bevor du den Link groß ausrollst." },
    ],
  }),

  "download-button-website": buildHowTo({
    slug: "app-download-button-website",
    label: "Download-Button auf Website",
    metaTitle: "App-Download-Button für Website - ein Button für App Store und Google Play",
    metaDescription:
      "Ersetze zwei Store-Badges durch einen App-Download-Button, der jedes Gerät zur richtigen Plattform führt.",
    h1: "So baust du einen App-Download-Button mit nur einem Link",
    eyebrow: "Website",
    intro:
      "Auf mobilen Landingpages ist Platz knapp. Ein einziger Button ist oft klarer als zwei Store-Badges nebeneinander.",
    problem:
      "Zwei Buttons nehmen Platz weg, werden auf kleinen Screens gequetscht und zwingen Besucher zur Auswahl.",
    totalTime: "PT5M",
    steps: [
      { name: "Smartlink erstellen", text: "Lege iOS, Android und Web-Fallback in Link My App an." },
      { name: "Button-Text wählen", text: "Nutze klare Texte wie App herunterladen oder Jetzt App laden." },
      { name: "Button verlinken", text: "Setze die link-my.app-URL als Ziel deines Buttons." },
      { name: "Mobile Darstellung prüfen", text: "Teste, ob der Button auf kleinen Screens sichtbar bleibt und nicht umbricht." },
      { name: "Kampagnen unterscheiden", text: "Wenn die Website mehrere Seiten hat, erstelle je Seite eigene Links für bessere Statistik." },
    ],
  }),

  "qr-physical-campaigns": buildHowTo({
    slug: "qr-code-app-download",
    label: "QR-Code für App-Downloads",
    metaTitle: "QR-Code für App-Download erstellen - ein QR für iPhone und Android",
    metaDescription:
      "Erstelle einen QR-Code, der iPhone-Nutzer zum App Store, Android-Nutzer zu Google Play und Desktop zur Webseite führt.",
    h1: "So erstellst du einen QR-Code für App-Downloads",
    eyebrow: "QR-Code",
    intro:
      "Ein App-QR-Code sollte nicht nur auf einen Store zeigen. Mit Link My App wird ein QR-Code zu einem Smartlink für alle Geräte.",
    problem:
      "Ein QR-Code mit nur einer Store-URL schliesst entweder iOS- oder Android-Nutzer aus. Zwei QR-Codes sehen unruhig aus und werden seltener gescannt.",
    totalTime: "PT6M",
    steps: [
      { name: "Smartlink anlegen", text: "Trage App Store, Google Play und Fallback ein." },
      { name: "QR-Code herunterladen", text: "Nutze den automatisch erzeugten QR-Code für Print, Packaging oder Events." },
      { name: "Call-to-Action kurz halten", text: "Schreibe zum Beispiel: Scannen und App herunterladen." },
      { name: "Druckgröße testen", text: "Teste den QR-Code aus realistischer Entfernung mit iPhone und Android." },
      { name: "Pro Fläche messen", text: "Erstelle getrennte QR-Codes für Verpackung, Flyer, Storefront und Events." },
    ],
  }),
};

export const germanLegalPages = {
  privacy: {
    path: "/datenschutz",
    title: "Datenschutzerklärung",
    shortTitle: "Datenschutz",
    intro:
      "Diese Datenschutzerklärung erklärt, wie David Trotonda personenbezogene Daten verarbeitet, wenn du Link My App nutzt, um Smartlinks, QR-Codes und Klickstatistiken für Apps zu erstellen.",
    sections: [
      {
        title: "Verantwortlicher",
        paragraphs: [
          "Verantwortlich für die Verarbeitung ist David Trotonda.",
          "Kontakt: info@skeilapps.com.",
          "Dienst: Link My App, erreichbar unter link-my.app.",
        ],
      },
      {
        title: "Welche Daten wir verarbeiten",
        paragraphs: [
          "Kontodaten wie Name, E-Mail-Adresse, Nutzer-ID und Profilbild, wenn du dich mit Google anmeldest.",
          "Smartlink-Daten wie App-Name, App-Store-URL, Google-Play-URL, Fallback-URL, Slug, Status und zugehöriger QR-Code.",
          "Nutzungs- und Analysedaten wie Klicks, Zeitpunkt, gewähltes Ziel, Quelle, ungefähres Gerät, Browser, Betriebssystem und technische Signale für Sicherheit und Missbrauchsschutz.",
        ],
      },
      {
        title: "Zwecke der Verarbeitung",
        paragraphs: [
          "Erstellung und Verwaltung deines Kontos.",
          "Speicherung deiner Smartlinks und Weiterleitung von Besuchern zum richtigen Ziel.",
          "Erstellung von QR-Codes und Anzeige von Klickstatistiken im Dashboard.",
          "Schutz vor Missbrauch, betrügerischen Links, unbefugten Zugriffen und technischen Problemen.",
        ],
      },
      {
        title: "Rechtsgrundlagen",
        paragraphs: [
          "Vertragserfüllung oder vorvertragliche Massnahmen, wenn du ein Konto erstellst oder Smartlinks nutzt.",
          "Einwilligung, wenn du uns kontaktierst oder optionale Dienste aktivierst.",
          "Berechtigtes Interesse, um Sicherheit, Stabilität und Verbesserung des Dienstes zu gewährleisten.",
          "Erfüllung gesetzlicher Pflichten, soweit dies für Buchhaltung, Steuern oder Datenschutzrechte erforderlich ist.",
        ],
      },
      {
        title: "Dienstleister",
        paragraphs: [
          "Wir nutzen technische Anbieter wie Firebase und Google Cloud für Hosting, Authentifizierung, Datenbank und Sicherheitsfunktionen.",
          "Einige Anbieter können Daten außerhalb des Europäischen Wirtschaftsraums verarbeiten. In diesem Fall verwenden wir geeignete Garantien wie Standardvertragsklauseln oder Angemessenheitsbeschlüsse.",
        ],
      },
      {
        title: "Speicherdauer und Rechte",
        paragraphs: [
          "Kontodaten speichern wir, solange dein Konto aktiv ist oder gesetzliche Pflichten bestehen.",
          "Du kannst Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit verlangen, indem du uns kontaktierst.",
          "Wenn du der Meinung bist, dass deine Daten nicht korrekt verarbeitet werden, kannst du dich an eine Datenschutzaufsichtsbehörde wenden.",
        ],
      },
    ],
  },

  cookies: {
    path: "/cookies",
    title: "Cookie-Richtlinie",
    shortTitle: "Cookies",
    intro:
      "Diese Cookie-Richtlinie erklärt, welche Technologien Link My App für Anmeldung, Sicherheit, Präferenzen und Messung einsetzen kann.",
    sections: [
      {
        title: "Was Cookies sind",
        paragraphs: [
          "Cookies und ähnliche Technologien wie LocalStorage helfen einer Website, Informationen im Browser zu speichern.",
          "Einige Technologien sind notwendig, damit Anmeldung, Sicherheit und Grundfunktionen funktionieren.",
        ],
      },
      {
        title: "Notwendige Technologien",
        paragraphs: [
          "Wir können notwendige Technologien verwenden, um Nutzer zu authentifizieren, Sitzungen zu sichern, Missbrauch zu verhindern und Einstellungen zu speichern.",
          "Diese Technologien sind für den angeforderten Dienst erforderlich und benötigen in der Regel keine vorherige Einwilligung.",
        ],
      },
      {
        title: "Analyse und Messung",
        paragraphs: [
          "Link My App misst Klicks auf Smartlinks, Gerätetypen, Quellen und QR-Nutzung im Dashboard.",
          "Optionale Webanalyse-Tools werden nur eingesetzt, wenn die rechtlichen Voraussetzungen und erforderlichen Einwilligungen vorliegen.",
        ],
      },
      {
        title: "Verwaltung",
        paragraphs: [
          "Du kannst Cookies und lokale Daten in deinem Browser blockieren oder löschen.",
          "Das Löschen notwendiger Daten kann dazu führen, dass du ausgeloggt wirst oder Funktionen nicht korrekt arbeiten.",
        ],
      },
    ],
  },

  terms: {
    path: "/agb",
    title: "Allgemeine Geschäftsbedingungen",
    shortTitle: "AGB",
    intro:
      "Diese Bedingungen regeln die Nutzung von Link My App, einem Dienst zur Erstellung von App-Smartlinks, QR-Codes und Klickstatistiken.",
    sections: [
      {
        title: "Dienstbeschreibung",
        paragraphs: [
          "Link My App ermöglicht es dir, einen Smartlink für App Store, Google Play und eine alternative URL zu erstellen.",
          "Der Dienst kann QR-Codes und Klickstatistiken für deine Links bereitstellen.",
        ],
      },
      {
        title: "Nutzung des Dienstes",
        paragraphs: [
          "Du bist verantwortlich für die Richtigkeit der eingetragenen URLs und dafür, dass du berechtigt bist, sie zu verwenden.",
          "Du darfst Link My App nicht für rechtswidrige, betrügerische, irreführende oder missbräuchliche Inhalte verwenden.",
          "Wir können Links entfernen oder deaktivieren, wenn sie gegen Rechte Dritter, Gesetze oder Sicherheitsregeln verstossen.",
        ],
      },
      {
        title: "Verfügbarkeit",
        paragraphs: [
          "Wir bemühen uns um einen stabilen Dienst, können jedoch keine unterbrechungsfreie Verfügbarkeit garantieren.",
          "Wartung, technische Störungen, externe Anbieter oder höherer Gewalt können den Dienst beeinflussen.",
        ],
      },
      {
        title: "Haftung",
        paragraphs: [
          "Link My App ersetzt keine eigene rechtliche, technische oder marketingbezogene Prüfung deiner Kampagnen.",
          "Soweit gesetzlich zulässig, haften wir nicht für indirekte Schäden, entgangene Gewinne oder Folgen falsch eingetragener Ziel-URLs.",
        ],
      },
      {
        title: "Änderungen",
        paragraphs: [
          "Wir können diese Bedingungen anpassen, wenn sich Dienst, Rechtslage oder technische Anforderungen ändern.",
          "Bei wesentlichen Änderungen informieren wir in angemessener Weise.",
        ],
      },
    ],
  },
};
