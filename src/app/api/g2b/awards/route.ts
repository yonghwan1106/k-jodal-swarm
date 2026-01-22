/**
 * 낙찰정보 API 라우트
 * GET /api/g2b/awards
 */

import { NextResponse } from 'next/server';
import { 
  getAllAwardInfo,
  getAwardInfoGoods,
  getAwardInfoService,
  formatDateForApi 
} from '@/lib/api/g2b-api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 쿼리 파라미터
    const type = searchParams.get('type') || 'all';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const bidNtceNo = searchParams.get('bidNtceNo');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // 기본 날짜 설정 (최근 30일)
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const params = {
      inqryBgnDt: startDate || formatDateForApi(thirtyDaysAgo),
      inqryEndDt: endDate || formatDateForApi(today),
      bidNtceNo: bidNtceNo || undefined,
      numOfRows: limit,
      pageNo: page,
    };

    let awards;
    
    switch (type) {
      case 'goods':
        awards = await getAwardInfoGoods(params);
        break;
      case 'service':
        awards = await getAwardInfoService(params);
        break;
      case 'all':
      default:
        awards = await getAllAwardInfo(params);
        break;
    }

    // 낙찰정보 변환
    const transformedAwards = awards.map(award => ({
      id: `award-${award.bidNtceNo}-${award.bidNtceOrd || '1'}`,
      bidNumber: award.bidNtceNo,
      title: award.bidNtceNm,
      agency: award.ntceInsttNm,
      openingDate: award.opengDt,
      awardAmount: award.sucsfbidAmt,
      winnerName: award.sucsfbidCorpNm,
      winnerBizNo: award.sucsfbidCorpBizNo,
      winnerCeo: award.sucsfbidCorpCeoNm,
      awardRate: award.sucsfbidRate,
      result: award.opengRsltDivNm,
      bidAmount: award.bidprcAmt,
      rank: award.rnkOrd,
      plannedPrice: award.plnprc,
      baseAmount: award.bsisAmt,
      reservePriceRange: award.rsrvtnPrceRngRate,
    }));

    return NextResponse.json({
      success: true,
      data: transformedAwards,
      meta: {
        total: transformedAwards.length,
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
    console.error('[API] /api/g2b/awards Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: [],
    }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
