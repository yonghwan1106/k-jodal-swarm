export interface BidAnnouncement {
  id: string;
  title: string;
  agency: string;
  category: string;
  subcategory: string;
  estimatedPrice: number;
  deadline: string;
  publishedAt: string;
  bidType: string;
  requirements: string[];
  attachments: string[];
  matchScore: number;
  winProbability: number;
  competitors: number;
  status: 'new' | 'analyzing' | 'recommended' | 'applied' | 'preparing';
  aiInsights: string[];
  riskLevel: 'low' | 'medium' | 'high';
  urgency: 'normal' | 'urgent' | 'critical';
  description: string;
  contactPerson: string;
  contactPhone: string;
  bidNumber: string;
}

export const mockBids: BidAnnouncement[] = [
  {
    id: "bid-2024-001",
    bidNumber: "2024-나라장터-0451",
    title: "차세대 전자정부 통합플랫폼 구축 사업",
    agency: "행정안전부",
    category: "소프트웨어개발",
    subcategory: "시스템통합(SI)",
    estimatedPrice: 1500000000,
    deadline: "2025-12-15T18:00:00",
    publishedAt: "2025-11-25",
    bidType: "제한경쟁입찰",
    requirements: [
      "SW개발 실적 30억원 이상",
      "ISO 27001 인증 보유",
      "정보보호전문서비스기업 지정",
      "유사 수행실적 2건 이상"
    ],
    attachments: [
      "제안요청서(RFP).pdf",
      "과업지시서.hwp",
      "기술규격서.xlsx",
      "보안요구사항.pdf"
    ],
    matchScore: 94,
    winProbability: 78,
    competitors: 8,
    status: "recommended",
    aiInsights: [
      "귀사의 전자정부 프로젝트 수행 이력과 95% 일치",
      "요구 기술스택 100% 충족 (Java, Spring, React)",
      "경쟁사 대비 가격경쟁력 우위 예상",
      "과거 행정안전부 프로젝트에서 '우수' 평가 이력"
    ],
    riskLevel: "low",
    urgency: "normal",
    description: "범정부 전자정부서비스의 클라우드 네이티브 전환 및 AI 기반 민원처리 자동화 시스템 구축",
    contactPerson: "김담당",
    contactPhone: "02-2100-1234"
  },
  {
    id: "bid-2024-002",
    bidNumber: "2024-나라장터-0482",
    title: "AI 기반 공공데이터 분석 플랫폼 개발",
    agency: "한국지능정보사회진흥원",
    category: "소프트웨어개발",
    subcategory: "AI/빅데이터",
    estimatedPrice: 2300000000,
    deadline: "2025-12-08T18:00:00",
    publishedAt: "2025-11-20",
    bidType: "일반경쟁입찰",
    requirements: [
      "AI/ML 프로젝트 수행실적 3건 이상",
      "빅데이터 플랫폼 구축 경험",
      "클라우드 보안인증(CSAP) 보유"
    ],
    attachments: [
      "제안요청서(RFP).pdf",
      "기술사양서.hwp",
      "평가기준표.xlsx"
    ],
    matchScore: 89,
    winProbability: 72,
    competitors: 12,
    status: "recommended",
    aiInsights: [
      "AI/빅데이터 분야 수행 실적 높은 매칭도",
      "기술점수 강점: Python, TensorFlow 역량 보유",
      "주의: 예상 경쟁업체 12개로 경쟁 치열 예상",
      "전략: 차별화된 AI 모델 제안 필요"
    ],
    riskLevel: "medium",
    urgency: "urgent",
    description: "공공기관 보유 데이터를 AI로 분석하여 정책 의사결정을 지원하는 지능형 플랫폼 구축",
    contactPerson: "박과장",
    contactPhone: "02-2131-5678"
  },
  {
    id: "bid-2024-003",
    bidNumber: "2024-나라장터-0503",
    title: "스마트시티 통합관제센터 고도화",
    agency: "국토교통부",
    category: "시스템통합",
    subcategory: "IoT/스마트시티",
    estimatedPrice: 3200000000,
    deadline: "2025-12-20T18:00:00",
    publishedAt: "2025-11-28",
    bidType: "제한경쟁입찰",
    requirements: [
      "스마트시티 관련 수행실적 50억원 이상",
      "IoT 플랫폼 구축 경험 필수",
      "실시간 영상분석 기술 보유",
      "벤처기업 확인서"
    ],
    attachments: [
      "제안요청서.pdf",
      "기능요구사항.hwp",
      "인터페이스정의서.xlsx",
      "보안가이드라인.pdf"
    ],
    matchScore: 76,
    winProbability: 45,
    competitors: 6,
    status: "analyzing",
    aiInsights: [
      "스마트시티 수행 실적 요건에서 20억 부족",
      "컨소시엄 구성 시 참여 가능성 높음",
      "IoT 기술역량은 충분히 충족",
      "추천: 스마트시티 전문업체와 협력 검토"
    ],
    riskLevel: "medium",
    urgency: "normal",
    description: "전국 스마트시티 관제센터의 AI 기반 통합관제 및 예측 시스템 고도화",
    contactPerson: "이주임",
    contactPhone: "044-201-3456"
  },
  {
    id: "bid-2024-004",
    bidNumber: "2024-나라장터-0521",
    title: "클라우드 네이티브 전환 컨설팅 및 구축",
    agency: "조달청",
    category: "IT컨설팅",
    subcategory: "클라우드",
    estimatedPrice: 890000000,
    deadline: "2025-12-05T18:00:00",
    publishedAt: "2025-11-22",
    bidType: "일반경쟁입찰",
    requirements: [
      "클라우드 전환 컨설팅 실적 5건 이상",
      "AWS/Azure/GCP 공인 파트너",
      "CSAP 인증 보유"
    ],
    attachments: [
      "RFP.pdf",
      "과업내용서.hwp"
    ],
    matchScore: 97,
    winProbability: 85,
    competitors: 5,
    status: "recommended",
    aiInsights: [
      "조달청 기존 거래 이력으로 신뢰도 높음",
      "클라우드 관련 모든 요건 충족",
      "경쟁사 대비 가격/기술 모두 우위",
      "적극 추천: 높은 낙찰 가능성"
    ],
    riskLevel: "low",
    urgency: "critical",
    description: "조달청 내부 시스템의 클라우드 네이티브 전환을 위한 컨설팅 및 마이그레이션",
    contactPerson: "정대리",
    contactPhone: "042-724-7890"
  },
  {
    id: "bid-2024-005",
    bidNumber: "2024-나라장터-0538",
    title: "사이버보안 관제시스템 구축",
    agency: "국가정보원",
    category: "보안시스템",
    subcategory: "보안관제",
    estimatedPrice: 4500000000,
    deadline: "2025-12-25T18:00:00",
    publishedAt: "2025-11-29",
    bidType: "제한경쟁입찰",
    requirements: [
      "정보보호전문서비스기업 1등급",
      "ISMS-P 인증 필수",
      "보안관제 수행실적 100억원 이상",
      "보안전문인력 30명 이상"
    ],
    attachments: [
      "제안요청서.pdf",
      "보안요구사항.hwp",
      "기술규격서.xlsx",
      "비밀취급인가 요건.pdf"
    ],
    matchScore: 42,
    winProbability: 15,
    competitors: 4,
    status: "new",
    aiInsights: [
      "보안관제 실적 요건 미충족 (현재 45억)",
      "보안전문인력 요건 미달 (현재 12명)",
      "참여 어려움: 자격요건 충족 불가",
      "장기적 보안 역량 강화 필요"
    ],
    riskLevel: "high",
    urgency: "normal",
    description: "국가 핵심 인프라에 대한 24시간 사이버보안 관제 및 대응 시스템 구축",
    contactPerson: "비공개",
    contactPhone: "비공개"
  },
  {
    id: "bid-2024-006",
    bidNumber: "2024-나라장터-0545",
    title: "디지털 트윈 기반 시설물 관리 시스템",
    agency: "한국시설안전공단",
    category: "소프트웨어개발",
    subcategory: "디지털트윈",
    estimatedPrice: 1800000000,
    deadline: "2025-12-18T18:00:00",
    publishedAt: "2025-11-27",
    bidType: "일반경쟁입찰",
    requirements: [
      "3D 모델링/시뮬레이션 개발 경험",
      "IoT 센서 연동 구축 실적",
      "SW개발 실적 20억원 이상"
    ],
    attachments: [
      "제안요청서.pdf",
      "기술규격서.hwp",
      "시설물현황.xlsx"
    ],
    matchScore: 68,
    winProbability: 52,
    competitors: 9,
    status: "analyzing",
    aiInsights: [
      "디지털트윈 직접 경험은 부족하나 유사 기술 보유",
      "IoT 연동 경험으로 기본 요건 충족",
      "3D 모델링 전문업체와 협력 시 경쟁력 확보 가능",
      "신기술 분야로 도전적 참여 권장"
    ],
    riskLevel: "medium",
    urgency: "normal",
    description: "주요 공공시설물의 디지털 트윈 구축을 통한 예방적 유지관리 시스템 개발",
    contactPerson: "송과장",
    contactPhone: "031-910-4567"
  },
  {
    id: "bid-2024-007",
    bidNumber: "2024-나라장터-0558",
    title: "블록체인 기반 전자계약 시스템 구축",
    agency: "대한법률구조공단",
    category: "소프트웨어개발",
    subcategory: "블록체인",
    estimatedPrice: 650000000,
    deadline: "2025-12-10T18:00:00",
    publishedAt: "2025-11-23",
    bidType: "일반경쟁입찰",
    requirements: [
      "블록체인 플랫폼 개발 경험",
      "전자서명/인증 시스템 구축 실적",
      "SW개발 실적 10억원 이상"
    ],
    attachments: [
      "RFP.pdf",
      "기술요구사항.hwp"
    ],
    matchScore: 82,
    winProbability: 68,
    competitors: 7,
    status: "recommended",
    aiInsights: [
      "블록체인 기술 내부 R&D 경험 활용 가능",
      "전자서명 연동 프로젝트 수행 이력 있음",
      "중소규모로 리스크 낮음",
      "수익성 양호한 프로젝트로 판단"
    ],
    riskLevel: "low",
    urgency: "urgent",
    description: "법률 서비스 계약의 무결성과 투명성을 보장하는 블록체인 기반 전자계약 플랫폼",
    contactPerson: "한대리",
    contactPhone: "02-3482-8901"
  },
  {
    id: "bid-2024-008",
    bidNumber: "2024-나라장터-0567",
    title: "AI 민원상담 챗봇 서비스 구축",
    agency: "서울특별시",
    category: "소프트웨어개발",
    subcategory: "AI/챗봇",
    estimatedPrice: 420000000,
    deadline: "2025-12-12T18:00:00",
    publishedAt: "2025-11-26",
    bidType: "일반경쟁입찰",
    requirements: [
      "AI 챗봇 개발/운영 경험 2건 이상",
      "자연어처리(NLP) 기술 보유",
      "SW개발 실적 5억원 이상"
    ],
    attachments: [
      "제안요청서.pdf",
      "운영요구사항.hwp",
      "민원유형분류.xlsx"
    ],
    matchScore: 91,
    winProbability: 76,
    competitors: 11,
    status: "preparing",
    aiInsights: [
      "AI 챗봇 분야 강점 보유 (행안부 유사 프로젝트)",
      "자연어처리 기술 자체 개발 경험 있음",
      "서울시 신규 거래처 확보 기회",
      "제안서 기술 부분에서 차별화 필요"
    ],
    riskLevel: "low",
    urgency: "normal",
    description: "서울시 120다산콜센터와 연계한 AI 기반 24시간 민원상담 챗봇 서비스",
    contactPerson: "윤주임",
    contactPhone: "02-2133-6789"
  },
  {
    id: "bid-2024-009",
    bidNumber: "2024-나라장터-0589",
    title: "공공기관 통합인증 시스템 고도화",
    agency: "한국정보화진흥원",
    category: "보안시스템",
    subcategory: "인증/접근제어",
    estimatedPrice: 750000000,
    deadline: "2025-12-22T18:00:00",
    publishedAt: "2025-11-30",
    bidType: "제한경쟁입찰",
    requirements: [
      "SSO/통합인증 시스템 구축 경험 3건 이상",
      "SAML/OAuth2.0 구현 경험",
      "정보보호 관련 인증 보유"
    ],
    attachments: [
      "RFP.pdf",
      "현행시스템분석서.hwp",
      "연계기관목록.xlsx"
    ],
    matchScore: 85,
    winProbability: 71,
    competitors: 6,
    status: "new",
    aiInsights: [
      "통합인증 관련 풍부한 경험 보유",
      "보안인증(ISMS) 요건 충족",
      "NIA와의 기존 협력 이력 긍정적",
      "기술점수에서 경쟁 우위 예상"
    ],
    riskLevel: "low",
    urgency: "normal",
    description: "범정부 통합인증 체계의 제로트러스트 기반 고도화 및 생체인증 연계",
    contactPerson: "임과장",
    contactPhone: "053-230-1234"
  },
  {
    id: "bid-2024-010",
    bidNumber: "2024-나라장터-0601",
    title: "메타버스 기반 민원서비스 플랫폼",
    agency: "경기도청",
    category: "소프트웨어개발",
    subcategory: "메타버스/XR",
    estimatedPrice: 980000000,
    deadline: "2025-12-28T18:00:00",
    publishedAt: "2025-11-29",
    bidType: "일반경쟁입찰",
    requirements: [
      "메타버스/VR 개발 경험",
      "웹 기반 3D 렌더링 기술",
      "SW개발 실적 10억원 이상"
    ],
    attachments: [
      "제안요청서.pdf",
      "디자인가이드.pdf",
      "기능명세서.hwp"
    ],
    matchScore: 58,
    winProbability: 35,
    competitors: 8,
    status: "new",
    aiInsights: [
      "메타버스/VR 직접 경험 부족",
      "신기술 분야로 전문업체와 경쟁 어려움",
      "협력사 구성 필요성 높음",
      "장기 역량 개발 관점에서 참여 검토"
    ],
    riskLevel: "high",
    urgency: "normal",
    description: "가상공간에서 민원신청, 상담, 처리현황 확인이 가능한 메타버스 민원플랫폼",
    contactPerson: "오대리",
    contactPhone: "031-8008-5678"
  }
];

// Summary stats for dashboard
export const bidStats = {
  totalScanned: 1247,
  todayNew: 23,
  recommended: 8,
  highMatch: 5,
  deadlineSoon: 3,
  analyzing: 4,
  avgMatchScore: 78.5
};

export function getBidById(id: string): BidAnnouncement | undefined {
  return mockBids.find(bid => bid.id === id);
}

export function getRecommendedBids(): BidAnnouncement[] {
  return mockBids.filter(bid => bid.status === 'recommended');
}

export function getHighMatchBids(minScore: number = 80): BidAnnouncement[] {
  return mockBids.filter(bid => bid.matchScore >= minScore);
}
