# Story 1.3: Vercel 배포 & 환경 설정

## Story Info

- **Epic:** 1 — 기초 인프라, 인증 & 보안
- **Story:** 1.3
- **Status:** ready-for-dev
- **FRs:** ARCH-10 (Vercel 배포: main 브랜치 자동 배포, 환경변수 설정)

---

## User Story

As a **developer**,
I want the app to be automatically deployed to Vercel on every push to the main branch,
So that the latest version is always accessible and I can focus on development rather than manual deployments.

---

## Acceptance Criteria

**AC1 — GitHub → Vercel 자동 배포**
- **Given** GitHub 리포지토리가 Vercel 프로젝트와 연결되어 있을 때
- **When** main 브랜치에 푸시하면
- **Then** Vercel에서 자동 빌드 & 배포가 시작된다

**AC2 — 환경변수 설정**
- **Given** Vercel 환경변수 설정 화면에서
- **When** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`를 입력하면
- **Then** 프로덕션 앱이 Supabase에 정상 연결된다

**AC3 — HTTPS 전용 서빙**
- **Given** 배포된 앱에서 `/login`에 접속하면
- **When** 브라우저에서 접근할 때
- **Then** HTTPS로만 제공되며 HTTP는 자동 리다이렉트된다

**AC4 — 로그인/회원가입 플로우 E2E 검증**
- **Given** 배포된 프로덕션 앱에 접속하면
- **When** 이메일 로그인 및 회원가입을 시도하면
- **Then** Story 1.2 AC1~AC5가 프로덕션 환경에서 모두 통과한다

**AC5 — Supabase DB 스키마 적용**
- **Given** 원격 Supabase 프로젝트에 연결하면
- **When** `supabase db push` 를 실행하면
- **Then** Story 1.1에서 설계된 모든 테이블/RLS 정책이 원격 DB에 반영된다

---

## Technical Context (Dev Agent 필독)

### 이 스토리가 존재하는 이유

Story 1.1(DB 스키마 + RLS)과 Story 1.2(인증 UI)가 완료됐다. 그러나 Supabase 로컬 실행 환경이 없어 (Docker 미설치) 실제 Auth 플로우 테스트가 불가능했다. 이 스토리는:

1. Supabase 원격 프로젝트에 DB 스키마를 적용한다
2. Vercel에 앱을 배포하여 실제 환경에서 전체 인증 플로우를 검증한다
3. Story 1.2에서 결정한 사항(이메일 인증 비활성화)을 Supabase 대시보드에서 적용한다

**이 스토리는 대부분 수동 설정 작업이다.** 코드 변경은 최소화되며, 주요 작업은 Vercel/Supabase 대시보드에서 진행한다.

---

### 현재 코드베이스 상태

#### 코드 변경이 필요 없는 파일들 (이미 Vercel-ready)

| 파일 | 상태 |
|------|------|
| `next.config.ts` | 현재 비어있음 — Vercel zero-config 배포 완전 지원 |
| `src/proxy.ts` | Next.js 16 proxy 파일 — Vercel Edge에서 정상 작동 |
| `src/actions/auth.actions.ts` | Server Actions — Vercel Serverless Functions로 자동 변환 |
| `src/app/(auth)/layout.tsx` | 최소 레이아웃 |
| `src/app/(public)/login/page.tsx` | 로그인 UI |

#### 주의: 추가 마이그레이션 파일

`supabase/migrations/` 에 `0006_updated_at_trigger.sql` 파일이 존재한다. 이는 원래 아키텍처 명세에 없던 파일로, `supabase db push` 시 함께 적용된다. 확인 후 진행할 것.

---

### 필수 수동 작업 순서

아래 작업들을 순서대로 수행해야 한다. **코드 변경 없이 설정 작업만으로 완료 가능하다.**

#### 단계 1: Supabase 원격 프로젝트 설정

1. [supabase.com](https://supabase.com) → 새 프로젝트 생성 (이미 있으면 skip)
2. Project Settings → API에서 아래 값 복사:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

#### 단계 2: Supabase 이메일 인증 비활성화 (Story 1.2 결정사항)

Supabase 대시보드 → Authentication → Providers → Email:
- **"Confirm email" 토글 OFF** (가입 즉시 로그인 허용)

#### 단계 3: DB 스키마 원격 적용

```bash
# .env.local에 DATABASE_URL이 없으면:
# Supabase 대시보드 → Settings → Database → Connection string (URI mode) 복사

supabase db push --db-url "postgresql://..."

# 또는 Supabase CLI로 원격 연결 후:
supabase link --project-ref <project-ref>
supabase db push
```

적용 후 Supabase Studio → Table Editor에서 확인:
- `words`, `quiz_sessions`, `quiz_session_words`, `word_reviews` 테이블 존재 여부
- RLS 정책 활성화 여부

#### 단계 4: TypeScript 타입 재생성 (필요 시)

```bash
supabase gen types typescript --project-id <project-ref> > src/types/database.types.ts
```

#### 단계 5: .env.local 설정 (로컬 개발용)

```bash
# .env.local (gitignore에 포함, 커밋 금지)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

`pnpm dev` 실행 후 로컬에서 로그인 플로우 검증.

#### 단계 6: GitHub 리포지토리 연결 (없는 경우)

```bash
git init
git add -A
git commit -m "feat: initial commit — epic 1 auth infrastructure"
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

#### 단계 7: Vercel 프로젝트 생성 & 배포

1. [vercel.com](https://vercel.com) → New Project → Import Git Repository
2. 리포지토리 선택 후 Next.js auto-detected 확인
3. Environment Variables 추가:
   - `NEXT_PUBLIC_SUPABASE_URL` = (단계 1에서 복사한 값)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (단계 1에서 복사한 값)
   - `SUPABASE_SERVICE_ROLE_KEY` = (단계 1에서 복사한 값)
4. Deploy 클릭

**Vercel zero-config 설명:**
- `next.config.ts`에 특별 설정 불필요 — Vercel이 Next.js 16 자동 감지
- `proxy.ts`(Next.js 16 Edge Middleware) → Vercel Edge에서 자동 실행
- Server Actions → Vercel Serverless Functions로 자동 변환
- HTTPS → Vercel이 기본 제공 (vercel.app 도메인은 HTTPS only)

#### 단계 8: 배포 후 E2E 검증

배포된 URL(`https://<project>.vercel.app`)에서:

1. `/` 접근 → 비인증 상태 → `/login` 리다이렉트 확인
2. 로그인 성공 → `/` 리다이렉트 확인
3. 회원가입 성공 → `/` 리다이렉트 확인 (이메일 인증 없이 즉시 로그인)
4. 잘못된 비밀번호 → 인라인 에러 "이메일 또는 비밀번호가 올바르지 않습니다." 표시 확인
5. 인증 상태에서 `/login` 접근 → `/` 리다이렉트 확인
6. HTTP URL 접근 → HTTPS 자동 리다이렉트 확인

---

### 환경변수 요약

| 변수명 | 용도 | 위치 |
|--------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 클라이언트/서버 모두 사용 | Vercel + .env.local |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 클라이언트/서버 모두 사용 | Vercel + .env.local |
| `SUPABASE_SERVICE_ROLE_KEY` | 서버 전용 (어드민 작업) | Vercel + .env.local |

**보안 주의:**
- `SUPABASE_SERVICE_ROLE_KEY`는 절대 `NEXT_PUBLIC_` 접두사 사용 금지
- `.env.local`은 절대 Git 커밋 금지 (`.gitignore`에 포함되어 있음)

---

### 코드 변경 없음 확인

이 스토리에서 코드 변경은 원칙적으로 없다. 만약 `supabase gen types` 재실행 후 `src/types/database.types.ts`가 변경된다면 그것이 유일한 코드 변경이다.

`next.config.ts`는 현재 빈 config로 충분하다 — 추가 설정 불필요.

---

### 테스트 기준

**로컬 검증:**
- `.env.local` 설정 후 `pnpm dev` 실행
- 로그인/가입/로그아웃 플로우 정상 작동

**프로덕션 검증 (배포 후):**
- AC1~AC5 모두 통과
- Vercel 빌드 로그 에러 없음
- Supabase Studio에서 테이블 및 RLS 정책 확인

---

## Definition of Done

- [ ] Supabase 원격 프로젝트 연결 및 환경변수 확인
- [ ] Supabase 이메일 인증 비활성화 (Confirm email OFF)
- [ ] `supabase db push` 완료 — 모든 테이블/RLS 원격 적용
- [ ] `.env.local` 설정 후 로컬 인증 플로우 수동 확인
- [ ] GitHub 리포지토리에 main 브랜치 push
- [ ] Vercel 프로젝트 생성 및 환경변수 설정
- [ ] Vercel 자동 배포 완료 (빌드 에러 없음)
- [ ] 배포된 URL에서 AC1~AC5 E2E 검증 완료
- [ ] (선택) `supabase gen types` 재실행 후 타입 파일 최신화

---

## Dev Agent Record

### File List

- 코드 변경 없음 (설정 작업 전용)
- `src/types/database.types.ts` — supabase gen types 재실행 시 업데이트 가능

### Change Log

_(구현 후 기록)_

### Completion Notes

_(구현 후 기록)_
