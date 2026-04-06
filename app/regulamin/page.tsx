import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Regulamin | Auto Gruby',
  description: 'Regulamin komisu samochodowego Auto Gruby w Tychach.',
  robots: { index: false, follow: false },
}

export default function RegulaminPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24">
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="container py-8">
          <Breadcrumbs items={[{ label: 'Regulamin' }]} />
          <h1 className="text-3xl font-black text-white mt-4">Regulamin</h1>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-5 mb-8">
            <p className="text-brand-gold text-sm font-semibold mb-1">Uwaga – placeholder</p>
            <p className="text-slate-300 text-sm">
              Poniższy tekst to szablon regulaminu. Przed wdrożeniem strony uzupełnij go prawdziwą
              treścią, skonsultowaną z prawnikiem.
            </p>
          </div>

          <div className="prose prose-invert prose-sm space-y-6">
            <section>
              <h2 className="text-white text-xl font-bold">§1. Postanowienia ogólne</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {/* TODO: Replace with real terms */}
                Niniejszy regulamin określa zasady korzystania z serwisu internetowego autogruby.pl
                oraz warunki zakupu pojazdów w komisie Auto Gruby z siedzibą w Tychach.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold">§2. Oferty i ceny</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Wszystkie podane ceny są cenami brutto w walucie PLN. Sprzedający zastrzega sobie
                prawo do zmiany cen ofertowych oraz wycofania oferty bez podania przyczyny.
                {/* TODO: uzupełnij o realne warunki handlowe */}
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold">§3. Kontakt i reklamacje</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Wszelkie pytania i reklamacje należy kierować na adres email podany na stronie
                kontaktowej lub bezpośrednio do komisu.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
