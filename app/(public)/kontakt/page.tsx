import React from 'react'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { MapPlaceholder } from '@/components/common/MapPlaceholder'
import { SITE_CONFIG } from '@/lib/constants'
import { buildBreadcrumbJsonLd } from '@/utils/seo'
import { Clock, MapPin, Phone } from 'lucide-react'
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

      <div className="min-h-screen bg-slate-100 pt-24">
        {/* Page header */}
        <div className="bg-sky-600">
          <div className="container py-8">
            <Breadcrumbs items={[{ label: 'Kontakt' }]} />
            <h1 className="text-3xl md:text-4xl font-black text-white mt-4">Kontakt</h1>
            <p className="text-sky-100 mt-2">Jesteśmy do Twojej dyspozycji</p>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-5">Dane kontaktowe</h2>
                <div className="space-y-3">
                  {[
                    {
                      icon: Phone,
                      label: 'Telefon',
                      value: SITE_CONFIG.phone,
                      href: `tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`,
                      accent: 'gold',
                    },
                    {
                      icon: 'whatsapp' as const,
                      label: 'WhatsApp',
                      value: 'Napisz wiadomość',
                      href: `https://wa.me/${SITE_CONFIG.phone.replace(/\D/g, '').replace(/^0/, '48')}`,
                      accent: 'blue',
                    },
                    {
                      icon: MapPin,
                      label: 'Adres',
                      value: SITE_CONFIG.address,
                      accent: 'neutral',
                    },
                    {
                      icon: Clock,
                      label: 'Godziny otwarcia',
                      value: SITE_CONFIG.openingHours,
                      accent: 'neutral',
                    },
                  ].map((item) => {
                    const isWhatsApp = item.icon === 'whatsapp'
                    const Icon = isWhatsApp ? null : item.icon as React.ElementType
                    const iconBg =
                      item.accent === 'blue' ? 'bg-[#25D366]' : 'bg-sky-600'
                    const iconColor = 'text-white'
                    const border =
                      item.accent === 'neutral'
                        ? 'border-slate-200'
                        : 'border-slate-200 hover:shadow-xl hover:shadow-sky-900/20 hover:-translate-y-1 transition-all duration-300'
                    const inner = (
                      <>
                        <div className={`w-11 h-11 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
                          {isWhatsApp ? (
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                          ) : Icon ? (
                            <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
                          ) : null}
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                          <p className="text-slate-900 font-bold text-sm">{item.value}</p>
                        </div>
                      </>
                    )
                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        {...(isWhatsApp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className={`flex items-center gap-4 p-4 bg-white rounded-xl border transition-all ${border}`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div
                        key={item.label}
                        className={`flex items-center gap-4 p-4 bg-white rounded-xl border ${border}`}
                      >
                        {inner}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Dane firmy */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700 text-sm mb-2">Dane firmy</p>
                <p>Paweł Trzaska Auto-Handel Gruby</p>
                <p>NIP: 6462932830</p>
                <p>REGON: 243465713</p>
                <p>ul. Cielmicka 36, 43-100 Tychy</p>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-5">Znajdź nas na mapie</h2>
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
