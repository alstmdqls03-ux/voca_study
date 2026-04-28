create table public.quiz_sessions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  started_at    timestamptz not null default now(),
  completed_at  timestamptz,
  word_count    integer not null default 0,
  correct_count integer not null default 0,
  status        text not null default 'active'
                check (status in ('active', 'paused', 'completed')),
  created_at    timestamptz not null default now()
);

create index idx_quiz_sessions_user_id on public.quiz_sessions(user_id);
