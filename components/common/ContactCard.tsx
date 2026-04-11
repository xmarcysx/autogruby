import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Phone } from 'lucide-react'

interface ContactCardProps {
  carTitle?: string
}

export function ContactCard({ carTitle }: ContactCardProps) {
  const waMessage = carTitle
    ? encodeURIComponent(`Dzień dobry, interesuje mnie oferta: ${carTitle}`)
    : encodeURIComponent('Dzień dobry, mam pytanie o ofertę.')
  const waNumber = SITE_CONFIG.phone.replace(/\D/g, '').replace(/^0/, '48')

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
          'bg-[#25D366] text-white hover:bg-[#1ebe5d] hover:text-white',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
        )}
        asChild>
        <a
          href={`https://wa.me/${waNumber}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Napisz na WhatsApp"
        >
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
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
