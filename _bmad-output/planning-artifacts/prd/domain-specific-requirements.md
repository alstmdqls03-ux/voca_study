# Domain-Specific Requirements

## 보안 및 데이터

- Supabase RLS 필수 적용: `auth.uid() = user_id` 조건으로 SELECT·UPDATE 제한 — 향후 멀티유저 확장 시 데이터 격리 보장
- 레이턴시·오답 이력은 민감정보 아님 — 기본 Supabase 보안으로 충분
- 멀티유저 확장 시 Google OAuth(이메일만)로 인증 제한

## 콘텐츠 및 스크래핑

- 데이터 출처: TOEFL 기출 지문 우선 사용 (실제 시험 문맥에 최적화)
- 윤리적 스크래핑: robots.txt 준수, 요청 간 최소 1초 딜레이, 개인 학습 목적 명시
- 저작권 리스크 완화: 전문 복제 금지, 단어+예문 단위 발췌만 허용 (Fair Use 범위)
- 스크래퍼는 Python 스크립트로 분리 운영 — Next.js와 직접 결합 금지
