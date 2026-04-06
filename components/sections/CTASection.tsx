import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

export function CTASection() {
  return (
    <section
      className="py-20 md:py-24 bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-blue-light relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.3)_0%,_transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container relative z-10 text-center">
        <h2
          id="cta-heading"
          className="text-4xl md:text-5xl font-black text-white leading-tight mb-5"
        >
          Szukasz sprawdzonego auta?
          <br />
          <span className="text-brand-gold">Mamy dla Ciebie ofertę.</span>
        </h2>
        <p className="text-blue-100 text-xl max-w-xl mx-auto mb-10">
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
