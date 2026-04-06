import { Phone, Mail, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

interface ContactCardProps {
  carTitle?: string
}

export function ContactCard({ carTitle }: ContactCardProps) {
  const subject = carTitle
    ? encodeURIComponent(`Pytanie o ofertę: ${carTitle}`)
    : encodeURIComponent('Pytanie o ofertę')

  return (
    <aside
      className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-4"
      aria-label="Skontaktuj się z komisem"
    >
      <div className="text-center pb-4 border-b border-slate-800">
        {/* TODO: Replace with real owner photo */}
        <div
          className="w-16 h-16 rounded-full bg-slate-700 mx-auto mb-3 flex items-center justify-center text-2xl"
          aria-hidden="true"
        >
          🤝
        </div>
        <p className="text-white font-bold">Zainteresowany tym autem?</p>
        <p className="text-slate-400 text-sm mt-1">Skontaktuj się z nami – odpowiemy szybko.</p>
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

      <Button variant="outline" size="lg" className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800" asChild>
        <a
          href={`mailto:${SITE_CONFIG.email}?subject=${subject}`}
          aria-label={`Napisz email na ${SITE_CONFIG.email}`}
        >
          <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
          Wyślij email
        </a>
      </Button>

      <div className="text-center pt-3 border-t border-slate-800">
        <p className="text-xs text-slate-500">{SITE_CONFIG.openingHours}</p>
        <p className="text-xs text-brand-gold mt-1 font-medium">
          Poza godzinami? Zadzwoń – ustalimy termin!
        </p>
      </div>
    </aside>
  )
}
