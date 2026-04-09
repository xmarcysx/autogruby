import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'

const HIGHLIGHTS = [
  'Uczciwa i transparentna sprzedaż',
  'Pełna historia serwisowa każdego auta',
  'Możliwość sprawdzenia w niezależnym warsztacie',
  'Kompleksowe wsparcie przy zakupie i formalnościach',
  'Auta z Włoch, Niemiec i z kraju',
  'Obsługa bez nacisku i presji sprzedażowej',
]

export function AboutSection() {
  return (
    <section
      id="o-nas"
      className="py-20 md:py-28 bg-slate-100"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Image side */}
          <div className="relative">
            {/* TODO: Replace with a real photo of the dealership or owner */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-sky-200">
              <Image
                src="/komis-1.jpeg"
                alt="Komis Auto Gruby – Tychy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-brand-gold rounded-xl p-5 shadow-xl shadow-brand-gold/20">
              <p className="text-slate-900 font-black text-3xl leading-none">10+</p>
              <p className="text-slate-800 text-xs font-semibold mt-0.5">lat doświadczenia</p>
            </div>
          </div>

          {/* Text side */}
          <div>
            <SectionHeading
              eyebrow="O nas"
              id="about-heading"
              title="Auto Gruby – komis z charakterem"
              description="Jesteśmy rodzinnym komisem samochodowym działającym w Tychach od ponad dekady. Przez lata zbudowaliśmy reputację opartą na jednej prostej zasadzie: mówimy prawdę o każdym samochodzie."
            />

            <p className="mt-5 text-slate-600 leading-relaxed">
              Każde auto w naszej ofercie trafia do sprzedaży dopiero po dokładnej weryfikacji stanu technicznego i historii. Dla nas ważne jest, żebyś jako klient czuł się pewnie – zarówno przy zakupie, jak i po nim.
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="h-5 w-5 text-brand-blue shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
