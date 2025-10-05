import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PostHogProvider } from "@/components/PostHogProvider";
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
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="/favicon-128x128.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="196x196"
          href="/favicon-196x196.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-180x180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/apple-touch-icon-167x167.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-touch-icon-57x57.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="stomatiq - Blog Posts"
          href="/rss/posts.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="stomatiq - Courses"
          href="/rss/courses.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="stomatiq - AI Workflow Open Spec"
          href="/rss/workflow.xml"
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
        <PostHogProvider>
          <SiteHeader />
          <div className="w-screen pt-4 md:pt-8">{children}</div>
          <SiteFooter />
        </PostHogProvider>
      </body>
    </html>
  );
}
