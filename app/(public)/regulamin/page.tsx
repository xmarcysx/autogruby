import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Regulamin | Auto Gruby',
  description: 'Regulamin komisu samochodowego Auto Gruby w Tychach.',
  robots: { index: false, follow: false },
}

export default function RegulaminPage() {
  return (
    <div className="min-h-screen bg-slate-100 pt-24">
      <div className="bg-sky-600">
        <div className="container py-8">
          <Breadcrumbs items={[{ label: 'Regulamin' }]} />
          <h1 className="text-3xl font-black text-white mt-4">Regulamin</h1>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 space-y-8">
            {[
              {
                title: '§1. Postanowienia ogólne',
                items: [
                  'Niniejszy regulamin określa zasady korzystania z serwisu internetowego autogruby.pl, prowadzonego przez Auto Gruby z siedzibą w Tychach.',
                  'Serwis ma charakter informacyjny oraz umożliwia zapoznanie się z ofertą pojazdów dostępnych w komisie.',
                  'Korzystanie ze strony oznacza akceptację niniejszego regulaminu.',
                ],
              },
              {
                title: '§2. Zakres usług',
                items: [
                  'Serwis umożliwia przeglądanie ofert sprzedaży pojazdów używanych.',
                  'Informacje zawarte w ogłoszeniach mają charakter informacyjny i nie stanowią oferty w rozumieniu Kodeksu Cywilnego.',
                  'Sprzedaż pojazdów odbywa się bezpośrednio w siedzibie komisu lub na podstawie indywidualnych ustaleń.',
                ],
              },
              {
                title: '§3. Oferty i ceny',
                items: [
                  'Wszystkie ceny podane na stronie są cenami brutto (zawierają podatek VAT lub VAT-marża).',
                  'Sprzedający zastrzega sobie prawo do zmiany cen oraz wycofania oferty bez podania przyczyny.',
                  'Cena pojazdu może podlegać negocjacji.',
                ],
              },
              {
                title: '§4. Stan techniczny pojazdów',
                items: [
                  'Każdy pojazd oferowany przez komis jest używany i może posiadać ślady eksploatacji.',
                  'Kupujący ma prawo do sprawdzenia stanu technicznego pojazdu przed zakupem.',
                  'Sprzedający nie ponosi odpowiedzialności za ukryte wady pojazdu, chyba że wynikają one z obowiązujących przepisów prawa.',
                ],
              },
              {
                title: '§5. Rezerwacje',
                items: [
                  'Istnieje możliwość rezerwacji pojazdu po wcześniejszym uzgodnieniu ze sprzedającym.',
                  'Warunki rezerwacji (np. zaliczka) ustalane są indywidualnie.',
                ],
              },
              {
                title: '§6. Reklamacje',
                items: [
                  'Reklamacje należy składać drogą mailową lub pisemnie na adres siedziby firmy.',
                  'Reklamacja powinna zawierać dane kupującego oraz opis problemu.',
                  'Reklamacje rozpatrywane są w terminie do 14 dni.',
                ],
              },
              {
                title: '§7. Dane osobowe (RODO)',
                items: [
                  'Administratorem danych osobowych jest Auto Gruby.',
                  'Dane przetwarzane są w celu kontaktu z klientem oraz realizacji sprzedaży.',
                  'Użytkownik ma prawo dostępu do swoich danych oraz ich poprawiania.',
                ],
              },
              {
                title: '§8. Postanowienia końcowe',
                items: [
                  'Regulamin może być zmieniany w dowolnym czasie.',
                  'W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego.',
                  'Regulamin wchodzi w życie z dniem publikacji na stronie.',
                ],
              },
            ].map((section) => (
              <section key={section.title}>
                <h2 className="text-slate-900 text-lg font-bold mb-3 pb-2 border-b border-sky-200">
                  {section.title}
                </h2>
                <ol className="space-y-2 list-decimal list-inside">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-slate-600 text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
