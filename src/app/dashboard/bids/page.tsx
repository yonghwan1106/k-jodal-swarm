"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Clock,
  Building2,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { mockBids, bidStats, BidAnnouncement } from "@/lib/mock-data/bids";

function BidCard({ bid }: { bid: BidAnnouncement }) {
  const daysUntilDeadline = Math.ceil(
    (new Date(bid.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

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

  return (
    <Link href={`/dashboard/bids/${bid.id}`}>
      <Card className="p-5 bg-[#1E293B]/60 border-[#334155] hover:border-[#3B82F6]/50 transition-all cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge style={{ backgroundColor: status.bg, color: status.text }}>
              {status.label}
            </Badge>
            {bid.urgency !== 'normal' && (
              <Badge
                style={{
                  backgroundColor: bid.urgency === 'critical' ? '#EF444420' : '#F59E0B20',
                  color: bid.urgency === 'critical' ? '#EF4444' : '#F59E0B'
                }}
              >
                {bid.urgency === 'critical' ? '긴급' : '주의'}
              </Badge>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xl font-bold text-white">{bid.matchScore}</span>
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
            D-{daysUntilDeadline}
          </div>
        </div>

        <p className="text-sm text-[#64748B] mb-4 line-clamp-2">{bid.description}</p>

        {/* AI Insights */}
        {bid.aiInsights.length > 0 && (
          <div className="mb-4 p-3 rounded-lg bg-[#334155]/50">
            <p className="text-xs text-[#64748B] mb-1">AI 분석</p>
            <p className="text-sm text-[#94A3B8] line-clamp-2">{bid.aiInsights[0]}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#334155] gap-3">
          <div>
            <p className="text-lg font-bold text-white">
              {(bid.estimatedPrice / 100000000).toFixed(1)}억원
            </p>
            <p className="text-xs text-[#64748B]">예정가격</p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-base sm:text-lg font-bold text-[#22C55E]">{bid.winProbability}%</p>
              <p className="text-xs text-[#64748B]">낙찰 확률</p>
            </div>

            <div className="text-center">
              <p className="text-base sm:text-lg font-bold text-white">{bid.competitors}</p>
              <p className="text-xs text-[#64748B]">경쟁사</p>
            </div>

            <div className="text-center">
              <div
                className="w-3 h-3 rounded-full mx-auto mb-1"
                style={{ backgroundColor: getRiskColor(bid.riskLevel) }}
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

  const filteredBids = mockBids.filter(bid => {
    if (filter === 'recommended') return bid.status === 'recommended';
    if (filter === 'analyzing') return bid.status === 'analyzing';
    if (filter === 'new') return bid.status === 'new';
    return true;
  }).filter(bid =>
    bid.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bid.agency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">입찰공고</h1>
          <p className="text-sm sm:text-base text-[#94A3B8]">AI가 분석한 입찰 기회를 확인하세요</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-[#22C55E]/20 text-[#22C55E]">
            오늘 스캔: {bidStats.totalScanned.toLocaleString()}건
          </Badge>
        </div>
      </div>

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
            전체 ({mockBids.length})
          </Button>
          <Button
            variant={filter === 'recommended' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('recommended')}
            className={`flex-shrink-0 ${filter === 'recommended' ? 'bg-[#22C55E]' : 'border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]'}`}
          >
            <Sparkles className="w-4 h-4 mr-1" />
            AI 추천 ({mockBids.filter(b => b.status === 'recommended').length})
          </Button>
          <Button
            variant={filter === 'analyzing' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('analyzing')}
            className={`flex-shrink-0 ${filter === 'analyzing' ? 'bg-[#A855F7]' : 'border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]'}`}
          >
            분석 중 ({mockBids.filter(b => b.status === 'analyzing').length})
          </Button>
          <Button
            variant={filter === 'new' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('new')}
            className={`flex-shrink-0 ${filter === 'new' ? 'bg-[#64748B]' : 'border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]'}`}
          >
            신규 ({mockBids.filter(b => b.status === 'new').length})
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
              <p className="text-lg sm:text-xl font-bold text-white">{bidStats.highMatch}</p>
              <p className="text-xs sm:text-sm text-[#64748B] truncate">고매칭 (80+)</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 bg-[#1E293B]/40 border-[#334155]">
          <div className="flex items-center gap-2 sm:gap-3">
            <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[#F59E0B] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-bold text-white">{bidStats.deadlineSoon}</p>
              <p className="text-xs sm:text-sm text-[#64748B] truncate">마감 임박</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 bg-[#1E293B]/40 border-[#334155]">
          <div className="flex items-center gap-2 sm:gap-3">
            <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-[#EF4444] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-bold text-white">
                {mockBids.filter(b => b.riskLevel === 'high').length}
              </p>
              <p className="text-xs sm:text-sm text-[#64748B] truncate">고위험 공고</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4 bg-[#1E293B]/40 border-[#334155]">
          <div className="flex items-center gap-2 sm:gap-3">
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-[#F59E0B] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-bold text-white">{bidStats.avgMatchScore}점</p>
              <p className="text-xs sm:text-sm text-[#64748B] truncate">평균 매칭</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bids grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredBids.map((bid) => (
          <BidCard key={bid.id} bid={bid} />
        ))}
      </div>

      {filteredBids.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#64748B]">해당 조건에 맞는 공고가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
