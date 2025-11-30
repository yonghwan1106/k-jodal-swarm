export interface Project {
  id: string;
  name: string;
  agency: string;
  amount: number;
  year: number;
  rating: string;
}

export interface BidRecord {
  id: string;
  title: string;
  result: 'won' | 'lost' | 'cancelled';
  amount: number;
  date: string;
}

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
  pastProjects: Project[];
  techStack: string[];
  creditRating: string;
  bidHistory: BidRecord[];
  address: string;
  phone: string;
  email: string;
}

export const mockCompany: Company = {
  id: "comp-001",
  name: "테크소프트 주식회사",
  ceo: "김철수",
  businessNumber: "123-45-67890",
  established: "2015-03-15",
  employees: 28,
  annualRevenue: "45억원",
  mainBusiness: ["소프트웨어 개발", "시스템 통합(SI)", "클라우드 서비스"],
  certifications: [
    "ISO 9001:2015",
    "ISO 27001:2013",
    "벤처기업 인증",
    "SW품질인증 2등급",
    "정보보호관리체계(ISMS)",
    "클라우드 보안인증(CSAP)"
  ],
  pastProjects: [
    {
      id: "proj-001",
      name: "공공기관 전자문서시스템 고도화",
      agency: "한국전자정부원",
      amount: 850000000,
      year: 2024,
      rating: "우수"
    },
    {
      id: "proj-002",
      name: "스마트시티 통합플랫폼 구축",
      agency: "국토교통부",
      amount: 1200000000,
      year: 2023,
      rating: "우수"
    },
    {
      id: "proj-003",
      name: "빅데이터 분석 시스템 개발",
      agency: "통계청",
      amount: 650000000,
      year: 2023,
      rating: "보통"
    },
    {
      id: "proj-004",
      name: "AI 기반 민원처리 시스템",
      agency: "행정안전부",
      amount: 980000000,
      year: 2022,
      rating: "우수"
    },
    {
      id: "proj-005",
      name: "클라우드 인프라 마이그레이션",
      agency: "조달청",
      amount: 420000000,
      year: 2022,
      rating: "보통"
    }
  ],
  techStack: [
    "Java",
    "Spring Boot",
    "Python",
    "React",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Kubernetes",
    "Docker"
  ],
  creditRating: "A+",
  bidHistory: [
    {
      id: "bid-001",
      title: "차세대 전자결재시스템 구축",
      result: "won",
      amount: 780000000,
      date: "2024-09-15"
    },
    {
      id: "bid-002",
      title: "데이터센터 클라우드 전환",
      result: "lost",
      amount: 1500000000,
      date: "2024-08-20"
    },
    {
      id: "bid-003",
      title: "AI 챗봇 서비스 구축",
      result: "won",
      amount: 450000000,
      date: "2024-07-10"
    },
    {
      id: "bid-004",
      title: "공공데이터 포털 고도화",
      result: "won",
      amount: 620000000,
      date: "2024-05-25"
    },
    {
      id: "bid-005",
      title: "블록체인 기반 증명서 발급",
      result: "cancelled",
      amount: 890000000,
      date: "2024-03-18"
    }
  ],
  address: "서울특별시 강남구 테헤란로 123, 테크빌딩 8층",
  phone: "02-1234-5678",
  email: "contact@techsoft.co.kr"
};

export const companyStats = {
  totalBids: 47,
  wonBids: 32,
  winRate: 68.1,
  totalRevenue: "156억원",
  avgProjectSize: "7.8억원",
  repeatCustomers: 12,
  ongoingProjects: 3
};
