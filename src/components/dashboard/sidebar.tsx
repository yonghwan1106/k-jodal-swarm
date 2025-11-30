"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FlaskConical,
  Activity,
  PenTool,
  Mic,
  Settings,
  Home,
  Radar,
  Brain,
  Zap,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "대시보드",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "입찰공고",
    href: "/dashboard/bids",
    icon: FileText
  },
  {
    name: "디지털 트윈 시뮬레이터",
    href: "/dashboard/simulation",
    icon: FlaskConical
  },
  {
    name: "에이전트 모니터링",
    href: "/dashboard/agents",
    icon: Activity
  },
  {
    name: "제안서 자동작성",
    href: "/dashboard/proposals",
    icon: PenTool
  },
  {
    name: "AI 음성 상담",
    href: "/dashboard/voice",
    icon: Mic
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#0F172A] border-r border-[#1E293B]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#1E293B]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-white">K-조달 AI</h1>
          <p className="text-xs text-[#64748B]">스웜 대시보드</p>
        </div>
      </div>

      {/* Swarm status summary */}
      <div className="px-4 py-4 border-b border-[#1E293B]">
        <p className="text-xs text-[#64748B] mb-3 px-2">스웜 현황</p>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
            <Radar className="w-4 h-4 text-[#00D2FF]" />
            <span className="text-xs text-[#94A3B8]">4</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
            <Brain className="w-4 h-4 text-[#A855F7]" />
            <span className="text-xs text-[#94A3B8]">4</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <Zap className="w-4 h-4 text-[#22C55E]" />
            <span className="text-xs text-[#94A3B8]">3</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-4">
        <p className="text-xs text-[#64748B] mb-3 px-2">메뉴</p>
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                    isActive
                      ? "bg-[#1E293B] text-white"
                      : "text-[#94A3B8] hover:bg-[#1E293B]/50 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#1E293B]">
        <Link
          href="/about"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:bg-[#3B82F6]/20 hover:text-[#3B82F6] transition-all"
        >
          <Info className="w-5 h-5" />
          프로젝트 소개
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:bg-[#1E293B]/50 hover:text-white transition-all"
        >
          <Home className="w-5 h-5" />
          홈으로 돌아가기
        </Link>
        <div className="mt-3 px-3">
          <div className="text-xs text-[#64748B]">테크소프트 주식회사</div>
          <div className="text-xs text-[#475569]">Pro Plan</div>
        </div>
      </div>
    </aside>
  );
}
