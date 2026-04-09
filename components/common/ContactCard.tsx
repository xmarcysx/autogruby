import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Mail, Phone } from 'lucide-react'

interface ContactCardProps {
  carTitle?: string
}

export function ContactCard({ carTitle }: ContactCardProps) {
  const subject = carTitle
    ? encodeURIComponent(`Pytanie o ofertę: ${carTitle}`)
    : encodeURIComponent('Pytanie o ofertę')

  return (
    <aside
      className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm"
      aria-label="Skontaktuj się z komisem"
    >
      <div className="text-center pb-4 border-b border-slate-200">
        {/* TODO: Replace with real owner photo */}
        <div
          className="w-16 h-16 rounded-full bg-sky-100 mx-auto mb-3 flex items-center justify-center text-2xl"
          aria-hidden="true"
        >
          🤝
        </div>
        <p className="text-slate-900 font-bold">Zainteresowany tym autem?</p>
        <p className="text-slate-500 text-sm mt-1">Skontaktuj się z nami – odpowiemy szybko.</p>
      </div>

      <Button variant="gold" size="lg" className="w-full" asChild>
        <a
          href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
          aria-label={`Zadzwoń: ${SITE_CONFIG.phone}`}
        >
          <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
          Zadzwoń: {SITE_CONFIG.phone}
        </a>
      </Button>

      <Button variant="outline" size="lg" 
        className={cn(
          'mt-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold',
          'bg-brand-blue text-white hover:bg-brand-blue-dark hover:text-white',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
        )}
        asChild>
        <a
          href={`mailto:${SITE_CONFIG.email}?subject=${subject}`}
          aria-label={`Napisz email na ${SITE_CONFIG.email}`}
        >
          <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
          Wyślij email
        </a>
      </Button>

      <div className="text-center pt-3 border-t border-slate-200">
        <p className="text-xs text-slate-500">{SITE_CONFIG.openingHours}</p>
        <p className="text-xs text-brand-gold mt-1 font-medium">
          Poza godzinami? Zadzwoń – ustalimy termin!
        </p>
      </div>
    </aside>
  )
}
