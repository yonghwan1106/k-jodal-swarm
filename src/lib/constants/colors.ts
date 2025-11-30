// ============================================
// Centralized Color Constants for K-조달 AI 스웜
// ============================================

// Status Colors
export const STATUS_COLORS = {
  active: { bg: "bg-[#22C55E]/20", text: "text-[#22C55E]", hex: "#22C55E" },
  pending: { bg: "bg-[#F59E0B]/20", text: "text-[#F59E0B]", hex: "#F59E0B" },
  completed: { bg: "bg-[#3B82F6]/20", text: "text-[#3B82F6]", hex: "#3B82F6" },
  error: { bg: "bg-[#EF4444]/20", text: "text-[#EF4444]", hex: "#EF4444" },
  idle: { bg: "bg-[#64748B]/20", text: "text-[#64748B]", hex: "#64748B" },
} as const;

// Bid Status Colors
export const BID_STATUS_COLORS = {
  recommended: { bg: "#22C55E20", text: "#22C55E", label: "AI 추천" },
  analyzing: { bg: "#A855F720", text: "#A855F7", label: "분석 중" },
  preparing: { bg: "#3B82F620", text: "#3B82F6", label: "준비 중" },
  new: { bg: "#64748B20", text: "#64748B", label: "신규" },
  applied: { bg: "#22C55E20", text: "#22C55E", label: "지원 완료" },
} as const;

// Urgency Colors
export const URGENCY_COLORS = {
  critical: { bg: "#EF444420", text: "#EF4444", label: "긴급" },
  urgent: { bg: "#F59E0B20", text: "#F59E0B", label: "주의" },
  normal: { bg: "#64748B20", text: "#64748B", label: "보통" },
} as const;

// Risk Level Colors
export const RISK_COLORS = {
  low: { hex: "#22C55E", label: "낮음" },
  medium: { hex: "#F59E0B", label: "중간" },
  high: { hex: "#EF4444", label: "높음" },
} as const;

// Agent Type Colors (matches SWARM_STATUS)
export const AGENT_COLORS = {
  scout: { hex: "#00D2FF", label: "정찰" },
  brain: { hex: "#A855F7", label: "두뇌" },
  action: { hex: "#22C55E", label: "실행" },
  voice: { hex: "#F59E0B", label: "음성" },
} as const;

// Priority Colors
export const PRIORITY_COLORS = {
  high: { bg: "bg-[#EF4444]/20", text: "text-[#EF4444]", hex: "#EF4444" },
  medium: { bg: "bg-[#F59E0B]/20", text: "text-[#F59E0B]", hex: "#F59E0B" },
  low: { bg: "bg-[#22C55E]/20", text: "text-[#22C55E]", hex: "#22C55E" },
} as const;

// Chart Colors
export const CHART_COLORS = [
  "#3B82F6", // Blue
  "#A855F7", // Purple
  "#22C55E", // Green
  "#F59E0B", // Orange
  "#EF4444", // Red
  "#06B6D4", // Cyan
] as const;

// Helper functions
export function getStatusColor(status: keyof typeof STATUS_COLORS) {
  return STATUS_COLORS[status] || STATUS_COLORS.idle;
}

export function getBidStatusColor(status: keyof typeof BID_STATUS_COLORS) {
  return BID_STATUS_COLORS[status] || BID_STATUS_COLORS.new;
}

export function getUrgencyColor(urgency: keyof typeof URGENCY_COLORS) {
  return URGENCY_COLORS[urgency] || URGENCY_COLORS.normal;
}

export function getRiskColor(risk: keyof typeof RISK_COLORS) {
  return RISK_COLORS[risk]?.hex || RISK_COLORS.medium.hex;
}

export function getAgentColor(type: keyof typeof AGENT_COLORS) {
  return AGENT_COLORS[type]?.hex || AGENT_COLORS.scout.hex;
}

export function getPriorityColor(priority: keyof typeof PRIORITY_COLORS) {
  return PRIORITY_COLORS[priority] || PRIORITY_COLORS.medium;
}

// Type exports
export type StatusType = keyof typeof STATUS_COLORS;
export type BidStatusType = keyof typeof BID_STATUS_COLORS;
export type UrgencyType = keyof typeof URGENCY_COLORS;
export type RiskType = keyof typeof RISK_COLORS;
export type AgentType = keyof typeof AGENT_COLORS;
export type PriorityType = keyof typeof PRIORITY_COLORS;
