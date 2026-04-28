create table public.words (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  term             text not null,
  definition       text not null,
  example_sentence text,
  collocations     text[],
  logical_role     text,
  cognitive_level  smallint not null default 1 check (cognitive_level between 1 and 5),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index idx_words_user_id on public.words(user_id);
