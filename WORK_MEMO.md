# K-조달 AI 스웜 - 작업 메모

> 최초 작성일: 2025-12-29
> 최종 업데이트: 2026-01-22
> 상태: **P2 개선 완료**

---

## 1. 완료된 작업 요약

### Phase 1: API 연동 (2025-12-29)
- [x] G2B(나라장터) API 클라이언트 구현 (`src/lib/api/g2b-api.ts`)
- [x] API 폴백 시스템 (API 실패 시 Mock 데이터 자동 전환)
- [x] React Hooks 생성 (`useBids`, `useAwards`, `useContracts`)
- [x] Live/Mock 상태 배지 표시
- [x] 자동 새로고침 (5분 간격)

### Phase 2: P1 개선 (2025-11-30)
- [x] 반응형 디자인 - 모바일 메뉴, 그리드 레이아웃
- [x] 접근성 개선 - aria-label, focus-visible, prefers-reduced-motion
- [x] SEO 메타데이터 - Open Graph, Twitter Card, sitemap
- [x] 성능 최적화 - useMemo, setInterval cleanup
- [x] 코드 품질 - 상수 파일 분리, 타입 정의 통합

### Phase 3: P2 개선 (2026-01-22)
- [x] **페이지네이션** - 입찰공고 목록에 Pagination, PageSizeSelector 컴포넌트 추가
- [x] **음성 입출력** - Web Speech API 기반 음성 인식/합성 훅 구현
- [x] **테스트 추가** - Jest 단위 테스트 (21개), Playwright E2E 테스트 설정
- [x] **다크/라이트 모드** - ThemeContext + 테마 토글 버튼

---

## 2. 주요 구현 상세

### 2.1 페이지네이션
**파일**: `src/components/ui/pagination.tsx`, `src/app/dashboard/bids/page.tsx`

- 페이지 번호 네비게이션
- 페이지 크기 선택 (10, 20, 50, 100건)
- 총 데이터 건수 표시
- 181건 실제 G2B API 데이터로 테스트 완료

### 2.2 음성 입출력 (Web Speech API)
**파일**: `src/hooks/useSpeechRecognition.ts`, `src/hooks/useSpeechSynthesis.ts`

```typescript
// 음성 인식 훅
const { isListening, transcript, startListening, stopListening } = useSpeechRecognition({
  lang: "ko-KR",
  onResult: (text) => console.log(text),
});

// 음성 합성 훅
const { isSpeaking, speak, stop } = useSpeechSynthesis({
  lang: "ko-KR",
  rate: 1,
});
```

- 한국어 음성 인식/합성 지원
- 브라우저 지원 여부 자동 감지
- Voice 페이지에 마이크 토글, 자동 읽기 기능 통합

### 2.3 테스트 설정
**설정 파일**: `jest.config.js`, `jest.setup.js`, `playwright.config.ts`

```bash
# 단위 테스트
npm run test              # 전체 실행
npm run test -- pagination.test.tsx  # 특정 파일

# E2E 테스트
npm run test:e2e          # Headless
npm run test:e2e:headed   # 브라우저 표시
```

**테스트 파일**:
- `src/__tests__/components/pagination.test.tsx` - 16개 테스트
- `src/__tests__/hooks/useBids.test.tsx` - 5개 테스트
- `e2e/navigation.spec.ts` - 네비게이션 E2E
- `e2e/bids.spec.ts` - 입찰 페이지 E2E

### 2.4 다크/라이트 모드
**파일**: `src/contexts/ThemeContext.tsx`, `src/components/ui/theme-toggle.tsx`

- `data-theme` 속성으로 테마 적용
- localStorage에 사용자 설정 저장
- 시스템 설정 자동 감지 (`prefers-color-scheme`)
- 헤더에 애니메이션 토글 버튼

**CSS 변수** (`globals.css`):
```css
:root { /* 다크 모드 기본값 */ }
[data-theme="light"] { /* 라이트 모드 */ }
```

---

## 3. 환경 설정

### 3.1 환경 변수 (`.env.local`)
```bash
ANTHROPIC_API_KEY=sk-ant-api03-...   # Claude API
DATA_GO_KR_API_KEY=...               # 공공데이터포털 (선택)
```

### 3.2 G2B API 서비스 신청
공공데이터포털(data.go.kr)에서 활용 신청 필요:
- 조달청_입찰공고정보 (BidPublicInfoService04)
- 조달청_낙찰정보 (ScsbidInfoService)
- 조달청_계약정보 (CntrctInfoService)

API 미설정 시 자동으로 Mock 데이터 사용

---

## 4. 알려진 이슈 및 해결

### 4.1 undefined 파라미터 문제 (해결됨)
**파일**: `src/lib/api/g2b-api.ts` (148-163줄)

G2B API 호출 시 `bidNtceNm=undefined`가 URL에 포함되어 500 에러 발생
→ undefined/null/빈문자열 필터링 로직 추가로 해결

### 4.2 Jest TypeScript 설정 (해결됨)
`jest.config.ts` 사용 시 ts-node 에러 발생
→ `jest.config.js`로 변환하여 해결

### 4.3 포트 충돌
다른 프로젝트가 3000번 포트 사용 중일 때
→ `npm run dev -- -p 3003` 으로 다른 포트 사용

---

## 5. 다음 단계 (향후 작업)

### 기능 확장
- [ ] 사용자 인증/인가 시스템
- [ ] 데이터베이스 연동 (PostgreSQL/Supabase)
- [ ] 실시간 알림 (WebSocket)
- [ ] 제안서 실제 생성 기능

### 코드 품질
- [ ] 컴포넌트 스토리북
- [ ] API 문서화
- [ ] 테스트 커버리지 확대

### 성능
- [ ] 대량 데이터 가상화 (TanStack Virtual 적용 확대)
- [ ] 이미지 최적화 (next/image)
- [ ] 번들 사이즈 분석

---

## 6. 빠른 참조

### 개발 서버
```bash
cd C:\Users\user\projects\2026_active\k-jodal-swarm
npm run dev
```

### 빌드 및 테스트
```bash
npm run build      # 프로덕션 빌드
npm run test       # 단위 테스트
npm run test:e2e   # E2E 테스트
```

### 주요 경로
| 경로 | 설명 |
|------|------|
| `/` | 랜딩 페이지 |
| `/dashboard` | 메인 대시보드 |
| `/dashboard/bids` | 입찰공고 목록 (페이지네이션) |
| `/dashboard/voice` | AI 음성 상담 |
| `/dashboard/agents` | 에이전트 모니터링 |
| `/dashboard/simulation` | Monte Carlo 시뮬레이션 |

---

## 7. 작업 이력

| 날짜 | 작업 내용 | 상태 |
|------|----------|------|
| 2025-11-30 | P0/P1 개선 (반응형, 접근성, SEO) | 완료 |
| 2025-12-29 | G2B API 연동, Mock 폴백 시스템 | 완료 |
| 2026-01-22 | P2 개선 (페이지네이션, 음성, 테스트, 테마) | 완료 |
