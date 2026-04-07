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
    <div className="min-h-screen bg-slate-950 pt-24">
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="container py-8">
          <Breadcrumbs items={[{ label: 'Polityka prywatności' }]} />
          <h1 className="text-3xl font-black text-white mt-4">Polityka prywatności</h1>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-3xl mx-auto prose prose-invert prose-sm space-y-6">
          <section>
            <h2 className="text-white text-xl font-bold">1. Administrator danych</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Administratorem Twoich danych osobowych jest Auto Gruby z siedzibą w Tychach 
              (dalej: „Administrator”).
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Kontakt z Administratorem: 
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-gold ml-1">
                {SITE_CONFIG.email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold">2. Zakres przetwarzanych danych</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Przetwarzamy dane osobowe podane dobrowolnie przez użytkownika, w szczególności:
            </p>
            <ul className="text-slate-400 text-sm list-disc list-inside">
              <li>imię i nazwisko</li>
              <li>adres e-mail</li>
              <li>numer telefonu</li>
              <li>inne dane przekazane w formularzu kontaktowym</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold">3. Cele i podstawy przetwarzania</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Twoje dane osobowe przetwarzamy w następujących celach:
            </p>
            <ul className="text-slate-400 text-sm list-disc list-inside">
              <li>obsługa zapytań kontaktowych (art. 6 ust. 1 lit. f RODO – uzasadniony interes)</li>
              <li>zawarcie i realizacja umowy sprzedaży pojazdu (art. 6 ust. 1 lit. b RODO)</li>
              <li>wypełnienie obowiązków prawnych (np. księgowych) (art. 6 ust. 1 lit. c RODO)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold">4. Okres przechowywania danych</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dane osobowe przechowywane są przez okres niezbędny do realizacji celu, dla którego zostały zebrane:
            </p>
            <ul className="text-slate-400 text-sm list-disc list-inside">
              <li>dane z formularza kontaktowego – do 12 miesięcy</li>
              <li>dane związane z umową – zgodnie z przepisami prawa (np. 5 lat podatkowo)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold">5. Odbiorcy danych</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Twoje dane mogą być przekazywane podmiotom wspierającym Administratora, takim jak:
            </p>
            <ul className="text-slate-400 text-sm list-disc list-inside">
              <li>dostawcy hostingu i serwerów</li>
              <li>dostawcy usług IT</li>
              <li>biuro rachunkowe</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold">6. Prawa użytkownika</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Masz prawo do:
            </p>
            <ul className="text-slate-400 text-sm list-disc list-inside">
              <li>dostępu do swoich danych</li>
              <li>sprostowania danych</li>
              <li>usunięcia danych</li>
              <li>ograniczenia przetwarzania</li>
              <li>przenoszenia danych</li>
              <li>wniesienia sprzeciwu</li>
            </ul>
            <p className="text-slate-400 text-sm leading-relaxed">
              Masz również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO).
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold">7. Pliki cookies</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Strona wykorzystuje pliki cookies (ciasteczka), które są zapisywane na urządzeniu użytkownika.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Cookies wykorzystywane są w celu:
            </p>
            <ul className="text-slate-400 text-sm list-disc list-inside">
              <li>zapewnienia prawidłowego działania strony</li>
              <li>analizy ruchu na stronie (np. Google Analytics – jeśli wdrożone)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold">8. Dobrowolność podania danych</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Podanie danych jest dobrowolne, jednak niezbędne do kontaktu lub realizacji usługi.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold">9. Zmiany polityki prywatności</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej polityce prywatności.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
