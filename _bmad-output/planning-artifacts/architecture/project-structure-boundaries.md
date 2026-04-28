# Project Structure & Boundaries

## Complete Project Directory Structure

```
voca/
├── .env.example
├── .env.local                        # 로컬 개발 환경변수 (gitignored)
├── .gitignore
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
│
├── public/
│   └── robots.txt                    # 전체 인덱싱 차단
│
├── supabase/
│   ├── config.toml                   # Supabase 로컬 설정
│   ├── migrations/                   # DB 마이그레이션 (Supabase CLI)
│   │   ├── 0001_create_words.sql
│   │   ├── 0002_create_quiz_sessions.sql
│   │   ├── 0003_create_latency_logs.sql
│   │   ├── 0004_create_review_schedule.sql
│   │   └── 0005_enable_rls.sql
│   └── functions/
│       └── notify/                   # 망각 임박 알림 Edge Function
│           └── index.ts
│
├── scraper/                          # Python 스크래퍼 (독립 운영)
│   ├── requirements.txt
│   ├── main.py                       # Supabase Edge Function HTTP 트리거 진입점
│   ├── scraper/
│   │   ├── toefl_corpus.py
│   │   └── collocation_tagger.py
│   └── README.md
│
└── src/
    ├── middleware.ts                  # 비인증 접근 차단 (Supabase Auth)
    │
    ├── app/
    │   ├── layout.tsx                # 루트 레이아웃 (Server Component)
    │   ├── globals.css
    │   ├── (public)/
    │   │   └── login/
    │   │       └── page.tsx          # 로그인 페이지
    │   └── (auth)/                   # 인증 필요 라우트 그룹
    │       ├── layout.tsx            # 인증 레이아웃
    │       ├── page.tsx              # 홈 (오늘 세션 진입점)
    │       ├── quiz/
    │       │   └── page.tsx          # 퀴즈 세션 (FR7~12, FR21~24, FR32)
    │       ├── dashboard/
    │       │   └── page.tsx          # 진도 대시보드 (FR25~28)
    │       ├── words/
    │       │   ├── page.tsx          # 단어 목록 (FR1~2, FR6)
    │       │   └── [id]/
    │       │       └── page.tsx      # 단어 상세
    │       └── admin/
    │           └── page.tsx          # 스크래퍼 트리거·데이터 검수 (FR3~5)
    │
    ├── components/
    │   ├── ui/                       # 범용 UI (버튼, 토스트 등)
    │   │   ├── Button.tsx
    │   │   └── Toast.tsx
    │   ├── quiz/                     # 퀴즈 UI (모두 Client Components)
    │   │   ├── QuizCard.tsx          # 문제 표시 + 레이턴시 훅 연결
    │   │   ├── OptionList.tsx        # 보기 선택 (키보드 단축키 포함)
    │   │   ├── WarmupSwipe.tsx       # Swipe-to-Sort 워밍업 (FR32)
    │   │   ├── SessionResult.tsx     # 세션 완료 요약 (FR23)
    │   │   └── DiagnosticMessage.tsx # 오답 진단 메시지 (FR33)
    │   ├── dashboard/                # 대시보드 시각화 (Client Components)
    │   │   ├── LevelDistribution.tsx # Level 분포 차트 (FR25)
    │   │   ├── LatencyTrend.tsx      # 레이턴시 추이 그래프 (FR26)
    │   │   └── SessionHistory.tsx    # 일별 학습 이력 (FR27)
    │   └── words/
    │       ├── WordForm.tsx          # 단어 등록·수정 폼 (FR1)
    │       └── WordDetail.tsx        # 단어 상세 (레벨·레이턴시 이력, FR6)
    │
    ├── lib/
    │   ├── supabase/
    │   │   ├── client.ts             # 클라이언트 사이드 Supabase 인스턴스
    │   │   └── server.ts             # 서버 사이드 Supabase 인스턴스 (Server Actions용)
    │   ├── latency/                  # 레이턴시 측정·필터링 (순수 함수)
    │   │   ├── measure.ts            # startLatencyMeasure / endLatencyMeasure
    │   │   ├── filter.ts             # ±2σ 이상치 필터링, visibilitychange 무효 처리
    │   │   ├── measure.test.ts
    │   │   └── filter.test.ts
    │   └── srs/                      # SRS 알고리즘 (순수 함수)
    │       ├── cognitive-level.ts    # 레이턴시+정답률 → Level 1~5 산출 (FR13)
    │       ├── scheduler.ts          # Level별 동적 복습 주기 계산 (FR17)
    │       ├── gap-detector.ts       # 14일 이상 공백 감지 (FR19)
    │       ├── cognitive-level.test.ts
    │       ├── scheduler.test.ts
    │       └── gap-detector.test.ts
    │
    ├── stores/                       # Zustand 스토어
    │   ├── quizSession.store.ts      # 퀴즈 세션 상태 (currentIndex, latencies, answers, status)
    │   └── sessionResult.store.ts    # 세션 완료 결과 요약
    │
    ├── actions/                      # Server Actions
    │   ├── quiz.actions.ts           # submitQuizResultAction (Level 산출 + SRS 업데이트)
    │   ├── words.actions.ts          # createWordAction, triggerScraperAction
    │   └── schedule.actions.ts       # getTodaySessionAction, getReviewQueueAction
    │
    └── types/
        ├── database.types.ts         # Supabase CLI 자동 생성 DB 타입
        ├── quiz.types.ts             # QuizAnswer, QuizQuestion, ActionResult<T>
        └── srs.types.ts              # CognitiveLevel, ReviewSchedule
```

## Architectural Boundaries

**API Boundaries:**
- 외부 진입점: Vercel Edge (Next.js 미들웨어) → 인증 확인 → 라우트 그룹
- Server Actions: `src/actions/` — 클라이언트에서 직접 호출, 서버에서 실행
- Supabase Edge Functions: `supabase/functions/` — Cron 알림, 스크래퍼 HTTP 트리거
- 스크래퍼: `scraper/` → Supabase Edge Function → DB 적재 (Next.js와 완전 분리)

**Component Boundaries:**
- Server Components (데이터 페칭) → Client Components (상호작용) 단방향 전달
- Zustand 스토어: 퀴즈 세션 전용, 라우트 이동 시 초기화
- `lib/latency/`, `lib/srs/`: 순수 함수 — 외부 상태·네트워크 의존 없음

**Data Boundaries:**
- 읽기: 클라이언트 SDK (`lib/supabase/client.ts`) — 퀴즈 목록, 대시보드 집계
- 쓰기: Server Actions (`lib/supabase/server.ts`) — 결과 제출, Level 업데이트
- 레이턴시 배치: 세션 종료 시 `quiz.actions.ts`가 일괄 처리

## Requirements to Structure Mapping

| FR 카테고리 | 주요 파일·디렉토리 |
|------------|-----------------|
| 단어 관리 (FR1~6) | `app/(auth)/words/`, `components/words/`, `actions/words.actions.ts` |
| 퀴즈 엔진 (FR7~12, FR32) | `app/(auth)/quiz/`, `components/quiz/`, `lib/latency/` |
| 숙련도 측정 (FR13~16, FR33) | `lib/srs/cognitive-level.ts`, `actions/quiz.actions.ts` |
| 복습 스케줄링 (FR17~20) | `lib/srs/scheduler.ts`, `lib/srs/gap-detector.ts`, `supabase/functions/notify/` |
| 세션 관리 (FR21~24) | `stores/quizSession.store.ts`, `components/quiz/SessionResult.tsx` |
| 진도 대시보드 (FR25~28) | `app/(auth)/dashboard/`, `components/dashboard/` |
| 데이터 보안 (FR29~31) | `supabase/migrations/0005_enable_rls.sql`, `middleware.ts`, `public/robots.txt` |

## Data Flow

```
[사용자 퀴즈 풀기]
  QuizCard 렌더링
  → requestAnimationFrame → lib/latency/measure.ts (측정 시작)
  → 사용자 입력 → 측정 종료
  → visibilitychange 감지 시 null 처리
  → Zustand quizSession.store (누적)

[세션 종료]
  → quiz.actions.ts (Server Action)
  → lib/latency/filter.ts (이상치 제거)
  → lib/srs/cognitive-level.ts (Level 산출)
  → lib/srs/scheduler.ts (복습 주기 재계산)
  → Supabase DB 배치 저장 (latency_logs, quiz_sessions, words.cognitive_level)

[망각 임박 알림]
  → Supabase Cron → supabase/functions/notify/
  → 이메일/Web Push 발송
```
