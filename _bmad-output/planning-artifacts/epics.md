---
stepsCompleted: ['step-01', 'step-02', 'step-03', 'step-04']
inputDocuments:
  - _bmad-output/planning-artifacts/prd/functional-requirements.md
  - _bmad-output/planning-artifacts/prd/non-functional-requirements.md
  - _bmad-output/planning-artifacts/prd/project-scoping-phased-development.md
  - _bmad-output/planning-artifacts/prd/domain-specific-requirements.md
  - _bmad-output/planning-artifacts/architecture/core-architectural-decisions.md
  - _bmad-output/planning-artifacts/architecture/implementation-patterns-consistency-rules.md
  - _bmad-output/planning-artifacts/architecture/project-structure-boundaries.md
  - _bmad-output/planning-artifacts/architecture/starter-template-evaluation.md
  - _bmad-output/planning-artifacts/architecture/architecture-validation-results.md
---

# voca - Epic Breakdown

## Overview

이 문서는 voca PRD 및 아키텍처 결정을 구현 가능한 스토리 단위로 분해한 Epic & Story 명세서입니다.

## Requirements Inventory

### Functional Requirements

FR1: 학습자는 단어를 수동으로 등록할 수 있다
FR2: 학습자는 단어에 대한 예문·연어·논리 역할 데이터를 조회할 수 있다
FR3: 관리자는 Python 스크래퍼를 트리거하여 단어 데이터를 자동 수집할 수 있다
FR4: 관리자는 스크래핑된 데이터를 미리보고 수동으로 수정·승인할 수 있다
FR5: 시스템은 스크래핑 실패 시 수동 입력 폴백을 제공한다
FR6: 학습자는 단어의 현재 Cognitive Level과 레이턴시 이력을 조회할 수 있다
FR7: 시스템은 단어의 Cognitive Level에 따라 퀴즈 유형을 자동으로 결정한다
FR8: 시스템은 퀴즈 문제 표시 시점부터 첫 입력까지의 레이턴시를 밀리초 단위로 측정한다
FR9: 시스템은 탭 전환·포커스 이탈 감지 시 해당 퀴즈의 레이턴시를 무효 처리한다
FR10: 학습자는 키보드 단축키로 퀴즈 보기를 선택하고 제출할 수 있다
FR11: 시스템은 오답 선택지를 학습자의 혼동 패턴 기반으로 생성한다 [Phase 2 — MVP 제외]
FR12: 시스템은 TOEFL 지문 문단 맥락 속에서 단어를 제시하는 퀴즈를 제공한다
FR13: 시스템은 레이턴시와 정답률을 기반으로 단어별 Cognitive Level(1~5)을 자동 산출한다
FR14: 시스템은 레이턴시 이상치(탭 전환 등)를 필터링하여 숙련도 계산에서 제외한다
FR15: 시스템은 단어별 레이턴시 추이를 시간 순으로 기록한다
FR16: 학습자는 단어가 레벨 업/다운된 이유를 확인할 수 있다
FR17: 시스템은 Cognitive Level별 동적 복습 주기를 자동 계산한다 (Level 1~2: 1/4/7일, Level 5: 7→30→90일)
FR18: 시스템은 망각 임박 단어 목록을 우선순위 정렬하여 오늘의 세션을 구성한다
FR19: 시스템은 14일 이상 공백 감지 시 복귀 세션 모드로 자동 전환한다
FR20: 시스템은 망각 임박 시점에 학습자에게 알림을 발송한다 (이메일 또는 Web Push)
FR21: 학습자는 오늘의 세션을 시작·일시정지·재개할 수 있다
FR22: 시스템은 세션 중 페이지 이탈 시 진행 상태를 저장한다
FR23: 학습자는 세션 완료 후 결과 요약(레이턴시 변화, 레벨 변동)을 확인할 수 있다
FR24: 학습자는 세션 중 특정 단어를 건너뛸 수 있다
FR25: 학습자는 전체 단어의 Cognitive Level 분포를 조회할 수 있다
FR26: 학습자는 단어별 레이턴시 추이 그래프를 조회할 수 있다
FR27: 학습자는 일별 학습 이력(완주 여부, 단어 수)을 조회할 수 있다
FR28: 학습자는 재오답률과 오답 패턴을 조회할 수 있다
FR29: 시스템은 Row Level Security를 통해 학습자 데이터를 본인만 접근하도록 제한한다
FR30: 시스템은 모든 학습 이벤트(퀴즈 응답, 레이턴시, 레벨 변동)를 영구 기록한다
FR31: 시스템은 검색 엔진 인덱싱을 차단한다
FR32: 학습자는 세션 시작 전 워밍업에서 단어를 "아는 것 같다 / 불확실"로 분류하여 당일 퀴즈 순서를 재배열할 수 있다 (Swipe-to-Sort)
FR33: 시스템은 오답 시 "틀린 이유" 진단 메시지를 제공한다 (뉘앙스 혼동·유사 오답 패턴 분석)

### NonFunctional Requirements

NFR1: 퀴즈 화면 전환 < 100ms (레이턴시 측정 기준선 안정성)
NFR2: 페이지 초기 로딩 LCP < 2.5초
NFR3: Supabase 쿼리 응답 p95 < 200ms
NFR4: 레이턴시 측정 오차 ±50ms 이하 (performance.now() + requestAnimationFrame 기반)
NFR5: Python 스크래퍼 단어 1개당 데이터 수집 완료 < 5초
NFR6: 전 테이블 Supabase RLS 적용 — auth.uid() = user_id 조건으로 데이터 격리
NFR7: HTTPS 전용 통신 (HTTP 리다이렉트)
NFR8: 환경 변수로 API 키 관리 — 클라이언트 노출 금지
NFR9: 퀴즈 세션 중 네트워크 단절 시 로컬 상태 보존 후 재연결 시 동기화
NFR10: 스크래퍼 실패 시 에러 로깅 및 수동 입력 폴백 자동 활성화
NFR11: Supabase Edge Functions 응답 타임아웃 < 10초 (알림 발송 기준)
NFR12: Python 스크래퍼 — robots.txt 준수, 요청 간 최소 1초 딜레이

### Additional Requirements

- [ARCH-1] 프로젝트 초기화: create-next-app (TypeScript, Tailwind, App Router, src-dir, pnpm) → 완료
- [ARCH-2] Supabase CLI 마이그레이션: `supabase/migrations/` 폴더 구조, 순번 파일명 규칙 (`0001_`, `0002_`...)
- [ARCH-3] DB 스키마 설계: `words`, `quiz_sessions`, `latency_logs`, `review_schedule` 테이블 (snake_case, RLS 포함)
- [ARCH-4] Supabase Auth 연동: 이메일 단독 인증, Next.js 미들웨어 보호 라우트
- [ARCH-5] 타입 자동 생성: `supabase gen types typescript` → `src/types/database.types.ts`
- [ARCH-6] Server Actions 응답 타입: `ActionResult<T>` 일관 적용 (`src/types/quiz.types.ts`)
- [ARCH-7] 레이턴시 측정 엔진: `lib/latency/measure.ts` + `lib/latency/filter.ts` + Vitest 단위 테스트 → 완료
- [ARCH-8] SRS 알고리즘: `lib/srs/cognitive-level.ts` + `lib/srs/scheduler.ts` + `lib/srs/gap-detector.ts` + Vitest 단위 테스트 → 완료
- [ARCH-9] Supabase Edge Function: `supabase/functions/notify/` — 망각 임박 알림 Cron
- [ARCH-10] Vercel 배포: main 브랜치 자동 배포, 환경변수 설정
- [ARCH-11] Python 스크래퍼: 독립 운영, Supabase Edge Function HTTP 트리거 연결
- [ARCH-12] robots.txt 전체 인덱싱 차단 → 완료

### UX Design Requirements

UX 설계 문서 없음 — 추후 필요 시 `/bmad-create-ux-design` 실행 권장

### FR Coverage Map

FR1: Epic 2 — 단어 수동 등록
FR2: Epic 2 — 단어 예문·연어·논리역할 조회
FR3: Epic 2 — 스크래퍼 트리거 (관리자)
FR4: Epic 2 — 스크래핑 데이터 검수·승인
FR5: Epic 2 — 스크래퍼 실패 시 수동 폴백
FR6: Epic 2 — 단어 Cognitive Level & 레이턴시 이력 조회
FR7: Epic 3 — Level 기반 퀴즈 유형 자동 결정
FR8: Epic 3 — 레이턴시 ms 측정
FR9: Epic 3 — 탭 전환 시 레이턴시 무효 처리
FR10: Epic 3 — 키보드 단축키 보기 선택
FR11: Phase 2 제외
FR12: Epic 3 — TOEFL 지문 맥락 퀴즈
FR13: Epic 4 — Cognitive Level 1~5 자동 산출
FR14: Epic 4 — 레이턴시 이상치 필터링
FR15: Epic 4 — 단어별 레이턴시 추이 기록
FR16: Epic 4 — 레벨 변동 이유 확인
FR17: Epic 4 — Level별 동적 복습 주기 계산
FR18: Epic 4 — 망각 임박 단어 우선순위 세션 구성
FR19: Epic 4 — 14일 공백 감지 → 복귀 세션 모드
FR20: Epic 4 — 망각 임박 알림 발송
FR21: Epic 3 — 세션 시작·일시정지·재개
FR22: Epic 3 — 페이지 이탈 시 세션 상태 저장
FR23: Epic 3 — 세션 완료 결과 요약
FR24: Epic 3 — 세션 중 단어 건너뛰기
FR25: Epic 5 — Level 분포 조회
FR26: Epic 5 — 레이턴시 추이 그래프
FR27: Epic 5 — 일별 학습 이력
FR28: Epic 5 — 재오답률·오답 패턴
FR29: Epic 1 — RLS 데이터 격리
FR30: Epic 3 — 모든 학습 이벤트 영구 기록
FR31: Epic 1 — 검색 엔진 인덱싱 차단
FR32: Epic 3 — Swipe-to-Sort 워밍업
FR33: Epic 4 — 오답 진단 메시지

## Epic List

### Epic 1: 기초 인프라, 인증 & 보안
학습자가 계정을 만들고 로그인하여, 자신의 데이터가 RLS로 안전하게 격리된 환경에서 앱을 사용할 수 있다.
**FRs covered:** FR29, FR31
**ARCH covered:** ARCH-2, ARCH-3, ARCH-4, ARCH-5, ARCH-10

### Epic 2: 단어 관리
학습자가 학습할 단어를 직접 등록하고, TOEFL 코퍼스 데이터(예문·연어·논리역할)와 함께 조회하며 관리할 수 있다.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6
**ARCH covered:** ARCH-11

### Epic 3: 퀴즈 엔진 & 세션 관리
학습자가 Cognitive Level 기반 퀴즈를 풀고, 반응 레이턴시가 정밀 측정되며, 세션을 시작·일시정지·재개하고 완료 결과를 확인할 수 있다.
**FRs covered:** FR7, FR8, FR9, FR10, FR12, FR21, FR22, FR23, FR24, FR30, FR32

### Epic 4: 숙련도 측정 & 복습 스케줄링
시스템이 퀴즈 결과를 분석해 단어별 Cognitive Level(1~5)을 자동 산출하고, 망각 곡선에 맞춰 복습 일정을 구성하며 알림을 발송한다.
**FRs covered:** FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR33
**ARCH covered:** ARCH-9

### Epic 5: 진도 대시보드
학습자가 전체 단어의 Level 분포, 레이턴시 추이 그래프, 일별 학습 이력, 오답 패턴을 한 화면에서 확인할 수 있다.
**FRs covered:** FR25, FR26, FR27, FR28

---

## Epic 1: 기초 인프라, 인증 & 보안

학습자가 계정을 만들고 로그인하여, 자신의 데이터가 RLS로 안전하게 격리된 환경에서 앱을 사용할 수 있다.

### Story 1.1: DB 스키마 마이그레이션 & RLS 활성화

As a **developer**,
I want the database schema to be defined through versioned migration files with RLS enabled on all tables,
So that all learning data is properly structured, user-isolated, and tracked in version control from the start.

**Acceptance Criteria:**

**Given** Supabase 프로젝트가 생성되어 있고 Supabase CLI가 설치되어 있을 때
**When** `supabase db push`를 실행하면
**Then** `words`, `quiz_sessions`, `latency_logs`, `review_schedule` 테이블이 모두 생성된다
**And** 모든 테이블에 `user_id uuid references auth.users` 컬럼이 존재한다

**Given** 마이그레이션이 적용된 상태에서
**When** 인증되지 않은 사용자가 직접 DB 쿼리를 시도하면
**Then** RLS 정책에 의해 0개의 행이 반환된다

**Given** 인증된 사용자 A가 자신의 데이터를 조회하면
**When** Supabase 클라이언트로 `words` 테이블을 SELECT 할 때
**Then** `auth.uid() = user_id` 조건으로 본인 데이터만 반환된다
**And** `supabase gen types typescript --local > src/types/database.types.ts` 명령으로 타입 파일이 자동 생성된다

### Story 1.2: 이메일 회원가입 & 로그인 UI

As a **learner**,
I want to sign up and log in with my email address,
So that I can access my personalized vocabulary learning app securely.

**Acceptance Criteria:**

**Given** 비인증 사용자가 `/login` 페이지에 접속하면
**When** 이메일과 비밀번호를 입력하고 "로그인" 버튼을 클릭하면
**Then** Supabase Auth를 통해 인증되고 홈(`/`)으로 리다이렉트된다

**Given** 신규 사용자가 회원가입 탭에서 이메일·비밀번호를 입력하면
**When** "가입하기" 버튼을 클릭하면
**Then** Supabase Auth에 계정이 생성되고 로그인 상태가 된다

**Given** 인증된 사용자가 인증 필요 라우트(`/quiz`, `/dashboard` 등)에 접근하면
**When** 미들웨어가 세션을 확인하면
**Then** 정상적으로 해당 페이지가 렌더링된다

**Given** 비인증 사용자가 인증 필요 라우트에 직접 접근하면
**When** 미들웨어가 세션 없음을 감지하면
**Then** `/login` 페이지로 리다이렉트된다
**And** 로그인 실패 시 인라인 에러 메시지가 표시된다

### Story 1.3: Vercel 배포 & 환경 설정

As a **developer**,
I want the app to be automatically deployed to Vercel on every push to the main branch,
So that the latest version is always accessible and I can focus on development rather than manual deployments.

**Acceptance Criteria:**

**Given** GitHub 리포지토리가 Vercel 프로젝트와 연결되어 있을 때
**When** main 브랜치에 푸시하면
**Then** Vercel에서 자동 빌드 & 배포가 시작된다

**Given** Vercel 환경변수 설정 화면에서
**When** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`를 입력하면
**Then** 프로덕션 앱이 Supabase에 정상 연결된다

**Given** 배포된 앱에서 `/login`에 접속하면
**When** 브라우저에서 접근할 때
**Then** HTTPS로만 제공되며 HTTP는 자동 리다이렉트된다

---

## Epic 2: 단어 관리

학습자가 학습할 단어를 직접 등록하고, TOEFL 코퍼스 데이터(예문·연어·논리역할)와 함께 조회하며 관리할 수 있다.

### Story 2.1: 단어 수동 등록 폼

As a **learner**,
I want to manually register a new vocabulary word with its meaning and example sentence,
So that I can start learning words immediately without waiting for the scraper.

**Acceptance Criteria:**

**Given** 학습자가 `/words` 페이지에 접속하면
**When** "단어 추가" 버튼을 클릭하면
**Then** 단어, 뜻, 예문, 연어(optional), 논리역할(optional) 입력 폼이 표시된다

**Given** 학습자가 필수 필드(단어, 뜻)를 입력하고 저장하면
**When** `createWordAction` Server Action이 실행되면
**Then** `words` 테이블에 신규 레코드가 생성되고 단어 목록에 즉시 반영된다
**And** `ActionResult<{ wordId: string }>` 형식으로 성공/실패가 반환된다

**Given** 학습자가 필수 필드를 비워두고 저장을 시도하면
**When** 폼 유효성 검사가 실행되면
**Then** 인라인 에러 메시지가 표시되고 제출이 차단된다

### Story 2.2: 단어 목록 조회 & 검색

As a **learner**,
I want to view and search my registered vocabulary list with current Cognitive Level,
So that I can track what I'm learning and find specific words quickly.

**Acceptance Criteria:**

**Given** 학습자가 `/words` 페이지에 접속하면
**When** 페이지가 로드되면
**Then** 본인이 등록한 단어 목록이 Cognitive Level, 단어명과 함께 표시된다

**Given** 단어 목록이 표시된 상태에서
**When** 검색창에 단어를 입력하면
**Then** 실시간으로 단어명·뜻 기준으로 필터링된 결과가 표시된다

**Given** 단어 항목을 클릭하면
**When** `/words/[id]` 상세 페이지로 이동하면
**Then** 단어의 예문, 연어, 논리역할, Cognitive Level, 레이턴시 이력이 표시된다

### Story 2.3: 관리자 스크래퍼 트리거 & 데이터 검수

As an **admin**,
I want to trigger the Python scraper and review the collected data before it's added to the word database,
So that I can ensure data quality while automating the vocabulary collection process.

**Acceptance Criteria:**

**Given** 관리자가 `/admin` 페이지에 접속하면
**When** 페이지가 로드되면
**Then** 스크래퍼 트리거 버튼과 수집 대기 중인 단어 목록이 표시된다

**Given** 관리자가 트리거 버튼을 클릭하면
**When** `triggerScraperAction` Server Action이 Supabase Edge Function에 HTTP 요청을 보내면
**Then** 스크래핑 작업이 시작되고 진행 상태가 표시된다

**Given** 스크래핑된 데이터가 대기 상태로 수집되면
**When** 관리자가 각 항목을 검토하면
**Then** 승인(words 테이블 이동) 또는 거부(삭제) 처리가 가능하다

**Given** 스크래퍼가 실패하면
**When** Edge Function이 에러를 반환하면
**Then** 에러 메시지가 표시되고 수동 입력 폼이 자동으로 활성화된다

---

## Epic 3: 퀴즈 엔진 & 세션 관리

학습자가 Cognitive Level 기반 퀴즈를 풀고, 반응 레이턴시가 정밀 측정되며, 세션을 시작·일시정지·재개하고 완료 결과를 확인할 수 있다.

### Story 3.1: Swipe-to-Sort 워밍업

As a **learner**,
I want to sort today's words into "confident" and "uncertain" before the quiz starts,
So that the quiz prioritizes uncertain words and I ease into the session mentally.

**Acceptance Criteria:**

**Given** 학습자가 `/quiz` 페이지에 진입하면
**When** 세션이 시작되기 전
**Then** 오늘의 단어 카드가 한 장씩 제시되며 "아는 것 같다(→)" / "불확실(←)" 분류 UI가 표시된다

**Given** 학습자가 모든 카드를 분류하면
**When** 워밍업이 완료되면
**Then** 불확실 단어가 퀴즈 앞순서로 재배열되어 세션이 시작된다

**Given** 학습자가 마우스 드래그 또는 키보드(← →)로 분류하면
**When** 카드가 스와이프되면
**Then** 즉각적인 시각 피드백(슬라이드 애니메이션)과 함께 분류된다

### Story 3.2: 퀴즈 문제 표시 & 레이턴시 측정

As a **learner**,
I want to answer vocabulary quiz questions with keyboard shortcuts while my reaction time is precisely measured,
So that the system can accurately assess my true proficiency beyond just right/wrong answers.

**Acceptance Criteria:**

**Given** 퀴즈 세션이 활성 상태일 때
**When** 새 문제가 렌더링되면
**Then** `requestAnimationFrame` 콜백 시점에 `lib/latency/measure.ts`의 `startLatencyMeasure()`가 호출된다
**And** 문제는 단어의 Cognitive Level에 따라 유형이 결정된다 (Level 1~2: 뜻 선택, Level 3~4: 예문 빈칸, Level 5: 맥락 독해)

**Given** 학습자가 보기를 선택하면
**When** 클릭 또는 키보드 1~4를 누르면
**Then** `endLatencyMeasure()`가 호출되어 ms 단위 레이턴시가 기록된다
**And** Zustand `quizSession.store`의 `latencies` 배열에 누적된다

**Given** 퀴즈 중 탭 전환 또는 포커스 이탈이 감지되면
**When** `visibilitychange` 이벤트가 발생하면
**Then** `invalidateLatencyMeasure()`가 호출되고 해당 문항의 레이턴시는 `null`로 처리된다

### Story 3.3: TOEFL 지문 맥락 퀴즈

As a **learner**,
I want to see vocabulary questions presented within an actual TOEFL passage excerpt,
So that I practice recognizing words in the same context as the real exam.

**Acceptance Criteria:**

**Given** Level 3 이상 단어의 퀴즈가 시작되면
**When** 문제 카드가 렌더링되면
**Then** 단어가 포함된 TOEFL 지문 문단이 문제 상단에 표시되고 해당 단어는 하이라이트된다

**Given** 지문 데이터가 없는 단어의 경우
**When** 맥락 퀴즈 유형이 선택되면
**Then** 기본 뜻 선택 퀴즈로 폴백된다

### Story 3.4: 세션 관리 — 일시정지·재개·건너뛰기

As a **learner**,
I want to pause, resume, and skip words during a quiz session,
So that I can manage interruptions without losing my progress.

**Acceptance Criteria:**

**Given** 퀴즈 세션이 진행 중일 때
**When** "일시정지" 버튼을 클릭하면
**Then** Zustand store의 `status`가 `paused`로 변경되고 현재 문제가 유지된다

**Given** 세션이 일시정지된 상태에서
**When** "재개" 버튼을 클릭하면
**Then** `status`가 `active`로 복원되고 동일 문제부터 재시작된다

**Given** 학습자가 특정 단어를 건너뛰면
**When** "건너뛰기" 버튼을 클릭하면
**Then** 해당 문항의 레이턴시는 `null`, 답변은 `skipped`로 기록되고 다음 문제로 이동된다

**Given** 학습자가 세션 도중 페이지를 이탈하면
**When** `beforeunload` 이벤트가 발생하면
**Then** 현재 Zustand 세션 상태가 `voca_quiz_session_draft` 키로 localStorage에 직렬화 저장된다
**And** 재방문 시 초안이 복원되어 이어하기가 제공된다

### Story 3.5: 세션 결과 제출 & 요약 화면

As a **learner**,
I want to see a summary of my session results immediately after completing all questions,
So that I get instant feedback on my performance and understand how my word levels changed.

**Acceptance Criteria:**

**Given** 학습자가 마지막 문항까지 응답하면
**When** `submitQuizResultAction` Server Action이 호출되면
**Then** `latency_logs`와 `quiz_sessions` 테이블에 세션 데이터가 배치로 저장된다
**And** `ActionResult<SessionSummary>` 형식으로 결과가 반환된다

**Given** 세션 결과가 반환되면
**When** 결과 화면이 표시되면
**Then** 총 문항 수, 정답률, 중앙값 레이턴시, 레벨 변동 항목이 표시된다

**Given** 결과 화면에서 레벨 변동 항목을 확인하면
**When** 특정 단어의 레벨 변화를 보면
**Then** 이전 레벨 → 새 레벨 변화가 화살표(↑↓)와 함께 표시된다

---

## Epic 4: 숙련도 측정 & 복습 스케줄링

시스템이 퀴즈 결과를 분석해 단어별 Cognitive Level(1~5)을 자동 산출하고, 망각 곡선에 맞춰 복습 일정을 구성하며 알림을 발송한다.

### Story 4.1: Cognitive Level 산출 & 저장

As a **learner**,
I want my word's Cognitive Level to be automatically recalculated after each quiz session,
So that the difficulty of future quizzes adapts to my actual proficiency.

**Acceptance Criteria:**

**Given** 세션 결과가 `submitQuizResultAction`에 전달되면
**When** Server Action이 실행되면
**Then** `lib/latency/filter.ts`의 MAD 기반 이상치 필터가 적용된 레이턴시 배열이 산출된다
**And** `lib/srs/cognitive-level.ts`의 `calculateCognitiveLevel()`로 새 Level이 계산된다
**And** `words` 테이블의 `cognitive_level` 컬럼이 업데이트된다

**Given** 레이턴시가 모두 `null`(무효 처리)인 경우
**When** Level이 계산되면
**Then** 정답률만으로 Level이 결정되며 이전 Level에서 최대 1단계만 변동된다

**Given** Level이 변동되면
**When** 변동 이유가 저장될 때
**Then** `level_change_reason` 필드에 "정답률 {n}%, 중앙값 레이턴시 {ms}ms → Level {new}" 형식으로 기록된다

### Story 4.2: 오답 진단 메시지

As a **learner**,
I want to see a specific diagnostic message explaining why I got a word wrong,
So that I understand my confusion pattern and can target my weak points.

**Acceptance Criteria:**

**Given** 학습자가 오답을 선택하면
**When** 정답이 공개되면
**Then** `DiagnosticMessage` 컴포넌트가 렌더링되어 오답 이유 메시지가 표시된다

**Given** 오답 유형이 분석될 때
**When** 선택한 보기와 정답을 비교하면
**Then** "뉘앙스 혼동(유사 의미)", "반의어 선택", "문맥 무시" 등 범주형 진단 메시지가 출력된다

**Given** 동일 단어에서 반복 오답이 발생하면
**When** 오답 이력이 조회되면
**Then** "이 단어에서 {n}번 같은 유형의 오류 발생" 경고 메시지가 추가된다

### Story 4.3: 복습 주기 자동 계산 & 스케줄 저장

As a **learner**,
I want the system to automatically schedule my next review for each word based on its Cognitive Level,
So that I review words at the optimal time before I forget them.

**Acceptance Criteria:**

**Given** Level 산출 후 `submitQuizResultAction`이 완료되면
**When** `lib/srs/scheduler.ts`의 `computeNextReviewDate()`가 호출되면
**Then** Level별 주기(Level 1~2: 1/4/7일, Level 3: 4/7/14일, Level 4: 7/14/30일, Level 5: 7/30/90일)로 `next_review_at`이 계산된다
**And** `review_schedule` 테이블에 `word_id`, `next_review_at`, `interval_days`가 upsert된다

**Given** `getTodaySessionAction`이 호출되면
**When** 오늘의 세션이 구성되면
**Then** `next_review_at <= now()`인 단어들이 우선순위 순으로 반환된다

### Story 4.4: 14일 공백 감지 & 복귀 세션 모드

As a **learner**,
I want the app to detect when I've been away for 14+ days and provide a gentler re-entry session,
So that I don't feel overwhelmed returning after a long break.

**Acceptance Criteria:**

**Given** 학습자가 앱에 로그인하면
**When** `lib/srs/gap-detector.ts`의 `detectStudyGap()`이 마지막 학습일을 확인하면
**Then** 14일 이상 공백이 감지되면 `requiresReturnSession: true`가 반환된다

**Given** 복귀 세션 모드가 활성화되면
**When** 홈 페이지가 렌더링되면
**Then** "오랜만이에요! 복귀 세션으로 시작합니다" 안내 배너가 표시된다
**And** Level 3 이상 단어를 Level 2로 임시 하향하여 쉬운 퀴즈로 세션이 구성된다

### Story 4.5: 망각 임박 알림 (Edge Function Cron)

As a **learner**,
I want to receive a notification when words are about to be forgotten,
So that I never miss a review window and maintain my learning momentum.

**Acceptance Criteria:**

**Given** Supabase Cron이 매일 오전 9시에 실행되면
**When** `supabase/functions/notify/index.ts`가 트리거되면
**Then** `next_review_at <= now() + interval '24 hours'`인 단어를 가진 사용자에게 알림이 발송된다

**Given** 알림이 발송될 때
**When** 이메일 알림이 전송되면
**Then** "오늘 복습해야 할 단어가 {n}개 있습니다" 내용과 앱 링크가 포함된다

**Given** Edge Function 응답이 10초를 초과하면
**When** 타임아웃이 발생하면
**Then** 에러 로그가 기록되고 해당 사용자 알림만 다음 실행으로 재시도된다

---

## Epic 5: 진도 대시보드

학습자가 전체 단어의 Level 분포, 레이턴시 추이 그래프, 일별 학습 이력, 오답 패턴을 한 화면에서 확인할 수 있다.

### Story 5.1: Cognitive Level 분포 차트

As a **learner**,
I want to see how my vocabulary is distributed across Cognitive Levels 1 to 5,
So that I can understand my overall mastery at a glance and identify where most words are stuck.

**Acceptance Criteria:**

**Given** 학습자가 `/dashboard` 페이지에 접속하면
**When** `LevelDistribution` 컴포넌트가 렌더링되면
**Then** Level 1~5별 단어 수와 비율이 막대 또는 도넛 차트로 표시된다

**Given** 차트의 특정 Level 막대를 클릭하면
**When** 필터가 적용되면
**Then** 해당 Level의 단어 목록으로 이동한다

**Given** 등록된 단어가 없을 때
**When** 대시보드가 로드되면
**Then** "아직 단어가 없습니다. 단어를 추가해보세요!" 빈 상태 메시지가 표시된다

### Story 5.2: 단어별 레이턴시 추이 그래프

As a **learner**,
I want to see how my response latency for each word has changed over time,
So that I can visually confirm I'm getting faster and more fluent with specific vocabulary.

**Acceptance Criteria:**

**Given** 학습자가 `/words/[id]` 상세 페이지 또는 대시보드에서 단어를 선택하면
**When** `LatencyTrend` 컴포넌트가 렌더링되면
**Then** 해당 단어의 세션별 중앙값 레이턴시가 시계열 라인 차트로 표시된다

**Given** 레이턴시 데이터 포인트에 마우스를 올리면
**When** 툴팁이 표시되면
**Then** 해당 세션의 날짜, 레이턴시(ms), 정답 여부가 표시된다

**Given** 해당 단어의 레이턴시 기록이 3개 미만이면
**When** 차트가 렌더링되면
**Then** "데이터가 충분하지 않습니다. 더 많은 퀴즈를 풀면 추이가 표시됩니다." 안내가 표시된다

### Story 5.3: 일별 학습 이력 & 오답 패턴

As a **learner**,
I want to see my daily study history and recurring mistake patterns,
So that I can stay consistent and understand which types of errors I keep making.

**Acceptance Criteria:**

**Given** 학습자가 `/dashboard` 페이지에 접속하면
**When** `SessionHistory` 컴포넌트가 렌더링되면
**Then** 최근 30일 간의 일별 학습 이력이 달력 히트맵 또는 리스트로 표시된다
**And** 각 날짜에 완주 여부(완료/미완료)와 학습 단어 수가 표시된다

**Given** 재오답 분석 섹션이 표시될 때
**When** 오답 이력이 집계되면
**Then** 재오답률 상위 5개 단어와 오답 유형 분포(뉘앙스 혼동/반의어/문맥 무시)가 표시된다

**Given** 학습자가 재오답 단어를 클릭하면
**When** 단어 상세 페이지로 이동하면
**Then** 해당 단어의 오답 이력과 진단 메시지 기록을 확인할 수 있다
