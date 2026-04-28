# Project Scoping & Phased Development

## MVP Strategy & Philosophy

**MVP 접근법:** Problem-Solving MVP — "내가 단어를 아는지 모르는지 정밀하게 측정한다"는 단 하나의 명제를 검증
**배포 철학:** 즉각적 효능감 → 데이터 기반 수정 → 단계적 지능화. 1주일 내 첫 퀴즈 세션 실행
**리소스:** 1인 개발, Phase 간 완전한 완결성 확보로 개발 피로도 관리

## Phase 1 — MVP Core: 척추 구축

**목표:** "내가 단어를 아는지 모르는지 정밀하게 측정한다"

- Next.js + Supabase 기반 퀴즈 엔진
- `performance.now()` 초정밀 레이턴시 타이머
- Cognitive Level 1~5 자동 산출 (레이턴시 + 정답률)
- Swipe-to-Sort 세션 워밍업
- 오답 진단 메시지 ("틀린 이유: X")
- 기초 1/4/7일 복습 주기 (Level 기반 동적 조정)
- 단어 수동 등록 + Python 스크래퍼 기본 연동
- 키보드 단축키 퀴즈 UI

**결과물:** 단어를 등록하고 반응 속도에 따라 레벨이 변하며, 오답 이유를 진단해주는 웹앱

## Phase 2 — Intelligence Layer: 근육 보강

**목표:** "학습의 질을 높이고 지능화한다"

- AI 맞춤 오답 생성 (혼동 패턴 기반)
- TOEFL 코퍼스 Paragraph + Collocation 자동 스크래핑
- ELO × Cognitive Level 이중 평가 매트릭스
- AI 논리 역할 태깅 (Cause/Effect/Contrast)
- Context-Aware Scheduler

**결과물:** AI가 오답을 분석해 취약한 논리 구조를 공략하는 지능형 훈련 도구

## Phase 3 — Ecosystem: 생활 침투

**목표:** "학습을 의식하지 않아도 일상이 학습이 되게 한다"

- 브라우저 확장 프로그램 (실생활 단어 자동 감지·등록)
- Discover Weekly (Semantic Cluster 기반 자동 어휘 확장)
- Learning Vital Signs 장기 성장 리포트
- Tier System (Bronze→Platinum 어휘 등급)

**결과물:** 웹서핑 중에도 학습 단어가 강조되고, 어휘 건강 상태를 한눈에 보는 완성형 생태계

## Risk Mitigation Strategy

| 리스크 | 완화 전략 |
|---|---|
| 레이턴시 기준값 부적절 | Phase 1 실사용 2주 후 threshold 재조정 |
| 스크래핑 데이터 품질 | 수동 입력 폴백 항상 유지 |
| 개발 피로도 | Phase 간 완결성 확보, 다음 Phase는 선택 |
| AI 오답 생성 비용 | Phase 2에서 캐싱 전략 사전 설계 |
