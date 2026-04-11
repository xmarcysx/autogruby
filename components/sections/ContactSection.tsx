import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'
import { Clock, MapPin, Phone } from 'lucide-react'

export function ContactSection() {
  return (
    <section
      id="kontakt-sekcja"
      className="relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Split background: lewa dark, prawa light */}
      <div className="absolute inset-0 flex" aria-hidden="true">
        <div className="w-full lg:w-1/2 bg-sky-600" />
        <div className="hidden lg:block w-1/2 bg-slate-100" />
      </div>
      {/* Speed lines tylko na ciemnej połowie */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-1/2 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-55deg, transparent, transparent 28px, rgba(255,255,255,0.9) 28px, rgba(255,255,255,0.9) 29px)',
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-14 items-stretch">

          {/* Lewa — ciemna strona */}
          <div className="py-0 lg:pr-8">
            <SectionHeading
              eyebrow="Skontaktuj się"
              id="contact-heading"
              title="Porozmawiajmy o Twoim aucie"
              description="Chętnie odpowiem na wszystkie pytania. Bez presji, bez nacisku – po prostu uczciwa rozmowa."
              light
            />

            <div className="mt-8 space-y-3">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-xl hover:shadow-sky-900/20 hover:-translate-y-1 transition-all duration-300 group"
                aria-label={`Zadzwoń: ${SITE_CONFIG.phone}`}
              >
                <div className="w-11 h-11 rounded-lg bg-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-700 transition-colors">
                  <Phone className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Telefon</p>
                  <p className="text-slate-900 font-bold">{SITE_CONFIG.phone}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.phone.replace(/\D/g, '').replace(/^0/, '48')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-xl hover:shadow-sky-900/20 hover:-translate-y-1 transition-all duration-300 group"
                aria-label="Napisz na WhatsApp"
              >
                <div className="w-11 h-11 rounded-lg bg-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#1ebe5d] transition-colors">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">WhatsApp</p>
                  <p className="text-slate-900 font-bold">Napisz wiadomość</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                <div className="w-11 h-11 rounded-lg bg-sky-600 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Adres</p>
                  <address className="not-italic text-slate-900 font-bold text-sm">
                    {SITE_CONFIG.address}
                  </address>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                <div className="w-11 h-11 rounded-lg bg-sky-600 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Godziny otwarcia</p>
                  <p className="text-slate-900 font-bold text-sm">{SITE_CONFIG.openingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Prawa — jasna karta właściciela */}
          <div className="mt-10 lg:mt-0 lg:pl-8 flex items-center">
            <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center">
              {/* TODO: Replace placeholder with real owner photo */}
              <div className="w-28 h-28 rounded-full bg-sky-100 border-4 border-sky-200 mx-auto mb-5 flex items-center justify-center text-5xl">
                👨‍💼
              </div>
              <p className="text-brand-blue text-sm font-bold uppercase tracking-wider mb-1">
                Właściciel
              </p>
              <h3 className="text-slate-900 text-2xl font-black mb-2">
                Paweł Trzaska
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                Pasjonat motoryzacji od 20 lat. Znam się na autach i sprzedaję tylko takie, które sam bym kupił. Zadzwoń – porozmawiamy bez owijania w bawełnę.
              </p>
              <Button variant="gold" size="lg" className="w-full" asChild>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                  aria-label={`Zadzwoń do Auto Gruby: ${SITE_CONFIG.phone}`}
                >
                  <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                  Zadzwoń teraz
                </a>
              </Button>
              <p className="text-slate-400 text-xs mt-3">Odpowiadamy szybko!</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
