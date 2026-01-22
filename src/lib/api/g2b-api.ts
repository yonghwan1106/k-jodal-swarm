/**
 * 나라장터 공공데이터 API 클라이언트
 * 조달청 API 6종 연동
 */

// API 응답 기본 타입
export interface G2BApiResponse<T> {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: T[] | { item: T | T[] };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

// 입찰공고 타입 (입찰공고정보서비스)
export interface G2BBidAnnouncement {
  bidNtceNo: string;           // 입찰공고번호
  bidNtceNm: string;           // 입찰공고명
  ntceInsttNm: string;         // 공고기관명
  dminsttNm: string;           // 수요기관명
  bidNtceDt: string;           // 입찰공고일시
  bidClseDt: string;           // 입찰마감일시
  opengDt: string;             // 개찰일시
  presmptPrce: number;         // 추정가격
  bdgt: number;                // 예산금액
  cmmnSpldmdCorpRgnLmtYn: string; // 공동수급업체지역제한여부
  bidNtceUrl: string;          // 입찰공고URL
  ntceKindNm: string;          // 공고종류명 (물품/용역/공사/외자)
  cntrctMthdNm: string;        // 계약방법명
  bidMethdNm: string;          // 입찰방식명
  sucsfbidMthdNm: string;      // 낙찰자선정방법명
  rbidPermsnYn: string;        // 재입찰허용여부
  rgstDt: string;              // 등록일시
  chgDt: string;               // 변경일시
  bidNtceOrd: string;          // 입찰공고차수
  refNo: string;               // 참조번호
  inqryBgnDt: string;          // 문의시작일시
  inqryEndDt: string;          // 문의종료일시
  ntceInsttCd: string;         // 공고기관코드
  dminsttCd: string;           // 수요기관코드
}

// 낙찰정보 타입 (낙찰정보서비스)
export interface G2BAwardInfo {
  bidNtceNo: string;           // 입찰공고번호
  bidNtceOrd: string;          // 입찰공고차수
  bidNtceNm: string;           // 입찰공고명
  ntceInsttNm: string;         // 공고기관명
  opengDt: string;             // 개찰일시
  sucsfbidAmt: number;         // 낙찰금액
  sucsfbidCorpNm: string;      // 낙찰업체명
  sucsfbidCorpBizNo: string;   // 낙찰업체사업자번호
  sucsfbidCorpCeoNm: string;   // 낙찰업체대표자명
  sucsfbidRate: number;        // 낙찰률
  opengRsltDivNm: string;      // 개찰결과구분명 (낙찰/유찰)
  bidprcAmt: number;           // 투찰금액
  drwtNum: string;             // 추첨번호
  rnkOrd: number;              // 순위
  plnprc: number;              // 예정가격
  bsisAmt: number;             // 기초금액
  rsrvtnPrceRngRate: number;   // 예비가격범위율
}

// 계약정보 타입 (계약정보서비스)
export interface G2BContractInfo {
  cntrctNo: string;            // 계약번호
  cntrctNm: string;            // 계약명
  cntrctAmt: number;           // 계약금액
  cntrctMthdNm: string;        // 계약방법명
  cntrctBgnDe: string;         // 계약시작일
  cntrctEndDe: string;         // 계약종료일
  cntrctDt: string;            // 계약체결일
  dcsnDt: string;              // 확정일자
  cntrctCorpNm: string;        // 계약업체명
  cntrctCorpBizNo: string;     // 계약업체사업자번호
  dminsttNm: string;           // 수요기관명
  cntrctInsttNm: string;       // 계약기관명
  bidNtceNo: string;           // 입찰공고번호
  rqestNo: string;             // 조달요청번호
}

// 계약과정통합공개 타입
export interface G2BContractProcess {
  bidNtceNo: string;           // 입찰공고번호
  bidNtceNm: string;           // 입찰공고명
  ntceInsttNm: string;         // 공고기관명
  prgrsSttusNm: string;        // 진행상태명
  bidClseDt: string;           // 입찰마감일시
  opengDt: string;             // 개찰일시
  sucsfbidCorpNm: string;      // 낙찰업체명
  cntrctCorpNm: string;        // 계약업체명
  cntrctAmt: number;           // 계약금액
}

// 물품목록 타입
export interface G2BItemInfo {
  prdctIdntNoNm: string;       // 물품식별번호명
  prdctClsfcNo: string;        // 물품분류번호
  prdctClsfcNoNm: string;      // 물품분류번호명
  prdctIdntNo: string;         // 물품식별번호
  dtlPrdctClsfcNoNm: string;   // 세부물품분류번호명
  prdctUprcAmt: number;        // 물품단가금액
  cnstwkUprcAmt: number;       // 공사단가금액
}

// API 설정 (2025년 최신 API URL - /ad/ 경로 사용)
const API_CONFIG = {
  serviceKey: process.env.DATA_GO_KR_API_KEY || '',
  baseUrls: {
    // 입찰공고정보서비스 (새 URL: /ad/BidPublicInfoService)
    bid: process.env.G2B_BID_API_URL || 'https://apis.data.go.kr/1230000/ad/BidPublicInfoService',
    // 낙찰정보서비스 (새 URL: /ad/ScsbidInfoService)
    award: process.env.G2B_AWARD_API_URL || 'https://apis.data.go.kr/1230000/ad/ScsbidInfoService',
    // 계약정보서비스 (새 URL: /ad/CntrctInfoService)
    contract: process.env.G2B_CONTRACT_API_URL || 'https://apis.data.go.kr/1230000/ad/CntrctInfoService',
    // 공공데이터개방표준서비스
    standard: process.env.G2B_STANDARD_API_URL || 'https://apis.data.go.kr/1230000/ao/PubDataOpnStdService',
    // 계약과정통합공개서비스
    process: process.env.G2B_PROCESS_API_URL || 'https://apis.data.go.kr/1230000/ao/CntrctProcssIntgOpenService',
    // 물품목록정보서비스
    item: process.env.G2B_ITEM_API_URL || 'https://apis.data.go.kr/1230000/PrdctInfoService',
  }
};

// 날짜 포맷 헬퍼 (YYYYMMDDHHmm - 12자리, API 기본 형식)
export function formatDateForApi(date: Date, withTime: boolean = true): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (!withTime) {
    return `${year}${month}${day}`;
  }

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}`;
}

// 날짜+시간 포맷 헬퍼 (YYYYMMDDHHmm - 12자리)
export function formatDateTimeForApi(date: Date): string {
  return formatDateForApi(date, true);
}

// 시작일 (00:00) 포맷
export function formatStartDateForApi(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}0000`;
}

// 종료일 (23:59) 포맷
export function formatEndDateForApi(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}2359`;
}

// API 호출 공통 함수
async function fetchG2BApi<T>(
  baseUrl: string,
  endpoint: string,
  params: Record<string, string | number>
): Promise<T[]> {
  const searchParams = new URLSearchParams({
    serviceKey: API_CONFIG.serviceKey,
    numOfRows: String(params.numOfRows || 100),
    pageNo: String(params.pageNo || 1),
    type: 'json',
    ...Object.fromEntries(
      Object.entries(params)
        .filter(([key, value]) =>
          !['numOfRows', 'pageNo'].includes(key) &&
          value !== undefined &&
          value !== null &&
          value !== ''
        )
        .map(([key, value]) => [key, String(value)])
    ),
  });

  const url = `${baseUrl}/${endpoint}?${searchParams.toString()}`;
  
  console.log('[G2B API] Fetching:', url.replace(API_CONFIG.serviceKey, '***'));
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: G2BApiResponse<T> = await response.json();
    
    if (data.response.header.resultCode !== '00') {
      throw new Error(`API Error: ${data.response.header.resultMsg}`);
    }

    // items가 배열인 경우와 객체인 경우 처리
    const items = data.response.body.items;
    if (!items) return [];
    
    if (Array.isArray(items)) {
      return items;
    } else if (items.item) {
      return Array.isArray(items.item) ? items.item : [items.item];
    }
    
    return [];
  } catch (error) {
    console.error('[G2B API] Error:', error);
    throw error;
  }
}

/**
 * 입찰공고 조회 (물품)
 */
export async function getBidAnnouncementsGoods(params: {
  inqryBgnDt?: string;  // 조회시작일 (YYYYMMDDHHmm - 12자리)
  inqryEndDt?: string;  // 조회종료일 (YYYYMMDDHHmm - 12자리)
  bidNtceNm?: string;   // 입찰공고명
  ntceInsttNm?: string; // 공고기관명
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BBidAnnouncement[]> {
  return fetchG2BApi<G2BBidAnnouncement>(
    API_CONFIG.baseUrls.bid,
    'getBidPblancListInfoThng',  // 2025년 신규 엔드포인트 (PPSSrch 제거)
    {
      inqryDiv: '1', // 1: 공고일, 2: 개찰일
      ...params,
    }
  );
}

/**
 * 입찰공고 조회 (용역)
 */
export async function getBidAnnouncementsService(params: {
  inqryBgnDt?: string;
  inqryEndDt?: string;
  bidNtceNm?: string;
  ntceInsttNm?: string;
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BBidAnnouncement[]> {
  return fetchG2BApi<G2BBidAnnouncement>(
    API_CONFIG.baseUrls.bid,
    'getBidPblancListInfoServc',  // 2025년 신규 엔드포인트
    {
      inqryDiv: '1',
      ...params,
    }
  );
}

/**
 * 입찰공고 조회 (공사)
 */
export async function getBidAnnouncementsCnstwk(params: {
  inqryBgnDt?: string;
  inqryEndDt?: string;
  bidNtceNm?: string;
  ntceInsttNm?: string;
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BBidAnnouncement[]> {
  return fetchG2BApi<G2BBidAnnouncement>(
    API_CONFIG.baseUrls.bid,
    'getBidPblancListInfoCnstwk',  // 2025년 신규 엔드포인트
    {
      inqryDiv: '1',
      ...params,
    }
  );
}

/**
 * 입찰공고 조회 (외자)
 */
export async function getBidAnnouncementsFrgcpt(params: {
  inqryBgnDt?: string;
  inqryEndDt?: string;
  bidNtceNm?: string;
  ntceInsttNm?: string;
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BBidAnnouncement[]> {
  return fetchG2BApi<G2BBidAnnouncement>(
    API_CONFIG.baseUrls.bid,
    'getBidPblancListInfoFrgcpt',  // 2025년 신규 엔드포인트
    {
      inqryDiv: '1',
      ...params,
    }
  );
}

/**
 * 전체 입찰공고 조회 (물품+용역+공사+외자 통합)
 */
export async function getAllBidAnnouncements(params: {
  inqryBgnDt?: string;
  inqryEndDt?: string;
  bidNtceNm?: string;
  ntceInsttNm?: string;
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BBidAnnouncement[]> {
  try {
    const [goods, service, cnstwk, frgcpt] = await Promise.all([
      getBidAnnouncementsGoods(params).catch(() => []),
      getBidAnnouncementsService(params).catch(() => []),
      getBidAnnouncementsCnstwk(params).catch(() => []),
      getBidAnnouncementsFrgcpt(params).catch(() => []),
    ]);

    // 모든 결과 합치고 날짜순 정렬
    const allBids = [...goods, ...service, ...cnstwk, ...frgcpt];
    return allBids.sort((a, b) => 
      new Date(b.bidNtceDt).getTime() - new Date(a.bidNtceDt).getTime()
    );
  } catch (error) {
    console.error('[G2B API] getAllBidAnnouncements Error:', error);
    throw error;
  }
}

/**
 * 낙찰정보 조회 (물품)
 */
export async function getAwardInfoGoods(params: {
  inqryBgnDt?: string;
  inqryEndDt?: string;
  bidNtceNo?: string;
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BAwardInfo[]> {
  return fetchG2BApi<G2BAwardInfo>(
    API_CONFIG.baseUrls.award,
    'getScsbidListSttusThng',
    params
  );
}

/**
 * 낙찰정보 조회 (용역)
 */
export async function getAwardInfoService(params: {
  inqryBgnDt?: string;
  inqryEndDt?: string;
  bidNtceNo?: string;
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BAwardInfo[]> {
  return fetchG2BApi<G2BAwardInfo>(
    API_CONFIG.baseUrls.award,
    'getScsbidListSttusServc',
    params
  );
}

/**
 * 전체 낙찰정보 조회
 */
export async function getAllAwardInfo(params: {
  inqryBgnDt?: string;
  inqryEndDt?: string;
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BAwardInfo[]> {
  try {
    const [goods, service] = await Promise.all([
      getAwardInfoGoods(params).catch(() => []),
      getAwardInfoService(params).catch(() => []),
    ]);

    return [...goods, ...service].sort((a, b) =>
      new Date(b.opengDt).getTime() - new Date(a.opengDt).getTime()
    );
  } catch (error) {
    console.error('[G2B API] getAllAwardInfo Error:', error);
    throw error;
  }
}

/**
 * 계약정보 조회 (물품)
 */
export async function getContractInfoGoods(params: {
  inqryBgnDt?: string;
  inqryEndDt?: string;
  cntrctNo?: string;
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BContractInfo[]> {
  return fetchG2BApi<G2BContractInfo>(
    API_CONFIG.baseUrls.contract,
    'getCntrctInfoListThng',
    params
  );
}

/**
 * 계약정보 조회 (용역)
 */
export async function getContractInfoService(params: {
  inqryBgnDt?: string;
  inqryEndDt?: string;
  cntrctNo?: string;
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BContractInfo[]> {
  return fetchG2BApi<G2BContractInfo>(
    API_CONFIG.baseUrls.contract,
    'getCntrctInfoListServc',
    params
  );
}

/**
 * 전체 계약정보 조회
 */
export async function getAllContractInfo(params: {
  inqryBgnDt?: string;
  inqryEndDt?: string;
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BContractInfo[]> {
  try {
    const [goods, service] = await Promise.all([
      getContractInfoGoods(params).catch(() => []),
      getContractInfoService(params).catch(() => []),
    ]);

    return [...goods, ...service].sort((a, b) =>
      new Date(b.cntrctDt).getTime() - new Date(a.cntrctDt).getTime()
    );
  } catch (error) {
    console.error('[G2B API] getAllContractInfo Error:', error);
    throw error;
  }
}

/**
 * 계약과정 통합조회
 */
export async function getContractProcess(params: {
  bidNtceNo?: string;   // 입찰공고번호
  bfSpecRgstNo?: string; // 사전규격등록번호
  orderPlanNo?: string;  // 발주계획번호
  rqestNo?: string;      // 조달요청번호
}): Promise<G2BContractProcess[]> {
  return fetchG2BApi<G2BContractProcess>(
    API_CONFIG.baseUrls.process,
    'getCntrctProcssIntgOpenThng',
    params
  );
}

/**
 * 공공데이터 개방표준서비스 - 입찰정보 조회
 */
export async function getStandardBidInfo(params: {
  bidNtceDt?: string;  // 입찰공고일시
  opengDt?: string;    // 개찰일시  
  cntrctDt?: string;   // 계약체결일자
  numOfRows?: number;
  pageNo?: number;
}): Promise<G2BBidAnnouncement[]> {
  return fetchG2BApi<G2BBidAnnouncement>(
    API_CONFIG.baseUrls.standard,
    'getBidPublicOpnStdList',
    params
  );
}

// 내부 앱용 변환 함수 - G2B 응답을 앱 형식으로 변환
export function convertToBidAnnouncement(g2bBid: G2BBidAnnouncement) {
  // 가격 파싱
  const estimatedPrice = g2bBid.presmptPrce || g2bBid.bdgt || 0;
  
  // 마감일 계산
  const deadline = g2bBid.bidClseDt || g2bBid.opengDt;
  
  // 매칭 점수 계산 (임시 로직 - 추후 AI 분석으로 대체)
  const matchScore = calculateMatchScore(g2bBid);
  
  // 낙찰 확률 예측 (임시 로직 - 추후 ML 모델로 대체)
  const winProbability = calculateWinProbability(g2bBid);

  return {
    id: `g2b-${g2bBid.bidNtceNo}-${g2bBid.bidNtceOrd || '1'}`,
    bidNumber: g2bBid.bidNtceNo,
    title: g2bBid.bidNtceNm,
    agency: g2bBid.ntceInsttNm,
    demandAgency: g2bBid.dminsttNm,
    category: g2bBid.ntceKindNm || '기타',
    subcategory: g2bBid.cntrctMthdNm || '',
    estimatedPrice,
    deadline,
    publishedAt: g2bBid.bidNtceDt,
    bidType: g2bBid.bidMethdNm || '일반경쟁입찰',
    contractMethod: g2bBid.cntrctMthdNm,
    successBidMethod: g2bBid.sucsfbidMthdNm,
    requirements: [],
    attachments: [],
    matchScore,
    winProbability,
    competitors: Math.floor(Math.random() * 15) + 3, // 임시 - 추후 실제 데이터로
    status: 'new' as const,
    aiInsights: generateAiInsights(g2bBid, matchScore),
    riskLevel: matchScore >= 80 ? 'low' : matchScore >= 50 ? 'medium' : 'high' as const,
    urgency: calculateUrgency(deadline),
    description: g2bBid.bidNtceNm,
    url: g2bBid.bidNtceUrl || `https://www.g2b.go.kr/pt/menu/selectSubFrame.do?framesrc=/pt/menu/frameTgong.do?url=https://www.g2b.go.kr:8101/ep/tbid/tbidList.do?bidNtceNo=${g2bBid.bidNtceNo}`,
    contactPerson: '',
    contactPhone: '',
  };
}

// 매칭 점수 계산 (임시 로직)
function calculateMatchScore(bid: G2BBidAnnouncement): number {
  let score = 50;
  
  // 공고명에 특정 키워드 포함 시 점수 조정
  const title = bid.bidNtceNm?.toLowerCase() || '';
  const keywords = ['소프트웨어', 'sw', '시스템', '플랫폼', 'ai', '인공지능', '데이터', 'it', '정보화'];
  
  keywords.forEach(keyword => {
    if (title.includes(keyword)) {
      score += 5;
    }
  });

  // 예산 규모에 따른 조정
  const price = bid.presmptPrce || bid.bdgt || 0;
  if (price >= 100000000 && price <= 5000000000) {
    score += 10;
  }

  return Math.min(Math.max(score, 0), 100);
}

// 낙찰 확률 계산 (임시 로직)
function calculateWinProbability(bid: G2BBidAnnouncement): number {
  const matchScore = calculateMatchScore(bid);
  
  // 기본 확률은 매칭 점수의 70-90% 범위
  const baseProb = matchScore * (0.7 + Math.random() * 0.2);
  
  // 입찰방식에 따른 조정
  if (bid.bidMethdNm?.includes('제한')) {
    return Math.min(baseProb * 0.9, 95);
  }
  
  return Math.min(Math.max(baseProb, 10), 95);
}

// 긴급도 계산
function calculateUrgency(deadline: string): 'normal' | 'urgent' | 'critical' {
  if (!deadline) return 'normal';
  
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const daysLeft = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysLeft <= 3) return 'critical';
  if (daysLeft <= 7) return 'urgent';
  return 'normal';
}

// AI 인사이트 생성 (임시 로직)
function generateAiInsights(bid: G2BBidAnnouncement, matchScore: number): string[] {
  const insights: string[] = [];
  
  if (matchScore >= 80) {
    insights.push('귀사의 사업 분야와 높은 매칭도를 보입니다.');
  }
  
  const price = bid.presmptPrce || bid.bdgt || 0;
  if (price >= 1000000000) {
    insights.push(`예산 규모 ${(price / 100000000).toFixed(1)}억원으로 대형 프로젝트입니다.`);
  }
  
  if (bid.cntrctMthdNm?.includes('협상')) {
    insights.push('협상에 의한 계약으로 기술력 강조 전략이 유효합니다.');
  }
  
  if (bid.bidMethdNm?.includes('제한')) {
    insights.push('제한경쟁입찰로 자격요건 확인이 필요합니다.');
  }

  if (insights.length === 0) {
    insights.push('상세 분석을 위해 공고 내용을 확인하세요.');
  }
  
  return insights;
}

export default {
  getBidAnnouncementsGoods,
  getBidAnnouncementsService,
  getBidAnnouncementsCnstwk,
  getBidAnnouncementsFrgcpt,
  getAllBidAnnouncements,
  getAwardInfoGoods,
  getAwardInfoService,
  getAllAwardInfo,
  getContractInfoGoods,
  getContractInfoService,
  getAllContractInfo,
  getContractProcess,
  getStandardBidInfo,
  convertToBidAnnouncement,
  formatDateForApi,
  formatDateTimeForApi,
};
