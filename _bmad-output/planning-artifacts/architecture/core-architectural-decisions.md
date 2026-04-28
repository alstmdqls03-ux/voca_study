# Core Architectural Decisions

## Decision Priority Analysis

**Critical Decisions (구현 블로킹):**
- 상태 관리: Zustand (퀴즈 세션 슬라이스)
- API 패턴: 혼합 전략 (클라이언트 SDK + Server Actions)
- DB 마이그레이션: Supabase CLI

**Important Decisions (아키텍처 형성):**
- 오프라인 대비: localStorage + beforeunload (MVP)

**Deferred Decisions (Post-MVP):**
- IndexedDB + Service Worker (Phase 3 PWA 전환 시)
- AI 오답 생성 캐싱 전략 (Phase 2)
- ELO 매트릭스 연산 레이어 (Phase 2)

## Data Architecture

- **DB:** Supabase PostgreSQL (Managed)
- **마이그레이션:** Supabase CLI — `supabase/migrations/` 폴더로 스키마 변경 이력 추적, `supabase db push`로 서버 반영
- **RLS:** 전 테이블 `auth.uid() = user_id` 조건 적용 — 멀티유저 확장 대비
- **캐싱:** 없음 (MVP) — Supabase 쿼리 p95 < 200ms 목표로 충분

## Authentication & Security

- **인증:** Supabase Auth (이메일 단독, MVP) → Phase 2+ Google OAuth 확장
- **권한:** RLS 전담, Next.js 미들웨어로 비인증 접근 차단
- **API 키:** 환경변수 전용 (`NEXT_PUBLIC_` prefix는 클라이언트 노출 허용 키만)
- **SEO 차단:** `robots.txt` 전체 인덱싱 차단

## API & Communication Patterns

**혼합 전략:**
- **클라이언트 SDK (읽기):** 퀴즈 목록 불러오기, 단어 데이터 조회, 대시보드 집계
- **Server Actions (쓰기/연산):** 퀴즈 결과 제출, SRS 주기 재계산, Cognitive Level 산출, 레이턴시 배치 저장

**레이턴시 데이터 전송:** 세션 종료 시 배치 전송 (실시간 전송 금지 — 측정 정확도 보호)

## Frontend Architecture

**상태 관리: Zustand**
- `useQuizSessionStore` — 현재 문제 번호, 누적 레이턴시 데이터, 답변 이력
- `useSessionResultStore` — 세션 완료 후 결과 요약
- 페이지 이탈 시 → localStorage 백업 → 재방문 시 복원 후 Supabase 동기화

**컴포넌트 구조:**
- `src/app/` — App Router 페이지 (Server Components 기본)
- `src/components/quiz/` — 퀴즈 UI (Client Components, `"use client"`)
- `src/components/dashboard/` — 진도 시각화
- `src/lib/srs/` — SRS 알고리즘 (Vitest 단위 테스트 대상)
- `src/lib/latency/` — 레이턴시 측정·필터링 로직

**레이턴시 측정 흐름:**
```
requestAnimationFrame 콜백 → performance.now() 기록 시작
→ 사용자 첫 입력 → performance.now() 기록 종료
→ visibilitychange 감지 시 해당 문제 무효 처리
→ ±2 표준편차 이상치 필터링 (lib/latency/)
```

**오프라인 대비 (MVP):**
- `beforeunload` 이벤트 → Zustand 세션 상태를 localStorage에 직렬화 저장
- 재방문 시 localStorage 복원 → Supabase 배치 동기화 → localStorage 클리어

## Infrastructure & Deployment

- **호스팅:** Vercel (Next.js zero-config, Edge Functions 지원)
- **Supabase Edge Functions:** 망각 임박 알림 Cron, 스크래퍼 트리거 엔드포인트
- **Python 스크래퍼:** 독립 스크립트 — Supabase Edge Function HTTP 트리거로 연결
- **CI/CD:** Vercel GitHub 연동 (main 브랜치 자동 배포)
- **환경 분리:** `.env.local` (개발) / Vercel 환경변수 (프로덕션)
- **모니터링:** Vercel Analytics (MVP) — 별도 APM 도입 없음

## Decision Impact Analysis

**구현 순서:**
1. Supabase 프로젝트 생성 + CLI 마이그레이션 초기화
2. Next.js 프로젝트 초기화 (create-next-app)
3. Supabase Auth + RLS 연동
4. Zustand 세션 스토어 구현
5. 레이턴시 측정 엔진 (`lib/latency/`) + Vitest 테스트
6. SRS 알고리즘 (`lib/srs/`) + Vitest 테스트
7. 퀴즈 UI (Client Components)
8. Server Actions (결과 제출 + Level 산출)
9. 대시보드
10. 알림 Edge Function + Cron

**크로스 컴포넌트 의존성:**
- `lib/latency/` ← 퀴즈 엔진이 의존 (측정값 신뢰도가 Level 산출 정확도 결정)
- `lib/srs/` ← Server Actions가 의존 (Level 산출 후 주기 재계산)
- Zustand 스토어 ← 퀴즈 UI + localStorage 백업 둘 다 의존
