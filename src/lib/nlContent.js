const sharedSmartLinkFaqs = [
  {
    q: "Kan ik App Store, Google Play en een website in een link combineren?",
    a: "Ja. Link My App detecteert het apparaat en stuurt iPhone naar App Store, Android naar Google Play en desktop naar de fallback-URL die jij instelt.",
  },
  {
    q: "Kan ik de bestemming later wijzigen?",
    a: "Ja. De korte URL en QR-code blijven hetzelfde. Je kunt App Store, Google Play of fallback in het dashboard aanpassen wanneer je wilt.",
  },
  {
    q: "Kan ik zien waar klikken vandaan komen?",
    a: "Ja. Het dashboard toont klikken per apparaat, bron, campagne en QR-code, zodat je ziet welke kanalen downloads opleveren.",
  },
  {
    q: "Moet ik een SDK in mijn app installeren?",
    a: "Nee. Voor de app-downloadlink heb je geen SDK of app-wijziging nodig. Link My App werkt voor de installatie, op de link en op de QR.",
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
        title: "Zonder smartlink",
        rows: [
          "Twee store-knoppen concurreren om aandacht.",
          "Gebruikers klikken op de verkeerde store of haken af.",
          "QR-codes en campagnes zijn moeilijk te meten.",
          "Elk kanaal heeft handmatige uitleg nodig.",
        ],
      },
      after: {
        title: "Met Link My App",
        rows: [
          "Een link stuurt elk apparaat naar de juiste bestemming.",
          "Een QR-code werkt voor iPhone, Android en desktop.",
          "Klikken zijn gescheiden per bron, apparaat en campagne.",
          "Je kunt bestemmingen wijzigen zonder link of QR te vervangen.",
        ],
      },
    },
    realExamples: examples,
    tutorial,
    faqs: sharedSmartLinkFaqs,
  };
}

export const dutchUseCases = {
  ecommerce: buildUseCase({
    slug: "ecommerce-app-downloadlink",
    label: "E-commerce",
    title: "Downloadlink voor e-commerce apps",
    metaTitle: "E-commerce app-downloadlink - een QR-code voor App Store en Google Play",
    metaDescription:
      "Maak een smartlink en QR-code voor de app van je webshop. iPhone, Android en desktop gaan automatisch naar de juiste bestemming.",
    h1: "Een link om meer downloads van je shop-app te krijgen",
    eyebrow: "E-commerce apps",
    intro:
      "Wanneer klanten je app moeten downloaden via verpakking, nieuwsbrief, Instagram of winkel, is een enkele downloadlink duidelijker dan twee store-knoppen.",
    painPoints: [
      "Verpakkingen met twee store-badges worden visueel rommelig.",
      "Klanten klikken op de verkeerde store en stoppen voor de download.",
      "Nieuwsbrieven met twee CTA's verliezen klikken omdat mensen moeten kiezen.",
      "Influencer-campagnes zijn moeilijk te vergelijken als iedereen dezelfde store-URL's deelt.",
      "QR-codes op bonnen of dozen kunnen niet naar slechts een store wijzen.",
      "Betaalde advertenties verspillen budget wanneer mensen naar de verkeerde store gaan.",
    ],
    benefits: [
      { title: "Een CTA voor elk kanaal", text: "Gebruik dezelfde korte URL in e-mail, ads, Instagram bio, verpakking, bonnen en website." },
      { title: "QR-code voor verpakking en winkel", text: "Een QR-code dekt iPhone, Android en desktop." },
      { title: "Meetbare campagnes", text: "Maak een smartlink per kanaal of influencer en vergelijk klikken." },
      { title: "Minder frictie bij aankoop", text: "Klanten komen direct in de juiste store zonder extra keuze." },
      { title: "Aanpasbare bestemmingen", text: "Wijzig store-URL's zonder verpakkingen, flyers of QR-codes opnieuw te drukken." },
      { title: "Perfect voor retentie", text: "Breng bestaande klanten vanuit e-mail, packaging en social terug naar je app." },
    ],
    metrics: [
      { value: "1 QR", label: "voor verpakking en winkel" },
      { value: "100%", label: "iOS, Android en desktop gedekt" },
      { value: "+18%", label: "minder frictie dan twee knoppen" },
    ],
    examples: [
      { title: "Modewinkel", text: "Drukt een QR op kledinglabels zodat klanten de app direct tijdens aankoop downloaden." },
      { title: "Beauty marketplace", text: "Vervangt twee knoppen in de nieuwsbrief door een smartlink en meet elke campagne." },
      { title: "Koffiemerk", text: "Gebruikt een QR op bekers en bonnen om de loyalty-app te promoten." },
      { title: "D2C-merk", text: "Voegt een QR-kaart toe aan elke bestelling, werkend voor elk apparaat." },
    ],
    tutorial: [
      { title: "Store-links invoeren", text: "Voeg App Store, Google Play en een webalternatief toe voor desktopbezoekers." },
      { title: "Korte slug kiezen", text: "Gebruik een URL zoals link-my.app/jouw-merk zodat hij netjes staat op verpakking en ads." },
      { title: "QR-code downloaden", text: "Plaats de QR op verpakking, bon, winkelruit of insert." },
      { title: "Kanalen vergelijken", text: "Maak aparte links voor nieuwsbrief, influencers of paid ads." },
    ],
  }),

  saas: buildUseCase({
    slug: "saas-app-downloadlink",
    label: "SaaS",
    title: "Downloadlink voor SaaS- en B2B-apps",
    metaTitle: "SaaS app-downloadlink - smartlink voor App Store, Google Play en webapp",
    metaDescription:
      "Stuur SaaS-gebruikers vanuit onboarding, e-mail, help center en sales direct naar de juiste mobiele app of webapp.",
    h1: "Een smartlink voor je SaaS-app, webapp en onboardingmails",
    eyebrow: "SaaS en B2B",
    intro:
      "SaaS-teams hebben vaak tegelijk een webapp, iOS en Android. Met Link My App deel je een enkele link in onboarding, sales, support en ads.",
    painPoints: [
      "Onboardingmails bevatten te veel links en verwarren nieuwe gebruikers.",
      "Sales-teams sturen verschillende URL's naar klanten.",
      "Desktop heeft de webapp nodig, mobiel de juiste store.",
      "Help-artikelen raken verouderd wanneer URL's wijzigen.",
      "B2B-campagnes zijn lastig te meten zonder eigen links per kanaal.",
      "Launchcommunicatie wordt zwaar als elke platform apart wordt uitgelegd.",
    ],
    benefits: [
      { title: "Een link in onboarding", text: "Stuur elke gebruiker naar de juiste app of webapp zonder platform te vragen." },
      { title: "Schone salesmaterialen", text: "Een korte link past in decks, PDF's, demo's en e-mailhandtekeningen." },
      { title: "Minder support", text: "Customer success hoeft niet te vragen of iemand iOS of Android gebruikt." },
      { title: "Campagnes per segment", text: "Maak links per branche, account, regio of launch-wave." },
      { title: "Geen SDK", text: "Werkt direct voor routing voor installatie en QR-codes." },
      { title: "Fallback naar webapp", text: "Desktop gaat naar login, landing of productpagina." },
    ],
    metrics: [
      { value: "3 bestemmingen", label: "iOS, Android en webapp" },
      { value: "0 SDK", label: "voor de downloadlink" },
      { value: "1 URL", label: "voor sales, support en marketing" },
    ],
    examples: [
      { title: "B2B SaaS", text: "Voegt een smartlink toe aan onboardingmails zodat nieuwe gebruikers de app installeren." },
      { title: "Field service tool", text: "Drukt een QR-code op trainingsmateriaal voor technici." },
      { title: "HR-software", text: "Maakt links per enterprise-klant om rollouts te meten." },
      { title: "Productiviteitsapp", text: "Desktop gaat naar de webapp en mobiel naar de juiste store." },
    ],
    tutorial: [
      { title: "Web fallback bepalen", text: "Gebruik login, productpagina of help center als bestemming voor desktop." },
      { title: "Masterlink maken", text: "Maak een algemene downloadlink voor onboarding en support." },
      { title: "Dupliceren per campagne", text: "Gebruik eigen links voor ads, sales, webinars en rollouts." },
      { title: "Metrics analyseren", text: "Vergelijk klikken per bron en apparaat in het dashboard." },
    ],
  }),

  restaurants: buildUseCase({
    slug: "restaurant-app-qr-code",
    label: "Restaurants",
    title: "QR-code en downloadlink voor restaurant-apps",
    metaTitle: "QR-code voor restaurant-app - een link voor App Store en Google Play",
    metaDescription:
      "Een QR-code op tafel, rekening, flyer of winkelruit die elke klant naar de juiste restaurant-app store stuurt.",
    h1: "Een QR-code waarmee klanten je restaurant-app downloaden",
    eyebrow: "Restaurants en hospitality",
    intro:
      "In restaurants telt het moment: tafel, rekening, takeaway-zone of winkelruit. Een QR-code stuurt iPhone- en Android-klanten direct naar de juiste store.",
    painPoints: [
      "Klanten weten niet welke store ze moeten openen.",
      "Personeel moet app-downloads steeds opnieuw uitleggen.",
      "Flyers met twee QR-codes zien er verwarrend uit.",
      "Loyalty-programma's verliezen gebruikers voor installatie.",
      "Acties in de zaak zijn moeilijk te meten zonder QR-tracking.",
      "Desktop moet naar menu, reserveringen of website gaan.",
    ],
    benefits: [
      { title: "Een QR op elke tafel", text: "Klanten scannen en komen automatisch in de juiste store." },
      { title: "Meer loyalty-downloads", text: "Verkort de weg tussen rekening en installatie." },
      { title: "Duidelijke offline meting", text: "Vergelijk tafel, flyer, winkelruit en events." },
      { title: "Ideaal voor meerdere locaties", text: "Maak links per vestiging of campagne." },
      { title: "Fallback naar menu", text: "Desktop of onbekende apparaten kunnen naar het webmenu." },
      { title: "Geen technische setup", text: "Je hebt alleen store-URL's nodig en kunt de QR drukken." },
    ],
    metrics: [
      { value: "1 scan", label: "naar de juiste store" },
      { value: "4 plekken", label: "tafel, bon, flyer, raam" },
      { value: "24/7", label: "link altijd actief" },
    ],
    examples: [
      { title: "Burgerketen", text: "Meet scans per locatie en promoot de loyalty-app aan de balie." },
      { title: "Premium restaurant", text: "Plaats een subtiele QR op de rekening voor reserveringen en app-download." },
      { title: "Delivery-merk", text: "Drukt de smart QR op verpakkingen en promokaarten." },
      { title: "Lokaal cafe", text: "Stuurt klanten naar de punten-app zonder twee badges op tafel." },
    ],
    tutorial: [
      { title: "Appbestemmingen toevoegen", text: "Stel App Store, Google Play en website of menu als fallback in." },
      { title: "QR downloaden voor drukwerk", text: "Exporteer en test de QR met iPhone en Android." },
      { title: "Dupliceren per locatie", text: "Maak eigen links voor vestigingen, events of seizoenscampagnes." },
      { title: "Scans volgen", text: "Bekijk in het dashboard welke plaatsing de meeste klikken oplevert." },
    ],
  }),

  fitness: buildUseCase({
    slug: "fitness-app-downloadlink",
    label: "Fitness",
    title: "Downloadlink voor sportscholen en wellness-apps",
    metaTitle: "Fitness app-downloadlink - QR-code voor sportscholen, lessen en leden",
    metaDescription:
      "Een smartlink voor je fitness-app: iPhone naar App Store, Android naar Google Play en desktop naar website of boeking.",
    h1: "Een link waarmee leden je fitness-app installeren",
    eyebrow: "Fitness en wellness",
    intro:
      "Sportscholen, yogastudio's en coaching-apps hebben een eenvoudige downloadroute nodig op posters, roosters, spiegels, e-mails en social.",
    painPoints: [
      "Leden zoeken de verkeerde appnaam in de store.",
      "Roosters met twee QR-codes of badges worden druk.",
      "Proeflessen leiden geïnteresseerden niet duidelijk naar de app.",
      "Trainers delen verschillende links in WhatsApp-groepen.",
      "Offline materiaal laat niet zien welke plek downloads oplevert.",
      "Desktop moet naar boeking gaan, niet naar een store.",
    ],
    benefits: [
      { title: "QR-code in de gym", text: "Een code op spiegel, receptie, rooster of flyer stuurt elke telefoon naar de juiste store." },
      { title: "WhatsApp en community", text: "Trainers kunnen een korte link delen in groepen." },
      { title: "Campagnes per les", text: "Meet of yoga, HIIT, PT of nieuwsbrief meer klikken oplevert." },
      { title: "Fallback voor boekingen", text: "Desktop gaat naar website, agenda of ledenomgeving." },
      { title: "Minder support", text: "Niemand hoeft uit te leggen welke store bij welke telefoon hoort." },
      { title: "Snel bijwerken", text: "Wijzig bestemmingen zonder drukwerk opnieuw te ontwerpen." },
    ],
    metrics: [
      { value: "1 link", label: "voor leden en leads" },
      { value: "0 twijfel", label: "over de juiste store" },
      { value: "Alle", label: "kanalen meetbaar" },
    ],
    examples: [
      { title: "Boutique studio", text: "Zet een smart QR bij de receptie voor boekingen via de app." },
      { title: "Gymketen", text: "Maakt links per locatie en vergelijkt vraag naar downloads." },
      { title: "Yoga-instructeur", text: "Deelt een korte link op Instagram en WhatsApp." },
      { title: "Wellness-app", text: "Gebruikt een link voor QR-flyers en paid social." },
    ],
    tutorial: [
      { title: "Fallback voor boekingen instellen", text: "Desktop moet naar rooster, website of ledenomgeving." },
      { title: "QR testen", text: "Test met iPhone en Android voordat je drukt." },
      { title: "Per plek meten", text: "Gebruik verschillende links voor receptie, zaal, e-mail en social." },
      { title: "Regelmatig optimaliseren", text: "Vergelijk klikken en verplaats QR-codes naar betere plekken." },
    ],
  }),

  creators: buildUseCase({
    slug: "creator-app-downloadlink",
    label: "Creators",
    title: "Downloadlink voor creators, influencers en communities",
    metaTitle: "Creator app-downloadlink - een link voor Instagram, TikTok en YouTube",
    metaDescription:
      "Een korte smartlink voor creator-apps, communities en influencer-campagnes. Werkt in bio, stories, video's en e-mail.",
    h1: "Een app-link voor bio, stories, video's en community",
    eyebrow: "Creators en influencers",
    intro:
      "Creators hebben weinig ruimte: bio-link, story-sticker, videobeschrijving of nieuwsbrief. Met een smartlink hoeft niemand tussen App Store en Google Play te kiezen.",
    painPoints: [
      "Instagram en TikTok hebben weinig ruimte voor meerdere store-links.",
      "Link-in-bio pagina's voegen een extra stap toe voor download.",
      "Volgers klikken via mobiel, desktop en in-app browsers.",
      "Influencer-partnerships zijn moeilijk te evalueren zonder eigen links.",
      "Lange store-URL's zien er onprofessioneel uit in captions.",
      "QR-codes voor events hebben een betrouwbare enkele link nodig.",
    ],
    benefits: [
      { title: "Een link in bio", text: "Kort, duidelijk en direct naar de juiste store." },
      { title: "Links per creator", text: "Geef elke influencer een eigen URL en vergelijk klikken." },
      { title: "Werkt in in-app browsers", text: "De link beslist server-side en stuurt naar de juiste bestemming." },
      { title: "QR voor events", text: "Gebruik dezelfde smartlink als QR op meetups, merch of slides." },
      { title: "Schone campagnes", text: "Scheid TikTok, Instagram, YouTube, nieuwsbrief en podcast." },
      { title: "Beter dan twee knoppen", text: "Volgers hoeven niet na te denken welke telefoon ze hebben." },
    ],
    metrics: [
      { value: "1 bio", label: "een app-link is genoeg" },
      { value: "∞", label: "campagnelinks" },
      { value: "3 bestemmingen", label: "iOS, Android, web" },
    ],
    examples: [
      { title: "Fitness creator", text: "Deelt een smartlink op TikTok en meet klikken apart van Instagram." },
      { title: "Newsletter community", text: "Stuurt een CTA die mobiel naar de store en desktop naar de webapp gaat." },
      { title: "Podcast", text: "Gebruikt een korte URL in shownotes en QR op live events." },
      { title: "Influencer-campagne", text: "Elke creator krijgt een eigen link voor vergelijking in het rapport." },
    ],
    tutorial: [
      { title: "Bio-link maken", text: "Kies een korte slug rond merk of campagne." },
      { title: "Op alle profielen gebruiken", text: "Plaats de link op Instagram, TikTok, YouTube, X en nieuwsbrief." },
      { title: "Dupliceren per creator", text: "Maak smartlinks per creator, post of launchfase." },
      { title: "Klikken analyseren", text: "Vergelijk bronnen en apparaten voordat je budget verhoogt." },
    ],
  }),

  agencies: {
    slug: "voor-agencies",
    label: "Agencies",
    title: "Smartlinks voor agencies",
    metaTitle: "Smartlinks voor agencies - downloadlinks voor klanten, campagnes en QR-codes",
    metaDescription:
      "Agencies maken een smartlink per klant, campagne, locatie of QR-code en meten klikken naar App Store, Google Play en web fallback.",
    h1: "Downloadlinks voor elke klant van je agency",
    eyebrow: "Voor agencies en partners",
    intro:
      "Stop met twee store-URL's naar elke klant sturen. Maak een smartlink per klant, kanaal of campagne, lever een QR-code en toon duidelijke klikdata in een dashboard.",
    faqs: [
      { q: "Kan een agency meerdere klanten beheren?", a: "Ja. Je kunt smartlinks, slugs, QR-codes en campagnes per klant maken." },
      { q: "Kan ik een QR per campagne maken?", a: "Ja. Maak aparte links voor retail, events, influencers, paid social of print en meet elk kanaal." },
      { q: "Kan ik Link My App gebruiken in klantrapporten?", a: "Ja. Klikdata per apparaat, bron en campagne zijn makkelijk mee te nemen in rapporten." },
      { q: "Werkt het voor white-glove launches?", a: "Ja. Maak links per markt, regio of campagnefase en pas ze later aan." },
    ],
  },
};

function buildHowTo({ slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps }) {
  return { slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps };
}

export const dutchHowTos = {
  "instagram-share": buildHowTo({
    slug: "app-delen-instagram",
    label: "App delen op Instagram",
    metaTitle: "App delen op Instagram - bio, stories en ads met een link",
    metaDescription:
      "Hoe je je app op Instagram deelt met een smartlink die iPhone naar App Store en Android naar Google Play stuurt.",
    h1: "Hoe je je app op Instagram deelt met een link",
    eyebrow: "Instagram",
    intro:
      "Instagram geeft weinig ruimte. Met een smartlink gebruik je een korte URL in bio, stories, reels en advertenties zonder twee store-links te tonen.",
    problem:
      "Twee store-links in je bio zorgen voor frictie. Veel gebruikers haken af wanneer ze tussen App Store en Google Play moeten kiezen.",
    totalTime: "PT3M",
    steps: [
      { name: "Smartlink maken", text: "Voeg App Store, Google Play en eventueel een webalternatief toe in Link My App." },
      { name: "Bio-link vervangen", text: "Ga naar Profiel bewerken in Instagram en zet je link-my.app URL als website." },
      { name: "Gebruiken in stories en reels", text: "Gebruik dezelfde link in story-sticker, reels caption of advertenties." },
      { name: "Campagnes scheiden", text: "Maak eigen links voor belangrijke posts of influencers om klikken te vergelijken." },
      { name: "Resultaten bekijken", text: "In het dashboard zie je klikken vanuit Instagram, iOS, Android of desktop." },
    ],
  }),

  "whatsapp-link": buildHowTo({
    slug: "app-downloadlink-whatsapp",
    label: "App delen via WhatsApp",
    metaTitle: "App delen via WhatsApp - een link voor iPhone en Android",
    metaDescription:
      "Maak een app-downloadlink voor WhatsApp die elke telefoon automatisch naar de juiste store stuurt.",
    h1: "Hoe je je app via WhatsApp deelt zonder twee store-links",
    eyebrow: "WhatsApp",
    intro:
      "WhatsApp-berichten moeten kort zijn. Een smartlink vervangt lange App Store- en Google Play-URL's door een duidelijke link.",
    problem:
      "Wanneer je beide links in een bericht zet, wordt het lang en moet de gebruiker zelf kiezen.",
    totalTime: "PT2M",
    steps: [
      { name: "Korte slug kiezen", text: "Gebruik een leesbare slug zodat de link betrouwbaar oogt in chats." },
      { name: "Bestemmingen instellen", text: "Voeg iOS, Android en fallback toe." },
      { name: "Bericht kort houden", text: "Schrijf iets directs: Download onze app hier: link-my.app/jouw-app." },
      { name: "Broadcasts testen", text: "Test de link op iPhone en Android voordat je hem naar groepen of klanten stuurt." },
      { name: "Klikken meten", text: "Maak een eigen WhatsApp-link als je het kanaal apart wilt meten." },
    ],
  }),

  "redirect-by-device": buildHowTo({
    slug: "app-store-google-play-doorsturen",
    label: "Doorsturen per apparaat",
    metaTitle: "Automatisch doorsturen naar App Store of Google Play",
    metaDescription:
      "Hoe je iPhone, Android en desktop automatisch naar de juiste bestemming stuurt zonder JavaScript-landingspagina en zonder SDK.",
    h1: "Hoe je gebruikers automatisch naar App Store of Google Play stuurt",
    eyebrow: "Apparaatdetectie",
    intro:
      "Een smartlink leest technische signalen van het apparaat en beslist server-side of iemand App Store, Google Play of een webpagina moet zien.",
    problem:
      "Een normale store-URL werkt maar voor een platform. Als je al het verkeer daarheen stuurt, verlies je een deel van de downloads.",
    totalTime: "PT4M",
    steps: [
      { name: "iOS-bestemming toevoegen", text: "Kopieer de publieke App Store-URL van je app." },
      { name: "Android-bestemming toevoegen", text: "Kopieer de Google Play-URL." },
      { name: "Desktop fallback instellen", text: "Gebruik een landingpage, webapp of downloadpagina voor desktopbezoekers." },
      { name: "Smartlink publiceren", text: "Deel alleen de korte link-my.app URL in campagnes, bio, ads en QR-codes." },
      { name: "Doorsturen testen", text: "Test iPhone, Android en desktop voordat je groots lanceert." },
    ],
  }),

  "download-button-website": buildHowTo({
    slug: "app-downloadknop-website",
    label: "Downloadknop op website",
    metaTitle: "App-downloadknop voor website - een knop voor App Store en Google Play",
    metaDescription:
      "Vervang twee store-badges door een downloadknop die elk apparaat naar het juiste platform stuurt.",
    h1: "Hoe je een app-downloadknop maakt met een link",
    eyebrow: "Website",
    intro:
      "Op mobiele landingspagina's is ruimte schaars. Een enkele knop is vaak duidelijker dan twee badges naast elkaar.",
    problem:
      "Twee knoppen nemen ruimte in, breken op kleine schermen en verplichten bezoekers om te kiezen.",
    totalTime: "PT5M",
    steps: [
      { name: "Smartlink maken", text: "Stel iOS, Android en web fallback in via Link My App." },
      { name: "Knoptekst kiezen", text: "Gebruik duidelijke teksten zoals Download app of Nu installeren." },
      { name: "Knop linken", text: "Zet de link-my.app URL als bestemming van de knop." },
      { name: "Op mobiel testen", text: "Controleer of de knop zichtbaar blijft en netjes past op kleine schermen." },
      { name: "Campagnes onderscheiden", text: "Als je website meerdere pagina's heeft, maak links per pagina voor betere statistiek." },
    ],
  }),

  "qr-physical-campaigns": buildHowTo({
    slug: "qr-code-app-download",
    label: "QR-code voor app-downloads",
    metaTitle: "QR-code maken voor app-download - een QR voor iPhone en Android",
    metaDescription:
      "Maak een QR-code die iPhone naar App Store, Android naar Google Play en desktop naar je website stuurt.",
    h1: "Hoe je een QR-code maakt voor app-downloads",
    eyebrow: "QR-code",
    intro:
      "Een app-QR mag niet naar slechts een store wijzen. Met Link My App wordt een QR een smartlink voor alle apparaten.",
    problem:
      "Een QR-code met een enkele store-URL sluit iOS of Android uit. Twee QR-codes zijn verwarrend en worden minder gescand.",
    totalTime: "PT6M",
    steps: [
      { name: "Smartlink maken", text: "Voeg App Store, Google Play en fallback toe." },
      { name: "QR downloaden", text: "Gebruik de gegenereerde QR-code voor print, verpakking of events." },
      { name: "CTA kort houden", text: "Schrijf iets als: Scan en download de app." },
      { name: "Drukformaat testen", text: "Test de QR op realistische afstand met iPhone en Android." },
      { name: "Per plek meten", text: "Maak aparte QR-codes voor verpakking, flyer, winkelruit en events." },
    ],
  }),
};

export const dutchLegalPages = {
  privacy: {
    path: "/privacy",
    title: "Privacybeleid",
    shortTitle: "Privacy",
    intro:
      "Dit privacybeleid legt uit hoe David Trotonda persoonsgegevens verwerkt wanneer je Link My App gebruikt om smartlinks, QR-codes en klikstatistieken voor apps te maken.",
    sections: [
      {
        title: "Verwerkingsverantwoordelijke",
        paragraphs: [
          "De verwerkingsverantwoordelijke is David Trotonda.",
          "Contact: info@skeilapps.com.",
          "Dienst: Link My App, beschikbaar op link-my.app.",
        ],
      },
      {
        title: "Gegevens die we verwerken",
        paragraphs: [
          "Accountgegevens zoals naam, e-mail, gebruikers-ID en profielfoto wanneer je met Google inlogt.",
          "Smartlinkgegevens zoals appnaam, App Store-URL, Google Play-URL, fallback-URL, slug, status en gekoppelde QR-code.",
          "Gebruiks- en analyticsgegevens zoals klikken, datum en tijd, gekozen bestemming, bron, geschat apparaat, browser, besturingssysteem en technische signalen voor beveiliging en misbruikpreventie.",
        ],
      },
      {
        title: "Doeleinden",
        paragraphs: [
          "Je account maken en beheren.",
          "Smartlinks opslaan en bezoekers naar de ingestelde bestemming doorsturen.",
          "QR-codes maken en klikstatistieken in het dashboard tonen.",
          "De dienst beschermen tegen misbruik, frauduleuze links, onbevoegde toegang en technische problemen.",
        ],
      },
      {
        title: "Rechtsgronden",
        paragraphs: [
          "Uitvoering van een overeenkomst of precontractuele maatregelen wanneer je een account maakt of smartlinks gebruikt.",
          "Toestemming wanneer je contact opneemt of optionele diensten activeert.",
          "Gerechtvaardigd belang om veiligheid, stabiliteit en verbetering van de dienst te waarborgen.",
          "Naleving van wettelijke verplichtingen wanneer nodig voor boekhouding, belastingen of privacyrechten.",
        ],
      },
      {
        title: "Dienstverleners",
        paragraphs: [
          "We gebruiken technische leveranciers zoals Firebase en Google Cloud voor hosting, authenticatie, database en beveiliging.",
          "Sommige leveranciers kunnen gegevens buiten de Europese Economische Ruimte verwerken. In die gevallen gebruiken we passende waarborgen zoals standaardcontractbepalingen of adequaatheidsbesluiten.",
        ],
      },
      {
        title: "Bewaring en rechten",
        paragraphs: [
          "We bewaren accountgegevens zolang het account actief is of zolang wettelijke verplichtingen bestaan.",
          "Je kunt toegang, rectificatie, verwijdering, beperking, bezwaar en overdraagbaarheid aanvragen door contact op te nemen.",
          "Als je denkt dat je gegevens niet correct worden verwerkt, kun je contact opnemen met een toezichthoudende autoriteit.",
        ],
      },
    ],
  },

  cookies: {
    path: "/cookies",
    title: "Cookiebeleid",
    shortTitle: "Cookies",
    intro:
      "Dit cookiebeleid legt uit welke technologieen Link My App kan gebruiken voor login, beveiliging, voorkeuren en meting.",
    sections: [
      {
        title: "Wat zijn cookies",
        paragraphs: [
          "Cookies en vergelijkbare technologieen zoals LocalStorage helpen een website informatie in de browser te bewaren.",
          "Sommige technologieen zijn nodig voor login, beveiliging en basisfuncties.",
        ],
      },
      {
        title: "Noodzakelijke technologieen",
        paragraphs: [
          "We kunnen noodzakelijke technologieen gebruiken om gebruikers te authenticeren, sessies te beschermen, misbruik te voorkomen en instellingen te bewaren.",
          "Deze technologieen zijn nodig om de gevraagde dienst te leveren en vereisen meestal geen voorafgaande toestemming.",
        ],
      },
      {
        title: "Analytics en meting",
        paragraphs: [
          "Link My App meet klikken op smartlinks, apparaattype, bronnen en QR-gebruik in het dashboard.",
          "Optionele webanalytics-tools worden alleen gebruikt wanneer de juiste rechtsgrond en toestemming aanwezig zijn.",
        ],
      },
      {
        title: "Beheer",
        paragraphs: [
          "Je kunt cookies en lokale gegevens blokkeren of verwijderen via je browser.",
          "Het verwijderen van noodzakelijke gegevens kan je sessie beeindigen of sommige functies verstoren.",
        ],
      },
    ],
  },

  terms: {
    path: "/voorwaarden",
    title: "Algemene voorwaarden",
    shortTitle: "Voorwaarden",
    intro:
      "Deze voorwaarden regelen het gebruik van Link My App, een dienst om smartlinks voor apps, QR-codes en klikstatistieken te maken.",
    sections: [
      {
        title: "Beschrijving van de dienst",
        paragraphs: [
          "Link My App laat je een smartlink maken voor App Store, Google Play en een alternatieve URL.",
          "De dienst kan QR-codes en klikstatistieken voor je links aanbieden.",
        ],
      },
      {
        title: "Gebruik van de dienst",
        paragraphs: [
          "Je bent verantwoordelijk voor de juistheid van de ingevoerde URL's en dat je het recht hebt om ze te gebruiken.",
          "Je mag Link My App niet gebruiken voor illegale, frauduleuze, misleidende of schadelijke inhoud.",
          "We kunnen links verwijderen of uitschakelen die rechten van derden, wetgeving of veiligheidsregels schenden.",
        ],
      },
      {
        title: "Beschikbaarheid",
        paragraphs: [
          "We proberen een stabiele dienst te leveren, maar garanderen geen beschikbaarheid zonder onderbrekingen.",
          "Onderhoud, technische storingen, externe leveranciers of overmacht kunnen de dienst beinvloeden.",
        ],
      },
      {
        title: "Aansprakelijkheid",
        paragraphs: [
          "Link My App vervangt geen juridische, technische of marketingreview van je campagnes.",
          "Voor zover wettelijk toegestaan zijn we niet aansprakelijk voor indirecte schade, winstderving of gevolgen van verkeerd ingevoerde URL's.",
        ],
      },
      {
        title: "Wijzigingen",
        paragraphs: [
          "We kunnen deze voorwaarden bijwerken wanneer de dienst, wetgeving of technische vereisten veranderen.",
          "Bij belangrijke wijzigingen informeren we op passende wijze.",
        ],
      },
    ],
  },
};
