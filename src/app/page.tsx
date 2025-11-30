import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Stats } from "@/components/landing/stats";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Stats />

      {/* Footer */}
      <footer className="py-12 bg-[#0F172A] border-t border-[#1E293B]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#64748B] mb-2">
            2025 조달청 홍보 아이디어 공모전 - 혁신 조달서비스 아이디어 부문
          </p>
          <p className="text-[#94A3B8] font-medium">
            K-조달 AI 스웜 (K-Jodal AI Swarm)
          </p>
          <p className="text-[#475569] text-sm mt-4">
            자율 AI 에이전트 군집이 이끄는 차세대 공공조달 생태계
          </p>
        </div>
      </footer>
    </main>
  );
}
