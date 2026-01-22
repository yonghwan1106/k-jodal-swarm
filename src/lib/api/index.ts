/**
 * API Module - 통합 Export
 * K-조달 AI 스웜 API 클라이언트
 */

// G2B (나라장터) API
export {
  // Types
  type G2BApiResponse,
  type G2BBidAnnouncement,
  type G2BAwardInfo,
  type G2BContractInfo,
  type G2BContractProcess,
  type G2BItemInfo,

  // Bid APIs
  getAllBidAnnouncements,
  getBidAnnouncementsGoods,
  getBidAnnouncementsService,
  getBidAnnouncementsCnstwk,
  getBidAnnouncementsFrgcpt,

  // Award APIs
  getAllAwardInfo,
  getAwardInfoGoods,
  getAwardInfoService,

  // Contract APIs
  getAllContractInfo,
  getContractInfoGoods,
  getContractInfoService,
  getContractProcess,

  // Standard API
  getStandardBidInfo,

  // Utils
  formatDateForApi,
  formatDateTimeForApi,
  convertToBidAnnouncement,
} from './g2b-api';

// API Base URL for client-side fetching
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    type?: string;
    dateRange?: {
      start: string;
      end: string;
    };
  };
  error?: string;
  fallback?: boolean;
}

// Bid Response Type (transformed for frontend)
export interface BidResponse {
  id: string;
  bidNumber: string;
  title: string;
  agency: string;
  demandAgency?: string;
  category: string;
  subcategory?: string;
  estimatedPrice: number;
  deadline: string;
  publishedAt: string;
  bidType: string;
  contractMethod?: string;
  successBidMethod?: string;
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
  url?: string;
  contactPerson?: string;
  contactPhone?: string;
}

// Award Response Type
export interface AwardResponse {
  id: string;
  bidNumber: string;
  title: string;
  agency: string;
  openingDate: string;
  awardAmount: number;
  winnerName: string;
  winnerBizNo: string;
  winnerCeo?: string;
  awardRate: number;
  result: string;
  bidAmount?: number;
  rank?: number;
  plannedPrice?: number;
  baseAmount?: number;
  reservePriceRange?: number;
}

// Contract Response Type
export interface ContractResponse {
  id: string;
  contractNo: string;
  title: string;
  amount: number;
  method: string;
  startDate: string;
  endDate: string;
  signDate: string;
  confirmDate?: string;
  contractorName: string;
  contractorBizNo: string;
  demandAgency: string;
  contractAgency: string;
  bidNumber?: string;
  requestNo?: string;
}

// API Fetch Options
export interface FetchOptions {
  startDate?: string;
  endDate?: string;
  type?: 'all' | 'goods' | 'service' | 'cnstwk' | 'frgcpt';
  keyword?: string;
  agency?: string;
  page?: number;
  limit?: number;
}

// Client-side API fetcher
export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const params = new URLSearchParams();

  if (options.startDate) params.set('startDate', options.startDate);
  if (options.endDate) params.set('endDate', options.endDate);
  if (options.type) params.set('type', options.type);
  if (options.keyword) params.set('keyword', options.keyword);
  if (options.agency) params.set('agency', options.agency);
  if (options.page) params.set('page', String(options.page));
  if (options.limit) params.set('limit', String(options.limit));

  const url = `${API_BASE_URL}${endpoint}?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Specific API fetchers
export const bidsApi = {
  getAll: (options?: FetchOptions) =>
    fetchApi<BidResponse[]>('/api/bids', options),

  getG2B: (options?: FetchOptions) =>
    fetchApi<BidResponse[]>('/api/g2b/bids', options),

  getById: (id: string) =>
    fetchApi<BidResponse>(`/api/bids/${id}`),
};

export const awardsApi = {
  getAll: (options?: FetchOptions) =>
    fetchApi<AwardResponse[]>('/api/g2b/awards', options),

  getByBidNumber: (bidNumber: string) =>
    fetchApi<AwardResponse[]>('/api/g2b/awards', { keyword: bidNumber }),
};

export const contractsApi = {
  getAll: (options?: FetchOptions) =>
    fetchApi<ContractResponse[]>('/api/g2b/contracts', options),
};
