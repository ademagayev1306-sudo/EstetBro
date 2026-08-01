import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ЭстетикБро — Профессиональный детейлинг автомобилей в Челябинске",
  description: "Детейлинг-студия ЭстетикБро в Челябинске. Полный спектр услуг: детейлинг, полировка, керамика, оклейка PPF, тонировка, химчистка. Доступные цены, индивидуальный подход.",
  keywords: ["детейлинг", "полировка авто", "керамическое покрытие", "оклейка PPF", "химчистка салона", "Челябинск", "ЭстетикБро", "детейлинг центр"],
  authors: [{ name: "ЭстетикБро" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "ЭстетикБро — Профессиональный детейлинг в Челябинске",
    description: "Полный цикл детейлинга: от химчистки до бронирования кузова. Запишитесь на услугу!",
    siteName: "ЭстетикБро",
    type: "website",
    locale: "ru_RU",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "ЭстетикБро — Детейлинг центр в Челябинске",
    }],
    // url будет добавлен после покупки домена
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
