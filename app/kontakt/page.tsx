import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { MapPlaceholder } from '@/components/common/MapPlaceholder'
import { SITE_CONFIG } from '@/lib/constants'
import { buildBreadcrumbJsonLd } from '@/utils/seo'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt – Komis Samochodowy Auto Gruby Tychy',
  description:
    'Skontaktuj się z komisem Auto Gruby w Tychach. Zadzwoń, napisz email lub odwiedź nas osobiście. Chętnie odpowiemy na pytania o nasze samochody.',
  keywords: ['kontakt auto gruby', 'komis tychy kontakt', 'telefon do komisu tychy'],
  alternates: {
    canonical: `${SITE_CONFIG.url}/kontakt`,
  },
}

export default function ContactPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Auto Gruby', url: SITE_CONFIG.url },
    { name: 'Kontakt', url: `${SITE_CONFIG.url}/kontakt` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-slate-950 pt-24">
        <div className="bg-slate-900 border-b border-slate-800">
          <div className="container py-8">
            <Breadcrumbs items={[{ label: 'Kontakt' }]} />
            <h1 className="text-3xl md:text-4xl font-black text-white mt-4">Kontakt</h1>
            <p className="text-slate-400 mt-2">Jesteśmy do Twojej dyspozycji</p>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-5">Dane kontaktowe</h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: Phone,
                      label: 'Telefon',
                      value: SITE_CONFIG.phone,
                      href: `tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`,
                    },
                    {
                      icon: Mail,
                      label: 'Email',
                      value: SITE_CONFIG.email,
                      href: `mailto:${SITE_CONFIG.email}`,
                    },
                    {
                      icon: MapPin,
                      label: 'Adres',
                      value: SITE_CONFIG.address,
                    },
                    {
                      icon: Clock,
                      label: 'Godziny otwarcia',
                      value: SITE_CONFIG.openingHours,
                    },
                  ].map((item) => {
                    const Icon = item.icon
                    const inner = (
                      <>
                        <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                          <p className="text-white font-semibold text-sm">{item.value}</p>
                        </div>
                      </>
                    )
                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-brand-blue/40 transition-colors"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div
                        key={item.label}
                        className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800"
                      >
                        {inner}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* NIP / company data */}
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-400 text-sm mb-2">Dane firmy</p>
                <p>Paweł Trzaska Auto-Handel Gruby</p>
                <p>NIP: 6462932830</p>
                <p>REGON: 243465713</p>
                <p>ul. Cielmicka 36, 43-100 Tychy</p>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Znajdź nas na mapie</h2>
              <MapPlaceholder />
              <p className="text-slate-500 text-sm text-center">
                Bezpłatny parking dla klientów na miejscu
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
