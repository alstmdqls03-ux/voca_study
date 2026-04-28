# Deferred Work

## Deferred from: code review of 1-2-email-auth-login-ui (2026-04-29)

- **logoutAction 에러 무시** — `signOut()` 실패 시 에러 피드백 없이 /login 리다이렉트. MVP 범위 외, 추후 에러 토스트 추가 시 처리.
- **탭 전환 중 pending 상태 혼란** — 로그인 폼 제출 중 회원가입 탭으로 전환 시 두 버튼 모두 로딩 표시. 낮은 우선순위 UX 개선 항목.
