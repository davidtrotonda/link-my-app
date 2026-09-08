const sharedSmartLinkFaqs = [
  {
    q: "क्या App Store, Google Play और website को एक link में जोड़ा जा सकता है?",
    a: "हां. Link My App device पहचानता है और iPhone को App Store, Android को Google Play और desktop को आपके fallback link पर भेजता है.",
  },
  {
    q: "क्या destination बाद में बदल सकता हूं?",
    a: "हां. Short link और QR code वही रहते हैं. आप dashboard से App Store, Google Play या fallback कभी भी edit कर सकते हैं.",
  },
  {
    q: "क्या मैं clicks का source देख सकता हूं?",
    a: "हां. Dashboard device, source, campaign और QR के हिसाब से clicks दिखाता है ताकि आपको पता चले कौन सा channel downloads ला रहा है.",
  },
  {
    q: "क्या app में SDK install करना पड़ेगा?",
    a: "नहीं. App download link बनाने के लिए SDK या app में बदलाव की जरूरत नहीं है. Link My App install से पहले link और QR layer पर काम करता है.",
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
        title: "Smart link के बिना",
        rows: [
          "दो store buttons user का ध्यान बांटते हैं.",
          "Users गलत store खोलते हैं या download छोड़ देते हैं.",
          "QR codes और campaigns measure करना मुश्किल हो जाता है.",
          "हर channel के लिए manual explanation चाहिए.",
        ],
      },
      after: {
        title: "Link My App के साथ",
        rows: [
          "एक link हर device को सही destination पर भेजता है.",
          "एक QR code iPhone, Android और desktop पर काम करता है.",
          "Clicks source, device और campaign के हिसाब से अलग दिखते हैं.",
          "Destination बदल सकते हैं बिना link बदलने या QR reprint किए.",
        ],
      },
    },
    realExamples: examples,
    tutorial,
    faqs: sharedSmartLinkFaqs,
  };
}

export const hindiUseCases = {
  ecommerce: buildUseCase({
    slug: "ecommerce-app-download-link",
    label: "Ecommerce",
    title: "Ecommerce apps के लिए app download link",
    metaTitle: "Ecommerce app download link - App Store और Google Play के लिए एक QR",
    metaDescription:
      "अपने store app के लिए smart link और QR बनाएं. iPhone, Android और desktop users automatically सही destination पर जाते हैं.",
    h1: "अपने shop app के downloads बढ़ाने के लिए एक link",
    eyebrow: "Ecommerce apps",
    intro:
      "जब आप customers से packaging, newsletter, Instagram या store से app download करवाना चाहते हैं, तो एक download link दो store buttons से ज्यादा साफ और तेज होता है.",
    painPoints: [
      "Packaging पर दो store badges crowded लगते हैं.",
      "Customers गलत store दबाकर download छोड़ देते हैं.",
      "Double CTA वाले newsletters clicks lose करते हैं क्योंकि user को choose करना पड़ता है.",
      "Influencer campaigns compare करना मुश्किल होता है जब सब same store links share करते हैं.",
      "Receipts या boxes पर QR सिर्फ एक store पर point नहीं कर सकता.",
      "Paid ads budget waste करते हैं अगर user को उसके phone से incompatible store पर भेजा जाए.",
    ],
    benefits: [
      { title: "हर channel में एक CTA", text: "Email, ads, Instagram bio, packaging, receipts और website में वही short URL इस्तेमाल करें." },
      { title: "Packaging और store के लिए QR", text: "एक QR code iPhone, Android और desktop को cover करता है." },
      { title: "Measurable campaigns", text: "हर channel या influencer के लिए अलग smart link बनाएं और clicks compare करें." },
      { title: "Purchase moment पर कम friction", text: "Customers बिना extra decision के सीधे सही store पर जाते हैं." },
      { title: "Editable destinations", text: "Store links बदलें बिना packaging, flyers या QR codes दोबारा print किए." },
      { title: "Retention के लिए अच्छा", text: "Current customers को email, packaging और social से वापस app में लाएं." },
    ],
    metrics: [
      { value: "1 QR", label: "Packaging और store के लिए" },
      { value: "100%", label: "iOS, Android और desktop coverage" },
      { value: "+18%", label: "दो buttons से कम friction" },
    ],
    examples: [
      { title: "Fashion store", text: "Clothing tags पर QR print करता है ताकि purchase के समय customer app download करे." },
      { title: "Beauty marketplace", text: "Newsletter में दो buttons की जगह smart link लगाकर हर campaign measure करता है." },
      { title: "Coffee brand", text: "Cups और receipts पर QR से loyalty app promote करता है." },
      { title: "D2C brand", text: "हर order में ऐसा QR card जोड़ता है जो किसी भी device पर काम करे." },
    ],
    tutorial: [
      { title: "Store links डालें", text: "App Store, Google Play और desktop visitors के लिए web fallback add करें." },
      { title: "Short slug चुनें", text: "Packaging और ads में साफ दिखने के लिए link-my.app/brand जैसा URL इस्तेमाल करें." },
      { title: "QR डाउनलोड करें", text: "QR को packaging, receipts, storefront या cards पर लगाएं." },
      { title: "Channels compare करें", text: "Newsletter, influencers या paid ads के लिए अलग links बनाएं." },
    ],
  }),

  saas: buildUseCase({
    slug: "saas-app-download-link",
    label: "SaaS",
    title: "SaaS और B2B apps के लिए download link",
    metaTitle: "SaaS download link - App Store, Google Play और web app के लिए smart link",
    metaDescription:
      "SaaS users को onboarding, email, help center और sales material से सीधे सही mobile app या web app पर भेजें.",
    h1: "SaaS app, web app और onboarding emails के लिए smart link",
    eyebrow: "SaaS और B2B",
    intro:
      "SaaS teams के पास अक्सर web app, iOS app और Android app साथ में होते हैं. Link My App से आप onboarding, sales, support और ads में एक ही link share करते हैं.",
    painPoints: [
      "Onboarding emails में बहुत links होते हैं और new users confuse होते हैं.",
      "Sales teams अलग-अलग URLs customers को भेजती हैं.",
      "Desktop को web app चाहिए, mobile को सही store.",
      "Help articles पुरानी URLs की वजह से outdated हो जाते हैं.",
      "B2B campaigns बिना channel links के measure करना मुश्किल होता है.",
      "Launch communication भारी हो जाता है जब हर platform अलग explain करना पड़े.",
    ],
    benefits: [
      { title: "Onboarding में एक link", text: "हर user को सही app या web app पर भेजें बिना platform पूछे." },
      { title: "Clean sales material", text: "Short link decks, PDFs, demos और email signatures में अच्छा दिखता है." },
      { title: "Support कम", text: "Customer Success को client से iOS या Android पूछने की जरूरत नहीं." },
      { title: "Segment campaigns", text: "Industry, account, region या launch wave के हिसाब से links बनाएं." },
      { title: "No SDK", text: "Pre-install routing और QR के लिए तुरंत काम करता है." },
      { title: "Web app fallback", text: "Desktop users login, landing या product page पर जाते हैं." },
    ],
    metrics: [
      { value: "3 destinations", label: "iOS, Android और web app" },
      { value: "0 SDK", label: "Download link के लिए" },
      { value: "1 URL", label: "Sales, support और marketing के लिए" },
    ],
    examples: [
      { title: "B2B SaaS", text: "New users को app download करवाने के लिए onboarding emails में smart link जोड़ता है." },
      { title: "Field service tool", text: "Technicians के training material पर QR print करता है." },
      { title: "HR software", text: "Enterprise rollout measure करने के लिए हर client के लिए अलग link बनाता है." },
      { title: "Productivity app", text: "Desktop web app पर जाता है और mobile सही store पर." },
    ],
    tutorial: [
      { title: "Web fallback तय करें", text: "Desktop destination के लिए login, product page या help center इस्तेमाल करें." },
      { title: "Master link बनाएं", text: "Onboarding और support के लिए general download link बनाएं." },
      { title: "Campaign के हिसाब से copy करें", text: "Ads, sales, webinars और rollouts के लिए specific links इस्तेमाल करें." },
      { title: "Metrics analyze करें", text: "Dashboard में source और device के हिसाब से clicks compare करें." },
    ],
  }),

  restaurants: buildUseCase({
    slug: "restaurant-app-qr-code",
    label: "Restaurants",
    title: "Restaurants apps के लिए QR और download link",
    metaTitle: "Restaurant app QR - App Store और Google Play के लिए एक link",
    metaDescription:
      "Table, bill, flyer या storefront पर QR हर customer को restaurant app के सही store पर भेजता है.",
    h1: "एक QR code जो customers से restaurant app download करवाए",
    eyebrow: "Restaurants और hospitality",
    intro:
      "Restaurant में moment बहुत important होता है: table, bill, pickup area या storefront. एक QR iPhone और Android customers को सीधे सही store पर भेजता है.",
    painPoints: [
      "Customers नहीं जानते कौन सा store खोलना है.",
      "Staff को बार-बार app download explain करना पड़ता है.",
      "दो QRs वाले flyers confusing लगते हैं.",
      "Loyalty programs install से पहले users खो देते हैं.",
      "In-store promotions बिना QR tracking के measure करना मुश्किल है.",
      "Desktop को menu, reservation या website पर जाना चाहिए.",
    ],
    benefits: [
      { title: "हर table पर एक QR", text: "Customer QR scan करता है और automatically सही store पर जाता है." },
      { title: "ज्यादा loyalty downloads", text: "Bill से install तक steps कम हो जाते हैं." },
      { title: "Clear offline measurement", text: "Table, flyer, window और event scans compare करें." },
      { title: "Multiple locations के लिए सही", text: "Location या campaign के हिसाब से links बनाएं." },
      { title: "Menu fallback", text: "Desktop या unknown devices web menu पर जा सकते हैं." },
      { title: "No technical setup", text: "सिर्फ store links चाहिए और QR print कर सकते हैं." },
    ],
    metrics: [
      { value: "1 scan", label: "सही store तक" },
      { value: "4 places", label: "Table, bill, flyer, window" },
      { value: "24/7", label: "हमेशा active link" },
    ],
    examples: [
      { title: "Burger chain", text: "Branch-wise scans measure करता है और counter पर loyalty app promote करता है." },
      { title: "Fine dining restaurant", text: "Bill पर simple QR लगाता है reservations और app download के लिए." },
      { title: "Delivery brand", text: "Packaging और offer cards पर smart QR print करता है." },
      { title: "Local cafe", text: "Table पर दो badges के बिना customers को points app पर भेजता है." },
    ],
    tutorial: [
      { title: "App destinations add करें", text: "App Store, Google Play और website/menu fallback set करें." },
      { title: "Print QR डाउनलोड करें", text: "QR export करें और iPhone व Android पर test करें." },
      { title: "Location-wise copy करें", text: "Branches, events या seasonal campaigns के लिए अलग links बनाएं." },
      { title: "Scans follow करें", text: "Dashboard में देखें कौन सा placement ज्यादा clicks लाता है." },
    ],
  }),

  fitness: buildUseCase({
    slug: "fitness-app-download-link",
    label: "Fitness",
    title: "Gyms और wellness apps के लिए download link",
    metaTitle: "Fitness app download link - Gyms, classes और members के लिए QR",
    metaDescription:
      "Fitness app के लिए smart link: iPhone App Store पर, Android Google Play पर और desktop website या booking पर.",
    h1: "Members से fitness app install करवाने के लिए एक link",
    eyebrow: "Fitness और wellness",
    intro:
      "Gyms, yoga studios और training apps को posters, timetables, mirrors, email और social पर simple download path चाहिए.",
    painPoints: [
      "Members store में गलत app name search करते हैं.",
      "दो QR या दो badges वाले timetables crowded लगते हैं.",
      "Trial classes interested users को app तक clearly नहीं भेजतीं.",
      "Trainers WhatsApp groups में अलग-अलग links share करते हैं.",
      "Offline material नहीं बताता कौन सा placement downloads लाता है.",
      "Desktop को booking पर जाना चाहिए, store पर नहीं.",
    ],
    benefits: [
      { title: "Gym के अंदर QR", text: "Mirror, reception, timetable या flyer का QR हर phone को सही store पर भेजता है." },
      { title: "WhatsApp और community", text: "Trainers groups में short link share कर सकते हैं." },
      { title: "Class-wise campaigns", text: "Yoga, HIIT, PT या newsletter में कौन ज्यादा clicks लाता है, देखें." },
      { title: "Booking fallback", text: "Desktop website, schedule या member area पर जाता है." },
      { title: "कम support", text: "किस phone के लिए कौन सा store है, समझाना नहीं पड़ता." },
      { title: "Fast updates", text: "Printed material redesign किए बिना destinations बदलें." },
    ],
    metrics: [
      { value: "1 link", label: "Members और leads के लिए" },
      { value: "0 confusion", label: "सही store को लेकर" },
      { value: "All channels", label: "Measurable" },
    ],
    examples: [
      { title: "Boutique studio", text: "Reception पर smart QR लगाता है ताकि bookings app से हों." },
      { title: "Gym chain", text: "Branch-wise links बनाकर app download demand compare करता है." },
      { title: "Yoga coach", text: "Instagram और WhatsApp पर short link share करती है." },
      { title: "Wellness app", text: "QR flyers और paid social के लिए एक link इस्तेमाल करता है." },
    ],
    tutorial: [
      { title: "Booking fallback तय करें", text: "Desktop को schedule, website या member area पर भेजें." },
      { title: "QR test करें", text: "Print से पहले iPhone और Android पर test करें." },
      { title: "Placement-wise measure करें", text: "Reception, studio, email और social के लिए अलग links इस्तेमाल करें." },
      { title: "Regular optimization", text: "Clicks compare करें और QR को बेहतर जगह रखें." },
    ],
  }),

  creators: buildUseCase({
    slug: "creator-app-download-link",
    label: "Creators",
    title: "Creators, influencers और communities के लिए download link",
    metaTitle: "Creator app download link - Instagram, TikTok और YouTube के लिए एक link",
    metaDescription:
      "Creator apps, communities और influencer campaigns के लिए short smart link. Bio, stories, video और email में काम करता है.",
    h1: "Bio, stories, videos और community के लिए app link",
    eyebrow: "Creators और influencers",
    intro:
      "Creators के पास जगह कम होती है: bio link, story sticker, video description या newsletter. Smart link से follower को App Store और Google Play में choose नहीं करना पड़ता.",
    painPoints: [
      "Instagram और TikTok कई store links के लिए कम जगह देते हैं.",
      "Link-in-bio pages download से पहले extra step जोड़ देते हैं.",
      "Followers mobile, desktop और in-app browsers से click करते हैं.",
      "Influencer partnerships custom links के बिना evaluate करना मुश्किल है.",
      "Long store links captions में unprofessional लगते हैं.",
      "Events के QR को एक reliable link चाहिए.",
    ],
    benefits: [
      { title: "Bio में एक link", text: "Short, clean और सीधे सही store तक." },
      { title: "हर creator के लिए links", text: "हर influencer को अपना URL दें और clicks compare करें." },
      { title: "In-app browsers में काम करता है", text: "Server-side decision से user सही destination पर जाता है." },
      { title: "Events के लिए QR", text: "Meetups, merch या slides में वही smart link QR की तरह इस्तेमाल करें." },
      { title: "Clean campaigns", text: "TikTok, Instagram, YouTube, newsletter और podcast को अलग रखें." },
      { title: "दो buttons से बेहतर", text: "Follower को अपने phone के बारे में सोचना नहीं पड़ता." },
    ],
    metrics: [
      { value: "1 bio", label: "एक app link काफी" },
      { value: "∞", label: "Campaign links" },
      { value: "3 destinations", label: "iOS, Android और web" },
    ],
    examples: [
      { title: "Fitness creator", text: "TikTok पर smart link share करता है और Instagram से अलग clicks measure करता है." },
      { title: "Newsletter community", text: "CTA mobile पर store और desktop पर web app भेजता है." },
      { title: "Podcast", text: "Show notes में short URL और live events में QR इस्तेमाल करता है." },
      { title: "Influencer campaign", text: "Report comparison के लिए हर creator को अलग link मिलता है." },
    ],
    tutorial: [
      { title: "Bio link बनाएं", text: "Brand या campaign से जुड़ा short slug चुनें." },
      { title: "हर account में इस्तेमाल करें", text: "Instagram, TikTok, YouTube, X और newsletter में वही link डालें." },
      { title: "हर creator के लिए copy करें", text: "Creator, post या launch phase के हिसाब से smart links बनाएं." },
      { title: "Clicks analyze करें", text: "Budget बढ़ाने से पहले sources और devices compare करें." },
    ],
  }),

  agencies: {
    slug: "for-agencies",
    label: "Agencies",
    title: "Agencies के लिए smart links",
    metaTitle: "Agencies के लिए smart links - Clients, campaigns और QR के लिए download links",
    metaDescription:
      "Agencies हर client, campaign, location या QR के लिए smart link बनाती हैं और App Store, Google Play व web fallback clicks measure करती हैं.",
    h1: "आपकी agency के हर client के लिए download links",
    eyebrow: "Agencies और partners",
    intro:
      "हर client को दो store links भेजना बंद करें. हर client, channel या campaign के लिए smart link बनाएं और एक QR व साफ click data dashboard में दें.",
    faqs: [
      { q: "क्या agency कई clients manage कर सकती है?", a: "हां. हर client के लिए smart links, slugs, QR codes और campaigns बना सकते हैं." },
      { q: "क्या हर campaign के लिए QR बन सकता है?", a: "हां. Retail, events, influencers, paid social और print के लिए अलग links बनाकर हर channel measure करें." },
      { q: "क्या Link My App client reports में इस्तेमाल हो सकता है?", a: "हां. Device, source और campaign के हिसाब से click data reports में जोड़ना आसान है." },
      { q: "क्या यह white-glove launches के लिए ठीक है?", a: "हां. Market, region या campaign phase के हिसाब से links बनाकर बाद में edit कर सकते हैं." },
    ],
  },
};

function buildHowTo({ slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps }) {
  return { slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps };
}

export const hindiHowTos = {
  "instagram-share": buildHowTo({
    slug: "share-app-instagram",
    label: "Instagram पर app share करें",
    metaTitle: "Instagram पर app share करें - bio, stories और ads के लिए एक link",
    metaDescription:
      "Instagram पर अपनी app को smart link से share करें जो iPhone को App Store और Android को Google Play भेजता है.",
    h1: "Instagram पर अपनी app एक link से कैसे share करें",
    eyebrow: "Instagram",
    intro:
      "Instagram में जगह limited होती है. Smart link से आप bio, stories, reels और ads में short URL इस्तेमाल करते हैं बिना दो store links दिखाए.",
    problem:
      "Bio में दो store links friction बनाते हैं. App Store और Google Play चुनना पड़े तो कई users आगे नहीं बढ़ते.",
    totalTime: "PT3M",
    steps: [
      { name: "Smart link बनाएं", text: "Link My App में App Store, Google Play और optionally web fallback add करें." },
      { name: "Bio link replace करें", text: "Instagram profile edit करें और website field में link-my.app URL डालें." },
      { name: "Stories और reels में इस्तेमाल करें", text: "Story sticker, captions या ads में वही link इस्तेमाल करें." },
      { name: "Campaigns अलग करें", text: "Important posts या influencers के लिए अलग links बनाकर clicks compare करें." },
      { name: "Results देखें", text: "Dashboard में Instagram, iOS, Android और desktop clicks देखें." },
    ],
  }),

  "whatsapp-link": buildHowTo({
    slug: "app-download-link-whatsapp",
    label: "WhatsApp पर app share करें",
    metaTitle: "WhatsApp पर app share करें - iPhone और Android के लिए एक link",
    metaDescription:
      "WhatsApp-friendly download link बनाएं जो हर phone को सही store पर automatically भेजता है.",
    h1: "WhatsApp पर app बिना दो store links के कैसे share करें",
    eyebrow: "WhatsApp",
    intro:
      "WhatsApp messages short होने चाहिए. Smart link लंबे App Store और Google Play links की जगह एक साफ link देता है.",
    problem:
      "एक message में दो links भेजने पर message लंबा हो जाता है और user को खुद choose करना पड़ता है.",
    totalTime: "PT2M",
    steps: [
      { name: "Short slug चुनें", text: "Chats में भरोसेमंद दिखने के लिए readable slug इस्तेमाल करें." },
      { name: "Destinations set करें", text: "iOS, Android और fallback add करें." },
      { name: "Message छोटा रखें", text: "Direct लिखें: हमारी app यहां डाउनलोड करें: link-my.app/your-app." },
      { name: "Broadcasts test करें", text: "Groups या customers को भेजने से पहले iPhone और Android पर test करें." },
      { name: "Clicks measure करें", text: "WhatsApp को अलग measure करना हो तो WhatsApp-specific link बनाएं." },
    ],
  }),

  "redirect-by-device": buildHowTo({
    slug: "app-store-google-play-redirect",
    label: "Device के हिसाब से redirect",
    metaTitle: "Automatically App Store या Google Play पर redirect करें",
    metaDescription:
      "बिना JavaScript landing page और बिना SDK iPhone, Android और desktop को सही destination पर भेजना सीखें.",
    h1: "Users को automatically App Store या Google Play पर कैसे भेजें",
    eyebrow: "Device detection",
    intro:
      "Smart link device signals पढ़ता है और server पर तय करता है कि user को App Store, Google Play या web page दिखना चाहिए.",
    problem:
      "Normal store URL सिर्फ एक platform के लिए काम करता है. सारी traffic उस पर भेजेंगे तो downloads lose होंगे.",
    totalTime: "PT4M",
    steps: [
      { name: "iOS destination add करें", text: "App Store से अपनी app का public URL copy करें." },
      { name: "Android destination add करें", text: "Google Play से URL copy करें." },
      { name: "Desktop fallback set करें", text: "Desktop visitors के लिए landing page, web app या download page set करें." },
      { name: "Smart link publish करें", text: "Campaigns, bio, ads और QR में सिर्फ link-my.app का short URL share करें." },
      { name: "Redirect test करें", text: "Large launch से पहले iPhone, Android और desktop पर test करें." },
    ],
  }),

  "download-button-website": buildHowTo({
    slug: "app-download-button-website",
    label: "Website download button",
    metaTitle: "Website के लिए app download button - App Store और Google Play के लिए एक button",
    metaDescription:
      "दो store badges की जगह एक download button लगाएं जो हर device को सही platform पर भेजता है.",
    h1: "एक link वाला app download button कैसे बनाएं",
    eyebrow: "Website",
    intro:
      "Mobile landing pages पर space limited होती है. अक्सर एक button दो badges से ज्यादा clear होता है.",
    problem:
      "दो buttons space लेते हैं, small screens पर खराब दिखते हैं और visitor को choose करने पर मजबूर करते हैं.",
    totalTime: "PT5M",
    steps: [
      { name: "Smart link बनाएं", text: "Link My App में iOS, Android और web fallback set करें." },
      { name: "Button text चुनें", text: "Download app या Install now जैसा clear text इस्तेमाल करें." },
      { name: "Button link करें", text: "Button destination के रूप में link-my.app URL लगाएं." },
      { name: "Mobile पर test करें", text: "Check करें button clear दिखता है और small screens पर break नहीं होता." },
      { name: "Campaigns mark करें", text: "Website में कई pages हों तो better stats के लिए page-wise links बनाएं." },
    ],
  }),

  "qr-physical-campaigns": buildHowTo({
    slug: "qr-code-app-download",
    label: "App download QR",
    metaTitle: "App download QR बनाएं - iPhone और Android के लिए एक QR",
    metaDescription:
      "ऐसा QR code बनाएं जो iPhone को App Store, Android को Google Play और desktop को website पर भेजे.",
    h1: "App download के लिए QR कैसे बनाएं",
    eyebrow: "QR",
    intro:
      "App QR को सिर्फ एक store पर point नहीं करना चाहिए. Link My App के साथ QR हर device के लिए smart link बन जाता है.",
    problem:
      "एक store URL वाला QR iOS या Android users में से एक group को exclude करता है. दो QRs confusing लगते हैं और कम scan होते हैं.",
    totalTime: "PT6M",
    steps: [
      { name: "Smart link बनाएं", text: "App Store, Google Play और fallback add करें." },
      { name: "QR डाउनलोड करें", text: "Generated QR को print, packaging या events में इस्तेमाल करें." },
      { name: "CTA छोटा रखें", text: "जैसे: Scan करें और app डाउनलोड करें." },
      { name: "Print size test करें", text: "Real distance से iPhone और Android पर QR scan test करें." },
      { name: "Placement-wise measure करें", text: "Packaging, flyer, storefront और events के लिए अलग QR links बनाएं." },
    ],
  }),
};

export const hindiLegalPages = {
  privacy: {
    path: "/privacy",
    title: "गोपनीयता नीति",
    shortTitle: "Privacy",
    intro:
      "यह Privacy Policy बताती है कि David Trotonda Link My App इस्तेमाल करते समय personal data कैसे process करता है, जहां users apps के लिए smart links, QR codes और click statistics बनाते हैं.",
    sections: [
      {
        title: "Data controller",
        paragraphs: [
          "Data controller David Trotonda है.",
          "Contact: info@skeilapps.com.",
          "Service: Link My App, link-my.app पर available है.",
        ],
      },
      {
        title: "हम कौन सा data process करते हैं",
        paragraphs: [
          "Account data जैसे नाम, email, user ID और Google login से profile photo.",
          "Smart link data जैसे app name, App Store URL, Google Play URL, fallback URL, slug, status और related QR code.",
          "Usage और analytics data जैसे clicks, date, time, chosen destination, source, approximate device, browser, operating system और security/abuse prevention signals.",
        ],
      },
      {
        title: "Purposes",
        paragraphs: [
          "आपका account बनाना और manage करना.",
          "Smart links save करना और visitors को selected destination पर route करना.",
          "QR codes generate करना और dashboard में click statistics दिखाना.",
          "Service को abuse, fraud, unauthorized access और technical problems से protect करना.",
        ],
      },
      {
        title: "Legal basis",
        paragraphs: [
          "Account बनाने या smart links इस्तेमाल करने पर contract या pre-contractual steps.",
          "जब आप contact करते हैं या optional services enable करते हैं, तब consent.",
          "Security, stability और service improvement के लिए legitimate interest.",
          "Accounting, tax या data protection rights जैसी legal obligations के लिए compliance.",
        ],
      },
      {
        title: "Service providers",
        paragraphs: [
          "हम hosting, authentication, database और security के लिए Firebase और Google Cloud जैसे providers इस्तेमाल करते हैं.",
          "कुछ providers European Economic Area के बाहर data process कर सकते हैं. ऐसे cases में standard contractual clauses या adequacy decisions जैसे safeguards इस्तेमाल होते हैं.",
        ],
      },
      {
        title: "Retention और rights",
        paragraphs: [
          "Account data तब तक रखा जाता है जब account active हो या legal obligations मौजूद हों.",
          "आप access, rectification, deletion, restriction, objection या portability के लिए हमसे contact कर सकते हैं.",
          "अगर आपको लगता है कि data सही तरह process नहीं हो रहा, तो आप data protection authority से contact कर सकते हैं.",
        ],
      },
    ],
  },

  cookies: {
    path: "/cookies",
    title: "कुकी नीति",
    shortTitle: "Cookies",
    intro:
      "यह Cookie Policy बताती है कि Link My App login, security, preferences और measurement के लिए कौन सी technologies इस्तेमाल कर सकता है.",
    sections: [
      {
        title: "Cookies क्या हैं",
        paragraphs: [
          "Cookies और similar technologies जैसे LocalStorage browser में information save करने में मदद करती हैं.",
          "कुछ technologies login, security और core functionality के लिए जरूरी होती हैं.",
        ],
      },
      {
        title: "Necessary technologies",
        paragraphs: [
          "हम users authenticate करने, sessions protect करने, abuse रोकने और settings save करने के लिए necessary technologies इस्तेमाल कर सकते हैं.",
          "ये requested service देने के लिए जरूरी हैं और आमतौर पर prior consent की जरूरत नहीं होती.",
        ],
      },
      {
        title: "Analytics और measurement",
        paragraphs: [
          "Link My App dashboard में smart link clicks, device types, sources और QR usage measure करता है.",
          "Optional web analytics tools तभी इस्तेमाल होते हैं जब required legal basis और consent available हों.",
        ],
      },
      {
        title: "Management",
        paragraphs: [
          "आप browser से cookies और local data block या delete कर सकते हैं.",
          "Necessary data delete करने पर session end हो सकता है या कुछ features सही काम नहीं करेंगे.",
        ],
      },
    ],
  },

  terms: {
    path: "/terms",
    title: "नियम और शर्तें",
    shortTitle: "Terms",
    intro:
      "ये terms Link My App के use को govern करती हैं, जो apps के लिए smart links, QR codes और click statistics बनाने की service है.",
    sections: [
      {
        title: "Service description",
        paragraphs: [
          "Link My App App Store, Google Play और fallback link के लिए smart link बनाने देता है.",
          "Service आपके links के लिए QR codes और click statistics provide कर सकती है.",
        ],
      },
      {
        title: "Service use",
        paragraphs: [
          "आप जो URLs डालते हैं उनकी accuracy और उन्हें use करने का right आपकी responsibility है.",
          "Link My App illegal, fraudulent, misleading या abusive content के लिए इस्तेमाल नहीं किया जा सकता.",
          "हम third-party rights, laws या security rules तोड़ने वाले links remove या disable कर सकते हैं.",
        ],
      },
      {
        title: "Availability",
        paragraphs: [
          "हम stable service देने की कोशिश करते हैं, लेकिन uninterrupted availability guarantee नहीं करते.",
          "Maintenance, technical incidents, external providers या force majeure service को affect कर सकते हैं.",
        ],
      },
      {
        title: "Liability",
        paragraphs: [
          "Link My App आपकी campaigns की legal, technical या marketing review की जगह नहीं लेता.",
          "Law की अनुमति के अनुसार, indirect damages, loss of profit या गलत URLs से आए results के लिए हम responsible नहीं होंगे.",
        ],
      },
      {
        title: "Changes",
        paragraphs: [
          "Service, law या technical requirements बदलने पर हम ये terms update कर सकते हैं.",
          "Important changes होने पर हम उचित तरीके से inform करेंगे.",
        ],
      },
    ],
  },
};
