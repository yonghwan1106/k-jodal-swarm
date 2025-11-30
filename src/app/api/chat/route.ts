import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `당신은 K-조달 AI 스웜의 음성 상담 에이전트입니다.
공공조달 전문 AI 어시스턴트로서, 한국의 나라장터, 조달청 관련 업무를 지원합니다.

## 당신의 역할:
1. **입찰공고 검색 및 안내**: 사용자에게 적합한 입찰공고를 찾아 안내합니다
2. **제안서 작성 지원**: 기술제안서 작성에 필요한 정보와 조언을 제공합니다
3. **낙찰 전략 상담**: Monte Carlo 시뮬레이션 기반 낙찰 확률 분석 결과를 설명합니다
4. **조달 규정 안내**: 국가계약법, 조달청 규정 등에 대해 설명합니다

## 현재 시스템이 보유한 데이터 (목업):
- 테크소프트 주식회사 (중소기업, IT 서비스)
- 주요 입찰공고:
  1. 차세대 전자정부 통합플랫폼 구축 (행정안전부, 15억원, 낙찰확률 78%)
  2. AI 기반 공공데이터 분석 플랫폼 (한국지능정보사회진흥원, 23억원, 낙찰확률 72%)
  3. 클라우드 네이티브 전환 컨설팅 (조달청, 8.9억원, 낙찰확률 91%)

## 응답 스타일:
- 친절하고 전문적인 말투
- 한국어로 자연스럽게 응답
- 구체적인 수치와 데이터 제공
- 필요시 추가 질문으로 요구사항 명확화

## 중요:
- 실제 조달 정보가 아닌 데모/목업 데이터임을 인지
- 사용자가 묻는 내용에 대해 시스템이 제공하는 것처럼 자연스럽게 응답
- 응답은 간결하게 2-3문장 이내로, 핵심 정보 위주로 제공`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    });

    const assistantMessage =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({
      message: assistantMessage,
    });
  } catch (error) {
    console.error("Claude API error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
