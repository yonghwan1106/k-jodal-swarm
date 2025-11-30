export interface CompetitorAnalysis {
  name: string;
  estimatedScore: number;
  strengths: string[];
  weaknesses: string[];
  predictedPrice: number;
}

export interface SimulationScenario {
  id: string;
  name: string;
  proposedPrice: number;
  techScore: number;
  priceScore: number;
  totalScore: number;
  winProbability: number;
  rank: number;
  recommendation?: string;
}

export interface SimulationResult {
  bidId: string;
  bidTitle: string;
  simulationCount: number;
  executionTime: number; // milliseconds
  scenarios: SimulationScenario[];
  competitors: CompetitorAnalysis[];
  recommendation: {
    optimalPrice: number;
    optimalTechFocus: string[];
    expectedWinRate: number;
    reasoning: string[];
    riskFactors: string[];
    confidenceLevel: number;
  };
  priceDistribution: {
    min: number;
    max: number;
    median: number;
    recommended: number;
  };
}

// 행정안전부 전자정부 사업 시뮬레이션 결과
export const simulationResults: Record<string, SimulationResult> = {
  "bid-2024-001": {
    bidId: "bid-2024-001",
    bidTitle: "차세대 전자정부 통합플랫폼 구축 사업",
    simulationCount: 10000,
    executionTime: 15234,
    scenarios: [
      {
        id: "scenario-a",
        name: "공격적 가격 전략",
        proposedPrice: 1380000000,
        techScore: 88.5,
        priceScore: 95.2,
        totalScore: 91.2,
        winProbability: 82,
        rank: 1,
        recommendation: "추천"
      },
      {
        id: "scenario-b",
        name: "균형 전략",
        proposedPrice: 1420000000,
        techScore: 88.5,
        priceScore: 91.8,
        totalScore: 89.8,
        winProbability: 75,
        rank: 2
      },
      {
        id: "scenario-c",
        name: "보수적 전략",
        proposedPrice: 1460000000,
        techScore: 88.5,
        priceScore: 88.5,
        totalScore: 88.5,
        winProbability: 65,
        rank: 3
      },
      {
        id: "scenario-d",
        name: "고가 전략",
        proposedPrice: 1485000000,
        techScore: 88.5,
        priceScore: 86.2,
        totalScore: 87.1,
        winProbability: 52,
        rank: 4
      }
    ],
    competitors: [
      {
        name: "A사 (대기업)",
        estimatedScore: 89.5,
        strengths: ["브랜드 인지도", "대규모 인력", "유사 실적 다수"],
        weaknesses: ["높은 단가", "중소기업 가점 미적용"],
        predictedPrice: 1520000000
      },
      {
        name: "B사 (중견기업)",
        estimatedScore: 86.2,
        strengths: ["전자정부 전문성", "안정적 수행 능력"],
        weaknesses: ["기술 혁신성 부족", "AI 역량 제한적"],
        predictedPrice: 1440000000
      },
      {
        name: "C사 (컨소시엄)",
        estimatedScore: 87.8,
        strengths: ["다양한 기술 조합", "가격 경쟁력"],
        weaknesses: ["조직 통합 리스크", "책임 분산"],
        predictedPrice: 1400000000
      },
      {
        name: "D사 (중소기업)",
        estimatedScore: 84.5,
        strengths: ["중소기업 가점", "기술 차별화"],
        weaknesses: ["실적 규모 제한", "리소스 부족"],
        predictedPrice: 1380000000
      }
    ],
    recommendation: {
      optimalPrice: 1380000000,
      optimalTechFocus: [
        "클라우드 네이티브 아키텍처 강조",
        "AI/ML 기반 자동화 솔루션 제시",
        "보안 강화 방안 상세화",
        "운영 효율성 개선 수치 제시"
      ],
      expectedWinRate: 82,
      reasoning: [
        "중소기업 가점(3점)과 결합 시 최적의 경쟁력 확보",
        "기술점수에서 AI/클라우드 역량으로 차별화 가능",
        "행정안전부와의 기존 협력 이력이 신뢰도 향상에 기여",
        "예상 경쟁사 중 가격 경쟁력 상위권 진입"
      ],
      riskFactors: [
        "대기업 A사의 공격적 가격 제안 가능성",
        "기술점수 평가 시 주관적 요소 존재",
        "프로젝트 규모 대비 인력 투입 계획 검증 필요"
      ],
      confidenceLevel: 85
    },
    priceDistribution: {
      min: 1350000000,
      max: 1500000000,
      median: 1420000000,
      recommended: 1380000000
    }
  },
  "bid-2024-004": {
    bidId: "bid-2024-004",
    bidTitle: "클라우드 네이티브 전환 컨설팅 및 구축",
    simulationCount: 10000,
    executionTime: 12567,
    scenarios: [
      {
        id: "scenario-a",
        name: "최적 가격 전략",
        proposedPrice: 823000000,
        techScore: 92.3,
        priceScore: 94.5,
        totalScore: 93.2,
        winProbability: 91,
        rank: 1,
        recommendation: "강력 추천"
      },
      {
        id: "scenario-b",
        name: "안정적 전략",
        proposedPrice: 845000000,
        techScore: 92.3,
        priceScore: 92.1,
        totalScore: 92.2,
        winProbability: 86,
        rank: 2
      },
      {
        id: "scenario-c",
        name: "수익 최대화 전략",
        proposedPrice: 867000000,
        techScore: 92.3,
        priceScore: 89.8,
        totalScore: 90.8,
        winProbability: 78,
        rank: 3
      }
    ],
    competitors: [
      {
        name: "클라우드 전문 E사",
        estimatedScore: 88.5,
        strengths: ["클라우드 전문성", "다수 인증 보유"],
        weaknesses: ["조달청 실적 없음", "컨설팅 경험 부족"],
        predictedPrice: 850000000
      },
      {
        name: "SI 대기업 F사",
        estimatedScore: 86.2,
        strengths: ["종합 역량", "안정성"],
        weaknesses: ["높은 단가", "클라우드 특화 부족"],
        predictedPrice: 880000000
      }
    ],
    recommendation: {
      optimalPrice: 823000000,
      optimalTechFocus: [
        "AWS/Azure 공인 전문가 자격 강조",
        "조달청 시스템 이해도 어필",
        "마이그레이션 자동화 도구 제안",
        "단계별 리스크 관리 방안 제시"
      ],
      expectedWinRate: 91,
      reasoning: [
        "조달청과의 기존 협력 관계로 높은 신뢰도",
        "클라우드 관련 모든 필수 요건 완벽 충족",
        "경쟁사 대비 기술+가격 모두 우위",
        "중소기업 가점 적용으로 최종 점수 상승"
      ],
      riskFactors: [
        "클라우드 전문 E사의 기술 경쟁력",
        "예상보다 낮은 예정가격 책정 가능성"
      ],
      confidenceLevel: 92
    },
    priceDistribution: {
      min: 800000000,
      max: 890000000,
      median: 845000000,
      recommended: 823000000
    }
  }
};

// 시뮬레이션 진행 상태
export interface SimulationProgress {
  bidId: string;
  phase: 'initializing' | 'analyzing' | 'simulating' | 'optimizing' | 'completed';
  progress: number; // 0-100
  currentStep: string;
  iterations: number;
  estimatedTimeRemaining: number; // seconds
}

// 기본 시뮬레이션 설정
export const defaultSimulationConfig = {
  iterations: 10000,
  confidenceInterval: 0.95,
  priceVariance: 0.15, // 15%
  techScoreVariance: 0.08, // 8%
  competitorModels: ['aggressive', 'balanced', 'conservative'],
  riskFactors: ['market', 'competition', 'execution', 'regulatory']
};

// 시뮬레이션 메트릭
export interface SimulationMetrics {
  averageWinRate: number;
  bestCaseWinRate: number;
  worstCaseWinRate: number;
  optimalPriceRange: { min: number; max: number };
  sensitivityToPrice: number; // 가격 1% 변동당 승률 변화
  sensitivityToTech: number; // 기술점수 1점 변동당 승률 변화
}

export function getSimulationById(bidId: string): SimulationResult | undefined {
  return simulationResults[bidId];
}

export function calculateWinProbability(
  proposedPrice: number,
  techScore: number,
  estimatedPrice: number,
  competitorCount: number
): number {
  const priceScore = Math.min(100, (estimatedPrice / proposedPrice) * 100);
  const totalScore = techScore * 0.4 + priceScore * 0.6;
  const baseProb = (totalScore - 70) * 3;
  const competitorPenalty = (competitorCount - 1) * 2;
  return Math.min(95, Math.max(5, baseProb - competitorPenalty));
}
