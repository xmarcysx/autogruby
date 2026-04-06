// SEKCJA PRÓBNA — ocenić czy pasuje do strony przed finalnym wdrożeniem
// TODO: Zamienić placeholder-loga na prawdziwe pliki SVG/PNG w /public/brands/

const BRANDS = [
  { name: 'BMW',           abbr: 'BMW',  color: '#1C69D4' },
  { name: 'Mercedes-Benz', abbr: 'MB',   color: '#A0A0A0' },
  { name: 'Audi',          abbr: 'AUDI', color: '#BB0A14' },
  { name: 'Volkswagen',    abbr: 'VW',   color: '#1E3A8A' },
  { name: 'Toyota',        abbr: 'TOY',  color: '#EB0A1E' },
  { name: 'Ford',          abbr: 'FORD', color: '#003478' },
  { name: 'Opel',          abbr: 'OPEL', color: '#F5A800' },
  { name: 'Škoda',         abbr: 'ŠKD',  color: '#4BA82E' },
  { name: 'Renault',       abbr: 'REN',  color: '#EFDF00' },
  { name: 'Peugeot',       abbr: 'PEU',  color: '#0055A5' },
  { name: 'Volvo',         abbr: 'VOL',  color: '#003057' },
  { name: 'Honda',         abbr: 'HON',  color: '#CC0000' },
] as const

// Duplikujemy listę żeby animacja marquee była ciągła (pętla bez skoku)
const BRANDS_DOUBLED = [...BRANDS, ...BRANDS]

export function BrandsSection() {
  return (
    <section
      className="py-16 md:py-20 bg-[#080810] relative overflow-hidden border-y border-white/[0.04]"
      aria-labelledby="brands-heading"
    >
      {/* Subtelny glow od góry */}
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
        <div className="flex animate-marquee gap-5 w-max">
          {BRANDS_DOUBLED.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex flex-col items-center justify-center gap-2 w-32 h-20 rounded-xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm flex-shrink-0 hover:border-brand-blue/30 transition-colors duration-300 group"
            >
              {/* Placeholder loga — zastąp <img> gdy będą pliki SVG */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-black tracking-wider"
                style={{
                  backgroundColor: `${brand.color}18`,
                  border: `1px solid ${brand.color}35`,
                  color: brand.color,
                }}
              >
                {brand.abbr}
              </div>
              <span className="text-xs text-slate-500 font-medium group-hover:text-slate-300 transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
