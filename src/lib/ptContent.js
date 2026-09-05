const sharedSmartLinkFaqs = [
  {
    q: "Posso combinar App Store, Google Play e site num único link?",
    a: "Sim. O Link My App detecta o dispositivo e envia iPhone para a App Store, Android para o Google Play e desktop para a URL alternativa que definires.",
  },
  {
    q: "Posso alterar o destino depois?",
    a: "Sim. A URL curta e o QR code continuam iguais. Podes alterar App Store, Google Play ou fallback no dashboard quando quiseres.",
  },
  {
    q: "Consigo ver de onde vêm os cliques?",
    a: "Sim. O dashboard mostra cliques por dispositivo, origem, campanha e QR code para perceberes que canais trazem downloads.",
  },
  {
    q: "Preciso de instalar um SDK na app?",
    a: "Não. Para criar o link de download da app não precisas de SDK nem de alterar a app. O Link My App funciona antes da instalação, no link e no QR.",
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
        title: "Sem smart link",
        rows: [
          "Dois botões de loja competem pela atenção.",
          "Utilizadores clicam na loja errada ou desistem.",
          "QR codes e campanhas ficam difíceis de medir.",
          "Cada canal precisa de explicações manuais.",
        ],
      },
      after: {
        title: "Com Link My App",
        rows: [
          "Um link leva cada dispositivo ao destino certo.",
          "Um QR code funciona para iPhone, Android e desktop.",
          "Cliques ficam separados por origem, dispositivo e campanha.",
          "Podes alterar destinos sem trocar o link ou reimprimir o QR.",
        ],
      },
    },
    realExamples: examples,
    tutorial,
    faqs: sharedSmartLinkFaqs,
  };
}

export const portugueseUseCases = {
  ecommerce: buildUseCase({
    slug: "link-download-app-ecommerce",
    label: "Ecommerce",
    title: "Link de download para apps de ecommerce",
    metaTitle: "Link de download para ecommerce - um QR code para App Store e Google Play",
    metaDescription:
      "Cria um smart link e QR code para a app da tua loja. iPhone, Android e desktop são enviados automaticamente para o destino certo.",
    h1: "Um link para gerar mais downloads da app da tua loja",
    eyebrow: "Apps de ecommerce",
    intro:
      "Quando clientes devem descarregar a tua app a partir de embalagens, newsletter, Instagram ou loja física, um único link de download é mais claro do que dois botões de loja.",
    painPoints: [
      "Embalagens com dois badges de loja ficam visualmente confusas.",
      "Clientes clicam na loja errada e abandonam antes do download.",
      "Newsletters com dois CTAs perdem cliques porque obrigam a escolher.",
      "Campanhas com influencers são difíceis de comparar quando todos partilham as mesmas URLs.",
      "QR codes em recibos ou caixas não podem apontar apenas para uma loja.",
      "Anúncios pagos desperdiçam orçamento quando enviam pessoas para a loja errada.",
    ],
    benefits: [
      { title: "Um CTA para todos os canais", text: "Usa a mesma URL curta em e-mail, anúncios, bio de Instagram, embalagem, recibos e site." },
      { title: "QR code para embalagem e loja", text: "Um QR code cobre iPhone, Android e desktop." },
      { title: "Campanhas mensuráveis", text: "Cria um smart link por canal ou influencer e compara os cliques." },
      { title: "Menos fricção no momento de compra", text: "Clientes chegam diretamente à loja certa sem tomar uma decisão extra." },
      { title: "Destinos editáveis", text: "Altera URLs de loja sem reimprimir embalagens, flyers ou QR codes." },
      { title: "Perfeito para retenção", text: "Leva clientes existentes de e-mail, packaging e social de volta para a app." },
    ],
    metrics: [
      { value: "1 QR", label: "para packaging e loja" },
      { value: "100%", label: "iOS, Android e desktop cobertos" },
      { value: "+18%", label: "menos fricção que dois botões" },
    ],
    examples: [
      { title: "Loja de moda", text: "Imprime um QR em etiquetas para que clientes descarreguem a app no momento da compra." },
      { title: "Marketplace de beleza", text: "Troca dois botões na newsletter por um smart link e mede cada campanha." },
      { title: "Marca de café", text: "Usa um QR em copos e recibos para promover a app de fidelização." },
      { title: "Marca D2C", text: "Inclui um cartão com QR em cada encomenda, funcionando para qualquer dispositivo." },
    ],
    tutorial: [
      { title: "Inserir links das lojas", text: "Adiciona App Store, Google Play e uma alternativa web para visitantes em desktop." },
      { title: "Escolher slug curto", text: "Usa uma URL como link-my.app/a-tua-marca para ficar limpa em embalagens e anúncios." },
      { title: "Descarregar QR code", text: "Coloca o QR na embalagem, recibo, montra ou insert." },
      { title: "Comparar canais", text: "Cria links separados para newsletter, influencers ou paid ads." },
    ],
  }),

  saas: buildUseCase({
    slug: "link-download-app-saas",
    label: "SaaS",
    title: "Link de download para apps SaaS e B2B",
    metaTitle: "Link de download SaaS - um smart link para App Store, Google Play e web app",
    metaDescription:
      "Leva utilizadores SaaS de onboarding, e-mail, help center e vendas diretamente para a app móvel ou web app certa.",
    h1: "Um smart link para a tua app SaaS, web app e emails de onboarding",
    eyebrow: "SaaS e B2B",
    intro:
      "Equipas SaaS costumam ter web app, iOS e Android ao mesmo tempo. Com Link My App partilhas um único link em onboarding, vendas, suporte e anúncios.",
    painPoints: [
      "Emails de onboarding têm links a mais e confundem novos utilizadores.",
      "Equipas de vendas enviam URLs diferentes a clientes.",
      "Desktop precisa da web app, mobile precisa da loja certa.",
      "Artigos de ajuda ficam desatualizados quando URLs mudam.",
      "Campanhas B2B são difíceis de medir sem links próprios por canal.",
      "A comunicação de lançamento fica pesada quando cada plataforma é explicada separadamente.",
    ],
    benefits: [
      { title: "Um link no onboarding", text: "Leva cada utilizador para a app ou web app certa, sem perguntar plataforma." },
      { title: "Materiais de vendas limpos", text: "Um link curto cabe em decks, PDFs, demos e assinaturas de e-mail." },
      { title: "Menos suporte", text: "Customer success não precisa perguntar se o cliente usa iOS ou Android." },
      { title: "Campanhas por segmento", text: "Cria links por indústria, conta, região ou vaga de lançamento." },
      { title: "Sem SDK", text: "Funciona imediatamente para routing antes da instalação e QR codes." },
      { title: "Fallback para a web app", text: "Desktop vai para login, landing ou página de produto." },
    ],
    metrics: [
      { value: "3 destinos", label: "iOS, Android e web app" },
      { value: "0 SDK", label: "para o link de download" },
      { value: "1 URL", label: "para vendas, suporte e marketing" },
    ],
    examples: [
      { title: "SaaS B2B", text: "Adiciona um smart link aos emails de onboarding para novos utilizadores descarregarem a app." },
      { title: "Ferramenta de field service", text: "Imprime um QR code em materiais de formação para técnicos." },
      { title: "Software de RH", text: "Cria links por cliente empresarial para medir rollouts." },
      { title: "App de produtividade", text: "Desktop vai para a web app e mobile para a loja certa." },
    ],
    tutorial: [
      { title: "Definir fallback web", text: "Usa login, página de produto ou help center como destino para desktop." },
      { title: "Criar master link", text: "Cria um link geral de download para onboarding e suporte." },
      { title: "Duplicar por campanha", text: "Usa links próprios para anúncios, vendas, webinars e rollouts." },
      { title: "Analisar métricas", text: "Compara cliques por origem e dispositivo no dashboard." },
    ],
  }),

  restaurants: buildUseCase({
    slug: "qr-code-app-restaurante",
    label: "Restaurantes",
    title: "QR code e link de download para apps de restaurantes",
    metaTitle: "QR code para app de restaurante - um link para App Store e Google Play",
    metaDescription:
      "Um QR code em mesa, conta, flyer ou montra que leva cada cliente para a app de restaurante certa.",
    h1: "Um QR code para clientes descarregarem a app do teu restaurante",
    eyebrow: "Restaurantes e hospitality",
    intro:
      "Em restaurantes, o momento importa: mesa, conta, zona de takeaway ou montra. Um QR code leva clientes de iPhone e Android diretamente para a loja certa.",
    painPoints: [
      "Clientes não sabem que loja abrir.",
      "Funcionários têm de explicar o download da app repetidamente.",
      "Flyers com dois QR codes parecem confusos.",
      "Programas de fidelização perdem utilizadores antes da instalação.",
      "Ações em loja são difíceis de medir sem tracking de QR.",
      "Desktop deve ir para menu, reservas ou site.",
    ],
    benefits: [
      { title: "Um QR em cada mesa", text: "Clientes digitalizam e chegam automaticamente à loja certa." },
      { title: "Mais downloads de fidelização", text: "Reduz passos entre conta e instalação." },
      { title: "Medição offline clara", text: "Compara mesa, flyer, montra e eventos." },
      { title: "Ideal para várias lojas", text: "Cria links por localização ou campanha." },
      { title: "Fallback para menu", text: "Desktop ou dispositivos desconhecidos podem ir para o menu web." },
      { title: "Sem configuração técnica", text: "Só precisas das URLs das lojas e podes imprimir o QR." },
    ],
    metrics: [
      { value: "1 scan", label: "até à loja certa" },
      { value: "4 locais", label: "mesa, conta, flyer, montra" },
      { value: "24/7", label: "link sempre ativo" },
    ],
    examples: [
      { title: "Cadeia de burgers", text: "Mede scans por loja e promove a app de fidelização no balcão." },
      { title: "Restaurante premium", text: "Coloca um QR discreto na conta para reservas e download da app." },
      { title: "Marca de delivery", text: "Imprime o smart QR em embalagens e cartões promocionais." },
      { title: "Café local", text: "Leva clientes para a app de pontos sem usar dois badges na mesa." },
    ],
    tutorial: [
      { title: "Adicionar destinos da app", text: "Define App Store, Google Play e site ou menu como fallback." },
      { title: "Descarregar QR para impressão", text: "Exporta e testa o QR com iPhone e Android." },
      { title: "Duplicar por localização", text: "Cria links próprios para lojas, eventos ou campanhas sazonais." },
      { title: "Controlar scans", text: "Vê no dashboard que colocação traz mais cliques." },
    ],
  }),

  fitness: buildUseCase({
    slug: "link-download-app-fitness",
    label: "Fitness",
    title: "Link de download para ginásios e apps de bem-estar",
    metaTitle: "Link de download para app fitness - QR code para ginásios, aulas e membros",
    metaDescription:
      "Um smart link para a tua app fitness: iPhone para App Store, Android para Google Play e desktop para site ou marcação.",
    h1: "Um link para membros instalarem a tua app fitness",
    eyebrow: "Fitness e bem-estar",
    intro:
      "Ginásios, estúdios de yoga e apps de coaching precisam de um caminho simples para download em cartazes, horários, espelhos, e-mails e redes sociais.",
    painPoints: [
      "Membros procuram o nome errado da app na loja.",
      "Horários com dois QR codes ou badges ficam sobrecarregados.",
      "Aulas experimentais não levam interessados para a app de forma clara.",
      "Treinadores partilham links diferentes em grupos de WhatsApp.",
      "Material offline não mostra que superfície gera downloads.",
      "Desktop deve ir para a página de marcação, não para uma loja.",
    ],
    benefits: [
      { title: "QR code no ginásio", text: "Um código no espelho, receção, horário ou flyer leva cada telemóvel à loja certa." },
      { title: "WhatsApp e comunidade", text: "Treinadores podem partilhar um link curto em grupos." },
      { title: "Campanhas por aula", text: "Mede se yoga, HIIT, PT ou newsletter gera mais cliques." },
      { title: "Fallback para marcações", text: "Desktop vai para site, agenda ou área de membros." },
      { title: "Menos suporte", text: "Ninguém precisa explicar que loja corresponde a que telemóvel." },
      { title: "Atualizável rapidamente", text: "Altera destinos sem redesenhar material impresso." },
    ],
    metrics: [
      { value: "1 link", label: "para membros e leads" },
      { value: "0 dúvidas", label: "sobre a loja certa" },
      { value: "Todos", label: "os canais mensuráveis" },
    ],
    examples: [
      { title: "Estúdio boutique", text: "Coloca um smart QR na receção para marcações pela app." },
      { title: "Rede de ginásios", text: "Cria links por localização e compara procura por downloads." },
      { title: "Instrutora de yoga", text: "Partilha um link curto no Instagram e WhatsApp." },
      { title: "App wellness", text: "Usa um link para flyers QR e paid social." },
    ],
    tutorial: [
      { title: "Definir fallback para marcações", text: "Desktop deve ir para horário, site ou área de membros." },
      { title: "Testar QR", text: "Testa com iPhone e Android antes de imprimir." },
      { title: "Medir por superfície", text: "Usa links diferentes para receção, sala, e-mail e social." },
      { title: "Otimizar regularmente", text: "Compara cliques e muda QR codes para locais melhores." },
    ],
  }),

  creators: buildUseCase({
    slug: "link-download-app-criadores",
    label: "Criadores",
    title: "Link de download para criadores, influencers e comunidades",
    metaTitle: "Link de download para criadores - um link para Instagram, TikTok e YouTube",
    metaDescription:
      "Um smart link curto para apps de criadores, comunidades e campanhas com influencers. Funciona em bio, stories, vídeos e e-mail.",
    h1: "Um link de app para bio, stories, vídeos e comunidade",
    eyebrow: "Criadores e influencers",
    intro:
      "Criadores têm pouco espaço: link da bio, sticker de story, descrição de vídeo ou newsletter. Com um smart link, ninguém escolhe entre App Store e Google Play.",
    painPoints: [
      "Instagram e TikTok dão pouco espaço para vários links de loja.",
      "Páginas de link-in-bio adicionam um passo antes do download.",
      "Seguidores clicam em mobile, desktop e browsers dentro das apps.",
      "Parcerias com influencers são difíceis de avaliar sem links próprios.",
      "URLs longas de loja ficam pouco profissionais em captions.",
      "QR codes para eventos precisam de um único link confiável.",
    ],
    benefits: [
      { title: "Um link na bio", text: "Curto, claro e direto para a loja certa." },
      { title: "Links por criador", text: "Dá uma URL própria a cada influencer e compara cliques." },
      { title: "Funciona em browsers internos", text: "O link decide no servidor e envia para o destino correto." },
      { title: "QR para eventos", text: "Usa o mesmo smart link como QR em meetups, merch ou slides." },
      { title: "Campanhas limpas", text: "Separa TikTok, Instagram, YouTube, newsletter e podcast." },
      { title: "Melhor que dois botões", text: "Seguidores não precisam pensar que telemóvel têm." },
    ],
    metrics: [
      { value: "1 bio", label: "um link de app basta" },
      { value: "∞", label: "links de campanha" },
      { value: "3 destinos", label: "iOS, Android, web" },
    ],
    examples: [
      { title: "Criador fitness", text: "Partilha um smart link no TikTok e mede cliques separados do Instagram." },
      { title: "Comunidade por newsletter", text: "Envia um CTA que no mobile vai para a loja e no desktop para a web app." },
      { title: "Podcast", text: "Usa uma URL curta nas notas e QR em eventos ao vivo." },
      { title: "Campanha com influencers", text: "Cada criador recebe o seu link para comparação no relatório." },
    ],
    tutorial: [
      { title: "Criar link da bio", text: "Escolhe um slug curto ligado à marca ou campanha." },
      { title: "Usar em todos os perfis", text: "Coloca o link em Instagram, TikTok, YouTube, X e newsletter." },
      { title: "Duplicar por criador", text: "Cria smart links por criador, post ou fase de lançamento." },
      { title: "Analisar cliques", text: "Compara origens e dispositivos antes de aumentar orçamento." },
    ],
  }),

  agencies: {
    slug: "para-agencias",
    label: "Agências",
    title: "Smart links para agências",
    metaTitle: "Smart links para agências - links de download para clientes, campanhas e QR codes",
    metaDescription:
      "Agências criam um smart link por cliente, campanha, localização ou QR code e medem cliques para App Store, Google Play e web fallback.",
    h1: "Links de download para cada cliente da tua agência",
    eyebrow: "Para agências e parceiros",
    intro:
      "Deixa de enviar duas URLs de loja a cada cliente. Cria um smart link por cliente, canal ou campanha, entrega um único QR code e mostra dados de cliques num dashboard claro.",
    faqs: [
      { q: "Uma agência pode gerir vários clientes?", a: "Sim. Podes criar smart links, slugs, QR codes e campanhas próprios para cada cliente." },
      { q: "Posso criar um QR por campanha?", a: "Sim. Cria links separados para retail, eventos, influencers, paid social ou print e mede cada canal." },
      { q: "Posso usar Link My App em relatórios de clientes?", a: "Sim. Os dados de cliques por dispositivo, origem e campanha são fáceis de levar para relatórios." },
      { q: "Serve para lançamentos white-glove?", a: "Sim. Podes criar links por mercado, região ou fase de campanha e ajustá-los depois." },
    ],
  },
};

function buildHowTo({ slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps }) {
  return { slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps };
}

export const portugueseHowTos = {
  "instagram-share": buildHowTo({
    slug: "partilhar-app-instagram",
    label: "Partilhar app no Instagram",
    metaTitle: "Partilhar app no Instagram - bio, stories e anúncios com um link",
    metaDescription:
      "Como partilhar a tua app no Instagram com um smart link que envia iPhone para App Store e Android para Google Play.",
    h1: "Como partilhar a tua app no Instagram com um único link",
    eyebrow: "Instagram",
    intro:
      "O Instagram dá pouco espaço. Com um smart link usas uma URL curta em bio, stories, reels e anúncios, sem mostrar dois links de loja.",
    problem:
      "Dois links de loja na bio criam fricção. Muitos utilizadores não avançam quando precisam escolher entre App Store e Google Play.",
    totalTime: "PT3M",
    steps: [
      { name: "Criar smart link", text: "Adiciona App Store, Google Play e opcionalmente uma alternativa web no Link My App." },
      { name: "Trocar o link da bio", text: "Vai a Editar perfil no Instagram e coloca a tua URL link-my.app como site." },
      { name: "Usar em stories e reels", text: "Usa o mesmo link no sticker de story, captions de reels ou anúncios." },
      { name: "Separar campanhas", text: "Cria links próprios para posts importantes ou influencers para comparar cliques." },
      { name: "Ver resultados", text: "No dashboard, vê quantos cliques vieram de Instagram, iOS, Android ou desktop." },
    ],
  }),

  "whatsapp-link": buildHowTo({
    slug: "link-download-app-whatsapp",
    label: "Partilhar app por WhatsApp",
    metaTitle: "Partilhar app por WhatsApp - um link para iPhone e Android",
    metaDescription:
      "Cria um link de download de app ideal para WhatsApp, que leva cada telemóvel automaticamente para a loja certa.",
    h1: "Como partilhar a tua app por WhatsApp sem dois links de loja",
    eyebrow: "WhatsApp",
    intro:
      "Mensagens de WhatsApp devem ser curtas. Um smart link substitui URLs longas de App Store e Google Play por um link claro.",
    problem:
      "Quando envias os dois links numa mensagem, ela fica longa e o utilizador precisa decidir sozinho.",
    totalTime: "PT2M",
    steps: [
      { name: "Escolher slug curto", text: "Usa um slug legível para o link parecer confiável em chats." },
      { name: "Definir destinos", text: "Adiciona iOS, Android e fallback." },
      { name: "Manter a mensagem curta", text: "Escreve algo direto: Descarrega a nossa app aqui: link-my.app/a-tua-app." },
      { name: "Testar broadcasts", text: "Testa o link em iPhone e Android antes de enviar para grupos ou clientes." },
      { name: "Medir cliques", text: "Cria um link próprio para WhatsApp se quiseres medir o canal separadamente." },
    ],
  }),

  "redirect-by-device": buildHowTo({
    slug: "redirecionar-app-store-google-play",
    label: "Redirecionar por dispositivo",
    metaTitle: "Redirecionar automaticamente para App Store ou Google Play",
    metaDescription:
      "Como enviar iPhone, Android e desktop automaticamente para o destino certo sem página JavaScript e sem SDK.",
    h1: "Como redirecionar utilizadores automaticamente para App Store ou Google Play",
    eyebrow: "Deteção de dispositivo",
    intro:
      "Um smart link lê sinais técnicos do dispositivo e decide no servidor se o utilizador deve ver App Store, Google Play ou uma página web.",
    problem:
      "Uma URL normal de loja só funciona para uma plataforma. Se enviares todo o tráfego para ela, perdes parte dos downloads.",
    totalTime: "PT4M",
    steps: [
      { name: "Adicionar destino iOS", text: "Copia a URL pública da App Store da tua app." },
      { name: "Adicionar destino Android", text: "Copia a URL do Google Play." },
      { name: "Definir fallback desktop", text: "Usa landing page, web app ou página de download para visitantes em desktop." },
      { name: "Publicar smart link", text: "Partilha apenas a URL curta link-my.app em campanhas, bio, anúncios e QR codes." },
      { name: "Testar redirecionamento", text: "Testa iPhone, Android e desktop antes de lançar em grande escala." },
    ],
  }),

  "download-button-website": buildHowTo({
    slug: "botao-download-app-site",
    label: "Botão de download no site",
    metaTitle: "Botão de download de app para site - um botão para App Store e Google Play",
    metaDescription:
      "Substitui dois badges de loja por um botão de download que leva cada dispositivo para a plataforma certa.",
    h1: "Como criar um botão de download de app com um único link",
    eyebrow: "Site",
    intro:
      "Em landing pages mobile, o espaço é curto. Um único botão costuma ser mais claro do que dois badges lado a lado.",
    problem:
      "Dois botões ocupam espaço, quebram em ecrãs pequenos e obrigam o visitante a escolher.",
    totalTime: "PT5M",
    steps: [
      { name: "Criar smart link", text: "Define iOS, Android e fallback web no Link My App." },
      { name: "Escolher texto do botão", text: "Usa textos claros como Descarregar app ou Instalar agora." },
      { name: "Ligar o botão", text: "Coloca a URL link-my.app como destino do botão." },
      { name: "Testar no mobile", text: "Confirma se o botão fica visível e sem quebras estranhas em ecrãs pequenos." },
      { name: "Distinguir campanhas", text: "Se o site tem várias páginas, cria links próprios por página para melhor estatística." },
    ],
  }),

  "qr-physical-campaigns": buildHowTo({
    slug: "qr-code-download-app",
    label: "QR code para downloads da app",
    metaTitle: "Criar QR code para download de app - um QR para iPhone e Android",
    metaDescription:
      "Cria um QR code que envia iPhone para App Store, Android para Google Play e desktop para o site.",
    h1: "Como criar um QR code para downloads da app",
    eyebrow: "QR code",
    intro:
      "Um QR code de app não deve apontar para apenas uma loja. Com Link My App, um QR torna-se um smart link para todos os dispositivos.",
    problem:
      "Um QR code com uma única URL de loja exclui iOS ou Android. Dois QR codes parecem confusos e são menos digitalizados.",
    totalTime: "PT6M",
    steps: [
      { name: "Criar smart link", text: "Adiciona App Store, Google Play e fallback." },
      { name: "Descarregar QR", text: "Usa o QR code gerado para print, packaging ou eventos." },
      { name: "Manter CTA curto", text: "Escreve algo como: Digitaliza e descarrega a app." },
      { name: "Testar tamanho de impressão", text: "Testa o QR a uma distância realista com iPhone e Android." },
      { name: "Medir por superfície", text: "Cria QR codes separados para embalagem, flyer, montra e eventos." },
    ],
  }),
};

export const portugueseLegalPages = {
  privacy: {
    path: "/privacidade",
    title: "Política de Privacidade",
    shortTitle: "Privacidade",
    intro:
      "Esta Política de Privacidade explica como David Trotonda trata dados pessoais quando usas Link My App para criar smart links, QR codes e estatísticas de cliques para apps.",
    sections: [
      {
        title: "Responsável pelo tratamento",
        paragraphs: [
          "O responsável pelo tratamento é David Trotonda.",
          "Contacto: info@skeilapps.com.",
          "Serviço: Link My App, disponível em link-my.app.",
        ],
      },
      {
        title: "Dados que tratamos",
        paragraphs: [
          "Dados de conta, como nome, e-mail, ID de utilizador e fotografia de perfil quando entras com Google.",
          "Dados de smart links, como nome da app, URL da App Store, URL do Google Play, URL alternativa, slug, estado e QR code associado.",
          "Dados de utilização e analytics, como cliques, data e hora, destino escolhido, origem, dispositivo aproximado, browser, sistema operativo e sinais técnicos para segurança e prevenção de abuso.",
        ],
      },
      {
        title: "Finalidades",
        paragraphs: [
          "Criar e gerir a tua conta.",
          "Guardar smart links e redirecionar visitantes para o destino configurado.",
          "Criar QR codes e mostrar estatísticas de cliques no dashboard.",
          "Proteger o serviço contra abuso, links fraudulentos, acessos não autorizados e problemas técnicos.",
        ],
      },
      {
        title: "Bases legais",
        paragraphs: [
          "Execução de contrato ou medidas pré-contratuais quando crias conta ou usas smart links.",
          "Consentimento quando nos contactas ou ativas serviços opcionais.",
          "Interesse legítimo para garantir segurança, estabilidade e melhoria do serviço.",
          "Cumprimento de obrigações legais quando necessário para contabilidade, impostos ou direitos de proteção de dados.",
        ],
      },
      {
        title: "Prestadores",
        paragraphs: [
          "Usamos fornecedores técnicos como Firebase e Google Cloud para hosting, autenticação, base de dados e segurança.",
          "Alguns fornecedores podem tratar dados fora do Espaço Económico Europeu. Nesses casos usamos garantias adequadas, como cláusulas contratuais-tipo ou decisões de adequação.",
        ],
      },
      {
        title: "Conservação e direitos",
        paragraphs: [
          "Guardamos dados de conta enquanto a conta estiver ativa ou enquanto existirem obrigações legais.",
          "Podes pedir acesso, retificação, eliminação, limitação, oposição e portabilidade contactando-nos.",
          "Se considerares que os teus dados não são tratados corretamente, podes contactar uma autoridade de controlo de proteção de dados.",
        ],
      },
    ],
  },

  cookies: {
    path: "/cookies",
    title: "Política de Cookies e Privacidade",
    shortTitle: "Cookies",
    intro:
      "Esta Política de Cookies explica que tecnologias o Link My App pode usar para login, segurança, preferências e medição.",
    sections: [
      {
        title: "O que são cookies",
        paragraphs: [
          "Cookies e tecnologias semelhantes, como LocalStorage, ajudam uma página a guardar informação no browser.",
          "Algumas tecnologias são necessárias para login, segurança e funcionalidades básicas.",
        ],
      },
      {
        title: "Tecnologias necessárias",
        paragraphs: [
          "Podemos usar tecnologias necessárias para autenticar utilizadores, proteger sessões, prevenir abuso e guardar definições.",
          "Estas tecnologias são necessárias para prestar o serviço pedido e, em regra, não exigem consentimento prévio.",
        ],
      },
      {
        title: "Analytics e medição",
        paragraphs: [
          "Link My App mede cliques em smart links, tipos de dispositivo, origens e utilização de QR no dashboard.",
          "Ferramentas opcionais de analytics web só serão usadas quando existirem as bases legais e consentimentos necessários.",
        ],
      },
      {
        title: "Gestão",
        paragraphs: [
          "Podes bloquear ou eliminar cookies e dados locais no teu browser.",
          "Eliminar dados necessários pode terminar a sessão ou impedir que algumas funcionalidades funcionem corretamente.",
        ],
      },
    ],
  },

  terms: {
    path: "/termos",
    title: "Termos e Condições",
    shortTitle: "Termos",
    intro:
      "Estes termos regulam a utilização do Link My App, um serviço para criar smart links de apps, QR codes e estatísticas de cliques.",
    sections: [
      {
        title: "Descrição do serviço",
        paragraphs: [
          "Link My App permite criar um smart link para App Store, Google Play e uma URL alternativa.",
          "O serviço pode disponibilizar QR codes e estatísticas de cliques para os teus links.",
        ],
      },
      {
        title: "Utilização do serviço",
        paragraphs: [
          "És responsável pela correção das URLs introduzidas e por teres direito a utilizá-las.",
          "Não podes usar Link My App para conteúdos ilegais, fraudulentos, enganadores ou abusivos.",
          "Podemos remover ou desativar links que violem direitos de terceiros, leis ou regras de segurança.",
        ],
      },
      {
        title: "Disponibilidade",
        paragraphs: [
          "Tentamos manter um serviço estável, mas não garantimos disponibilidade sem interrupções.",
          "Manutenção, falhas técnicas, fornecedores externos ou força maior podem afetar o serviço.",
        ],
      },
      {
        title: "Responsabilidade",
        paragraphs: [
          "Link My App não substitui a revisão legal, técnica ou de marketing das tuas campanhas.",
          "Na medida permitida por lei, não respondemos por danos indiretos, lucros cessantes ou consequências de URLs introduzidas incorretamente.",
        ],
      },
      {
        title: "Alterações",
        paragraphs: [
          "Podemos atualizar estes termos quando o serviço, a lei ou requisitos técnicos mudarem.",
          "Em alterações relevantes, informaremos de forma adequada.",
        ],
      },
    ],
  },
};
