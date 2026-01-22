# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

K-조달 AI 스웜은 한국 공공조달 AI 플랫폼입니다. 자율 AI 에이전트 군집이 나라장터(G2B) 입찰 정보를 분석하고 중소기업의 조달 업무를 지원합니다.

## Commands

```bash
# Development
npm run dev              # Start dev server (Next.js with Turbopack)
npm run build            # Production build
npm run lint             # ESLint

# Testing
npm run test             # Run Jest unit tests
npm run test:watch       # Jest in watch mode
npm run test:coverage    # Jest with coverage report
npm run test:e2e         # Playwright E2E tests
npm run test:e2e:headed  # E2E tests with browser visible
```

## Architecture

### App Router Structure (`src/app/`)
- `/` - Landing page with swarm animation
- `/dashboard` - Main dashboard with agent status, real-time activity
- `/dashboard/bids` - 입찰공고 목록 (G2B API integration with pagination)
- `/dashboard/agents` - AI 에이전트 모니터링
- `/dashboard/voice` - AI 음성 상담 (Claude API + Web Speech API)
- `/dashboard/simulation` - Monte Carlo 시뮬레이션
- `/dashboard/proposals` - 제안서 자동작성
- `/api/bids` - 입찰 API (G2B + Mock fallback)
- `/api/chat` - Claude API chat endpoint

### Key Patterns

**API Integration with Fallback**
- `src/lib/api/g2b-api.ts` - 나라장터 API 클라이언트
- API 실패 시 자동으로 Mock 데이터로 전환
- `src/lib/mock-data/` - Fallback mock data

**Data Fetching Hooks** (`src/hooks/`)
- `useBids.ts` - 입찰공고 데이터 (5분 자동 갱신)
- `useAwards.ts` - 낙찰정보
- `useContracts.ts` - 계약정보
- `useSpeechRecognition.ts` - Web Speech API 음성 인식
- `useSpeechSynthesis.ts` - Web Speech API 음성 합성

**Context Providers** (`src/contexts/`)
- `ThemeContext` - 다크/라이트 모드 (`data-theme` attribute)
- `MobileMenuProvider` - 반응형 사이드바 상태

**UI Components**
- `src/components/ui/` - shadcn/ui 기반 재사용 컴포넌트 (Radix UI)
- `src/components/dashboard/` - 대시보드 전용 컴포넌트
- `src/components/landing/` - 랜딩 페이지 컴포넌트

### Styling
- Tailwind CSS v4 with CSS variables
- 테마 변수: `globals.css`의 `:root` (다크) 및 `[data-theme="light"]` (라이트)
- Agent colors: `--scout` (cyan), `--brain` (purple), `--action` (green), `--voice` (amber)

## Environment Variables

```bash
# Required
ANTHROPIC_API_KEY=sk-ant-...  # Claude API
DATA_GO_KR_API_KEY=...        # 공공데이터포털 API (G2B)
```

## Testing

Unit tests: `src/__tests__/` (Jest + React Testing Library)
E2E tests: `e2e/` (Playwright)

```bash
# Run specific test file
npm test -- pagination.test.tsx
```
