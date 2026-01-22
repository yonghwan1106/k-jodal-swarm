/**
 * 계약정보 API 라우트
 * GET /api/g2b/contracts
 */

import { NextResponse } from 'next/server';
import { 
  getAllContractInfo,
  getContractInfoGoods,
  getContractInfoService,
  formatDateForApi 
} from '@/lib/api/g2b-api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 쿼리 파라미터
    const type = searchParams.get('type') || 'all';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const cntrctNo = searchParams.get('cntrctNo');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // 기본 날짜 설정 (최근 30일)
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const params = {
      inqryBgnDt: startDate || formatDateForApi(thirtyDaysAgo),
      inqryEndDt: endDate || formatDateForApi(today),
      cntrctNo: cntrctNo || undefined,
      numOfRows: limit,
      pageNo: page,
    };

    let contracts;
    
    switch (type) {
      case 'goods':
        contracts = await getContractInfoGoods(params);
        break;
      case 'service':
        contracts = await getContractInfoService(params);
        break;
      case 'all':
      default:
        contracts = await getAllContractInfo(params);
        break;
    }

    // 계약정보 변환
    const transformedContracts = contracts.map(contract => ({
      id: `contract-${contract.cntrctNo}`,
      contractNo: contract.cntrctNo,
      title: contract.cntrctNm,
      amount: contract.cntrctAmt,
      method: contract.cntrctMthdNm,
      startDate: contract.cntrctBgnDe,
      endDate: contract.cntrctEndDe,
      signDate: contract.cntrctDt,
      confirmDate: contract.dcsnDt,
      contractorName: contract.cntrctCorpNm,
      contractorBizNo: contract.cntrctCorpBizNo,
      demandAgency: contract.dminsttNm,
      contractAgency: contract.cntrctInsttNm,
      bidNumber: contract.bidNtceNo,
      requestNo: contract.rqestNo,
    }));

    return NextResponse.json({
      success: true,
      data: transformedContracts,
      meta: {
        total: transformedContracts.length,
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
    console.error('[API] /api/g2b/contracts Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: [],
    }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
