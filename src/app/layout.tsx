import type { Metadata } from "next";
import { Lora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogInit } from "@/components/posthog-init";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stomatiq",
    template: "%s — Stomatiq",
  },
  description:
    "AI courses, products, and workflows that help creators and small teams ship what matters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lora.variable} ${geistMono.variable} antialiased font-sans min-h-screen min-w-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PostHogInit />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
