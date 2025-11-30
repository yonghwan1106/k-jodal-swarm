"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Radar, Brain, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";

// Animated node for swarm visualization
function SwarmNode({
  delay,
  x,
  y,
  color
}: {
  delay: number;
  x: number;
  y: number;
  color: string;
}) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Connection line between nodes
function ConnectionLine({
  x1, y1, x2, y2, color, delay
}: {
  x1: number; y1: number; x2: number; y2: number; color: string; delay: number;
}) {
  return (
    <motion.line
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke={color}
      strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: [0, 1, 0],
        opacity: [0.1, 0.5, 0.1]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Node positions for swarm visualization
  const nodes = [
    { x: 20, y: 30, color: "#00D2FF", delay: 0 },
    { x: 35, y: 20, color: "#00D2FF", delay: 0.5 },
    { x: 45, y: 40, color: "#A855F7", delay: 1 },
    { x: 60, y: 25, color: "#A855F7", delay: 1.5 },
    { x: 75, y: 35, color: "#22C55E", delay: 2 },
    { x: 80, y: 50, color: "#22C55E", delay: 2.5 },
    { x: 30, y: 55, color: "#00D2FF", delay: 0.8 },
    { x: 50, y: 60, color: "#A855F7", delay: 1.3 },
    { x: 65, y: 55, color: "#22C55E", delay: 1.8 },
    { x: 25, y: 45, color: "#00D2FF", delay: 0.3 },
    { x: 55, y: 30, color: "#A855F7", delay: 1.1 },
    { x: 70, y: 45, color: "#22C55E", delay: 2.2 },
  ];

  const connections = [
    { x1: 20, y1: 30, x2: 35, y2: 20, color: "#00D2FF", delay: 0.2 },
    { x1: 35, y1: 20, x2: 45, y2: 40, color: "#00D2FF", delay: 0.7 },
    { x1: 45, y1: 40, x2: 60, y2: 25, color: "#A855F7", delay: 1.2 },
    { x1: 60, y1: 25, x2: 75, y2: 35, color: "#A855F7", delay: 1.7 },
    { x1: 75, y1: 35, x2: 80, y2: 50, color: "#22C55E", delay: 2.2 },
    { x1: 30, y1: 55, x2: 50, y2: 60, color: "#00D2FF", delay: 0.9 },
    { x1: 50, y1: 60, x2: 65, y2: 55, color: "#A855F7", delay: 1.4 },
    { x1: 25, y1: 45, x2: 45, y2: 40, color: "#00D2FF", delay: 0.5 },
    { x1: 55, y1: 30, x2: 70, y2: 45, color: "#A855F7", delay: 1.6 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Swarm visualization */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            {connections.map((conn, i) => (
              <ConnectionLine key={i} {...conn} />
            ))}
          </svg>
          {nodes.map((node, i) => (
            <SwarmNode key={i} {...node} />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B]/80 border border-[#3B82F6]/30 mb-8">
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm text-[#94A3B8]">2025 조달청 홍보 아이디어 공모전</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">K-조달 </span>
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#A855F7] to-[#22C55E] bg-clip-text text-transparent">
              AI 스웜
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[#94A3B8] mb-4 max-w-3xl mx-auto">
            자율 AI 에이전트 군집이 이끄는 차세대 공공조달 생태계
          </p>
          <p className="text-lg text-[#64748B] mb-12 max-w-2xl mx-auto">
            중소기업에게 대기업 수준의 조달 전문팀을 제공합니다.
            <br />24시간 자율적으로 협업하는 AI 스웜이 입찰의 모든 과정을 지원합니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl"
              >
                데모 시작하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-[#334155] text-white hover:bg-[#1E293B] px-8 py-6 text-lg rounded-xl"
              >
                상세 소개 보기
              </Button>
            </Link>
          </div>

          {/* Swarm indicators */}
          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#1E293B]/60 border border-[#00D2FF]/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-3 h-3 rounded-full bg-[#00D2FF] animate-pulse" />
              <Radar className="w-5 h-5 text-[#00D2FF]" />
              <span className="text-[#00D2FF] font-medium">정찰 스웜</span>
              <span className="text-[#64748B] text-sm">4개 활성</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#1E293B]/60 border border-[#A855F7]/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-3 h-3 rounded-full bg-[#A855F7] animate-pulse" />
              <Brain className="w-5 h-5 text-[#A855F7]" />
              <span className="text-[#A855F7] font-medium">두뇌 스웜</span>
              <span className="text-[#64748B] text-sm">4개 활성</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#1E293B]/60 border border-[#22C55E]/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="w-3 h-3 rounded-full bg-[#22C55E] animate-pulse" />
              <Zap className="w-5 h-5 text-[#22C55E]" />
              <span className="text-[#22C55E] font-medium">실행 스웜</span>
              <span className="text-[#64748B] text-sm">3개 활성</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Live status indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Activity className="w-4 h-4 text-[#22C55E] animate-pulse" />
          <span className="text-[#64748B] text-sm">실시간 AI 에이전트 활동 중</span>
        </motion.div>
      </div>
    </section>
  );
}
