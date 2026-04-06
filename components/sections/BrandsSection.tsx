// SEKCJA PRÓBNA — ocenić czy pasuje do strony przed finalnym wdrożeniem
// Loga: https://vl.imgix.net (avto-dev/vehicle-logotypes, open-source)

const BRANDS = [
  { name: 'BMW',           slug: 'bmw' },
  { name: 'Mercedes-Benz', slug: 'mercedes-benz' },
  { name: 'Audi',          slug: 'audi' },
  { name: 'Volkswagen',    slug: 'volkswagen' },
  { name: 'Toyota',        slug: 'toyota' },
  { name: 'Ford',          slug: 'ford' },
  { name: 'Opel',          slug: 'opel' },
  { name: 'Škoda',         slug: 'skoda' },
  { name: 'Renault',       slug: 'renault' },
  { name: 'Peugeot',       slug: 'peugeot' },
  { name: 'Volvo',         slug: 'volvo' },
  { name: 'Honda',         slug: 'honda' },
  { name: 'Kia',           slug: 'kia' },
  { name: 'Hyundai',       slug: 'hyundai' },
  { name: 'SEAT',          slug: 'seat' },
  { name: 'Mazda',         slug: 'mazda' },
] as const

// Duplikujemy żeby animacja marquee była ciągła bez skoku
const BRANDS_DOUBLED = [...BRANDS, ...BRANDS]

function logoUrl(slug: string) {
  return `https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset/logos/optimized/${slug}.png`
}

export function BrandsSection() {
  return (
    <section
      className="py-16 md:py-20 bg-[#080810] relative overflow-hidden border-y border-white/[0.04]"
      aria-labelledby="brands-heading"
    >
      {/* Subtelny glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,_rgba(2,132,199,0.06)_0%,_transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mb-10 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue mb-3">
          Marki w naszej ofercie
        </p>
        <h2
          id="brands-heading"
          className="text-2xl md:text-3xl font-black text-white"
        >
          Sprowadzamy i sprzedajemy{' '}
          <span className="text-brand-gold">sprawdzone marki</span>
        </h2>
        <p className="mt-3 text-slate-500 text-sm max-w-md mx-auto">
          Od aut rodzinnych po premium — znajdziesz u nas pojazdy marek, którym możesz zaufać.
        </p>
      </div>

      {/* Fade maski po bokach */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #080810 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(270deg, #080810 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Taśma marszowa */}
      <div className="relative overflow-hidden" aria-hidden="true">
        <div className="flex animate-marquee gap-4 w-max">
          {BRANDS_DOUBLED.map((brand, i) => (
            <div
              key={`${brand.slug}-${i}`}
              className="flex flex-col items-center justify-center gap-2.5 w-40 h-28 rounded-xl border border-slate-200 bg-white shadow-sm flex-shrink-0 transition-all duration-300 group px-4"
            >
              {/* Placeholder loga — zastąp <img> gdy będą pliki SVG */}
              <img
                src={logoUrl(brand.slug)}
                alt={`${brand.name} logo`}
                width={100}
                height={50}
                className="w-auto h-20 object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
