export const weeklyBlogQrAppLocales = {
  es: {
    title: "Codigo QR app: como llevar usuarios a App Store y Google Play",
    excerpt: "Aprende a crear un codigo QR para tu app que detecte el dispositivo, envie a cada usuario a la tienda correcta y mida clics sin prometer atribucion que no puedes demostrar.",
    category: "QR para apps",
    readTime: "9 min",
    introduction: [
      "Un codigo QR app sirve para que una persona escanee desde un cartel, packaging, evento, escaparate o folleto y llegue directamente al destino correcto para instalar tu aplicacion. La clave no es generar cualquier QR, sino conectarlo a un enlace inteligente que detecte iOS, Android o escritorio, mantenga una pagina de respaldo y separe los clics por campaña. Asi evitas pedir al usuario que elija tienda manualmente y tambien evitas mezclar datos de canales diferentes.",
      "El error habitual es tratar el QR como una imagen fija. Para una app, el QR debe ser una puerta controlada: un unico codigo impreso, una URL que puedas actualizar, reglas claras por dispositivo y medicion honesta. Si cambias la ficha, lanzas una promocion o necesitas separar una feria de una campaña de creadores, no deberias reimprimir todo. Deberias ajustar el destino del enlace y conservar la lectura por fuente.",
    ],
    sections: [
      {
        heading: "Que problema resuelve un codigo QR app",
        blocks: [
          {
            type: "paragraph",
            text: "Un QR para apps conecta un momento fisico con una accion digital. La persona puede estar delante de una caja, una mesa de restaurante, un expositor, una pantalla de conferencia o una tarjeta de visita. En ese contexto no quiere buscar el nombre de la app, decidir si entra en App Store o Google Play, revisar resultados parecidos y confirmar que ha elegido la ficha correcta. Quiere escanear y continuar.",
          },
          {
            type: "bullets",
            items: [
              "Reduce friccion cuando la descarga nace fuera de una web o de un anuncio online.",
              "Evita imprimir dos codigos distintos para iOS y Android en el mismo soporte.",
              "Permite cambiar el destino sin reemplazar el material fisico cuando usas una URL intermedia.",
              "Separa clics por feria, tienda, packaging, creador, cartel o colaborador.",
              "Da una experiencia de respaldo a usuarios de escritorio, tablets o dispositivos no compatibles.",
            ],
          },
          {
            type: "callout",
            title: "La idea central",
            text: "El QR no deberia decidir todo por si solo. Su trabajo es abrir una URL estable. La inteligencia debe vivir en el enlace que enruta, mide y se puede editar sin volver a imprimir."
          },
        ],
      },
      {
        heading: "Como debe funcionar el QR para descargar una app",
        blocks: [
          {
            type: "paragraph",
            text: "El flujo correcto empieza antes de generar la imagen. Primero define una URL unica para la campaña o soporte. Esa URL debe revisar el dispositivo y enviar a App Store si la visita llega desde iPhone o iPad, a Google Play si llega desde Android y a una pagina informativa si llega desde escritorio. La pagina de respaldo puede explicar el valor de la app, mostrar ambos botones de tienda y conservar el mismo mensaje de la campaña.",
          },
          {
            type: "heading",
            text: "Un unico QR, varios destinos",
          },
          {
            type: "paragraph",
            text: "No necesitas imprimir un QR para cada sistema operativo. Un enlace inteligente puede usar un unico QR y resolver el destino compatible en el momento del clic. Esto es especialmente util en packaging, escaparates y material offline, donde no sabes que dispositivo escaneara cada persona.",
          },
          {
            type: "heading",
            text: "Una URL editable",
          },
          {
            type: "paragraph",
            text: "Si el QR apunta directamente a una tienda, queda rigido. Si lo conectas a una URL intermedia, puedes cambiar parametros, destino, pagina de respaldo o etiquetado de campaña sin tocar el soporte impreso. La URL no debe romperse cuando cambie una promocion o cuando quieras actualizar el mensaje.",
          },
          {
            type: "heading",
            text: "Medicion sin exagerar",
          },
          {
            type: "paragraph",
            text: "Puedes medir escaneos o clics observados por fuente, dispositivo y fecha. Eso no significa que puedas atribuir cada instalacion al QR si no existe una union verificable entre el clic y la instalacion en tu sistema de analitica. La medicion sirve para comparar interes y detectar canales utiles, pero conviene separar clics, visitas a tienda e instalaciones confirmadas.",
          },
        ],
      },
      {
        heading: "Plan paso a paso para crear un codigo QR app",
        blocks: [
          {
            type: "steps",
            items: [
              {
                title: "Define el caso de uso",
                text: "No es lo mismo un QR en packaging permanente que un cartel para un evento de dos dias. El caso determina nombre de campaña, destino, mensaje y vida util."
              },
              {
                title: "Crea un enlace por fuente",
                text: "Usa una URL distinta para cada canal que luego quieras comparar: escaparate, flyer, colaborador, creador, evento o lote de producto."
              },
              {
                title: "Configura destinos por dispositivo",
                text: "Envia iOS a App Store, Android a Google Play y escritorio a una pagina con ambos botones. Revisa tambien tablets y navegadores integrados en redes sociales."
              },
              {
                title: "Mantén una pagina de respaldo",
                text: "La pagina debe repetir la promesa del QR, explicar la app en una frase y ofrecer rutas claras. No la conviertas en una landing generica sin contexto."
              },
              {
                title: "Genera y prueba el QR",
                text: "Escanealo desde iPhone, Android, una app de camara, un navegador de escritorio y, si aplica, desde la aplicacion donde se vera el material."
              },
              {
                title: "Imprime con margen y contraste",
                text: "Deja zona blanca alrededor, evita fondos con demasiado ruido y prueba el tamaño real desde la distancia a la que se escaneara."
              },
              {
                title: "Revisa los datos por separado",
                text: "Mira clics, dispositivo, fuente y periodo. Compara con datos de tiendas, pero no mezcles metricas como si fueran la misma conversion."
              },
            ],
          },
          {
            type: "paragraph",
            text: "El paso mas importante es crear un enlace por fuente. Si usas el mismo QR en un cartel, una caja y una colaboracion, despues solo sabras que el conjunto genero actividad. No sabras que material merecia repetirse ni cual necesitaba otro mensaje.",
          },
        ],
      },
      {
        heading: "Ejemplos utiles de QR para apps",
        blocks: [
          {
            type: "bullets",
            items: [
              "Retail: un QR junto al producto abre la app de fidelizacion y etiqueta el clic como tienda fisica.",
              "Restauracion: un QR en la mesa abre la app de pedidos, reservas o puntos, con una pagina de respaldo para escritorio.",
              "Eventos: cada stand o charla usa un enlace distinto para saber donde hubo mas interes real.",
              "Packaging: el QR impreso en la caja envia a instalar la app de soporte, registro o recompra sin depender de una busqueda manual.",
              "Creadores: cada colaborador comparte un QR o enlace propio, de modo que se comparan clics sin afirmar instalaciones no demostradas.",
              "Soporte: un QR en instrucciones impresas lleva a la app correcta y puede cambiar si la URL de tienda o el onboarding se actualizan.",
            ],
          },
          {
            type: "link",
            text: "Si tambien estas optimizando la ficha de tienda, combina esta ruta con la guia de ",
            label: "App Store Optimization",
            to: "/blog/app-store-optimization-aso-guia",
            after: " para que el mensaje del QR y la ficha cuenten la misma historia."
          },
          {
            type: "callout",
            title: "Ejemplo practico",
            text: "Una marca imprime un QR en 20.000 cajas. El codigo apunta a un enlace editable llamado packaging-verano. Si cambia la promocion o se detecta que muchos usuarios llegan desde Android, puede ajustar destino y mensaje sin reimprimir las cajas."
          },
        ],
      },
      {
        heading: "Que medir en una campaña con QR app",
        blocks: [
          {
            type: "paragraph",
            text: "La medicion util empieza con nombres limpios. Cada QR deberia tener una fuente reconocible, una campaña y, si hace falta, una variante. Despues puedes leer clics por dispositivo, fecha y canal. Esa informacion ayuda a decidir que soportes generan interes y donde hay problemas de continuidad.",
          },
          {
            type: "bullets",
            items: [
              "Clics o escaneos observados por QR.",
              "Dispositivo detectado y destino elegido.",
              "Porcentaje de usuarios enviados a cada tienda o a la pagina de respaldo.",
              "Comparacion temporal antes y despues de cambiar mensaje o ubicacion.",
              "Coincidencia general con visitas o instalaciones reportadas por las consolas de tienda.",
            ],
          },
          {
            type: "link",
            text: "Para no mezclar conceptos, revisa tambien la guia de ",
            label: "atribucion de descargas por canal",
            to: "/blog/atribucion-descargas-apps-medir-canal-real",
            after: ". Un clic de QR es una señal propia; una instalacion atribuida requiere una conexion de datos mas fuerte."
          },
        ],
      },
      {
        heading: "Errores frecuentes al usar QR para apps",
        blocks: [
          {
            type: "bullets",
            items: [
              "Apuntar el QR directamente a una tienda y perder la posibilidad de editar destino.",
              "Usar el mismo QR para todos los canales y despues intentar comparar resultados.",
              "No probar iOS, Android, escritorio y navegadores integrados antes de imprimir.",
              "Diseñar un QR demasiado pequeño, sin contraste o colocado en una superficie dificil de escanear.",
              "Enviar a una landing que no repite la promesa del cartel o del packaging.",
              "Prometer atribucion de instalaciones cuando solo se midieron clics.",
              "Olvidar que el material impreso puede durar mas que una promocion temporal.",
            ],
          },
          {
            type: "paragraph",
            text: "Un QR mal planificado no solo pierde clics: tambien destruye aprendizaje. Si no sabes de donde vino cada escaneo, no puedes decidir que soporte merece mas presupuesto. Si el destino no coincide con el dispositivo, conviertes una intencion clara en una tarea manual.",
          },
        ],
      },
    ],
    faqTitle: "Preguntas frecuentes sobre codigos QR para apps",
    faq: [
      {
        question: "¿Necesito un QR para App Store y otro para Google Play?",
        answer: "No necesariamente. Lo recomendable es usar un unico QR conectado a un enlace inteligente que detecte el dispositivo y envie a cada usuario al destino compatible."
      },
      {
        question: "¿Puedo cambiar el destino despues de imprimir el QR?",
        answer: "Si el QR apunta a una URL editable, si. Si apunta directamente a App Store o Google Play, quedara ligado a ese destino y tendras que generar e imprimir otro codigo para cambiarlo."
      },
      {
        question: "¿Un escaneo equivale a una instalacion?",
        answer: "No. Un escaneo o clic indica interes y llegada al enlace. La instalacion requiere datos de tienda o analitica de app, y solo debe atribuirse al QR cuando exista una conexion verificable."
      },
      {
        question: "¿Que destino uso para usuarios de escritorio?",
        answer: "Usa una pagina de respaldo con la propuesta de la app y botones claros para App Store y Google Play. Tambien puedes incluir instrucciones para continuar desde el movil."
      },
      {
        question: "¿Como evito mezclar datos de varios soportes?",
        answer: "Crea un enlace y un QR por fuente importante. Aunque visualmente se parezcan, cada soporte debe tener una URL propia si quieres comparar resultados."
      },
    ],
    cta: {
      title: "Crea un QR que envie a cada usuario a la tienda correcta",
      text: "Genera un enlace para tu app, conectalo a tu QR y separa clics por campaña, canal o colaborador sin reimprimir cada cambio.",
      label: "Crear mi enlace de app"
    },
  },
  en: {
    title: "App QR code: send users to the right app store",
    excerpt: "Learn how to create an app QR code that detects device type, routes each user to App Store or Google Play, and measures clicks without overstating attribution.",
    category: "App QR",
    readTime: "9 min",
    introduction: [
      "An app QR code helps someone scan from packaging, a poster, an event booth, a shop window or a printed insert and land on the right destination to install your app. The goal is not just to generate a square code. The goal is to connect that QR to a smart link that detects iOS, Android or desktop, keeps a fallback page, and separates clicks by campaign. That removes the need for users to choose a store manually and prevents different channels from being mixed in one data bucket.",
      "The common mistake is treating the QR as a static image. For an app, the QR should be a controlled doorway: one printed code, one editable URL, clear device rules and honest measurement. If you change your store listing, run a promotion or need to separate an event from a creator campaign, you should not have to reprint everything. You should update the link destination and keep source-level reporting intact.",
    ],
    sections: [
      {
        heading: "What an app QR code solves",
        blocks: [
          { type: "paragraph", text: "A QR code for apps connects a physical moment with a digital action. The user may be looking at a box, a restaurant table, a display, a conference screen or a business card. In that setting they do not want to search for the app name, choose between App Store and Google Play, scan similar results and hope they opened the right listing. They want to scan and continue." },
          { type: "bullets", items: ["It reduces friction when a download starts outside the web or an online ad.", "It avoids printing separate iOS and Android codes on the same material.", "It lets you change destinations without replacing physical assets when an intermediate URL is used.", "It separates clicks by event, shop, package, creator, poster or partner.", "It gives desktop, tablet and unsupported devices a clear fallback experience."] },
          { type: "callout", title: "The core idea", text: "The QR code should not hold all the logic. Its job is to open a stable URL. Routing, measurement and edits should live in the link behind it." },
        ],
      },
      {
        heading: "How a QR code for app downloads should work",
        blocks: [
          { type: "paragraph", text: "The right flow starts before the image is generated. First, create one URL for the campaign or asset. That URL should detect the device and send iPhone or iPad users to the App Store, Android users to Google Play, and desktop users to an explanatory page. The fallback page can repeat the campaign promise, show both store buttons and keep the experience consistent." },
          { type: "heading", text: "One QR code, several destinations" },
          { type: "paragraph", text: "You do not need to print one QR code for each operating system. A smart link can use a single QR and resolve the compatible destination at click time. This matters most on packaging, posters and offline material, where you do not know which phone will scan the code." },
          { type: "heading", text: "An editable URL" },
          { type: "paragraph", text: "A QR that points directly to a store is rigid. A QR connected to an intermediate URL can have its parameters, destination, fallback page or campaign labels updated without changing the printed asset. The URL should survive promotion changes and future messaging updates." },
          { type: "heading", text: "Measurement without exaggeration" },
          { type: "paragraph", text: "You can measure observed scans or clicks by source, device and date. That does not mean every install can be attributed to the QR unless your analytics setup creates a verifiable connection between click and install. Use the data to compare interest, not to claim certainty you do not have." },
        ],
      },
      {
        heading: "Step-by-step plan for an app QR code",
        blocks: [
          { type: "steps", items: [
            { title: "Define the use case", text: "A permanent packaging QR is different from an event poster. The use case defines campaign name, destination, message and expected lifetime." },
            { title: "Create one link per source", text: "Use a separate URL for each channel you want to compare: shop window, flyer, partner, creator, event or product batch." },
            { title: "Set destinations by device", text: "Route iOS to App Store, Android to Google Play and desktop to a page with both buttons. Test tablets and in-app browsers too." },
            { title: "Keep a fallback page", text: "The page should repeat the QR promise, explain the app in one sentence and give clear routes. Do not send users to a generic landing page." },
            { title: "Generate and test the QR", text: "Scan it from iPhone, Android, a camera app, desktop and the app where the material may be viewed." },
            { title: "Print with margin and contrast", text: "Leave quiet space around the code, avoid noisy backgrounds and test the real size from the expected scanning distance." },
            { title: "Read data separately", text: "Review clicks, device, source and period. Compare with store data, but do not merge different metrics as if they were the same conversion." }
          ] },
          { type: "paragraph", text: "The most important step is using one link per source. If the same QR appears on a poster, a box and a partnership, you will only know the group created activity. You will not know which asset deserves repeating." },
        ],
      },
      {
        heading: "Useful app QR examples",
        blocks: [
          { type: "bullets", items: ["Retail: a code next to the product opens the loyalty app and labels the click as in-store.", "Restaurants: a table QR opens the ordering, booking or points app with a fallback page for desktop.", "Events: each booth or talk has a distinct link so interest can be compared.", "Packaging: the box QR sends users to support, registration or repurchase flows without a manual search.", "Creators: each collaborator gets a separate QR or link, so clicks are compared without making unsupported install claims.", "Support: printed instructions can point to the right app and stay editable if onboarding changes."] },
          { type: "link", text: "If you are also improving the store listing, combine this route with the ", label: "App Store Optimization", to: "/blog/app-store-optimization-aso-guia", after: " guide so the QR message and listing tell the same story." },
          { type: "callout", title: "Practical example", text: "A brand prints one QR on 20,000 boxes. The code points to an editable link named summer-packaging. If the promotion changes or Android traffic behaves differently, the destination and message can be adjusted without reprinting the boxes." },
        ],
      },
      {
        heading: "What to measure in an app QR campaign",
        blocks: [
          { type: "paragraph", text: "Useful measurement starts with clean naming. Each QR should have a recognizable source, campaign and optional variant. Then you can read clicks by device, date and channel. This helps decide which assets create interest and where continuity breaks." },
          { type: "bullets", items: ["Observed clicks or scans per QR.", "Detected device and selected destination.", "Share of users sent to each store or fallback page.", "Before-and-after comparison when message or placement changes.", "Broad comparison with store visits or installs reported by the app stores."] },
          { type: "link", text: "To avoid mixing concepts, read the guide to ", label: "app download attribution by channel", to: "/blog/atribucion-descargas-apps-medir-canal-real", after: ". A QR click is your own signal; an attributed install requires stronger data." },
        ],
      },
      {
        heading: "Common mistakes with app QR codes",
        blocks: [
          { type: "bullets", items: ["Pointing the QR directly at one store and losing the ability to edit.", "Using the same QR for every channel and trying to compare results later.", "Skipping iOS, Android, desktop and in-app browser tests before printing.", "Designing a code that is too small, low-contrast or placed on a hard-to-scan surface.", "Sending users to a page that does not repeat the promise on the poster or package.", "Claiming install attribution when only clicks were measured.", "Forgetting that printed material can outlive a temporary promotion."] },
          { type: "paragraph", text: "A poorly planned QR does more than lose clicks. It removes your ability to learn. If you do not know where each scan came from, you cannot decide which asset deserves budget. If the destination does not match the device, clear intent becomes manual work." },
        ],
      },
    ],
    faqTitle: "FAQ about app QR codes",
    faq: [
      { question: "Do I need one QR for App Store and another for Google Play?", answer: "Not usually. A single QR connected to a smart link can detect the device and send each user to the compatible destination." },
      { question: "Can I change the destination after printing?", answer: "Yes, if the QR points to an editable URL. If it points directly to App Store or Google Play, changing the destination requires a new code." },
      { question: "Does a scan equal an install?", answer: "No. A scan or click shows interest. Installation requires store or app analytics data, and should only be attributed to the QR when the connection is verifiable." },
      { question: "What should desktop users see?", answer: "Use a fallback page with the app promise and clear App Store and Google Play buttons. You can also explain how to continue from mobile." },
      { question: "How do I avoid mixing several placements?", answer: "Create one link and QR per important source. If you want to compare results, each asset needs its own URL." },
    ],
    cta: {
      title: "Create a QR that sends each user to the right store",
      text: "Build one app link, connect it to your QR code and separate clicks by campaign, channel or partner without reprinting every change.",
      label: "Create my app link"
    },
  },
  fr: {
    title: "QR code d'app : envoyer chaque utilisateur vers le bon store",
    excerpt: "Creez un QR code pour votre app qui detecte l'appareil, dirige vers l'App Store ou Google Play et mesure les clics sans promettre une attribution impossible a prouver.",
    category: "QR pour apps",
    readTime: "9 min",
    introduction: [
      "Un QR code d'app permet a une personne de scanner un support physique - emballage, affiche, salon, vitrine ou flyer - et d'arriver au bon endroit pour installer votre application. L'objectif n'est pas seulement de produire un code. Il faut le relier a un lien intelligent qui reconnait iOS, Android ou ordinateur, garde une page de secours et distingue les clics par campagne.",
      "L'erreur frequente consiste a traiter le QR comme une image figee. Pour une app, il doit etre une entree controlee : un seul code imprime, une URL modifiable, des regles par appareil et une mesure honnete. Si la fiche store change, si une offre evolue ou si vous devez separer un evenement d'une campagne createur, le lien doit pouvoir changer sans tout reimprimer.",
    ],
    sections: [
      { heading: "Le probleme resolu par un QR code d'app", blocks: [
        { type: "paragraph", text: "Un QR pour app relie un moment physique a une action numerique. La personne peut etre devant une boite, une table, un stand ou une carte de visite. Dans ce contexte, elle ne veut pas chercher le nom de l'app, choisir un store, comparer des resultats proches et verifier qu'elle ouvre la bonne fiche. Elle veut scanner et continuer." },
        { type: "bullets", items: ["Moins de friction quand le telechargement commence hors ligne.", "Un seul code au lieu de deux codes iOS et Android.", "Un destination modifiable lorsque l'URL intermediaire est editable.", "Des clics separes par salon, magasin, packaging, createur ou partenaire.", "Une page de secours claire pour ordinateur, tablette ou appareil non compatible."] },
        { type: "callout", title: "L'idee centrale", text: "Le QR ne doit pas contenir toute la logique. Il ouvre une URL stable; le routage, la mesure et les modifications vivent derriere ce lien." },
      ] },
      { heading: "Comment le QR de telechargement doit fonctionner", blocks: [
        { type: "paragraph", text: "Le bon flux commence avant la creation de l'image. Creez d'abord une URL pour le support ou la campagne. Cette URL detecte l'appareil : iPhone et iPad vers l'App Store, Android vers Google Play, ordinateur vers une page explicative avec les deux boutons." },
        { type: "heading", text: "Un seul QR, plusieurs destinations" },
        { type: "paragraph", text: "Il n'est pas necessaire d'imprimer un QR par systeme. Un lien intelligent resout la destination compatible au moment du clic. C'est utile pour le packaging et les affiches, ou l'on ne connait pas le telephone utilise." },
        { type: "heading", text: "Une URL editable" },
        { type: "paragraph", text: "Un QR qui pointe directement vers un store est rigide. Avec une URL intermediaire, vous pouvez changer destination, parametres, page de secours ou etiquettes de campagne sans modifier le support imprime." },
        { type: "heading", text: "Une mesure sans exageration" },
        { type: "paragraph", text: "Vous pouvez mesurer les scans ou clics observes par source, appareil et date. Cela ne prouve pas chaque installation si votre systeme ne relie pas clic et installation de facon verifiable. Utilisez ces donnees pour comparer l'interet, pas pour promettre une certitude absente." },
      ] },
      { heading: "Plan etapes par etapes", blocks: [
        { type: "steps", items: [
          { title: "Definir le cas d'usage", text: "Un QR permanent sur un emballage n'a pas le meme role qu'une affiche de salon." },
          { title: "Creer un lien par source", text: "Separez vitrine, flyer, createur, partenaire, evenement ou lot produit." },
          { title: "Configurer les destinations", text: "iOS vers App Store, Android vers Google Play, ordinateur vers une page avec les deux choix." },
          { title: "Conserver une page de secours", text: "Elle doit reprendre la promesse du QR et offrir des chemins clairs." },
          { title: "Tester avant impression", text: "Scannez depuis iPhone, Android, camera native, navigateur et applications integrees." },
          { title: "Imprimer avec contraste", text: "Gardez une marge blanche, un bon contraste et une taille adaptee a la distance." },
          { title: "Lire les donnees separement", text: "Comparez clics, appareil, source et periode sans confondre clic et installation." }
        ] },
        { type: "paragraph", text: "Le lien par source est essentiel. Si le meme QR apparait partout, vous saurez seulement qu'il y a eu de l'activite globale, pas quel support a vraiment fonctionne." },
      ] },
      { heading: "Exemples utiles", blocks: [
        { type: "bullets", items: ["Retail : le QR pres du produit ouvre l'app de fidelite.", "Restaurant : le QR de table ouvre commandes, reservations ou points.", "Evenement : chaque stand possede un lien different.", "Packaging : le QR de la boite envoie vers support, enregistrement ou rachat.", "Createurs : chaque collaborateur a son QR pour comparer les clics.", "Support : les notices imprimees restent modifiables si l'onboarding change."] },
        { type: "link", text: "Si la fiche store est aussi en cours d'optimisation, combinez cette route avec la guide ", label: "App Store Optimization", to: "/blog/app-store-optimization-aso-guia", after: " afin que le QR et la fiche racontent la meme promesse." },
        { type: "callout", title: "Exemple pratique", text: "Une marque imprime un QR sur 20 000 boites. Le code pointe vers un lien packaging-ete. Si la promotion change, le message et la destination changent sans reimpression." },
      ] },
      { heading: "Ce qu'il faut mesurer", blocks: [
        { type: "paragraph", text: "Une mesure utile commence par des noms propres : source, campagne et variante. Vous pouvez ensuite lire les clics par appareil, date et canal pour comprendre ou l'interet apparait et ou la continuite se casse." },
        { type: "bullets", items: ["Clics ou scans observes par QR.", "Appareil detecte et destination choisie.", "Part envoyee vers chaque store ou page de secours.", "Comparaison avant/apres un changement de message.", "Lecture prudente avec les visites ou installations des stores."] },
        { type: "link", text: "Pour eviter les melanges, consultez aussi la guide d'", label: "attribution des telechargements par canal", to: "/blog/atribucion-descargas-apps-medir-canal-real", after: ". Un clic QR est un signal; une installation attribuee demande une preuve plus forte." },
      ] },
      { heading: "Erreurs frequentes", blocks: [
        { type: "bullets", items: ["Pointer directement vers un store et perdre l'edition.", "Utiliser le meme QR pour tous les canaux.", "Ne pas tester iOS, Android, ordinateur et navigateurs integres.", "Dessiner un code trop petit ou peu contraste.", "Envoyer vers une page qui ne reprend pas la promesse imprimee.", "Presenter des clics comme des installations attribuees.", "Oublier que l'imprime dure parfois plus longtemps qu'une promotion."] },
        { type: "paragraph", text: "Un QR mal planifie fait perdre plus que des clics : il empeche d'apprendre. Sans source distincte, impossible de savoir quel support merite plus de budget." },
      ] },
    ],
    faqTitle: "Questions frequentes sur les QR codes d'app",
    faq: [
      { question: "Faut-il un QR pour l'App Store et un autre pour Google Play ?", answer: "Pas forcement. Un QR unique connecte a un lien intelligent peut detecter l'appareil et envoyer vers la bonne destination." },
      { question: "Puis-je changer le lien apres impression ?", answer: "Oui si le QR ouvre une URL editable. Non s'il pointe directement vers le store." },
      { question: "Un scan vaut-il une installation ?", answer: "Non. Un scan indique un interet. L'installation exige des donnees store ou app et une connexion verifiable." },
      { question: "Que doivent voir les utilisateurs sur ordinateur ?", answer: "Une page de secours avec la promesse de l'app, les deux boutons store et des instructions simples." },
      { question: "Comment eviter de melanger les supports ?", answer: "Creez un lien et un QR par source importante lorsque vous voulez comparer les resultats." },
    ],
    cta: { title: "Creez un QR qui envoie vers le bon store", text: "Construisez un lien d'app, connectez-le a votre QR et separez les clics par campagne, canal ou partenaire.", label: "Creer mon lien d'app" },
  },
  ja: {
    title: "アプリ用QRコード: 正しいストアへ案内する方法",
    excerpt: "端末を判定し、App StoreまたはGoogle Playへ自然に送るアプリ用QRコードの作り方と、過剰なアトリビューションを避けた計測方法を解説します。",
    category: "アプリQR",
    readTime: "9分",
    introduction: [
      "アプリ用QRコードは、パッケージ、ポスター、イベント、店舗、紙の案内からスキャンした人を、インストールに適した場所へ連れて行くための入口です。大切なのは単にQR画像を作ることではありません。iOS、Android、デスクトップを判定するスマートリンクに接続し、フォールバックページを用意し、キャンペーン別にクリックを分けることです。",
      "よくある失敗は、QRを固定された画像として扱うことです。アプリの場合、QRは管理できる導線であるべきです。印刷するコードはひとつ、背後のURLは編集可能、端末ごとのルールは明確、計測は誠実に行う。ストア掲載やキャンペーンが変わっても、印刷物を作り直さずリンク側を更新できる状態が理想です。",
    ],
    sections: [
      { heading: "アプリ用QRコードが解決すること", blocks: [
        { type: "paragraph", text: "QRは物理的な接点をデジタルの行動につなげます。ユーザーは箱、テーブル、展示台、講演スライド、名刺を見ているかもしれません。その場でアプリ名を検索し、ストアを選び、似た結果から正しいものを探す作業は負担です。スキャンしてそのまま進めることが価値です。" },
        { type: "bullets", items: ["Web広告以外から始まるダウンロードの摩擦を減らします。", "iOS用とAndroid用の2つのQRを同じ紙面に置く必要を減らします。", "中間URLを使えば印刷物を変えずに遷移先を更新できます。", "イベント、店舗、パッケージ、クリエイター、ポスター別にクリックを分けられます。", "デスクトップや非対応端末にも代替ページを見せられます。"] },
        { type: "callout", title: "基本の考え方", text: "QR自体にすべてのロジックを持たせる必要はありません。QRは安定したURLを開き、振り分け、計測、編集はそのリンク側で行います。" },
      ] },
      { heading: "アプリダウンロード用QRの正しい動き", blocks: [
        { type: "paragraph", text: "正しい流れは画像を生成する前に始まります。まずキャンペーンや印刷物ごとにURLを作ります。そのURLが端末を判定し、iPhoneやiPadならApp Store、AndroidならGoogle Play、デスクトップなら説明ページに送ります。説明ページにはアプリの価値と両方のストアボタンを置きます。" },
        { type: "heading", text: "ひとつのQRで複数の行き先" },
        { type: "paragraph", text: "OSごとにQRを印刷する必要はありません。スマートリンクなら、同じQRからクリック時に適切な行き先を選べます。どの端末でスキャンされるかわからないパッケージや店頭では特に重要です。" },
        { type: "heading", text: "編集できるURL" },
        { type: "paragraph", text: "QRが直接ストアに向いていると変更が難しくなります。中間URLに接続しておけば、遷移先、パラメータ、フォールバックページ、キャンペーン名を印刷後でも調整できます。" },
        { type: "heading", text: "誇張しない計測" },
        { type: "paragraph", text: "ソース、端末、日付ごとのスキャンやクリックは計測できます。ただし、クリックとインストールを検証可能に結びつける仕組みがなければ、すべてのインストールをQRの成果とは言えません。関心の比較とアトリビューションは分けて扱います。" },
      ] },
      { heading: "作成手順", blocks: [
        { type: "steps", items: [
          { title: "用途を決める", text: "長く使うパッケージQRと数日間のイベントQRでは、名前、導線、メッセージが変わります。" },
          { title: "ソースごとにリンクを分ける", text: "店頭、チラシ、クリエイター、イベント、商品ロットなど、比較したい単位でURLを作ります。" },
          { title: "端末別の遷移先を設定する", text: "iOSはApp Store、AndroidはGoogle Play、デスクトップは両方のボタンがあるページへ送ります。" },
          { title: "フォールバックを用意する", text: "QRの約束と同じ内容を短く伝え、次の行動を迷わせないページにします。" },
          { title: "印刷前にテストする", text: "iPhone、Android、カメラアプリ、ブラウザ、アプリ内ブラウザで確認します。" },
          { title: "余白とコントラストを確保する", text: "周囲に余白を取り、背景を複雑にせず、実際の距離から読めるサイズにします。" },
          { title: "データを分けて読む", text: "クリック、端末、ソース、期間を分け、ストアの数値と同一視しないようにします。" }
        ] },
        { type: "paragraph", text: "最も大事なのはソースごとにリンクを分けることです。同じQRをポスター、箱、提携先で使うと、全体の反応しかわからず、どの施策を続けるべきか判断できません。" },
      ] },
      { heading: "活用例", blocks: [
        { type: "bullets", items: ["小売: 商品横のQRからロイヤルティアプリへ誘導します。", "飲食: テーブルのQRから注文、予約、ポイントアプリへ誘導します。", "イベント: ブースやセッションごとに別リンクを使います。", "パッケージ: サポート、登録、再購入のためのアプリに案内します。", "クリエイター: 協力者ごとにQRを分け、クリックを比較します。", "サポート: 印刷された説明書から正しいアプリへ誘導し、後から導線を更新できます。"] },
        { type: "link", text: "ストア掲載も改善するなら、", label: "App Store Optimization", to: "/blog/app-store-optimization-aso-guia", after: " のガイドと組み合わせ、QRの約束とストアの見せ方を一致させます。" },
        { type: "callout", title: "実例", text: "あるブランドが2万個の箱にQRを印刷します。QRはsummer-packagingという編集可能なリンクへ向き、キャンペーンが変わっても箱を作り直さずにメッセージと遷移先を調整できます。" },
      ] },
      { heading: "計測すべきもの", blocks: [
        { type: "paragraph", text: "有用な計測は名前付けから始まります。各QRにソース、キャンペーン、必要ならバリエーションを持たせます。その上で端末、日付、チャネル別にクリックを読み、どこで関心が生まれ、どこで導線が弱いかを見ます。" },
        { type: "bullets", items: ["QRごとのクリックまたはスキャン。", "検出された端末と選ばれた遷移先。", "各ストアまたはフォールバックへ送られた割合。", "メッセージや配置変更前後の比較。", "ストアが報告する訪問やインストールとの慎重な比較。"] },
        { type: "link", text: "概念を混ぜないために、", label: "チャネル別アプリダウンロードのアトリビューション", to: "/blog/atribucion-descargas-apps-medir-canal-real", after: " も確認してください。QRクリックは自社の信号であり、インストールの帰属にはより強い接続が必要です。" },
      ] },
      { heading: "よくあるミス", blocks: [
        { type: "bullets", items: ["QRを直接ストアへ向け、後から編集できなくする。", "すべてのチャネルで同じQRを使い、後で比較できなくなる。", "iOS、Android、デスクトップ、アプリ内ブラウザを印刷前にテストしない。", "小さすぎる、コントラストが弱い、読み取りにくい場所へ置く。", "印刷物の約束と違うページへ送る。", "クリックしか測っていないのにインストールを帰属させる。", "印刷物が一時的なキャンペーンより長く残ることを忘れる。"] },
        { type: "paragraph", text: "設計の悪いQRはクリックを失うだけでなく、学習の機会も失います。どこからスキャンされたかわからなければ、次に投資すべき場所も判断できません。" },
      ] },
    ],
    faqTitle: "アプリ用QRコードのFAQ",
    faq: [
      { question: "App Store用とGoogle Play用に別々のQRが必要ですか？", answer: "通常は必要ありません。スマートリンクに接続したひとつのQRで端末を判定し、適切なストアへ送れます。" },
      { question: "印刷後に行き先を変えられますか？", answer: "QRが編集可能なURLを開くなら可能です。ストアへ直接向いている場合は新しいQRが必要です。" },
      { question: "スキャンはインストールと同じですか？", answer: "違います。スキャンやクリックは関心を示します。インストールの帰属にはストアまたはアプリ分析との検証可能な接続が必要です。" },
      { question: "デスクトップユーザーには何を見せるべきですか？", answer: "アプリの価値と両方のストアボタンを置いたフォールバックページを見せます。" },
      { question: "複数の掲載場所を混ぜない方法は？", answer: "重要なソースごとに別のリンクとQRを作ります。比較したいものには個別のURLが必要です。" },
    ],
    cta: { title: "正しいストアへ送るQRを作成", text: "アプリリンクを作り、QRに接続し、キャンペーンや協力者別にクリックを分けて管理しましょう。", label: "アプリリンクを作成" },
  },
  de: {
    title: "App-QR-Code: Nutzer zum richtigen Store schicken",
    excerpt: "So erstellst du einen QR-Code fuer deine App, der das Geraet erkennt, zu App Store oder Google Play routet und Klicks misst, ohne Attribution zu uebertreiben.",
    category: "App QR",
    readTime: "9 Min.",
    introduction: [
      "Ein App-QR-Code bringt Menschen von Verpackungen, Plakaten, Events, Schaufenstern oder Flyern direkt zum passenden Installationsziel. Es geht nicht darum, irgendeinen QR-Code zu erzeugen. Entscheidend ist ein Smart Link dahinter, der iOS, Android oder Desktop erkennt, eine Fallback-Seite bereithaelt und Klicks nach Kampagne trennt.",
      "Der typische Fehler ist, den QR-Code als starres Bild zu behandeln. Fuer Apps sollte er ein kontrollierter Einstieg sein: ein gedruckter Code, eine editierbare URL, klare Regeln je Geraet und ehrliche Messung. Wenn Listing, Promotion oder Kampagnenstruktur wechseln, sollte der Link angepasst werden koennen, ohne alles neu zu drucken.",
    ],
    sections: [
      { heading: "Welches Problem ein App-QR-Code loest", blocks: [
        { type: "paragraph", text: "Ein QR-Code fuer Apps verbindet einen physischen Moment mit einer digitalen Handlung. Nutzer stehen vor einer Box, einem Tisch, einem Messestand, einer Praesentation oder einer Visitenkarte. Dort wollen sie nicht nach dem App-Namen suchen, den Store waehlen und aehnliche Ergebnisse pruefen. Sie wollen scannen und weitermachen." },
        { type: "bullets", items: ["Er reduziert Reibung, wenn der Download offline beginnt.", "Er vermeidet zwei getrennte Codes fuer iOS und Android.", "Er erlaubt Zielaenderungen ohne neues Druckmaterial, wenn eine Zwischen-URL genutzt wird.", "Er trennt Klicks nach Event, Store, Verpackung, Creator, Plakat oder Partner.", "Er bietet Desktop, Tablet und nicht kompatiblen Geraeten eine klare Alternative."] },
        { type: "callout", title: "Der Kern", text: "Der QR-Code sollte nicht die ganze Logik tragen. Er oeffnet eine stabile URL; Routing, Messung und Aenderungen gehoeren in den Link dahinter." },
      ] },
      { heading: "Wie ein QR-Code fuer App-Downloads funktionieren sollte", blocks: [
        { type: "paragraph", text: "Der richtige Ablauf beginnt vor der Bildgenerierung. Lege fuer Kampagne oder Material eine URL an. Diese URL erkennt das Geraet und leitet iPhone oder iPad zum App Store, Android zu Google Play und Desktop zu einer erklaerenden Seite mit beiden Store-Buttons." },
        { type: "heading", text: "Ein QR, mehrere Ziele" },
        { type: "paragraph", text: "Du musst nicht je Betriebssystem einen QR-Code drucken. Ein Smart Link kann beim Klick das passende Ziel bestimmen. Das ist besonders wichtig bei Verpackungen und Offline-Material, wo das scannende Geraet unbekannt ist." },
        { type: "heading", text: "Eine editierbare URL" },
        { type: "paragraph", text: "Ein QR direkt zum Store ist starr. Mit einer Zwischen-URL kannst du Ziel, Parameter, Fallback-Seite und Kampagnennamen aendern, ohne den Druck zu ersetzen." },
        { type: "heading", text: "Messung ohne Uebertreibung" },
        { type: "paragraph", text: "Du kannst beobachtete Scans oder Klicks nach Quelle, Geraet und Datum messen. Das beweist aber nicht jede Installation, solange Klick und Installation nicht verifizierbar verbunden sind. Nutze die Daten fuer Interessenvergleich, nicht fuer falsche Sicherheit." },
      ] },
      { heading: "Schritt-fuer-Schritt-Plan", blocks: [
        { type: "steps", items: [
          { title: "Use Case definieren", text: "Ein dauerhafter Verpackungs-QR ist anders als ein Event-Plakat." },
          { title: "Einen Link pro Quelle erstellen", text: "Trenne Schaufenster, Flyer, Partner, Creator, Event oder Produktcharge." },
          { title: "Ziele nach Geraet setzen", text: "iOS zum App Store, Android zu Google Play, Desktop zu einer Seite mit beiden Buttons." },
          { title: "Fallback-Seite behalten", text: "Sie wiederholt das QR-Versprechen und gibt klare naechste Schritte." },
          { title: "Vor dem Druck testen", text: "Teste iPhone, Android, Kamera-App, Desktop und In-App-Browser." },
          { title: "Mit Rand und Kontrast drucken", text: "Nutze Weissraum, ruhigen Hintergrund und eine echte Groessenpruefung." },
          { title: "Daten getrennt lesen", text: "Vergleiche Klicks, Geraete, Quellen und Zeitraum, ohne Store-Metriken zu vermischen." }
        ] },
        { type: "paragraph", text: "Der wichtigste Punkt ist ein Link pro Quelle. Wenn derselbe QR auf Plakat, Verpackung und Partneraktion liegt, erkennst du nur Gesamtaktivitaet, nicht den Gewinner." },
      ] },
      { heading: "Nuetzliche Beispiele", blocks: [
        { type: "bullets", items: ["Retail: QR neben dem Produkt oeffnet die Loyalty-App.", "Gastronomie: Tisch-QR oeffnet Bestellung, Reservierung oder Punkte-App.", "Events: Jeder Stand nutzt einen eigenen Link.", "Packaging: Der Code fuehrt zu Support, Registrierung oder Wiederkauf.", "Creator: Jeder Partner bekommt QR oder Link zur Klicktrennung.", "Support: Gedruckte Anleitungen bleiben editierbar, wenn sich Onboarding aendert."] },
        { type: "link", text: "Wenn du auch das Store Listing optimierst, kombiniere diese Route mit dem ", label: "App Store Optimization", to: "/blog/app-store-optimization-aso-guia", after: " Leitfaden, damit QR und Listing dieselbe Geschichte erzaehlen." },
        { type: "callout", title: "Praxisbeispiel", text: "Eine Marke druckt einen QR auf 20.000 Boxen. Der Code zeigt auf einen editierbaren Link namens sommer-packaging. Aendert sich die Promotion, wird der Link angepasst, nicht die Box." },
      ] },
      { heading: "Was gemessen werden sollte", blocks: [
        { type: "paragraph", text: "Gute Messung beginnt mit sauberer Benennung: Quelle, Kampagne und Variante. Danach lassen sich Klicks nach Geraet, Datum und Kanal lesen. So erkennst du, welche Materialien Interesse erzeugen und wo der Ablauf bricht." },
        { type: "bullets", items: ["Beobachtete Klicks oder Scans je QR.", "Erkanntes Geraet und gewaehltes Ziel.", "Anteil je Store oder Fallback-Seite.", "Vergleich vor und nach Messaging- oder Platzierungswechsel.", "Vorsichtiger Abgleich mit Store-Besuchen oder Installationen."] },
        { type: "link", text: "Um Begriffe sauber zu halten, lies auch den Leitfaden zur ", label: "Download-Attribution nach Kanal", to: "/blog/atribucion-descargas-apps-medir-canal-real", after: ". Ein QR-Klick ist ein eigenes Signal; eine zugeschriebene Installation braucht staerkere Daten." },
      ] },
      { heading: "Haeufige Fehler", blocks: [
        { type: "bullets", items: ["QR direkt auf einen Store setzen und Editierbarkeit verlieren.", "Denselben QR fuer alle Kanaele nutzen.", "iOS, Android, Desktop und In-App-Browser nicht testen.", "Zu klein, zu wenig Kontrast oder schwer scanbare Flaeche.", "Auf eine Seite leiten, die das gedruckte Versprechen nicht aufgreift.", "Klicks als Installationen ausgeben.", "Vergessen, dass Druckmaterial laenger lebt als eine Promotion."] },
        { type: "paragraph", text: "Ein schlecht geplanter QR kostet nicht nur Klicks. Er verhindert Lernen. Ohne getrennte Quellen kannst du nicht entscheiden, welches Material mehr Budget verdient." },
      ] },
    ],
    faqTitle: "FAQ zu App-QR-Codes",
    faq: [
      { question: "Brauche ich einen QR fuer App Store und einen fuer Google Play?", answer: "Meist nicht. Ein QR mit Smart Link erkennt das Geraet und leitet zum passenden Ziel." },
      { question: "Kann ich das Ziel nach dem Druck aendern?", answer: "Ja, wenn der QR eine editierbare URL oeffnet. Bei direktem Store-Link brauchst du einen neuen Code." },
      { question: "Ist ein Scan eine Installation?", answer: "Nein. Ein Scan zeigt Interesse. Installation und Attribution brauchen Store- oder App-Daten mit verifizierbarer Verbindung." },
      { question: "Was sehen Desktop-Nutzer?", answer: "Eine Fallback-Seite mit App-Versprechen und klaren Buttons fuer beide Stores." },
      { question: "Wie vermeide ich vermischte Daten?", answer: "Erstelle je wichtiger Quelle einen eigenen Link und QR-Code." },
    ],
    cta: { title: "Erstelle einen QR zum richtigen Store", text: "Baue einen App-Link, verbinde ihn mit deinem QR und trenne Klicks nach Kampagne, Kanal oder Partner.", label: "App-Link erstellen" },
  },
  pt: {
    title: "Codigo QR para app: leve usuarios a loja certa",
    excerpt: "Veja como criar um QR para sua app que detecta o dispositivo, envia para App Store ou Google Play e mede cliques sem exagerar a atribuicao.",
    category: "QR para apps",
    readTime: "9 min",
    introduction: [
      "Um codigo QR para app ajuda uma pessoa a escanear uma embalagem, cartaz, evento, vitrine ou folheto e chegar ao destino correto para instalar sua aplicacao. O ponto nao e criar qualquer QR, mas conecta-lo a um link inteligente que detecta iOS, Android ou desktop, mantem uma pagina de fallback e separa cliques por campanha.",
      "O erro comum e tratar o QR como uma imagem fixa. Para apps, ele deve ser uma porta controlada: um codigo impresso, uma URL editavel, regras claras por dispositivo e medicao honesta. Se a pagina da loja ou a promocao mudar, voce deve atualizar o link, nao reimprimir tudo.",
    ],
    sections: [
      { heading: "O problema que um QR de app resolve", blocks: [
        { type: "paragraph", text: "O QR conecta um momento fisico a uma acao digital. A pessoa pode estar diante de uma caixa, mesa, expositor, palestra ou cartao. Nesse contexto, ela nao quer procurar o nome da app, escolher uma loja e conferir resultados parecidos. Ela quer escanear e seguir." },
        { type: "bullets", items: ["Reduz atrito quando o download comeca fora da web.", "Evita dois codigos separados para iOS e Android.", "Permite mudar destino sem trocar material fisico.", "Separa cliques por evento, loja, embalagem, criador, cartaz ou parceiro.", "Oferece fallback para desktop, tablet e dispositivos nao compativeis."] },
        { type: "callout", title: "Ideia central", text: "O QR abre uma URL estavel. A inteligencia de roteamento, medicao e edicao deve ficar no link por tras dele." },
      ] },
      { heading: "Como o QR para baixar app deve funcionar", blocks: [
        { type: "paragraph", text: "O fluxo certo comeca antes da imagem. Crie uma URL para a campanha ou peca. Ela deve detectar o dispositivo e enviar iPhone ou iPad para App Store, Android para Google Play e desktop para uma pagina explicativa com os dois botoes." },
        { type: "heading", text: "Um QR, varios destinos" },
        { type: "paragraph", text: "Nao e preciso imprimir um QR por sistema. Um link inteligente resolve o destino no clique, algo essencial em embalagem, loja e material offline." },
        { type: "heading", text: "Uma URL editavel" },
        { type: "paragraph", text: "Um QR direto para uma loja e rigido. Com uma URL intermediaria, voce altera destino, parametros, fallback e nomes de campanha sem tocar no impresso." },
        { type: "heading", text: "Medicao sem exagero" },
        { type: "paragraph", text: "Voce pode medir scans ou cliques por fonte, dispositivo e data. Isso nao prova cada instalacao se nao houver ligacao verificavel entre clique e instalacao. Use os dados para comparar interesse." },
      ] },
      { heading: "Plano passo a passo", blocks: [
        { type: "steps", items: [
          { title: "Defina o caso de uso", text: "QR de embalagem permanente e diferente de cartaz de evento." },
          { title: "Crie um link por fonte", text: "Separe vitrine, flyer, parceiro, criador, evento ou lote." },
          { title: "Configure destinos por dispositivo", text: "iOS para App Store, Android para Google Play, desktop para pagina com ambos." },
          { title: "Mantenha fallback", text: "A pagina deve repetir a promessa do QR e dar caminhos claros." },
          { title: "Teste antes de imprimir", text: "Use iPhone, Android, camera, desktop e navegadores internos." },
          { title: "Imprima com margem e contraste", text: "Garanta area livre, fundo simples e tamanho real testado." },
          { title: "Leia dados separados", text: "Analise cliques, dispositivo, fonte e periodo sem confundir com instalacoes." }
        ] },
        { type: "paragraph", text: "O link por fonte e o detalhe que preserva aprendizado. Um unico QR em todos os canais mostra apenas atividade geral, nao o que funcionou." },
      ] },
      { heading: "Exemplos uteis", blocks: [
        { type: "bullets", items: ["Varejo: QR ao lado do produto abre app de fidelidade.", "Restaurantes: QR na mesa abre pedidos, reservas ou pontos.", "Eventos: cada estande usa link proprio.", "Embalagem: o QR leva a suporte, registro ou recompra.", "Criadores: cada parceiro tem QR ou link separado.", "Suporte: instrucoes impressas levam a app correta e continuam editaveis."] },
        { type: "link", text: "Se voce tambem otimiza a ficha da loja, combine esta rota com o guia de ", label: "App Store Optimization", to: "/blog/app-store-optimization-aso-guia", after: " para manter promessa e ficha alinhadas." },
        { type: "callout", title: "Exemplo pratico", text: "Uma marca imprime um QR em 20.000 caixas. O codigo aponta para um link editavel. Se a promocao muda, o destino muda sem reimprimir as caixas." },
      ] },
      { heading: "O que medir", blocks: [
        { type: "paragraph", text: "A medicao util comeca por nomes claros: fonte, campanha e variante. Depois voce le cliques por dispositivo, data e canal para entender onde ha interesse e onde a continuidade falha." },
        { type: "bullets", items: ["Cliques ou scans por QR.", "Dispositivo detectado e destino escolhido.", "Percentual enviado para cada loja ou fallback.", "Comparacao antes e depois de mudancas.", "Comparacao cautelosa com visitas ou instalacoes das lojas."] },
        { type: "link", text: "Para nao misturar conceitos, leia tambem o guia de ", label: "atribuicao de downloads por canal", to: "/blog/atribucion-descargas-apps-medir-canal-real", after: ". Clique de QR e sinal proprio; instalacao atribuida exige dados mais fortes." },
      ] },
      { heading: "Erros frequentes", blocks: [
        { type: "bullets", items: ["Apontar direto para uma loja e perder edicao.", "Usar o mesmo QR em todos os canais.", "Nao testar iOS, Android, desktop e navegador interno.", "Codigo pequeno, com pouco contraste ou em superficie ruim.", "Enviar para pagina que nao repete a promessa impressa.", "Chamar cliques de instalacoes atribuidas.", "Esquecer que material impresso dura mais que a promocao."] },
        { type: "paragraph", text: "Um QR mal planejado perde cliques e tambem aprendizado. Sem fonte separada, voce nao sabe onde investir de novo." },
      ] },
    ],
    faqTitle: "Perguntas frequentes sobre QR para apps",
    faq: [
      { question: "Preciso de um QR para App Store e outro para Google Play?", answer: "Normalmente nao. Um unico QR conectado a um link inteligente pode detectar o dispositivo e enviar ao destino certo." },
      { question: "Posso mudar o destino depois de imprimir?", answer: "Sim, se o QR abrir uma URL editavel. Se apontar direto para a loja, voce precisa de outro codigo." },
      { question: "Scan e instalacao sao a mesma coisa?", answer: "Nao. Scan ou clique mostra interesse; instalacao atribuida exige dados verificaveis." },
      { question: "O que mostrar no desktop?", answer: "Uma pagina de fallback com a promessa da app e botoes para as duas lojas." },
      { question: "Como nao misturar suportes?", answer: "Crie um link e um QR para cada fonte importante." },
    ],
    cta: { title: "Crie um QR que leva a loja certa", text: "Monte um link de app, conecte ao QR e separe cliques por campanha, canal ou parceiro.", label: "Criar meu link de app" },
  },
  it: {
    title: "Codice QR app: porta gli utenti allo store giusto",
    excerpt: "Crea un QR per la tua app che riconosce il dispositivo, invia ad App Store o Google Play e misura i clic senza promettere attribuzione non dimostrabile.",
    category: "QR per app",
    readTime: "9 min",
    introduction: [
      "Un codice QR app permette a una persona di scansionare packaging, poster, evento, vetrina o volantino e arrivare al posto giusto per installare l'applicazione. Non basta generare un quadrato. Serve collegarlo a uno smart link che riconosca iOS, Android o desktop, mantenga una pagina di fallback e separi i clic per campagna.",
      "L'errore comune e trattare il QR come immagine statica. Per un'app dovrebbe essere un ingresso controllato: un solo codice stampato, una URL modificabile, regole per dispositivo e misurazione onesta. Se cambiano scheda store o promozione, aggiorni il link invece di ristampare tutto.",
    ],
    sections: [
      { heading: "Quale problema risolve un QR per app", blocks: [
        { type: "paragraph", text: "Il QR collega un momento fisico a un'azione digitale. L'utente puo trovarsi davanti a una scatola, un tavolo, uno stand o un biglietto. Non vuole cercare il nome dell'app, scegliere lo store e controllare risultati simili. Vuole scansionare e continuare." },
        { type: "bullets", items: ["Riduce frizione quando il download parte offline.", "Evita due codici distinti per iOS e Android.", "Permette di cambiare destinazione senza sostituire materiali fisici.", "Separa clic per evento, negozio, packaging, creator, poster o partner.", "Offre fallback a desktop, tablet e dispositivi non compatibili."] },
        { type: "callout", title: "Idea chiave", text: "Il QR apre una URL stabile. Routing, misurazione e modifiche devono vivere nel link dietro il codice." },
      ] },
      { heading: "Come deve funzionare il QR di download", blocks: [
        { type: "paragraph", text: "Il flusso corretto inizia prima dell'immagine. Crea una URL per campagna o supporto. La URL rileva il dispositivo: iPhone e iPad verso App Store, Android verso Google Play, desktop verso una pagina con entrambi i pulsanti." },
        { type: "heading", text: "Un QR, piu destinazioni" },
        { type: "paragraph", text: "Non serve stampare un QR per sistema operativo. Uno smart link risolve la destinazione compatibile al clic, utile quando non sai quale telefono scannerizzera." },
        { type: "heading", text: "Una URL modificabile" },
        { type: "paragraph", text: "Un QR diretto allo store e rigido. Con una URL intermedia puoi aggiornare destinazione, parametri, fallback e nomi campagna dopo la stampa." },
        { type: "heading", text: "Misurazione senza esagerare" },
        { type: "paragraph", text: "Puoi misurare scansioni o clic per fonte, dispositivo e data. Questo non attribuisce ogni installazione al QR se non hai un collegamento verificabile tra clic e installazione." },
      ] },
      { heading: "Piano operativo", blocks: [
        { type: "steps", items: [
          { title: "Definisci il caso d'uso", text: "Packaging permanente e poster evento hanno vita e messaggio diversi." },
          { title: "Crea un link per fonte", text: "Separa vetrina, flyer, partner, creator, evento o lotto prodotto." },
          { title: "Configura destinazioni", text: "iOS ad App Store, Android a Google Play, desktop a una pagina con entrambi." },
          { title: "Mantieni un fallback", text: "La pagina ripete la promessa del QR e offre percorsi chiari." },
          { title: "Testa prima di stampare", text: "Verifica iPhone, Android, fotocamera, desktop e browser in-app." },
          { title: "Stampa con margine e contrasto", text: "Lascia spazio bianco e prova dimensione e distanza reali." },
          { title: "Leggi i dati separati", text: "Clic, dispositivo, fonte e periodo non sono la stessa cosa delle installazioni." }
        ] },
        { type: "paragraph", text: "Il link per fonte protegge l'apprendimento. Se usi lo stesso QR ovunque, saprai solo che c'e stata attivita complessiva." },
      ] },
      { heading: "Esempi utili", blocks: [
        { type: "bullets", items: ["Retail: QR vicino al prodotto apre l'app fedelta.", "Ristorazione: QR sul tavolo apre ordini, prenotazioni o punti.", "Eventi: ogni stand usa un link distinto.", "Packaging: il QR porta a supporto, registrazione o riacquisto.", "Creator: ogni partner ha QR o link proprio.", "Supporto: le istruzioni stampate restano aggiornabili."] },
        { type: "link", text: "Se stai ottimizzando anche la scheda store, combina questa rotta con la guida ", label: "App Store Optimization", to: "/blog/app-store-optimization-aso-guia", after: " per allineare promessa del QR e scheda." },
        { type: "callout", title: "Esempio pratico", text: "Un brand stampa un QR su 20.000 confezioni. Il codice punta a un link modificabile; se cambia la promozione, cambia il link, non la confezione." },
      ] },
      { heading: "Cosa misurare", blocks: [
        { type: "paragraph", text: "La misurazione utile parte da nomi puliti: fonte, campagna e variante. Poi leggi clic per dispositivo, data e canale per capire dove nasce interesse e dove il percorso si interrompe." },
        { type: "bullets", items: ["Clic o scansioni osservate per QR.", "Dispositivo rilevato e destinazione scelta.", "Quota inviata a ogni store o fallback.", "Confronto prima/dopo cambi di messaggio.", "Lettura prudente con visite o installazioni dello store."] },
        { type: "link", text: "Per non confondere i concetti, leggi anche la guida all'", label: "attribuzione download per canale", to: "/blog/atribucion-descargas-apps-medir-canal-real", after: ". Un clic QR e un segnale; un'installazione attribuita richiede dati piu forti." },
      ] },
      { heading: "Errori frequenti", blocks: [
        { type: "bullets", items: ["Puntare direttamente a uno store e perdere modifica.", "Usare lo stesso QR per tutti i canali.", "Non testare iOS, Android, desktop e browser in-app.", "Codice troppo piccolo o con poco contrasto.", "Mandare a una pagina incoerente con il materiale.", "Chiamare installazioni attribuite dei semplici clic.", "Dimenticare che la stampa dura piu della promozione."] },
        { type: "paragraph", text: "Un QR progettato male non perde solo clic. Toglie capacita di apprendimento: senza fonti separate non sai dove investire ancora." },
      ] },
    ],
    faqTitle: "FAQ sui QR per app",
    faq: [
      { question: "Serve un QR per App Store e uno per Google Play?", answer: "Di solito no. Un QR con smart link rileva il dispositivo e invia allo store giusto." },
      { question: "Posso cambiare destinazione dopo la stampa?", answer: "Si, se il QR apre una URL modificabile. Se punta direttamente allo store, serve un nuovo codice." },
      { question: "Una scansione e un'installazione?", answer: "No. La scansione indica interesse; l'installazione attribuita richiede dati verificabili." },
      { question: "Cosa mostrare su desktop?", answer: "Una pagina fallback con promessa dell'app e pulsanti per entrambi gli store." },
      { question: "Come non mescolare i supporti?", answer: "Crea un link e un QR per ogni fonte importante." },
    ],
    cta: { title: "Crea un QR verso lo store giusto", text: "Genera un link app, collegalo al QR e separa clic per campagna, canale o partner.", label: "Crea il mio link app" },
  },
  ko: {
    title: "앱 QR 코드: 사용자를 올바른 스토어로 보내는 방법",
    excerpt: "기기를 감지해 App Store 또는 Google Play로 보내고, 과장된 어트리뷰션 없이 클릭을 측정하는 앱 QR 코드 구성법을 설명합니다.",
    category: "앱 QR",
    readTime: "9분",
    introduction: [
      "앱 QR 코드는 패키지, 포스터, 행사장, 매장, 안내지에서 스캔한 사용자를 앱 설치에 맞는 목적지로 보내는 입구입니다. 핵심은 QR 이미지를 만드는 것이 아니라 iOS, Android, 데스크톱을 감지하는 스마트 링크에 연결하고, 대체 페이지를 두며, 캠페인별 클릭을 분리하는 것입니다.",
      "흔한 실수는 QR을 고정된 이미지로만 보는 것입니다. 앱에서는 하나의 인쇄 코드, 수정 가능한 URL, 기기별 규칙, 정직한 측정이 필요합니다. 스토어 페이지나 프로모션이 바뀌어도 인쇄물을 다시 만들지 않고 링크에서 목적지와 메시지를 조정할 수 있어야 합니다.",
    ],
    sections: [
      { heading: "앱 QR 코드가 해결하는 문제", blocks: [
        { type: "paragraph", text: "QR은 오프라인 접점을 디지털 행동으로 연결합니다. 사용자는 박스, 테이블, 전시대, 발표 화면, 명함 앞에 있을 수 있습니다. 그 자리에서 앱 이름을 검색하고 스토어를 고르고 비슷한 결과 중 올바른 앱을 찾는 일은 번거롭습니다. 스캔 후 바로 이어지는 경험이 필요합니다." },
        { type: "bullets", items: ["웹이나 온라인 광고 밖에서 시작되는 다운로드 마찰을 줄입니다.", "iOS와 Android용 QR을 따로 인쇄하지 않아도 됩니다.", "중간 URL을 쓰면 인쇄물을 바꾸지 않고 목적지를 수정할 수 있습니다.", "행사, 매장, 패키지, 크리에이터, 포스터, 파트너별 클릭을 나눕니다.", "데스크톱, 태블릿, 미지원 기기에는 대체 페이지를 제공합니다."] },
        { type: "callout", title: "핵심", text: "QR 자체가 모든 로직을 가질 필요는 없습니다. QR은 안정적인 URL을 열고, 라우팅과 측정, 수정은 그 뒤의 링크가 담당해야 합니다." },
      ] },
      { heading: "앱 다운로드 QR의 작동 방식", blocks: [
        { type: "paragraph", text: "올바른 흐름은 이미지를 만들기 전에 시작됩니다. 캠페인이나 소재별 URL을 만들고, 해당 URL이 기기를 감지합니다. iPhone과 iPad는 App Store, Android는 Google Play, 데스크톱은 두 스토어 버튼이 있는 설명 페이지로 보냅니다." },
        { type: "heading", text: "하나의 QR, 여러 목적지" },
        { type: "paragraph", text: "운영체제별 QR을 따로 인쇄할 필요는 없습니다. 스마트 링크는 클릭 시점에 맞는 목적지를 정할 수 있습니다. 어떤 휴대폰이 스캔할지 모르는 패키지나 매장에서는 특히 중요합니다." },
        { type: "heading", text: "수정 가능한 URL" },
        { type: "paragraph", text: "QR이 스토어로 직접 연결되면 유연성이 떨어집니다. 중간 URL을 사용하면 목적지, 파라미터, 대체 페이지, 캠페인 이름을 인쇄 후에도 바꿀 수 있습니다." },
        { type: "heading", text: "과장 없는 측정" },
        { type: "paragraph", text: "소스, 기기, 날짜별 스캔이나 클릭은 측정할 수 있습니다. 그러나 클릭과 설치를 검증 가능하게 연결하지 못하면 모든 설치를 QR 덕분이라고 말할 수 없습니다. 관심 비교와 설치 어트리뷰션은 분리해야 합니다." },
      ] },
      { heading: "단계별 계획", blocks: [
        { type: "steps", items: [
          { title: "사용 사례 정의", text: "오래 쓰는 패키지 QR과 짧은 행사 포스터는 이름, 메시지, 수명이 다릅니다." },
          { title: "소스별 링크 생성", text: "매장, 전단, 파트너, 크리에이터, 행사, 제품 배치를 나눕니다." },
          { title: "기기별 목적지 설정", text: "iOS는 App Store, Android는 Google Play, 데스크톱은 두 버튼이 있는 페이지로 보냅니다." },
          { title: "대체 페이지 유지", text: "QR의 약속을 반복하고 다음 행동을 명확히 보여줍니다." },
          { title: "인쇄 전 테스트", text: "iPhone, Android, 기본 카메라, 데스크톱, 인앱 브라우저에서 확인합니다." },
          { title: "여백과 대비 확보", text: "흰 여백, 단순한 배경, 실제 거리에서 읽히는 크기를 확인합니다." },
          { title: "데이터 분리", text: "클릭, 기기, 소스, 기간을 나누고 스토어 설치와 혼동하지 않습니다." }
        ] },
        { type: "paragraph", text: "가장 중요한 것은 소스별 링크입니다. 같은 QR을 포스터, 박스, 제휴 캠페인에 모두 쓰면 전체 활동만 보이고 무엇이 효과적이었는지 알 수 없습니다." },
      ] },
      { heading: "활용 예시", blocks: [
        { type: "bullets", items: ["리테일: 제품 옆 QR이 멤버십 앱을 엽니다.", "음식점: 테이블 QR이 주문, 예약, 포인트 앱을 엽니다.", "행사: 부스나 세션마다 다른 링크를 씁니다.", "패키지: 지원, 등록, 재구매 앱으로 보냅니다.", "크리에이터: 협업자별 QR로 클릭을 비교합니다.", "지원: 인쇄 안내서의 QR도 온보딩 변화에 맞춰 수정할 수 있습니다."] },
        { type: "link", text: "스토어 페이지도 개선 중이라면 ", label: "App Store Optimization", to: "/blog/app-store-optimization-aso-guia", after: " 가이드와 함께 사용해 QR 메시지와 스토어 설명을 맞추세요." },
        { type: "callout", title: "실전 예시", text: "브랜드가 2만 개 박스에 QR을 인쇄합니다. 코드는 수정 가능한 summer-packaging 링크를 열고, 프로모션 변경 시 박스가 아니라 링크의 메시지와 목적지를 바꿉니다." },
      ] },
      { heading: "측정할 항목", blocks: [
        { type: "paragraph", text: "좋은 측정은 명확한 이름에서 시작합니다. 각 QR에는 소스, 캠페인, 필요하면 변형 이름이 있어야 합니다. 그 다음 기기, 날짜, 채널별 클릭을 읽어 어디서 관심이 생기고 어디서 흐름이 끊기는지 봅니다." },
        { type: "bullets", items: ["QR별 관측 클릭 또는 스캔.", "감지된 기기와 선택된 목적지.", "각 스토어 또는 대체 페이지로 보낸 비율.", "메시지나 위치 변경 전후 비교.", "스토어 방문 또는 설치 데이터와의 신중한 비교."] },
        { type: "link", text: "개념을 섞지 않으려면 ", label: "채널별 앱 다운로드 어트리뷰션", to: "/blog/atribucion-descargas-apps-medir-canal-real", after: " 가이드도 확인하세요. QR 클릭은 자체 신호이고, 설치 어트리뷰션에는 더 강한 데이터 연결이 필요합니다." },
      ] },
      { heading: "자주 하는 실수", blocks: [
        { type: "bullets", items: ["QR을 스토어에 직접 연결해 수정 가능성을 잃습니다.", "모든 채널에 같은 QR을 사용합니다.", "iOS, Android, 데스크톱, 인앱 브라우저 테스트를 생략합니다.", "너무 작거나 대비가 약한 코드를 사용합니다.", "인쇄물의 약속과 다른 페이지로 보냅니다.", "클릭만 측정하고 설치를 귀속했다고 말합니다.", "인쇄물이 일시적 프로모션보다 오래 남는다는 점을 잊습니다."] },
        { type: "paragraph", text: "잘못 설계된 QR은 클릭뿐 아니라 학습도 잃게 합니다. 소스가 분리되어 있지 않으면 어디에 다시 투자해야 하는지 판단할 수 없습니다." },
      ] },
    ],
    faqTitle: "앱 QR 코드 FAQ",
    faq: [
      { question: "App Store와 Google Play용 QR이 각각 필요합니까?", answer: "보통은 필요 없습니다. 스마트 링크에 연결된 하나의 QR이 기기를 감지해 맞는 스토어로 보낼 수 있습니다." },
      { question: "인쇄 후 목적지를 바꿀 수 있습니까?", answer: "QR이 수정 가능한 URL을 열면 가능합니다. 스토어 직접 링크라면 새 QR이 필요합니다." },
      { question: "스캔은 설치와 같습니까?", answer: "아닙니다. 스캔이나 클릭은 관심 신호입니다. 설치 어트리뷰션은 검증 가능한 데이터 연결이 필요합니다." },
      { question: "데스크톱 사용자는 무엇을 봐야 합니까?", answer: "앱의 가치와 두 스토어 버튼이 있는 대체 페이지를 보여주는 것이 좋습니다." },
      { question: "여러 위치의 데이터를 섞지 않으려면?", answer: "중요한 소스마다 별도의 링크와 QR을 만드세요." },
    ],
    cta: { title: "올바른 스토어로 보내는 QR 만들기", text: "앱 링크를 만들고 QR에 연결해 캠페인, 채널, 파트너별 클릭을 분리하세요.", label: "내 앱 링크 만들기" },
  },
  nl: {
    title: "App QR-code: stuur gebruikers naar de juiste store",
    excerpt: "Maak een QR-code voor je app die het apparaat herkent, naar App Store of Google Play stuurt en klikken meet zonder onbewijsbare attributieclaims.",
    category: "App QR",
    readTime: "9 min",
    introduction: [
      "Een app QR-code brengt iemand vanaf verpakking, poster, event, winkelraam of flyer naar de juiste plek om je app te installeren. Het gaat niet om zomaar een code maken. De QR moet gekoppeld zijn aan een slimme link die iOS, Android of desktop herkent, een fallbackpagina toont en klikken per campagne scheidt.",
      "De veelgemaakte fout is dat de QR als statische afbeelding wordt gezien. Voor apps moet het een beheerde ingang zijn: een gedrukte code, een bewerkbare URL, duidelijke regels per apparaat en eerlijke meting. Als je listing of promotie verandert, pas je de link aan en druk je niet alles opnieuw.",
    ],
    sections: [
      { heading: "Welk probleem een app QR-code oplost", blocks: [
        { type: "paragraph", text: "Een QR voor apps verbindt een fysiek moment met een digitale actie. De gebruiker staat bij een doos, tafel, display, presentatie of visitekaart. Die wil niet zoeken naar de appnaam, de juiste store kiezen en vergelijkbare resultaten controleren. Die wil scannen en doorgaan." },
        { type: "bullets", items: ["Minder frictie wanneer de download offline start.", "Geen aparte codes voor iOS en Android op hetzelfde materiaal.", "Bestemming wijzigen zonder fysiek materiaal te vervangen.", "Klikken scheiden per event, winkel, verpakking, maker, poster of partner.", "Een duidelijke fallback voor desktop, tablet en niet-ondersteunde apparaten."] },
        { type: "callout", title: "De kern", text: "De QR hoeft niet alle logica te dragen. Hij opent een stabiele URL; routing, meting en wijzigingen horen in de link erachter." },
      ] },
      { heading: "Hoe de QR voor appdownloads moet werken", blocks: [
        { type: "paragraph", text: "De juiste flow begint voor het genereren van de afbeelding. Maak een URL voor campagne of materiaal. Die URL detecteert het apparaat en stuurt iPhone of iPad naar App Store, Android naar Google Play en desktop naar een pagina met beide knoppen." },
        { type: "heading", text: "Een QR, meerdere bestemmingen" },
        { type: "paragraph", text: "Je hoeft niet per besturingssysteem een QR te drukken. Een slimme link bepaalt bij de klik de juiste bestemming. Dat is belangrijk bij verpakking en offline materiaal." },
        { type: "heading", text: "Een bewerkbare URL" },
        { type: "paragraph", text: "Een QR rechtstreeks naar de store is star. Met een tussen-URL kun je bestemming, parameters, fallback en campagnenamen aanpassen na het drukken." },
        { type: "heading", text: "Meten zonder overdrijven" },
        { type: "paragraph", text: "Je kunt scans of klikken meten per bron, apparaat en datum. Dat bewijst niet elke installatie zolang klik en installatie niet verifieerbaar verbonden zijn. Gebruik de data om interesse te vergelijken." },
      ] },
      { heading: "Stappenplan", blocks: [
        { type: "steps", items: [
          { title: "Bepaal het gebruik", text: "Een permanente verpakkings-QR is anders dan een tijdelijke eventposter." },
          { title: "Maak een link per bron", text: "Scheid winkelraam, flyer, partner, maker, event of productbatch." },
          { title: "Stel doelen per apparaat in", text: "iOS naar App Store, Android naar Google Play, desktop naar een pagina met beide opties." },
          { title: "Behoud een fallbackpagina", text: "Die herhaalt de QR-belofte en biedt duidelijke routes." },
          { title: "Test voor drukwerk", text: "Controleer iPhone, Android, camera, desktop en in-app browsers." },
          { title: "Druk met marge en contrast", text: "Gebruik witruimte, rustige achtergrond en test de echte scanafstand." },
          { title: "Lees data apart", text: "Klikken, apparaten, bronnen en periodes zijn niet hetzelfde als installaties." }
        ] },
        { type: "paragraph", text: "De belangrijkste stap is een link per bron. Met dezelfde QR overal zie je alleen totale activiteit, niet welk materiaal werkte." },
      ] },
      { heading: "Handige voorbeelden", blocks: [
        { type: "bullets", items: ["Retail: QR bij het product opent de loyaliteitsapp.", "Horeca: tafel-QR opent bestellen, reserveren of punten.", "Events: elke stand gebruikt een eigen link.", "Packaging: de QR leidt naar support, registratie of herhaalaankoop.", "Makers: elke partner krijgt een eigen QR of link.", "Support: gedrukte instructies blijven aanpasbaar."] },
        { type: "link", text: "Als je ook de storelisting verbetert, combineer dit met de ", label: "App Store Optimization", to: "/blog/app-store-optimization-aso-guia", after: " gids zodat QR en listing hetzelfde verhaal vertellen." },
        { type: "callout", title: "Praktisch voorbeeld", text: "Een merk drukt een QR op 20.000 dozen. De code opent een bewerkbare link. Als de promotie wijzigt, verandert de link en niet de doos." },
      ] },
      { heading: "Wat je moet meten", blocks: [
        { type: "paragraph", text: "Goede meting begint met nette namen: bron, campagne en variant. Daarna lees je klikken per apparaat, datum en kanaal om te begrijpen waar interesse ontstaat en waar de route hapert." },
        { type: "bullets", items: ["Klikken of scans per QR.", "Gedetecteerd apparaat en gekozen bestemming.", "Aandeel naar elke store of fallbackpagina.", "Vergelijking voor en na wijziging van boodschap of plaatsing.", "Voorzichtige vergelijking met storebezoeken of installaties."] },
        { type: "link", text: "Lees ook de gids over ", label: "downloadattributie per kanaal", to: "/blog/atribucion-descargas-apps-medir-canal-real", after: ". Een QR-klik is een eigen signaal; een toegeschreven installatie vraagt sterkere data." },
      ] },
      { heading: "Veelgemaakte fouten", blocks: [
        { type: "bullets", items: ["Direct naar een store linken en bewerkbaarheid verliezen.", "Dezelfde QR gebruiken voor alle kanalen.", "iOS, Android, desktop en in-app browsers niet testen.", "Een code te klein of met te weinig contrast maken.", "Naar een pagina sturen die de gedrukte belofte niet herhaalt.", "Klikken presenteren als toegeschreven installaties.", "Vergeten dat drukwerk langer leeft dan een promotie."] },
        { type: "paragraph", text: "Een slecht geplande QR kost meer dan klikken. Je verliest leervermogen. Zonder gescheiden bronnen weet je niet waar opnieuw budget naartoe moet." },
      ] },
    ],
    faqTitle: "FAQ over app QR-codes",
    faq: [
      { question: "Heb ik een QR voor App Store en een voor Google Play nodig?", answer: "Meestal niet. Een enkele QR met slimme link kan het apparaat herkennen en naar de juiste store sturen." },
      { question: "Kan ik de bestemming na het drukken aanpassen?", answer: "Ja, als de QR een bewerkbare URL opent. Bij een directe storelink heb je een nieuwe code nodig." },
      { question: "Is een scan hetzelfde als een installatie?", answer: "Nee. Een scan of klik toont interesse; installatieattributie vereist verifieerbare data." },
      { question: "Wat zien desktopgebruikers?", answer: "Een fallbackpagina met de appbelofte en knoppen voor beide stores." },
      { question: "Hoe voorkom ik gemengde data?", answer: "Maak per belangrijke bron een eigen link en QR-code." },
    ],
    cta: { title: "Maak een QR naar de juiste store", text: "Bouw een app-link, koppel die aan je QR en scheid klikken per campagne, kanaal of partner.", label: "Maak mijn app-link" },
  },
  ar: {
    title: "رمز QR للتطبيق: وجّه المستخدم إلى المتجر الصحيح",
    excerpt: "تعلّم كيف تنشئ رمز QR لتطبيقك يكتشف الجهاز، يرسل المستخدم إلى App Store أو Google Play، ويقيس النقرات بدون وعود إسناد غير مثبتة.",
    category: "QR للتطبيقات",
    readTime: "9 دقائق",
    introduction: [
      "رمز QR للتطبيق يساعد الشخص الذي يمسح الرمز من عبوة، ملصق، فعالية، واجهة متجر أو نشرة على الوصول إلى المكان الصحيح لتثبيت التطبيق. الهدف ليس إنشاء صورة QR فقط، بل ربطها برابط ذكي يكتشف iOS أو Android أو سطح المكتب، ويعرض صفحة بديلة، ويفصل النقرات حسب الحملة.",
      "الخطأ الشائع هو التعامل مع QR كصورة ثابتة. بالنسبة للتطبيقات يجب أن يكون مدخلا قابلا للإدارة: رمز مطبوع واحد، عنوان URL قابل للتعديل، قواعد واضحة حسب الجهاز، وقياس صادق. عندما تتغير صفحة المتجر أو العرض الترويجي، يجب تعديل الرابط لا إعادة طباعة كل المواد.",
    ],
    sections: [
      { heading: "ما المشكلة التي يحلها QR للتطبيق", blocks: [
        { type: "paragraph", text: "يربط QR لحظة مادية بفعل رقمي. قد يكون المستخدم أمام صندوق، طاولة، منصة عرض، شاشة عرض أو بطاقة عمل. في هذا السياق لا يريد البحث عن اسم التطبيق واختيار المتجر ومراجعة نتائج متشابهة. يريد أن يمسح الرمز ويتابع." },
        { type: "bullets", items: ["يقلل الاحتكاك عندما يبدأ التحميل خارج الويب أو الإعلان.", "يتجنب طباعة رمزين منفصلين لنظامي iOS وAndroid.", "يسمح بتغيير الوجهة دون تبديل المادة المطبوعة عند استخدام URL وسيط.", "يفصل النقرات حسب الفعالية، المتجر، العبوة، المؤثر، الملصق أو الشريك.", "يوفر صفحة بديلة واضحة لسطح المكتب والأجهزة غير المتوافقة."] },
        { type: "callout", title: "الفكرة الأساسية", text: "لا يجب أن يحمل رمز QR كل المنطق. وظيفته فتح URL ثابت، أما التوجيه والقياس والتعديل فيجب أن تكون في الرابط خلفه." },
      ] },
      { heading: "كيف يجب أن يعمل QR لتحميل التطبيق", blocks: [
        { type: "paragraph", text: "يبدأ التدفق الصحيح قبل إنشاء الصورة. أنشئ URL خاصا بالحملة أو المادة. هذا الرابط يكتشف الجهاز ويرسل iPhone أو iPad إلى App Store، وAndroid إلى Google Play، وسطح المكتب إلى صفحة تشرح التطبيق وتعرض زري المتجرين." },
        { type: "heading", text: "رمز واحد ووجهات متعددة" },
        { type: "paragraph", text: "لا تحتاج إلى طباعة QR لكل نظام تشغيل. الرابط الذكي يحدد الوجهة المناسبة وقت النقر، وهذا مهم في التغليف والمواد المطبوعة حيث لا تعرف جهاز المستخدم." },
        { type: "heading", text: "URL قابل للتعديل" },
        { type: "paragraph", text: "إذا كان QR يشير مباشرة إلى المتجر فسيكون جامدا. مع URL وسيط يمكنك تعديل الوجهة، المعلمات، صفحة fallback وأسماء الحملات بعد الطباعة." },
        { type: "heading", text: "قياس بدون مبالغة" },
        { type: "paragraph", text: "يمكنك قياس المسح أو النقرات حسب المصدر والجهاز والتاريخ. هذا لا يثبت كل تثبيت إذا لم توجد صلة يمكن التحقق منها بين النقرة والتثبيت. استخدم البيانات لمقارنة الاهتمام لا لادعاء يقين غير موجود." },
      ] },
      { heading: "خطة خطوة بخطوة", blocks: [
        { type: "steps", items: [
          { title: "حدد حالة الاستخدام", text: "QR دائم على العبوة يختلف عن ملصق فعالية قصير العمر." },
          { title: "أنشئ رابطا لكل مصدر", text: "افصل الواجهة، النشرة، الشريك، المؤثر، الفعالية أو دفعة المنتج." },
          { title: "اضبط الوجهات حسب الجهاز", text: "iOS إلى App Store، Android إلى Google Play، وسطح المكتب إلى صفحة تجمع الخيارين." },
          { title: "احتفظ بصفحة بديلة", text: "يجب أن تكرر وعد QR وتعرض خطوات واضحة." },
          { title: "اختبر قبل الطباعة", text: "جرّب iPhone وAndroid والكاميرا وسطح المكتب والمتصفحات داخل التطبيقات." },
          { title: "اطبع بهامش وتباين", text: "اترك مساحة بيضاء، استخدم خلفية هادئة، واختبر الحجم من مسافة المسح الحقيقية." },
          { title: "اقرأ البيانات منفصلة", text: "افصل النقرات والجهاز والمصدر والفترة ولا تخلطها مع التثبيتات." }
        ] },
        { type: "paragraph", text: "أهم خطوة هي إنشاء رابط لكل مصدر. إذا استخدمت QR نفسه في كل مكان فستعرف النشاط الإجمالي فقط، لا المادة التي تستحق التكرار." },
      ] },
      { heading: "أمثلة مفيدة", blocks: [
        { type: "bullets", items: ["التجزئة: QR بجوار المنتج يفتح تطبيق الولاء.", "المطاعم: QR على الطاولة يفتح الطلبات أو الحجوزات أو النقاط.", "الفعاليات: كل جناح أو جلسة تستخدم رابطا مختلفا.", "التغليف: QR على الصندوق يرسل إلى الدعم أو التسجيل أو إعادة الشراء.", "المؤثرون: كل شريك لديه QR أو رابط خاص لمقارنة النقرات.", "الدعم: التعليمات المطبوعة تبقى قابلة للتحديث إذا تغير onboarding."] },
        { type: "link", text: "إذا كنت تحسن صفحة المتجر أيضا، اجمع هذا المسار مع دليل ", label: "App Store Optimization", to: "/blog/app-store-optimization-aso-guia", after: " حتى تكون رسالة QR وصفحة المتجر متسقتين." },
        { type: "callout", title: "مثال عملي", text: "تطبع علامة تجارية QR على 20,000 صندوق. يشير الرمز إلى رابط قابل للتعديل. إذا تغير العرض، يتغير الرابط لا الصندوق." },
      ] },
      { heading: "ما الذي يجب قياسه", blocks: [
        { type: "paragraph", text: "يبدأ القياس المفيد بتسمية نظيفة: المصدر، الحملة، والنسخة. بعد ذلك تقرأ النقرات حسب الجهاز والتاريخ والقناة لتفهم أين يظهر الاهتمام وأين ينكسر المسار." },
        { type: "bullets", items: ["نقرات أو عمليات مسح لكل QR.", "الجهاز المكتشف والوجهة المختارة.", "النسبة المرسلة إلى كل متجر أو صفحة بديلة.", "مقارنة قبل وبعد تغيير الرسالة أو المكان.", "مقارنة حذرة مع زيارات أو تثبيتات المتاجر."] },
        { type: "link", text: "لتجنب خلط المفاهيم، اقرأ أيضا دليل ", label: "إسناد تنزيلات التطبيق حسب القناة", to: "/blog/atribucion-descargas-apps-medir-canal-real", after: ". نقرة QR إشارة خاصة بك، أما التثبيت المنسوب فيحتاج بيانات أقوى." },
      ] },
      { heading: "أخطاء شائعة", blocks: [
        { type: "bullets", items: ["توجيه QR مباشرة إلى متجر واحد وفقدان قابلية التعديل.", "استخدام QR نفسه لكل القنوات.", "عدم اختبار iOS وAndroid وسطح المكتب والمتصفحات داخل التطبيقات.", "رمز صغير أو ضعيف التباين أو على سطح يصعب مسحه.", "الإرسال إلى صفحة لا تكرر وعد المادة المطبوعة.", "اعتبار النقرات تثبيتات منسوبة.", "نسيان أن المادة المطبوعة قد تعيش أطول من العرض المؤقت."] },
        { type: "paragraph", text: "QR سيئ التخطيط لا يفقد النقرات فقط، بل يفقد القدرة على التعلم. بدون مصادر منفصلة لن تعرف أين تعيد الاستثمار." },
      ] },
    ],
    faqTitle: "أسئلة شائعة عن QR للتطبيقات",
    faq: [
      { question: "هل أحتاج QR لـ App Store وآخر لـ Google Play؟", answer: "غالبا لا. QR واحد متصل برابط ذكي يمكنه اكتشاف الجهاز وإرساله إلى الوجهة الصحيحة." },
      { question: "هل يمكن تغيير الوجهة بعد الطباعة؟", answer: "نعم إذا كان QR يفتح URL قابلا للتعديل. أما الرابط المباشر إلى المتجر فيحتاج رمزا جديدا." },
      { question: "هل المسح يساوي التثبيت؟", answer: "لا. المسح أو النقر يدل على اهتمام. إسناد التثبيت يحتاج بيانات يمكن التحقق منها." },
      { question: "ماذا يرى مستخدمو سطح المكتب؟", answer: "صفحة بديلة تعرض وعد التطبيق وزري App Store وGoogle Play بوضوح." },
      { question: "كيف أتجنب خلط المصادر؟", answer: "أنشئ رابطا وQR منفصلا لكل مصدر مهم تريد مقارنته." },
    ],
    cta: { title: "أنشئ QR يرسل إلى المتجر الصحيح", text: "ابن رابطا لتطبيقك، صله بالـ QR، وافصل النقرات حسب الحملة أو القناة أو الشريك.", label: "إنشاء رابط التطبيق" },
  },
  hi: {
    title: "App QR code: users को सही store पर भेजें",
    excerpt: "जानें कि app के लिए ऐसा QR code कैसे बनाएं जो device पहचानता है, App Store या Google Play पर भेजता है और clicks को बिना झूठी attribution के मापता है.",
    category: "App QR",
    readTime: "9 min",
    introduction: [
      "App QR code उस व्यक्ति को सही install destination तक ले जाता है जो packaging, poster, event, shop window या flyer से scan करता है. बात सिर्फ QR image बनाने की नहीं है. उसे ऐसे smart link से जोड़ना जरूरी है जो iOS, Android या desktop पहचान सके, fallback page रखे और campaign के हिसाब से clicks अलग करे.",
      "आम गलती QR को static image मानना है. App के लिए QR एक controlled entry होना चाहिए: एक printed code, editable URL, device rules और honest measurement. अगर store listing, promotion या campaign बदलता है, तो आपको सब कुछ दोबारा print नहीं करना चाहिए; link destination update होना चाहिए.",
    ],
    sections: [
      { heading: "App QR code कौन सी समस्या हल करता है", blocks: [
        { type: "paragraph", text: "QR physical moment को digital action से जोड़ता है. User किसी box, table, display, presentation screen या business card के सामने हो सकता है. वहां वह app का नाम search करके store चुनना और similar results में सही listing ढूंढना नहीं चाहता. वह scan करके आगे बढ़ना चाहता है." },
        { type: "bullets", items: ["Offline या non-web download journey में friction घटता है.", "iOS और Android के लिए दो अलग QR print करने की जरूरत कम होती है.", "Intermediate URL हो तो printed material बदले बिना destination बदला जा सकता है.", "Event, store, packaging, creator, poster या partner के clicks अलग दिखते हैं.", "Desktop, tablet और unsupported devices को fallback experience मिलता है."] },
        { type: "callout", title: "मुख्य बात", text: "QR को सारी logic नहीं रखनी चाहिए. QR stable URL खोलता है; routing, measurement और edits उस link के पीछे होने चाहिए." },
      ] },
      { heading: "App download QR कैसे काम करना चाहिए", blocks: [
        { type: "paragraph", text: "सही flow image बनाने से पहले शुरू होता है. Campaign या material के लिए एक URL बनाएं. वह URL device detect करे: iPhone या iPad को App Store, Android को Google Play और desktop को ऐसी page पर भेजे जहां दोनों store buttons हों." },
        { type: "heading", text: "एक QR, कई destinations" },
        { type: "paragraph", text: "हर operating system के लिए अलग QR print करने की जरूरत नहीं है. Smart link click के समय compatible destination चुन सकता है. Packaging और offline material में यह खास जरूरी है क्योंकि scanning device पहले से पता नहीं होता." },
        { type: "heading", text: "Editable URL" },
        { type: "paragraph", text: "Direct store QR rigid होता है. Intermediate URL से destination, parameters, fallback page और campaign labels print के बाद भी update किए जा सकते हैं." },
        { type: "heading", text: "Measurement बिना exaggeration" },
        { type: "paragraph", text: "Source, device और date के हिसाब से scans या clicks मापे जा सकते हैं. लेकिन जब तक click और install के बीच verifiable link नहीं है, हर install को QR से attributed नहीं कहा जा सकता. Data को interest compare करने के लिए इस्तेमाल करें." },
      ] },
      { heading: "Step-by-step plan", blocks: [
        { type: "steps", items: [
          { title: "Use case define करें", text: "Permanent packaging QR और दो दिन के event poster की जरूरत अलग होती है." },
          { title: "हर source के लिए link बनाएं", text: "Shop window, flyer, partner, creator, event या product batch को अलग रखें." },
          { title: "Device destinations सेट करें", text: "iOS को App Store, Android को Google Play और desktop को दोनों buttons वाली page पर भेजें." },
          { title: "Fallback page रखें", text: "Page QR की promise दोहराए और clear next steps दे." },
          { title: "Print से पहले test करें", text: "iPhone, Android, camera, desktop और in-app browsers से scan करें." },
          { title: "Margin और contrast रखें", text: "White space, simple background और actual distance पर readable size test करें." },
          { title: "Data अलग पढ़ें", text: "Clicks, device, source और period को installs के साथ confuse न करें." }
        ] },
        { type: "paragraph", text: "सबसे जरूरी step हर source के लिए अलग link है. अगर वही QR poster, box और partnership में दिखता है, तो आपको सिर्फ total activity दिखेगी, winning material नहीं." },
      ] },
      { heading: "Useful examples", blocks: [
        { type: "bullets", items: ["Retail: product के पास QR loyalty app खोलता है.", "Restaurants: table QR ordering, booking या points app खोलता है.", "Events: हर booth या talk अलग link use करता है.", "Packaging: box QR support, registration या repurchase app पर ले जाता है.", "Creators: हर collaborator का अलग QR या link होता है.", "Support: printed instructions सही app तक ले जाती हैं और onboarding बदलने पर update रह सकती हैं."] },
        { type: "link", text: "अगर आप store listing भी optimize कर रहे हैं, तो इसे ", label: "App Store Optimization", to: "/blog/app-store-optimization-aso-guia", after: " guide के साथ जोड़ें ताकि QR message और listing एक ही promise दें." },
        { type: "callout", title: "Practical example", text: "एक brand 20,000 boxes पर QR print करता है. Code editable summer-packaging link खोलता है. Promotion बदलने पर destination और message link में बदलते हैं, boxes में नहीं." },
      ] },
      { heading: "क्या measure करें", blocks: [
        { type: "paragraph", text: "Useful measurement clean naming से शुरू होता है: source, campaign और variant. फिर clicks को device, date और channel से पढ़ा जाता है ताकि पता चले interest कहां बन रहा है और journey कहां टूट रही है." },
        { type: "bullets", items: ["हर QR के observed clicks या scans.", "Detected device और selected destination.", "हर store या fallback page पर भेजे गए users का share.", "Message या placement change से पहले और बाद की comparison.", "Store visits या installs के साथ careful comparison."] },
        { type: "link", text: "Concepts mix न हों, इसके लिए ", label: "channel-wise app download attribution", to: "/blog/atribucion-descargas-apps-medir-canal-real", after: " guide भी पढ़ें. QR click आपका signal है; attributed install के लिए stronger data चाहिए." },
      ] },
      { heading: "Common mistakes", blocks: [
        { type: "bullets", items: ["QR को direct store पर point करके editability खो देना.", "हर channel में वही QR use करना.", "iOS, Android, desktop और in-app browsers test न करना.", "बहुत छोटा या low-contrast code बनाना.", "Printed promise से अलग page पर भेजना.", "Clicks को attributed installs कहना.", "यह भूलना कि printed material temporary promotion से ज्यादा चलता है."] },
        { type: "paragraph", text: "Poorly planned QR सिर्फ clicks नहीं खोता; learning भी खो देता है. Sources अलग न हों तो आप तय नहीं कर सकते कि budget कहां दोबारा लगाना है." },
      ] },
    ],
    faqTitle: "App QR codes पर FAQ",
    faq: [
      { question: "क्या App Store और Google Play के लिए अलग QR चाहिए?", answer: "आमतौर पर नहीं. Smart link से जुड़ा एक QR device detect करके सही destination पर भेज सकता है." },
      { question: "Print के बाद destination बदल सकता है?", answer: "हां, अगर QR editable URL खोलता है. Direct store link हो तो नया code चाहिए." },
      { question: "क्या scan install के बराबर है?", answer: "नहीं. Scan या click interest दिखाता है. Install attribution के लिए verifiable app या store data चाहिए." },
      { question: "Desktop users को क्या दिखाएं?", answer: "Fallback page दिखाएं जिसमें app promise और दोनों store buttons साफ हों." },
      { question: "कई placements का data mix न हो, कैसे?", answer: "हर important source के लिए अलग link और QR बनाएं." },
    ],
    cta: { title: "सही store पर भेजने वाला QR बनाएं", text: "App link बनाएं, उसे QR से जोड़ें और campaign, channel या partner के हिसाब से clicks अलग रखें.", label: "मेरा app link बनाएं" },
  },
};
