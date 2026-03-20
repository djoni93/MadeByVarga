import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientProviders from "./providers";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Made by Varga — Nameštaj i kuhinje po meri",
  description:
    "Nameštaj i kuhinje po meri, izrađeno u Vojvodini. Svaki komad ima svoju priču.",
  openGraph: {
    title: "Made by Varga",
    description: "Nameštaj i kuhinje po meri",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
