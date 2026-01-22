/**
 * 입찰공고 API 라우트
 * GET /api/g2b/bids
 */

import { NextResponse } from 'next/server';
import { 
  getAllBidAnnouncements, 
  getBidAnnouncementsGoods,
  getBidAnnouncementsService,
  getBidAnnouncementsCnstwk,
  convertToBidAnnouncement,
  formatDateForApi 
} from '@/lib/api/g2b-api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 쿼리 파라미터
    const type = searchParams.get('type') || 'all'; // all, goods, service, cnstwk, frgcpt
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const keyword = searchParams.get('keyword');
    const agency = searchParams.get('agency');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // 기본 날짜 설정 (최근 30일)
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const params = {
      inqryBgnDt: startDate || formatDateForApi(thirtyDaysAgo),
      inqryEndDt: endDate || formatDateForApi(today),
      bidNtceNm: keyword || undefined,
      ntceInsttNm: agency || undefined,
      numOfRows: limit,
      pageNo: page,
    };

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

    // 앱 형식으로 변환
    const bids = rawBids.map(convertToBidAnnouncement);

    return NextResponse.json({
      success: true,
      data: bids,
      meta: {
        total: bids.length,
        page,
        limit,
        type,
        dateRange: {
          start: params.inqryBgnDt,
          end: params.inqryEndDt,
        }
      }
    });

  } catch (error) {
    console.error('[API] /api/g2b/bids Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: [],
    }, { status: 500 });
  }
}

// 캐시 비활성화 (실시간 데이터)
export const dynamic = 'force-dynamic';
