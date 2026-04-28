# Project Context Analysis

## Requirements Overview

**Functional Requirements:**
33개 FR, 7개 도메인:
- 단어 관리 (FR1~6): CRUD + 스크래퍼 트리거 + 데이터 검수 UI
- 퀴즈 엔진 (FR7~12, FR32): Level-driven 퀴즈 유형 결정, 레이턴시 측정, Swipe-to-Sort 워밍업
- 숙련도 측정 (FR13~16, FR33): Level 자동 산출, 이상치 필터링, 오답 진단
- 복습 스케줄링 (FR17~20): 동적 SRS 주기, 복귀 세션 모드, 망각 임박 알림
- 세션 관리 (FR21~24): 일시정지·재개, 오프라인 상태 보존
- 진도 대시보드 (FR25~28): 레이턴시 추이 그래프, Level 분포, 재오답률
- 데이터 보안 (FR29~31): RLS, 이벤트 영구 기록, SEO 차단

**Non-Functional Requirements:**
- 퀴즈 화면 전환 < 100ms (레이턴시 측정 기준선)
- 레이턴시 측정 오차 ±50ms 이하
- Supabase 쿼리 p95 < 200ms
- RLS 전 테이블 적용
- 네트워크 단절 시 로컬 상태 보존 후 재동기화

**Scale & Complexity:**
- 복잡도 수준: Medium
- 기술 도메인: Full-stack Web (Next.js + Supabase + Python 파이프라인)
- 예상 아키텍처 구성 요소: 5개 (퀴즈 엔진, SRS 스케줄러, 스크래퍼 파이프라인, 알림 시스템, 진도 집계)

## Technical Constraints & Dependencies

- **렌더링:** Next.js App Router — 퀴즈·대시보드 Client Component, 정적 페이지 Server Component
- **DB/Auth:** Supabase (RLS 필수, REST/RPC, Edge Functions)
- **스크래퍼:** Python 스크립트 독립 운영 — Next.js 직접 결합 금지
- **알림:** Supabase Edge Functions + Cron (이메일 또는 Web Push)
- **지원 환경:** Chrome 최신 단일 타겟, SEO 차단

## Cross-Cutting Concerns Identified

1. **레이턴시 측정 신뢰성** — 탭 전환 감지, 이상치 필터링이 퀴즈 엔진 전 단계에 영향
2. **세션 상태 일관성** — 클라이언트 메모리 ↔ Supabase 동기화 (이탈·재연결·배치 전송)
3. **데이터 격리 (RLS)** — 현재 1인이지만 전 테이블에 `auth.uid() = user_id` 적용
4. **비동기 파이프라인** — 스크래퍼 트리거 → DB 적재, 알림 Cron 모두 Eventually Consistent
5. **Phase별 확장성** — Phase 2 AI 오답 생성·ELO 매트릭스, Phase 3 브라우저 확장을 고려한 인터페이스 경계
