import React from "react";
import { Link } from "react-router-dom";
import { localizePath } from "./i18nRoutes.js";

const ArticleBody = ({ article }) => (
  <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.8] space-y-6">
    {article.intro.map((paragraph) => (
      <p key={paragraph}>{paragraph}</p>
    ))}

    {article.sections.map((section) => (
      <React.Fragment key={section.title}>
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">
          {section.title}
        </h2>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </React.Fragment>
    ))}

    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
      <h3 className="text-[20px] font-bold mb-3 text-black">
        {article.ctaTitle || "今日から試す"}
      </h3>
      <p className="text-gray-600 mb-6">
        {article.ctaText || "1つのスマートリンクで、ユーザーを正しいアプリストアへ直接案内しましょう。"}
      </p>
      <Link
        to={localizePath("/", "ja")}
        className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900"
      >
        {article.ctaButton || "無料でリンクを作成"}
      </Link>
    </div>
  </div>
);

const japaneseBlogArticles = {
  "error-perder-ventas-instagram": {
    title: "SNSでアプリのダウンロードリンクを2つ出す失敗",
    excerpt:
      "中間クリックがアプリDL導線を壊す理由と、1つのスマートリンクで正しいストアへ送る方法。",
    category: "アプリマーケティング",
    intro: [
      "アプリを App Store と Google Play に公開したあと、多くのチームが最初につまずくのがSNSのプロフィールリンクです。",
      "InstagramやTikTokに置けるリンクは限られています。そこに2つのストアURLを並べると、ユーザーは迷い、タップ数が増え、ダウンロード前に離脱します。",
    ],
    sections: [
      {
        title: "中間ページが離脱を生む",
        paragraphs: [
          "Linktreeのようなページに「iOSはこちら」「Androidはこちら」と並べる方法は簡単ですが、アプリDLでは摩擦になります。",
          "ユーザーはアプリを入れたいだけで、ページを読みたいわけではありません。1クリック増えるたびに、ストア到達率は下がります。",
        ],
      },
      {
        title: "スマホはすでに答えを持っている",
        paragraphs: [
          "ユーザーがiPhoneを使っているのかAndroidを使っているのかは、リクエストから判定できます。だから、ユーザーに選ばせる必要はありません。",
          "スマートリンクは端末を判定し、iPhoneなら App Store、Androidなら Google Play、PCなら代替ページへ送ります。",
        ],
      },
      {
        title: "日本向けにも1リンクが自然",
        paragraphs: [
          "日本のユーザーはQRや短いURLに慣れています。プロフィール、ストーリー、広告、チラシで同じリンクを使えると、導線が分かりやすくなります。",
          "アプリダウンロードリンク、アプリ QRコード、スマートリンクといった検索意図にも合うため、SEOページとしても展開しやすくなります。",
        ],
      },
    ],
  },
  "como-evitar-perder-usuarios-descarga": {
    title: "1つのリンクで端末判定する仕組み",
    excerpt:
      "iPhone、Android、PCを判定し、余計なランディングページなしで正しいリンク先へ送る仕組み。",
    category: "プロダクト",
    intro: [
      "アプリのダウンロード導線では、端末判定がコンバージョンを大きく左右します。",
      "同じURLを開いても、iPhoneユーザーとAndroidユーザーでは行きたいストアが違います。そこで必要になるのがスマートリンクです。",
    ],
    sections: [
      {
        title: "User-Agentで端末を読む",
        paragraphs: [
          "ブラウザはリンクを開くとき、OSやブラウザに関する技術情報を送ります。これを使うと、iOS、Android、PCを推定できます。",
          "ユーザーにボタンを選ばせるのではなく、サーバー側で判断して正しいストアへ送る方が自然です。",
        ],
      },
      {
        title: "クライアント側リダイレクトの弱点",
        paragraphs: [
          "JavaScriptでページを読み込んでからリダイレクトする方法は、表示が一瞬止まりやすく、SNS内ブラウザでは不安定になることがあります。",
          "サーバー側で直接リダイレクトすれば、ユーザーは中間画面を見ずにストアへ進めます。",
        ],
      },
      {
        title: "計測も同時にできる",
        paragraphs: [
          "Link My App ではクリック、端末、QR、流入元をダッシュボードで確認できます。",
          "広告、SNS、メール、紙媒体のどこがアプリDLにつながっているかを比較しやすくなります。",
        ],
      },
    ],
    ctaTitle: "最初のスマートリンクを作成",
    ctaText: "端末判定を無料で試し、アプリのダウンロード導線を短くしましょう。",
    ctaButton: "スマートリンクを作成",
  },
  "disparar-descargas-app-link": {
    title: "クリックが1つ増えるだけでアプリDLが減る理由",
    excerpt:
      "広告費やSNS流入を無駄にしないために、ダウンロード導線から摩擦を取り除く考え方。",
    category: "戦略",
    intro: [
      "アプリの成長では、クリック数が少ない導線ほど強いです。",
      "App StoreとGoogle Playの2つのボタン、中間LP、説明ページ。これらは一見丁寧ですが、ダウンロード前の離脱を増やします。",
    ],
    sections: [
      {
        title: "ユーザーは選択したくない",
        paragraphs: [
          "広告やSNS投稿を見たユーザーの意図は明確です。アプリを入れるか、少なくともストアを見ることです。",
          "そこで「iOSですか？Androidですか？」と聞くと、意図と行動の間に余計な判断が入ります。",
        ],
      },
      {
        title: "1つのURLにまとめる",
        paragraphs: [
          "スマートリンクなら、プロフィール、広告、メール、QRで同じURLを使えます。",
          "ユーザーは1回タップするだけ。Link My App が端末を判定し、正しいリンク先へ送ります。",
        ],
      },
      {
        title: "改善は計測して判断する",
        paragraphs: [
          "導線を短くしたら、クリック数、端末別比率、QR流入、チャネル別クリックを確認します。",
          "特に日本ではQR施策との相性が高いため、オフラインからのアプリ導入も同じ管理画面で見ると改善しやすくなります。",
        ],
      },
    ],
  },
  "alternativa-gratis-onelink-to": {
    title: "onelink.to の無料代替として使えるスマートリンク",
    excerpt:
      "古いワンリンクツールの不満を減らし、速くてシンプルなアプリ用リンクを無料で作る方法。",
    category: "代替ツール",
    intro: [
      "iPhoneは App Store、Androidは Google Play へ送るリンクを作ろうとして、onelink.to のようなサービスにたどり着く人は多いです。",
      "ただ、広告表示、古いUI、制限の多い無料プランが気になる場合は、もっと軽い選択肢があります。",
    ],
    sections: [
      {
        title: "アプリDLに必要なのはシンプルな振り分け",
        paragraphs: [
          "多くの小規模アプリやマーケティング施策では、複雑なSDKよりも、端末別に正しいストアへ送ることが先です。",
          "Link My App は、App Store URL、Google Play URL、代替URLを貼るだけで使えます。",
        ],
      },
      {
        title: "QRと分析も同時に使える",
        paragraphs: [
          "作成したスマートリンクからQRを生成でき、QR経由のクリックも確認できます。",
          "店頭、チラシ、イベント、SNSなど、チャネル別に別リンクを作ると改善点が見えます。",
        ],
      },
      {
        title: "日本語ページとしても展開しやすい",
        paragraphs: [
          "日本では「アプリ ダウンロードリンク」「QRコード アプリ」「App Store Google Play 1つのリンク」といった検索意図があります。",
          "サービス自体を日本語化し、SEOページとヘルプ記事も日本語にすると、検索流入の土台を作れます。",
        ],
      },
    ],
  },
  "alternativa-branch-io-sin-sdk": {
    title: "Branch.io の代替: SDKなしで使えるアプリリンク",
    excerpt:
      "Branchは高機能ですが重い。アプリにコードを追加せず、ストア誘導を整える方法。",
    category: "ノーコード",
    intro: [
      "Branch.io は強力なディープリンク・アトリビューションツールです。ただし、すべてのチームに必要とは限りません。",
      "いま必要なのが「iPhoneは App Store、Androidは Google Play へ送る」ことなら、SDKなしのスマートリンクで十分なケースがあります。",
    ],
    sections: [
      {
        title: "SDK導入前にやるべきこと",
        paragraphs: [
          "SDKはアプリ更新、実装、テスト、審査の工数が発生します。まずは外部リンクの導線を短くするだけでも成果が出ることがあります。",
          "広告、SNS、QRから来る新規ユーザーを正しいストアへ送るなら、サーバー側リダイレクトで対応できます。",
        ],
      },
      {
        title: "ディープリンクとの使い分け",
        paragraphs: [
          "既存ユーザーをアプリ内の特定画面へ戻したいならディープリンクが有効です。",
          "一方、新規ユーザーにまずアプリを入れてもらう導線では、スマートリンクの方が軽く始められます。",
        ],
      },
      {
        title: "Link My App の使い方",
        paragraphs: [
          "ストアURLを貼り、短いリンクとQRを生成するだけです。アプリのコード変更は不要です。",
          "チームはクリックと端末別データを見ながら、どのチャネルがアプリDLにつながるか判断できます。",
        ],
      },
    ],
  },
  "alternativa-firebase-dynamic-links": {
    title: "Firebase Dynamic Links 終了後の代替案",
    excerpt:
      "Firebase Dynamic Links の移行先として、端末判定できるアプリ用スマートリンクを使う方法。",
    category: "移行",
    intro: [
      "Firebase Dynamic Links の終了により、アプリのリンク運用を見直す必要が出てきました。",
      "すべての機能を置き換える必要はなく、まずは「ストアへ正しく送るリンク」を安定させることが重要です。",
    ],
    sections: [
      {
        title: "移行で最初に確認すること",
        paragraphs: [
          "使っているリンクが、新規ダウンロード向けなのか、アプリ内の特定画面を開くディープリンクなのかを分けて考えます。",
          "新規ユーザーを App Store / Google Play へ送るだけなら、スマートリンクでシンプルに移行できます。",
        ],
      },
      {
        title: "QRと印刷物を守る",
        paragraphs: [
          "すでに印刷したQRや配布済みURLがある場合、今後はリンク先を後から編集できる構造にしておくと安全です。",
          "Link My App ではQRが固定のスマートリンクを指すため、ストアURLを変更しても印刷物を無駄にしにくくなります。",
        ],
      },
      {
        title: "段階的に移行する",
        paragraphs: [
          "まず主要チャネルのリンクを置き換え、クリック数と端末別データを確認します。",
          "その後、必要な場合だけアプリ内ディープリンクや高度なアトリビューションを追加すると、移行の負担を抑えられます。",
        ],
      },
    ],
  },
  "medir-roi-influencers-app": {
    title: "インフルエンサー施策のアプリDL ROIを測る方法",
    excerpt:
      "InstagramやTikTokの紹介が本当にダウンロードを生んだのか、スマートリンクで見える化します。",
    category: "分析",
    intro: [
      "インフルエンサーにアプリを紹介してもらっても、どれだけのダウンロードがその投稿から来たのか分からないことがあります。",
      "App Store Connect や Google Play Console だけでは、インフルエンサー別の成果をきれいに分けるのが難しいからです。",
    ],
    sections: [
      {
        title: "インフルエンサーごとにURLを分ける",
        paragraphs: [
          "1人に1つのスマートリンクを発行すれば、クリック数、端末、QR経由かどうかを分けて見られます。",
          "同じアプリでも、AさんはInstagram、BさんはTikTok、CさんはイベントQRという形で比較できます。",
        ],
      },
      {
        title: "リンクは1つで十分",
        paragraphs: [
          "インフルエンサーに App Store と Google Play の2つのURLを渡すと、投稿文が長くなり、ユーザーも迷います。",
          "スマートリンクなら1つのURLだけで、端末別に正しいストアへ送れます。",
        ],
      },
      {
        title: "ROIの見方",
        paragraphs: [
          "クリック数、ストア到達、推定インストール、費用を見比べると、どの投稿が効いたか判断しやすくなります。",
          "SDKなしでも最初の比較はできます。より正確なインストール計測が必要なら、アプリ内分析と組み合わせます。",
        ],
      },
    ],
  },
  "secreto-apps-top-100": {
    title: "人気アプリがダウンロード導線にLinktreeを使わない理由",
    excerpt:
      "大きなアプリほど1クリックを大事にします。リンク集ページではなく直接スマートリンクを使う理由。",
    category: "アプリ成長",
    intro: [
      "有名アプリの広告やプロフィールから、Linktreeでストアを選ばせる導線を見ることはほとんどありません。",
      "理由は単純です。アプリDLが目的なら、選択肢を増やすほど離脱が増えるからです。",
    ],
    sections: [
      {
        title: "選択肢が増えると行動が止まる",
        paragraphs: [
          "リンク集ページは、複数の目的があるクリエイターには便利です。しかし、アプリを入れてほしい場面では余計な分岐になります。",
          "ユーザーは「どのボタン？」と考えるより前に、正しいストアへ進むべきです。",
        ],
      },
      {
        title: "スマートリンクは選択を代行する",
        paragraphs: [
          "iPhoneなら App Store、Androidなら Google Play、PCならWebページ。リンク側が判断すれば、ユーザーは迷いません。",
          "広告費を使うキャンペーンほど、この1クリックの差が成果に効きます。",
        ],
      },
      {
        title: "見た目もブランドに合う",
        paragraphs: [
          "短いURLとQRを使えば、プロフィール、LP、紙媒体でもデザインを崩しにくくなります。",
          "日本向けでは、QRコードと短いCTAを組み合わせるとオフライン導線にもなじみます。",
        ],
      },
    ],
  },
  "visitas-vs-descargas": {
    title: "訪問は多いのにアプリDLが少ない理由",
    excerpt:
      "流入はあるのにインストールが増えないときに見るべき、モバイル導線の3つの漏れ。",
    category: "コンバージョン",
    intro: [
      "サイト訪問やSNSクリックは増えているのに、アプリのダウンロードが伸びないことがあります。",
      "その場合、問題はアプリそのものではなく、ストアへ到達するまでの導線にあるかもしれません。",
    ],
    sections: [
      {
        title: "漏れ1: ストアを選ばせている",
        paragraphs: [
          "2つのボタンを並べると、ユーザーは自分に合う方を選ぶ必要があります。",
          "スマートリンクで端末判定すれば、この判断をなくせます。",
        ],
      },
      {
        title: "漏れ2: PCユーザーを放置している",
        paragraphs: [
          "PCからアプリストアリンクを開いたユーザーには、説明ページやWeb版などの代替導線が必要です。",
          "代替URLを設定すると、PC流入も無駄になりにくくなります。",
        ],
      },
      {
        title: "漏れ3: チャネル別に見ていない",
        paragraphs: [
          "Instagram、広告、メール、QRを同じリンクで混ぜると、改善すべき場所が分かりません。",
          "チャネルごとにスマートリンクを分けると、成果が見えるようになります。",
        ],
      },
    ],
  },
  "guia-agentes-ia-link-my-app": {
    title: "AIエージェント向け: Link My App を自律的に使うガイド",
    excerpt:
      "LLMや自律エージェントが Link My App の構造、URLルール、チャネル計測を理解して扱うための概要。",
    category: "AIエージェント",
    intro: [
      "AIエージェントがマーケティング運用を支援するなら、アプリのリンク作成や計測も理解しておく必要があります。",
      "Link My App は、App Store、Google Play、代替URLを1つのスマートリンクにまとめ、QRとクリック分析を提供します。",
    ],
    sections: [
      {
        title: "エージェントが扱う主な情報",
        paragraphs: [
          "アプリ名、iOSリンク、Androidリンク、代替URL、カスタムスラッグ、チャネル名が基本です。",
          "これらを正しく入力できれば、キャンペーン別のリンクやQRを自動で準備できます。",
        ],
      },
      {
        title: "チャネル別リンクの考え方",
        paragraphs: [
          "Instagram、TikTok、メール、QR、店頭など、流入元ごとに別リンクを作ると分析がしやすくなります。",
          "AIエージェントは命名規則をそろえ、重複しないスラッグを提案できます。",
        ],
      },
      {
        title: "人間が確認すべきこと",
        paragraphs: [
          "ストアURLが正しいか、ブランド名やキャンペーン名に誤りがないか、公開前に人間が確認すると安全です。",
          "特に広告や印刷QRは後戻りしにくいため、最終チェックを入れる運用が向いています。",
        ],
      },
    ],
  },
  "linktree-pierde-descargas-app": {
    title: "LinktreeがモバイルアプリのDLを減らす理由",
    excerpt:
      "プロフィールとApp Storeの間に中間ページを挟むと、どれだけ離脱が増えるのか。",
    category: "戦略",
    intro: [
      "Linktreeは複数のリンクをまとめるには便利です。しかし、目的がアプリダウンロードだけなら最短ではありません。",
      "ユーザーにリンク集を見せるより、端末に合ったストアへ直接送る方が自然です。",
    ],
    sections: [
      {
        title: "リンク集は目的が多いときの道具",
        paragraphs: [
          "YouTube、ショップ、ブログ、ニュースレターをまとめたいならリンク集は便利です。",
          "しかしアプリDLだけを伸ばしたい場合、選択肢は少ないほど良いです。",
        ],
      },
      {
        title: "アプリ導線にはスマートリンク",
        paragraphs: [
          "1つのURLで iPhone / Android / PC を判定すれば、Linktree内でストアボタンを選ばせる必要がありません。",
          "プロフィール、ストーリー、広告、DMで同じリンクを使えるのもメリットです。",
        ],
      },
      {
        title: "計測も分ける",
        paragraphs: [
          "Instagramプロフィール用、TikTok用、QR用など、同じアプリでもリンクを分けると成果が見えます。",
          "リンク集の総クリックだけでは、どのチャネルがストア到達に効いたか分かりにくいです。",
        ],
      },
    ],
  },
  "medir-descargas-influencer-tiktok-sin-sdk": {
    title: "SDKなしでTikTokインフルエンサー別のアプリDLを測る方法",
    excerpt:
      "成果報酬やPR投稿の判断に使える、コード不要のスマートリンク計測フロー。",
    category: "アトリビューション",
    intro: [
      "TikTokのインフルエンサー施策では、再生数よりもアプリDLにつながったかが重要です。",
      "SDKを入れなくても、インフルエンサー別の入口URLを分ければ最初の比較はできます。",
    ],
    sections: [
      {
        title: "1人1リンクにする",
        paragraphs: [
          "インフルエンサーごとにスマートリンクを作成し、投稿文やプロフィールにそのリンクを使ってもらいます。",
          "ユーザーは1つのURLを押すだけで、端末に合ったストアへ進みます。",
        ],
      },
      {
        title: "短いURLにする",
        paragraphs: [
          "TikTokでは長いURLより短いURLの方が扱いやすく、見た目も自然です。",
          "link-my.app/name のようなカスタムURLにすると、投稿や説明欄に載せやすくなります。",
        ],
      },
      {
        title: "判断はクリック単価で見る",
        paragraphs: [
          "支払額、クリック数、推定インストールを見比べると、次に伸ばすべきクリエイターが見えてきます。",
          "より正確な購入や課金の計測は、アプリ内分析と組み合わせて判断します。",
        ],
      },
    ],
  },
  "boton-descarga-app-fold-movil": {
    title: "モバイルLPの下部にアプリDLボタンを置く失敗",
    excerpt:
      "多くのユーザーはページ下部まで到達しません。CTA配置と文言を見直す方法。",
    category: "CRO",
    intro: [
      "モバイルユーザーは、ページを最後まで読む前に離脱することがよくあります。",
      "アプリのダウンロードボタンが下部にしかない場合、せっかくの流入を逃している可能性があります。",
    ],
    sections: [
      {
        title: "ファーストビューに置く",
        paragraphs: [
          "アプリDLが主目的なら、最初の画面内にCTAを置くべきです。",
          "「App Store」「Google Play」を2つ並べるより、「アプリをダウンロード」の1ボタンにすると分かりやすくなります。",
        ],
      },
      {
        title: "端末判定でボタンを1つにする",
        paragraphs: [
          "1つのスマートリンクをボタンに設定すれば、端末に応じて正しいストアへ送れます。",
          "ボタンの幅や文言も短くでき、モバイル画面で崩れにくくなります。",
        ],
      },
      {
        title: "計測して配置を決める",
        paragraphs: [
          "ファーストビュー、追従ボタン、記事下CTAなど、場所ごとに別リンクを使うと比較できます。",
          "クリック数だけでなく、端末別の偏りも確認しましょう。",
        ],
      },
    ],
  },
  "google-ads-tienda-equivocada": {
    title: "Google広告でユーザーを間違ったストアへ送らない方法",
    excerpt:
      "広告リンク先がApp Storeだけだと、Androidユーザーのクリックが無駄になります。",
    category: "広告運用",
    intro: [
      "Google広告でアプリを宣伝するとき、リンク先を1つのストアだけにすると無駄が出ます。",
      "Androidユーザーを App Store へ送ったり、iPhoneユーザーを Google Play へ送ったりすると、クリック費用が失われます。",
    ],
    sections: [
      {
        title: "広告リンク先はスマートリンクにする",
        paragraphs: [
          "広告の最終URLにスマートリンクを設定すれば、クリック時に端末を判定できます。",
          "同じ広告文でも、ユーザーは自分の端末に合ったストアへ進みます。",
        ],
      },
      {
        title: "キャンペーン別にリンクを分ける",
        paragraphs: [
          "ブランド指名、一般キーワード、リマーケティングなどでリンクを分けると、成果比較がしやすくなります。",
          "QRやSNSと混ざらないよう、広告用のリンクを作っておくのがおすすめです。",
        ],
      },
      {
        title: "見るべき指標",
        paragraphs: [
          "クリック数、iOS/Android比率、代替URLへの流入、キャンペーン別クリックを確認します。",
          "広告管理画面だけでなく、リンク側の端末データも見ると無駄クリックを発見しやすくなります。",
        ],
      },
    ],
  },
  "qr-packaging-app-sin-parecer-cupon": {
    title: "安っぽく見せずにパッケージへアプリDL用QRを入れる方法",
    excerpt:
      "ブランド感を壊さず、スキャンされやすいQRの置き方と計測方法。",
    category: "ブランド",
    intro: [
      "QRコードは便利ですが、置き方を間違えるとパッケージの印象を下げてしまいます。",
      "アプリDL用QRは、デザイン、CTA、サイズ、計測の4つをセットで考える必要があります。",
    ],
    sections: [
      {
        title: "CTAは短く具体的に",
        paragraphs: [
          "「アプリをダウンロード」「QRでアプリを入手」のように、何が起きるか分かる文言にします。",
          "「Scan me」だけでは、日本のユーザーには目的が伝わりにくい場合があります。",
        ],
      },
      {
        title: "1つのQRで両ストアに対応",
        paragraphs: [
          "パッケージに2つのQRや2つのストアアイコンを載せると、視覚的に重くなります。",
          "スマートQRなら、1つのコードでiPhoneとAndroidの両方に対応できます。",
        ],
      },
      {
        title: "商品別に計測する",
        paragraphs: [
          "商品ラインやキャンペーンごとに別QRを作れば、どのパッケージがアプリDLを生んだか分かります。",
          "印刷前には実物サイズで読み取りテストをしてください。",
        ],
      },
    ],
  },
  "smart-link-vs-deep-link": {
    title: "スマートリンクとディープリンクの違い",
    excerpt:
      "混同されやすい2つの概念を、アプリDLと既存ユーザー復帰の観点で整理します。",
    category: "基礎知識",
    intro: [
      "スマートリンクとディープリンクは似ていますが、目的が違います。",
      "アプリをまだ入れていない人をストアへ送るのか、既存ユーザーをアプリ内の特定画面へ戻すのかで選ぶべき仕組みが変わります。",
    ],
    sections: [
      {
        title: "スマートリンクとは",
        paragraphs: [
          "スマートリンクは、クリックした端末や状況に応じてリンク先を変えるURLです。",
          "iPhoneは App Store、Androidは Google Play、PCはWebページへ送るような導線に向いています。",
        ],
      },
      {
        title: "ディープリンクとは",
        paragraphs: [
          "ディープリンクは、インストール済みアプリの特定画面を開くための仕組みです。",
          "既存ユーザーの再訪や通知、メールからアプリ内画面へ戻す用途に向いています。",
        ],
      },
      {
        title: "最初に必要なのはどちらか",
        paragraphs: [
          "新規ユーザー獲得が目的なら、まずスマートリンクでストア導線を短くするのが簡単です。",
          "アプリ内回遊や復帰施策が増えてきたら、ディープリンクを追加する流れが自然です。",
        ],
      },
    ],
  },
  "atribucion-descargas-apps-medir-canal-real": {
    title: "アプリDLの流入元を正しく測る方法",
    excerpt:
      "App Store ConnectやGoogle Play Consoleだけでは分からない、チャネル別計測の考え方。",
    category: "分析",
    intro: [
      "アプリのダウンロード数は分かっても、どのチャネルがそれを生んだのか分からないことがあります。",
      "ストア側のデータと、リンク側のクリックデータを組み合わせると、改善の手がかりが増えます。",
    ],
    sections: [
      {
        title: "チャネルごとにリンクを分ける",
        paragraphs: [
          "Instagram、広告、メール、QR、店頭など、入口ごとに別スマートリンクを作ります。",
          "リンク先は同じアプリでも、クリックデータは分けて残せます。",
        ],
      },
      {
        title: "端末別データを見る",
        paragraphs: [
          "iOSとAndroidでクリック数が大きく違う場合、広告配信やクリエイティブの調整が必要かもしれません。",
          "PC流入が多い場合は、代替URLのLPも整えるべきです。",
        ],
      },
      {
        title: "推定と実測を分けて扱う",
        paragraphs: [
          "リンク側で見えるのはクリックと推定です。正確なインストールや課金はアプリ内分析と照合します。",
          "ただし、初期のチャネル比較にはスマートリンクだけでも十分に役立ちます。",
        ],
      },
    ],
  },
  "bio-instagram-app-plantillas-descargas": {
    title: "アプリDLを増やすInstagramプロフィール文の型",
    excerpt:
      "プロフィールに置く文言、リンク、CTAを整えて、アプリ導入までの迷いを減らします。",
    category: "SNS",
    intro: [
      "Instagramのプロフィールは、アプリへの入口として非常に重要です。",
      "しかし、リンクが分かりにくかったり、CTAが弱かったりすると、フォロワーはストアまで進みません。",
    ],
    sections: [
      {
        title: "文言は短くする",
        paragraphs: [
          "「アプリはこちら」「無料でアプリをダウンロード」「予約はアプリから」のように、行動が分かる文言にします。",
          "長い説明より、誰に何をしてほしいかが一目で分かることが大切です。",
        ],
      },
      {
        title: "リンクは1つにする",
        paragraphs: [
          "プロフィールに App Store と Google Play の2つを入れるのは難しいです。",
          "スマートリンクなら1つのURLで両方に対応し、PCユーザーにはWebページを見せられます。",
        ],
      },
      {
        title: "投稿やストーリーと合わせる",
        paragraphs: [
          "投稿内で「プロフィールのリンクからアプリをダウンロード」と案内し、同じスマートリンクに誘導します。",
          "キャンペーンごとに別リンクを使えば、どの投稿がクリックを生んだか比較できます。",
        ],
      },
    ],
  },
  "lanzar-app-saas-sin-desperdiciar-presupuesto": {
    title: "SaaSのモバイルアプリ公開で流入と広告費を無駄にしない方法",
    excerpt:
      "SaaSのモバイル版ローンチで、リードを失わずにApp Store、Google Play、Webへ案内する手順。",
    category: "SaaS",
    intro: [
      "SaaSがモバイルアプリを公開するとき、既存ユーザー、見込み客、広告流入を正しく案内する必要があります。",
      "リンク先が複数ある状態でローンチすると、せっかくの関心をインストール前に失うことがあります。",
    ],
    sections: [
      {
        title: "ローンチ前にURLを整理する",
        paragraphs: [
          "App Store、Google Play、Web版、ヘルプページなど、必要なリンクを整理します。",
          "ユーザーに見せるURLは1つにし、スマートリンク側で振り分けるのが理想です。",
        ],
      },
      {
        title: "チャネル別にリンクを作る",
        paragraphs: [
          "既存ユーザー向けメール、広告、営業資料、ヘルプセンター、展示会QRなどでリンクを分けます。",
          "同じアプリでも入口が違えば、クリックデータを分けて見た方が改善しやすくなります。",
        ],
      },
      {
        title: "営業とカスタマーサクセスにも共有",
        paragraphs: [
          "チーム全員が同じスマートリンクを使えば、顧客に2つのストアURLを送る混乱を避けられます。",
          "ローンチ後は端末別クリックとチャネル別クリックを見て、次の施策に反映しましょう。",
        ],
      },
    ],
  },
};

export const japaneseBlogOverrides = Object.fromEntries(
  Object.entries(japaneseBlogArticles).map(([slug, article]) => [
    slug,
    {
      ...article,
      readTime: "5分",
      content: <ArticleBody article={article} />,
    },
  ]),
);
