export type AgentType = 'scout' | 'brain' | 'action' | 'voice';
export type AgentStatus = 'running' | 'completed' | 'waiting' | 'idle';

export interface AgentActivity {
  id: string;
  timestamp: string;
  agentType: AgentType;
  agentName: string;
  action: string;
  target?: string;
  status: AgentStatus;
  result?: string;
  duration?: number; // milliseconds
}

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  currentTask?: string;
  tasksCompleted: number;
  successRate: number;
  avgResponseTime: number; // milliseconds
  lastActive: string;
}

export interface SwarmStatus {
  type: AgentType;
  name: string;
  description: string;
  activeAgents: number;
  totalAgents: number;
  tasksInQueue: number;
  tasksCompleted: number;
  status: 'active' | 'idle' | 'processing';
}

// 정찰 스웜 (Scout Swarm) 에이전트들
export const scoutAgents: Agent[] = [
  {
    id: "scout-001",
    name: "탐색 에이전트 #1",
    type: "scout",
    status: "running",
    currentTask: "나라장터 신규 공고 스캔 중...",
    tasksCompleted: 847,
    successRate: 99.2,
    avgResponseTime: 1250,
    lastActive: new Date().toISOString()
  },
  {
    id: "scout-002",
    name: "탐색 에이전트 #2",
    type: "scout",
    status: "running",
    currentTask: "학교시설기관 공고 모니터링",
    tasksCompleted: 623,
    successRate: 98.7,
    avgResponseTime: 1180,
    lastActive: new Date().toISOString()
  },
  {
    id: "scout-003",
    name: "매칭 에이전트 #1",
    type: "scout",
    status: "running",
    currentTask: "신규 공고 기업 DNA 매칭 분석",
    tasksCompleted: 1256,
    successRate: 94.5,
    avgResponseTime: 2340,
    lastActive: new Date().toISOString()
  },
  {
    id: "scout-004",
    name: "알림 에이전트",
    type: "scout",
    status: "waiting",
    currentTask: undefined,
    tasksCompleted: 2341,
    successRate: 100,
    avgResponseTime: 150,
    lastActive: new Date(Date.now() - 300000).toISOString()
  }
];

// 두뇌 스웜 (Brain Swarm) 에이전트들
export const brainAgents: Agent[] = [
  {
    id: "brain-001",
    name: "분석 에이전트 #1",
    type: "brain",
    status: "running",
    currentTask: "행정안전부 공고 경쟁사 분석 중",
    tasksCompleted: 456,
    successRate: 96.8,
    avgResponseTime: 8500,
    lastActive: new Date().toISOString()
  },
  {
    id: "brain-002",
    name: "시뮬레이션 에이전트",
    type: "brain",
    status: "running",
    currentTask: "Monte Carlo 시뮬레이션 실행 (3,847/10,000)",
    tasksCompleted: 234,
    successRate: 97.2,
    avgResponseTime: 15000,
    lastActive: new Date().toISOString()
  },
  {
    id: "brain-003",
    name: "전략 에이전트",
    type: "brain",
    status: "waiting",
    tasksCompleted: 189,
    successRate: 95.3,
    avgResponseTime: 12000,
    lastActive: new Date(Date.now() - 120000).toISOString()
  },
  {
    id: "brain-004",
    name: "GraphRAG 에이전트",
    type: "brain",
    status: "running",
    currentTask: "국가계약법 관련 조항 분석 중",
    tasksCompleted: 892,
    successRate: 99.1,
    avgResponseTime: 3200,
    lastActive: new Date().toISOString()
  }
];

// 실행 스웜 (Action Swarm) 에이전트들
export const actionAgents: Agent[] = [
  {
    id: "action-001",
    name: "작성 에이전트 #1",
    type: "action",
    status: "running",
    currentTask: "기술제안서 '사업이해 및 추진전략' 섹션 작성",
    tasksCompleted: 127,
    successRate: 93.7,
    avgResponseTime: 45000,
    lastActive: new Date().toISOString()
  },
  {
    id: "action-002",
    name: "검증 에이전트",
    type: "action",
    status: "running",
    currentTask: "참가자격 요건 검증 (3/5 항목 완료)",
    tasksCompleted: 567,
    successRate: 99.8,
    avgResponseTime: 5600,
    lastActive: new Date().toISOString()
  },
  {
    id: "action-003",
    name: "제출 에이전트",
    type: "action",
    status: "idle",
    tasksCompleted: 89,
    successRate: 100,
    avgResponseTime: 120000,
    lastActive: new Date(Date.now() - 3600000).toISOString()
  }
];

// 음성 에이전트
export const voiceAgents: Agent[] = [
  {
    id: "voice-001",
    name: "음성 상담 에이전트",
    type: "voice",
    status: "idle",
    tasksCompleted: 342,
    successRate: 97.6,
    avgResponseTime: 450,
    lastActive: new Date(Date.now() - 1800000).toISOString()
  }
];

// 스웜 현황
export const swarmStatuses: SwarmStatus[] = [
  {
    type: "scout",
    name: "정찰 스웜",
    description: "24시간 입찰 기회 탐색",
    activeAgents: 3,
    totalAgents: 4,
    tasksInQueue: 12,
    tasksCompleted: 5067,
    status: "active"
  },
  {
    type: "brain",
    name: "두뇌 스웜",
    description: "최적 전략 수립 및 분석",
    activeAgents: 3,
    totalAgents: 4,
    tasksInQueue: 5,
    tasksCompleted: 1771,
    status: "processing"
  },
  {
    type: "action",
    name: "실행 스웜",
    description: "제안서 작성 및 검증",
    activeAgents: 2,
    totalAgents: 3,
    tasksInQueue: 2,
    tasksCompleted: 783,
    status: "active"
  }
];

// 실시간 활동 로그 생성을 위한 템플릿
export const activityTemplates = {
  scout: [
    { action: "나라장터 신규 공고 스캔 완료", result: "신규 공고 {count}건 발견" },
    { action: "입찰공고 상세 정보 수집 중", result: "첨부파일 {count}개 분석 완료" },
    { action: "기업 DNA와 공고 매칭 분석", result: "매칭 점수 {score}점" },
    { action: "경쟁사 입찰 동향 모니터링", result: "예상 경쟁사 {count}개 식별" },
    { action: "마감 임박 공고 알림 발송", result: "긴급 알림 전송 완료" },
    { action: "학교시설기관 공고 스캔", result: "교육 분야 공고 {count}건 발견" },
    { action: "해외 조달시장 모니터링", result: "UNGM 신규 공고 {count}건" }
  ],
  brain: [
    { action: "과거 낙찰 데이터 분석 중", result: "유사 사례 {count}건 분석 완료" },
    { action: "Monte Carlo 시뮬레이션 실행", result: "최적 가격 {price}원 도출" },
    { action: "경쟁사 분석 리포트 생성", result: "분석 리포트 생성 완료" },
    { action: "국가계약법령 조항 검토", result: "관련 조항 {count}개 매핑" },
    { action: "평가 기준 분석", result: "기술점수 예상 {score}점" },
    { action: "리스크 요인 분석", result: "리스크 레벨: {level}" },
    { action: "최적 입찰 전략 수립", result: "전략 리포트 생성 완료" }
  ],
  action: [
    { action: "제안요청서(RFP) 분석", result: "핵심 요구사항 {count}개 추출" },
    { action: "기술제안서 초안 작성 중", result: "{section} 섹션 작성 완료" },
    { action: "참가자격 요건 검증", result: "{passed}/{total} 항목 충족" },
    { action: "첨부 서류 자동 수집", result: "필수 서류 {count}개 준비 완료" },
    { action: "제안서 품질 검증", result: "품질 점수 {score}점" },
    { action: "최종 검토 체크리스트 확인", result: "{passed}/{total} 항목 통과" }
  ],
  voice: [
    { action: "음성 명령 처리", result: "사용자 요청 처리 완료" },
    { action: "입찰 현황 브리핑 준비", result: "음성 브리핑 생성 완료" },
    { action: "상담 내용 요약 생성", result: "상담 요약 리포트 저장" }
  ]
};

// 최근 활동 로그 (초기 데이터)
export const recentActivities: AgentActivity[] = [
  {
    id: "act-001",
    timestamp: new Date(Date.now() - 5000).toISOString(),
    agentType: "scout",
    agentName: "탐색 에이전트 #1",
    action: "나라장터 신규 공고 스캔 완료",
    status: "completed",
    result: "신규 공고 23건 발견",
    duration: 1250
  },
  {
    id: "act-002",
    timestamp: new Date(Date.now() - 12000).toISOString(),
    agentType: "brain",
    agentName: "분석 에이전트 #1",
    action: "경쟁사 분석 리포트 생성",
    target: "차세대 전자정부 통합플랫폼 구축",
    status: "completed",
    result: "분석 리포트 생성 완료",
    duration: 8500
  },
  {
    id: "act-003",
    timestamp: new Date(Date.now() - 20000).toISOString(),
    agentType: "action",
    agentName: "작성 에이전트 #1",
    action: "기술제안서 초안 작성 중",
    target: "AI 기반 공공데이터 분석 플랫폼",
    status: "running",
    duration: 45000
  },
  {
    id: "act-004",
    timestamp: new Date(Date.now() - 35000).toISOString(),
    agentType: "scout",
    agentName: "매칭 에이전트 #1",
    action: "기업 DNA와 공고 매칭 분석",
    target: "클라우드 네이티브 전환 컨설팅",
    status: "completed",
    result: "매칭 점수 97점",
    duration: 2340
  },
  {
    id: "act-005",
    timestamp: new Date(Date.now() - 48000).toISOString(),
    agentType: "brain",
    agentName: "GraphRAG 에이전트",
    action: "국가계약법령 조항 검토",
    status: "completed",
    result: "관련 조항 15개 매핑",
    duration: 3200
  },
  {
    id: "act-006",
    timestamp: new Date(Date.now() - 60000).toISOString(),
    agentType: "action",
    agentName: "검증 에이전트",
    action: "참가자격 요건 검증",
    target: "조달청 클라우드 전환 사업",
    status: "completed",
    result: "5/5 항목 충족",
    duration: 5600
  },
  {
    id: "act-007",
    timestamp: new Date(Date.now() - 75000).toISOString(),
    agentType: "brain",
    agentName: "시뮬레이션 에이전트",
    action: "Monte Carlo 시뮬레이션 완료",
    target: "행정안전부 전자정부 사업",
    status: "completed",
    result: "최적 가격 13.8억원 도출",
    duration: 15000
  },
  {
    id: "act-008",
    timestamp: new Date(Date.now() - 90000).toISOString(),
    agentType: "scout",
    agentName: "알림 에이전트",
    action: "마감 임박 공고 알림 발송",
    status: "completed",
    result: "긴급 알림 3건 전송 완료",
    duration: 150
  }
];

// 에이전트 색상 매핑
export const agentColors: Record<AgentType, string> = {
  scout: "#00D2FF",
  brain: "#A855F7",
  action: "#22C55E",
  voice: "#F59E0B"
};

// 에이전트 아이콘 매핑 (Lucide icon names)
export const agentIcons: Record<AgentType, string> = {
  scout: "Radar",
  brain: "Brain",
  action: "Zap",
  voice: "Mic"
};
