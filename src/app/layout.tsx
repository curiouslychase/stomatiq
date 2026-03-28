import type { Metadata } from "next";
import { Work_Sans, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Stomatiq — 10x Your Team with AI",
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('stomatiq-theme')||'dark';if(t==='system'){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t);var p=new URLSearchParams(window.location.search);var a=p.get('accent');if(a)document.documentElement.setAttribute('data-accent',a)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${workSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <SiteHeader />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
