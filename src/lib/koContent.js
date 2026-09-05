const sharedSmartLinkFaqs = [
  {
    q: "App Store, Google Play, 웹사이트를 하나의 링크로 묶을 수 있나요?",
    a: "네. Link My App은 기기를 감지해 iPhone은 App Store, Android는 Google Play, 데스크톱은 설정한 대체 URL로 보냅니다.",
  },
  {
    q: "나중에 목적지를 바꿀 수 있나요?",
    a: "네. 짧은 URL과 QR 코드는 그대로 유지됩니다. dashboard에서 App Store, Google Play 또는 fallback을 언제든 수정할 수 있습니다.",
  },
  {
    q: "클릭이 어디서 왔는지 볼 수 있나요?",
    a: "네. dashboard에서 기기, 소스, 캠페인, QR 코드별 클릭을 확인해 어떤 채널이 다운로드를 만드는지 볼 수 있습니다.",
  },
  {
    q: "앱에 SDK를 설치해야 하나요?",
    a: "아니요. 앱 다운로드 링크를 만들기 위해 SDK나 앱 수정이 필요하지 않습니다. Link My App은 설치 전 단계의 링크와 QR에서 작동합니다.",
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
        title: "스마트 링크 없이",
        rows: [
          "두 개의 스토어 버튼이 사용자의 주의를 나눕니다.",
          "사용자가 잘못된 스토어를 누르거나 설치를 포기합니다.",
          "QR 코드와 캠페인을 측정하기 어렵습니다.",
          "채널마다 어떤 링크를 눌러야 하는지 설명이 필요합니다.",
        ],
      },
      after: {
        title: "Link My App 사용 후",
        rows: [
          "하나의 링크가 각 기기를 올바른 목적지로 보냅니다.",
          "하나의 QR 코드가 iPhone, Android, 데스크톱에서 모두 작동합니다.",
          "소스, 기기, 캠페인별 클릭이 구분됩니다.",
          "링크나 QR을 바꾸지 않고 목적지를 수정할 수 있습니다.",
        ],
      },
    },
    realExamples: examples,
    tutorial,
    faqs: sharedSmartLinkFaqs,
  };
}

export const koreanUseCases = {
  ecommerce: buildUseCase({
    slug: "ecommerce-app-download-link",
    label: "이커머스",
    title: "이커머스 앱을 위한 다운로드 링크",
    metaTitle: "이커머스 앱 다운로드 링크 - App Store와 Google Play를 위한 하나의 QR",
    metaDescription:
      "쇼핑몰 앱을 위한 스마트 링크와 QR 코드를 만드세요. iPhone, Android, 데스크톱을 자동으로 올바른 목적지로 보냅니다.",
    h1: "쇼핑몰 앱 다운로드를 늘리는 하나의 링크",
    eyebrow: "이커머스 앱",
    intro:
      "패키지, 뉴스레터, Instagram, 오프라인 매장에서 앱 다운로드를 유도할 때 두 개의 스토어 버튼보다 하나의 다운로드 링크가 더 명확합니다.",
    painPoints: [
      "패키지에 두 개의 스토어 badge가 있으면 시각적으로 복잡합니다.",
      "고객이 잘못된 스토어를 눌러 다운로드 전에 이탈합니다.",
      "뉴스레터에서 두 CTA가 클릭을 나누고 선택 부담을 만듭니다.",
      "인플루언서 캠페인은 모두 같은 스토어 URL을 공유하면 비교가 어렵습니다.",
      "영수증이나 박스의 QR 코드는 한 스토어만 가리키면 안 됩니다.",
      "유료 광고가 사용자의 기기에서 열리지 않는 스토어로 보내면 예산이 낭비됩니다.",
    ],
    benefits: [
      { title: "모든 채널에 하나의 CTA", text: "이메일, 광고, Instagram bio, 패키지, 영수증, 웹사이트에 같은 짧은 URL을 사용하세요." },
      { title: "패키지와 매장을 위한 QR", text: "하나의 QR 코드로 iPhone, Android, 데스크톱을 모두 처리합니다." },
      { title: "측정 가능한 캠페인", text: "채널이나 인플루언서별 스마트 링크를 만들어 클릭을 비교하세요." },
      { title: "구매 순간의 마찰 감소", text: "고객이 추가 선택 없이 바로 올바른 스토어에 도착합니다." },
      { title: "수정 가능한 목적지", text: "패키지, 전단, QR 코드를 다시 인쇄하지 않고 스토어 URL을 바꾸세요." },
      { title: "재구매 유도에 적합", text: "이메일, 패키지, 소셜에서 기존 고객을 앱으로 다시 데려오세요." },
    ],
    metrics: [
      { value: "1 QR", label: "패키지와 매장용" },
      { value: "100%", label: "iOS, Android, 데스크톱 지원" },
      { value: "+18%", label: "두 버튼보다 적은 마찰" },
    ],
    examples: [
      { title: "패션 스토어", text: "상품 태그에 QR을 넣어 구매 순간에 앱 설치를 유도합니다." },
      { title: "뷰티 marketplace", text: "뉴스레터의 두 버튼을 하나의 스마트 링크로 바꾸고 캠페인을 측정합니다." },
      { title: "커피 브랜드", text: "컵과 영수증에 QR을 넣어 loyalty 앱을 홍보합니다." },
      { title: "D2C 브랜드", text: "모든 주문 박스에 어떤 기기에서도 작동하는 QR 카드를 동봉합니다." },
    ],
    tutorial: [
      { title: "스토어 링크 입력", text: "App Store, Google Play, 데스크톱 방문자를 위한 웹 대체 URL을 추가하세요." },
      { title: "짧은 slug 선택", text: "패키지와 광고에서 깔끔하게 보이도록 link-my.app/brand 같은 URL을 사용하세요." },
      { title: "QR 코드 다운로드", text: "패키지, 영수증, 매장 창문, 동봉 카드에 QR을 배치하세요." },
      { title: "채널 비교", text: "뉴스레터, 인플루언서, paid ads용 링크를 따로 만들어 비교하세요." },
    ],
  }),

  saas: buildUseCase({
    slug: "saas-app-download-link",
    label: "SaaS",
    title: "SaaS 및 B2B 앱을 위한 다운로드 링크",
    metaTitle: "SaaS 앱 다운로드 링크 - App Store, Google Play, 웹앱을 위한 스마트 링크",
    metaDescription:
      "온보딩, 이메일, help center, sales 자료에서 SaaS 사용자를 모바일 앱 또는 웹앱의 올바른 목적지로 보내세요.",
    h1: "SaaS 앱, 웹앱, 온보딩 이메일을 위한 하나의 스마트 링크",
    eyebrow: "SaaS 및 B2B",
    intro:
      "SaaS 팀은 웹앱, iOS, Android를 동시에 운영하는 경우가 많습니다. Link My App으로 온보딩, sales, support, 광고에서 하나의 링크를 공유하세요.",
    painPoints: [
      "온보딩 이메일에 링크가 많아 신규 사용자가 혼란스러워합니다.",
      "영업팀이 고객마다 다른 URL을 보냅니다.",
      "데스크톱은 웹앱, 모바일은 올바른 스토어가 필요합니다.",
      "도움말 문서의 URL이 바뀌면 쉽게 오래됩니다.",
      "B2B 캠페인은 채널별 링크가 없으면 측정이 어렵습니다.",
      "플랫폼별 설명이 많아 출시 커뮤니케이션이 복잡해집니다.",
    ],
    benefits: [
      { title: "온보딩에 하나의 링크", text: "플랫폼을 묻지 않고 각 사용자를 앱 또는 웹앱으로 보냅니다." },
      { title: "깔끔한 sales 자료", text: "짧은 링크는 deck, PDF, demo, 이메일 서명에 잘 들어갑니다." },
      { title: "지원 문의 감소", text: "CS팀이 고객의 OS를 물어볼 필요가 줄어듭니다." },
      { title: "세그먼트별 캠페인", text: "산업, 계정, 지역, 출시 wave별 링크를 만드세요." },
      { title: "SDK 없음", text: "설치 전 routing과 QR 코드를 바로 사용할 수 있습니다." },
      { title: "웹앱 fallback", text: "데스크톱은 로그인, landing 또는 product page로 보냅니다." },
    ],
    metrics: [
      { value: "3 목적지", label: "iOS, Android, 웹앱" },
      { value: "0 SDK", label: "다운로드 링크용" },
      { value: "1 URL", label: "sales, support, marketing용" },
    ],
    examples: [
      { title: "B2B SaaS", text: "온보딩 이메일에 스마트 링크를 추가해 신규 사용자가 앱을 설치하게 합니다." },
      { title: "현장 서비스 도구", text: "기술자 교육 자료에 QR 코드를 인쇄합니다." },
      { title: "HR 소프트웨어", text: "기업 고객별 rollout을 측정하기 위해 클라이언트별 링크를 만듭니다." },
      { title: "생산성 앱", text: "데스크톱은 웹앱으로, 모바일은 올바른 스토어로 보냅니다." },
    ],
    tutorial: [
      { title: "웹 fallback 설정", text: "로그인, product page, help center를 데스크톱 목적지로 사용하세요." },
      { title: "마스터 링크 생성", text: "온보딩과 support에 사용할 기본 다운로드 링크를 만드세요." },
      { title: "캠페인별 복제", text: "광고, sales, webinar, rollout용 링크를 따로 만드세요." },
      { title: "지표 분석", text: "dashboard에서 소스와 기기별 클릭을 비교하세요." },
    ],
  }),

  restaurants: buildUseCase({
    slug: "restaurant-app-qr-code",
    label: "레스토랑",
    title: "레스토랑 앱을 위한 QR 코드와 다운로드 링크",
    metaTitle: "레스토랑 앱 QR 코드 - App Store와 Google Play를 위한 하나의 링크",
    metaDescription:
      "테이블, 계산서, 전단, 매장 입구에 붙이는 QR 코드 하나로 각 고객을 올바른 레스토랑 앱 스토어로 보내세요.",
    h1: "고객이 레스토랑 앱을 다운로드하게 만드는 하나의 QR 코드",
    eyebrow: "레스토랑 및 hospitality",
    intro:
      "레스토랑에서는 순간이 중요합니다: 테이블, 계산서, takeaway 구역, 매장 입구. QR 코드 하나가 iPhone과 Android 고객을 올바른 스토어로 보냅니다.",
    painPoints: [
      "고객이 어떤 스토어를 열어야 하는지 모릅니다.",
      "직원이 앱 다운로드 방법을 반복해서 설명해야 합니다.",
      "전단에 QR 코드가 두 개 있으면 복잡해 보입니다.",
      "멤버십 프로그램은 설치 전 단계에서 사용자를 잃습니다.",
      "매장 내 프로모션은 QR tracking 없이는 측정하기 어렵습니다.",
      "데스크톱은 메뉴, 예약 또는 웹사이트로 가야 합니다.",
    ],
    benefits: [
      { title: "테이블마다 하나의 QR", text: "고객이 스캔하면 자동으로 올바른 스토어에 도착합니다." },
      { title: "멤버십 다운로드 증가", text: "계산서와 설치 사이의 단계를 줄입니다." },
      { title: "오프라인 측정", text: "테이블, 전단, 매장 입구, 이벤트별 성과를 비교하세요." },
      { title: "여러 지점에 적합", text: "위치나 캠페인별 링크를 만드세요." },
      { title: "메뉴 fallback", text: "데스크톱이나 알 수 없는 기기는 웹 메뉴로 보낼 수 있습니다." },
      { title: "기술 설정 없음", text: "스토어 URL만 있으면 QR을 인쇄할 수 있습니다." },
    ],
    metrics: [
      { value: "1 scan", label: "올바른 스토어까지" },
      { value: "4 위치", label: "테이블, 계산서, 전단, 입구" },
      { value: "24/7", label: "항상 활성 링크" },
    ],
    examples: [
      { title: "버거 체인", text: "지점별 스캔을 측정하고 카운터에서 loyalty 앱을 홍보합니다." },
      { title: "프리미엄 레스토랑", text: "계산서에 작은 QR을 넣어 예약과 앱 다운로드로 연결합니다." },
      { title: "배달 브랜드", text: "패키지와 프로모션 카드에 스마트 QR을 인쇄합니다." },
      { title: "동네 카페", text: "테이블에 두 badge 대신 하나의 링크로 포인트 앱을 안내합니다." },
    ],
    tutorial: [
      { title: "앱 목적지 추가", text: "App Store, Google Play, fallback용 사이트 또는 메뉴를 설정하세요." },
      { title: "인쇄용 QR 다운로드", text: "QR을 내보낸 뒤 iPhone과 Android에서 테스트하세요." },
      { title: "위치별 복제", text: "매장, 이벤트, 시즌 캠페인별 링크를 만드세요." },
      { title: "스캔 확인", text: "dashboard에서 어떤 배치가 더 많은 클릭을 가져오는지 보세요." },
    ],
  }),

  fitness: buildUseCase({
    slug: "fitness-app-download-link",
    label: "피트니스",
    title: "헬스장과 wellness 앱을 위한 다운로드 링크",
    metaTitle: "피트니스 앱 다운로드 링크 - 헬스장, 수업, 회원용 QR 코드",
    metaDescription:
      "피트니스 앱을 위한 스마트 링크: iPhone은 App Store, Android는 Google Play, 데스크톱은 사이트나 예약 페이지로 보냅니다.",
    h1: "회원이 피트니스 앱을 설치하게 만드는 하나의 링크",
    eyebrow: "피트니스 및 wellness",
    intro:
      "헬스장, 요가 스튜디오, 코칭 앱은 포스터, 시간표, 거울, 이메일, 소셜에서 다운로드 경로가 단순해야 합니다.",
    painPoints: [
      "회원이 스토어에서 앱 이름을 잘못 검색합니다.",
      "시간표에 QR이나 badge가 두 개 있으면 복잡합니다.",
      "체험 수업 참가자를 앱으로 명확하게 안내하지 못합니다.",
      "트레이너가 WhatsApp 그룹에 서로 다른 링크를 공유합니다.",
      "오프라인 소재에서 어떤 지점이 다운로드를 만들었는지 알기 어렵습니다.",
      "데스크톱은 스토어가 아니라 예약 페이지로 가야 합니다.",
    ],
    benefits: [
      { title: "헬스장 안의 QR 코드", text: "거울, 리셉션, 시간표, 전단의 QR 하나가 각 스마트폰을 올바른 스토어로 보냅니다." },
      { title: "WhatsApp과 커뮤니티", text: "트레이너가 그룹에 짧은 링크를 공유할 수 있습니다." },
      { title: "수업별 캠페인", text: "요가, HIIT, PT, 뉴스레터 중 무엇이 더 많은 클릭을 만드는지 측정하세요." },
      { title: "예약 fallback", text: "데스크톱은 사이트, 일정, 회원 영역으로 보냅니다." },
      { title: "지원 감소", text: "어떤 스토어가 맞는지 설명할 필요가 없습니다." },
      { title: "빠른 업데이트", text: "인쇄물을 다시 디자인하지 않고 목적지를 수정하세요." },
    ],
    metrics: [
      { value: "1 link", label: "회원과 lead용" },
      { value: "0 혼란", label: "올바른 스토어 선택" },
      { value: "전체", label: "채널 측정 가능" },
    ],
    examples: [
      { title: "부티크 스튜디오", text: "리셉션에 스마트 QR을 두어 앱으로 예약을 유도합니다." },
      { title: "헬스장 체인", text: "지점별 링크를 만들어 다운로드 수요를 비교합니다." },
      { title: "요가 강사", text: "Instagram과 WhatsApp에서 짧은 링크를 공유합니다." },
      { title: "wellness 앱", text: "QR 전단과 paid social에 하나의 링크를 사용합니다." },
    ],
    tutorial: [
      { title: "예약 fallback 설정", text: "데스크톱은 시간표, 사이트, 회원 영역으로 보내세요." },
      { title: "QR 테스트", text: "인쇄 전 iPhone과 Android에서 테스트하세요." },
      { title: "위치별 측정", text: "리셉션, 스튜디오, 이메일, 소셜에 다른 링크를 사용하세요." },
      { title: "정기 최적화", text: "클릭을 비교하고 QR 위치를 더 좋은 곳으로 옮기세요." },
    ],
  }),

  creators: buildUseCase({
    slug: "creator-app-download-link",
    label: "크리에이터",
    title: "크리에이터, 인플루언서, 커뮤니티를 위한 다운로드 링크",
    metaTitle: "크리에이터 앱 다운로드 링크 - Instagram, TikTok, YouTube를 위한 하나의 링크",
    metaDescription:
      "크리에이터 앱, 커뮤니티, 인플루언서 캠페인을 위한 짧은 스마트 링크. bio, stories, 영상, 이메일에서 작동합니다.",
    h1: "bio, stories, 영상, 커뮤니티를 위한 하나의 앱 링크",
    eyebrow: "크리에이터 및 인플루언서",
    intro:
      "크리에이터에게 공간은 적습니다: bio 링크, story sticker, 영상 설명, 뉴스레터. 스마트 링크 하나면 팔로워가 App Store와 Google Play 중 고를 필요가 없습니다.",
    painPoints: [
      "Instagram과 TikTok bio에는 여러 스토어 링크를 넣을 공간이 부족합니다.",
      "link-in-bio 페이지는 다운로드 전에 한 단계를 더 만듭니다.",
      "팔로워는 모바일, 데스크톱, 앱 내 브라우저에서 클릭합니다.",
      "인플루언서 파트너십은 전용 링크 없이는 평가가 어렵습니다.",
      "긴 스토어 URL은 caption에서 전문적으로 보이지 않습니다.",
      "이벤트용 QR 코드는 신뢰할 수 있는 하나의 링크가 필요합니다.",
    ],
    benefits: [
      { title: "bio에 하나의 링크", text: "짧고 명확하며 올바른 스토어로 직접 연결됩니다." },
      { title: "크리에이터별 링크", text: "각 인플루언서에게 고유 URL을 주고 클릭을 비교하세요." },
      { title: "앱 내 브라우저 대응", text: "서버에서 기기를 판단해 올바른 목적지로 보냅니다." },
      { title: "이벤트용 QR", text: "meetup, merch, slide에서 같은 스마트 링크를 QR로 쓰세요." },
      { title: "깔끔한 캠페인", text: "TikTok, Instagram, YouTube, 뉴스레터, podcast를 구분하세요." },
      { title: "두 버튼보다 좋음", text: "팔로워가 자기 기기를 고민하지 않아도 됩니다." },
    ],
    metrics: [
      { value: "1 bio", label: "하나의 앱 링크면 충분" },
      { value: "∞", label: "캠페인 링크" },
      { value: "3 목적지", label: "iOS, Android, 웹" },
    ],
    examples: [
      { title: "피트니스 크리에이터", text: "TikTok에 스마트 링크를 공유하고 Instagram과 클릭을 따로 측정합니다." },
      { title: "뉴스레터 커뮤니티", text: "모바일은 스토어, 데스크톱은 웹앱으로 가는 CTA를 보냅니다." },
      { title: "podcast", text: "show notes에 짧은 URL을 넣고 라이브 이벤트에서 QR을 사용합니다." },
      { title: "인플루언서 캠페인", text: "각 크리에이터에게 리포트 비교용 링크를 제공합니다." },
    ],
    tutorial: [
      { title: "bio 링크 만들기", text: "브랜드나 캠페인과 연결된 짧은 slug를 선택하세요." },
      { title: "모든 프로필에서 사용", text: "Instagram, TikTok, YouTube, X, 뉴스레터에 링크를 넣으세요." },
      { title: "크리에이터별 복제", text: "크리에이터, 게시물, 출시 단계별 스마트 링크를 만드세요." },
      { title: "클릭 분석", text: "예산을 늘리기 전에 소스와 기기를 비교하세요." },
    ],
  }),

  agencies: {
    slug: "for-agencies",
    label: "에이전시",
    title: "에이전시를 위한 스마트 링크",
    metaTitle: "에이전시용 스마트 링크 - 클라이언트, 캠페인, QR 코드 다운로드 링크",
    metaDescription:
      "에이전시는 클라이언트, 캠페인, 위치, QR 코드별 스마트 링크를 만들고 App Store, Google Play, 웹 fallback 클릭을 측정할 수 있습니다.",
    h1: "에이전시의 각 클라이언트를 위한 다운로드 링크",
    eyebrow: "에이전시 및 파트너용",
    intro:
      "클라이언트마다 두 개의 스토어 URL을 보내지 마세요. 클라이언트, 채널, 캠페인별 스마트 링크를 만들고 하나의 QR 코드와 명확한 클릭 데이터를 제공하세요.",
    faqs: [
      { q: "에이전시가 여러 클라이언트를 관리할 수 있나요?", a: "네. 클라이언트별 스마트 링크, slug, QR 코드, 캠페인을 만들 수 있습니다." },
      { q: "캠페인별 QR을 만들 수 있나요?", a: "네. 리테일, 이벤트, 인플루언서, paid social, print용 링크를 따로 만들고 각 채널을 측정할 수 있습니다." },
      { q: "클라이언트 리포트에 사용할 수 있나요?", a: "네. 기기, 소스, 캠페인별 클릭 데이터는 클라이언트 리포트에 넣기 쉽습니다." },
      { q: "화이트글러브 출시에도 맞나요?", a: "네. 시장, 지역, 캠페인 단계별 링크를 만들고 나중에 조정할 수 있습니다." },
    ],
  },
};

function buildHowTo({ slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps }) {
  return { slug, label, metaTitle, metaDescription, h1, eyebrow, intro, problem, totalTime, steps };
}

export const koreanHowTos = {
  "instagram-share": buildHowTo({
    slug: "share-app-instagram",
    label: "Instagram에서 앱 공유",
    metaTitle: "Instagram에서 앱 공유하기 - bio, stories, ads를 하나의 링크로",
    metaDescription:
      "iPhone은 App Store, Android는 Google Play로 보내는 스마트 링크로 Instagram에서 앱을 공유하는 방법.",
    h1: "Instagram에서 앱을 하나의 링크로 공유하는 방법",
    eyebrow: "Instagram",
    intro:
      "Instagram에서 쓸 수 있는 공간은 적습니다. 스마트 링크를 사용하면 bio, stories, reels, ads에서 두 개의 스토어 링크를 보여 주지 않아도 됩니다.",
    problem:
      "bio에 두 스토어 링크를 넣으면 마찰이 생깁니다. 사용자가 App Store와 Google Play 중 선택해야 하면 많은 다운로드가 사라집니다.",
    totalTime: "PT3M",
    steps: [
      { name: "스마트 링크 만들기", text: "Link My App에서 App Store, Google Play, 선택적으로 웹 대체 URL을 추가하세요." },
      { name: "bio 링크 교체", text: "Instagram의 프로필 편집으로 가서 link-my.app URL을 웹사이트에 넣으세요." },
      { name: "stories와 reels에서 사용", text: "story sticker, reels caption, 광고에 같은 링크를 사용하세요." },
      { name: "캠페인 분리", text: "중요한 게시물이나 인플루언서별 링크를 만들어 클릭을 비교하세요." },
      { name: "결과 확인", text: "dashboard에서 Instagram, iOS, Android, 데스크톱 클릭을 확인하세요." },
    ],
  }),

  "whatsapp-link": buildHowTo({
    slug: "app-download-link-whatsapp",
    label: "WhatsApp으로 앱 공유",
    metaTitle: "WhatsApp으로 앱 공유하기 - iPhone과 Android를 위한 하나의 링크",
    metaDescription:
      "각 스마트폰을 올바른 스토어로 자동 이동시키는 WhatsApp용 앱 다운로드 링크를 만드세요.",
    h1: "두 개의 스토어 링크 없이 WhatsApp으로 앱을 공유하는 방법",
    eyebrow: "WhatsApp",
    intro:
      "WhatsApp 메시지는 짧아야 합니다. 스마트 링크는 긴 App Store와 Google Play URL을 명확한 하나의 링크로 바꿉니다.",
    problem:
      "메시지에 두 링크를 보내면 길어지고 사용자가 직접 고르게 됩니다.",
    totalTime: "PT2M",
    steps: [
      { name: "짧은 slug 선택", text: "채팅에서 신뢰감 있게 보이는 읽기 쉬운 slug를 사용하세요." },
      { name: "목적지 설정", text: "iOS, Android, fallback을 추가하세요." },
      { name: "메시지를 짧게 유지", text: "예: 여기에서 앱을 다운로드하세요: link-my.app/your-app." },
      { name: "broadcast 테스트", text: "그룹이나 고객에게 보내기 전에 iPhone과 Android에서 테스트하세요." },
      { name: "클릭 측정", text: "WhatsApp 채널을 따로 측정하려면 전용 링크를 만드세요." },
    ],
  }),

  "redirect-by-device": buildHowTo({
    slug: "app-store-google-play-redirect",
    label: "기기별 리디렉션",
    metaTitle: "App Store 또는 Google Play로 자동 리디렉션",
    metaDescription:
      "JavaScript landing page나 SDK 없이 iPhone, Android, 데스크톱을 자동으로 올바른 목적지로 보내는 방법.",
    h1: "사용자를 App Store 또는 Google Play로 자동 리디렉션하는 방법",
    eyebrow: "기기 감지",
    intro:
      "스마트 링크는 기기의 기술 신호를 읽고 사용자를 App Store, Google Play 또는 웹페이지 중 어디로 보낼지 서버에서 결정합니다.",
    problem:
      "일반 스토어 URL 하나는 한 플랫폼에만 맞습니다. 모든 트래픽을 그곳으로 보내면 다운로드 일부를 잃습니다.",
    totalTime: "PT4M",
    steps: [
      { name: "iOS 목적지 추가", text: "앱의 공개 App Store URL을 복사하세요." },
      { name: "Android 목적지 추가", text: "Google Play URL을 복사하세요." },
      { name: "데스크톱 fallback 설정", text: "데스크톱 방문자를 위한 landing page, 웹앱 또는 다운로드 페이지를 사용하세요." },
      { name: "스마트 링크 게시", text: "캠페인, bio, 광고, QR 코드에는 link-my.app 짧은 URL만 공유하세요." },
      { name: "리디렉션 테스트", text: "대규모 출시 전에 iPhone, Android, 데스크톱에서 테스트하세요." },
    ],
  }),

  "download-button-website": buildHowTo({
    slug: "app-download-button-website",
    label: "웹사이트 다운로드 버튼",
    metaTitle: "웹사이트용 앱 다운로드 버튼 - App Store와 Google Play를 위한 하나의 버튼",
    metaDescription:
      "두 개의 스토어 badge를 각 기기를 올바른 플랫폼으로 보내는 하나의 다운로드 버튼으로 바꾸세요.",
    h1: "하나의 링크로 앱 다운로드 버튼을 만드는 방법",
    eyebrow: "웹사이트",
    intro:
      "모바일 landing page에서는 공간이 좁습니다. 두 badge를 나란히 두는 것보다 하나의 버튼이 더 명확한 경우가 많습니다.",
    problem:
      "두 버튼은 공간을 차지하고 작은 화면에서 깨지며 방문자에게 선택을 요구합니다.",
    totalTime: "PT5M",
    steps: [
      { name: "스마트 링크 만들기", text: "Link My App에서 iOS, Android, 웹 fallback을 설정하세요." },
      { name: "버튼 텍스트 선택", text: "앱 다운로드 또는 지금 설치처럼 명확한 문구를 사용하세요." },
      { name: "버튼 연결", text: "버튼의 destination을 link-my.app URL로 설정하세요." },
      { name: "모바일 테스트", text: "작은 화면에서 버튼이 잘 보이고 줄바꿈이 이상하지 않은지 확인하세요." },
      { name: "캠페인 구분", text: "사이트에 여러 페이지가 있다면 페이지별 링크를 만들어 통계를 개선하세요." },
    ],
  }),

  "qr-physical-campaigns": buildHowTo({
    slug: "qr-code-app-download",
    label: "앱 다운로드 QR 코드",
    metaTitle: "앱 다운로드 QR 코드 만들기 - iPhone과 Android를 위한 하나의 QR",
    metaDescription:
      "iPhone은 App Store, Android는 Google Play, 데스크톱은 웹사이트로 보내는 QR 코드를 만드세요.",
    h1: "앱 다운로드용 QR 코드를 만드는 방법",
    eyebrow: "QR 코드",
    intro:
      "앱 QR 코드는 한 스토어만 가리키면 안 됩니다. Link My App을 사용하면 하나의 QR이 모든 기기용 스마트 링크가 됩니다.",
    problem:
      "한 스토어 URL만 담은 QR 코드는 iOS나 Android 중 하나를 제외합니다. QR 코드가 두 개면 혼란스럽고 스캔율도 떨어집니다.",
    totalTime: "PT6M",
    steps: [
      { name: "스마트 링크 만들기", text: "App Store, Google Play, fallback을 추가하세요." },
      { name: "QR 다운로드", text: "생성된 QR 코드를 인쇄물, 패키지, 이벤트에 사용하세요." },
      { name: "CTA를 짧게 유지", text: "예: 스캔하고 앱 다운로드." },
      { name: "인쇄 크기 테스트", text: "실제 거리에서 iPhone과 Android로 QR을 테스트하세요." },
      { name: "위치별 측정", text: "패키지, 전단, 매장 입구, 이벤트별 QR 링크를 따로 만드세요." },
    ],
  }),
};

export const koreanLegalPages = {
  privacy: {
    path: "/privacy",
    title: "개인정보 처리방침",
    shortTitle: "개인정보",
    intro:
      "이 개인정보 처리방침은 David Trotonda가 Link My App에서 앱용 스마트 링크, QR 코드, 클릭 통계를 제공할 때 개인정보를 어떻게 처리하는지 설명합니다.",
    sections: [
      {
        title: "개인정보 처리자",
        paragraphs: [
          "처리자는 David Trotonda입니다.",
          "연락처: info@skeilapps.com.",
          "서비스: link-my.app에서 제공되는 Link My App.",
        ],
      },
      {
        title: "처리하는 데이터",
        paragraphs: [
          "계정 데이터: 이름, 이메일, 사용자 ID, Google 로그인 시 프로필 사진.",
          "스마트 링크 데이터: 앱 이름, App Store URL, Google Play URL, 대체 URL, slug, 상태, 연결된 QR 코드.",
          "사용 데이터와 analytics: 클릭, 날짜와 시간, 선택된 목적지, 소스, 대략적인 기기, 브라우저, 운영체제, 보안 및 남용 방지를 위한 기술 신호.",
        ],
      },
      {
        title: "처리 목적",
        paragraphs: [
          "계정을 만들고 관리합니다.",
          "스마트 링크를 저장하고 방문자를 설정된 목적지로 리디렉션합니다.",
          "QR 코드를 생성하고 dashboard에서 클릭 통계를 보여 줍니다.",
          "남용, 사기성 링크, 무단 접근, 기술 문제로부터 서비스를 보호합니다.",
        ],
      },
      {
        title: "법적 근거",
        paragraphs: [
          "계정 생성 또는 스마트 링크 사용 시 계약 이행 또는 사전 조치.",
          "문의하거나 선택 기능을 활성화할 때의 동의.",
          "서비스의 보안, 안정성, 개선을 위한 정당한 이익.",
          "회계, 세금, 개인정보 권리 대응에 필요한 법적 의무 준수.",
        ],
      },
      {
        title: "서비스 제공업체",
        paragraphs: [
          "Firebase와 Google Cloud 같은 기술 제공업체를 hosting, authentication, database, security에 사용합니다.",
          "일부 제공업체는 유럽경제지역 밖에서 데이터를 처리할 수 있습니다. 이 경우 표준계약조항 또는 적정성 결정 등 적절한 보호조치를 사용합니다.",
        ],
      },
      {
        title: "보관 및 권리",
        paragraphs: [
          "계정이 활성 상태이거나 법적 의무가 남아 있는 동안 데이터를 보관합니다.",
          "접근, 정정, 삭제, 제한, 반대, 이전 권리를 요청할 수 있습니다.",
          "데이터가 올바르게 처리되지 않는다고 생각하면 데이터 보호 감독기관에 문의할 수 있습니다.",
        ],
      },
    ],
  },

  cookies: {
    path: "/cookies",
    title: "쿠키 정책",
    shortTitle: "쿠키",
    intro:
      "이 쿠키 정책은 Link My App이 로그인, 보안, 선호도, 측정을 위해 사용할 수 있는 기술을 설명합니다.",
    sections: [
      {
        title: "쿠키란 무엇인가요",
        paragraphs: [
          "쿠키와 LocalStorage 같은 유사 기술은 브라우저에 정보를 저장해 웹사이트가 기능을 제공하도록 돕습니다.",
          "일부 기술은 로그인, 보안, 기본 기능에 필요합니다.",
        ],
      },
      {
        title: "필수 기술",
        paragraphs: [
          "사용자 인증, 세션 보호, 남용 방지, 설정 저장을 위해 필수 기술을 사용할 수 있습니다.",
          "이 기술은 요청된 서비스를 제공하는 데 필요하며 일반적으로 사전 동의가 필요하지 않습니다.",
        ],
      },
      {
        title: "Analytics 및 측정",
        paragraphs: [
          "Link My App은 dashboard에서 스마트 링크 클릭, 기기 유형, 소스, QR 사용을 측정합니다.",
          "선택적 웹 analytics 도구는 필요한 법적 근거와 동의가 있을 때만 사용됩니다.",
        ],
      },
      {
        title: "관리",
        paragraphs: [
          "브라우저에서 쿠키와 로컬 데이터를 차단하거나 삭제할 수 있습니다.",
          "필수 데이터를 삭제하면 로그아웃되거나 일부 기능이 정상 작동하지 않을 수 있습니다.",
        ],
      },
    ],
  },

  terms: {
    path: "/terms",
    title: "이용약관",
    shortTitle: "약관",
    intro:
      "이 약관은 앱 스마트 링크, QR 코드, 클릭 통계를 만드는 서비스인 Link My App의 이용을 규정합니다.",
    sections: [
      {
        title: "서비스 설명",
        paragraphs: [
          "Link My App은 App Store, Google Play, 대체 URL을 위한 스마트 링크를 만들 수 있게 합니다.",
          "서비스는 링크용 QR 코드와 클릭 통계를 제공할 수 있습니다.",
        ],
      },
      {
        title: "서비스 이용",
        paragraphs: [
          "입력한 URL이 정확하고 사용할 권리가 있는지에 대한 책임은 사용자에게 있습니다.",
          "불법, 사기, 오해를 유발하는 콘텐츠 또는 남용 목적에 Link My App을 사용할 수 없습니다.",
          "제3자의 권리, 법률 또는 보안 규칙을 위반하는 링크는 제거 또는 비활성화될 수 있습니다.",
        ],
      },
      {
        title: "가용성",
        paragraphs: [
          "안정적인 서비스를 제공하기 위해 노력하지만 중단 없는 가용성을 보장하지는 않습니다.",
          "점검, 기술 장애, 외부 제공업체 문제, 불가항력으로 서비스가 영향을 받을 수 있습니다.",
        ],
      },
      {
        title: "책임",
        paragraphs: [
          "Link My App은 캠페인의 법률, 기술, 마케팅 검토를 대체하지 않습니다.",
          "법이 허용하는 범위에서, 잘못 입력된 URL 또는 간접 손해, 이익 손실에 대해 책임지지 않습니다.",
        ],
      },
      {
        title: "변경",
        paragraphs: [
          "서비스, 법률, 기술 요구사항이 바뀌면 이 약관을 업데이트할 수 있습니다.",
          "중요한 변경이 있을 경우 적절한 방식으로 안내합니다.",
        ],
      },
    ],
  },
};
