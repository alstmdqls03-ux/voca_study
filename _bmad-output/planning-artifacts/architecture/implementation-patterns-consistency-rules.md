# Implementation Patterns & Consistency Rules

## 잠재적 충돌 지점 (7개 영역)

## Naming Patterns

**DB 명명 규칙:**
- 테이블: `snake_case` 복수형 — `words`, `quiz_sessions`, `latency_logs`
- 컬럼: `snake_case` — `cognitive_level`, `created_at`, `user_id`
- 외래키: `{참조테이블_단수}_id` — `word_id`, `session_id`
- 인덱스: `idx_{테이블}_{컬럼}` — `idx_words_user_id`

**코드 명명 규칙:**
- 컴포넌트: `PascalCase` — `QuizCard`, `LatencyTimer`
- 파일: `PascalCase.tsx` (컴포넌트), `camelCase.ts` (유틸·훅)
- 함수/변수: `camelCase` — `calculateCognitiveLevel`, `latencyMs`
- Zustand 스토어: `use{Name}Store` — `useQuizSessionStore`
- Server Actions: `{동사}{명사}Action` — `submitQuizResultAction`
- Supabase 테이블 타입: `Database['public']['Tables']['words']['Row']`

**라우트 명명:**
- 페이지: `/quiz`, `/dashboard`, `/words`, `/admin`
- API: Server Actions 기반 (REST 엔드포인트 없음)

## Structure Patterns

**디렉토리 구조 규칙:**
```
src/
  app/                    # App Router 페이지 (Server Components 기본)
    (auth)/               # 인증 필요 라우트 그룹
    (public)/             # 공개 라우트 그룹
  components/
    quiz/                 # 퀴즈 관련 Client Components
    dashboard/            # 대시보드 관련 Client Components
    ui/                   # 범용 UI 컴포넌트
  lib/
    srs/                  # SRS 알고리즘 (순수 함수, Vitest 테스트 대상)
    latency/              # 레이턴시 측정·필터링 (순수 함수)
    supabase/             # Supabase 클라이언트 초기화
  stores/                 # Zustand 스토어
  actions/                # Server Actions
  types/                  # 공유 TypeScript 타입
```

**테스트 파일 위치:** 테스트 대상 파일과 동일 경로, `*.test.ts`
- `src/lib/srs/scheduler.ts` → `src/lib/srs/scheduler.test.ts`
- `src/lib/latency/filter.ts` → `src/lib/latency/filter.test.ts`

## Format Patterns

**Server Actions 응답 형식 (일관된 Result 타입):**
```typescript
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }
```
모든 Server Actions는 이 타입을 반환 — `throw` 금지

**Supabase 쿼리 오류 처리:**
```typescript
const { data, error } = await supabase.from('words').select()
if (error) return { success: false, error: error.message }
return { success: true, data }
```

**날짜/시간:** DB는 `timestamptz`, 클라이언트 전달 시 ISO 8601 문자열
**레이턴시:** 항상 `number` (ms 단위 정수), 변수명에 `Ms` 접미사 — `responseLatencyMs`

## Communication Patterns (Zustand)

**스토어 슬라이스 규칙:**
```typescript
// stores/quizSession.store.ts
interface QuizSessionState {
  currentIndex: number
  answers: QuizAnswer[]       // 답변 이력
  latencies: (number | null)[] // ms 단위, 무효 처리된 항목은 null
  status: 'idle' | 'active' | 'paused' | 'completed'
}
```
- 상태 업데이트: **불변 업데이트** (`set(state => ({ ...state, ... }))`)
- 직접 뮤테이션 금지

**localStorage 백업 키:** `voca_quiz_session_draft` (단일 키, 직렬화된 JSON)

## Process Patterns

**에러 처리:**
- Server Actions: `ActionResult` 반환, `try-catch` 내부 처리
- 클라이언트: `success === false` 분기로 토스트 또는 인라인 에러 표시
- `console.error`는 개발 환경에서만 허용, 프로덕션은 Vercel 로그로만

**로딩 상태:**
- 로컬 로딩: `useState<boolean>` (컴포넌트 내부)
- 세션 레벨 로딩: Zustand `status` 필드 활용
- 전역 로딩 스피너 없음 — 각 UI 컴포넌트가 자체 로딩 처리

**레이턴시 측정 패턴 (필수 준수):**
```typescript
// lib/latency/measure.ts 에서만 측정 로직 구현
// 컴포넌트에서 직접 performance.now() 호출 금지
import { startLatencyMeasure, endLatencyMeasure } from '@/lib/latency/measure'
```

## Enforcement Guidelines

**All AI Agents MUST:**
- DB 컬럼은 반드시 `snake_case`
- Server Actions는 반드시 `ActionResult<T>` 반환
- `performance.now()` 직접 호출 금지 — `lib/latency/measure.ts` 경유
- Zustand 상태 직접 뮤테이션 금지
- `lib/srs/`, `lib/latency/` 함수는 순수 함수로 유지 (부수효과 없음)
- 컴포넌트에서 Supabase 클라이언트 직접 import 금지 — `lib/supabase/` 경유
