import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { SITE_CONFIG } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Polityka Prywatności | Auto Gruby',
  description: 'Polityka prywatności komisu samochodowego Auto Gruby w Tychach.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-100 pt-24">
      <div className="bg-sky-600">
        <div className="container py-8">
          <Breadcrumbs items={[{ label: 'Polityka prywatności' }]} />
          <h1 className="text-3xl font-black text-white mt-4">Polityka prywatności</h1>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 space-y-8">

            <section>
              <h2 className="text-slate-900 text-lg font-bold mb-3 pb-2 border-b border-sky-200">
                1. Administrator danych
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Administratorem Twoich danych osobowych jest Auto Gruby z siedzibą w Tychach
                (dalej: „Administrator").
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">
                Kontakt z Administratorem:{' '}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-blue hover:underline">
                  {SITE_CONFIG.email}
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-slate-900 text-lg font-bold mb-3 pb-2 border-b border-sky-200">
                2. Zakres przetwarzanych danych
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                Przetwarzamy dane osobowe podane dobrowolnie przez użytkownika, w szczególności:
              </p>
              <ul className="text-slate-600 text-sm list-disc list-inside space-y-1">
                <li>imię i nazwisko</li>
                <li>adres e-mail</li>
                <li>numer telefonu</li>
                <li>inne dane przekazane w formularzu kontaktowym</li>
              </ul>
            </section>

            <section>
              <h2 className="text-slate-900 text-lg font-bold mb-3 pb-2 border-b border-sky-200">
                3. Cele i podstawy przetwarzania
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                Twoje dane osobowe przetwarzamy w następujących celach:
              </p>
              <ul className="text-slate-600 text-sm list-disc list-inside space-y-1">
                <li>obsługa zapytań kontaktowych (art. 6 ust. 1 lit. f RODO – uzasadniony interes)</li>
                <li>zawarcie i realizacja umowy sprzedaży pojazdu (art. 6 ust. 1 lit. b RODO)</li>
                <li>wypełnienie obowiązków prawnych (np. księgowych) (art. 6 ust. 1 lit. c RODO)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-slate-900 text-lg font-bold mb-3 pb-2 border-b border-sky-200">
                4. Okres przechowywania danych
              </h2>
              <ul className="text-slate-600 text-sm list-disc list-inside space-y-1">
                <li>dane z formularza kontaktowego – do 12 miesięcy</li>
                <li>dane związane z umową – zgodnie z przepisami prawa (np. 5 lat podatkowo)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-slate-900 text-lg font-bold mb-3 pb-2 border-b border-sky-200">
                5. Odbiorcy danych
              </h2>
              <ul className="text-slate-600 text-sm list-disc list-inside space-y-1">
                <li>dostawcy hostingu i serwerów</li>
                <li>dostawcy usług IT</li>
                <li>biuro rachunkowe</li>
              </ul>
            </section>

            <section>
              <h2 className="text-slate-900 text-lg font-bold mb-3 pb-2 border-b border-sky-200">
                6. Prawa użytkownika
              </h2>
              <ul className="text-slate-600 text-sm list-disc list-inside space-y-1">
                <li>dostęp do swoich danych</li>
                <li>sprostowanie danych</li>
                <li>usunięcie danych</li>
                <li>ograniczenie przetwarzania</li>
                <li>przenoszenie danych</li>
                <li>wniesienie sprzeciwu</li>
              </ul>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">
                Masz również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO).
              </p>
            </section>

            <section>
              <h2 className="text-slate-900 text-lg font-bold mb-3 pb-2 border-b border-sky-200">
                7. Pliki cookies
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                Strona wykorzystuje pliki cookies (ciasteczka) w celu:
              </p>
              <ul className="text-slate-600 text-sm list-disc list-inside space-y-1">
                <li>zapewnienia prawidłowego działania strony</li>
                <li>analizy ruchu na stronie (np. Google Analytics – jeśli wdrożone)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-slate-900 text-lg font-bold mb-3 pb-2 border-b border-sky-200">
                8. Dobrowolność podania danych
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Podanie danych jest dobrowolne, jednak niezbędne do kontaktu lub realizacji usługi.
              </p>
            </section>

            <section>
              <h2 className="text-slate-900 text-lg font-bold mb-3 pb-2 border-b border-sky-200">
                9. Zmiany polityki prywatności
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej polityce prywatności.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
