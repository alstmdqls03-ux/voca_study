create table public.review_schedule (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  word_id          uuid not null references public.words(id) on delete cascade,
  next_review_at   timestamptz not null,
  repetition_count integer not null default 0,
  interval_days    integer not null default 1,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (user_id, word_id)
);

create index idx_review_schedule_user_id on public.review_schedule(user_id);
create index idx_review_schedule_next_review_at on public.review_schedule(next_review_at);
