-- ============================================================
-- Migration: Add sold field to cars table
-- ============================================================

alter table cars
  add column if not exists sold boolean not null default false;

create index if not exists cars_sold_idx on cars(sold);

-- Update RLS: public can also read sold cars (to show "Sprzedany" badge)
drop policy if exists "Public can read published cars" on cars;
create policy "Public can read published cars"
  on cars
  for select
  using (published = true);

-- Car images & features should also be readable for sold published cars
-- (policy already covers this via published = true check)
