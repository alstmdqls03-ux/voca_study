# Web App Specific Requirements

## Architecture

- **렌더링:** Next.js App Router SPA — 퀴즈·대시보드는 Client Component, 정적 페이지만 Server Component
- **상태 관리:** 퀴즈 세션 상태는 클라이언트 메모리 유지, 페이지 이탈 시 Supabase에 즉시 저장
- **API 레이어:** Supabase REST/RPC — WebSocket 불사용, 레이턴시 데이터는 세션 종료 후 배치 전송
- **알림:** Supabase Edge Functions + Cron 기반 망각 임박 알림 (이메일 또는 Web Push)
- **스크래퍼 연동:** Python 스크립트 → Supabase Edge Function 트리거 → DB 적재

## Keyboard Navigation (학습 생산성 목적)

- `1` `2` `3` `4` — 보기 선택
- `Enter` — 정답 제출
- `Space` — 다음 문제
- `Escape` — 세션 일시정지

## Implementation Constraints

- 레이턴시 측정 시작점: 문제 렌더링 완료 시각 (`requestAnimationFrame` 콜백)
- SEO 불필요 — `robots.txt`로 전체 인덱싱 차단
