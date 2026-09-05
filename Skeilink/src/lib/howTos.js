// Catálogo de guías "Cómo hacer X" (HowTo schema en Google).
// Cada guía tiene contenido único por idioma y un slug distinto en cada uno
// para evitar canibalización SEO con la landing principal y entre guías.

export const howToHubRoutes = {
  en: "/how-to",
  es: "/como",
  fr: "/comment",
};

export function howToPath(howToId, language = "en") {
  const howto = howTos.find((h) => h.id === howToId);
  if (!howto) return howToHubRoutes[language] || howToHubRoutes.en;
  const hub = howToHubRoutes[language] || howToHubRoutes.en;
  const slug = howto[language]?.slug || howto.en.slug;
  return `${hub}/${slug}`;
}

export function getHowToBySlug(slug, language = "en") {
  return howTos.find((h) => (h[language]?.slug || h.en.slug) === slug);
}

export const howTos = [
  {
    id: "instagram-share",
    icon: "Instagram",
    accent: "from-pink-50 via-white to-amber-50",
    relatedNiches: ["creators", "ecommerce"],
    en: {
      slug: "share-your-app-on-instagram",
      label: "Share your app on Instagram",
      metaTitle: "How to share your app on Instagram – bio, stories and ads",
      metaDescription: "Use one smart link in your Instagram bio, stories and ads. Detects iPhone or Android and sends every follower to App Store or Google Play.",
      h1: "How to share your app on Instagram with a single link",
      eyebrow: "Instagram",
      intro: "Instagram only allows one link in your bio – you can't fit App Store and Google Play. Here's how to share your app on Instagram with one smart link that decides the right store for each follower.",
      problem: "Pasting two app store links on Instagram means losing followers between taps. Most bios cut off long URLs and stories don't render dual destinations cleanly.",
      totalTime: "PT3M",
      steps: [
        {
          name: "Create your smart link",
          text: "From the Link My App dashboard, paste your App Store URL, your Google Play URL and a fallback URL for desktop (your landing or web app).",
        },
        {
          name: "Copy the link into your Instagram bio",
          text: "Go to your profile → Edit profile → Website. Paste your link-my.app URL. Now every follower lands on the right store regardless of phone.",
        },
        {
          name: "Add it to stories and reels",
          text: "Use the Link sticker on stories or paste the link in the caption of a reel. The smart link works the same way and sends each viewer to the correct store.",
        },
        {
          name: "Use it in paid ads",
          text: "When launching an Instagram ad, use the same smart link as destination. Meta won't change your URL and the smart link still detects iPhone vs Android.",
        },
        {
          name: "Track which posts drive installs",
          text: "From your dashboard, see clicks per source – Instagram traffic is separated from web, email or QR scans.",
        },
      ],
    },
    es: {
      slug: "compartir-app-instagram",
      label: "Compartir app en Instagram",
      metaTitle: "Cómo compartir tu app en Instagram – bio, stories y anuncios",
      metaDescription: "Un smart link para tu bio de Instagram, stories y anuncios. Detecta iPhone o Android y envía a cada seguidor a App Store o Google Play.",
      h1: "Cómo compartir tu app en Instagram con un solo enlace",
      eyebrow: "Instagram",
      intro: "Instagram solo permite un enlace en tu bio – no caben App Store y Google Play. Aquí tienes cómo compartir tu app en Instagram con un único smart link que decide la tienda correcta para cada seguidor.",
      problem: "Poner dos enlaces de tienda en Instagram hace perder seguidores entre toques. Las bios cortan las URLs largas y las stories no renderizan dos destinos limpiamente.",
      totalTime: "PT3M",
      steps: [
        {
          name: "Crea tu smart link",
          text: "Desde el panel de Link My App, pega la URL de App Store, la de Google Play y una URL alternativa para ordenador (tu landing o app web).",
        },
        {
          name: "Pega el enlace en tu bio de Instagram",
          text: "Ve a tu perfil → Editar perfil → Sitio web. Pega tu URL de link-my.app. Cada seguidor aterriza en la tienda correcta según su móvil.",
        },
        {
          name: "Úsalo en stories y reels",
          text: "Pon el sticker Link en stories o pega el enlace en la caption del reel. El smart link funciona igual y manda a cada viewer a la tienda correcta.",
        },
        {
          name: "Úsalo en anuncios de pago",
          text: "Cuando lances un anuncio de Instagram, usa el mismo smart link como destino. Meta no cambia tu URL y el smart link sigue detectando iPhone vs Android.",
        },
        {
          name: "Mide qué publicaciones traen instalaciones",
          text: "Desde el panel, ve clics por fuente – el tráfico de Instagram aparece separado de web, email o escaneos QR.",
        },
      ],
    },
    fr: {
      slug: "partager-app-instagram",
      label: "Partager app sur Instagram",
      metaTitle: "Comment partager ton app sur Instagram – bio, stories et pubs",
      metaDescription: "Un smart link pour ta bio Instagram, tes stories et tes pubs. Détecte iPhone ou Android et envoie chaque follower vers App Store ou Google Play.",
      h1: "Comment partager ton app sur Instagram avec un seul lien",
      eyebrow: "Instagram",
      intro: "Instagram n'autorise qu'un lien dans ta bio – impossible d'y mettre App Store et Google Play. Voici comment partager ton app sur Instagram avec un smart link qui choisit la bonne boutique pour chaque follower.",
      problem: "Coller deux liens de boutique sur Instagram fait perdre des followers entre les taps. Les bios coupent les longues URLs et les stories ne rendent pas deux destinations proprement.",
      totalTime: "PT3M",
      steps: [
        {
          name: "Crée ton smart link",
          text: "Depuis le panel Link My App, colle l'URL App Store, l'URL Google Play et une URL alternative pour desktop (ta landing ou app web).",
        },
        {
          name: "Colle le lien dans ta bio Instagram",
          text: "Va sur ton profil → Modifier le profil → Site web. Colle ton URL link-my.app. Chaque follower atterrit sur la bonne boutique selon son mobile.",
        },
        {
          name: "Utilise-le dans tes stories et reels",
          text: "Mets le sticker Lien dans tes stories ou colle le lien dans la caption du reel. Le smart link fonctionne pareil et envoie chaque viewer vers la bonne boutique.",
        },
        {
          name: "Utilise-le dans tes pubs payantes",
          text: "Pour une pub Instagram, utilise le même smart link comme destination. Meta ne change pas ton URL et le smart link détecte toujours iPhone vs Android.",
        },
        {
          name: "Mesure quelles publications génèrent des installs",
          text: "Depuis le panel, vois les clics par source – le trafic Instagram est séparé du web, email ou scans QR.",
        },
      ],
    },
  },
  {
    id: "whatsapp-link",
    icon: "MessageCircle",
    accent: "from-emerald-50 via-white to-white",
    relatedNiches: ["restaurants", "ecommerce"],
    en: {
      slug: "app-download-link-whatsapp",
      label: "App download link on WhatsApp",
      metaTitle: "How to send an app download link on WhatsApp",
      metaDescription: "Send one smart link on WhatsApp 1-to-1, broadcasts or status. Detects iPhone or Android and sends every contact to App Store or Google Play.",
      h1: "How to send an app download link on WhatsApp",
      eyebrow: "WhatsApp",
      intro: "Sharing two URLs on WhatsApp confuses your contacts. Here's how to send one smart link by WhatsApp that auto-detects iPhone or Android and avoids the back-and-forth of \"which one do I open?\".",
      problem: "Most teams paste both App Store and Google Play URLs in WhatsApp. Customers click the wrong one or none.",
      totalTime: "PT2M",
      steps: [
        {
          name: "Generate your smart link",
          text: "From the dashboard, paste your App Store URL, Google Play URL and an optional fallback URL. Save and copy the short URL.",
        },
        {
          name: "Send it in a 1-to-1 chat",
          text: "Paste the smart link in any chat. WhatsApp shows a preview card and tapping it sends each contact to the right store on iOS or Android.",
        },
        {
          name: "Use it in WhatsApp Status",
          text: "Add the smart link to a status update so every viewer with iPhone goes to App Store and every viewer with Android goes to Google Play.",
        },
        {
          name: "Add it to a Business broadcast",
          text: "WhatsApp Business broadcasts to many contacts at once. Put the smart link in the broadcast body so every recipient lands correctly.",
        },
        {
          name: "Track WhatsApp clicks separately",
          text: "When you share via WhatsApp, the dashboard counts those clicks as 'whatsapp' so you know how much traffic the channel really sends.",
        },
      ],
    },
    es: {
      slug: "enlace-descarga-app-whatsapp",
      label: "Enlace de descarga en WhatsApp",
      metaTitle: "Cómo enviar un enlace de descarga de app por WhatsApp",
      metaDescription: "Envía un único smart link por WhatsApp en chats, difusión o estados. Detecta iPhone o Android y manda a cada contacto a App Store o Google Play.",
      h1: "Cómo enviar un enlace de descarga de app por WhatsApp",
      eyebrow: "WhatsApp",
      intro: "Compartir dos URLs por WhatsApp confunde a tus contactos. Aquí tienes cómo enviar un único smart link por WhatsApp que detecta iPhone o Android y evita el \"¿cuál abro?\".",
      problem: "La mayoría de equipos pegan en WhatsApp tanto la URL de App Store como la de Google Play. Los clientes clican la equivocada o ninguna.",
      totalTime: "PT2M",
      steps: [
        {
          name: "Genera tu smart link",
          text: "Desde el panel, pega tu URL de App Store, la de Google Play y una URL alternativa opcional. Guarda y copia la URL corta.",
        },
        {
          name: "Envíalo en un chat 1 a 1",
          text: "Pega el smart link en cualquier chat. WhatsApp muestra una tarjeta de previsualización y al tocarla envía a cada contacto a la tienda correcta para iOS o Android.",
        },
        {
          name: "Úsalo en los Estados de WhatsApp",
          text: "Añade el smart link a un estado para que cada viewer con iPhone vaya a App Store y cada viewer con Android vaya a Google Play.",
        },
        {
          name: "Añádelo a una difusión de WhatsApp Business",
          text: "Las difusiones de WhatsApp Business envían a varios contactos a la vez. Pon el smart link en el cuerpo para que cada destinatario aterrice correctamente.",
        },
        {
          name: "Mide los clics de WhatsApp por separado",
          text: "Cuando compartes por WhatsApp, el panel cuenta esos clics como 'whatsapp' para que sepas cuánto tráfico genera el canal realmente.",
        },
      ],
    },
    fr: {
      slug: "lien-telechargement-app-whatsapp",
      label: "Lien de téléchargement sur WhatsApp",
      metaTitle: "Comment envoyer un lien de téléchargement d'app sur WhatsApp",
      metaDescription: "Envoie un seul smart link sur WhatsApp en chat, diffusion ou statut. Détecte iPhone ou Android et envoie chaque contact vers App Store ou Google Play.",
      h1: "Comment envoyer un lien de téléchargement d'app sur WhatsApp",
      eyebrow: "WhatsApp",
      intro: "Partager deux URLs sur WhatsApp embrouille tes contacts. Voici comment envoyer un seul smart link sur WhatsApp qui détecte iPhone ou Android et évite le \"laquelle j'ouvre ?\".",
      problem: "La plupart des équipes collent dans WhatsApp à la fois l'URL App Store et celle Google Play. Les clients cliquent la mauvaise ou aucune.",
      totalTime: "PT2M",
      steps: [
        {
          name: "Génère ton smart link",
          text: "Depuis le panel, colle ton URL App Store, celle Google Play et une URL alternative optionnelle. Sauvegarde et copie l'URL courte.",
        },
        {
          name: "Envoie-le en chat 1 à 1",
          text: "Colle le smart link dans n'importe quel chat. WhatsApp montre un aperçu et au tap envoie chaque contact vers la bonne boutique iOS ou Android.",
        },
        {
          name: "Utilise-le dans les Statuts WhatsApp",
          text: "Ajoute le smart link à un statut pour que chaque viewer iPhone aille sur App Store et chaque viewer Android sur Google Play.",
        },
        {
          name: "Ajoute-le à une diffusion WhatsApp Business",
          text: "Les diffusions WhatsApp Business envoient à plusieurs contacts à la fois. Mets le smart link dans le corps pour que chaque destinataire atterrisse correctement.",
        },
        {
          name: "Mesure les clics WhatsApp séparément",
          text: "Quand tu partages via WhatsApp, le panel compte ces clics comme 'whatsapp' pour que tu saches combien de trafic le canal génère vraiment.",
        },
      ],
    },
  },
  {
    id: "redirect-by-device",
    icon: "SplitSquareHorizontal",
    accent: "from-blue-50 via-white to-white",
    relatedNiches: ["saas", "ecommerce"],
    en: {
      slug: "redirect-users-app-store-google-play",
      label: "Redirect users to the right store",
      metaTitle: "How to redirect users to App Store or Google Play by device",
      metaDescription: "Step-by-step guide to redirect your users automatically to App Store on iPhone, Google Play on Android and a fallback URL on desktop.",
      h1: "How to redirect users to App Store or Google Play by device",
      eyebrow: "Device redirect",
      intro: "If your app is on iOS and Android, one URL must serve three audiences: iPhone, Android and desktop. Here's the setup that does it automatically and counts each visitor by device.",
      problem: "Sending all traffic to a single store URL means losing half your users. A smart link reads the user agent and decides the destination on the fly.",
      totalTime: "PT4M",
      steps: [
        {
          name: "Collect your three URLs",
          text: "Find your App Store listing URL (apps.apple.com/...) and your Google Play listing URL (play.google.com/store/apps/...). Decide a fallback URL for desktop visitors – your landing page works great.",
        },
        {
          name: "Create the smart link",
          text: "In your Link My App dashboard, create a new smart link and paste all three URLs. Save.",
        },
        {
          name: "Confirm the device detection",
          text: "Open the smart link from an iPhone, an Android and a desktop. You should be redirected to the right destination each time.",
        },
        {
          name: "Replace all your old store links",
          text: "Anywhere you had two URLs (email signature, bio, ads, QR), replace them with the smart link. Less friction, more conversions.",
        },
        {
          name: "Check the dashboard",
          text: "Within minutes, see clicks split between iOS, Android and desktop. The numbers should match what you know about your audience.",
        },
      ],
    },
    es: {
      slug: "redirigir-usuarios-app-store-google-play",
      label: "Redirigir según dispositivo",
      metaTitle: "Cómo redirigir usuarios a App Store o Google Play según el dispositivo",
      metaDescription: "Guía paso a paso para redirigir a tus usuarios automáticamente a App Store en iPhone, Google Play en Android y una URL alternativa en ordenador.",
      h1: "Cómo redirigir usuarios a App Store o Google Play según el dispositivo",
      eyebrow: "Redirección por dispositivo",
      intro: "Si tu app está en iOS y Android, una sola URL debe servir a tres audiencias: iPhone, Android y ordenador. Aquí tienes la configuración que lo hace automático y cuenta a cada visitante por dispositivo.",
      problem: "Mandar todo el tráfico a una sola URL de tienda significa perder la mitad de tus usuarios. Un smart link lee el user agent y decide el destino al instante.",
      totalTime: "PT4M",
      steps: [
        {
          name: "Reúne tus tres URLs",
          text: "Busca tu URL de ficha en App Store (apps.apple.com/...) y la de Google Play (play.google.com/store/apps/...). Decide una URL alternativa para visitas de ordenador – tu landing funciona perfecto.",
        },
        {
          name: "Crea el smart link",
          text: "En el panel de Link My App, crea un nuevo smart link y pega las tres URLs. Guarda.",
        },
        {
          name: "Confirma la detección de dispositivo",
          text: "Abre el smart link desde un iPhone, un Android y un ordenador. Deberías ser redirigido al destino correcto cada vez.",
        },
        {
          name: "Reemplaza todos tus enlaces antiguos",
          text: "Donde tuvieras dos URLs (firma de email, bio, anuncios, QR), sustitúyelas por el smart link. Menos fricción, más conversiones.",
        },
        {
          name: "Revisa el panel",
          text: "En minutos verás clics separados entre iOS, Android y ordenador. Los números deberían cuadrar con lo que sabes de tu audiencia.",
        },
      ],
    },
    fr: {
      slug: "rediriger-utilisateurs-app-store-google-play",
      label: "Rediriger selon l'appareil",
      metaTitle: "Comment rediriger les utilisateurs vers App Store ou Google Play selon l'appareil",
      metaDescription: "Guide étape par étape pour rediriger tes utilisateurs automatiquement vers App Store sur iPhone, Google Play sur Android et une URL alternative sur desktop.",
      h1: "Comment rediriger les utilisateurs vers App Store ou Google Play selon l'appareil",
      eyebrow: "Redirection par appareil",
      intro: "Si ton app est sur iOS et Android, une seule URL doit servir trois audiences : iPhone, Android et desktop. Voici la configuration qui le fait automatiquement et compte chaque visiteur par appareil.",
      problem: "Envoyer tout le trafic vers une seule URL de boutique fait perdre la moitié de tes utilisateurs. Un smart link lit le user agent et décide la destination instantanément.",
      totalTime: "PT4M",
      steps: [
        {
          name: "Récupère tes trois URLs",
          text: "Trouve ton URL App Store (apps.apple.com/...) et celle Google Play (play.google.com/store/apps/...). Choisis une URL alternative pour les visiteurs desktop – ta landing marche très bien.",
        },
        {
          name: "Crée le smart link",
          text: "Dans ton panel Link My App, crée un nouveau smart link et colle les trois URLs. Sauvegarde.",
        },
        {
          name: "Confirme la détection d'appareil",
          text: "Ouvre le smart link depuis un iPhone, un Android et un desktop. Tu dois être redirigé vers la bonne destination à chaque fois.",
        },
        {
          name: "Remplace tous tes anciens liens",
          text: "Partout où tu avais deux URLs (signature email, bio, pubs, QR), remplace-les par le smart link. Moins de friction, plus de conversions.",
        },
        {
          name: "Vérifie le panel",
          text: "En quelques minutes tu verras les clics séparés entre iOS, Android et desktop. Les chiffres doivent correspondre à ce que tu sais de ton audience.",
        },
      ],
    },
  },
  {
    id: "download-button-website",
    icon: "MousePointer2",
    accent: "from-slate-50 via-white to-white",
    relatedNiches: ["saas", "ecommerce"],
    en: {
      slug: "app-download-button-website",
      label: "Download button for your website",
      metaTitle: "How to put one app download button on your website",
      metaDescription: "Replace two App Store and Google Play buttons with one smart download button. Detects iPhone or Android and sends every visitor to the right store.",
      h1: "How to put one app download button on your website",
      eyebrow: "Website button",
      intro: "Most websites place two buttons – App Store on the left, Google Play on the right – and force visitors to pick. A single smart button is faster, cleaner and converts better. Here's how to install one in minutes.",
      problem: "Two buttons take more space, lower conversion rates and don't work for visitors who don't know which store their phone uses.",
      totalTime: "PT5M",
      steps: [
        {
          name: "Create your smart link",
          text: "Generate a smart link with App Store, Google Play and a desktop fallback URL (your sign-up page or product tour, for example).",
        },
        {
          name: "Pick the button copy",
          text: "On mobile a button labelled \"Download the app\" converts well. On desktop change the copy to \"Try it on the web\" so desktop visitors don't expect a download.",
        },
        {
          name: "Use one HTML button with the smart link",
          text: "Replace your two-button block with a single <a href> pointing to the smart link. Add target=\"_blank\" if you want the store to open in a new tab.",
        },
        {
          name: "Track button clicks",
          text: "All clicks land in the dashboard with the source \"web\". You can compare them with QR, Instagram, paid, etc.",
        },
        {
          name: "A/B test the copy",
          text: "Create a second smart link with a different copy or design to A/B test which one converts more downloads.",
        },
      ],
    },
    es: {
      slug: "boton-descarga-app-web",
      label: "Botón de descarga para tu web",
      metaTitle: "Cómo poner un botón de descarga de app en tu web",
      metaDescription: "Sustituye los dos botones de App Store y Google Play por uno solo. Detecta iPhone o Android y manda a cada visitante a la tienda correcta.",
      h1: "Cómo poner un botón de descarga de app en tu web",
      eyebrow: "Botón en la web",
      intro: "La mayoría de webs ponen dos botones – App Store a la izquierda, Google Play a la derecha – y obligan al visitante a elegir. Un único botón inteligente es más rápido, limpio y convierte mejor. Aquí tienes cómo instalarlo en minutos.",
      problem: "Dos botones ocupan más espacio, bajan la conversión y no funcionan para visitantes que no saben qué tienda usa su móvil.",
      totalTime: "PT5M",
      steps: [
        {
          name: "Crea tu smart link",
          text: "Genera un smart link con App Store, Google Play y una URL alternativa para ordenador (tu página de registro o tour del producto, por ejemplo).",
        },
        {
          name: "Elige el copy del botón",
          text: "En móvil un botón con \"Descargar la app\" convierte bien. En ordenador cambia el copy a \"Pruébala en la web\" para que los visitantes desktop no esperen una descarga.",
        },
        {
          name: "Usa un único botón HTML con el smart link",
          text: "Sustituye tu bloque de dos botones por un único <a href> apuntando al smart link. Añade target=\"_blank\" si quieres que la tienda abra en una pestaña nueva.",
        },
        {
          name: "Mide los clics del botón",
          text: "Todos los clics llegan al panel con fuente \"web\". Puedes compararlos con QR, Instagram, paid, etc.",
        },
        {
          name: "Haz A/B test del copy",
          text: "Crea un segundo smart link con copy o diseño distintos para testear cuál convierte más descargas.",
        },
      ],
    },
    fr: {
      slug: "bouton-telechargement-app-site",
      label: "Bouton de téléchargement sur ton site",
      metaTitle: "Comment mettre un bouton de téléchargement d'app sur ton site",
      metaDescription: "Remplace les deux boutons App Store et Google Play par un seul bouton intelligent. Détecte iPhone ou Android et envoie chaque visiteur vers la bonne boutique.",
      h1: "Comment mettre un bouton de téléchargement d'app sur ton site",
      eyebrow: "Bouton sur le site",
      intro: "La plupart des sites mettent deux boutons – App Store à gauche, Google Play à droite – et obligent le visiteur à choisir. Un seul bouton intelligent est plus rapide, propre et convertit mieux. Voici comment l'installer en quelques minutes.",
      problem: "Deux boutons prennent plus de place, baissent la conversion et ne fonctionnent pas pour les visiteurs qui ne savent pas quelle boutique utilise leur mobile.",
      totalTime: "PT5M",
      steps: [
        {
          name: "Crée ton smart link",
          text: "Génère un smart link avec App Store, Google Play et une URL alternative pour desktop (ta page d'inscription ou tour produit, par exemple).",
        },
        {
          name: "Choisis le texte du bouton",
          text: "Sur mobile un bouton \"Télécharger l'app\" convertit bien. Sur desktop change le texte par \"Essaie sur le web\" pour que les visiteurs desktop n'attendent pas un téléchargement.",
        },
        {
          name: "Mets un seul bouton HTML avec le smart link",
          text: "Remplace ton bloc à deux boutons par un seul <a href> pointant vers le smart link. Ajoute target=\"_blank\" si tu veux ouvrir la boutique dans un nouvel onglet.",
        },
        {
          name: "Mesure les clics du bouton",
          text: "Tous les clics arrivent au panel avec la source \"web\". Tu peux les comparer avec QR, Instagram, paid, etc.",
        },
        {
          name: "Fais des tests A/B sur le texte",
          text: "Crée un second smart link avec un texte ou design différent pour tester lequel convertit le plus de téléchargements.",
        },
      ],
    },
  },
  {
    id: "qr-physical-campaigns",
    icon: "Printer",
    accent: "from-amber-50 via-white to-white",
    relatedNiches: ["restaurants", "fitness", "agencies"],
    en: {
      slug: "use-qr-physical-campaigns",
      label: "Use a QR in physical campaigns",
      metaTitle: "How to use a QR code to drive app downloads in physical campaigns",
      metaDescription: "Use one smart QR for posters, packaging, retail and events. Track scans separately and route each to App Store, Google Play or your site.",
      h1: "How to use a QR to drive app downloads in physical campaigns",
      eyebrow: "Physical QR",
      intro: "You already have a smart link. Now you need to print it as a QR and put it where it converts. This guide walks you through placement, sizing, copy and measurement for retail, events, packaging and OOH.",
      problem: "Printing a QR that points to a single store URL means iOS or Android users walk away. A smart QR is the only one that works for any phone.",
      totalTime: "PT6M",
      steps: [
        {
          name: "Download your QR in high resolution",
          text: "From the dashboard, download the QR for your smart link in PNG at the highest resolution available. The same QR will be printed everywhere.",
        },
        {
          name: "Pick the right minimum size",
          text: "For posters or signage, keep the QR at least 4×4 cm visible. For packaging or small flyers, 2.5×2.5 cm. Smaller QR codes fail to scan from a distance.",
        },
        {
          name: "Add a clear call to action next to the QR",
          text: "\"Scan to download the app\" works better than \"Scan me\". Keep it short and put it above or below the QR, never inside.",
        },
        {
          name: "Place one QR per campaign",
          text: "Use a different smart link (and therefore a different QR) for each campaign – retail vs events vs influencer drops – so each channel is tracked separately.",
        },
        {
          name: "Measure scans in your dashboard",
          text: "Every QR scan is counted with source \"qr\". You'll see how many scans turned into App Store and Google Play traffic per location or campaign.",
        },
      ],
    },
    es: {
      slug: "usar-qr-campanas-fisicas",
      label: "Usar un QR en campañas físicas",
      metaTitle: "Cómo usar un QR para descargar apps en campañas físicas",
      metaDescription: "Un QR inteligente para carteles, packaging, retail y eventos. Mide escaneos por separado y manda a cada uno a App Store, Google Play o tu web.",
      h1: "Cómo usar un QR para descargar apps en campañas físicas",
      eyebrow: "QR físico",
      intro: "Ya tienes tu smart link. Ahora hay que imprimirlo como QR y colocarlo donde convierta. Esta guía te lleva por colocación, tamaño, copy y medición para retail, eventos, packaging y OOH.",
      problem: "Imprimir un QR que apunta a una sola URL de tienda significa que iOS o Android se quedan fuera. Un QR inteligente es el único que funciona para cualquier móvil.",
      totalTime: "PT6M",
      steps: [
        {
          name: "Descarga tu QR en alta resolución",
          text: "Desde el panel, descarga el QR de tu smart link en PNG a la mayor resolución posible. Ese mismo QR se imprimirá en todos los soportes.",
        },
        {
          name: "Elige el tamaño mínimo correcto",
          text: "En carteles o señalización, mantén el QR visible a al menos 4×4 cm. En packaging o flyers pequeños, 2.5×2.5 cm. QRs más pequeños fallan al escanearse desde distancia.",
        },
        {
          name: "Añade un call to action claro al lado",
          text: "\"Escanea para descargar la app\" funciona mejor que \"Escanéame\". Mantenlo corto y ponlo encima o debajo del QR, nunca dentro.",
        },
        {
          name: "Un QR por campaña",
          text: "Usa un smart link distinto (y por tanto un QR distinto) para cada campaña – retail vs eventos vs influencers – para que cada canal se mida por separado.",
        },
        {
          name: "Mide los escaneos en el panel",
          text: "Cada escaneo se cuenta con fuente \"qr\". Verás cuántos escaneos se convirtieron en tráfico hacia App Store y Google Play por ubicación o campaña.",
        },
      ],
    },
    fr: {
      slug: "utiliser-qr-campagnes-physiques",
      label: "Utiliser un QR en campagnes physiques",
      metaTitle: "Comment utiliser un QR pour télécharger des apps en campagnes physiques",
      metaDescription: "Un QR intelligent pour affiches, packaging, retail et events. Mesure les scans séparément et envoie chacun vers App Store, Google Play ou ton site.",
      h1: "Comment utiliser un QR pour télécharger des apps en campagnes physiques",
      eyebrow: "QR physique",
      intro: "Tu as déjà ton smart link. Maintenant il faut l'imprimer comme QR et le placer où il convertit. Ce guide te montre placement, taille, texte et mesure pour retail, events, packaging et OOH.",
      problem: "Imprimer un QR qui pointe vers une seule URL de boutique laisse iOS ou Android dehors. Un QR intelligent est le seul qui marche pour tout mobile.",
      totalTime: "PT6M",
      steps: [
        {
          name: "Télécharge ton QR en haute résolution",
          text: "Depuis le panel, télécharge le QR de ton smart link en PNG à la meilleure résolution. Le même QR sera imprimé sur tous les supports.",
        },
        {
          name: "Choisis la bonne taille minimum",
          text: "Pour affiches ou signalétique, garde le QR visible à au moins 4×4 cm. Pour packaging ou petits flyers, 2.5×2.5 cm. Des QR plus petits échouent au scan à distance.",
        },
        {
          name: "Ajoute un call to action clair à côté",
          text: "\"Scanne pour télécharger l'app\" marche mieux que \"Scanne-moi\". Reste court et place-le au-dessus ou en dessous du QR, jamais dedans.",
        },
        {
          name: "Un QR par campagne",
          text: "Utilise un smart link différent (et donc un QR différent) pour chaque campagne – retail vs events vs influenceurs – pour que chaque canal soit mesuré séparément.",
        },
        {
          name: "Mesure les scans dans le panel",
          text: "Chaque scan compte avec la source \"qr\". Tu verras combien de scans se sont convertis en trafic vers App Store et Google Play par lieu ou campagne.",
        },
      ],
    },
  },
];
