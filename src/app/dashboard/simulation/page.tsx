"use client";

import { useState, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  FlaskConical,
  Play,
  BarChart3,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Brain,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockBids } from "@/lib/mock-data/bids";
import { simulationResults, SimulationScenario } from "@/lib/mock-data/simulations";

export default function SimulationPage() {
  const [selectedBid, setSelectedBid] = useState(mockBids[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [iterations, setIterations] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [priceInput, setPriceInput] = useState(selectedBid.estimatedPrice * 0.92);
  const [techScore, setTechScore] = useState(88);

  const simulation = useMemo(() =>
    simulationResults[selectedBid.id] || simulationResults['bid-2024-001'],
    [selectedBid.id]
  );

  const runSimulation = useCallback(() => {
    setIsSimulating(true);
    setSimulationProgress(0);
    setIterations(0);
    setShowResults(false);

    const totalIterations = 10000;
    const duration = 5000;
    const steps = 100;
    const iterationsPerStep = totalIterations / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setSimulationProgress((currentStep / steps) * 100);
      setIterations(Math.floor(currentStep * iterationsPerStep));

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsSimulating(false);
        setShowResults(true);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const calculateWinProbability = useCallback((price: number, tech: number) => {
    const priceScore = Math.min(100, (selectedBid.estimatedPrice / price) * 100);
    const totalScore = tech * 0.4 + priceScore * 0.6;
    const baseProb = (totalScore - 70) * 3;
    const competitorPenalty = (selectedBid.competitors - 1) * 2;
    return Math.min(95, Math.max(5, baseProb - competitorPenalty));
  }, [selectedBid.estimatedPrice, selectedBid.competitors]);

  const currentWinProb = useMemo(() =>
    calculateWinProbability(priceInput, techScore),
    [calculateWinProbability, priceInput, techScore]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FlaskConical className="w-7 h-7 text-[#A855F7]" />
            디지털 트윈 시뮬레이터
          </h1>
          <p className="text-[#94A3B8]">Monte Carlo 시뮬레이션으로 최적 입찰 전략을 분석합니다</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Left panel - Settings */}
        <div className="lg:col-span-4 space-y-4 lg:space-y-6">
          {/* Bid selector */}
          <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
            <h3 className="font-semibold text-white mb-4">입찰공고 선택</h3>
            <select
              className="w-full p-3 rounded-lg bg-[#334155] border border-[#475569] text-white"
              value={selectedBid.id}
              onChange={(e) => {
                const bid = mockBids.find(b => b.id === e.target.value);
                if (bid) {
                  setSelectedBid(bid);
                  setPriceInput(bid.estimatedPrice * 0.92);
                  setShowResults(false);
                }
              }}
            >
              {mockBids.filter(b => b.status === 'recommended').map(bid => (
                <option key={bid.id} value={bid.id}>{bid.title}</option>
              ))}
            </select>

            <div className="mt-4 p-4 rounded-lg bg-[#334155]/50">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#64748B]">발주기관</span>
                <span className="text-white">{selectedBid.agency}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#64748B]">예정가격</span>
                <span className="text-white">{(selectedBid.estimatedPrice / 100000000).toFixed(1)}억원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">예상 경쟁사</span>
                <span className="text-white">{selectedBid.competitors}개</span>
              </div>
            </div>
          </Card>

          {/* Price input */}
          <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#22C55E]" />
              제안가격 설정
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#64748B]">제안가격</span>
                  <span className="text-white font-mono">
                    {(priceInput / 100000000).toFixed(2)}억원
                  </span>
                </div>
                <Slider
                  value={[priceInput]}
                  onValueChange={([value]) => setPriceInput(value)}
                  min={selectedBid.estimatedPrice * 0.8}
                  max={selectedBid.estimatedPrice * 1.0}
                  step={1000000}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-[#64748B]">
                  <span>80%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#334155]/50">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">예정가격 대비</span>
                  <span className="text-[#22C55E]">
                    {((priceInput / selectedBid.estimatedPrice) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Tech score */}
          <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#A855F7]" />
              기술점수 예상
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#64748B]">예상 기술점수</span>
                  <span className="text-white font-mono">{techScore}점</span>
                </div>
                <Slider
                  value={[techScore]}
                  onValueChange={([value]) => setTechScore(value)}
                  min={70}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>
            </div>
          </Card>

          {/* Run simulation button */}
          <Button
            className="w-full py-6 text-lg bg-gradient-to-r from-[#A855F7] to-[#3B82F6]"
            onClick={runSimulation}
            disabled={isSimulating}
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                시뮬레이션 실행 중...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                시뮬레이션 실행 (10,000회)
              </>
            )}
          </Button>

          {/* Current estimate */}
          <Card className="p-6 bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-[#334155]">
            <div className="text-center">
              <p className="text-sm text-[#64748B] mb-2">현재 설정 기준 예상 낙찰 확률</p>
              <p className="text-5xl font-bold text-white mb-2">{Math.round(currentWinProb)}%</p>
              <Progress value={currentWinProb} className="h-2 bg-[#334155]" />
            </div>
          </Card>
        </div>

        {/* Right panel - Results */}
        <div className="lg:col-span-8 space-y-4 lg:space-y-6">
          {/* Simulation progress */}
          <AnimatePresence>
            {isSimulating && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-6 bg-[#1E293B]/60 border-[#A855F7]/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
                      <FlaskConical className="w-6 h-6 text-[#A855F7] animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Monte Carlo 시뮬레이션 실행 중</h3>
                      <p className="text-sm text-[#64748B]">다양한 시나리오를 분석하고 있습니다...</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#94A3B8]">진행률</span>
                      <span className="text-white">{iterations.toLocaleString()} / 10,000</span>
                    </div>
                    <Progress value={simulationProgress} className="h-3 bg-[#334155]" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4">
                    <div className="text-center p-2 sm:p-3 rounded-lg bg-[#334155]/50">
                      <p className="text-xs text-[#64748B]">경쟁사 모델</p>
                      <p className="text-white font-medium text-sm sm:text-base">분석 중</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 rounded-lg bg-[#334155]/50">
                      <p className="text-xs text-[#64748B]">가격 시나리오</p>
                      <p className="text-white font-medium text-sm sm:text-base">계산 중</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 rounded-lg bg-[#334155]/50">
                      <p className="text-xs text-[#64748B]">리스크 분석</p>
                      <p className="text-white font-medium text-sm sm:text-base">대기 중</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 rounded-lg bg-[#334155]/50">
                      <p className="text-xs text-[#64748B]">최적화</p>
                      <p className="text-white font-medium text-sm sm:text-base">대기 중</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Recommendation card */}
                <Card className="p-6 bg-gradient-to-br from-[#22C55E]/10 to-[#1E293B] border-[#22C55E]/30">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#22C55E]/20 flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-[#22C55E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">AI 추천 전략</h3>
                      <p className="text-[#94A3B8] mb-4">10,000회 시뮬레이션 분석 결과</p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                        <div className="p-3 sm:p-4 rounded-lg bg-[#1E293B]">
                          <p className="text-xs sm:text-sm text-[#64748B]">최적 제안가</p>
                          <p className="text-xl sm:text-2xl font-bold text-white">
                            {(simulation.recommendation.optimalPrice / 100000000).toFixed(2)}억
                          </p>
                        </div>
                        <div className="p-3 sm:p-4 rounded-lg bg-[#1E293B]">
                          <p className="text-xs sm:text-sm text-[#64748B]">예상 낙찰 확률</p>
                          <p className="text-xl sm:text-2xl font-bold text-[#22C55E]">
                            {simulation.recommendation.expectedWinRate}%
                          </p>
                        </div>
                        <div className="p-3 sm:p-4 rounded-lg bg-[#1E293B]">
                          <p className="text-xs sm:text-sm text-[#64748B]">신뢰도</p>
                          <p className="text-xl sm:text-2xl font-bold text-[#3B82F6]">
                            {simulation.recommendation.confidenceLevel}%
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <Button className="bg-[#22C55E] hover:bg-[#16A34A] w-full sm:w-auto">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          이 전략으로 제안서 작성
                        </Button>
                        <Button variant="outline" className="border-[#334155] text-white hover:bg-[#1E293B] w-full sm:w-auto">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          상세 리포트 보기
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Scenarios comparison */}
                <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#3B82F6]" />
                    시나리오 비교
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#334155]">
                          <th className="text-left py-3 px-4 text-sm text-[#64748B]">시나리오</th>
                          <th className="text-right py-3 px-4 text-sm text-[#64748B]">제안가</th>
                          <th className="text-right py-3 px-4 text-sm text-[#64748B]">기술점수</th>
                          <th className="text-right py-3 px-4 text-sm text-[#64748B]">가격점수</th>
                          <th className="text-right py-3 px-4 text-sm text-[#64748B]">총점</th>
                          <th className="text-right py-3 px-4 text-sm text-[#64748B]">낙찰 확률</th>
                          <th className="text-right py-3 px-4 text-sm text-[#64748B]">순위</th>
                        </tr>
                      </thead>
                      <tbody>
                        {simulation.scenarios.map((scenario: SimulationScenario) => (
                          <tr
                            key={scenario.id}
                            className={`border-b border-[#334155]/50 ${scenario.recommendation ? 'bg-[#22C55E]/5' : ''}`}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="text-white">{scenario.name}</span>
                                {scenario.recommendation && (
                                  <Badge className="bg-[#22C55E]/20 text-[#22C55E] text-xs">
                                    {scenario.recommendation}
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="text-right py-3 px-4 text-white font-mono">
                              {(scenario.proposedPrice / 100000000).toFixed(2)}억
                            </td>
                            <td className="text-right py-3 px-4 text-[#94A3B8]">{scenario.techScore}</td>
                            <td className="text-right py-3 px-4 text-[#94A3B8]">{scenario.priceScore}</td>
                            <td className="text-right py-3 px-4 text-white font-medium">{scenario.totalScore}</td>
                            <td className="text-right py-3 px-4">
                              <span className={`font-bold ${scenario.winProbability >= 70 ? 'text-[#22C55E]' : scenario.winProbability >= 50 ? 'text-[#F59E0B]' : 'text-[#94A3B8]'}`}>
                                {scenario.winProbability}%
                              </span>
                            </td>
                            <td className="text-right py-3 px-4 text-[#94A3B8]">#{scenario.rank}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Competitor analysis */}
                <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#A855F7]" />
                    경쟁사 분석
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {simulation.competitors.map((comp, i) => (
                      <div key={i} className="p-3 sm:p-4 rounded-lg bg-[#334155]/50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-white">{comp.name}</span>
                          <span className="text-[#94A3B8] text-sm">
                            예상 점수: {comp.estimatedScore}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#64748B]">예상 제안가</span>
                          <span className="text-white">
                            {(comp.predictedPrice / 100000000).toFixed(2)}억원
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {comp.strengths.slice(0, 2).map((s, j) => (
                            <Badge key={j} variant="outline" className="text-xs border-[#22C55E]/30 text-[#22C55E]">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Risk factors */}
                <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                    주의 사항
                  </h3>
                  <div className="space-y-3">
                    {simulation.recommendation.riskFactors.map((risk, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#F59E0B]/5 border border-[#F59E0B]/20">
                        <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                        <span className="text-[#94A3B8]">{risk}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!isSimulating && !showResults && (
            <Card className="p-12 bg-[#1E293B]/40 border-[#334155] text-center">
              <FlaskConical className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">시뮬레이션 대기 중</h3>
              <p className="text-[#94A3B8] mb-6">
                왼쪽에서 입찰공고를 선택하고 제안가격을 설정한 후
                <br />
                시뮬레이션을 실행해주세요.
              </p>
              <p className="text-sm text-[#64748B]">
                Monte Carlo 시뮬레이션이 10,000개의 시나리오를 분석하여
                <br />
                최적의 입찰 전략을 추천해드립니다.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
