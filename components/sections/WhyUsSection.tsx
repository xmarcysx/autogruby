import { SectionHeading } from '@/components/common/SectionHeading'
import { Clock, CreditCard, HandshakeIcon, Search, ShieldCheck, Wrench } from 'lucide-react'

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Bezwypadkowe i sprawdzone',
    description:
      'Każde auto weryfikujemy przed wystawieniem. Stawiamy na transparentność – stan auta opisujemy uczciwie, bez upiększeń.',
  },
  {
    icon: Wrench,
    title: 'Niezależny przegląd',
    description:
      'Na życzenie pomagamy umówić auto na przegląd w niezależnym warsztacie. Nie masz nic do ukrycia? My też nie.',
  },
  {
    icon: HandshakeIcon,
    title: 'Uczciwa transakcja',
    description:
      'Bez ukrytych opłat, bez presji sprzedażowej. Odpowiadamy na wszystkie pytania i dajemy czas na decyzję.',
  },
  {
    icon: CreditCard,
    title: 'Wsparcie przy formalnościach',
    description:
      'Pomagamy przejść przez cały proces zakupu – od dokumentów po rejestrację pojazdu. Wszystko jasno i bez zbędnych komplikacji.',
  },
  {
    icon: Search,
    title: 'Pełna historia pojazdu',
    description:
      'Weryfikujemy historię serwisową i sprawdzamy pojazd w bazach danych. Kupujesz ze spokojem w głowie.',
  },
  {
    icon: Clock,
    title: 'Szybka i sprawna obsługa',
    description:
      'Cenimy Twój czas. Przygotujemy dokumenty sprawnie i zadbamy o to, żebyś wyjechał nowym autem bez zbędnego czekania.',
  },
]

export function WhyUsSection() {
  return (
    <section
      className="py-20 md:py-28 bg-sky-600 relative overflow-hidden"
      aria-labelledby="why-us-heading"
    >
      {/* Speed lines */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-55deg, transparent, transparent 28px, rgba(255,255,255,0.9) 28px, rgba(255,255,255,0.9) 29px)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_rgba(255,255,255,0.08)_0%,_transparent_70%)]" aria-hidden="true" />

      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Dlaczego my"
          id="why-us-heading"
          title="Komis, któremu możesz zaufać"
          description="W Auto Gruby nie sprzedajemy tylko samochodów – dbamy o to, żebyś był zadowolony długo po zakupie."
          centered
          light
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="group bg-white rounded-xl p-6 hover:shadow-xl hover:shadow-sky-900/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-600 flex items-center justify-center mb-5 group-hover:bg-sky-700 transition-colors">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
