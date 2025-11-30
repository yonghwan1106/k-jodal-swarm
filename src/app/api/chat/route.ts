import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

// Error types for better handling
type ApiErrorCode =
  | "MISSING_API_KEY"
  | "INVALID_REQUEST"
  | "RATE_LIMITED"
  | "API_ERROR"
  | "UNKNOWN_ERROR";

interface ApiError {
  code: ApiErrorCode;
  message: string;
  userMessage: string;
}

const ERROR_MESSAGES: Record<ApiErrorCode, ApiError> = {
  MISSING_API_KEY: {
    code: "MISSING_API_KEY",
    message: "ANTHROPIC_API_KEY is not configured",
    userMessage: "시스템 설정 오류입니다. 관리자에게 문의해주세요.",
  },
  INVALID_REQUEST: {
    code: "INVALID_REQUEST",
    message: "Invalid request format",
    userMessage: "잘못된 요청입니다. 다시 시도해주세요.",
  },
  RATE_LIMITED: {
    code: "RATE_LIMITED",
    message: "Rate limit exceeded",
    userMessage: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  },
  API_ERROR: {
    code: "API_ERROR",
    message: "External API error",
    userMessage: "AI 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
  UNKNOWN_ERROR: {
    code: "UNKNOWN_ERROR",
    message: "Unknown error occurred",
    userMessage: "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
};

// Check API key at startup
const apiKey = process.env.ANTHROPIC_API_KEY;

const client = apiKey
  ? new Anthropic({ apiKey })
  : null;

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

// Message validation
interface ChatMessage {
  role: string;
  content: string;
}

function validateMessages(messages: unknown): messages is ChatMessage[] {
  if (!Array.isArray(messages)) return false;
  return messages.every(
    (msg) =>
      typeof msg === "object" &&
      msg !== null &&
      typeof msg.role === "string" &&
      typeof msg.content === "string" &&
      ["user", "assistant"].includes(msg.role)
  );
}

export async function POST(request: NextRequest) {
  // Check if client is initialized
  if (!client) {
    console.error("API Error:", ERROR_MESSAGES.MISSING_API_KEY.message);
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.MISSING_API_KEY.userMessage,
        code: ERROR_MESSAGES.MISSING_API_KEY.code
      },
      { status: 503 }
    );
  }

  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.INVALID_REQUEST.userMessage,
          code: ERROR_MESSAGES.INVALID_REQUEST.code
        },
        { status: 400 }
      );
    }

    const { messages } = body;

    // Validate messages
    if (!validateMessages(messages)) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.INVALID_REQUEST.userMessage,
          code: ERROR_MESSAGES.INVALID_REQUEST.code
        },
        { status: 400 }
      );
    }

    // Limit message count to prevent abuse
    if (messages.length > 50) {
      return NextResponse.json(
        {
          error: "대화가 너무 깁니다. 새로운 대화를 시작해주세요.",
          code: "MESSAGE_LIMIT_EXCEEDED"
        },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((msg) => ({
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
    // Log error for debugging (but don't expose to user)
    console.error("Claude API error:", error);

    // Check for specific error types
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.RATE_LIMITED.userMessage,
          code: ERROR_MESSAGES.RATE_LIMITED.code
        },
        { status: 429 }
      );
    }

    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.API_ERROR.userMessage,
          code: ERROR_MESSAGES.API_ERROR.code
        },
        { status: 502 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.UNKNOWN_ERROR.userMessage,
        code: ERROR_MESSAGES.UNKNOWN_ERROR.code
      },
      { status: 500 }
    );
  }
}
