// ============================================
// Common Types for K-조달 AI 스웜
// ============================================

// Agent Types
export type AgentType = "scout" | "brain" | "action" | "voice";
export type AgentStatus = "running" | "waiting" | "idle" | "completed";

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  currentTask?: string;
  tasksCompleted: number;
  successRate: number;
}

export interface AgentActivity {
  id: string;
  timestamp: string;
  agentType: AgentType;
  agentName: string;
  action: string;
  status: AgentStatus;
  target?: string;
  result?: string;
}

export interface SwarmStatus {
  type: AgentType;
  name: string;
  description: string;
  status: "active" | "processing" | "idle";
  activeAgents: number;
  totalAgents: number;
  tasksCompleted: number;
  tasksInQueue: number;
}

// Bid Types
export type BidUrgency = "critical" | "urgent" | "normal";
export type BidStatus = "new" | "analyzing" | "recommended" | "applied";
export type BidCategory =
  | "소프트웨어"
  | "시스템통합"
  | "컨설팅"
  | "유지보수"
  | "클라우드";

export interface Bid {
  id: string;
  title: string;
  agency: string;
  category: BidCategory;
  estimatedPrice: number;
  deadline: string;
  publishedAt: string;
  bidType: string;
  requirements: string[];
  attachments: string[];
  matchScore: number;
  winProbability: number;
  competitors: number;
  status: BidStatus;
  urgency: BidUrgency;
  aiInsights: string[];
}

export interface BidStats {
  todayNew: number;
  recommended: number;
  analyzing: number;
  deadlineSoon: number;
}

// Simulation Types
export interface SimulationScenario {
  name: string;
  proposedPrice: number;
  techScore: number;
  priceScore: number;
  totalScore: number;
  winProbability: number;
  competitorAnalysis: CompetitorAnalysis[];
}

export interface CompetitorAnalysis {
  name: string;
  estimatedScore: number;
}

export interface SimulationResult {
  bidId: string;
  scenarios: SimulationScenario[];
  recommendation: SimulationRecommendation;
}

export interface SimulationRecommendation {
  optimalPrice: number;
  optimalTechFocus: string[];
  expectedWinRate: number;
  reasoning: string;
}

// Company Types
export interface Company {
  id: string;
  name: string;
  ceo: string;
  businessNumber: string;
  established: string;
  employees: number;
  annualRevenue: string;
  mainBusiness: string[];
  certifications: string[];
  techStack: string[];
  creditRating: string;
}

// Proposal Types
export type ProposalStatus = "draft" | "generating" | "review" | "completed";

export interface Proposal {
  id: string;
  bidId: string;
  bidTitle: string;
  status: ProposalStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
  sections: ProposalSection[];
}

export interface ProposalSection {
  name: string;
  status: "pending" | "generating" | "completed";
  progress: number;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  isError?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  code?: string;
}

export interface ChatApiResponse {
  message: string;
}

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  ariaLabel: string;
}
