-- ============================================================
-- Auto Gruby – Initial Database Schema
-- Run: supabase db push  or  supabase migration up
-- ============================================================

-- Extensions
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- ============================================================
-- ENUM types
-- ============================================================

do $$
begin
  if not exists (select 1 from pg_type where typname = 'fuel_type_enum') then
    create type fuel_type_enum as enum (
      'benzyna',
      'diesel',
      'hybryda',
      'elektryczny',
      'lpg',
      'benzyna+lpg',
      'hybryda_plug_in'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'transmission_enum') then
    create type transmission_enum as enum (
      'manualna',
      'automatyczna',
      'półautomatyczna'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'body_type_enum') then
    create type body_type_enum as enum (
      'sedan',
      'kombi',
      'hatchback',
      'suv',
      'crossover',
      'coupe',
      'kabriolet',
      'van',
      'pickup'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'drive_type_enum') then
    create type drive_type_enum as enum ('FWD', 'RWD', '4WD', 'AWD');
  end if;

  if not exists (select 1 from pg_type where typname = 'currency_enum') then
    create type currency_enum as enum ('PLN', 'EUR');
  end if;

  if not exists (select 1 from pg_type where typname = 'inquiry_status_enum') then
    create type inquiry_status_enum as enum ('new', 'read', 'replied', 'closed');
  end if;
end
$$;

-- ============================================================
-- Function: update_updated_at
-- ============================================================

create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- Table: cars
-- ============================================================

create table if not exists cars (
  id                      uuid primary key default gen_random_uuid(),
  slug                    text not null unique,
  title                   text not null,
  brand                   text not null,
  model                   text not null,
  generation              text,
  year                    smallint not null check (year >= 1990 and year <= 2030),
  mileage                 integer not null check (mileage >= 0),
  fuel_type               fuel_type_enum not null,
  transmission            transmission_enum not null,
  body_type               body_type_enum not null,
  engine_capacity         integer,
  engine_power_hp         smallint,
  drive_type              drive_type_enum,
  color                   text,
  doors                   smallint,
  seats                   smallint,
  vin                     text,
  registration_number     text,
  country_origin          text,
  first_registration_date date,
  accident_free           boolean not null default true,
  service_history         boolean not null default false,
  description             text,
  price                   integer not null check (price > 0),
  currency                currency_enum not null default 'PLN',
  featured                boolean not null default false,
  published               boolean not null default false,
  location_city           text not null default 'Tychy',
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

drop trigger if exists cars_updated_at on cars;
create trigger cars_updated_at
  before update on cars
  for each row
  execute function update_updated_at();

create index if not exists cars_brand_idx on cars(brand);
create index if not exists cars_year_idx on cars(year);
create index if not exists cars_price_idx on cars(price);
create index if not exists cars_fuel_type_idx on cars(fuel_type);
create index if not exists cars_published_idx on cars(published);
create index if not exists cars_featured_idx on cars(featured);
create index if not exists cars_created_at_idx on cars(created_at desc);

create index if not exists cars_fts_idx
  on cars
  using gin (
    to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(brand, '') || ' ' || coalesce(model, ''))
  );

-- ============================================================
-- Table: car_images
-- ============================================================

create table if not exists car_images (
  id            uuid primary key default gen_random_uuid(),
  car_id        uuid not null references cars(id) on delete cascade,
  storage_path  text not null,
  alt           text not null default '',
  sort_order    smallint not null default 0,
  is_cover      boolean not null default false,
  created_at    timestamptz not null default now()
);

create index if not exists car_images_car_id_idx on car_images(car_id);
create index if not exists car_images_cover_idx on car_images(car_id, is_cover);

create unique index if not exists car_images_one_cover_idx
  on car_images(car_id)
  where is_cover = true;

-- ============================================================
-- Table: car_features
-- ============================================================

create table if not exists car_features (
  id        uuid primary key default gen_random_uuid(),
  car_id    uuid not null references cars(id) on delete cascade,
  category  text not null,
  name      text not null
);

create index if not exists car_features_car_id_idx on car_features(car_id);

-- ============================================================
-- Table: car_views_stats
-- ============================================================

create table if not exists car_views_stats (
  id          uuid primary key default gen_random_uuid(),
  car_id      uuid not null references cars(id) on delete cascade,
  viewed_at   timestamptz not null default now(),
  ip_hash     text
);

create index if not exists car_views_car_id_idx on car_views_stats(car_id);
create index if not exists car_views_viewed_at_idx on car_views_stats(viewed_at desc);

-- ============================================================
-- Table: inquiries
-- ============================================================

create table if not exists inquiries (
  id          uuid primary key default gen_random_uuid(),
  car_id      uuid references cars(id) on delete set null,
  name        text not null,
  phone       text,
  email       text,
  message     text not null,
  status      inquiry_status_enum not null default 'new',
  created_at  timestamptz not null default now()
);

create index if not exists inquiries_car_id_idx on inquiries(car_id);
create index if not exists inquiries_status_idx on inquiries(status);
create index if not exists inquiries_created_at_idx on inquiries(created_at desc);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

alter table cars enable row level security;
alter table car_images enable row level security;
alter table car_features enable row level security;
alter table car_views_stats enable row level security;
alter table inquiries enable row level security;

drop policy if exists "Public can read published cars" on cars;
create policy "Public can read published cars"
  on cars
  for select
  using (published = true);

drop policy if exists "Public can read images of published cars" on car_images;
create policy "Public can read images of published cars"
  on car_images
  for select
  using (
    exists (
      select 1
      from cars
      where cars.id = car_images.car_id
        and cars.published = true
    )
  );

drop policy if exists "Public can read features of published cars" on car_features;
create policy "Public can read features of published cars"
  on car_features
  for select
  using (
    exists (
      select 1
      from cars
      where cars.id = car_features.car_id
        and cars.published = true
    )
  );

drop policy if exists "Public can insert view stats" on car_views_stats;
create policy "Public can insert view stats"
  on car_views_stats
  for insert
  with check (true);

drop policy if exists "Public can submit inquiries" on inquiries;
create policy "Public can submit inquiries"
  on inquiries
  for insert
  with check (true);

-- ============================================================
-- Notes: Storage
-- ============================================================

-- Bucket utwórz w Supabase Dashboard > Storage:
-- id/name: car-images
-- public: true

-- Przykładowa polityka dla storage.objects:
-- drop policy if exists "Public can view car images" on storage.objects;
-- create policy "Public can view car images"
--   on storage.objects
--   for select
--   using (bucket_id = 'car-images');