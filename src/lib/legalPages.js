import { ShieldCheck, Cookie, FileText } from "lucide-react";

export const legalPagesEs = {
  privacy: {
    path: "/privacidad",
    title: "Política de Privacidad",
    shortTitle: "Privacidad",
    icon: ShieldCheck,
    intro:
      "Esta Política de Privacidad explica cómo David Trotonda trata los datos personales cuando usas Link My App, una plataforma para crear smart links, códigos QR y estadísticas de clics para apps y proyectos digitales.",
    sections: [
      {
        title: "Responsable del tratamiento",
        paragraphs: [
          "Razón social: David Trotonda.",
          "CIF: BXXXXX.",
          "Correo electrónico de contacto: your-email@example.com.",
          "Servicio: Link My App, disponible en link-my.app.",
        ],
      },
      {
        title: "Datos que recopilamos",
        paragraphs: [
          "Datos de cuenta: nombre, email, identificador de usuario, foto de perfil si accedes con Google y datos necesarios para iniciar sesión con email.",
          "Datos de smart links: nombre de la app, URL de App Store, URL de Google Play, enlace alternativo, slug o URL personalizada, estado del enlace y código QR asociado.",
          "Datos de uso y estadísticas: clics, fecha y hora, destino elegido, fuente del clic, dispositivo aproximado, navegador, sistema operativo y señales técnicas necesarias para seguridad, prevención de abuso y métricas agregadas.",
          "Datos de pago, si contratas Pro: información de facturación y confirmación de pago gestionada por el proveedor de pagos. Link My App no almacena datos completos de tarjeta.",
        ],
      },
      {
        title: "Finalidades del tratamiento",
        paragraphs: [
          "Crear y gestionar tu cuenta privada.",
          "Guardar los smart links que creas y redirigir a cada usuario al destino configurado.",
          "Generar códigos QR y mostrar estadísticas de clics, dispositivos, fuentes y descargas estimadas.",
          "Prevenir usos abusivos, enlaces fraudulentos, accesos no autorizados y problemas técnicos.",
          "Gestionar comunicaciones de soporte, comentarios y mejoras del servicio.",
          "Gestionar pagos, facturación y obligaciones legales cuando proceda.",
        ],
      },
      {
        title: "Base legal",
        paragraphs: [
          "Ejecución de un contrato o medidas precontractuales cuando creas una cuenta, generas smart links o contratas una función de pago.",
          "Consentimiento cuando nos contactas, aceptas comunicaciones o autorizas cookies no necesarias.",
          "Interés legítimo para mantener la seguridad del servicio, prevenir fraude, conservar registros técnicos razonables y mejorar la plataforma.",
          "Cumplimiento de obligaciones legales en materia fiscal, contable y de atención a derechos de protección de datos.",
        ],
      },
      {
        title: "Proveedores y terceros",
        paragraphs: [
          "Firebase y Google Cloud: autenticación, base de datos, hosting y servicios técnicos necesarios para el funcionamiento de Link My App.",
          "Google Workspace: gestión de correo corporativo y soporte.",
          "Stripe u otro proveedor equivalente, si se activa el pago Pro: procesamiento seguro de pagos y facturación.",
          "Herramientas de analítica o rendimiento, si se habilitan: medición agregada del uso del servicio previa configuración correspondiente.",
          "Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En esos casos aplicamos garantías adecuadas, como decisiones de adecuación o Cláusulas Contractuales Tipo aprobadas por la Comisión Europea.",
        ],
      },
      {
        title: "Conservación de los datos",
        paragraphs: [
          "Datos de cuenta: mientras mantengas la cuenta activa o hasta que solicites su eliminación.",
          "Smart links y estadísticas: mientras conserves los enlaces o durante el tiempo necesario para prestar el servicio y mostrar el historial contratado.",
          "Registros técnicos y seguridad: durante plazos limitados y proporcionados a la finalidad de seguridad y prevención de abuso.",
          "Facturación: durante los plazos exigidos por la normativa fiscal y contable, normalmente 6 años.",
        ],
      },
      {
        title: "Seguridad",
        paragraphs: [
          "Aplicamos medidas técnicas y organizativas para proteger la información, incluyendo cifrado en tránsito mediante HTTPS, control de accesos, reglas de seguridad en Firebase y revisión periódica de la configuración.",
          "Aunque trabajamos para proteger el servicio, ningún sistema conectado a internet puede garantizar seguridad absoluta.",
        ],
      },
      {
        title: "Tus derechos",
        paragraphs: [
          "Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a your-email@example.com.",
          "También puedes retirar tu consentimiento cuando el tratamiento dependa de él, sin afectar a la licitud del tratamiento realizado anteriormente.",
          "Si consideras que no tratamos tus datos correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos en www.aepd.es.",
        ],
      },
      {
        title: "Cambios en esta política",
        paragraphs: [
          "Podemos actualizar esta Política de Privacidad para reflejar cambios legales, técnicos o funcionales. Cuando el cambio sea relevante, lo comunicaremos de forma razonable dentro del servicio.",
        ],
      },
    ],
  },
  cookies: {
    path: "/cookies",
    title: "Política de Cookies",
    shortTitle: "Cookies",
    icon: Cookie,
    intro:
      "Esta Política de Cookies explica qué tecnologías puede utilizar Link My App para iniciar sesión, mantener la seguridad, recordar preferencias y medir el uso del servicio cuando corresponda.",
    sections: [
      {
        title: "Qué son las cookies",
        paragraphs: [
          "Las cookies y tecnologías similares, como localStorage o IndexedDB, permiten que una web recuerde información del navegador para prestar funciones, mantener una sesión o medir el uso del servicio.",
          "Algunas son necesarias para que Link My App funcione. Otras, como las analíticas no esenciales, solo deben usarse cuando exista base legal adecuada y configuración de consentimiento.",
        ],
      },
      {
        title: "Cookies técnicas necesarias",
        paragraphs: [
          "Pueden utilizarse para autenticar usuarios, mantener la sesión, proteger formularios, detectar errores, prevenir abusos y conservar preferencias básicas de funcionamiento.",
          "Estas tecnologías son necesarias para prestar el servicio solicitado y no requieren consentimiento previo cuando se usan exclusivamente para esa finalidad.",
        ],
      },
      {
        title: "Analítica y medición",
        paragraphs: [
          "Link My App puede medir clics en smart links, fuente del clic, dispositivo aproximado, destino y descargas estimadas dentro del panel del usuario.",
          "Cuando se activen herramientas de analítica web no esenciales, se informará de ello y se solicitará consentimiento cuando sea obligatorio.",
        ],
      },
      {
        title: "Cookies de terceros",
        paragraphs: [
          "Firebase y Google pueden utilizar tecnologías necesarias para autenticación, seguridad y funcionamiento técnico.",
          "Los proveedores de pago, si se activa la contratación Pro, pueden usar tecnologías necesarias para procesar pagos y prevenir fraude.",
          "No usamos cookies publicitarias comportamentales salvo que se informe de forma expresa y se obtenga el consentimiento correspondiente.",
        ],
      },
      {
        title: "Gestión y retirada del consentimiento",
        paragraphs: [
          "Puedes bloquear, eliminar o limitar cookies desde la configuración de tu navegador.",
          "Si en el futuro Link My App incorpora un panel de preferencias de cookies, podrás modificar o retirar tu consentimiento desde ese panel.",
          "La eliminación de cookies técnicas o datos locales puede cerrar tu sesión o impedir que algunas funciones funcionen correctamente.",
        ],
      },
      {
        title: "Tabla orientativa",
        paragraphs: [
          "Sesión y autenticación: necesarias para iniciar sesión y mantener tu cuenta segura.",
          "Seguridad y prevención de abuso: necesarias para proteger formularios, reglas de acceso y uso legítimo del servicio.",
          "Preferencias: pueden recordar ajustes básicos de interfaz.",
          "Analítica: puede ayudar a entender el uso del servicio y mejorar la plataforma, siempre bajo la base legal aplicable.",
        ],
      },
    ],
  },
  terms: {
    path: "/terminos",
    title: "Términos y Condiciones",
    shortTitle: "Términos",
    icon: FileText,
    intro:
      "Estos Términos y Condiciones regulan el acceso y uso de Link My App, herramienta de David Trotonda para crear enlaces inteligentes, códigos QR y estadísticas de clics.",
    sections: [
      {
        title: "Identificación del titular",
        paragraphs: [
          "Titular: David Trotonda.",
          "CIF: BXXXXX.",
          "Correo electrónico: your-email@example.com.",
          "Servicio: Link My App, disponible en link-my.app.",
        ],
      },
      {
        title: "Objeto del servicio",
        paragraphs: [
          "Link My App permite crear smart links para una app o proyecto digital introduciendo enlaces de App Store, Google Play, un destino alternativo y una URL personalizada.",
          "La herramienta puede generar un enlace único, un código QR asociado y estadísticas de clics.",
          "La redirección depende de factores técnicos como navegador, dispositivo, sistema operativo, tiendas de aplicaciones o configuración del usuario.",
        ],
      },
      {
        title: "Cuenta de usuario",
        paragraphs: [
          "Para crear y gestionar links necesitas una cuenta con Google o email.",
          "El usuario debe facilitar información veraz, mantener la confidencialidad de sus credenciales y avisar si detecta un uso no autorizado.",
          "Link My App puede suspender cuentas o enlaces que incumplan estos términos o supongan riesgo para terceros.",
        ],
      },
      {
        title: "Condiciones de uso",
        paragraphs: [
          "El usuario garantiza que tiene derecho a usar las URLs, nombres de apps, marcas, imágenes o contenidos que introduzca en la plataforma.",
          "No se permite usar Link My App para phishing, malware, spam, suplantación de identidad, fraude, contenido ilegal o vulneración de derechos de terceros.",
          "El usuario es responsable de mantener actualizados los destinos de sus smart links.",
        ],
      },
      {
        title: "URLs y dominios personalizados",
        paragraphs: [
          "Link My App permite elegir slugs o nombres personalizados dentro del dominio principal, por ejemplo link-my.app/descargarmiapp.",
          "Para usar un dominio propio como davido.com/descargarmiapp es necesario que el usuario sea titular del dominio y configure DNS o los registros técnicos indicados por Link My App.",
          "Link My App puede rechazar o retirar URLs que infrinjan marcas, derechos de terceros o normas de uso aceptable.",
        ],
      },
      {
        title: "Estadísticas y descargas estimadas",
        paragraphs: [
          "Las estadísticas de clics se calculan con los eventos registrados por la plataforma.",
          "Las descargas mostradas sin integración SDK son estimaciones basadas en porcentajes y señales técnicas disponibles. No equivalen a instalaciones verificadas por Apple, Google o la app del cliente.",
          "Para atribución exacta de instalaciones puede ser necesaria una integración adicional en la app del cliente.",
        ],
      },
      {
        title: "Planes y pagos",
        paragraphs: [
          "La versión gratuita puede limitar el número de smart links, QR o estadísticas disponibles.",
          "El plan Pro de por vida desbloquea funciones indicadas en la página de precios, salvo cambios relevantes comunicados antes de la contratación.",
          "Los pagos se procesan mediante proveedores externos seguros. Las condiciones fiscales y de facturación se mostrarán durante el proceso de compra cuando esté disponible.",
        ],
      },
      {
        title: "Disponibilidad y cambios",
        paragraphs: [
          "Trabajamos para mantener Link My App disponible, pero el servicio puede verse afectado por mantenimiento, incidencias técnicas, proveedores externos o fuerza mayor.",
          "Link My App puede mejorar, modificar o retirar funciones siempre que no se limiten derechos adquiridos de forma injustificada.",
        ],
      },
      {
        title: "Responsabilidad",
        paragraphs: [
          "Link My App no responde por el contenido de enlaces externos configurados por los usuarios ni por decisiones de las tiendas de aplicaciones.",
          "La responsabilidad total de Link My App, cuando legalmente proceda, queda limitada al importe pagado por el usuario por el servicio afectado, salvo en casos donde la ley no permita esa limitación.",
        ],
      },
      {
        title: "Ley aplicable",
        paragraphs: [
          "Estos términos se rigen por la legislación española. Para cualquier conflicto, las partes se someten a los juzgados y tribunales competentes conforme a la normativa aplicable.",
        ],
      },
    ],
  },
};

export const legalPagesEn = {
  privacy: {
    path: "/privacy",
    title: "Privacy Policy",
    shortTitle: "Privacy",
    icon: ShieldCheck,
    intro:
      "This Privacy Policy explains how David Trotonda handles personal data when you use Link My App, a platform to create smart links, QR codes and click analytics for apps and digital projects.",
    sections: [
      {
        title: "Data Controller",
        paragraphs: [
          "Company name: David Trotonda.",
          "Tax ID: BXXXXX.",
          "Contact email: your-email@example.com.",
          "Service: Link My App, available at link-my.app.",
        ],
      },
      {
        title: "Data we collect",
        paragraphs: [
          "Account data: name, email, user identifier, profile picture if you access with Google and necessary data to log in with email.",
          "Smart link data: app name, App Store URL, Google Play URL, fallback link, slug or custom URL, link status and associated QR code.",
          "Usage data and analytics: clicks, date and time, chosen destination, click source, approximate device, browser, operating system and technical signals necessary for security, abuse prevention and aggregated metrics.",
          "Payment data, if you upgrade to Pro: billing information and payment confirmation managed by the payment provider. Link My App does not store full card data.",
        ],
      },
      {
        title: "Purposes of processing",
        paragraphs: [
          "Create and manage your private account.",
          "Save the smart links you create and redirect each user to the configured destination.",
          "Generate QR codes and show analytics of clicks, devices, sources and estimated downloads.",
          "Prevent abusive use, fraudulent links, unauthorized access and technical problems.",
          "Manage support communications, feedback and service improvements.",
          "Manage payments, billing and legal obligations when applicable.",
        ],
      },
      {
        title: "Legal basis",
        paragraphs: [
          "Performance of a contract or pre-contractual measures when you create an account, generate smart links or purchase a paid feature.",
          "Consent when you contact us, accept communications or authorize non-necessary cookies.",
          "Legitimate interest to maintain the security of the service, prevent fraud, keep reasonable technical logs and improve the platform.",
          "Compliance with legal obligations regarding tax, accounting and data protection rights.",
        ],
      },
      {
        title: "Providers and third parties",
        paragraphs: [
          "Firebase and Google Cloud: authentication, database, hosting and technical services necessary for the operation of Link My App.",
          "Google Workspace: corporate email management and support.",
          "Stripe or other equivalent provider, if Pro payment is activated: secure payment processing and billing.",
          "Analytics or performance tools, if enabled: aggregated measurement of service usage after configuration.",
          "Some providers may process data outside the European Economic Area. In these cases we apply adequate guarantees, such as adequacy decisions or Standard Contractual Clauses approved by the European Commission.",
        ],
      },
      {
        title: "Data retention",
        paragraphs: [
          "Account data: as long as you keep the account active or until you request its deletion.",
          "Smart links and analytics: as long as you keep the links or for the time necessary to provide the service and show the contracted history.",
          "Technical and security logs: for limited periods proportionate to the purpose of security and abuse prevention.",
          "Billing: for the periods required by tax and accounting regulations, usually 6 years.",
        ],
      },
      {
        title: "Security",
        paragraphs: [
          "We apply technical and organizational measures to protect information, including in-transit encryption via HTTPS, access control, Firebase security rules and regular review of configurations.",
          "Although we work to protect the service, no system connected to the internet can guarantee absolute security.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "You can exercise your rights of access, rectification, deletion, opposition, limitation and portability by writing to your-email@example.com.",
          "You can also withdraw your consent when the processing depends on it, without affecting the lawfulness of the processing carried out previously.",
          "If you believe we do not handle your data correctly, you can file a claim with the Spanish Data Protection Agency at www.aepd.es.",
        ],
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "We may update this Privacy Policy to reflect legal, technical or functional changes. When the change is relevant, we will communicate it reasonably within the service.",
        ],
      },
    ],
  },
  cookies: {
    path: "/cookies",
    title: "Cookie Policy",
    shortTitle: "Cookies",
    icon: Cookie,
    intro:
      "This Cookie Policy explains what technologies Link My App may use to log in, maintain security, remember preferences and measure service usage when applicable.",
    sections: [
      {
        title: "What are cookies",
        paragraphs: [
          "Cookies and similar technologies, such as localStorage or IndexedDB, allow a website to remember browser information to provide functions, maintain a session or measure service usage.",
          "Some are necessary for Link My App to work. Others, such as non-essential analytics, should only be used when there is an adequate legal basis and consent configuration.",
        ],
      },
      {
        title: "Necessary technical cookies",
        paragraphs: [
          "They may be used to authenticate users, maintain the session, protect forms, detect errors, prevent abuse and keep basic operating preferences.",
          "These technologies are necessary to provide the requested service and do not require prior consent when used exclusively for that purpose.",
        ],
      },
      {
        title: "Analytics and measurement",
        paragraphs: [
          "Link My App can measure clicks on smart links, click source, approximate device, destination and estimated downloads within the user's dashboard.",
          "When non-essential web analytics tools are activated, this will be reported and consent will be requested when mandatory.",
        ],
      },
      {
        title: "Third-party cookies",
        paragraphs: [
          "Firebase and Google may use necessary technologies for authentication, security and technical operation.",
          "Payment providers, if Pro subscription is activated, may use necessary technologies to process payments and prevent fraud.",
          "We do not use behavioral advertising cookies unless expressly informed and the corresponding consent is obtained.",
        ],
      },
      {
        title: "Management and withdrawal of consent",
        paragraphs: [
          "You can block, delete or limit cookies from your browser settings.",
          "If in the future Link My App incorporates a cookie preference panel, you can modify or withdraw your consent from that panel.",
          "Deleting technical cookies or local data may log you out or prevent some functions from working properly.",
        ],
      },
      {
        title: "Guidance table",
        paragraphs: [
          "Session and authentication: necessary to log in and keep your account secure.",
          "Security and abuse prevention: necessary to protect forms, access rules and legitimate use of the service.",
          "Preferences: can remember basic interface settings.",
          "Analytics: can help understand service usage and improve the platform, always under the applicable legal basis.",
        ],
      },
    ],
  },
  terms: {
    path: "/terms",
    title: "Terms and Conditions",
    shortTitle: "Terms",
    icon: FileText,
    intro:
      "These Terms and Conditions regulate the access and use of Link My App, a tool by David Trotonda to create smart links, QR codes and click analytics.",
    sections: [
      {
        title: "Owner identification",
        paragraphs: [
          "Owner: David Trotonda.",
          "Tax ID: BXXXXX.",
          "Email: your-email@example.com.",
          "Service: Link My App, available at link-my.app.",
        ],
      },
      {
        title: "Purpose of the service",
        paragraphs: [
          "Link My App allows you to create smart links for an app or digital project by entering App Store, Google Play links, an alternative destination and a custom URL.",
          "The tool can generate a unique link, an associated QR code and click analytics.",
          "Redirection depends on technical factors such as browser, device, operating system, app stores or user configuration.",
        ],
      },
      {
        title: "User account",
        paragraphs: [
          "To create and manage links you need an account with Google or email.",
          "The user must provide truthful information, maintain the confidentiality of their credentials and notify if they detect unauthorized use.",
          "Link My App may suspend accounts or links that violate these terms or pose a risk to third parties.",
        ],
      },
      {
        title: "Terms of use",
        paragraphs: [
          "The user guarantees that they have the right to use the URLs, app names, brands, images or content they enter on the platform.",
          "Link My App is not allowed for phishing, malware, spam, identity theft, fraud, illegal content or infringement of third-party rights.",
          "The user is responsible for keeping the destinations of their smart links updated.",
        ],
      },
      {
        title: "Custom URLs and domains",
        paragraphs: [
          "Link My App allows you to choose custom slugs or names within the main domain, for example link-my.app/downloadmyapp.",
          "To use your own domain like davido.com/downloadmyapp, the user must be the owner of the domain and configure DNS or technical records indicated by Link My App.",
          "Link My App may reject or remove URLs that infringe trademarks, third-party rights or acceptable use policies.",
        ],
      },
      {
        title: "Analytics and estimated downloads",
        paragraphs: [
          "Click stats are calculated with events recorded by the platform.",
          "Downloads shown without SDK integration are estimates based on percentages and available technical signals. They are not equivalent to installations verified by Apple, Google or the client's app.",
          "For exact installation attribution, an additional integration in the client's app may be necessary.",
        ],
      },
      {
        title: "Plans and payments",
        paragraphs: [
          "The free version may limit the number of smart links, QR or available stats.",
          "The Lifetime Pro plan unlocks features indicated on the pricing page, barring relevant changes communicated prior to contracting.",
          "Payments are processed through secure external providers. Tax and billing conditions will be displayed during the checkout process when available.",
        ],
      },
      {
        title: "Availability and changes",
        paragraphs: [
          "We work to keep Link My App available, but the service may be affected by maintenance, technical incidents, external providers or force majeure.",
          "Link My App may improve, modify or remove features as long as acquired rights are not restricted unjustifiably.",
        ],
      },
      {
        title: "Liability",
        paragraphs: [
          "Link My App is not responsible for the content of external links configured by users or for decisions by app stores.",
          "The total liability of Link My App, when legally applicable, is limited to the amount paid by the user for the affected service, except in cases where the law does not allow such limitation.",
        ],
      },
      {
        title: "Governing law",
        paragraphs: [
          "These terms are governed by Spanish law. For any conflict, the parties submit to the competent courts and tribunals according to the applicable regulations.",
        ],
      },
    ],
  },
};

export const legalTabsEs = [
  { key: "privacy", label: "Política de Privacidad", icon: ShieldCheck },
  { key: "cookies", label: "Política de Cookies", icon: Cookie },
  { key: "terms", label: "Términos y Condiciones", icon: FileText },
];

export const legalTabsEn = [
  { key: "privacy", label: "Privacy Policy", icon: ShieldCheck },
  { key: "cookies", label: "Cookie Policy", icon: Cookie },
  { key: "terms", label: "Terms and Conditions", icon: FileText },
];

export const legalTabsFr = [
  { key: "privacy", label: "Politique de Confidentialité", icon: ShieldCheck },
  { key: "cookies", label: "Politique relative aux Cookies", icon: Cookie },
  { key: "terms", label: "Conditions Générales", icon: FileText },
];

export const legalPagesFr = {
  privacy: {
    path: "/privacy",
    title: "Politique de Confidentialité",
    shortTitle: "Confidentialité",
    icon: ShieldCheck,
    intro:
      "Cette politique de confidentialité explique comment David Trotonda traite les données personnelles lorsque vous utilisez Link My App, une plateforme pour créer des liens intelligents, des codes QR et des statistiques de clics pour les applications et projets numériques.",
    sections: [
      {
        title: "Responsable du traitement",
        paragraphs: [
          "Raison sociale : David Trotonda.",
          "NIF : BXXXXX.",
          "E-mail de contact : your-email@example.com.",
          "Service : Link My App, disponible sur link-my.app.",
        ],
      },
      {
        title: "Données que nous collectons",
        paragraphs: [
          "Données de compte : nom, e-mail, identifiant utilisateur, photo de profil si vous accédez avec Google et données nécessaires pour vous connecter avec un e-mail.",
          "Données des liens intelligents : nom de l'application, URL de l'App Store, URL de Google Play, lien alternatif, slug ou URL personnalisée, état du lien et code QR associé.",
          "Données d'utilisation et statistiques : clics, date et heure, destination choisie, source du clic, appareil approximatif, navigateur, système d'exploitation et signaux techniques nécessaires pour la sécurité, la prévention des abus et les métriques agrégées.",
          "Données de paiement, si vous passez à la version Pro : informations de facturation et confirmation de paiement gérées par le fournisseur de paiement. Link My App ne stocke pas les données complètes de la carte.",
        ],
      },
      {
        title: "Finalités du traitement",
        paragraphs: [
          "Créer et gérer votre compte privé.",
          "Sauvegarder les liens intelligents que vous créez et rediriger chaque utilisateur vers la destination configurée.",
          "Générer des codes QR et afficher des statistiques de clics, d'appareils, de sources et de téléchargements estimés.",
          "Prévenir l'utilisation abusive, les liens frauduleux, les accès non autorisés et les problèmes techniques.",
          "Gérer les communications d'assistance, les commentaires et les améliorations du service.",
          "Gérer les paiements, la facturation et les obligations légales le cas échéant.",
        ],
      },
      {
        title: "Base légale",
        paragraphs: [
          "Exécution d'un contrat ou mesures précontractuelles lorsque vous créez un compte, générez des liens intelligents ou achetez une fonctionnalité payante.",
          "Consentement lorsque vous nous contactez, acceptez des communications ou autorisez des cookies non nécessaires.",
          "Intérêt légitime pour maintenir la sécurité du service, prévenir la fraude, conserver des journaux techniques raisonnables et améliorer la plateforme.",
          "Respect des obligations légales en matière fiscale, comptable et de protection des données.",
        ],
      },
      {
        title: "Fournisseurs et tiers",
        paragraphs: [
          "Firebase et Google Cloud : authentification, base de données, hébergement et services techniques nécessaires au fonctionnement de Link My App.",
          "Google Workspace : gestion de messagerie d'entreprise et assistance.",
          "Stripe ou autre fournisseur équivalent, si le paiement Pro est activé : traitement sécurisé des paiements et facturation.",
          "Outils d'analyse ou de performance, si activés : mesure agrégée de l'utilisation du service après configuration.",
          "Certains fournisseurs peuvent traiter des données en dehors de l'Espace Économique Européen. Dans ces cas, nous appliquons des garanties adéquates, telles que des décisions d'adéquation ou des Clauses Contractuelles Types approuvées par la Commission européenne.",
        ],
      },
      {
        title: "Conservation des données",
        paragraphs: [
          "Données de compte : tant que vous gardez le compte actif ou jusqu'à ce que vous demandiez sa suppression.",
          "Liens intelligents et statistiques : tant que vous conservez les liens ou pour le temps nécessaire pour fournir le service et afficher l'historique contracté.",
          "Journaux techniques et de sécurité : pendant des périodes limitées proportionnées au but de sécurité et de prévention des abus.",
          "Facturation : pour les périodes requises par les réglementations fiscales et comptables, généralement 6 ans.",
        ],
      },
      {
        title: "Sécurité",
        paragraphs: [
          "Nous appliquons des mesures techniques et organisationnelles pour protéger les informations, y compris le cryptage en transit via HTTPS, le contrôle d'accès, les règles de sécurité Firebase et l'examen régulier des configurations.",
          "Bien que nous travaillions pour protéger le service, aucun système connecté à Internet ne peut garantir une sécurité absolue.",
        ],
      },
      {
        title: "Vos droits",
        paragraphs: [
          "Vous pouvez exercer vos droits d'accès, de rectification, de suppression, d'opposition, de limitation et de portabilité en écrivant à your-email@example.com.",
          "Vous pouvez également retirer votre consentement lorsque le traitement en dépend, sans affecter la légalité du traitement effectué précédemment.",
          "Si vous pensez que nous ne traitons pas correctement vos données, vous pouvez déposer une réclamation auprès de l'Agence espagnole de protection des données sur www.aepd.es.",
        ],
      },
      {
        title: "Modifications de cette politique",
        paragraphs: [
          "Nous pouvons mettre à jour cette politique de confidentialité pour refléter les changements légaux, techniques ou fonctionnels. Lorsque le changement est pertinent, nous le communiquerons raisonnablement dans le service.",
        ],
      },
    ],
  },
  cookies: {
    path: "/cookies",
    title: "Politique relative aux Cookies",
    shortTitle: "Cookies",
    icon: Cookie,
    intro:
      "Cette politique relative aux cookies explique quelles technologies Link My App peut utiliser pour se connecter, maintenir la sécurité, mémoriser vos préférences et mesurer l'utilisation du service le cas échéant.",
    sections: [
      {
        title: "Que sont les cookies",
        paragraphs: [
          "Les cookies et technologies similaires, tels que localStorage ou IndexedDB, permettent à un site web de mémoriser les informations du navigateur pour fournir des fonctions, maintenir une session ou mesurer l'utilisation du service.",
          "Certains sont nécessaires au fonctionnement de Link My App. D'autres, comme les analyses non essentielles, ne doivent être utilisés que lorsqu'il existe une base légale adéquate et une configuration de consentement.",
        ],
      },
      {
        title: "Cookies techniques nécessaires",
        paragraphs: [
          "Ils peuvent être utilisés pour authentifier les utilisateurs, maintenir la session, protéger les formulaires, détecter les erreurs, prévenir les abus et conserver les préférences de fonctionnement de base.",
          "Ces technologies sont nécessaires pour fournir le service demandé et ne nécessitent pas de consentement préalable lorsqu'elles sont utilisées exclusivement à cette fin.",
        ],
      },
      {
        title: "Analyse et mesure",
        paragraphs: [
          "Link My App peut mesurer les clics sur les liens intelligents, la source du clic, l'appareil approximatif, la destination et les téléchargements estimés dans le tableau de bord de l'utilisateur.",
          "Lorsque des outils d'analyse web non essentiels sont activés, cela sera signalé et le consentement sera demandé lorsqu'il est obligatoire.",
        ],
      },
      {
        title: "Cookies tiers",
        paragraphs: [
          "Firebase et Google peuvent utiliser les technologies nécessaires pour l'authentification, la sécurité et le fonctionnement technique.",
          "Les fournisseurs de paiement, si l'abonnement Pro est activé, peuvent utiliser les technologies nécessaires pour traiter les paiements et prévenir la fraude.",
          "Nous n'utilisons pas de cookies publicitaires comportementaux à moins d'en être expressément informés et d'obtenir le consentement correspondant.",
        ],
      },
      {
        title: "Gestion et retrait du consentement",
        paragraphs: [
          "Vous pouvez bloquer, supprimer ou limiter les cookies dans les paramètres de votre navigateur.",
          "Si, à l'avenir, Link My App intègre un panneau de préférences pour les cookies, vous pourrez modifier ou retirer votre consentement à partir de ce panneau.",
          "La suppression des cookies techniques ou des données locales peut vous déconnecter ou empêcher certaines fonctions de fonctionner correctement.",
        ],
      },
      {
        title: "Tableau d'orientation",
        paragraphs: [
          "Session et authentification : nécessaires pour se connecter et protéger votre compte.",
          "Sécurité et prévention des abus : nécessaires pour protéger les formulaires, les règles d'accès et l'utilisation légitime du service.",
          "Préférences : peuvent mémoriser les paramètres d'interface de base.",
          "Analytique : peut aider à comprendre l'utilisation du service et à améliorer la plateforme, toujours sous la base légale applicable.",
        ],
      },
    ],
  },
  terms: {
    path: "/terms",
    title: "Conditions Générales",
    shortTitle: "Conditions",
    icon: FileText,
    intro:
      "Ces Termes et Conditions régissent l'accès et l'utilisation de Link My App, un outil de David Trotonda pour créer des liens intelligents, des codes QR et des statistiques de clics.",
    sections: [
      {
        title: "Identification du propriétaire",
        paragraphs: [
          "Propriétaire : David Trotonda.",
          "NIF : BXXXXX.",
          "E-mail : your-email@example.com.",
          "Service : Link My App, disponible sur link-my.app.",
        ],
      },
      {
        title: "Objet du service",
        paragraphs: [
          "Link My App vous permet de créer des liens intelligents pour une application ou un projet numérique en saisissant les liens App Store, Google Play, une destination alternative et une URL personnalisée.",
          "L'outil peut générer un lien unique, un code QR associé et des statistiques de clics.",
          "La redirection dépend de facteurs techniques tels que le navigateur, l'appareil, le système d'exploitation, les magasins d'applications ou la configuration de l'utilisateur.",
        ],
      },
      {
        title: "Compte utilisateur",
        paragraphs: [
          "Pour créer et gérer des liens, vous avez besoin d'un compte avec Google ou d'un e-mail.",
          "L'utilisateur doit fournir des informations véridiques, maintenir la confidentialité de ses identifiants et nous informer s'il détecte une utilisation non autorisée.",
          "Link My App peut suspendre les comptes ou les liens qui enfreignent ces conditions ou présentent un risque pour des tiers.",
        ],
      },
      {
        title: "Conditions d'utilisation",
        paragraphs: [
          "L'utilisateur garantit qu'il a le droit d'utiliser les URL, noms d'applications, marques, images ou contenus qu'il saisit sur la plateforme.",
          "Il est interdit d'utiliser Link My App pour du hameçonnage, des logiciels malveillants, du spam, de l'usurpation d'identité, de la fraude, du contenu illégal ou en violation des droits de tiers.",
          "L'utilisateur est responsable de la mise à jour des destinations de ses liens intelligents.",
        ],
      },
      {
        title: "URL et domaines personnalisés",
        paragraphs: [
          "Link My App vous permet de choisir des slugs ou des noms personnalisés dans le domaine principal, par exemple link-my.app/telechargermonapp.",
          "Pour utiliser votre propre domaine comme davido.com/telechargermonapp, l'utilisateur doit être le propriétaire du domaine et configurer les DNS ou les enregistrements techniques indiqués par Link My App.",
          "Link My App peut rejeter ou supprimer des URL qui enfreignent des marques déposées, les droits de tiers ou les politiques d'utilisation acceptable.",
        ],
      },
      {
        title: "Statistiques et téléchargements estimés",
        paragraphs: [
          "Les statistiques de clics sont calculées à l'aide d'événements enregistrés par la plateforme.",
          "Les téléchargements affichés sans intégration SDK sont des estimations basées sur des pourcentages et des signaux techniques disponibles. Ils ne sont pas équivalents aux installations vérifiées par Apple, Google ou l'application du client.",
          "Pour une attribution exacte de l'installation, une intégration supplémentaire dans l'application du client peut être nécessaire.",
        ],
      },
      {
        title: "Plans et paiements",
        paragraphs: [
          "La version gratuite peut limiter le nombre de liens intelligents, de codes QR ou de statistiques disponibles.",
          "Le plan Pro à vie débloque les fonctionnalités indiquées sur la page des tarifs, sous réserve de changements pertinents communiqués avant de s'abonner.",
          "Les paiements sont traités par l'intermédiaire de prestataires externes sécurisés. Les conditions fiscales et de facturation seront affichées pendant le processus de paiement, le cas échéant.",
        ],
      },
      {
        title: "Disponibilité et modifications",
        paragraphs: [
          "Nous travaillons pour que Link My App soit disponible, mais le service peut être affecté par la maintenance, les incidents techniques, les fournisseurs externes ou des cas de force majeure.",
          "Link My App peut améliorer, modifier ou supprimer des fonctionnalités tant que les droits acquis ne sont pas restreints de manière injustifiée.",
        ],
      },
      {
        title: "Responsabilité",
        paragraphs: [
          "Link My App n'est pas responsable du contenu des liens externes configurés par les utilisateurs ou des décisions prises par les magasins d'applications.",
          "La responsabilité totale de Link My App, lorsqu'elle est légalement applicable, est limitée au montant payé par l'utilisateur pour le service concerné, sauf dans les cas où la loi n'autorise pas une telle limitation.",
        ],
      },
      {
        title: "Loi applicable",
        paragraphs: [
          "Ces conditions sont régies par le droit espagnol. Pour tout conflit, les parties se soumettent aux cours et tribunaux compétents selon la réglementation applicable.",
        ],
      },
    ],
  },
};
