import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { SITE_CONFIG } from '@/lib/constants'

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
          {/* TODO: Replace with real privacy policy written by a legal professional */}
          <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-5">
            <p className="text-brand-gold text-sm font-semibold mb-1">Uwaga – placeholder</p>
            <p className="text-slate-300 text-sm">
              Poniższy tekst to szablon. Przed wdrożeniem strony uzupełnij go prawdziwą polityką
              prywatności, najlepiej skonsultowaną z prawnikiem lub doradcą RODO.
            </p>
          </div>

          <section>
            <h2 className="text-white text-xl font-bold">1. Administrator danych</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Administratorem Twoich danych osobowych jest: <strong className="text-white">[Imię i Nazwisko / Firma]</strong>,{' '}
              ul. Przykładowa 1, 43-100 Tychy, NIP: 000-000-00-00 (dalej: „Administrator").
              Kontakt z Administratorem: <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-gold">{SITE_CONFIG.email}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold">2. Cel i podstawa przetwarzania</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Twoje dane osobowe przetwarzamy w celach:
            </p>
            <ul className="text-slate-400 text-sm space-y-1 list-disc list-inside">
              <li>obsługi zapytań kontaktowych (art. 6 ust. 1 lit. b i f RODO)</li>
              <li>realizacji transakcji sprzedaży (art. 6 ust. 1 lit. b RODO)</li>
              <li>spełnienia obowiązków prawnych (art. 6 ust. 1 lit. c RODO)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold">3. Prawa użytkownika</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Przysługują Ci prawa: dostępu do danych, sprostowania, usunięcia, ograniczenia
              przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu wobec przetwarzania.
              W celu realizacji praw skontaktuj się z Administratorem.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold">4. Pliki cookies</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Strona korzysta z plików cookies niezbędnych do jej prawidłowego działania.
              {/* TODO: Rozszerz sekcję cookies o szczegóły dot. analityki, gdy zostanie wdrożona */}
            </p>
          </section>

          <p className="text-slate-500 text-xs">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')} {/* TODO: ustaw stałą datę */}
          </p>
        </div>
      </div>
    </div>
  )
}
