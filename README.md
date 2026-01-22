# K-조달 AI 스웜

> 자율 AI 에이전트 군집이 이끄는 차세대 공공조달 플랫폼

중소기업에게 대기업 수준의 조달 전문팀을 제공합니다. 24시간 자율적으로 협업하는 AI 스웜이 입찰의 모든 과정을 지원합니다.

## 주요 기능

- **실시간 입찰 모니터링** - 나라장터(G2B) API 연동, 자동 데이터 갱신
- **AI 에이전트 스웜** - Scout(탐색), Brain(분석), Action(실행), Voice(상담) 에이전트
- **AI 음성 상담** - Claude API + Web Speech API 기반 음성 대화
- **Monte Carlo 시뮬레이션** - 입찰 성공 확률 예측
- **제안서 자동 작성** - AI 기반 제안서 초안 생성
- **다크/라이트 모드** - 사용자 환경 설정 지원

## 기술 스택

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript, React 19
- **Styling**: Tailwind CSS v4, CSS Variables
- **UI Components**: Radix UI (shadcn/ui)
- **Animation**: Framer Motion
- **AI**: Anthropic Claude API
- **API**: 공공데이터포털 나라장터 API
- **Testing**: Jest, React Testing Library, Playwright

## 시작하기

### 필수 조건

- Node.js 18+
- npm 또는 yarn

### 설치

```bash
git clone https://github.com/yonghwan1106/k-jodal-swarm.git
cd k-jodal-swarm
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```bash
# Anthropic Claude API (필수)
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# 공공데이터포털 API (선택 - 없으면 Mock 데이터 사용)
DATA_GO_KR_API_KEY=your-data-go-kr-key
```

### 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인하세요.

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── bids/         # 입찰 API (G2B + Mock 폴백)
│   │   └── chat/         # Claude 채팅 API
│   ├── dashboard/         # 대시보드 페이지
│   │   ├── agents/       # 에이전트 모니터링
│   │   ├── bids/         # 입찰공고 목록
│   │   ├── proposals/    # 제안서 자동작성
│   │   ├── simulation/   # Monte Carlo 시뮬레이션
│   │   └── voice/        # AI 음성 상담
│   └── about/             # 프로젝트 소개
├── components/
│   ├── ui/                # 재사용 UI 컴포넌트
│   ├── dashboard/         # 대시보드 컴포넌트
│   └── landing/           # 랜딩 페이지 컴포넌트
├── hooks/                  # 커스텀 React Hooks
│   ├── useBids.ts        # 입찰 데이터 훅
│   ├── useSpeechRecognition.ts  # 음성 인식
│   └── useSpeechSynthesis.ts    # 음성 합성
├── contexts/               # React Context
│   ├── ThemeContext.tsx  # 테마 상태 관리
│   └── mobile-menu-context.tsx
├── lib/
│   ├── api/              # API 클라이언트
│   ├── constants/        # 상수 정의
│   └── mock-data/        # Mock 데이터
└── types/                  # TypeScript 타입 정의
```

## 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 검사

# 테스트
npm run test         # Jest 단위 테스트
npm run test:watch   # 테스트 감시 모드
npm run test:coverage # 커버리지 리포트
npm run test:e2e     # Playwright E2E 테스트
```

## API 연동

### 나라장터 API

공공데이터포털에서 다음 서비스를 활용 신청해야 합니다:
- 조달청_입찰공고정보 (BidPublicInfoService04)
- 조달청_낙찰정보 (ScsbidInfoService)
- 조달청_계약정보 (CntrctInfoService)

API 키가 없거나 API 호출 실패 시 자동으로 Mock 데이터로 전환됩니다.

## 배포

Vercel에 배포하는 것을 권장합니다:

```bash
npm run build
```

또는 Vercel CLI:

```bash
vercel
```

## 라이선스

MIT License
