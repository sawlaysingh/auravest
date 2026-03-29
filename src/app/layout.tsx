import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Auravest — Smart Finance & Asset Management",
  description: "AI-powered finance platform integrating budget tracking, investment portfolio management, tax optimization, and predictive analytics to grow and protect your wealth.",
  keywords: "finance, investment, portfolio, budget, tax optimization, AI analytics, wealth management",
  openGraph: {
    title: "Auravest — Smart Finance & Asset Management",
    description: "Manage your wealth intelligently with AI-driven insights, portfolio tracking, and tax optimization.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
