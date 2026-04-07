import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import type { Metadata } from 'next'

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
          <div className="prose prose-invert prose-sm space-y-6">
            <section>
              <h2 className="text-white text-xl font-bold">§1. Postanowienia ogólne</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                1. Niniejszy regulamin określa zasady korzystania z serwisu internetowego autogruby.pl,
                prowadzonego przez Auto Gruby z siedzibą w Tychach.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                2. Serwis ma charakter informacyjny oraz umożliwia zapoznanie się z ofertą pojazdów dostępnych w komisie.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                3. Korzystanie ze strony oznacza akceptację niniejszego regulaminu.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold">§2. Zakres usług</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                1. Serwis umożliwia przeglądanie ofert sprzedaży pojazdów używanych.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                2. Informacje zawarte w ogłoszeniach mają charakter informacyjny i nie stanowią oferty w rozumieniu Kodeksu Cywilnego.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                3. Sprzedaż pojazdów odbywa się bezpośrednio w siedzibie komisu lub na podstawie indywidualnych ustaleń.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold">§3. Oferty i ceny</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                1. Wszystkie ceny podane na stronie są cenami brutto (zawierają podatek VAT lub VAT-marża).
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                2. Sprzedający zastrzega sobie prawo do zmiany cen oraz wycofania oferty bez podania przyczyny.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                3. Cena pojazdu może podlegać negocjacji.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold">§4. Stan techniczny pojazdów</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                1. Każdy pojazd oferowany przez komis jest używany i może posiadać ślady eksploatacji.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                2. Kupujący ma prawo do sprawdzenia stanu technicznego pojazdu przed zakupem.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                3. Sprzedający nie ponosi odpowiedzialności za ukryte wady pojazdu, chyba że wynikają one z obowiązujących przepisów prawa.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold">§5. Rezerwacje</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                1. Istnieje możliwość rezerwacji pojazdu po wcześniejszym uzgodnieniu ze sprzedającym.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                2. Warunki rezerwacji (np. zaliczka) ustalane są indywidualnie.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold">§6. Reklamacje</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                1. Reklamacje należy składać drogą mailową lub pisemnie na adres siedziby firmy.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                2. Reklamacja powinna zawierać dane kupującego oraz opis problemu.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                3. Reklamacje rozpatrywane są w terminie do 14 dni.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold">§7. Dane osobowe (RODO)</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                1. Administratorem danych osobowych jest Auto Gruby.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                2. Dane przetwarzane są w celu kontaktu z klientem oraz realizacji sprzedaży.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                3. Użytkownik ma prawo dostępu do swoich danych oraz ich poprawiania.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold">§8. Postanowienia końcowe</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                1. Regulamin może być zmieniany w dowolnym czasie.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                2. W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                3. Regulamin wchodzi w życie z dniem publikacji na stronie.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
