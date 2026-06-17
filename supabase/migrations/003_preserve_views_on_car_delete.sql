-- ============================================================
-- Preserve view history when a car is deleted
-- Odwiedziny powinny liczyć rzeczywiste wizyty, niezależnie od
-- tego czy oferta wciąż istnieje (usunięcie auta nie powinno
-- zmniejszać statystyk z przeszłości).
-- ============================================================

alter table car_views_stats
  drop constraint if exists car_views_stats_car_id_fkey;

alter table car_views_stats
  alter column car_id drop not null;

alter table car_views_stats
  add constraint car_views_stats_car_id_fkey
  foreign key (car_id) references cars(id) on delete set null;
