/**
 * 입찰공고 상세 API 라우트
 * GET /api/bids/[id]
 */

import { NextResponse } from 'next/server';
import { mockBids } from '@/lib/mock-data/bids';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // First try to find in mock data (always available)
  const mockBid = mockBids.find((bid) => bid.id === id);

  if (mockBid) {
    return NextResponse.json({
      success: true,
      data: mockBid,
    });
  }

  // If ID starts with 'g2b-', it's a real G2B bid
  if (id.startsWith('g2b-')) {
    // Extract bid number from ID (format: g2b-{bidNtceNo}-{bidNtceOrd})
    const parts = id.replace('g2b-', '').split('-');
    const bidNtceNo = parts[0];

    try {
      // Fetch from G2B API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ''}/api/g2b/bids?limit=1&keyword=${bidNtceNo}`
      );
      const data = await response.json();

      if (data.success && data.data && data.data.length > 0) {
        const bid = data.data.find((b: { bidNumber: string }) => b.bidNumber === bidNtceNo);
        if (bid) {
          return NextResponse.json({
            success: true,
            data: bid,
          });
        }
      }
    } catch (error) {
      console.error('[API] /api/bids/[id] Error:', error);
    }
  }

  // Not found
  return NextResponse.json(
    {
      success: false,
      error: 'Bid not found',
      data: null,
    },
    { status: 404 }
  );
}

export const dynamic = 'force-dynamic';
