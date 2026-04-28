---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: []
session_topic: '개인 맞춤형 단어 학습 시스템 (VOCA) — TOEFL 고난도 영어 단어 암기'
session_goals: '에빙하우스 망각 곡선 기반 간격 반복 알고리즘, 자동화 스크래핑 DB, 멀티 퀴즈 엔진, 학습 진도 대시보드'
selected_approach: 'ai-recommended'
techniques_used: ['First Principles Thinking', 'Cross-Pollination', 'SCAMPER Method']
ideas_generated: 33
session_active: false
workflow_completed: true
---

## Session Overview

**Topic:** 개인 맞춤형 단어 학습 시스템 (VOCA) — TOEFL 고난도 영어 단어 암기
**Goals:** 에빙하우스 망각 곡선 기반 간격 반복 알고리즘 (1/4/7일 주기), 외부 스크래핑으로 단어 DB 자동 구축, 동의어·뜻·빈칸채우기 멀티 퀴즈 엔진, 학습 진도 대시보드

### Session Setup

기술 스택 방향이 정해진 상태 (Next.js + Tailwind / Supabase / Python 스크래핑)에서
기능·UX·제품 차별화 아이디어를 창의적으로 확장하기 위한 브레인스토밍 세션.

---

## Technique Selection

**접근 방식:** AI 추천 기법 (AI-Recommended)
**분석 컨텍스트:** TOEFL 단어 학습 시스템 — 기능·UX·차별화 아이디어 발산

**추천 기법 시퀀스:**
- **First Principles Thinking:** 기존 설계의 모든 가정을 해체하고 근본 진실에서 재출발
- **Cross-Pollination:** Netflix·Dark Souls·Spotify·Chess 등 타 도메인 검증 메커니즘 이식
- **SCAMPER Method:** 발산된 아이디어를 7렌즈로 체계적 정제 및 우선순위화

---

## Technique Execution Results

### Phase 1: First Principles Thinking

**핵심 통찰:** "단어를 안다"는 것은 이분법이 아니라 5단계 연속 스펙트럼이다.
1. 본 적 있다 → 2. 뜻이 떠오른다 → 3. 문장에서 이해된다 → 4. 직접 만들 수 있다 → 5. 자동으로 나온다

**돌파구:** 현재 설계(동의어/뜻/빈칸 3종 퀴즈)는 전부 수용형(Receptive)이며, 사용자가 원하는 생산형(Productive) 역량 측정이 전혀 없다는 설계적 결함 발견.

**[Cognitive #1]** Proficiency Leveling System
_Concept_: 각 단어에 1~5 숙련도 레벨 부여, 정답률+반응 속도로 유동 조정.
_Novelty_: 주관적 Easy/Hard 버튼이 아닌 행동 데이터 기반 객관적 레벨 자동 산출.

**[Cognitive #2]** Adaptive Quiz Engine (Level-Mapped)
_Concept_: Level 1-2 인식형, Level 3-4 생산형, Level 5 자동화형. 퀴즈 유형이 숙련도의 함수.
_Novelty_: 학습 목표(인식→생산→자동화)의 단계적 심화가 시스템에 내재화.

**[Cognitive #3]** Spaced Repetition 2.0
_Concept_: 1/4/7일 기본 주기를 레벨 기반으로 변형 — 낮은 레벨 빈도 증가, Level 5는 7→30→90일 기하급수 확장.
_Novelty_: "거의 아는 단어"와 "완전히 아는 단어"를 구조적으로 다르게 처리.

**[Cognitive #4]** Collocation-Enriched Context Scraping
_Concept_: 단어+뜻+예문에 더해 실제 뉴스/논문에서 연어(Collocation)와 문맥 데이터 수집.
_Novelty_: 사전 예문이 아닌 실제 코퍼스 기반 — TOEFL 지문 분포에 가장 근접.

**[Cognitive #5]** Latency Tracking Hook
_Concept_: performance.now()로 퀴즈 시작→첫 입력(TTI)→최종 제출(TTC) 클라이언트 기록.
_Novelty_: 브라우저 고해상도 타이머로 측정 오차를 밀리초 이하로 압축.

**[Cognitive #6]** Fluency Score Algorithm (TTC/단어길이 정규화)
_Concept_: Fluency Score = TTC ÷ word.length로 단어 길이 편향 제거. <2초 → Level Up, 5초↑ → Hold, 오답 → Level Down.
_Novelty_: 절대 시간이 아닌 단어당 정규화 시간으로 평가.

**[Cognitive #7]** Input Event Differentiation
_Concept_: onKeyDown vs 터치/클릭 분리하여 TTI 기준점 통일.
_Novelty_: 크로스 디바이스 측정 일관성 확보.

**[Context #8]** Paragraph-Level Contextual Scraping
_Concept_: Nature, Scientific American, TOEFL 기출에서 단어가 포함된 전체 문단을 세트로 추출.
_Novelty_: 인위적 사전 예문이 아닌 실제 학술 코퍼스.

**[Context #9]** AI Logical Role Tagging
_Concept_: AI가 단어의 지문 내 기능(Function: Cause/Effect/Contrast)과 뉘앙스(Negative/Sudden) 자동 태깅.
_Novelty_: 담화 기능을 학습 메타데이터로 구조화 — 독해 전략 훈련 데이터.

**[Context #10]** Paragraph-Level Inference Quiz
_Concept_: "이 단어의 뜻은?" 대신 "이 단어 이후 내용으로 적절한 것은?" — 논리 흐름 추론.
_Novelty_: TOEFL Vocabulary 문제 유형과 1:1 매핑.

**[Context #11]** Chunk-Based Learning Cards
_Concept_: decline precipitously, rise exponentially 같은 고빈도 Collocation Chunk를 학습 단위로 구성.
_Novelty_: 단어 암기 → 언어 패턴 내재화로 패러다임 전환.

---

### Phase 2: Cross-Pollination

**[Netflix #17]** Context-Aware Session Scheduler
_Concept_: 시간대·요일·직전 세션 길이 데이터로 퀴즈 모드 자동 선택. 아침 → 인식형 3분, 심야 → 추론형 15분.
_Novelty_: 컨텍스트가 최적 학습 형태를 결정 — 사용자 선택 불필요.

**[Netflix #18]** Session Length Prediction
_Concept_: 과거 패턴으로 가용 시간 예측, 완주 가능한 퀴즈 세트 동적 구성.
_Novelty_: 고정된 "오늘의 20단어"가 아닌 가용 시간 적응형 학습 단위.

**[Netflix #19]** "Because you struggled with X" Transparency
_Concept_: 시스템 판단 근거를 사용자에게 명시 — 설명 가능한 SRS.
_Novelty_: 블랙박스 알고리즘이 아닌 신뢰 기반 개인화.

**[Dark Souls #20]** Failure as Data, Not Penalty
_Concept_: 오답 시 "틀렸습니다" 대신 "이 단어를 틀린 이유: 뉘앙스 혼동 / 유사 오답 패턴 발견" 진단.
_Novelty_: 오답 = 데이터 포인트, 누적 패턴으로 인지적 약점 지도(Weakness Map) 생성.

**[Dark Souls #21]** Boss Word Encounters
_Concept_: Level 5 단어 중 고빈도 오답이 "보스 단어"로 등장. 복합 조건(시간제한+문단추론+작문)으로 최종 검증.
_Novelty_: "알고 있다"는 착각을 깨는 고강도 검증 레이어.

**[Spotify #22]** Discover Weekly — 단어판
_Concept_: 매주 학습 중 단어와 의미적으로 연결된 미학습 단어 10개 자동 추천.
_Novelty_: 사용자가 추가하지 않아도 어휘망이 Semantic Cluster 기반으로 유기적 확장.

**[GitHub #23]** Contribution Graph — 학습판
_Concept_: 365일 학습 히트맵을 메인 대시보드에 배치.
_Novelty_: 오늘의 학습량이 아닌 1년의 학습 역사가 한눈에 보임.

**[Amazon #24]** 집단 오답 기반 취약점 예측
_Concept_: 집단 오답 패턴 분석으로 "함께 틀리는 단어" 선제 강화.
_Novelty_: 개인 오답이 아닌 집단 패턴으로 미래 취약점 예측.

**[Amazon #25]** Semantic Bundle 세트
_Concept_: decline/deteriorate/wane/dwindle을 "Negative Change 번들"로 묶어 한 세션 학습.
_Novelty_: 단어 간 뉘앙스 차이가 번들 안에서 자연스럽게 비교.

**[Tinder #26]** Swipe-to-Sort 빠른 분류
_Concept_: 세션 전 30초 워밍업 — 아는 것 같다(→) / 불확실(←) 스와이프로 당일 퀴즈 자동 재배열.
_Novelty_: 메타인지를 UI 제스처로 추출 — 자기평가가 알고리즘 입력값이 됨.

**[Tinder #27]** First Impression Timer
_Concept_: 카드 표시 후 500ms 이내 스와이프 방향 감지, 직관 반응을 Level 5 자동화 보조 지표로 활용.
_Novelty_: 논리적 회상이 아닌 직관적 인식을 데이터로 포착.

**[Health #28]** Cognitive Load Detector
_Concept_: 오답률이 평소보다 30% 이상 높은 세션 감지 시 복습 강도 조절 제안.
_Novelty_: 퍼포먼스 이상치를 컨디션 신호로 해석 — 데이터를 자기 인식 도구로 활용.

**[Health #29]** Learning Vital Signs Dashboard
_Concept_: 평균 반응속도 트렌드, 레벨 분포 변화, 오답 패턴 이상 감지를 주간 리포트로 발행.
_Novelty_: 단기 성과보다 장기 학습 건강 추세 우선 시각화.

**[Chess #30]** Word ELO System
_Concept_: 각 단어에 ELO 점수 부여, 사용자-단어 ELO 차이로 퀴즈 매칭.
_Novelty_: 항상 "내 실력보다 살짝 어려운" 단어와 대결 — ZPD 자동 유지.

**[Chess #31]** 의미 범주 취약점 패턴
_Concept_: "Result/Effect 계열에 약한 사용자"처럼 반복 실수 패턴을 분류하고 맞춤 훈련 세트 제공.
_Novelty_: 개별 단어가 아닌 의미 범주 취약점을 전략적으로 공략.

**[Airline #32]** Vocabulary Miles — 감가상각 포인트
_Concept_: 단어 정답 시 마일리지 적립, 복습 미시 시 서서히 소멸 (망각곡선 반영).
_Novelty_: 포인트 소멸 = 망각의 게임화 — 손실 회피를 학습 지속성에 직접 연결.

**[Airline #33]** Tier Status — 어휘 등급
_Concept_: Bronze→Silver→Gold→Platinum 등급, 등급마다 새 지문 카테고리·UI 테마·고급 통계 해금.
_Novelty_: 장기 누적 보상 구조 — 전체 어휘 자산이 지위를 결정.

---

### Phase 3: SCAMPER 정제

**[S-1]** 복습 주기: 날짜 기반 → 인터랙션 횟수 기반으로 대체
**[S-2]** 객관식 오답: 랜덤 → AI 맞춤 오답 생성 (실제 혼동 패턴 기반)
**[S-3]** 알림 트리거: 고정 시간 → 망각 임박 시점 기반으로 대체
**[C-1]** ELO × Cognitive Level = 이중 평가 매트릭스 (레벨 내 난이도 스펙트럼)
**[C-2]** Swipe-to-Sort + Context-Aware Scheduler = 워밍업 컨텍스트 수집 통합
**[C-3]** AI Role Tagging + Boss Word = 유형별(의미 범주) 보스 스테이지
**[C-4]** Vocabulary Miles + Paragraph Quiz = 고난도 콘텐츠 마일리지 해금
**[E-1]** 고정된 퀴즈 3종 세트 제거 → Level이 퀴즈 유형을 완전 결정
**[E-2]** 수동 단어 추가 의존도 최소화 → Discover Weekly가 자동 확장
**[E-3]** 절대 임계값 제거 → 개인별 이동 평균 반응속도 동적 기준선
**[R-1]** 앱 내 학습 → 브라우저 확장으로 실생활 독서 중 단어 자동 감지·등록
**[R-2]** 정답 맞히기 → 오답 직접 설계 퀴즈 (메타인지 능동 훈련)

---

## Idea Organization and Prioritization

### 테마별 클러스터

**Theme 1: 인지 측정 엔진** — #1, #5, #6, #7, #30, C-1, E-3
**Theme 2: 콘텐츠 & 학습 설계** — #4, #8, #9, #10, #11, #24, #25
**Theme 3: 적응형 알고리즘** — #2, #3, #17, #18, #19, #28, S-1, S-2, S-3, C-2
**Theme 4: 참여 & 동기 루프** — #12, #13, #14, #15, #16, #20, #21, #32, #33, C-3, C-4
**Theme 5: 생태계 확장** — #22, #23, #26, #27, #29, #31, R-1, R-2

### 구현 로드맵

**🔴 Phase 1 — MVP Core (즉시 구현)**
1. Cognitive Level 1~5 + Adaptive Quiz Engine (#1, #2)
2. AI 맞춤 오답 생성 (S-2)
3. Paragraph + Collocation 스크래핑 (#8, #11)
4. 망각 임박 기반 알림 + Loss Aversion (S-3, #13)

**🟡 Phase 2 — Intelligence Layer (2차 개발)**
5. ELO × Level 이중 매트릭스 (C-1)
6. Context-Aware Scheduler + Swipe Warmup (#17, C-2)
7. AI Logical Role Tagging + Boss Stage (#9, C-3)

**🟢 Phase 3 — Ecosystem (장기 비전)**
8. 브라우저 확장 실생활 감지 (R-1)
9. Discover Weekly + Tier System (#22, #33)
10. Learning Vital Signs (#29)

---

## Session Summary and Insights

**세션 성과:**
- 총 33개 아이디어 생성 (First Principles 11개 / Cross-Pollination 17개 / SCAMPER 정제 12개 항목)
- 5개 테마로 구조화, 3단계 구현 로드맵 확정

**핵심 돌파구:**
1. VOCA는 단어장 앱이 아니라 **독해 추론 훈련 시스템**으로 재정의되었다
2. 기존 퀴즈 3종(인식형)의 설계 결함 발견 → Level 기반 Adaptive Engine으로 대체
3. 가장 강력한 차별점은 **브라우저 확장(R-1)** — 학습이 앱 밖 실생활로 확장

**세션 특기사항:**
- First Principles로 "단어를 안다"의 정의를 5단계로 재구성한 것이 이후 모든 설계 결정의 기반이 됨
- Cross-Pollination에서 Netflix·Dark Souls·Chess·Airline 등 이질적 도메인이 자연스럽게 EdTech 메커니즘으로 이식됨
- SCAMPER E(제거) 렌즈에서 기존 고정 퀴즈 구조의 Layer 제거가 가장 중요한 정제 결과
