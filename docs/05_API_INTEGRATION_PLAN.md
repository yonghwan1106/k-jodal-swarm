# API 연동 구현 계획서

> 작성일: 2025-12-29
> K-조달 AI 스웜 실제 API 연동 기술 문서

---

## 📌 현재 상태

### 기존 구조
```
src/
├── lib/
│   ├── mock-data/           # ← 현재: Mock 데이터
│   │   ├── agents.ts
│   │   ├── bids.ts          # Mock 입찰공고 10건
│   │   ├── company.ts
│   │   ├── simulations.ts
│   │   └── index.ts
│   ├── constants/
│   └── utils.ts
├── app/
│   └── api/
│       └── chat/            # Claude API (작동 중)
└── ...
```

### 목표 구조
```
src/
├── lib/
│   ├── api/                 # ← 신규: 실제 API 클라이언트
│   │   ├── g2b-client.ts    # 나라장터 API 클라이언트
│   │   ├── bid-service.ts   # 입찰공고 서비스
│   │   ├── award-service.ts # 낙찰정보 서비스
│   │   ├── contract-service.ts
│   │   ├── types.ts         # API 응답 타입
│   │   └── index.ts
│   ├── mock-data/           # 폴백용 유지
│   └── ...
├── app/
│   └── api/
│       ├── chat/
│       ├── bids/            # ← 신규: 입찰공고 API
│       ├── awards/          # ← 신규: 낙찰정보 API
│       └── contracts/       # ← 신규: 계약정보 API
└── ...
```

---

## 🔑 환경변수 설정

### .env.local 추가 내용
```env
# 기존
ANTHROPIC_API_KEY=sk-ant-api03-xxx

# 신규 추가 - 나라장터 API
G2B_API_KEY=발급받은_서비스키

# API Base URLs
G2B_BASE_URL=http://apis.data.go.kr/1230000
```

---

## 📦 API 연동 구현 계획

### 1단계: API 클라이언트 기본 구조

#### 파일: `src/lib/api/g2b-client.ts`
```typescript
// 나라장터 API 기본 클라이언트
const G2B_BASE_URL = process.env.G2B_BASE_URL;
const API_KEY = process.env.G2B_API_KEY;

interface G2BRequestParams {
  serviceKey: string;
  pageNo?: number;
  numOfRows?: number;
  type?: 'json' | 'xml';
  [key: string]: any;
}

export async function g2bFetch<T>(
  servicePath: string,
  operation: string,
  params: Partial<G2BRequestParams> = {}
): Promise<T> {
  const url = new URL(`${G2B_BASE_URL}${servicePath}/${operation}`);
  
  const queryParams = {
    serviceKey: API_KEY,
    pageNo: 1,
    numOfRows: 100,
    type: 'json',
    ...params
  };

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`G2B API Error: ${response.status}`);
  }

  return response.json();
}
```

---

### 2단계: 입찰공고 서비스 (가장 중요)

#### API 엔드포인트
| 서비스 | 경로 |
|--------|------|
| 입찰공고정보서비스 | `/ao/BidPublicInfoService` |

#### 주요 오퍼레이션
| 오퍼레이션 | 설명 |
|-----------|------|
| `getBidPblancListInfoThng` | 물품 입찰공고 목록 |
| `getBidPblancListInfoServc` | 용역 입찰공고 목록 |
| `getBidPblancListInfoCnstwk` | 공사 입찰공고 목록 |
| `getBidPblancListInfoFrgcpt` | 외자 입찰공고 목록 |

#### 파일: `src/lib/api/bid-service.ts`
```typescript
import { g2bFetch } from './g2b-client';

// 입찰공고 응답 타입
interface BidListResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: BidItem[];
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

interface BidItem {
  bidNtceNo: string;      // 입찰공고번호
  bidNtceNm: string;      // 입찰공고명
  ntceInsttNm: string;    // 공고기관명
  dminsttNm: string;      // 수요기관명
  presmptPrce: number;    // 추정가격
  bidNtceDt: string;      // 입찰공고일시
  bidClseDt: string;      // 입찰마감일시
  // ... 추가 필드
}

// 물품 입찰공고 조회
export async function getThingBidList(params: {
  inqryDiv?: string;       // 검색구분 (1:공고일시, 2:개찰일시)
  inqryBgnDt?: string;     // 검색시작일 (yyyyMMdd)
  inqryEndDt?: string;     // 검색종료일 (yyyyMMdd)
  bidNtceNm?: string;      // 입찰공고명
  pageNo?: number;
  numOfRows?: number;
}): Promise<BidListResponse> {
  return g2bFetch<BidListResponse>(
    '/ao/BidPublicInfoService',
    'getBidPblancListInfoThng',
    params
  );
}

// 용역 입찰공고 조회
export async function getServiceBidList(params: {
  inqryDiv?: string;
  inqryBgnDt?: string;
  inqryEndDt?: string;
  bidNtceNm?: string;
  pageNo?: number;
  numOfRows?: number;
}): Promise<BidListResponse> {
  return g2bFetch<BidListResponse>(
    '/ao/BidPublicInfoService',
    'getBidPblancListInfoServc',
    params
  );
}

// 통합 입찰공고 조회 (물품 + 용역 + 공사)
export async function getAllBidList(params: {
  inqryBgnDt: string;
  inqryEndDt: string;
}): Promise<BidItem[]> {
  const [things, services, constructions] = await Promise.all([
    getThingBidList(params),
    getServiceBidList(params),
    getConstructionBidList(params),
  ]);

  return [
    ...things.response.body.items,
    ...services.response.body.items,
    ...constructions.response.body.items,
  ];
}
```

---

### 3단계: 낙찰정보 서비스

#### API 엔드포인트
| 서비스 | 경로 |
|--------|------|
| 낙찰정보서비스 | `/ao/SuccbidInfoService` |

#### 파일: `src/lib/api/award-service.ts`
```typescript
import { g2bFetch } from './g2b-client';

interface AwardListResponse {
  response: {
    body: {
      items: AwardItem[];
      totalCount: number;
    };
  };
}

interface AwardItem {
  bidNtceNo: string;      // 입찰공고번호
  sucsfbidNm: string;     // 낙찰자명
  sucsfbidBzno: string;   // 낙찰자사업자번호
  sucsfbidAmt: number;    // 낙찰금액
  opengDt: string;        // 개찰일시
  // ... 추가 필드
}

// 물품 낙찰정보 조회
export async function getThingAwardList(params: {
  inqryBgnDt: string;
  inqryEndDt: string;
}): Promise<AwardListResponse> {
  return g2bFetch<AwardListResponse>(
    '/ao/SuccbidInfoService',
    'getSuccbidListInfoThng',
    params
  );
}
```

---

### 4단계: Next.js API Routes

#### 파일: `src/app/api/bids/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAllBidList } from '@/lib/api/bid-service';
import { mockBids } from '@/lib/mock-data/bids';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // 날짜 파라미터 (기본: 최근 30일)
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const inqryBgnDt = searchParams.get('startDate') || 
    thirtyDaysAgo.toISOString().slice(0,10).replace(/-/g, '');
  const inqryEndDt = searchParams.get('endDate') || 
    today.toISOString().slice(0,10).replace(/-/g, '');

  try {
    // 실제 API 호출
    const bids = await getAllBidList({ inqryBgnDt, inqryEndDt });
    
    // 데이터 변환 (API 응답 → 프론트엔드 형식)
    const transformedBids = bids.map(transformBidItem);
    
    return NextResponse.json({
      success: true,
      data: transformedBids,
      total: transformedBids.length
    });
  } catch (error) {
    console.error('G2B API Error:', error);
    
    // 폴백: Mock 데이터 반환
    return NextResponse.json({
      success: true,
      data: mockBids,
      total: mockBids.length,
      fallback: true
    });
  }
}

// API 응답 → 프론트엔드 형식 변환
function transformBidItem(item: any) {
  return {
    id: item.bidNtceNo,
    bidNumber: item.bidNtceNo,
    title: item.bidNtceNm,
    agency: item.ntceInsttNm,
    estimatedPrice: item.presmptPrce || 0,
    deadline: item.bidClseDt,
    publishedAt: item.bidNtceDt,
    status: 'new',
    matchScore: calculateMatchScore(item), // AI 매칭 점수 계산
    // ... 추가 필드 변환
  };
}

function calculateMatchScore(item: any): number {
  // TODO: 기업 DNA와 매칭하여 점수 계산
  // 현재는 임시로 랜덤 점수
  return Math.floor(Math.random() * 40) + 60;
}
```

---

### 5단계: 프론트엔드 연동

#### 파일: `src/hooks/useBids.ts`
```typescript
import { useState, useEffect } from 'react';

interface UseBidsOptions {
  startDate?: string;
  endDate?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useBids(options: UseBidsOptions = {}) {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBids = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (options.startDate) params.set('startDate', options.startDate);
      if (options.endDate) params.set('endDate', options.endDate);

      const response = await fetch(`/api/bids?${params}`);
      const data = await response.json();
      
      setBids(data.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();

    // 자동 새로고침 (기본: 5분)
    if (options.autoRefresh) {
      const interval = setInterval(
        fetchBids, 
        options.refreshInterval || 5 * 60 * 1000
      );
      return () => clearInterval(interval);
    }
  }, [options.startDate, options.endDate]);

  return { bids, loading, error, refetch: fetchBids };
}
```

---

## 📋 구현 체크리스트

### Phase 1: 기본 연동 (1-2주)
- [ ] 환경변수 설정 (.env.local)
- [ ] G2B API 클라이언트 구현
- [ ] 입찰공고정보서비스 연동
- [ ] API Route 구현 (/api/bids)
- [ ] 에러 처리 및 폴백 로직
- [ ] 기존 Mock 데이터와 호환

### Phase 2: 전체 서비스 연동 (3-4주)
- [ ] 낙찰정보서비스 연동
- [ ] 계약정보서비스 연동
- [ ] 계약과정통합공개서비스 연동
- [ ] 물품목록정보서비스 연동
- [ ] 공공데이터개방표준서비스 연동

### Phase 3: 고도화 (5-6주)
- [ ] 데이터 캐싱 (Redis/메모리)
- [ ] 실시간 모니터링 (Polling/WebSocket)
- [ ] AI 매칭 점수 계산 로직
- [ ] 데이터베이스 저장 (Supabase)
- [ ] 알림 시스템 연동

---

## ⚠️ 주의사항

### API 제한
1. **트래픽**: 개발계정 10,000회/일
2. **응답 크기**: numOfRows 최대 100건
3. **타임아웃**: 적절한 타임아웃 설정 필요

### 에러 처리
1. **네트워크 오류**: 재시도 로직 (최대 3회)
2. **API 오류**: 에러 코드별 처리
3. **폴백**: Mock 데이터 반환

### 데이터 품질
1. **인코딩**: 한글 URL 인코딩 확인
2. **날짜 형식**: yyyyMMddHHmm 또는 yyyyMMdd
3. **숫자 형식**: 문자열 → 숫자 변환 필요

---

## 📚 참고 문서

- 각 API 상세 명세: data.go.kr 해당 API 페이지 → Swagger UI
- 조달청 OpenAPI 활용가이드: 각 API 페이지에서 다운로드
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
