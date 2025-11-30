"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function ProposalPage() {
  const sections = [
    { id: "intro", label: "기획의도" },
    { id: "architecture", label: "핵심 아키텍처" },
    { id: "features", label: "혁신 기능" },
    { id: "benefits", label: "기대효과" },
    { id: "roadmap", label: "로드맵" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">홈으로</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {section.label}
              </a>
            ))}
          </nav>
          <Link
            href="/dashboard"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            데모 보기
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-6">
              조금 특별한 조달 공모전
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              K-조달 AI 스웜
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              자율 AI 에이전트 군집이 이끄는 차세대 공공조달 생태계
            </p>
            <p className="text-gray-500 italic">
              &ldquo;2025년, AI는 더 이상 도구가 아닙니다. AI 스스로가 일하는 시대가 왔습니다.&rdquo;
            </p>
          </motion.div>

          {/* Tech Tags */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {["AI Agent Swarm", "MCP Protocol", "GraphRAG", "Digital Twin", "Voice Agent", "Computer Use"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <nav className="sticky top-16 z-40 bg-white border-b border-gray-100 py-3 px-6 overflow-x-auto">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <span className="text-sm text-gray-400 mr-4 whitespace-nowrap">Quick Navigation</span>
          <div className="flex gap-4">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm text-gray-600 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                <span className="text-blue-600 font-mono">0{index + 1}</span> {section.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Section 01: 기획의도 */}
      <section id="intro" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-4 mb-12">
            <span className="text-6xl font-light text-blue-600 font-mono">01</span>
            <h2 className="text-3xl font-bold">기획의도</h2>
          </div>

          {/* Quote */}
          <blockquote className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-12 italic text-lg text-gray-700">
            &ldquo;인간과 AI 에이전트 군집(Swarm)의 협업이 다음 프론티어가 될 것입니다.&rdquo;
            <footer className="mt-2 text-sm text-gray-500 not-italic">
              — 사티아 나델라, Microsoft CEO
            </footer>
          </blockquote>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">글로벌 AI 혁명의 현재</h3>
              <p className="text-gray-600 leading-relaxed">
                2025년, 전 세계는 <strong className="text-gray-900">Agentic AI</strong>의 시대로 진입했습니다.
                OpenAI는 2025년 3월 Agentic AI를 핵심 방향으로 발표했고,
                Anthropic의 <strong className="text-gray-900">MCP(Model Context Protocol)</strong>는 AI 업계 표준으로 자리잡았습니다.
                미국 연방 기관은 2022-2024년 <strong className="text-gray-900">56억 달러(약 7.3조원)</strong>를 AI에 투자했으며,
                54개 주의 조달 책임자들은 AI를 2025년 핵심 우선순위로 선정했습니다.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">한국 공공조달의 현실</h3>
              <p className="text-gray-600 leading-relaxed">
                그러나 <strong className="text-gray-900">한국 공공조달 시장은 여전히 20세기에 머물러 있습니다.</strong>
                중소기업은 복잡한 입찰 절차, 수백 페이지의 규정, 전문인력 부재로
                매년 <strong className="text-gray-900">수조 원 규모</strong>의 공공시장 기회를 놓치고 있습니다.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">우리의 해결책</h3>
              <p className="text-gray-600 leading-relaxed">
                본 아이디어는 조달청의 <strong className="text-gray-900">&apos;AI 대전환&apos; 정책</strong>을 실현하기 위해,
                <strong className="text-gray-900">세계 최초로 자율 AI 에이전트 군집(Swarm) 기술</strong>을 공공조달에 적용합니다.
                자연계의 개미 군집, 꿀벌 떼처럼 수십 개의 전문 AI 에이전트가 24시간 자율적으로 협업하여,
                중소기업이 <strong className="text-gray-900">대기업 수준의 조달 전문팀</strong>을 갖춘 것과 동일한 경쟁력을 확보하도록 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: 핵심 아키텍처 */}
      <section id="architecture" className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-4 mb-12">
            <span className="text-6xl font-light text-cyan-400 font-mono">02</span>
            <h2 className="text-3xl font-bold">핵심 아키텍처: AI 에이전트 스웜</h2>
          </div>

          <p className="text-gray-400 text-center mb-12">
            자연계의 군집 지능(Swarm Intelligence)에서 영감을 받은<br />
            창발적 지능(Emergent Intelligence) 기반 시스템
          </p>

          {/* Swarm Architecture */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Scout Swarm */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 border-t-4 border-t-cyan-400">
              <div className="text-4xl mb-4">&#x1F50D;</div>
              <h3 className="text-xl font-bold mb-2">정찰 스웜</h3>
              <p className="text-sm text-gray-400 mb-4">Scout Swarm</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">&gt;</span> 탐색 에이전트
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">&gt;</span> 모니터 에이전트
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">&gt;</span> 알림 에이전트
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">&gt;</span> 경쟁사 추적 에이전트
                </li>
              </ul>
            </div>

            {/* Brain Swarm */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 border-t-4 border-t-purple-500">
              <div className="text-4xl mb-4">&#x1F9E0;</div>
              <h3 className="text-xl font-bold mb-2">두뇌 스웜</h3>
              <p className="text-sm text-gray-400 mb-4">Brain Swarm</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">&gt;</span> 분석 에이전트
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">&gt;</span> 전략 에이전트
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">&gt;</span> 예측 에이전트
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">&gt;</span> 시뮬레이션 에이전트
                </li>
              </ul>
            </div>

            {/* Action Swarm */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 border-t-4 border-t-green-500">
              <div className="text-4xl mb-4">&#x26A1;</div>
              <h3 className="text-xl font-bold mb-2">실행 스웜</h3>
              <p className="text-sm text-gray-400 mb-4">Action Swarm</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">&gt;</span> 작성 에이전트
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">&gt;</span> 검증 에이전트
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">&gt;</span> 제출 에이전트
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">&gt;</span> 협상 에이전트
                </li>
              </ul>
            </div>
          </div>

          {/* Voice Agent */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 rounded-xl">
              <div className="text-3xl mb-2">&#x1F4DE;</div>
              <div className="font-bold">AI 음성 에이전트</div>
              <div className="text-sm text-green-200">24시간 전화 상담</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: 혁신 기능 */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-4 mb-12">
            <span className="text-6xl font-light text-blue-600 font-mono">03</span>
            <h2 className="text-3xl font-bold">혁신 기능</h2>
          </div>

          {/* Feature 1: 자율 정찰 스웜 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-2">혁신 기능 1: 자율 정찰 스웜</h3>
            <p className="text-blue-600 mb-8">&ldquo;AI가 밤새도록 당신을 위해 입찰 기회를 찾습니다&rdquo;</p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  num: 1,
                  title: "탐색 에이전트",
                  desc: "나라장터 실시간 크롤링, 25개 자체조달기관 스캔, 해외 조달시장 모니터링 (UNGM, SAM.gov)"
                },
                {
                  num: 2,
                  title: "매칭 에이전트",
                  desc: "기업 DNA 분석 (기술력, 실적, 인증), 입찰공고와 기업역량 자동 매칭, 낙찰 가능성 점수화 (0-100점)"
                },
                {
                  num: 3,
                  title: "알림 에이전트",
                  desc: "맞춤 알림 (카카오톡, SMS, 이메일), 긴급 마감 경보, 경쟁사 입찰 동향 알림"
                },
                {
                  num: "★",
                  title: "차별점",
                  desc: "기존 서비스: 키워드 검색에 의존 → K-조달 AI 스웜: 첨부파일 내용까지 AI가 이해하고 기업에 맞는 공고를 능동적으로 발굴"
                }
              ].map((item) => (
                <div key={item.num} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {item.num}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Feature 2: 디지털 트윈 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-2">혁신 기능 2: 디지털 트윈 시뮬레이터</h3>
            <p className="text-blue-600 mb-8">&ldquo;수천 개의 과거 입찰을 학습한 AI가 최적 전략을 설계합니다&rdquo;</p>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold mb-4">가상 입찰 환경 구축</h4>
                  <ul className="space-y-3 text-gray-600">
                    <li>&#x1F4CA; 과거 3년 낙찰 데이터</li>
                    <li>&#x1F465; 경쟁사 입찰 패턴</li>
                    <li>&#x1F9D1;&#x200D;&#x2696;&#xFE0F; 평가위원 성향 분석</li>
                    <li>&#x1F4B0; 시장 가격 동향</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-xl">
                  <h4 className="font-bold mb-4">시뮬레이션 결과</h4>
                  <div className="space-y-2 text-sm">
                    <div className="py-2 border-b border-white/20">시나리오 A: <strong>85%</strong> 낙찰 확률</div>
                    <div className="py-2 border-b border-white/20">시나리오 B: <strong>72%</strong> 낙찰 확률</div>
                    <div className="py-2 bg-white/20 rounded-lg px-3 mt-2">
                      <strong>시나리오 C: 91% 낙찰 확률 &#x2713;</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-blue-900">
                  &#x1F3AF; <strong>&ldquo;투찰가 8,723만원 제안 시 낙찰 확률 91.3%&rdquo;</strong><br />
                  &#x1F3AF; <strong>&ldquo;기술제안서 3페이지 보완 시 기술점수 +7점 예상&rdquo;</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: AI 음성 에이전트 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-2">혁신 기능 3: AI 음성 에이전트</h3>
            <p className="text-blue-600 mb-8">&ldquo;전화 한 통으로 모든 조달 업무를 처리합니다&rdquo;</p>

            <div className="bg-gray-100 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-sm p-4 max-w-[80%]">
                    <p className="text-xs text-blue-200 mb-1">&#x1F464; 중소기업 대표</p>
                    여보세요, 이번 주 나온 소프트웨어 입찰 뭐 있어요?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm p-4 max-w-[80%]">
                    <p className="text-xs text-gray-400 mb-1">&#x1F916; K-조달 AI</p>
                    안녕하세요, K-조달 AI입니다.<br /><br />
                    귀사에 적합한 입찰공고 <strong>3건</strong>을 찾았습니다.<br /><br />
                    첫 번째, 행정안전부 <strong>&apos;차세대 전자정부 시스템 구축&apos;</strong><br />
                    예정가격 15억원, 마감 12월 15일입니다.<br />
                    귀사의 낙찰 가능성은 <strong>78%</strong>로 분석됩니다.
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                {[
                  { value: "500ms", label: "응답 지연" },
                  { value: "30+", label: "다국어 지원" },
                  { value: "24/7", label: "무중단 운영" }
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl px-6 py-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 4: 자동화 실행 스웜 */}
          <div>
            <h3 className="text-2xl font-bold mb-2">혁신 기능 4: 자동화 실행 스웜</h3>
            <p className="text-blue-600 mb-8">&ldquo;AI가 직접 서류를 작성하고, 검증하고, 제출합니다&rdquo;</p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  step: "Step 1",
                  color: "cyan",
                  title: "작성 에이전트",
                  items: ["제안요청서(RFP) 자동 분석", "기업 정보 + 과거 실적 수집", "기술제안서 초안 생성", "가격제안서 최적가 산정"]
                },
                {
                  step: "Step 2",
                  color: "purple",
                  title: "검증 에이전트",
                  items: ["참가자격 요건 체크", "결격사유 사전 점검", "필수 첨부서류 확인", "규정 위반 AI 감사"]
                },
                {
                  step: "Step 3",
                  color: "green",
                  title: "제출 에이전트",
                  items: ["나라장터 자동 로그인", "입찰서 양식 자동 작성", "첨부파일 업로드", "인간 승인 후 제출"]
                }
              ].map((item) => (
                <div
                  key={item.step}
                  className={`bg-gray-900 text-white p-6 rounded-xl border-l-4 ${
                    item.color === "cyan" ? "border-l-cyan-400" :
                    item.color === "purple" ? "border-l-purple-500" :
                    "border-l-green-500"
                  }`}
                >
                  <p className={`text-sm mb-2 ${
                    item.color === "cyan" ? "text-cyan-400" :
                    item.color === "purple" ? "text-purple-400" :
                    "text-green-400"
                  }`}>{item.step}</p>
                  <h4 className="font-bold mb-4">{item.title}</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {item.items.map((text, i) => (
                      <li key={i}>&#x27A4; {text}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <strong className="text-green-700">&#x1F6E1; 안전장치:</strong>{" "}
              최종 제출은 반드시 <strong>인간 승인(Human-in-the-Loop)</strong> 필요
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">혁신 포인트 비교</h3>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-6 py-4 text-left font-semibold">구분</th>
                  <th className="px-6 py-4 text-left font-semibold">현재 (As-Is)</th>
                  <th className="px-6 py-4 text-left font-semibold">K-조달 AI 스웜 (To-Be)</th>
                  <th className="px-6 py-4 text-left font-semibold">핵심 기술</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { item: "입찰 탐색", old: "수동 검색, 키워드 의존", new: "AI 스웜이 24시간 자동 탐색", tech: "Agent Swarm" },
                  { item: "규정 이해", old: "법률 전문가 필요", new: "AI가 실시간 해석/적용", tech: "GraphRAG" },
                  { item: "제안서 작성", old: "2-4주 소요", new: "3시간 내 AI 초안 완성", tech: "Fine-tuned LLM" },
                  { item: "자격 검증", old: "누락 시 무효 처리", new: "AI 사전 검증으로 100% 적격", tech: "Rule Engine + AI" },
                  { item: "낙찰 예측", old: "경험 기반 추정", new: "디지털 트윈 91%+ 정확도", tech: "Monte Carlo Sim" },
                  { item: "사용자 인터페이스", old: "복잡한 웹사이트", new: "전화 한 통으로 해결", tech: "AI Voice Agent" },
                  { item: "제출", old: "수동 입력/업로드", new: "AI 자동 작성/제출", tech: "Computer Use" },
                  { item: "투명성", old: "블랙박스", new: "블록체인 기록", tech: "DAO/Smart Contract" }
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 font-semibold">{row.item}</td>
                    <td className="px-6 py-4 text-red-600">{row.old}</td>
                    <td className="px-6 py-4 text-green-600 font-medium">{row.new}</td>
                    <td className="px-6 py-4 text-gray-500">{row.tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 04: 기대효과 */}
      <section id="benefits" className="py-20 px-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-4 mb-12">
            <span className="text-6xl font-light text-white/50 font-mono">04</span>
            <h2 className="text-3xl font-bold">기대 효과</h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: "5천만+", label: "연간 인건비 절감 (원)" },
              { value: "80%", label: "제안서 작성 시간 단축" },
              { value: "30%", label: "낙찰률 향상" },
              { value: "50%", label: "참여율 증가 목표" }
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Benefits by Stakeholder */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "&#x1F3E2;",
                title: "중소기업",
                items: ["조달 전문인력 0명으로 입찰 참여", "제안서 2주 → 3시간 단축", "데이터 기반 낙찰률 향상", "해외 조달시장 진출 지원"]
              },
              {
                icon: "&#x1F3DB;",
                title: "조달청",
                items: ["중소기업 참여율 50% 증가", "부적격 입찰 90% 감소", "행정비용 대폭 절감", "세계 최초 AI 조달 혁신 사례"]
              },
              {
                icon: "&#x1F30F;",
                title: "국가 경제",
                items: ["공공시장 진입 장벽 해소", "2030년 2.5조원 목표 달성", "연간 1조원 수출 산업화", "AI 조달 전문가 일자리 창출"]
              }
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white text-gray-900 rounded-xl p-6 shadow-lg">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl mb-4"
                  dangerouslySetInnerHTML={{ __html: benefit.icon }}
                />
                <h4 className="font-bold text-lg mb-4">{benefit.title}</h4>
                <ul className="space-y-2">
                  {benefit.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-blue-600">&gt;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 05: 로드맵 */}
      <section id="roadmap" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-4 mb-12">
            <span className="text-6xl font-light text-blue-600 font-mono">05</span>
            <h2 className="text-3xl font-bold">구현 로드맵</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                phase: "Phase 1",
                date: "2025 Q4",
                title: "MVP 출시",
                color: "from-cyan-500 to-blue-500",
                items: ["정찰 스웜 개발", "나라장터 API 연동", "GraphRAG v1.0", "베타 테스트 100곳"]
              },
              {
                phase: "Phase 2",
                date: "2026 Q2",
                title: "두뇌 스웜 완성",
                color: "from-blue-500 to-purple-500",
                items: ["디지털 트윈 시뮬레이터", "작성/검증 에이전트", "MCP 연동 확대", "음성 에이전트 파일럿"]
              },
              {
                phase: "Phase 3",
                date: "2026 Q4",
                title: "실행 스웜 완성",
                color: "from-purple-500 to-pink-500",
                items: ["Computer Use 자동 제출", "전체 스웜 통합", "나라장터 공식 연동", "정식 서비스 출시"]
              },
              {
                phase: "Phase 4",
                date: "2027+",
                title: "글로벌 확장",
                color: "from-green-500 to-emerald-500",
                items: ["조달 DAO 파일럿", "해외 시장 연동", "K-조달 표준 국제화", "아시아 국가 수출"]
              }
            ].map((phase) => (
              <div
                key={phase.phase}
                className={`bg-gradient-to-br ${phase.color} text-white rounded-xl p-6`}
              >
                <p className="text-sm text-white/70 mb-2">{phase.phase}</p>
                <p className="text-2xl font-bold mb-1">{phase.date}</p>
                <p className="text-lg mb-4">{phase.title}</p>
                <ul className="space-y-1 text-sm">
                  {phase.items.map((item, i) => (
                    <li key={i}>&#x27A4; {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-8">주요 참고 자료</h3>
          <div className="bg-white rounded-xl p-6 divide-y divide-gray-100">
            {[
              { title: "Microsoft CEO 사티아 나델라", desc: '"Humans and AI agent swarms will be the next frontier"' },
              { title: "Anthropic MCP", desc: "Model Context Protocol, AI 업계 표준 통합 프로토콜 (2024.11 출시, 2025년 OpenAI/Google/MS 채택)" },
              { title: "Claude Opus 4.5", desc: "SWE-bench 80.9%, OSWorld 66.3% - 세계 최고 AI 에이전트 모델" },
              { title: "OECD (2025)", desc: '"AI in public procurement" - Governing with Artificial Intelligence' },
              { title: "McKinsey (2025)", desc: '"Seizing the agentic AI advantage"' },
              { title: "조달청 (2025)", desc: '공공조달 AI 혁신포럼 개최, "AI 대전환" 정책 발표' }
            ].map((ref, i) => (
              <div key={i} className="py-3 text-sm">
                <strong className="text-gray-900">{ref.title}</strong>
                <span className="text-gray-500"> — {ref.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          K-조달 AI 스웜
        </h2>
        <p className="text-gray-400 mb-8">
          자율 AI 에이전트 군집이 이끄는 차세대 공공조달 생태계
        </p>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-500 mb-2">
            조금 특별한 조달 공모전 · 혁신 조달서비스 아이디어 부문
          </p>
          <p className="font-medium">응모자: 박용환</p>
        </div>
      </footer>
    </div>
  );
}
