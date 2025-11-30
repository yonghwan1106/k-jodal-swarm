"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Radar,
  Brain,
  Zap,
  Mic,
  ArrowRight,
  Target,
  Shield,
  Sparkles,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Lightbulb,
  Rocket,
  Award,
  FileText,
  BarChart3,
  MessageSquare,
  Network,
  Database,
  Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const swarmFeatures = [
  {
    icon: Radar,
    title: "Scout Swarm (정찰 스웜)",
    color: "#00D2FF",
    description: "24시간 입찰 기회 탐색",
    details: [
      "나라장터, 학교장터 등 실시간 모니터링",
      "기업 DNA 기반 자동 매칭",
      "적합도 점수 산출 및 알림",
      "마감 임박 공고 긴급 알림"
    ]
  },
  {
    icon: Brain,
    title: "Brain Swarm (두뇌 스웜)",
    color: "#A855F7",
    description: "전략적 분석 및 시뮬레이션",
    details: [
      "Monte Carlo 기반 낙찰 확률 예측",
      "경쟁사 패턴 분석 및 가격 예측",
      "GraphRAG 기반 법령 검토",
      "리스크 요인 자동 도출"
    ]
  },
  {
    icon: Zap,
    title: "Action Swarm (실행 스웜)",
    color: "#22C55E",
    description: "제안서 자동 작성 및 검증",
    details: [
      "RFP 분석 후 맞춤형 제안서 생성",
      "참가자격 요건 자동 검증",
      "기술점수 예측 및 최적화",
      "Human-in-the-Loop 승인 체계"
    ]
  },
  {
    icon: Mic,
    title: "Voice Agent (음성 에이전트)",
    color: "#F59E0B",
    description: "자연어 음성 상담 서비스",
    details: [
      "500ms 이하 초고속 응답",
      "30개국 다국어 지원",
      "컨텍스트 유지 대화",
      "24시간 연중무휴 상담"
    ]
  }
];

const techStack = [
  { name: "Claude 4.0", description: "최신 AI 언어모델" },
  { name: "MCP", description: "Model Context Protocol" },
  { name: "GraphRAG", description: "지식 그래프 검색" },
  { name: "Monte Carlo", description: "확률적 시뮬레이션" },
  { name: "Digital Twin", description: "가상 입찰 환경" },
  { name: "Voice AI", description: "실시간 음성 인식" }
];

const benefits = [
  { icon: Clock, title: "시간 절감", value: "70%", description: "입찰 준비 시간 단축" },
  { icon: TrendingUp, title: "낙찰률 향상", value: "23%", description: "AI 분석 기반 전략" },
  { icon: Target, title: "매칭 정확도", value: "94%", description: "기업-공고 적합도" },
  { icon: Shield, title: "리스크 감소", value: "85%", description: "자격 미달 사전 방지" }
];

const timeline = [
  { phase: "1단계", title: "MVP 개발", period: "2025 Q1-Q2", items: ["Scout Swarm 구축", "기본 매칭 알고리즘", "대시보드 UI"] },
  { phase: "2단계", title: "고도화", period: "2025 Q3-Q4", items: ["Brain Swarm 통합", "Monte Carlo 시뮬레이션", "제안서 자동 생성"] },
  { phase: "3단계", title: "확장", period: "2026 Q1-Q2", items: ["Voice Agent 출시", "다국어 지원", "API 개방"] }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1120]/80 backdrop-blur-lg border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">K-조달 AI 스웜</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-[#94A3B8] hover:text-white transition-colors">
              홈
            </Link>
            <Link href="/about" className="text-white font-medium">
              프로젝트 소개
            </Link>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">
                데모 체험하기
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#3B82F6]/20 text-[#3B82F6] mb-6">
              <Award className="w-3 h-3 mr-1" />
              2025 조달청 홍보 아이디어 공모전 출품작
            </Badge>
            <h1 className="text-5xl font-bold text-white mb-6">
              K-조달 AI 스웜
            </h1>
            <p className="text-xl text-[#94A3B8] max-w-3xl mx-auto mb-4">
              <span className="text-[#3B82F6] font-semibold">AI 에이전트 군집</span>이
              공공조달 전 과정을 혁신합니다
            </p>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              정찰(Scout) → 분석(Brain) → 실행(Action) → 상담(Voice)<br />
              4개의 전문화된 AI 스웜이 유기적으로 협력하여<br />
              중소기업의 공공조달 진입장벽을 획기적으로 낮춥니다
            </p>
          </motion.div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 bg-[#1E293B]/60 border-[#334155] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">문제점</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    "나라장터 하루 평균 3,000건 이상의 공고 발생",
                    "적합 공고 탐색에 평균 2-3시간 소요",
                    "제안서 작성에 평균 2주 이상 소요",
                    "중소기업의 조달시장 진입장벽 높음",
                    "낙찰 확률 예측 어려움 → 비효율적 입찰"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                        <span className="text-red-400 text-xs">!</span>
                      </div>
                      <span className="text-[#94A3B8]">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8 bg-gradient-to-br from-[#1E293B]/60 to-[#3B82F6]/10 border-[#3B82F6]/30 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">솔루션</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    "AI가 24시간 자동으로 적합 공고 탐색 및 알림",
                    "기업 DNA 기반 맞춤형 매칭 (정확도 94%)",
                    "제안서 자동 생성으로 작성 시간 70% 단축",
                    "Monte Carlo 시뮬레이션으로 낙찰 확률 예측",
                    "음성 AI로 언제 어디서나 조달 상담 가능"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                      <span className="text-[#94A3B8]">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Swarm Features */}
      <section className="py-20 px-6 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">4개의 전문화된 AI 스웜</h2>
            <p className="text-[#64748B]">각 스웜은 특화된 역할을 수행하며 유기적으로 협력합니다</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {swarmFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-[#1E293B]/60 border-[#334155] hover:border-opacity-70 transition-all h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                      <p className="text-sm" style={{ color: feature.color }}>{feature.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: feature.color }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">기대 효과</h2>
            <p className="text-[#64748B]">K-조달 AI 스웜이 가져올 변화</p>
          </motion.div>

          <div className="grid grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-[#1E293B]/60 border-[#334155] text-center">
                  <div className="w-14 h-14 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-[#3B82F6]" />
                  </div>
                  <p className="text-4xl font-bold text-white mb-2">{benefit.value}</p>
                  <p className="text-lg font-medium text-[#3B82F6] mb-1">{benefit.title}</p>
                  <p className="text-sm text-[#64748B]">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">핵심 기술</h2>
            <p className="text-[#64748B]">최신 AI 기술의 융합</p>
          </motion.div>

          <div className="grid grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4 bg-[#1E293B]/60 border-[#334155] text-center hover:border-[#3B82F6]/50 transition-all">
                  <p className="font-bold text-white mb-1">{tech.name}</p>
                  <p className="text-xs text-[#64748B]">{tech.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">시스템 아키텍처</h2>
            <p className="text-[#64748B]">AI 에이전트 협업 구조</p>
          </motion.div>

          <Card className="p-8 bg-[#1E293B]/60 border-[#334155]">
            <div className="flex items-center justify-center gap-8">
              {/* User */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#64748B]/20 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-10 h-10 text-[#64748B]" />
                </div>
                <p className="text-sm text-[#94A3B8]">사용자</p>
              </div>

              <ArrowRight className="w-8 h-8 text-[#334155]" />

              {/* Voice Agent */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mx-auto mb-2">
                  <Mic className="w-10 h-10 text-[#F59E0B]" />
                </div>
                <p className="text-sm text-[#F59E0B]">Voice Agent</p>
              </div>

              <ArrowRight className="w-8 h-8 text-[#334155]" />

              {/* Swarm Orchestrator */}
              <div className="text-center">
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-2 border border-[#3B82F6]/30">
                  <Bot className="w-12 h-12 text-[#3B82F6]" />
                </div>
                <p className="text-sm text-[#3B82F6] font-medium">AI Orchestrator</p>
              </div>

              <ArrowRight className="w-8 h-8 text-[#334155]" />

              {/* Swarms */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#00D2FF]/20 flex items-center justify-center">
                    <Radar className="w-5 h-5 text-[#00D2FF]" />
                  </div>
                  <span className="text-sm text-[#00D2FF]">Scout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#A855F7]/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-[#A855F7]" />
                  </div>
                  <span className="text-sm text-[#A855F7]">Brain</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#22C55E]/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <span className="text-sm text-[#22C55E]">Action</span>
                </div>
              </div>

              <ArrowRight className="w-8 h-8 text-[#334155]" />

              {/* Data Sources */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-2">
                  <Database className="w-10 h-10 text-[#22C55E]" />
                </div>
                <p className="text-sm text-[#94A3B8]">나라장터/법령DB</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-6 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">추진 로드맵</h2>
            <p className="text-[#64748B]">단계별 개발 및 확장 계획</p>
          </motion.div>

          <div className="grid grid-cols-3 gap-6">
            {timeline.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-[#1E293B]/60 border-[#334155] h-full">
                  <Badge className="bg-[#3B82F6]/20 text-[#3B82F6] mb-4">{phase.phase}</Badge>
                  <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
                  <p className="text-sm text-[#64748B] mb-4">{phase.period}</p>
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                        <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-16 h-16 text-[#3B82F6] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              지금 바로 체험해보세요
            </h2>
            <p className="text-[#94A3B8] mb-8">
              K-조달 AI 스웜의 모든 기능을 직접 경험해보실 수 있습니다
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-8">
                  대시보드 체험하기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard/voice">
                <Button size="lg" variant="outline" className="border-[#334155] text-white hover:bg-[#1E293B] px-8">
                  <Mic className="w-5 h-5 mr-2" />
                  AI 음성 상담 체험
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#64748B] text-sm">
            2025 조달청 홍보 아이디어 공모전 출품작 | K-조달 AI 스웜
          </p>
        </div>
      </footer>
    </div>
  );
}
