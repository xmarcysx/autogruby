-- ============================================================
-- Storage RLS: car-images bucket
-- Pozwala zalogowanym adminom wgrywać zdjęcia bezpośrednio z
-- przeglądarki do Supabase Storage (z pominięciem serverless
-- function Vercela i jej limitu rozmiaru żądania).
-- ============================================================

drop policy if exists "Public can view car images" on storage.objects;
create policy "Public can view car images"
  on storage.objects
  for select
  using (bucket_id = 'car-images');

drop policy if exists "Authenticated can upload car images" on storage.objects;
create policy "Authenticated can upload car images"
  on storage.objects
  for insert
  with check (bucket_id = 'car-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated can update car images" on storage.objects;
create policy "Authenticated can update car images"
  on storage.objects
  for update
  using (bucket_id = 'car-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated can delete car images" on storage.objects;
create policy "Authenticated can delete car images"
  on storage.objects
  for delete
  using (bucket_id = 'car-images' and auth.role() = 'authenticated');
