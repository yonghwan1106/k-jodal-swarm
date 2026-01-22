/**
 * 입찰공고 통합 API 라우트
 * GET /api/bids
 *
 * 나라장터 API 호출 후 실패 시 Mock 데이터로 폴백
 */

import { NextResponse } from 'next/server';
import {
  getAllBidAnnouncements,
  getBidAnnouncementsGoods,
  getBidAnnouncementsService,
  getBidAnnouncementsCnstwk,
  convertToBidAnnouncement,
  formatStartDateForApi,
  formatEndDateForApi,
} from '@/lib/api/g2b-api';
import { mockBids } from '@/lib/mock-data/bids';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Query parameters
  const type = searchParams.get('type') || 'all';
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const keyword = searchParams.get('keyword');
  const agency = searchParams.get('agency');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');
  const useMock = searchParams.get('mock') === 'true';

  // Force mock data if requested
  if (useMock) {
    return NextResponse.json({
      success: true,
      data: mockBids,
      meta: {
        total: mockBids.length,
        page: 1,
        limit: mockBids.length,
        type: 'mock',
      },
      fallback: true,
    });
  }

  // Default date range (last 30 days)
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const params = {
    inqryBgnDt: startDate || formatStartDateForApi(thirtyDaysAgo),  // YYYYMMDDHHmm 형식 (12자리)
    inqryEndDt: endDate || formatEndDateForApi(today),              // YYYYMMDDHHmm 형식 (12자리)
    bidNtceNm: keyword || undefined,
    ntceInsttNm: agency || undefined,
    numOfRows: limit,
    pageNo: page,
  };

  try {
    let rawBids;

    switch (type) {
      case 'goods':
        rawBids = await getBidAnnouncementsGoods(params);
        break;
      case 'service':
        rawBids = await getBidAnnouncementsService(params);
        break;
      case 'cnstwk':
        rawBids = await getBidAnnouncementsCnstwk(params);
        break;
      case 'all':
      default:
        rawBids = await getAllBidAnnouncements(params);
        break;
    }

    // Check if we got any data
    if (!rawBids || rawBids.length === 0) {
      console.log('[API] /api/bids: No data from G2B API, using mock data');
      return NextResponse.json({
        success: true,
        data: mockBids,
        meta: {
          total: mockBids.length,
          page: 1,
          limit: mockBids.length,
          type: 'mock',
          dateRange: {
            start: params.inqryBgnDt,
            end: params.inqryEndDt,
          },
        },
        fallback: true,
      });
    }

    // Transform to frontend format
    const bids = rawBids.map(convertToBidAnnouncement);

    // Apply client-side filters if needed
    let filteredBids = bids;

    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filteredBids = filteredBids.filter(
        (bid) =>
          bid.title.toLowerCase().includes(lowerKeyword) ||
          bid.agency.toLowerCase().includes(lowerKeyword)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredBids,
      meta: {
        total: filteredBids.length,
        page,
        limit,
        type,
        dateRange: {
          start: params.inqryBgnDt,
          end: params.inqryEndDt,
        },
      },
      fallback: false,
    });
  } catch (error) {
    console.error('[API] /api/bids Error:', error);

    // Fallback to mock data on error
    return NextResponse.json({
      success: true,
      data: mockBids,
      meta: {
        total: mockBids.length,
        page: 1,
        limit: mockBids.length,
        type: 'mock',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      fallback: true,
    });
  }
}

// Disable cache for real-time data
export const dynamic = 'force-dynamic';
