"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Clock, Target, Users, Building2, Globe } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  delay: number;
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function StatCard({ icon: Icon, value, suffix, label, description, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative p-6 rounded-2xl bg-[#1E293B]/60 border border-[#334155] group hover:border-opacity-50 transition-all"
      style={{ borderColor: `${color}30` }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 100%, ${color}10, transparent 70%)` }}
      />

      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>

        <div className="text-4xl font-bold text-white mb-2">
          <AnimatedCounter target={value} suffix={suffix} />
        </div>

        <div className="text-lg font-medium text-white mb-1">{label}</div>
        <div className="text-sm text-[#64748B]">{description}</div>
      </div>
    </motion.div>
  );
}

const stats = [
  {
    icon: Clock,
    value: 80,
    suffix: "%",
    label: "시간 절감",
    description: "제안서 작성 2주 → 3시간",
    color: "#00D2FF"
  },
  {
    icon: TrendingUp,
    value: 30,
    suffix: "%",
    label: "낙찰률 향상",
    description: "데이터 기반 최적 전략",
    color: "#A855F7"
  },
  {
    icon: Target,
    value: 91,
    suffix: "%",
    label: "예측 정확도",
    description: "디지털 트윈 시뮬레이션",
    color: "#22C55E"
  },
  {
    icon: Users,
    value: 50,
    suffix: "%",
    label: "참여율 증가",
    description: "중소기업 공공조달 참여",
    color: "#F59E0B"
  },
  {
    icon: Building2,
    value: 5000,
    suffix: "만원",
    label: "연간 절감",
    description: "조달 전문인력 대체 효과",
    color: "#3B82F6"
  },
  {
    icon: Globe,
    value: 30,
    suffix: "개국",
    label: "다국어 지원",
    description: "글로벌 조달시장 진출 지원",
    color: "#06B6D4"
  }
];

export function Stats() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            기대 효과
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            K-조달 AI 스웜은 중소기업, 조달청, 국가 경제 모두에게 혁신적인 가치를 제공합니다
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Before/After comparison */}
        <motion.div
          className="mt-16 overflow-hidden rounded-2xl border border-[#334155]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Before */}
            <div className="p-8 bg-[#1E293B]/80">
              <div className="text-sm font-medium text-[#EF4444] mb-4">BEFORE - 현재</div>
              <ul className="space-y-4">
                {[
                  "수동 검색, 키워드 기반 공고 탐색",
                  "법률 전문가 없이 규정 해석 어려움",
                  "제안서 작성 2-4주 소요",
                  "자격 누락 시 입찰 무효",
                  "경험 기반의 주먹구구식 가격 결정",
                  "복잡한 웹사이트 탐색 필요"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#EF4444]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    </span>
                    <span className="text-[#94A3B8]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="p-8 bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
              <div className="text-sm font-medium text-[#22C55E] mb-4">AFTER - K-조달 AI 스웜</div>
              <ul className="space-y-4">
                {[
                  "AI 스웜 24시간 자동 기회 탐색",
                  "GraphRAG로 실시간 규정 해석/적용",
                  "3시간 내 AI 제안서 초안 완성",
                  "AI 사전검증으로 100% 적격",
                  "디지털 트윈 시뮬레이션 91%+ 정확도",
                  "전화 한 통으로 모든 업무 처리"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#22C55E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    </span>
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
