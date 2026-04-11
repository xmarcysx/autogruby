import { SITE_CONFIG } from '@/lib/constants'
import { Clock, Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-sky-950 border-t border-sky-800" role="contentinfo">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Auto Gruby – strona główna">
              <Image
                src="/logo.jpeg"
                alt="Auto Gruby"
                width={140}
                height={70}
                className="h-20 w-auto object-contain mb-4"
              />
            </Link>
            <p className="text-sky-200 text-sm leading-relaxed">
              Komis samochodowy w Tychach. Sprawdzone auta, uczciwa obsługa i przejrzyste warunki
              zakupu.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {SITE_CONFIG.socialLinks.facebook && (
                <a
                  href={SITE_CONFIG.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Auto Gruby"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-sky-800 text-sky-300 hover:bg-brand-blue hover:text-white transition-colors"
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {SITE_CONFIG.socialLinks.instagram && (
                <a
                  href={SITE_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Auto Gruby"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-sky-800 text-sky-300 hover:bg-rose-500 hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Nawigacja
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Strona główna', href: '/' },
                { label: 'Oferty samochodów', href: '/oferty' },
                { label: 'O komisie', href: '/#o-nas' },
                { label: 'Kontakt', href: '/kontakt' },
                { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
                { label: 'Regulamin', href: '/regulamin' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sky-300 hover:text-brand-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Kontakt
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-2.5 text-sky-300 hover:text-brand-gold text-sm transition-colors"
                  aria-label={`Zadzwoń: ${SITE_CONFIG.phone}`}
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              {/* <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-2.5 text-sky-300 hover:text-brand-gold text-sm transition-colors"
                  aria-label={`Email: ${SITE_CONFIG.email}`}
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                  {SITE_CONFIG.email}
                </a>
              </li> */}
              <li className="flex items-start gap-2.5 text-sky-300 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                <address className="not-italic">{SITE_CONFIG.address}</address>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Godziny otwarcia
            </h3>
            <ul className="space-y-2 text-sm text-sky-300">
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                <span>
                  Pon – Pt:&nbsp;
                  <strong className="text-white">8:00 – 18:00</strong>
                </span>
              </li>
              <li className="pl-6.5">
                Sobota:&nbsp;
                <strong className="text-white">9:00 – 16:00</strong>
              </li>
              <li className="pl-6.5 text-sky-500">Niedziela: zamknięte</li>
            </ul>

            <div className="mt-6 p-4 bg-brand-gold/10 border border-brand-gold/25 rounded-lg">
              <p className="text-brand-gold text-xs font-medium">
                Chcesz zobaczyć auto poza godzinami?
              </p>
              <p className="text-sky-300 text-xs mt-1">
                Zadzwoń – ustalimy termin indywidualnie.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sky-800">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-sky-500">
          <p>
            © {currentYear} Auto Gruby. Wszelkie prawa zastrzeżone.
          </p>
          <p>
            Komis samochodowy Tychy – samochody używane na Śląsku
          </p>
        </div>
      </div>
    </footer>
  )
}
