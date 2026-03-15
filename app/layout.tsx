import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EOVO · 地球原影",
  description: "人间剪影的数字档案馆。收录文明切片，记录奇物异景，是浩瀚世界的观察者。Earth's Original Visual Observer.",
  keywords: ["EOVO", "地球原影", "奇物档案", "文明切片", "人间剪影", "世界观察", "数字档案"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "EOVO · 地球原影",
    description: "人间剪影的数字档案馆。收录文明切片，记录奇物异景，是浩瀚世界的观察者。",
    url: "https://eovo.org",
    siteName: "EOVO",
    images: [
      {
        url: "https://eovo.org/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}