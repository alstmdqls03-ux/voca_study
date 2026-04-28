# Innovation & Novel Patterns

## Detected Innovation Areas

**1. 레이턴시 기반 숙련도 측정 (핵심 혁신)**

VOCA는 `performance.now()`로 밀리초 단위 반응 레이턴시를 측정해 인지 처리 속도 자체를 숙련도 지표로 삼는다. "단어를 아는가"가 아닌 "얼마나 빠르게 자동 처리하는가"를 측정하는 접근은 기존 단어장 앱에서 선례가 없다.

**2. 5단계 인지 연속 스펙트럼 + Adaptive Quiz Engine**

"단어를 안다"를 5단계(인식→회상→이해→생산→자동화)로 재정의하고, Level이 퀴즈 유형을 결정하는 구조. Level 1-2는 수용형(Recognition), Level 3-4는 생산형(Production), Level 5는 자동화 검증형.

**3. TOEFL 코퍼스 기반 Collocation + 논리 역할 태깅**

사전 예문이 아닌 실제 TOEFL 지문에서 단어의 논리적 기능(Cause/Effect/Contrast)을 자동 태깅. 단어 암기를 독해 추론 훈련으로 확장한다.

## Market Context & Competitive Landscape

| 경쟁 앱 | 한계 | VOCA 차별점 |
|---|---|---|
| Anki | 사용자 수동 Easy/Hard 판단 | 객관적 레이턴시 데이터 자동 산출 |
| Quizlet | 고정 5종 퀴즈, 랜덤 오답 | Level 기반 Adaptive Engine, AI 맞춤 오답 |
| Magoosh | 정답률 기반 복습 | 레이턴시 + 정답률 이중 지표 |
| 기존 SRS 앱 | 날짜 기반 고정 주기 | Level별 동적 주기 (Level 5 → 7→30→90일) |

## Validation Approach

- 레이턴시 측정 유효성: 동일 단어 반복 퀴즈에서 레이턴시 감소 추세를 4주 데이터로 검증
- MVP 최소 검증: 50개 단어, 2주 사용 데이터로 레이턴시 감소 패턴 확인

## Risk Mitigation

- 레이턴시 측정 신뢰성: 탭 전환(`visibilitychange`) 감지 시 해당 문제 레이턴시 무효 처리, ±2 표준편차 이상치 필터링
- 과적합 위험: Paragraph-level 문맥 퀴즈로 단순 패턴 암기 방지
