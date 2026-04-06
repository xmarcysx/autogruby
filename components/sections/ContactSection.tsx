import Image from 'next/image'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SITE_CONFIG } from '@/lib/constants'

export function ContactSection() {
  return (
    <section
      id="kontakt-sekcja"
      className="py-20 md:py-28 bg-slate-900"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Owner / contact info */}
          <div>
            <SectionHeading
              eyebrow="Skontaktuj się"
              id="contact-heading"
              title="Porozmawiajmy o Twoim aucie"
              description="Chętnie odpowiem na wszystkie pytania. Bez presji, bez nacisku – po prostu uczciwa rozmowa."
            />

            <div className="mt-8 space-y-4">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-brand-gold/40 transition-colors group"
                aria-label={`Zadzwoń: ${SITE_CONFIG.phone}`}
              >
                <div className="w-11 h-11 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <Phone className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Telefon</p>
                  <p className="text-white font-bold">{SITE_CONFIG.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-brand-blue/40 transition-colors group"
                aria-label={`Email: ${SITE_CONFIG.email}`}
              >
                <div className="w-11 h-11 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0 group-hover:bg-brand-blue/20 transition-colors">
                  <Mail className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Email</p>
                  <p className="text-white font-bold">{SITE_CONFIG.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700">
                <div className="w-11 h-11 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Adres</p>
                  <address className="not-italic text-white font-bold text-sm">
                    {SITE_CONFIG.address}
                  </address>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700">
                <div className="w-11 h-11 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Godziny otwarcia</p>
                  <p className="text-white font-bold text-sm">{SITE_CONFIG.openingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Owner card */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 text-center">
            {/* TODO: Replace placeholder with real owner photo */}
            <div className="w-28 h-28 rounded-full bg-slate-700 mx-auto mb-5 flex items-center justify-center text-5xl">
              👨‍💼
            </div>
            <p className="text-brand-gold text-sm font-bold uppercase tracking-wider mb-1">
              Właściciel
            </p>
            <h3 className="text-white text-2xl font-black mb-2">
              {/* TODO: Replace with real owner name */}
              Pan Gruby
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
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
            <p className="text-slate-500 text-xs mt-3">Odpowiadamy szybko!</p>
          </div>
        </div>
      </div>
    </section>
  )
}
