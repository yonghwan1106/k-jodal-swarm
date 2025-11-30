"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  FlaskConical,
  Activity,
  PenTool,
  Mic,
  Home,
  Radar,
  Brain,
  Zap,
  Info,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SWARM_STATUS } from "@/lib/constants/swarm";
import { useMobileMenu } from "@/contexts/mobile-menu-context";

const navigation = [
  {
    name: "대시보드",
    href: "/dashboard",
    icon: LayoutDashboard,
    ariaLabel: "메인 대시보드로 이동"
  },
  {
    name: "입찰공고",
    href: "/dashboard/bids",
    icon: FileText,
    ariaLabel: "입찰공고 목록으로 이동"
  },
  {
    name: "디지털 트윈 시뮬레이터",
    href: "/dashboard/simulation",
    icon: FlaskConical,
    ariaLabel: "시뮬레이터로 이동"
  },
  {
    name: "에이전트 모니터링",
    href: "/dashboard/agents",
    icon: Activity,
    ariaLabel: "에이전트 모니터링으로 이동"
  },
  {
    name: "제안서 자동작성",
    href: "/dashboard/proposals",
    icon: PenTool,
    ariaLabel: "제안서 자동작성으로 이동"
  },
  {
    name: "AI 음성 상담",
    href: "/dashboard/voice",
    icon: Mic,
    ariaLabel: "AI 음성 상담으로 이동"
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useMobileMenu();

  // Close menu on route change
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [close]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-[#0F172A] border-r border-[#1E293B]",
          "transform transition-transform duration-300 ease-in-out",
          // Desktop: always visible
          "lg:translate-x-0",
          // Mobile: slide in/out
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="navigation"
        aria-label="메인 네비게이션"
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-bold text-white">K-조달 AI</h1>
              <p className="text-xs text-[#64748B]">스웜 대시보드</p>
            </div>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={close}
            className="lg:hidden p-2 rounded-lg text-[#94A3B8] hover:bg-[#1E293B] hover:text-white transition-colors"
            aria-label="메뉴 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Swarm status summary */}
        <div className="px-4 py-4 border-b border-[#1E293B]">
          <p className="text-xs text-[#64748B] mb-3 px-2">스웜 현황</p>
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2" title={`${SWARM_STATUS.scout.name}: ${SWARM_STATUS.scout.activeCount}개 활성`}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: SWARM_STATUS.scout.color }} />
              <Radar className="w-4 h-4" style={{ color: SWARM_STATUS.scout.color }} aria-hidden="true" />
              <span className="text-xs text-[#94A3B8]">{SWARM_STATUS.scout.activeCount}</span>
            </div>
            <div className="flex items-center gap-2" title={`${SWARM_STATUS.brain.name}: ${SWARM_STATUS.brain.activeCount}개 활성`}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: SWARM_STATUS.brain.color }} />
              <Brain className="w-4 h-4" style={{ color: SWARM_STATUS.brain.color }} aria-hidden="true" />
              <span className="text-xs text-[#94A3B8]">{SWARM_STATUS.brain.activeCount}</span>
            </div>
            <div className="flex items-center gap-2" title={`${SWARM_STATUS.action.name}: ${SWARM_STATUS.action.activeCount}개 활성`}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: SWARM_STATUS.action.color }} />
              <Zap className="w-4 h-4" style={{ color: SWARM_STATUS.action.color }} aria-hidden="true" />
              <span className="text-xs text-[#94A3B8]">{SWARM_STATUS.action.activeCount}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-4" aria-label="대시보드 메뉴">
          <p className="text-xs text-[#64748B] mb-3 px-2" id="nav-menu-label">메뉴</p>
          <ul className="space-y-1" role="menu" aria-labelledby="nav-menu-label">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    aria-label={item.ariaLabel}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                      "focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#0F172A]",
                      isActive
                        ? "bg-[#1E293B] text-white"
                        : "text-[#94A3B8] hover:bg-[#1E293B]/50 hover:text-white"
                    )}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
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
            aria-label="프로젝트 소개 페이지로 이동"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:bg-[#3B82F6]/20 hover:text-[#3B82F6] transition-all focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            <Info className="w-5 h-5" aria-hidden="true" />
            프로젝트 소개
          </Link>
          <Link
            href="/"
            aria-label="홈페이지로 이동"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:bg-[#1E293B]/50 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            홈으로 돌아가기
          </Link>
          <div className="mt-3 px-3">
            <div className="text-xs text-[#64748B]">테크소프트 주식회사</div>
            <div className="text-xs text-[#475569]">Pro Plan</div>
          </div>
        </div>
      </aside>
    </>
  );
}
