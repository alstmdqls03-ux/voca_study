# Story 1.2: 이메일 회원가입 & 로그인 UI

## Story Info

- **Epic:** 1 — 기초 인프라, 인증 & 보안
- **Story:** 1.2
- **Status:** done
- **FRs:** FR29 (RLS 데이터 격리 — 로그인한 user_id로 RLS 작동)
- **ARCH:** ARCH-4 (Supabase Auth 연동, Next.js 미들웨어)

---

## User Story

As a **learner**,
I want to sign up and log in with my email address,
So that I can access my personalized vocabulary learning app securely.

---

## Acceptance Criteria

**AC1 — 로그인 성공**
- **Given** 비인증 사용자가 `/login` 페이지에 접속하면
- **When** 이메일과 비밀번호를 입력하고 "로그인" 버튼을 클릭하면
- **Then** Supabase Auth를 통해 인증되고 홈(`/`)으로 리다이렉트된다

**AC2 — 회원가입 성공**
- **Given** 신규 사용자가 회원가입 탭에서 이메일·비밀번호를 입력하면
- **When** "가입하기" 버튼을 클릭하면
- **Then** Supabase Auth에 계정이 생성되고 로그인 상태가 된다 (홈으로 리다이렉트)

**AC3 — 인증 사용자 보호 라우트 접근**
- **Given** 인증된 사용자가 인증 필요 라우트(`/quiz`, `/dashboard` 등)에 접근하면
- **When** 미들웨어가 세션을 확인하면
- **Then** 정상적으로 해당 페이지가 렌더링된다

**AC4 — 비인증 사용자 리다이렉트**
- **Given** 비인증 사용자가 인증 필요 라우트에 직접 접근하면
- **When** 미들웨어가 세션 없음을 감지하면
- **Then** `/login` 페이지로 리다이렉트된다

**AC5 — 로그인 실패 에러 표시**
- **Given** 사용자가 잘못된 이메일/비밀번호를 입력하면
- **When** 로그인을 시도하면
- **Then** 인라인 에러 메시지가 폼 아래에 표시된다 (toast 아님)

---

## Technical Context (Dev Agent 필독)

### 이 스토리가 존재하는 이유

Story 1.1에서 DB 스키마와 RLS가 설정됐다. `src/middleware.ts`도 이미 존재했으나
`/login` 페이지와 Server Actions가 없어 인증 플로우가 불완전했다.
이 스토리는 **인증 UI의 끝 to 끝 플로우**를 완성한다.

---

### 현재 코드베이스 상태

#### 이미 존재하는 파일들 (변경 금지)

| 파일 | 역할 |
|------|------|
| `src/lib/supabase/server.ts` | 서버 사이드 Supabase 클라이언트 (`createServerClient` 래퍼) |
| `src/lib/supabase/client.ts` | 브라우저 사이드 Supabase 클라이언트 (`'use client'` 파일) |
| `src/types/quiz.types.ts` | `ActionResult<T>` 타입 정의 |
| `src/lib/latency/`, `src/lib/srs/`, `src/stores/` | 핵심 알고리즘 — 건드리지 말 것 |

#### `ActionResult<T>` 타입 (모든 Server Actions에서 사용)

```typescript
// src/types/quiz.types.ts
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }
```

#### 이미 존재하는 `(auth)` 라우트 그룹 구조

```
src/app/(auth)/
  quiz/page.tsx       ← 이미 존재
  words/              ← 폴더만 존재
  dashboard/          ← 폴더만 존재
  admin/              ← 폴더만 존재
  layout.tsx          ← 이 스토리에서 생성 완료
```

---

### 생성 완료된 파일들

#### `src/actions/auth.actions.ts`

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { ActionResult } from '@/types/quiz.types'

export async function loginAction(
  _prevState: ActionResult<null>,
  formData: FormData,
): Promise<ActionResult<null>> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' }
  }

  redirect('/')
}

export async function signupAction(
  _prevState: ActionResult<null>,
  formData: FormData,
): Promise<ActionResult<null>> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return { success: false, error: error.message }
  }

  redirect('/')
}

export async function logoutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```

**패턴 핵심:**
- `_prevState` 파라미터: `useActionState`가 요구하는 시그니처 (미사용이어도 필수)
- 성공 시 `redirect('/')` — Next.js 내부적으로 throw 처리, "throw 금지" 규칙 예외
- 실패 시 `ActionResult<null>` 반환 — throw 금지
- **`@/lib/supabase/server`에서만 import** — `@supabase/ssr` 직접 import 절대 금지

#### `src/app/(public)/login/page.tsx`

```typescript
'use client'

import { useActionState, useState } from 'react'
import { loginAction, signupAction } from '@/actions/auth.actions'
import type { ActionResult } from '@/types/quiz.types'

const initialState: ActionResult<null> = { success: false, error: '' }

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [loginState, loginDispatch, loginPending] = useActionState(loginAction, initialState)
  const [signupState, signupDispatch, signupPending] = useActionState(signupAction, initialState)
  // ... (탭 UI + 인라인 에러 표시)
}
```

**패턴 핵심:**
- `useActionState` from `'react'` (React 19, Next.js 16) — `useFormState` 사용 금지 (deprecated)
- 에러: `<p className="text-sm text-red-600">` — 인라인, toast 아님
- `loginPending` / `signupPending` — 제출 중 버튼 비활성화

#### `src/app/(auth)/layout.tsx`

미들웨어가 인증을 담당하므로 최소 레이아웃. 추후 네비게이션 바 추가 확장점.

#### `src/middleware.ts` (기존 수정)

변경 내용:
- `isAuthRoute` → `isLoginRoute` (명명 명확화)
- 인증 사용자가 `/login` 접근 시 `/`로 리다이렉트 추가

```typescript
const isLoginRoute = request.nextUrl.pathname.startsWith('/login')

if (user && isLoginRoute) {
  return NextResponse.redirect(new URL('/', request.url))
}

if (!user && !isLoginRoute) {
  return NextResponse.redirect(new URL('/login', request.url))
}
```

---

### 절대 금지 사항

1. `@supabase/ssr` Server Action에서 직접 import → `@/lib/supabase/server` 경유
2. `@supabase/supabase-js` `createClient` 직접 사용 → SSR 쿠키 처리 누락
3. `useFormState` 사용 → React 19 deprecated, `useActionState` 사용
4. Server Action에서 `throw new Error()` → `ActionResult` 반환
5. `client.ts`의 `createClient`를 Server Action에서 사용 → `'use client'` 파일

---

### 환경변수

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

**Story 1.1 인계:** Docker 미설치로 로컬 Supabase 실행 불가. Supabase 원격 프로젝트 연결 후 테스트 (Story 1.3).
이 스토리 구현 검증 기준: `pnpm build` 에러 없음.

---

### 테스트 기준

**빌드 검증 (필수):**
- `pnpm build` — TypeScript 타입 에러 없이 성공

**Supabase 연결 후 E2E (Story 1.3에서):**
1. 비인증 상태 → `/` 접근 → `/login` 리다이렉트
2. 로그인 성공 → `/` 리다이렉트
3. 가입 성공 → `/` 리다이렉트
4. 잘못된 비밀번호 → 인라인 에러 표시
5. 인증 상태 → `/login` 접근 → `/` 리다이렉트

---

## Definition of Done

- [x] `src/actions/auth.actions.ts` 생성 (loginAction, signupAction, logoutAction)
- [x] `src/app/(public)/login/page.tsx` 생성 (탭 UI, 인라인 에러)
- [x] `src/app/(auth)/layout.tsx` 생성 (최소 레이아웃)
- [x] `src/middleware.ts` 업데이트 (인증 사용자 /login → / 리다이렉트)
- [x] `pnpm build` 에러 없음 — deprecation 경고 없이 빌드 성공
- [x] `middleware.ts` → `proxy.ts` 마이그레이션 (Next.js 16 규칙)
- [x] `pnpm test` 13개 통과 (기존 테스트 리그레션 없음)
- [ ] (Supabase 연결 후) 로그인/가입/프록시 플로우 수동 확인 — Story 1.3 의존

---

## Review Findings

### Senior Developer Review (AI)
- **Date:** 2026-04-29
- **Outcome:** Changes Requested
- **Layers:** Blind Hunter, Edge Case Hunter, Acceptance Auditor (전체 AC 통과 ✅)

#### Action Items
- [x] [Review][Decision] 회원가입 후 이메일 인증 UX — **결정: Supabase 대시보드에서 이메일 인증 비활성화** (가입 즉시 로그인). Story 1.3에서 Supabase 연결 시 확인 필요.
- [x] [Review][Patch] Server-side 입력값 검증 누락 — null/빈 문자열 검증 추가, signupAction 서버 측 minLength 검증 추가 [src/actions/auth.actions.ts]
- [x] [Review][Patch] 네트워크 에러 미처리 — Supabase 호출 try-catch 추가, 한국어 에러 메시지 반환 [src/actions/auth.actions.ts]
- [x] [Review][Patch] signupAction 원시 에러 메시지 노출 — `sanitizeSignupError()` 함수로 한국어 처리 [src/actions/auth.actions.ts]
- [x] [Review][Defer] logoutAction 에러 무시 — signOut 실패 시 에러 피드백 없음 [src/actions/auth.actions.ts:42] — deferred, MVP 범위 외
- [x] [Review][Defer] 탭 전환 중 pending 상태 혼란 — 로그인 제출 중 탭 전환 시 양쪽 버튼 로딩 상태 혼재 [src/app/(public)/login/page.tsx] — deferred, 낮은 우선순위 UX

### Review Follow-ups (AI)
- [x] [AI-Review] 이메일 인증 UX — Supabase 이메일 인증 비활성화로 결정, 코드 변경 없음
- [x] [AI-Review] auth.actions.ts 서버 측 입력값 검증 추가
- [x] [AI-Review] auth.actions.ts Supabase 호출 try-catch 추가
- [x] [AI-Review] signupAction 에러 메시지 한국어 처리 (sanitizeSignupError)

---

## Dev Agent Record

### File List

- `src/actions/auth.actions.ts` — 신규
- `src/app/(public)/login/page.tsx` — 신규
- `src/app/(auth)/layout.tsx` — 신규
- `src/proxy.ts` — 신규 (middleware.ts 대체, Next.js 16 proxy 규칙)
- `src/middleware.ts` — 삭제

### Change Log

- 2026-04-29: 모든 파일 구현 완료 (auth.actions.ts, login/page.tsx, (auth)/layout.tsx)
- 2026-04-29: middleware.ts → proxy.ts 마이그레이션 (Next.js 16 요구사항)
- 2026-04-29: 빌드 & 테스트 검증 완료 (pnpm build ✅, pnpm test 13/13 ✅)

### Completion Notes

- Supabase 원격 연결 없이 코드 구현 완료
- `pnpm build`: deprecation 경고 없이 성공 (`ƒ Proxy (Middleware)` 정상 인식)
- `pnpm test`: 기존 13개 테스트 모두 통과 (리그레션 없음)
- proxy.ts: `proxy()` 함수명으로 Next.js 16 규칙 준수, 동작은 middleware.ts와 동일
- 나머지 E2E 검증(로그인/가입 실제 플로우)은 Story 1.3 Supabase 연결 후 수행 예정
