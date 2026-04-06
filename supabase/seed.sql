-- ============================================================
-- Auto Gruby – Seed Data (example car listings)
-- Run AFTER migration: psql < supabase/seed.sql
-- Or: supabase db reset (applies migrations + seed)
-- ============================================================
-- NOTE: These are mock/example listings. Replace with real cars before launch.
-- All prices in PLN. All images use placeholder storage paths.

-- ============================================================
-- Insert sample cars
-- ============================================================

insert into cars (
  id, slug, title, brand, model, generation, year, mileage,
  fuel_type, transmission, body_type, engine_capacity, engine_power_hp,
  drive_type, color, doors, seats, country_origin,
  first_registration_date, accident_free, service_history,
  description, price, currency, featured, published, location_city
) values

-- Car 1: BMW 5 Series
(
  'a1000000-0000-0000-0000-000000000001',
  'bmw-seria-5-f10-530d-xdrive-2017-a10001',
  'BMW Seria 5 530d xDrive 2017',
  'BMW', 'Seria 5', 'F10',
  2017, 189000,
  'diesel', 'automatyczna', 'sedan',
  2993, 258,
  'AWD', 'Czarny Szafir Metalik', 4, 5,
  'Niemcy', '2017-03-15',
  true, true,
  E'Zadbany BMW Seria 5 F10 530d xDrive sprowadzony z Niemiec z udokumentowaną historią serwisową.\n\nSamochód był regularnie serwisowany w autoryzowanym serwisie BMW. Posiada bogate wyposażenie:\n\n• Adaptacyjne zawieszenie\n• Wyświetlacz HUD\n• Skórzana tapicerka\n• Kamera cofania\n• Pakiet M Sport (progi, skórzana kierownica M, felgi M)\n• Nawigacja Professional\n• Ogrzewanie foteli\n\nAuto bezwypadkowe, gotowe do przejęcia. Na życzenie możliwy przegląd w niezależnym warsztacie.',
  125900, 'PLN', true, true, 'Tychy'
),

-- Car 2: Toyota Corolla Hybrid
(
  'a2000000-0000-0000-0000-000000000002',
  'toyota-corolla-xii-1-8-hybrid-2021-a20002',
  'Toyota Corolla 1.8 Hybrid 2021',
  'Toyota', 'Corolla', 'XII (E210)',
  2021, 42000,
  'hybryda', 'automatyczna', 'kombi',
  1798, 122,
  'FWD', 'Biały Perłowy', 5, 5,
  'Polska', '2021-05-10',
  true, true,
  E'Toyota Corolla XII Touring Sports 1.8 Hybrid – oszczędna i niezawodna hybryda z salonu w Polsce.\n\nPierwszy właściciel, pełna historia serwisowa z Toyota Serwis. Samochód w idealnym stanie technicznym i wizualnym.\n\nWyposażenie:\n• Tempomat adaptacyjny Toyota Safety Sense\n• Automatyczna klimatyzacja dwustrefowa\n• Apple CarPlay / Android Auto\n• Kamera cofania 360°\n• Podgrzewane fotele\n• LED IQ+ Full LED\n• Felgi aluminiowe 17"\n\nEkonomiczna eksploatacja – średnie spalanie 4,2 l/100km w cyklu mieszanym.',
  98900, 'PLN', true, true, 'Tychy'
),

-- Car 3: Volkswagen Passat B8
(
  'a3000000-0000-0000-0000-000000000003',
  'volkswagen-passat-b8-2-0-tdi-dsg-2018-a30003',
  'Volkswagen Passat B8 2.0 TDI DSG 2018',
  'Volkswagen', 'Passat', 'B8',
  2018, 156000,
  'diesel', 'automatyczna', 'kombi',
  1968, 190,
  'FWD', 'Srebrny Metalik', 5, 5,
  'Niemcy', '2018-01-22',
  true, true,
  E'Volkswagen Passat B8 Variant 2.0 TDI 190KM DSG – przestronny kombi z automatyczną skrzynią.\n\nSprowadzony z Niemiec z pełną historią serwisową. Stan techniczny bardzo dobry, blacha i lakier bez zastrzeżeń.\n\nWyposażenie:\n• Kamera cofania\n• Sensory parkowania przód i tył\n• Nawigacja Discover Pro\n• ACC Adaptive Cruise Control\n• Lane Assist\n• Podgrzewane fotele\n• Kierownica wielofunkcyjna skóra\n• Elektryczna klapa bagażnika\n\nDługie wyposażenie, pewny silnik TDI.',
  89900, 'PLN', true, true, 'Tychy'
),

-- Car 4: Ford Focus Mk4
(
  'a4000000-0000-0000-0000-000000000004',
  'ford-focus-mk4-1-5-ecoboost-2019-a40004',
  'Ford Focus 1.5 EcoBoost 2019',
  'Ford', 'Focus', 'Mk4',
  2019, 89000,
  'benzyna', 'manualna', 'hatchback',
  1498, 150,
  'FWD', 'Szary Magnetyczny Metalik', 5, 5,
  'Francja', '2019-08-05',
  false, true,
  E'Ford Focus Mk4 1.5 EcoBoost 150KM – dynamiczny hatchback z silnikiem benzynowym.\n\nKupiony we Francji, serwisowany regularnie. Stan wizualny i techniczny bardzo dobry.\n\nWyposażenie:\n• SYNC 3 z 8" ekranem dotykowym\n• Apple CarPlay / Android Auto\n• Kamera cofania\n• Tempomat aktywny\n• LED reflektory\n• Podgrzewane fotele\n• Czujniki parkowania przód/tył\n\nŚwietny wybór dla osób szukających benzyny z historią serwisową.',
  67900, 'PLN', false, true, 'Tychy'
),

-- Car 5: Skoda Octavia IV
(
  'a5000000-0000-0000-0000-000000000005',
  'skoda-octavia-iv-2-0-tdi-dsg-2020-a50005',
  'Skoda Octavia IV 2.0 TDI DSG 2020',
  'Skoda', 'Octavia', 'IV (NX)',
  2020, 78000,
  'diesel', 'automatyczna', 'kombi',
  1968, 150,
  'FWD', 'Szary Metalik', 5, 5,
  'Polska', '2020-11-20',
  false, true,
  E'Skoda Octavia IV Combi 2.0 TDI DSG – praktyczny kombi z małym przebiegiem i historią z Polski.\n\nPierwszy właściciel, serwisowany w ASO. Jeden z bardziej przestronnych samochodów w swojej klasie.\n\nWyposażenie:\n• Virtual Cockpit\n• Nawigacja Columbus\n• ACC z funkcją Stop&Go\n• LED Matrix\n• Kamera cofania\n• Podgrzewane fotele i kierownica\n• Ambientowe oświetlenie\n• Hak holowniczy elektryczny',
  99900, 'PLN', false, true, 'Tychy'
),

-- Car 6: Audi A4 B9
(
  'a6000000-0000-0000-0000-000000000006',
  'audi-a4-b9-2-0-tdi-s-tronic-2019-a60006',
  'Audi A4 B9 2.0 TDI S-tronic 2019',
  'Audi', 'A4', 'B9',
  2019, 112000,
  'diesel', 'automatyczna', 'kombi',
  1968, 150,
  'FWD', 'Daytona Szary Metalik', 5, 5,
  'Niemcy', '2019-04-03',
  true, false,
  E'Audi A4 Avant 2.0 TDI 150KM S-tronic – eleganckie kombi klasy premium sprowadzone z Niemiec.\n\nStan wizualny bardzo dobry, oryginalne lakierowanie. Historia serwisowa dostępna.\n\nWyposażenie:\n• Virtual Cockpit Plus\n• MMI Navigation Plus\n• Kamera cofania\n• ACC\n• Podgrzewane fotele\n• Fotele skórzano-alcantarowe\n• Felgi aluminiowe 17"\n\nAuto w trakcie przygotowania technicznego – dostępne wkrótce.',
  109900, 'PLN', false, false, 'Tychy'
);

-- ============================================================
-- Sample images (placeholder storage paths)
-- In production: upload real images to 'car-images' bucket
-- and update storage_path accordingly.
-- ============================================================

insert into car_images (id, car_id, storage_path, alt, sort_order, is_cover) values

-- BMW 5 images
('b1000001-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'a10001/cover.jpg', 'BMW Seria 5 530d xDrive 2017 – widok przodu', 0, true),
('b1000002-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'a10001/2.jpg', 'BMW Seria 5 530d xDrive 2017 – wnętrze', 1, false),
('b1000003-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'a10001/3.jpg', 'BMW Seria 5 530d xDrive 2017 – bagażnik', 2, false),

-- Toyota Corolla images
('b2000001-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000002', 'a20002/cover.jpg', 'Toyota Corolla 1.8 Hybrid 2021 – widok przodu', 0, true),
('b2000002-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000002', 'a20002/2.jpg', 'Toyota Corolla 1.8 Hybrid 2021 – wnętrze', 1, false),

-- VW Passat images
('b3000001-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000003', 'a30003/cover.jpg', 'Volkswagen Passat B8 2.0 TDI 2018 – widok przodu', 0, true),
('b3000002-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000003', 'a30003/2.jpg', 'Volkswagen Passat B8 2.0 TDI 2018 – bok', 1, false),

-- Ford Focus images
('b4000001-0000-0000-0000-000000000004', 'a4000000-0000-0000-0000-000000000004', 'a40004/cover.jpg', 'Ford Focus 1.5 EcoBoost 2019 – widok przodu', 0, true),

-- Skoda Octavia images
('b5000001-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005', 'a50005/cover.jpg', 'Skoda Octavia IV 2.0 TDI 2020 – widok przodu', 0, true),
('b5000002-0000-0000-0000-000000000005', 'a5000000-0000-0000-0000-000000000005', 'a50005/2.jpg', 'Skoda Octavia IV 2.0 TDI 2020 – wnętrze', 1, false);

-- ============================================================
-- Sample car features
-- ============================================================

insert into car_features (car_id, category, name) values
('a1000000-0000-0000-0000-000000000001', 'Bezpieczeństwo', 'ABS'),
('a1000000-0000-0000-0000-000000000001', 'Bezpieczeństwo', 'Kontrola trakcji (ASC)'),
('a1000000-0000-0000-0000-000000000001', 'Komfort', 'Klimatyzacja automatyczna dwustrefowa'),
('a1000000-0000-0000-0000-000000000001', 'Komfort', 'Podgrzewane fotele'),
('a1000000-0000-0000-0000-000000000001', 'Multimedia', 'Nawigacja Professional'),
('a1000000-0000-0000-0000-000000000001', 'Multimedia', 'Bluetooth'),
('a2000000-0000-0000-0000-000000000002', 'Bezpieczeństwo', 'Toyota Safety Sense'),
('a2000000-0000-0000-0000-000000000002', 'Komfort', 'Klimatyzacja automatyczna dwustrefowa'),
('a2000000-0000-0000-0000-000000000002', 'Multimedia', 'Apple CarPlay / Android Auto'),
('a3000000-0000-0000-0000-000000000003', 'Bezpieczeństwo', 'ACC Adaptive Cruise Control'),
('a3000000-0000-0000-0000-000000000003', 'Bezpieczeństwo', 'Lane Assist'),
('a3000000-0000-0000-0000-000000000003', 'Multimedia', 'Nawigacja Discover Pro');
