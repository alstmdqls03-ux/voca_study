-- words
alter table public.words enable row level security;
create policy "words: users access own rows" on public.words
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- quiz_sessions
alter table public.quiz_sessions enable row level security;
create policy "quiz_sessions: users access own rows" on public.quiz_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- latency_logs
alter table public.latency_logs enable row level security;
create policy "latency_logs: users access own rows" on public.latency_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- review_schedule
alter table public.review_schedule enable row level security;
create policy "review_schedule: users access own rows" on public.review_schedule
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
