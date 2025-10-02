import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "stomatiq",
  description: "stomatiq",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              const getSystem = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              const applyTheme = (value) => {
                const theme = value === 'system' ? getSystem() : value;
                document.documentElement.classList.toggle('dark', theme === 'dark');
                document.documentElement.classList.toggle('vibe', theme === 'vibe');
              };
              const saved = localStorage.getItem('theme') || 'system';
              applyTheme(saved);
            })();
          `}
        </Script>
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <SiteHeader />
        <div className="w-screen">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
