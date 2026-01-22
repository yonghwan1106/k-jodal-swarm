"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination, PageSizeSelector } from "@/components/ui/pagination";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Clock,
  Building2,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Wifi,
  WifiOff
} from "lucide-react";
import { useBids } from "@/hooks/useBids";
import { BidResponse } from "@/lib/api";

// Extended type for G2B API raw fields
type BidWithRawFields = BidResponse & {
  closeDateTime?: string;
  bidNtceDt?: string;
  publishDate?: string;
};

function BidCardSkeleton() {
  return (
    <Card className="p-5 bg-[#1E293B]/60 border-[#334155] animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-6 w-20 bg-[#334155] rounded" />
        <div className="h-8 w-16 bg-[#334155] rounded" />
      </div>
      <div className="h-6 w-3/4 bg-[#334155] rounded mb-2" />
      <div className="h-4 w-1/2 bg-[#334155] rounded mb-4" />
      <div className="h-16 w-full bg-[#334155] rounded mb-4" />
      <div className="flex justify-between pt-4 border-t border-[#334155]">
        <div className="h-8 w-24 bg-[#334155] rounded" />
        <div className="h-8 w-32 bg-[#334155] rounded" />
      </div>
    </Card>
  );
}

function BidCard({ bid }: { bid: BidWithRawFields }) {
  const deadline = bid.deadline || (bid as BidWithRawFields).closeDateTime;
  const daysUntilDeadline = deadline
    ? Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recommended': return { bg: '#22C55E20', text: '#22C55E', label: 'AI 추천' };
      case 'analyzing': return { bg: '#A855F720', text: '#A855F7', label: '분석 중' };
      case 'preparing': return { bg: '#3B82F620', text: '#3B82F6', label: '준비 중' };
      default: return { bg: '#64748B20', text: '#64748B', label: '신규' };
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#22C55E';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#64748B';
    }
  };

  const status = getStatusColor(bid.status);
  const matchScore = bid.matchScore;
  const winProbability = bid.winProbability;
  const competitors = bid.competitors;
  const riskLevel = bid.riskLevel;
  const aiInsights = bid.aiInsights.length > 0 ? bid.aiInsights : ['AI 분석 데이터를 수집 중입니다...'];
  const urgency = bid.urgency;

  return (
    <Link href={`/dashboard/bids/${bid.id}`}>
      <Card className="p-5 bg-[#1E293B]/60 border-[#334155] hover:border-[#3B82F6]/50 transition-all cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge style={{ backgroundColor: status.bg, color: status.text }}>
              {status.label}
            </Badge>
            {urgency !== 'normal' && (
              <Badge
                style={{
                  backgroundColor: urgency === 'critical' ? '#EF444420' : '#F59E0B20',
                  color: urgency === 'critical' ? '#EF4444' : '#F59E0B'
                }}
              >
                {urgency === 'critical' ? '긴급' : '주의'}
              </Badge>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xl font-bold text-white">{matchScore}</span>
            </div>
            <p className="text-xs text-[#64748B]">매칭 점수</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#3B82F6] transition-colors">
          {bid.title}
        </h3>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-[#94A3B8]">
            <Building2 className="w-4 h-4" />
            {bid.agency}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#94A3B8]">
            <Clock className="w-4 h-4" />
            {daysUntilDeadline > 0 ? `D-${daysUntilDeadline}` : '마감'}
          </div>
        </div>

        <p className="text-sm text-[#64748B] mb-4 line-clamp-2">{bid.description || bid.title}</p>

        {/* AI Insights */}
        <div className="mb-4 p-3 rounded-lg bg-[#334155]/50">
          <p className="text-xs text-[#64748B] mb-1">AI 분석</p>
          <p className="text-sm text-[#94A3B8] line-clamp-2">{aiInsights[0]}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#334155] gap-3">
          <div>
            <p className="text-lg font-bold text-white">
              {bid.estimatedPrice
                ? (bid.estimatedPrice / 100000000).toFixed(1) + '억원'
                : '가격 미정'}
            </p>
            <p className="text-xs text-[#64748B]">예정가격</p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-base sm:text-lg font-bold text-[#22C55E]">{winProbability}%</p>
              <p className="text-xs text-[#64748B]">낙찰 확률</p>
            </div>

            <div className="text-center">
              <p className="text-base sm:text-lg font-bold text-white">{competitors}</p>
              <p className="text-xs text-[#64748B]">경쟁사</p>
            </div>

            <div className="text-center">
              <div
                className="w-3 h-3 rounded-full mx-auto mb-1"
                style={{ backgroundColor: getRiskColor(riskLevel) }}
              />
              <p className="text-xs text-[#64748B]">리스크</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <span className="text-sm text-[#3B82F6] group-hover:underline flex items-center gap-1">
            상세 분석 보기 <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

export default function BidsPage() {
  const [filter, setFilter] = useState<'all' | 'recommended' | 'analyzing' | 'new'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Use real API with useBids hook
  const { bids, loading, error, isFallback, stats, refetch } = useBids({
    keyword: searchTerm || undefined,
    autoRefresh: true,
    refreshInterval: 5 * 60 * 1000, // 5분마다 자동 갱신
  });

  const filteredBids = useMemo(() => {
    return bids.filter(bid => {
      if (filter === 'recommended') return bid.status === 'recommended';
      if (filter === 'analyzing') return bid.status === 'analyzing';
      if (filter === 'new') return bid.status === 'new';
      return true;
    }).filter(bid =>
      bid.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.agency.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [bids, filter, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredBids.length / pageSize);
  const paginatedBids = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredBids.slice(startIndex, startIndex + pageSize);
  }, [filteredBids, currentPage, pageSize]);

  // Reset to page 1 when filter or search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  // Virtual list setup for 2-column grid
  const parentRef = useRef<HTMLDivElement>(null);
  const rowCount = Math.ceil(paginatedBids.length / 2);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 380, // Estimated row height
    overscan: 3,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">입찰공고</h1>
          <p className="text-sm sm:text-base text-[#94A3B8]">AI가 분석한 입찰 기회를 확인하세요</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Live/Mock 상태 표시 */}
          <Badge
            className={isFallback
              ? "bg-[#F59E0B]/20 text-[#F59E0B]"
              : "bg-[#22C55E]/20 text-[#22C55E]"
            }
          >
            {isFallback ? (
              <><WifiOff className="w-3 h-3 mr-1" /> Mock 데이터</>
            ) : (
              <><Wifi className="w-3 h-3 mr-1" /> 실시간</>
            )}
          </Badge>
          <Badge className="bg-[#22C55E]/20 text-[#22C55E]">
            오늘 스캔: {stats.totalScanned.toLocaleString()}건
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={loading}
            className="border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg">
          <p className="text-[#EF4444] text-sm">{error}</p>
        </div>
      )}

      {/* Search and filters */}
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
        <div className="relative flex-1 lg:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="공고명 또는 발주기관 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#1E293B] border border-[#334155] text-white placeholder-[#64748B] text-sm focus:outline-none focus:border-[#3B82F6]"
            aria-label="입찰공고 검색"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className={`flex-shrink-0 ${filter === 'all' ? 'bg-[#3B82F6]' : 'border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]'}`}
          >
            전체 ({bids.length})
          </Button>
          <Button
            variant={filter === 'recommended' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('recommended')}
            className={`flex-shrink-0 ${filter === 'recommended' ? 'bg-[#22C55E]' : 'border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]'}`}
          >
            <Sparkles className="w-4 h-4 mr-1" />
            AI 추천 ({bids.filter(b => b.status === 'recommended').length})
          </Button>
          <Button
            variant={filter === 'analyzing' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('analyzing')}
            className={`flex-shrink-0 ${filter === 'analyzing' ? 'bg-[#A855F7]' : 'border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]'}`}
          >
            분석 중 ({bids.filter(b => b.status === 'analyzing').length})
          </Button>
          <Button
            variant={filter === 'new' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('new')}
            className={`flex-shrink-0 ${filter === 'new' ? 'bg-[#64748B]' : 'border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]'}`}
          >
            신규 ({bids.filter(b => b.status === 'new').length})
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0 border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]">
            <SlidersHorizontal className="w-4 h-4 mr-1" />
            필터
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4 bg-[#1E293B]/40 border-[#334155]">
          <div className="flex items-center gap-2 sm:gap-3">
            <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-[#22C55E] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-bold text-white">{stats.highMatch}</p>
              <p className="text-xs sm:text-sm text-[#64748B] truncate">고매칭 (80+)</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 bg-[#1E293B]/40 border-[#334155]">
          <div className="flex items-center gap-2 sm:gap-3">
            <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[#F59E0B] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-bold text-white">{stats.deadlineSoon}</p>
              <p className="text-xs sm:text-sm text-[#64748B] truncate">마감 임박</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 bg-[#1E293B]/40 border-[#334155]">
          <div className="flex items-center gap-2 sm:gap-3">
            <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-[#EF4444] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-bold text-white">
                {bids.filter(b => b.riskLevel === 'high').length}
              </p>
              <p className="text-xs sm:text-sm text-[#64748B] truncate">고위험 공고</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 bg-[#1E293B]/40 border-[#334155]">
          <div className="flex items-center gap-2 sm:gap-3">
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-[#F59E0B] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-bold text-white">{stats.avgMatchScore}점</p>
              <p className="text-xs sm:text-sm text-[#64748B] truncate">평균 매칭</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Loading state */}
      {loading && bids.length === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" aria-busy="true" aria-label="입찰공고 로딩 중">
          {[...Array(4)].map((_, i) => (
            <BidCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Virtualized Bids grid */}
      {(!loading || bids.length > 0) && paginatedBids.length > 0 && (
        <div
          ref={parentRef}
          className="h-[calc(100vh-500px)] min-h-[400px] overflow-auto"
          style={{ contain: "strict" }}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const rowIndex = virtualRow.index;
              const leftBid = paginatedBids[rowIndex * 2];
              const rightBid = paginatedBids[rowIndex * 2 + 1];

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
                    {leftBid && <BidCard bid={leftBid as BidWithRawFields} />}
                    {rightBid && <BidCard bid={rightBid as BidWithRawFields} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredBids.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#334155]">
          <div className="flex items-center gap-4">
            <p className="text-sm text-[#94A3B8]">
              총 <span className="font-medium text-white">{filteredBids.length}</span>건 중{" "}
              <span className="font-medium text-white">
                {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredBids.length)}
              </span>건 표시
            </p>
            <PageSizeSelector
              pageSize={pageSize}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
              options={[10, 20, 50, 100]}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {filteredBids.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-[#64748B]">해당 조건에 맞는 공고가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
