import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import { ThemeProvider } from "@/components/blog/theme-provider";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.3048.onl/"),
  title: {
    default: "3D 2048 Game - Play the Classic Puzzle in 3D Space",
    template: "%s | 3D 2048 Game",
  },
  description:
    "Experience the classic 2048 puzzle game in stunning 3D! Play in a 4x4x4 cube space with smooth controls and immersive graphics. Rotate the view and combine tiles to reach 2048. Free to play in your browser!",
  keywords: [
    "2048",
    "3D game",
    "3D 2048",
    "puzzle game",
    "brain teaser",
    "3D puzzle",
    "web game",
    "browser game",
    "casual game",
    "free game",
    "online game",
    "spatial puzzle",
    "Three.js game",
    "React game",
  ],
  authors: [{ name: "SymphonyIceAttack", url: "https://www.3048.onl" }],
  creator: "SymphonyIceAttack",
  publisher: "SymphonyIceAttack",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "3D 2048 Game - Play the Classic Puzzle in 3D Space",
    description:
      "Experience the classic 2048 puzzle game in stunning 3D! Play in a 4x4x4 cube space with smooth controls and immersive graphics. Free to play!",
    siteName: "3D 2048 Game",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "3D 2048 Game - 3D Puzzle Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@3048Game",
    creator: "@SymphonyIceAttack",
    title: "3D 2048 Game - Play the Classic Puzzle in 3D Space",
    description:
      "Experience the classic 2048 puzzle game in stunning 3D! Play in a 4x4x4 cube space with smooth controls.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
  },
  category: "games",
  classification: "Browser Game, Puzzle Game, 3D Game",
  referrer: "origin-when-cross-origin",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.3048.onl/#website",
        url: "https://www.3048.onl/",
        name: "3D 2048 Game",
        description:
          "Experience the classic 2048 puzzle game in stunning 3D! Play in a 4x4x4 cube space with smooth controls and immersive graphics.",
        inLanguage: "en-US",
        potentialAction: {
          "@type": "PlayAction",
          target: "https://www.3048.onl/",
        },
      },
      {
        "@type": "VideoGame",
        "@id": "https://www.3048.onl/#game",
        url: "https://www.3048.onl/",
        name: "3D 2048 Game",
        description:
          "Experience the classic 2048 puzzle game in stunning 3D! Play in a 4x4x4 cube space with smooth controls and immersive graphics. Rotate the view and combine tiles to reach 2048.",
        gamePlatform: "Web Browser",
        applicationCategory: "Game",
        genre: ["Puzzle", "Casual", "Brain Teaser"],
        isAccessibleForFree: true,
        inLanguage: "en-US",
        operatingSystem: "Any",
        playMode: "SinglePlayer",
        author: {
          "@type": "Organization",
          name: "SymphonyIceAttack",
          url: "https://www.3048.onl",
        },
        publisher: {
          "@type": "Organization",
          name: "SymphonyIceAttack",
          url: "https://www.3048.onl",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        screenshot: "https://www.3048.onl/og-image.png",
      },
      {
        "@type": "Organization",
        "@id": "https://www.3048.onl/#organization",
        name: "SymphonyIceAttack",
        url: "https://www.3048.onl",
        logo: {
          "@type": "ImageObject",
          url: "https://www.3048.onl/logo.png",
        },
        sameAs: [
          "https://twitter.com/3048Game",
          "https://github.com/symphonyiceattack/3d-2048",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.3048.onl/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.3048.onl/",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
