import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PawTrack",
  description: "Track your pet's health",
};

/**
 * `<html>` and `<body>` must live here: Next renders the built-in 404 page with
 * the root layout alone, without any `[locale]` layout.
 *
 * `lang` comes from the resolved request locale (WCAG 3.1.1). Outside a
 * `[locale]` route — a 404 on an unknown path — this falls back to the default
 * locale, which is still better than no `lang` at all.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
