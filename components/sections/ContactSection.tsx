import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

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
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-xl hover:shadow-sky-900/20 hover:-translate-y-1 transition-all duration-300 group"
                aria-label={`Email: ${SITE_CONFIG.email}`}
              >
                <div className="w-11 h-11 rounded-lg bg-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-700 transition-colors">
                  <Mail className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Email</p>
                  <p className="text-slate-900 font-bold">{SITE_CONFIG.email}</p>
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
