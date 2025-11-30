"use client";

import { motion } from "framer-motion";
import {
  Radar,
  Brain,
  Zap,
  Mic,
  Network,
  Search,
  BarChart3,
  FileText,
  CheckCircle,
  Phone,
  Globe,
  Shield,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const features = [
  {
    id: "scout",
    title: "정찰 스웜 (Scout Swarm)",
    subtitle: "24시간 입찰 기회 탐색",
    description: "AI가 밤새도록 당신을 위해 입찰 기회를 찾습니다",
    color: "#00D2FF",
    icon: Radar,
    capabilities: [
      { icon: Search, text: "나라장터 + 25개 기관 실시간 모니터링" },
      { icon: BarChart3, text: "기업 DNA 분석 → 자동 매칭 (0-100점)" },
      { icon: Globe, text: "해외 조달시장 스캔 (UNGM, SAM.gov)" },
    ],
    link: "/dashboard/bids"
  },
  {
    id: "brain",
    title: "두뇌 스웜 (Brain Swarm)",
    subtitle: "최적 전략 수립 및 분석",
    description: "수천 개의 과거 입찰을 학습한 AI가 최적 전략을 설계합니다",
    color: "#A855F7",
    icon: Brain,
    capabilities: [
      { icon: BarChart3, text: "디지털 트윈으로 10,000회 시뮬레이션" },
      { icon: Network, text: "GraphRAG 기반 조달법령 즉시 해석" },
      { icon: Shield, text: "경쟁사 분석 및 낙찰 확률 예측 (91%+)" },
    ],
    link: "/dashboard/simulation"
  },
  {
    id: "action",
    title: "실행 스웜 (Action Swarm)",
    subtitle: "제안서 작성 및 자동화",
    description: "AI가 직접 서류를 작성하고, 검증하고, 제출합니다",
    color: "#22C55E",
    icon: Zap,
    capabilities: [
      { icon: FileText, text: "RFP 분석 → 기술제안서 3시간 내 초안" },
      { icon: CheckCircle, text: "참가자격/결격사유 100% 사전 검증" },
      { icon: Shield, text: "Human-in-the-Loop: 최종 제출 전 승인" },
    ],
    link: "/dashboard/proposals"
  },
  {
    id: "voice",
    title: "AI 음성 에이전트",
    subtitle: "전화 한 통으로 모든 조달 업무",
    description: "복잡한 웹사이트 대신, 전화로 입찰 업무를 처리합니다",
    color: "#F59E0B",
    icon: Mic,
    capabilities: [
      { icon: Phone, text: "500ms 이하 응답, 자연스러운 대화" },
      { icon: Globe, text: "30개국 다국어 지원" },
      { icon: CheckCircle, text: "24시간 무중단 운영" },
    ],
    link: "/dashboard/voice"
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group relative p-6 bg-[#1E293B]/80 border-[#334155] hover:border-opacity-50 transition-all duration-300 h-full"
        style={{
          borderColor: `${feature.color}30`,
          boxShadow: `0 0 0 0 ${feature.color}00`
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${feature.color}10, transparent 70%)`
          }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: `${feature.color}20` }}
          >
            <Icon className="w-7 h-7" style={{ color: feature.color }} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
          <p className="text-sm mb-3" style={{ color: feature.color }}>{feature.subtitle}</p>
          <p className="text-[#94A3B8] mb-6">{feature.description}</p>

          {/* Capabilities */}
          <ul className="space-y-3 mb-6">
            {feature.capabilities.map((cap, i) => {
              const CapIcon = cap.icon;
              return (
                <li key={i} className="flex items-start gap-3">
                  <CapIcon className="w-5 h-5 text-[#64748B] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#94A3B8]">{cap.text}</span>
                </li>
              );
            })}
          </ul>

          {/* Link */}
          <Link
            href={feature.link}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: feature.color }}
          >
            체험하기
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

export function Features() {
  return (
    <section className="py-24 bg-[#0F172A]">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            5가지 혁신 기능
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            자연계의 군집 지능(Swarm Intelligence)에서 영감을 받아,
            <br />
            수십 개의 전문 AI 에이전트가 조달 전 과정을 자동화합니다.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* MCP Integration callout */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#1E293B] to-[#0F172A] border border-[#334155]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
                <Network className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">MCP 기반 만물 연결</h3>
                <p className="text-[#94A3B8]">
                  나라장터, 국세청, 특허정보원, 신용평가기관 등 모든 시스템이 하나로 연결됩니다
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {["나라장터 G2B", "국세청", "특허정보원", "NICE", "공공데이터포털"].map((name) => (
                <span
                  key={name}
                  className="px-4 py-2 rounded-full bg-[#334155] text-sm text-[#94A3B8] border border-[#475569]"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
