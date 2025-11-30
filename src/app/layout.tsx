import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
};

export const metadata: Metadata = {
  title: {
    default: "K-조달 AI 스웜 | 차세대 공공조달 AI 플랫폼",
    template: "%s | K-조달 AI 스웜",
  },
  description:
    "자율 AI 에이전트 군집이 이끄는 차세대 공공조달 생태계. 중소기업에게 대기업 수준의 조달 전문팀을 제공합니다. 24시간 자율적으로 협업하는 AI 스웜이 입찰의 모든 과정을 지원합니다.",
  keywords: [
    "공공조달",
    "AI",
    "인공지능",
    "에이전트",
    "나라장터",
    "입찰",
    "중소기업",
    "조달청",
    "디지털 트윈",
    "제안서 자동작성",
    "K-조달",
  ],
  authors: [{ name: "K-조달 AI 스웜 팀" }],
  creator: "K-조달 AI 스웜",
  publisher: "K-조달 AI 스웜",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://k-jodal-swarm.vercel.app",
    siteName: "K-조달 AI 스웜",
    title: "K-조달 AI 스웜 | 차세대 공공조달 AI 플랫폼",
    description:
      "자율 AI 에이전트 군집이 이끄는 차세대 공공조달 생태계. 중소기업의 조달 혁신 파트너.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "K-조달 AI 스웜",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "K-조달 AI 스웜 | 차세대 공공조달 AI 플랫폼",
    description:
      "자율 AI 에이전트 군집이 이끄는 차세대 공공조달 생태계. 중소기업의 조달 혁신 파트너.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
