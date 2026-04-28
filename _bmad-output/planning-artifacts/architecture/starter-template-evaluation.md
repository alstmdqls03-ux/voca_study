# Starter Template Evaluation

## Primary Technology Domain

Full-stack Web Application — Next.js App Router + Supabase

## Selected Starter: create-next-app (Official)

**Rationale for Selection:**
- PRD에서 이미 Next.js + Tailwind + Supabase를 명시
- `create-next-app`은 App Router, TypeScript, Tailwind를 공식 지원하는 가장 안정적인 시작점
- pnpm은 모노레포 확장 가능성과 디스크 효율성에서 npm/yarn 대비 우위

**Initialization Command:**

```bash
pnpm create next-app@latest voca \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-pnpm
```

**Post-init 추가 설정:**

```bash
# Supabase 클라이언트
pnpm add @supabase/supabase-js @supabase/ssr

# Vitest (SRS 알고리즘 단위 테스트)
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react

# Supabase CLI (로컬 개발 + 마이그레이션)
pnpm add -D supabase
```

**Architectural Decisions Provided by Starter:**

- **Language & Runtime:** TypeScript strict mode, Node.js
- **Styling:** Tailwind CSS v4 (PostCSS 자동 설정)
- **Build Tooling:** Turbopack (dev), Next.js 내장 webpack (prod)
- **Testing:** Vitest — SRS 스케줄링 로직, Level 산출 알고리즘, 레이턴시 이상치 필터 단위 테스트
- **Code Organization:** `src/app/` (App Router), `src/components/`, `src/lib/`
- **Deployment:** Vercel (zero-config Next.js 배포, Edge Functions 지원)

**Note:** 프로젝트 초기화는 첫 번째 구현 스토리로 처리됩니다.
