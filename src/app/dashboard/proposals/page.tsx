"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  PenTool,
  FileText,
  CheckCircle,
  Clock,
  Loader2,
  Play,
  Download,
  Eye,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockBids } from "@/lib/mock-data/bids";

interface GenerationStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed';
  progress: number;
}

const proposalSections = [
  { id: 'understanding', title: '1. 사업이해', content: '' },
  { id: 'strategy', title: '2. 추진전략', content: '' },
  { id: 'methodology', title: '3. 수행방법론', content: '' },
  { id: 'organization', title: '4. 조직구성', content: '' },
  { id: 'schedule', title: '5. 추진일정', content: '' },
  { id: 'quality', title: '6. 품질관리', content: '' },
];

export default function ProposalsPage() {
  const [selectedBid, setSelectedBid] = useState(mockBids.find(b => b.status === 'recommended') || mockBids[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentSection, setCurrentSection] = useState(0);

  const [steps, setSteps] = useState<GenerationStep[]>([
    { id: 'analyze', name: 'RFP 분석', description: '제안요청서 핵심 요구사항 추출', status: 'pending', progress: 0 },
    { id: 'collect', name: '정보 수집', description: '기업 정보 및 실적 데이터 수집', status: 'pending', progress: 0 },
    { id: 'strategy', name: '전략 수립', description: '최적 제안 전략 설계', status: 'pending', progress: 0 },
    { id: 'draft', name: '초안 작성', description: '기술제안서 초안 생성', status: 'pending', progress: 0 },
    { id: 'verify', name: '검증', description: '품질 검증 및 자격 확인', status: 'pending', progress: 0 },
  ]);

  const sampleContent = `본 사업은 ${selectedBid.agency}에서 추진하는 ${selectedBid.title}으로, 공공기관의 디지털 전환 가속화를 위한 핵심 사업입니다.

테크소프트 주식회사는 지난 10년간 축적된 전자정부 구축 경험과 AI/클라우드 분야의 기술 역량을 바탕으로 본 사업의 성공적 수행을 위한 최적의 파트너입니다.

■ 사업의 핵심 목표
- 클라우드 네이티브 기반 시스템 아키텍처 현대화
- AI 기반 자동화로 업무 효율성 극대화
- 제로트러스트 보안 체계 구축

■ 당사의 차별화 역량
- 유사 프로젝트 5건 성공 수행 (행정안전부, 국토교통부 등)
- ISO 27001, ISMS-P 보안 인증 보유
- 클라우드 전문 인력 28명 보유

■ 기대 효과
- 시스템 응답 속도 50% 개선
- 운영 비용 30% 절감
- 보안 사고 위험 90% 감소`;

  const startGeneration = () => {
    setIsGenerating(true);
    setGenerationComplete(false);
    setCurrentStep(0);
    setTypingText('');
    setCurrentSection(0);
    setSteps(steps.map(s => ({ ...s, status: 'pending', progress: 0 })));

    // Simulate step-by-step generation
    let stepIndex = 0;

    const processStep = () => {
      if (stepIndex >= steps.length) {
        setIsGenerating(false);
        setGenerationComplete(true);
        return;
      }

      setSteps(prev => prev.map((s, i) => ({
        ...s,
        status: i === stepIndex ? 'running' : i < stepIndex ? 'completed' : 'pending'
      })));

      setCurrentStep(stepIndex);

      // Simulate progress
      let progress = 0;
      const progressTimer = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressTimer);

          setSteps(prev => prev.map((s, i) => ({
            ...s,
            progress: i === stepIndex ? 100 : s.progress,
            status: i === stepIndex ? 'completed' : s.status
          })));

          stepIndex++;
          setTimeout(processStep, 500);
        } else {
          setSteps(prev => prev.map((s, i) => ({
            ...s,
            progress: i === stepIndex ? progress : s.progress
          })));
        }
      }, 100);
    };

    processStep();
  };

  // Typing effect for proposal content
  useEffect(() => {
    if (generationComplete && typingText.length < sampleContent.length) {
      const timer = setTimeout(() => {
        setTypingText(sampleContent.slice(0, typingText.length + 3));
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [generationComplete, typingText]);

  const recommendedBids = mockBids.filter(b => b.status === 'recommended');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <PenTool className="w-7 h-7 text-[#22C55E]" />
            제안서 자동 작성
          </h1>
          <p className="text-[#94A3B8]">AI가 기술제안서를 자동으로 작성합니다</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left panel - Settings */}
        <div className="col-span-4 space-y-6">
          {/* Bid selector */}
          <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
            <h3 className="font-semibold text-white mb-4">입찰공고 선택</h3>
            <select
              className="w-full p-3 rounded-lg bg-[#334155] border border-[#475569] text-white mb-4"
              value={selectedBid.id}
              onChange={(e) => {
                const bid = mockBids.find(b => b.id === e.target.value);
                if (bid) {
                  setSelectedBid(bid);
                  setGenerationComplete(false);
                  setTypingText('');
                }
              }}
            >
              {recommendedBids.map(bid => (
                <option key={bid.id} value={bid.id}>{bid.title}</option>
              ))}
            </select>

            <div className="p-4 rounded-lg bg-[#334155]/50">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#64748B]">발주기관</span>
                <span className="text-white">{selectedBid.agency}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#64748B]">예정가격</span>
                <span className="text-white">{(selectedBid.estimatedPrice / 100000000).toFixed(1)}억원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">마감일</span>
                <span className="text-white">{new Date(selectedBid.deadline).toLocaleDateString('ko-KR')}</span>
              </div>
            </div>
          </Card>

          {/* Generation steps */}
          <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
            <h3 className="font-semibold text-white mb-4">작성 단계</h3>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    step.status === 'completed' ? 'bg-[#22C55E]/20' :
                    step.status === 'running' ? 'bg-[#3B82F6]/20' :
                    'bg-[#334155]'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                    ) : step.status === 'running' ? (
                      <Loader2 className="w-4 h-4 text-[#3B82F6] animate-spin" />
                    ) : (
                      <span className="text-xs text-[#64748B]">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      step.status === 'completed' ? 'text-[#22C55E]' :
                      step.status === 'running' ? 'text-white' :
                      'text-[#64748B]'
                    }`}>{step.name}</p>
                    <p className="text-xs text-[#64748B]">{step.description}</p>
                    {step.status === 'running' && (
                      <Progress value={step.progress} className="h-1 mt-2 bg-[#334155]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Start button */}
          <Button
            className="w-full py-6 text-lg bg-gradient-to-r from-[#22C55E] to-[#16A34A]"
            onClick={startGeneration}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                제안서 작성 중...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                제안서 작성 시작
              </>
            )}
          </Button>

          {/* Checklist */}
          {generationComplete && (
            <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                품질 검증 완료
              </h3>
              <div className="space-y-2">
                {[
                  '참가자격 요건 충족 확인',
                  '필수 제출서류 목록 확인',
                  'RFP 요구사항 매핑 완료',
                  '예정가격 범위 적정성 확인',
                  '기술점수 예상 88점'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-[#94A3B8]">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right panel - Preview */}
        <div className="col-span-8">
          <Card className="bg-[#1E293B]/40 border-[#334155] h-full">
            <div className="p-4 border-b border-[#334155] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#3B82F6]" />
                <h3 className="font-semibold text-white">제안서 미리보기</h3>
              </div>
              {generationComplete && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-[#334155] text-white hover:bg-[#1E293B]">
                    <Eye className="w-4 h-4 mr-1" />
                    전체 보기
                  </Button>
                  <Button size="sm" className="bg-[#3B82F6]">
                    <Download className="w-4 h-4 mr-1" />
                    다운로드
                  </Button>
                </div>
              )}
            </div>

            <div className="p-6">
              {!isGenerating && !generationComplete ? (
                <div className="text-center py-20">
                  <PenTool className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">제안서 작성 대기 중</h3>
                  <p className="text-[#94A3B8] mb-6">
                    입찰공고를 선택하고 제안서 작성을 시작해주세요.
                    <br />
                    AI가 RFP를 분석하고 최적의 기술제안서를 작성합니다.
                  </p>
                </div>
              ) : isGenerating ? (
                <div className="text-center py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 mx-auto mb-6"
                  >
                    <PenTool className="w-full h-full text-[#22C55E]" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {steps[currentStep]?.name || '처리 중'}...
                  </h3>
                  <p className="text-[#94A3B8]">
                    {steps[currentStep]?.description || '잠시만 기다려주세요'}
                  </p>
                  <div className="mt-6 max-w-md mx-auto">
                    <Progress
                      value={(currentStep / steps.length) * 100 + (steps[currentStep]?.progress || 0) / steps.length}
                      className="h-2 bg-[#334155]"
                    />
                    <p className="text-sm text-[#64748B] mt-2">
                      {currentStep + 1} / {steps.length} 단계
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Section tabs */}
                  <div className="flex flex-wrap gap-2">
                    {proposalSections.map((section, i) => (
                      <Button
                        key={section.id}
                        variant={currentSection === i ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentSection(i)}
                        className={currentSection === i ? 'bg-[#3B82F6]' : 'border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]'}
                      >
                        {section.title}
                      </Button>
                    ))}
                  </div>

                  {/* Content area */}
                  <div className="p-6 rounded-lg bg-white/5 min-h-[400px]">
                    <h2 className="text-xl font-bold text-white mb-4">
                      {proposalSections[currentSection].title}
                    </h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-[#94A3B8] whitespace-pre-line leading-relaxed">
                        {typingText}
                        {typingText.length < sampleContent.length && (
                          <span className="inline-block w-2 h-5 bg-[#3B82F6] animate-pulse ml-1" />
                        )}
                      </p>
                    </div>
                  </div>

                  {/* AI notice */}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                    <AlertCircle className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">AI 작성 초안입니다</p>
                      <p className="text-sm text-[#94A3B8]">
                        최종 제출 전 내용을 검토하고 필요시 수정해주세요.
                        Human-in-the-Loop 원칙에 따라 최종 제출은 반드시 승인 후 진행됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
