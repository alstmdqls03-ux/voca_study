create table public.latency_logs (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  word_id             uuid not null references public.words(id) on delete cascade,
  session_id          uuid not null references public.quiz_sessions(id) on delete cascade,
  response_latency_ms integer,
  is_correct          boolean not null,
  created_at          timestamptz not null default now()
);

create index idx_latency_logs_user_id on public.latency_logs(user_id);
create index idx_latency_logs_word_id on public.latency_logs(word_id);
create index idx_latency_logs_session_id on public.latency_logs(session_id);
