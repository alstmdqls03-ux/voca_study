# Non-Functional Requirements

## Performance

- **NFR1:** 퀴즈 화면 전환 < 100ms (레이턴시 측정 기준선 안정성)
- **NFR2:** 페이지 초기 로딩 LCP < 2.5초
- **NFR3:** Supabase 쿼리 응답 p95 < 200ms
- **NFR4:** 레이턴시 측정 오차 ±50ms 이하 (`performance.now()` + `requestAnimationFrame` 기반)
- **NFR5:** Python 스크래퍼 단어 1개당 데이터 수집 완료 < 5초

## Security

- **NFR6:** 전 테이블 Supabase RLS 적용 — `auth.uid() = user_id` 조건으로 데이터 격리
- **NFR7:** HTTPS 전용 통신 (HTTP 리다이렉트)
- **NFR8:** 환경 변수로 API 키 관리 — 클라이언트 노출 금지

## Reliability

- **NFR9:** 퀴즈 세션 중 네트워크 단절 시 로컬 상태 보존 후 재연결 시 동기화
- **NFR10:** 스크래퍼 실패 시 에러 로깅 및 수동 입력 폴백 자동 활성화

## Integration

- **NFR11:** Supabase Edge Functions 응답 타임아웃 < 10초 (알림 발송 기준)
- **NFR12:** Python 스크래퍼 — robots.txt 준수, 요청 간 최소 1초 딜레이
