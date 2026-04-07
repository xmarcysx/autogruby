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
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900" aria-hidden="true">
        {/* Radial glow — blue top right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,_rgba(2,132,199,0.18)_0%,_transparent_70%)]" />
        {/* Radial glow — gold bottom left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_100%,_rgba(3,105,161,0.5)_0%,_transparent_70%)]" />

        {/* Speed lines — diagonal, automotive feel */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-55deg, transparent, transparent 28px, rgba(255,255,255,0.8) 28px, rgba(255,255,255,0.8) 29px)',
          }}
        />

        {/* Brand-blue racing stripe — left edge */}
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-brand-blue-light via-brand-blue to-brand-blue-dark" />
        <div className="absolute top-0 bottom-0 left-[5px] w-px bg-brand-blue/30" />
      </div>

      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/25 rounded-full px-4 py-1.5 text-brand-blue text-sm font-medium mb-8 animate-fade-in">
            <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" aria-hidden="true" />
            Komis samochodowy w Tychach
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
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Sprawdzone samochody używane w Tychach. Uczciwa wycena, pełna historia,{' '}
            <strong className="text-slate-200">bez niespodzianek.</strong>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" size="xl" asChild>
              <Link href="/oferty" aria-label="Zobacz wszystkie oferty samochodów">
                Zobacz oferty
              </Link>
            </Button>
            <Button variant="outline-white" size="xl" asChild>
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
                <p className="text-3xl font-black text-brand-gold">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDown className="h-6 w-6 text-slate-500" />
      </div>
    </section>
  )
}
