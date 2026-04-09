import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'
import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section
      className="py-20 md:py-24 bg-sky-700 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Diagonal racing stripe — ciemniejszy niebieski */}
      <div
        className="absolute -left-16 top-0 bottom-0 w-56 skew-x-[-8deg] origin-top-left"
        style={{
          background: 'linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
          opacity: 0.5,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-10 top-0 bottom-0 w-4 skew-x-[-8deg] origin-top-left bg-white/10"
        aria-hidden="true"
      />
      {/* Głębszy cień dolny prawy */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_100%,_rgba(2,56,95,0.5)_0%,_transparent_70%)]"
        aria-hidden="true"
      />

      {/* Speed lines */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-55deg, transparent, transparent 28px, rgba(255,255,255,0.8) 28px, rgba(255,255,255,0.8) 29px)',
        }}
        aria-hidden="true"
      />

      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, #38BDF8, #0284C7, transparent)' }}
        aria-hidden="true"
      />

      <div className="container relative z-10 text-center">
        <h2
          id="cta-heading"
          className="text-4xl md:text-5xl font-black text-white leading-tight mb-5"
        >
          Szukasz sprawdzonego auta?
          <br />
          <span className="text-brand-gold">Mamy dla Ciebie ofertę.</span>
        </h2>
        <p className="text-sky-100 text-xl max-w-xl mx-auto mb-10">
          Przeglądaj naszą ofertę lub zadzwoń bezpośrednio – pomożemy Ci znaleźć auto dopasowane do potrzeb i budżetu.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="gold" size="xl" asChild>
            <Link href="/oferty">
              Przeglądaj oferty
              <ArrowRight className="h-5 w-5 ml-1" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline-white" size="xl" asChild>
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
              aria-label={`Zadzwoń: ${SITE_CONFIG.phone}`}
            >
              <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
              {SITE_CONFIG.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
