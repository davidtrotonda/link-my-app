import React from "react";
import { Link } from "react-router-dom";
import { localizePath } from "./i18nRoutes.js";

const authorData = {
  name: "David Trotonda",
  role: "CEO de SkeilApps",
  img: "https://skeilapps.com/wp-content/uploads/2025/12/IMG_20251213_151012-4.webp"
};

export const englishBlogOverrides = {
  "error-perder-ventas-instagram": {
    title: "The mistake of using two app download links on social media",
    excerpt: "Learn why intermediate clicks break your funnel and how one smart link sends every user to the right store.",
    category: "APP MARKETING",
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          You've spent months designing and coding your app. It's finally published on the <strong>App Store</strong> and <strong>Google Play</strong>. Full of excitement, you go to your Instagram or TikTok profile to put the download link and... surprise: <strong>social networks only allow you to put a single link in your bio.</strong>
        </p>
        <p>
          What do you do then if you have two different stores? This small technical limitation has been a headache for thousands of developers and marketers, and how you solve it will define whether your app is a success or a failure.
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The trap of intermediate pages</h2>
        <p>
          The most common—and most harmful—solution is to resort to bio-link tools (like Linktree) or create your own "Landing Page". The idea seems logical: you create a simple web page containing two giant buttons, one that says <em>"Download for iOS"</em> and another that says <em>"Download for Android"</em>.
        </p>
        <p>
          However, <strong>this is a fatal mistake for your conversion funnel</strong>. In the digital marketing world, every extra step the user must take is known as "friction". And friction is the number one enemy of sales and downloads.
        </p>
        <p>
          When the user clicks on your profile, they don't want to browse a web page, they don't want to read texts, and they definitely don't want to have to make a decision about which button to press. They want your app on their phone as fast as possible.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The math of losing users</h2>
        <p>
          Let's look at the numbers. In the mobile app industry, we know that every time you force the user to make an additional click or wait for a web page to load, <strong>you lose between 40% and 60% of the traffic</strong>.
        </p>
        <p>
          Imagine 1,000 people click on your Instagram profile. The internal Instagram browser opens, loads your Linktree page (which takes about 2 or 3 seconds depending on the connection). Of those 1,000 people, 300 get tired of waiting and close the window. Of the 700 remaining, 200 get distracted by other links you have or are simply too lazy to look for the correct button. In the end, only 500 reach the App Store. You just lost half of your potential users because of an extra button.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The ultimate solution: Link My App</h2>
        <p>
          Current technology allows us to be much smarter. If a user is browsing from an iPhone, why do we ask them what device they have? Their phone is already giving us that information.
        </p>
        <p>
          This is where <strong>Link My App</strong> comes in. We have created the ultimate solution to this problem: a universal <strong>Smart Link</strong>.
        </p>
        <p>
          With Link My App, you generate a single link (e.g. <code>link-my.app/your-app</code>) that you put in your bio. When a user clicks, our server intercepts the request in milliseconds, detects if it is an Apple or Android device, and <strong>redirects them instantly and without intermediate pages</strong> directly to their corresponding store.
        </p>
        <p>
          The result is magic: the user makes one click on Instagram and, in less than a second, the official App Store opens on their screen ready to download. Zero friction, zero distractions, and 100% of your users reaching the finish line.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Apply this today</h3>
          <p className="text-gray-600 mb-6">Create a single smart link that detects your user's phone and sends them straight to their store.</p>
          <Link to={localizePath("/", "en")} className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Create your link for free
          </Link>
        </div>
      </div>
    )
  },
  "alternativa-gratis-onelink-to": {
    title: "The best onelink.to alternative, free and modern",
    excerpt: "See why older one-link tools feel slow and how to create a faster, cleaner smart link for your app.",
    category: "ALTERNATIVES",
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          If you are looking to create a smart link that sends iPhone users to the App Store and Android users to Google Play, chances are you ended up using the "onelink.to" service.
        </p>
        <p>
          For many years, onelink.to has been a very popular tool for doing exactly this. However, its technology and design have remained stuck in the past, and its free version is extremely limited.
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The limitations of onelink.to</h2>
        <p>
          The main problem with onelink.to is friction. Its system often shows an intermediate screen or takes a couple of seconds to process the redirection (Client-Side redirection), causing a noticeable drop in the conversion funnel. That waiting time is gold when you pay for clicks.
        </p>
        <p>
          Furthermore, <strong>onelink.to inserts annoying ads on the redirection screen</strong>, hurting your users' experience unless you pay. Basic functions like customizing the link, changing the slug, or having a neat dashboard, are also locked behind outdated paywalls. Its user experience leaves much to be desired in 2026.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Link My App: The agile, free and ad-free alternative</h2>
        <p>
          If you just need <strong>a smart link that directs iPhones to the App Store and Androids to Google Play</strong>, the best alternative is <strong>Link My App</strong>: a 100% free and ad-free solution.
        </p>
        <p>
          We have eliminated all the technical complexity. You don't need to install any SDK in your application, you don't need to modify code, and you don't need to configure Apple certificates. It works 100% externally through Server-Side detection.
        </p>
        <p>
          You just paste your iOS link, your Android link, and in a second you get an elegant "Smart Link" ready to use in your Instagram, TikTok or Facebook Ads campaigns. And best of all: the core basic routing function is and always will be free.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Apply this today</h3>
          <p className="text-gray-600 mb-6">Create a single smart link that detects your user's phone and sends them directly to their store, without touching a line of code.</p>
          <Link to={localizePath("/", "en")} className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Create your link for free
          </Link>
        </div>
      </div>
    )
  },
  "como-evitar-perder-usuarios-descarga": {
    title: "How device detection works in one app download link",
    excerpt: "One URL can detect iPhone, Android or desktop and redirect users without an extra landing page.",
    category: "PRODUCT",
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          When we talk about optimizing app downloads, there is a technical concept that makes the difference between a profitable campaign and a campaign that loses money: <strong>device detection</strong>.
        </p>
        <p>
          You've probably wondered how big companies (like Uber, Spotify or Netflix) manage to put a single link in their ads and magically open the correct app store on your phone without having to go through a web page asking you what phone you use. Today we explain exactly how this technology works and how you can apply it to your own app.
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">What is the User-Agent?</h2>
        <p>
          The secret to all this lies in something called the <strong>User-Agent</strong>. Every time your mobile phone, whether using Safari, Chrome, or the internal browser of TikTok and Instagram, clicks on a link and connects to a web page, it sends a small invisible business card.
        </p>
        <p>
          This "business card" is the User-Agent. It contains technical information about the device, such as: <em>"Hello, I am an iPhone 15 Pro Max running iOS 17 using Safari"</em>, or <em>"Hello, I am a Samsung Galaxy S23 running Android 14 using Chrome"</em>.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The flaw of Client-Side detection</h2>
        <p>
          Some developers try to solve the two-link problem by creating their own web page with a JavaScript script that reads the User-Agent and redirects the user. This is known as <em>Client-Side</em> redirection.
        </p>
        <p>
          While it works on paper, in practice it's a disaster. It requires the phone to download the HTML page, download the JavaScript code, execute it, and then send the new command to go to the App Store. This takes several seconds, leaves a blank screen visible to the user, and is often blocked by built-in social media browsers due to security policies.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The magic of Server-Side Routing with Link My App</h2>
        <p>
          The correct and professional way to do this is through server-side redirects (<em>Server-Side Routing</em>), and that is exactly what we have built at <strong>Link My App</strong>.
        </p>
        <p>
          When you use our service, we provide you with a universal link. When the user clicks, the request hits our ultra-fast servers. Before even trying to send a single pixel or code to the user's phone, our servers read the User-Agent, process the logic and respond with an HTTP 302 instant redirect code.
        </p>
        <p>
          The result? The user clicks and, in a fraction of a millisecond (imperceptible to the human eye), their operating system receives the order to open the native App Store or Google Play on their phone. It is the most fluid, premium and fastest experience possible.
        </p>
        <p>
          At Link My App we have taken care of all the technical complexity of maintaining updated User-Agent databases and setting up low-latency servers around the world, so you just have to paste your two store links and get your ultimate "Smart Link".
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Create your first Smart Link</h3>
          <p className="text-gray-600 mb-6">Try device detection for free and optimize the traffic of your campaigns.</p>
          <Link to={localizePath("/", "en")} className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Create your universal link
          </Link>
        </div>
      </div>
    )
  },
  "secreto-apps-top-100": {
    title: "Why top apps never use Linktree for app downloads",
    excerpt: "The biggest apps protect every click. Here is why they use direct smart links instead of bio-link pages.",
    category: "APP GROWTH",
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          Have you ever seen an ad for Uber, Tinder, or TikTok that takes you to a Linktree to choose where you want to download their app? The answer is no. Top-tier applications never use intermediate landing pages for their main acquisition campaigns.
        </p>
        <p>
          While tools like Linktree are great for creators who want to share multiple types of content (a YouTube video, a blog post, and a shop link), they are devastating for app download funnels.
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The Paradox of Choice</h2>
        <p>
          When you present a user with a Linktree containing five different buttons, you are asking them to do work. They have to read, evaluate, and select the right option. In marketing psychology, this is known as the paradox of choice. Giving people more options often results in them taking no action at all.
        </p>
        <p>
          If your primary goal is to get app installs, every element on the screen that doesn't lead to an install is a distraction. The top 100 apps know this. They understand that a single, clear path converts astronomically higher than a menu of options.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The solution: Direct Routing</h2>
        <p>
          Instead of giving the user a choice, smart links make the choice for them. By using a service like <strong>Link My App</strong>, the link itself acts as a traffic controller.
        </p>
        <p>
          If an iPhone user clicks, they are instantly teleported to the App Store. If an Android user clicks, they land directly in Google Play. There is no menu, no Linktree, and no confusion. Just a seamless transition from intent to action.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Route traffic like a pro</h3>
          <p className="text-gray-600 mb-6">Stop losing users in link trees. Send them straight to the download.</p>
          <Link to={localizePath("/", "en")} className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Create your smart link
          </Link>
        </div>
      </div>
    )
  },
  "alternativa-branch-io-sin-sdk": {
    title: "Branch.io alternative: universal app links without an SDK",
    excerpt: "Branch is powerful, but heavy. Learn how to route app traffic without adding code to your app.",
    category: "NO-CODE ROUTING",
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          Branch.io is an incredibly powerful tool for deep linking and attribution. However, for many indie developers, startups, and marketing teams, implementing Branch is like buying a Ferrari just to go to the grocery store.
        </p>
        <p>
          Installing Branch requires adding an SDK to your app, bloating your bundle size, modifying your AppDelegate or AndroidManifest, and spending hours navigating complex documentation and certificate setups.
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Do you really need Deep Linking?</h2>
        <p>
          Deep linking (opening a specific screen inside your app if it's already installed) is useful. But ask yourself: is your primary goal right now to re-engage existing users, or is it to get <strong>new users to download the app</strong> from social media?
        </p>
        <p>
          If your main focus is user acquisition and routing people to the App Store or Google Play depending on their device, you don't need an SDK. You don't need to write a single line of code.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The No-Code Approach</h2>
        <p>
          <strong>Link My App</strong> was built specifically for this use case. It provides the core routing functionality of enterprise tools without the heavy integration. 
        </p>
        <p>
          You simply paste your store URLs into our dashboard, and we give you a short link that handles device detection server-side. It works instantly, won't crash your app, and doesn't require an app update to implement. It's the agile marketer's best friend.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Try the No-Code router</h3>
          <p className="text-gray-600 mb-6">Set up your universal download link in 30 seconds without touching Xcode or Android Studio.</p>
          <Link to={localizePath("/", "en")} className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Get started for free
          </Link>
        </div>
      </div>
    )
  },
  "medir-roi-influencers-app": {
    title: "How to measure the real ROI of influencer app campaigns",
    excerpt: "Stop guessing whether an Instagram mention brought downloads. Track every click by source and device.",
    category: "ANALYTICS",
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          You paid a popular influencer to mention your app on Instagram. They posted the story, tagged your account, and said the link was in their bio. But two days later, when you check your App Connect dashboard, you see a small bump in downloads, but you can't prove exactly how many came from that specific influencer.
        </p>
        <p>
          This is the nightmare of influencer marketing: the inability to accurately attribute results and measure Return on Investment (ROI).
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The problem with organic links</h2>
        <p>
          If you give the influencer a direct link to the App Store, you lose visibility. Apple and Google provide some analytics, but they are notoriously delayed and often lump all social traffic into a generic "Web Referrer" bucket. You can't distinguish between traffic from Influencer A, Influencer B, or your own organic posts.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Campaign tracking made easy</h2>
        <p>
          The solution is to use dedicated tracking links for every campaign. With <strong>Link My App</strong>, you can create a unique smart link for each influencer (e.g., <code>link-my.app/your-app-influencer1</code>). 
        </p>
        <p>
          Both links route the user perfectly to the right app store, but our dashboard tracks them separately. You can log in and see exactly that Influencer A generated 1,200 clicks (resulting in ~400 downloads) while Influencer B only generated 300 clicks. Now you know exactly who to hire again and who wasn't worth the money.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Start tracking your campaigns</h3>
          <p className="text-gray-600 mb-6">Create trackable smart links for all your marketing efforts.</p>
          <Link to={localizePath("/", "en")} className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Create a trackable link
          </Link>
        </div>
      </div>
    )
  },
  "alternativa-firebase-dynamic-links": {
    title: "The Firebase Dynamic Links alternative after shutdown",
    excerpt: "Firebase Dynamic Links is going away. Here is a simple replacement for App Store, Google Play and QR campaigns.",
    category: "MIGRATION",
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          Google shocked the developer community by announcing the deprecation of Firebase Dynamic Links (FDL). For years, FDL was the default choice for generating short links that handled deep linking and device routing for free.
        </p>
        <p>
          With its impending shutdown, thousands of apps are left scrambling for a viable alternative that won't cost them hundreds of dollars a month in enterprise SaaS fees.
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Evaluating the alternatives</h2>
        <p>
          Most guides will point you towards giants like AppsFlyer, Adjust, or Branch. While these are excellent platforms, they are heavy attribution SDKs designed for massive ad spend. If you were using Firebase Dynamic Links purely to have a single `link.yourapp.com` that opens the App Store on iOS and Google Play on Android, migrating to an enterprise attribution provider is severe overkill.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The 1-Click Migration with Link My App</h2>
        <p>
          If you just need reliable device routing without the deep-linking SDK overhead, <strong>Link My App</strong> is the perfect drop-in replacement.
        </p>
        <p>
          You don't need to update your app code. You just create your links in our dashboard, and you instantly get a robust, server-side routing URL that handles iOS, Android, and Web fallbacks flawlessly. Plus, we automatically generate high-quality QR codes for every link you create.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Migrate away from Firebase today</h3>
          <p className="text-gray-600 mb-6">Replace your deprecated Dynamic Links with fast, reliable Smart Links.</p>
          <Link to={localizePath("/", "en")} className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Start migrating now
          </Link>
        </div>
      </div>
    )
  },
  "disparar-descargas-app-link": {
    title: "Why every extra click costs you app downloads",
    excerpt: "Every extra decision lowers conversion. A direct smart link keeps users moving toward install.",
    category: "STRATEGY",
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          You managed to get a marketing budget and decided to launch an ad campaign on Meta Ads (Facebook and Instagram) or TikTok to promote your new application. You optimize the creatives, segment the audience perfectly, and achieve an enviable Cost Per Click (CPC).
        </p>
        <p>
          However, when you look at the metrics at the end of the day, you realize something terrifying: you paid for 5,000 clicks on your ad, but you only have 800 actual downloads in the stores. Where did those 4,200 users you paid out of pocket go? <strong>Welcome to the problem of the broken conversion funnel.</strong>
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Understanding friction and drop-off</h2>
        <p>
          In growth marketing, the funnel is the journey a user takes from seeing your brand to performing the desired action (downloading the app).
        </p>
        <p>
          The golden rule of the funnel is: <strong>every additional step cuts your conversion rate in half</strong>. If a user who clicks on your TikTok ad is directed to a Linktree-style page where they have to find your app among other links, or to a website where they must choose between the Apple or Android logo, you are adding an unnecessary step.
        </p>
        <p>
          This intermediate step is called "Drop-off". Social media users have an attention span of barely 3 seconds. If you make them wait for a webpage to load and then make them think about which button to click, they will simply close the tab. You just paid for that click in vain. Your CPA (Cost Per Acquisition) skyrockets, and your ROAS (Return on Ad Spend) plummets.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Maximizing ROAS with a Smart Link</h2>
        <p>
          For your campaigns to be truly profitable, you need the distance between the ad and the app store to be zero.
        </p>
        <p>
          This is exactly where <strong>Link My App</strong> becomes the best tool in your marketing arsenal. By using our smart routing system, you only place one single link in your Ads campaigns.
        </p>
        <p>
          When the user clicks on the ad, Link My App instantly identifies their device and opens the native App Store on iOS or Google Play on Android, with no loading screens or extra buttons. By completely removing the friction of the intermediate page, you ensure that 100% of the clicks you paid for reach the "Install" button.
        </p>
        <p>
          This simple optimization of removing just 1 intermediate click is capable of <strong>doubling or tripling your downloads while keeping exactly the same marketing budget</strong>. It is the fastest and most effective way to lower your CPA and make your application scale profitably.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Increase your ROAS with one click</h3>
          <p className="text-gray-600 mb-6">Eliminate intermediate steps and send your users straight to download your App.</p>
          <Link to={localizePath("/", "en")} className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Increase your conversions
          </Link>
        </div>
      </div>
    )
  },
  "visitas-vs-descargas": {
    title: "Why your app gets visits but few downloads",
    excerpt: "If you have traffic but not installs, the leak is often in the link flow, not in the app.",
    category: "FUNNEL",
    content: (
      <div className="text-[#111827] text-[15px] sm:text-[16px] leading-[1.7] space-y-6">
        <p>
          One of the most frustrating experiences for an app creator is looking at Google Analytics and seeing thousands of visits to the landing page, but then looking at the App Store Connect and seeing only a handful of downloads.
        </p>
        <p>
          You might think your app screenshots are bad, or your description needs work. But in many cases, the problem isn't the app store listing; it's the journey there.
        </p>
        
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">The Landing Page Trap</h2>
        <p>
          Many founders believe that a user must visit a beautiful landing page before downloading the app to "understand the value proposition". However, for mobile traffic coming from social media, this is almost always false.
        </p>
        <p>
          Mobile users have already seen your TikTok, Reel, or Ad. They already have the intent to download. Forcing them to read a landing page on a tiny screen, scroll down, and find the App Store button creates massive drop-off.
        </p>
  
        <h2 className="text-[22px] font-bold mt-12 mb-4 tracking-tight scroll-mt-32">Streamline the Flow</h2>
        <p>
          If your traffic source is mobile (Instagram, TikTok, Twitter), skip the landing page entirely. Use a <strong>Smart Link</strong> from <strong>Link My App</strong> as your bio link. 
        </p>
        <p>
          When a user taps, they go straight into the App Store ecosystem, where they feel safe and familiar. Your app store screenshots and reviews will do the selling far better than an unoptimized mobile landing page ever could.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 text-center">
          <h3 className="text-[20px] font-bold mb-3 text-black">Fix your funnel</h3>
          <p className="text-gray-600 mb-6">Start turning profile visits directly into app installs.</p>
          <Link to={localizePath("/", "en")} className="inline-block font-bold px-8 py-3.5 rounded-full transition-transform shadow-lg transform hover:-translate-y-1 bg-black text-white hover:bg-gray-900">
            Optimize your flow
          </Link>
        </div>
      </div>
    )
  }
};
