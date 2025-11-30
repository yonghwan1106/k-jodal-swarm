// Swarm configuration constants
// Single source of truth for swarm status across the application

export const SWARM_STATUS = {
  scout: {
    name: "정찰 스웜",
    nameEn: "Scout Swarm",
    color: "#00D2FF",
    activeCount: 4,
    description: "나라장터 실시간 모니터링",
  },
  brain: {
    name: "두뇌 스웜",
    nameEn: "Brain Swarm",
    color: "#A855F7",
    activeCount: 4,
    description: "AI 분석 및 전략 수립",
  },
  action: {
    name: "실행 스웜",
    nameEn: "Action Swarm",
    color: "#22C55E",
    activeCount: 3,
    description: "자동 문서 작성 및 제출",
  },
} as const;

export type SwarmType = keyof typeof SWARM_STATUS;

// Status colors for various UI elements
export const STATUS_COLORS = {
  active: { bg: "bg-[#22C55E]/20", text: "text-[#22C55E]", hex: "#22C55E" },
  pending: { bg: "bg-[#F59E0B]/20", text: "text-[#F59E0B]", hex: "#F59E0B" },
  completed: { bg: "bg-[#3B82F6]/20", text: "text-[#3B82F6]", hex: "#3B82F6" },
  error: { bg: "bg-[#EF4444]/20", text: "text-[#EF4444]", hex: "#EF4444" },
  idle: { bg: "bg-[#64748B]/20", text: "text-[#64748B]", hex: "#64748B" },
} as const;

// Priority colors
export const PRIORITY_COLORS = {
  high: { bg: "bg-[#EF4444]/20", text: "text-[#EF4444]" },
  medium: { bg: "bg-[#F59E0B]/20", text: "text-[#F59E0B]" },
  low: { bg: "bg-[#22C55E]/20", text: "text-[#22C55E]" },
} as const;

// Bid type colors
export const BID_TYPE_COLORS = {
  소프트웨어: { bg: "bg-[#3B82F6]/20", text: "text-[#3B82F6]" },
  시스템통합: { bg: "bg-[#8B5CF6]/20", text: "text-[#8B5CF6]" },
  컨설팅: { bg: "bg-[#06B6D4]/20", text: "text-[#06B6D4]" },
  유지보수: { bg: "bg-[#22C55E]/20", text: "text-[#22C55E]" },
  클라우드: { bg: "bg-[#F59E0B]/20", text: "text-[#F59E0B]" },
  default: { bg: "bg-[#64748B]/20", text: "text-[#64748B]" },
} as const;

// Helper function to get total active agents
export function getTotalActiveAgents(): number {
  return Object.values(SWARM_STATUS).reduce(
    (sum, swarm) => sum + swarm.activeCount,
    0
  );
}
