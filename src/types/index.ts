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
  success?: boolean;
}

export interface ChatApiResponse {
  message: string;
  conversationId?: string;
  timestamp?: string;
}

export interface ChatApiRequest {
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  conversationId?: string;
}

// API Error Types
export type ApiErrorCode =
  | "RATE_LIMITED"
  | "API_ERROR"
  | "NETWORK_ERROR"
  | "INVALID_REQUEST"
  | "SERVER_ERROR"
  | "UNAUTHORIZED"
  | "NOT_FOUND";

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  userMessage: string;
  retryable?: boolean;
}

// Bid API Types
export interface BidListResponse {
  bids: Bid[];
  total: number;
  page: number;
  pageSize: number;
}

export interface BidDetailResponse {
  bid: Bid;
  relatedBids?: Bid[];
}

// Simulation API Types
export interface SimulationRequest {
  bidId: string;
  proposedPrice: number;
  techScore: number;
  iterations?: number;
}

export interface SimulationResponse {
  bidId: string;
  scenarios: SimulationScenario[];
  recommendation: SimulationRecommendation;
  completedAt: string;
}

// Proposal API Types
export interface ProposalGenerateRequest {
  bidId: string;
  companyId?: string;
  options?: {
    focusAreas?: string[];
    tone?: "formal" | "technical" | "persuasive";
  };
}

export interface ProposalGenerateResponse {
  proposalId: string;
  status: ProposalStatus;
  progress: number;
  sections: ProposalSection[];
}

// Agent API Types
export interface AgentStatusResponse {
  agents: Agent[];
  swarmStatus: SwarmStatus[];
  totalTasks: number;
  activeAgents: number;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  ariaLabel: string;
}

// ============================================
// Component Props Interfaces
// ============================================

// Bid Card Props
export interface BidCardProps {
  bid: Bid & {
    closeDateTime?: string;
    bidNtceDt?: string;
    publishDate?: string;
    description?: string;
    riskLevel?: "low" | "medium" | "high";
  };
  className?: string;
  onClick?: () => void;
}

// Swarm Card Props
export interface SwarmCardProps {
  swarm: SwarmStatus;
  className?: string;
}

// Activity Item Props
export interface ActivityItemProps {
  activity: AgentActivity;
  showTimestamp?: boolean;
  className?: string;
}

// Agent Card Props
export interface AgentCardProps {
  agent: Agent;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

// Swarm Section Props
export interface SwarmSectionProps {
  type: AgentType;
  agents: Agent[];
  title: string;
  description: string;
  className?: string;
}

// Stats Card Props
export interface StatsCardProps {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  value: string | number;
  label: string;
  className?: string;
}

// Filter Button Props
export interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  activeColor?: string;
  className?: string;
}

// Loading Skeleton Props
export interface SkeletonProps {
  className?: string;
  count?: number;
}

// Badge Props Extension
export interface StatusBadgeProps {
  status: BidStatus | AgentStatus | "active" | "idle" | "processing";
  label?: string;
  className?: string;
}

// Modal Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// Search Input Props
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
}
