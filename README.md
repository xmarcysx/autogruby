# Auto Gruby – Komis Samochodowy Tychy

Produkcyjny projekt webowy dla komisu samochodowego Auto Gruby z Tychów.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS · shadcn/ui · Supabase · Vercel

---

## Uruchomienie lokalne

### 1. Wymagania

- Node.js 20+
- npm / pnpm / yarn
- Konto Supabase (darmowe)

### 2. Instalacja

```bash
git clone <repo-url>
cd autogruby
npm install
```

### 3. Zmienne środowiskowe

```bash
cp .env.example .env.local
```

Otwórz `.env.local` i uzupełnij wartości (patrz sekcja Supabase poniżej).

### 4. Uruchom deweloperski serwer

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

---

## Konfiguracja Supabase

### Krok 1: Utwórz projekt Supabase

1. Wejdź na [supabase.com](https://supabase.com) → New Project
2. Nadaj nazwę projektu (np. `autogruby`)
3. Zanotuj **URL projektu** i **anon key** z Settings → API

### Krok 2: Uruchom migracje

**Opcja A – przez Supabase CLI (zalecane)**

```bash
# Instalacja CLI
npm install -g supabase

# Zaloguj się
supabase login

# Linkuj projekt (podaj Project Ref z Supabase Dashboard)
supabase link --project-ref <twoj-project-ref>

# Uruchom migracje
supabase db push

# Załaduj dane przykładowe
supabase db reset
# lub ręcznie:
psql <connection-string> < supabase/seed.sql
```

**Opcja B – przez Supabase Dashboard**

1. Dashboard → SQL Editor
2. Skopiuj zawartość `supabase/migrations/001_initial.sql` → Run
3. Skopiuj zawartość `supabase/seed.sql` → Run

### Krok 3: Utwórz Storage Bucket

1. Dashboard → Storage → New Bucket
2. Nazwa: `car-images`
3. Zaznacz: **Public bucket** ✅
4. Dodaj politykę odczytu:
   ```sql
   CREATE POLICY "Public can view car images"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'car-images');
   ```

### Krok 4: Uzupełnij `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # tylko do operacji admin/seed
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Wdrożenie na Vercel

### Krok 1: Push do GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <twoj-repo>
git push -u origin main
```

### Krok 2: Import do Vercel

1. [vercel.com](https://vercel.com) → New Project → Import Git Repository
2. Framework: **Next.js** (wykrywany automatycznie)
3. Uzupełnij Environment Variables (te same co w `.env.local`)
4. Deploy

### Krok 3: Ustaw domenę

1. Vercel → Settings → Domains
2. Dodaj: `autogruby.pl` i `www.autogruby.pl`
3. Skonfiguruj DNS u rejestratora domeny:
   - `A @ 76.76.21.21` (Vercel)
   - `CNAME www cname.vercel-dns.com`

### Krok 4: Ustaw NEXT_PUBLIC_SITE_URL

Po deploymencie zmień w Vercel env:
```
NEXT_PUBLIC_SITE_URL=https://autogruby.pl
```

Redeploy.

---

## Struktura projektu

```
autogruby/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── page.tsx            # Strona główna
│   ├── sitemap.ts          # Dynamiczny sitemap.xml
│   ├── robots.ts           # robots.txt
│   ├── oferty/
│   │   ├── page.tsx        # Lista ofert + filtry
│   │   └── [slug]/page.tsx # Szczegóły oferty
│   ├── kontakt/page.tsx
│   ├── polityka-prywatnosci/page.tsx
│   ├── regulamin/page.tsx
│   └── (admin)/            # Route group (chroniony middleware)
│       └── admin/page.tsx  # Placeholder panelu admina
│
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Sekcje strony głównej
│   ├── common/             # Reużywalne komponenty
│   └── ui/                 # shadcn/ui bazowe komponenty
│
├── features/cars/          # Car feature (queries + server actions)
├── hooks/                  # React hooks (useFilters, useSearch)
├── lib/                    # Supabase clients, schemas, constants
├── services/               # Supabase query functions
├── types/                  # TypeScript types
├── utils/                  # Formattery, SEO helpers, slug utils
├── middleware.ts            # Auth guard dla /admin
└── supabase/
    ├── migrations/001_initial.sql
    └── seed.sql
```

---

## Checklist przed publikacją

### Obowiązkowe

- [ ] Uzupełnij dane kontaktowe w `.env.local` (telefon, email, adres)
- [ ] Podmień `NEXT_PUBLIC_SITE_URL` na docelową domenę
- [ ] Uruchom migracje Supabase i załaduj prawdziwe auta
- [ ] Utwórz bucket `car-images` w Supabase Storage
- [ ] Wgraj logo i zdjęcia komisu
- [ ] Dodaj prawdziwy numer telefonu i email do `lib/constants.ts`
- [ ] Podmień placeholdera właściciela (imię, zdjęcie)
- [ ] Uzupełnij adres i NIP firmy
- [ ] Wgraj prawdziwą politykę prywatności (skonsultuj z prawnikiem)
- [ ] Podmień Google Maps embed URL w `MapPlaceholder.tsx`
- [ ] Dodaj plik `og-image.jpg` (1200×630px) do `/public`
- [ ] Dodaj `favicon.ico` do `/public`

### Zalecane

- [ ] Dodaj Google Search Console i zweryfikuj stronę
- [ ] Dodaj Google Analytics (po wdrożeniu CookieBanner)
- [ ] Aktywuj CookieBanner (`components/common/CookieBanner.tsx`)
- [ ] Uzupełnij opinie klientów (prawdziwe, z Google Reviews)
- [ ] Uzupełnij FAQ o realne pytania klientów
- [ ] Skonfiguruj konto e-mail na domenie `autogruby.pl`
- [ ] Przetestuj na urządzeniach mobilnych
- [ ] Sprawdź Core Web Vitals w PageSpeed Insights

### Rozbudowa (etap 2 – panel admina)

- [ ] Zaimplementuj panel admina w `app/(admin)/admin/`
- [ ] Dodaj CRUD samochodów z uploadem zdjęć
- [ ] Dodaj zarządzanie zapytaniami
- [ ] Dodaj dashboard analityczny
- [ ] Skonfiguruj Supabase Auth dla admina

---

## Lista TODO w kodzie

Poniżej wszystkie miejsca oznaczone `// TODO:` w projekcie:

| Plik | TODO |
|------|------|
| `lib/constants.ts` | Dane kontaktowe: telefon, email, adres, NIP, godziny |
| `lib/constants.ts` | Linki social media: Facebook, Instagram |
| `lib/constants.ts` | Statystyki w hero (`lib/constants.ts` → `HeroSection`) |
| `lib/constants.ts` | Opinie klientów (MOCK_TESTIMONIALS) |
| `lib/constants.ts` | FAQ (FAQ_ITEMS) |
| `app/layout.tsx` | Google Search Console verification token |
| `app/layout.tsx` | Aktywuj CookieBanner |
| `app/layout.tsx` | Dodaj `/public/og-image.jpg` (1200×630) |
| `components/sections/AboutSection.tsx` | Zdjęcie komisu / właściciela |
| `components/sections/ContactSection.tsx` | Imię właściciela, zdjęcie |
| `components/sections/TestimonialsSection.tsx` | Link do Google Reviews |
| `components/common/MapPlaceholder.tsx` | Google Maps embed URL |
| `components/common/ContactCard.tsx` | Zdjęcie właściciela |
| `app/polityka-prywatnosci/page.tsx` | Prawdziwa polityka prywatności |
| `app/regulamin/page.tsx` | Prawdziwy regulamin |
| `app/kontakt/page.tsx` | NIP, REGON, pełne dane firmy |
| `utils/seo.ts` | Koordynaty GPS (geo: lat/lng) |
| `supabase/seed.sql` | Podmień mock dane na prawdziwe oferty |
| `supabase/migrations/001_initial.sql` | Storage bucket + policies |

---

## Dodawanie nowych samochodów

### Przez SQL (szybko)

```sql
INSERT INTO cars (slug, title, brand, model, ...) VALUES (...);
```

### Przez przyszły panel admina

Po zaimplementowaniu panelu: `/admin/oferty/nowe`

### Slug – format

`marka-model-generacja-rok-uid`  
Przykład: `toyota-corolla-xii-2021-ab1234`

Użyj `utils/slug.ts → generateCarSlug()`.

---

## Technologie

| Technologia | Wersja | Cel |
|---|---|---|
| Next.js | 15 | Framework (App Router, SSR/SSG/ISR) |
| TypeScript | 5 | Typowanie |
| Tailwind CSS | 3.4 | Stylowanie |
| shadcn/ui | – | Bazowe komponenty UI |
| Supabase | 2.x | Baza danych, auth, storage |
| Zod | 3.x | Walidacja danych |
| Lucide React | – | Ikony |
| Vercel | – | Hosting |
