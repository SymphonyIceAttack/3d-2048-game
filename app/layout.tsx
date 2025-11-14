import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "3D 2048 Game - Play the Classic Puzzle in 3D Space",
  description:
    "Experience the classic 2048 puzzle game in stunning 3D! Play in a 4x4x4 cube space with smooth controls and immersive graphics. Rotate the view and combine tiles to reach 2048.",
  keywords: [
    "2048",
    "3D game",
    "puzzle game",
    "brain teaser",
    "3D puzzle",
    "web game",
    "casual game",
  ],
  authors: [{ name: "2048 3D" }],
  creator: "SymphonyIceAttack",
  publisher: "SymphonyIceAttack",
  generator: "SymphonyIceAttack",
  applicationName: "3D 2048 Game",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://www.3048.onl/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "3D 2048 Game - Play the Classic Puzzle in 3D Space",
    description:
      "Experience the classic 2048 puzzle game in stunning 3D! Play in a 4x4x4 cube space with smooth controls and immersive graphics.",
    siteName: "3D 2048 Game",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "3D 2048 Game Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D 2048 Game - Play the Classic Puzzle in 3D Space",
    description:
      "Experience the classic 2048 puzzle game in stunning 3D! Play in a 4x4x4 cube space with smooth controls.",
    images: ["/og-image.png"],
    creator: "SymphonyIceAttack",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
