create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger words_set_updated_at
  before update on public.words
  for each row execute function public.set_updated_at();

create trigger review_schedule_set_updated_at
  before update on public.review_schedule
  for each row execute function public.set_updated_at();
