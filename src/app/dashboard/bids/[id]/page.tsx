"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Building2,
  Clock,
  FileText,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Sparkles,
  Download,
  FlaskConical,
  PenTool,
  Phone,
  ExternalLink,
  Shield,
  Target,
  BarChart3
} from "lucide-react";
import { getBidById } from "@/lib/mock-data/bids";
import { getSimulationById } from "@/lib/mock-data/simulations";

export default function BidDetailPage() {
  const params = useParams();
  const bidId = params.id as string;
  const bid = getBidById(bidId);
  const simulation = getSimulationById(bidId);

  if (!bid) {
    return (
      <div className="text-center py-12">
        <p className="text-[#64748B]">공고를 찾을 수 없습니다.</p>
        <Link href="/dashboard/bids" className="text-[#3B82F6] hover:underline mt-2 inline-block">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const daysUntilDeadline = Math.ceil(
    (new Date(bid.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href="/dashboard/bids"
        className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        입찰공고 목록
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge className="bg-[#3B82F6]/20 text-[#3B82F6]">{bid.category}</Badge>
            <Badge className="bg-[#22C55E]/20 text-[#22C55E]">AI 추천</Badge>
            {bid.urgency !== 'normal' && (
              <Badge className="bg-[#F59E0B]/20 text-[#F59E0B]">
                {bid.urgency === 'critical' ? '긴급' : '주의'}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{bid.title}</h1>
          <div className="flex items-center gap-6 text-[#94A3B8]">
            <span className="flex items-center gap-2">
              <Building2 className="w-4 h-4" /> {bid.agency}
            </span>
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> {bid.bidNumber}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> D-{daysUntilDeadline}
            </span>
          </div>
        </div>

        {/* Score card */}
        <Card className="p-6 bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-[#334155] min-w-[200px]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-[#F59E0B]" />
              <span className="text-4xl font-bold text-white">{bid.matchScore}</span>
            </div>
            <p className="text-sm text-[#64748B] mb-4">매칭 점수</p>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#22C55E]">{bid.winProbability}%</p>
                <p className="text-xs text-[#64748B]">낙찰 확률</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="flex items-center gap-3">
        <Link href={`/dashboard/simulation?bidId=${bid.id}`}>
          <Button className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">
            <FlaskConical className="w-4 h-4 mr-2" />
            시뮬레이션 실행
          </Button>
        </Link>
        <Link href={`/dashboard/proposals?bidId=${bid.id}`}>
          <Button variant="outline" className="border-[#334155] text-white hover:bg-[#1E293B]">
            <PenTool className="w-4 h-4 mr-2" />
            제안서 작성
          </Button>
        </Link>
        <Button variant="outline" className="border-[#334155] text-white hover:bg-[#1E293B]">
          <Download className="w-4 h-4 mr-2" />
          첨부파일 다운로드
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-[#1E293B] border border-[#334155]">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#334155]">개요</TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-[#334155]">AI 분석</TabsTrigger>
          <TabsTrigger value="strategy" className="data-[state=active]:bg-[#334155]">전략</TabsTrigger>
          <TabsTrigger value="requirements" className="data-[state=active]:bg-[#334155]">참가자격</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
                <h3 className="font-semibold text-white mb-4">사업 개요</h3>
                <p className="text-[#94A3B8] leading-relaxed">{bid.description}</p>
              </Card>

              <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
                <h3 className="font-semibold text-white mb-4">AI 추천 이유</h3>
                <ul className="space-y-3">
                  {bid.aiInsights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                      <span className="text-[#94A3B8]">{insight}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
                <h3 className="font-semibold text-white mb-4">첨부파일</h3>
                <div className="space-y-2">
                  {bid.attachments.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#334155]/50 hover:bg-[#334155] transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#3B82F6]" />
                        <span className="text-[#94A3B8]">{file}</span>
                      </div>
                      <Download className="w-4 h-4 text-[#64748B]" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
                <h3 className="font-semibold text-white mb-4">입찰 정보</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">예정가격</span>
                    <span className="text-white font-medium">
                      {(bid.estimatedPrice / 100000000).toFixed(1)}억원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">입찰방식</span>
                    <span className="text-white">{bid.bidType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">마감일시</span>
                    <span className="text-white">
                      {new Date(bid.deadline).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">공고일</span>
                    <span className="text-white">{bid.publishedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">담당자</span>
                    <span className="text-white">{bid.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">연락처</span>
                    <span className="text-white">{bid.contactPhone}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
                <h3 className="font-semibold text-white mb-4">경쟁 분석</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">예상 경쟁사</span>
                    <span className="text-xl font-bold text-white">{bid.competitors}개</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">리스크 레벨</span>
                    <Badge
                      style={{
                        backgroundColor: bid.riskLevel === 'low' ? '#22C55E20' : bid.riskLevel === 'medium' ? '#F59E0B20' : '#EF444420',
                        color: bid.riskLevel === 'low' ? '#22C55E' : bid.riskLevel === 'medium' ? '#F59E0B' : '#EF4444'
                      }}
                    >
                      {bid.riskLevel === 'low' ? '낮음' : bid.riskLevel === 'medium' ? '중간' : '높음'}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#3B82F6]" />
                경쟁사 분석
              </h3>
              {simulation?.competitors ? (
                <div className="space-y-4">
                  {simulation.competitors.map((comp, i) => (
                    <div key={i} className="p-4 rounded-lg bg-[#334155]/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{comp.name}</span>
                        <span className="text-[#94A3B8]">예상 점수: {comp.estimatedScore}</span>
                      </div>
                      <div className="mb-2">
                        <p className="text-xs text-[#64748B] mb-1">강점</p>
                        <div className="flex flex-wrap gap-1">
                          {comp.strengths.map((s, j) => (
                            <Badge key={j} variant="outline" className="text-xs border-[#22C55E]/30 text-[#22C55E]">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[#64748B] mb-1">약점</p>
                        <div className="flex flex-wrap gap-1">
                          {comp.weaknesses.map((w, j) => (
                            <Badge key={j} variant="outline" className="text-xs border-[#EF4444]/30 text-[#EF4444]">
                              {w}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#64748B]">시뮬레이션을 실행하면 상세 분석을 확인할 수 있습니다.</p>
              )}
            </Card>

            <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#A855F7]" />
                낙찰 확률 분석
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#94A3B8]">현재 예상 낙찰 확률</span>
                    <span className="text-2xl font-bold text-[#22C55E]">{bid.winProbability}%</span>
                  </div>
                  <Progress value={bid.winProbability} className="h-3 bg-[#334155]" />
                </div>

                <div className="p-4 rounded-lg bg-[#334155]/50">
                  <p className="text-sm text-[#64748B] mb-3">확률 향상 전략</p>
                  <ul className="space-y-2 text-sm text-[#94A3B8]">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                      최적 가격 전략 적용 시 +8%
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                      기술 제안서 강화 시 +5%
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                      과거 실적 강조 시 +3%
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Strategy Tab */}
        <TabsContent value="strategy" className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#22C55E]" />
                AI 추천 전략
              </h3>
              {simulation?.recommendation ? (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-[#22C55E]/10 to-transparent border border-[#22C55E]/20">
                    <p className="text-sm text-[#64748B] mb-1">최적 제안가</p>
                    <p className="text-2xl font-bold text-white">
                      {(simulation.recommendation.optimalPrice / 100000000).toFixed(2)}억원
                    </p>
                    <p className="text-sm text-[#22C55E]">
                      예상 승률: {simulation.recommendation.expectedWinRate}%
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[#64748B] mb-2">기술 제안서 강조 포인트</p>
                    <ul className="space-y-2">
                      {simulation.recommendation.optimalTechFocus.map((focus, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#94A3B8]">
                          <CheckCircle className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                          {focus}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm text-[#64748B] mb-2">전략 근거</p>
                    <ul className="space-y-2">
                      {simulation.recommendation.reasoning.map((reason, i) => (
                        <li key={i} className="text-sm text-[#94A3B8]">• {reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#64748B] mb-4">시뮬레이션을 실행하여 최적 전략을 확인하세요</p>
                  <Link href={`/dashboard/simulation?bidId=${bid.id}`}>
                    <Button className="bg-[#3B82F6]">
                      <FlaskConical className="w-4 h-4 mr-2" />
                      시뮬레이션 실행
                    </Button>
                  </Link>
                </div>
              )}
            </Card>

            <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                리스크 요인
              </h3>
              {simulation?.recommendation?.riskFactors ? (
                <ul className="space-y-3">
                  {simulation.recommendation.riskFactors.map((risk, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#F59E0B]/5 border border-[#F59E0B]/20">
                      <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <span className="text-[#94A3B8]">{risk}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#64748B]">시뮬레이션 실행 후 리스크 요인을 확인할 수 있습니다.</p>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Requirements Tab */}
        <TabsContent value="requirements" className="mt-6">
          <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
            <h3 className="font-semibold text-white mb-6">참가자격 요건</h3>
            <div className="space-y-4">
              {bid.requirements.map((req, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#334155]/50"
                >
                  <CheckCircle className="w-6 h-6 text-[#22C55E] flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-white">{req}</p>
                    <p className="text-sm text-[#22C55E] mt-1">충족</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#22C55E]" />
                <div>
                  <p className="font-medium text-white">AI 검증 결과: 참가 가능</p>
                  <p className="text-sm text-[#94A3B8]">모든 참가자격 요건을 충족합니다.</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
