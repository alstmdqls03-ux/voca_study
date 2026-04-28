---
stepsCompleted: ['step-01', 'step-02', 'step-03', 'step-04', 'step-05', 'step-06']
documentsUsed:
  prd: _bmad-output/planning-artifacts/prd/ (sharded, 10 files)
  architecture: _bmad-output/planning-artifacts/architecture/ (sharded, 6 files)
  epics: _bmad-output/planning-artifacts/epics.md
  ux: none
---

# Implementation Readiness Assessment Report

**Date:** 2026-04-28
**Project:** voca

## Document Inventory

### PRD (샤딩됨)
- `prd/index.md`
- `prd/executive-summary.md`
- `prd/functional-requirements.md`
- `prd/non-functional-requirements.md`
- `prd/project-scoping-phased-development.md`
- `prd/domain-specific-requirements.md`
- `prd/innovation-novel-patterns.md`
- `prd/project-classification.md`
- `prd/success-criteria.md`
- `prd/user-journeys.md`
- `prd/web-app-specific-requirements.md`

### Architecture (샤딩됨)
- `architecture/index.md`
- `architecture/core-architectural-decisions.md`
- `architecture/implementation-patterns-consistency-rules.md`
- `architecture/project-structure-boundaries.md`
- `architecture/starter-template-evaluation.md`
- `architecture/project-context-analysis.md`
- `architecture/architecture-validation-results.md`

### Epics & Stories
- `epics.md` (Epic 5개, Story 19개)

### UX Design
- 없음 (MVP 범위 내 수용)

**중복 문서:** 없음
**누락 문서:** UX Design (선택사항, 영향 없음)

## PRD Analysis

### Functional Requirements (33개)

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
FR11: [Phase 2 제외] 시스템은 오답 선택지를 학습자의 혼동 패턴 기반으로 생성한다
FR12: 시스템은 TOEFL 지문 문단 맥락 속에서 단어를 제시하는 퀴즈를 제공한다
FR13: 시스템은 레이턴시와 정답률을 기반으로 단어별 Cognitive Level(1~5)을 자동 산출한다
FR14: 시스템은 레이턴시 이상치(탭 전환 등)를 필터링하여 숙련도 계산에서 제외한다
FR15: 시스템은 단어별 레이턴시 추이를 시간 순으로 기록한다
FR16: 학습자는 단어가 레벨 업/다운된 이유를 확인할 수 있다
FR17: 시스템은 Cognitive Level별 동적 복습 주기를 자동 계산한다
FR18: 시스템은 망각 임박 단어 목록을 우선순위 정렬하여 오늘의 세션을 구성한다
FR19: 시스템은 14일 이상 공백 감지 시 복귀 세션 모드로 자동 전환한다
FR20: 시스템은 망각 임박 시점에 학습자에게 알림을 발송한다
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
FR32: 학습자는 세션 시작 전 워밍업에서 단어를 분류하여 퀴즈 순서를 재배열할 수 있다 (Swipe-to-Sort)
FR33: 시스템은 오답 시 "틀린 이유" 진단 메시지를 제공한다

### Non-Functional Requirements (12개)

NFR1: 퀴즈 화면 전환 < 100ms
NFR2: 페이지 초기 로딩 LCP < 2.5초
NFR3: Supabase 쿼리 응답 p95 < 200ms
NFR4: 레이턴시 측정 오차 ±50ms 이하
NFR5: Python 스크래퍼 단어 1개당 < 5초
NFR6: 전 테이블 RLS — auth.uid() = user_id
NFR7: HTTPS 전용
NFR8: 환경변수로 API 키 관리
NFR9: 네트워크 단절 시 로컬 상태 보존 후 재동기화
NFR10: 스크래퍼 실패 시 수동 폴백 자동 활성화
NFR11: Edge Function 응답 타임아웃 < 10초
NFR12: 스크래퍼 robots.txt 준수, 요청 간 최소 1초

### PRD Completeness Assessment

- FRs 33개 전체 명확하게 번호 지정됨
- NFRs 12개 측정 가능한 수치 기준 포함
- Phase 범위 명시 (FR11 Phase 2 제외)
- 도메인별 제약사항 별도 문서화됨

## Epic Coverage Validation

### Coverage Matrix

| FR | PRD 요구사항 요약 | Epic/Story | 상태 |
|---|---|---|---|
| FR1 | 단어 수동 등록 | Epic 2 / Story 2.1 | ✅ |
| FR2 | 예문·연어·논리역할 조회 | Epic 2 / Story 2.2 | ✅ |
| FR3 | 스크래퍼 트리거 | Epic 2 / Story 2.3 | ✅ |
| FR4 | 스크래핑 데이터 검수·승인 | Epic 2 / Story 2.3 | ✅ |
| FR5 | 스크래퍼 실패 시 수동 폴백 | Epic 2 / Story 2.3 | ✅ |
| FR6 | Level & 레이턴시 이력 조회 | Epic 2 / Story 2.2 | ✅ |
| FR7 | Level 기반 퀴즈 유형 결정 | Epic 3 / Story 3.2 | ✅ |
| FR8 | 레이턴시 ms 측정 | Epic 3 / Story 3.2 | ✅ |
| FR9 | 탭 전환 시 레이턴시 무효 | Epic 3 / Story 3.2 | ✅ |
| FR10 | 키보드 단축키 보기 선택 | Epic 3 / Story 3.2 | ✅ |
| FR11 | AI 오답 생성 | Phase 2 제외 | ➖ |
| FR12 | TOEFL 지문 맥락 퀴즈 | Epic 3 / Story 3.3 | ✅ |
| FR13 | Cognitive Level 1~5 산출 | Epic 4 / Story 4.1 | ✅ |
| FR14 | 레이턴시 이상치 필터링 | Epic 4 / Story 4.1 | ✅ |
| FR15 | 레이턴시 추이 기록 | Epic 4 / Story 4.1 + Epic 5 / Story 5.2 | ✅ |
| FR16 | 레벨 변동 이유 확인 | Epic 4 / Story 4.1 | ✅ |
| FR17 | Level별 동적 복습 주기 | Epic 4 / Story 4.3 | ✅ |
| FR18 | 망각 임박 단어 우선순위 세션 | Epic 4 / Story 4.3 | ✅ |
| FR19 | 14일 공백 → 복귀 세션 | Epic 4 / Story 4.4 | ✅ |
| FR20 | 망각 임박 알림 | Epic 4 / Story 4.5 | ✅ |
| FR21 | 세션 시작·일시정지·재개 | Epic 3 / Story 3.4 | ✅ |
| FR22 | 페이지 이탈 시 상태 저장 | Epic 3 / Story 3.4 | ✅ |
| FR23 | 세션 완료 결과 요약 | Epic 3 / Story 3.5 | ✅ |
| FR24 | 세션 중 단어 건너뛰기 | Epic 3 / Story 3.4 | ✅ |
| FR25 | Level 분포 조회 | Epic 5 / Story 5.1 | ✅ |
| FR26 | 레이턴시 추이 그래프 | Epic 5 / Story 5.2 | ✅ |
| FR27 | 일별 학습 이력 | Epic 5 / Story 5.3 | ✅ |
| FR28 | 재오답률·오답 패턴 | Epic 5 / Story 5.3 | ✅ |
| FR29 | RLS 데이터 격리 | Epic 1 / Story 1.1 | ✅ |
| FR30 | 학습 이벤트 영구 기록 | Epic 3 / Story 3.5 | ✅ |
| FR31 | 검색 엔진 인덱싱 차단 | 완료(robots.txt) | ✅ |
| FR32 | Swipe-to-Sort 워밍업 | Epic 3 / Story 3.1 | ✅ |
| FR33 | 오답 진단 메시지 | Epic 4 / Story 4.2 | ✅ |

### Missing Requirements

없음

### Coverage Statistics

- 총 PRD FRs: 33개
- MVP 범위 내 커버: 32개 (FR11 Phase 2 제외)
- 커버리지: **100%** (MVP 범위 기준)

## UX Alignment Assessment

### UX Document Status

없음 — 의도적 선택 (MVP 단계)

### Alignment Issues

없음 — 아키텍처 문서가 컴포넌트 경계를 명시적으로 정의
- `components/quiz/`: QuizCard, OptionList, WarmupSwipe, SessionResult, DiagnosticMessage
- `components/dashboard/`: LevelDistribution, LatencyTrend, SessionHistory
- `components/words/`: WordForm, WordDetail

### Warnings

- ⚠️ 공식 UX 설계 문서 없음 — 퀴즈 UX(Swipe-to-Sort 인터랙션, 레이턴시 시각화 등)는 구현 시 직접 결정 필요
- 권고: Sprint 2(단어 관리) 이후 `[CU]` bmad-create-ux-design 실행 권장

## Epic Quality Review

### Epic 구조 검증

| Epic | 사용자 가치 | 독립성 | 판정 |
|---|---|---|---|
| Epic 1: 기초 인프라, 인증 & 보안 | ✅ 목표가 사용자 중심 ("계정 생성·로그인") | ✅ 완전 독립 | ✅ |
| Epic 2: 단어 관리 | ✅ | ✅ Epic 1만 의존 | ✅ |
| Epic 3: 퀴즈 엔진 & 세션 관리 | ✅ | ✅ Epic 1+2 의존 | ✅ |
| Epic 4: 숙련도 측정 & 복습 스케줄링 | ✅ | ✅ Epic 1+2+3 의존 | ✅ |
| Epic 5: 진도 대시보드 | ✅ | ✅ Epic 1+2+3+4 의존 | ✅ |

### 스토리 품질 검사

#### 🔴 Critical Violations
없음

#### 🟠 Major Issues
없음

#### 🟡 Minor Concerns

1. **Story 1.1** — DB 마이그레이션은 개발자 작업이지만, 그린필드 프로젝트의 필수 기반 스토리로 인정 가능. 스타터 템플릿 초기화(ARCH-1)는 이미 완료 상태이므로 올바른 구성.

2. **Story 1.3** — Vercel 배포는 직접적 사용자 가치보다 개발자 가치. 그러나 "학습자가 언제든 앱에 접근 가능"한 전제 조건으로 수용.

3. **Story 3.2 AC** — `lib/latency/measure.ts` 내부 구현 참조가 AC에 포함됨. 시스템 수준 요구사항(FR8)이므로 허용되나, 구현 에이전트가 내부 구현 세부사항으로 인식해야 함.

4. **Story 4.5** — Edge Function Cron은 운영자 관점 스토리. FR20(학습자 알림 수신)을 달성하기 위한 필수 인프라로 수용.

### 의존성 분석

**Epic 내 스토리 순서 검증:**
- Epic 1: 1.1(DB) → 1.2(Auth) → 1.3(배포) ✅ 순방향
- Epic 2: 2.1(등록) → 2.2(조회) → 2.3(스크래퍼) ✅ 순방향
- Epic 3: 3.1(워밍업) → 3.2(측정) → 3.3(맥락퀴즈) → 3.4(세션관리) → 3.5(결과제출) ✅ 순방향
- Epic 4: 4.1(Level산출) → 4.2(진단메시지) → 4.3(복습주기) → 4.4(공백감지) → 4.5(알림) ✅ 순방향
- Epic 5: 5.1(분포) → 5.2(추이) → 5.3(이력) ✅ 순방향

**DB 테이블 생성 타이밍:**
- words, quiz_sessions, latency_logs, review_schedule → Story 1.1에서 일괄 생성
- 그린필드 프로젝트 특성상 초기 전체 스키마 정의가 적절 ✅

### Best Practices Compliance Checklist

| 항목 | 상태 |
|---|---|
| 모든 Epic이 사용자 가치 전달 | ✅ |
| Epic 독립적으로 기능 가능 | ✅ |
| 스토리 적정 크기 | ✅ |
| 순방향 의존성 없음 | ✅ |
| DB 테이블 타이밍 적절 | ✅ |
| 명확한 인수 조건 | ✅ |
| FR 추적성 유지 | ✅ |

## Summary and Recommendations

### Overall Readiness Status

## ✅ READY FOR IMPLEMENTATION

### Critical Issues Requiring Immediate Action

없음 — 구현 착수를 블로킹하는 Critical Issue 없음

### Minor Items (구현 중 처리 가능)

1. **UX 설계 문서 없음** — Swipe-to-Sort, 레이턴시 시각화 등 인터랙션 세부사항은 Epic 3 구현 시 직접 결정 필요. Story 3.1(Swipe-to-Sort) 착수 전 `[CU]` UX 설계 실행 권장.
2. **Story 1.1 DB 스키마** — 테이블 컬럼 상세 정의(nullable, default, index)는 마이그레이션 작성 시 결정 필요. 아키텍처 문서의 naming convention(snake_case) 준수 필수.
3. **Story 3.2 AC 구현 세부사항** — `lib/latency/measure.ts` 참조가 AC에 포함됨. 구현 에이전트가 이를 비즈니스 로직이 아닌 기술 구현 지침으로 인식하도록 주의.

### Recommended Next Steps

1. **[SP] Sprint Planning** 실행 — 19개 스토리를 구현 우선순위로 정렬하고 Sprint 계획 수립
2. **Epic 1부터 순서대로 구현** — Story 1.1(DB 마이그레이션) → Story 1.2(Auth) → Story 1.3(배포)
3. **Epic 3 착수 전** `[CU]` UX 설계 고려 — 퀴즈 UX 인터랙션 사전 정의 권장
4. **구현 사이클 준수**: `[CS]` Create Story → `[VS]` Validate → `[DS]` Dev Story → `[CR]` Code Review

### Assessment Summary

- 총 검토 항목: FR 33개, NFR 12개, Epic 5개, Story 19개
- Critical 이슈: **0개**
- Major 이슈: **0개**
- Minor 관심사항: **3개** (모두 구현 중 처리 가능)
- FR 커버리지: **100%** (MVP 범위 기준)

---
**평가일:** 2026-04-28
**평가 결과:** READY FOR IMPLEMENTATION 🚀
