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
  title: "K-조달 AI 스웜 | K-Jodal AI Swarm",
  description: "자율 AI 에이전트 군집이 이끄는 차세대 공공조달 생태계 - 중소기업의 조달 혁신 파트너",
  keywords: ["공공조달", "AI", "에이전트", "나라장터", "입찰", "중소기업"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
