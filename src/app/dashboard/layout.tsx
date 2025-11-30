"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { MobileMenuProvider } from "@/contexts/mobile-menu-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileMenuProvider>
      <div className="min-h-screen bg-[#0F172A]">
        <Sidebar />
        {/* Main content - responsive margin */}
        <div className="lg:ml-64 transition-[margin] duration-300">
          <Header />
          <main className="p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </MobileMenuProvider>
  );
}
