"use client";

import { useState, useEffect } from "react";
import { Bell, Search, User, Activity, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMobileMenu } from "@/contexts/mobile-menu-context";

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [activityCount, setActivityCount] = useState(847);
  const { toggle } = useMobileMenu();

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Simulate increasing activity count
    const activityTimer = setInterval(() => {
      setActivityCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(activityTimer);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0F172A]/95 backdrop-blur border-b border-[#1E293B] flex items-center justify-between px-4 lg:px-6">
      {/* Left side - Mobile menu button + Search */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="lg:hidden text-[#94A3B8] hover:text-white hover:bg-[#1E293B]"
          aria-label="메뉴 열기"
        >
          <Menu className="w-6 h-6" />
        </Button>

        {/* Search - hidden on very small screens */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" aria-hidden="true" />
          <input
            type="text"
            placeholder="입찰공고 검색..."
            aria-label="입찰공고 검색"
            className="w-48 md:w-64 lg:w-80 h-10 pl-10 pr-4 rounded-lg bg-[#1E293B] border border-[#334155] text-white placeholder-[#64748B] text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Live status - simplified on mobile */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E293B] border border-[#22C55E]/30">
          <Activity className="w-4 h-4 text-[#22C55E] animate-pulse" aria-hidden="true" />
          <span className="text-sm text-[#94A3B8]">실시간 활동</span>
          <Badge className="bg-[#22C55E]/20 text-[#22C55E] text-xs px-2">
            {activityCount.toLocaleString()}
          </Badge>
        </div>

        {/* Mobile activity indicator */}
        <div className="md:hidden flex items-center gap-1 px-2 py-1 rounded-full bg-[#1E293B]">
          <Activity className="w-4 h-4 text-[#22C55E] animate-pulse" aria-hidden="true" />
          <span className="text-xs text-[#22C55E]">{activityCount.toLocaleString()}</span>
        </div>

        {/* Time - hidden on mobile */}
        <div className="hidden lg:block text-sm text-[#64748B] font-mono" aria-live="polite" aria-atomic="true">
          {currentTime}
        </div>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-[#94A3B8] hover:text-white hover:bg-[#1E293B]"
          aria-label="알림 3개 있음"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EF4444]" aria-hidden="true" />
        </Button>

        {/* User - simplified on mobile */}
        <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-[#1E293B]">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-white">김철수</p>
            <p className="text-xs text-[#64748B]">대표이사</p>
          </div>
          <button
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
            aria-label="사용자 메뉴 열기"
          >
            <User className="w-5 h-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
