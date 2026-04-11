import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'
import { ChevronDown, Phone, Star } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background — sky-blue gradient jak tło logo */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-sky-600 to-sky-800" aria-hidden="true">
        {/* Delikatny blask górny */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,_rgba(255,255,255,0.15)_0%,_transparent_70%)]" />
        {/* Głębszy cień dolny prawy */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_100%_100%,_rgba(3,105,161,0.5)_0%,_transparent_70%)]" />

        {/* Speed lines */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-55deg, transparent, transparent 28px, rgba(255,255,255,0.9) 28px, rgba(255,255,255,0.9) 29px)',
          }}
        />

        {/* Biały akcent — lewa krawędź */}
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-white/80 via-white/40 to-white/10" />
      </div>

      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-4 py-1.5 text-white text-sm font-medium mb-8 animate-fade-in">
            <Star className="h-6 w-6 fill-brand-gold text-brand-gold shrink-0" aria-hidden="true" />
            <p className="text-xl md:text-2xl text-white leading-relaxed">
              Komis samochodowy{' '}
              <strong className="fw-bold block sm:inline">Auto Gruby</strong>
            </p>
          </div>

          {/* Main headline */}
          <h1
            id="hero-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6"
          >
            Twoje wymarzone auto{' '}
            <span className="text-brand-gold">czeka na Ciebie</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-10">
            Sprawdzone samochody używane w Tychach. Uczciwa wycena, pełna historia,{' '}
            <strong className="text-white">transparentna oferta.</strong>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" size="xl" className="w-full sm:w-auto" asChild>
              <Link href="/oferty" aria-label="Zobacz wszystkie oferty samochodów">
                Zobacz oferty
              </Link>
            </Button>
            <Button variant="outline-white" size="xl" className="w-full sm:w-auto" asChild>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                aria-label={`Zadzwoń do nas: ${SITE_CONFIG.phone}`}
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                {SITE_CONFIG.phone}
              </a>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: '10+', label: 'lat na rynku' },
              { value: '1000+', label: 'sprzedanych aut' },
              { value: '100%', label: 'transparentność' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="text-sm text-white/65 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDown className="h-6 w-6 text-white/60" />
      </div>
    </section>
  )
}
