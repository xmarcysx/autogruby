import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { CarCard } from '@/components/common/CarCard'
import { CarGallery } from '@/components/common/CarGallery'
import { CarSpecs } from '@/components/common/CarSpecs'
import { ContactCard } from '@/components/common/ContactCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'
import { getAllCarSlugs, getCarBySlug, getSimilarCars } from '@/services/cars'
import { formatPrice } from '@/utils/formatters'
import { buildBreadcrumbJsonLd, buildCarDescription, buildCarJsonLd, buildCarKeywords, buildCarTitle } from '@/utils/seo'
import { ArrowLeft, Mail, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

// ISR: revalidate every hour
export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const slugs = await getAllCarSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const car = await getCarBySlug(slug)

  if (!car) {
    return {
      title: 'Oferta niedostępna | Auto Gruby',
    }
  }

  const title = buildCarTitle(car)
  const description = buildCarDescription(car)
  const keywords = buildCarKeywords(car)
  const imageUrl = car.cover_image?.url ?? `${SITE_CONFIG.url}/og-image.jpg`
  const canonical = `${SITE_CONFIG.url}/oferty/${car.slug}`

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: car.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params
  const car = await getCarBySlug(slug)

  if (!car) notFound()

  const similar = await getSimilarCars(car)
  const images = car.car_images ?? []

  const carJsonLd = buildCarJsonLd(car, car.cover_image?.url)
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Auto Gruby', url: SITE_CONFIG.url },
    { name: 'Oferty', url: `${SITE_CONFIG.url}/oferty` },
    { name: car.title, url: `${SITE_CONFIG.url}/oferty/${car.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(carJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-slate-100 pt-24">
        {/* Top bar */}
        <div className="bg-sky-600 border-b border-sky-700">
          <div className="container py-5">
            <Breadcrumbs
              items={[
                { label: 'Oferty', href: '/oferty' },
                { label: car.title },
              ]}
            />
          </div>
        </div>

        <div className="container py-8 md:py-10">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8 xl:gap-10">
            {/* LEFT – main content */}
            <div className="space-y-8">
              {/* Back + share */}
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-slate-600 -ml-2" asChild>
                  <Link href="/oferty">
                    <ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" />
                    Wróć do ofert
                  </Link>
                </Button>
              </div>

              {/* Gallery */}
              <section aria-label="Galeria zdjęć">
                <CarGallery images={images} carTitle={car.title} />
              </section>

              {/* Title + price */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {car.featured && <Badge variant="gold">Wyróżnione</Badge>}
                    {car.accident_free && <Badge variant="success">Bezwypadkowy</Badge>}
                    {car.service_history && <Badge variant="blue">Historia serwisowa</Badge>}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                    {car.title}
                  </h1>
                  <p className="text-slate-500 mt-1.5 text-sm">{car.location_city}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-4xl font-black text-brand-gold">
                    {formatPrice(car.price, car.currency)}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">Cena brutto, do negocjacji</p>
                </div>
              </div>

              {/* Specs */}
              <CarSpecs car={car} />

              {/* Description */}
              {car.description && (
                <section aria-labelledby="desc-heading">
                  <h2 id="desc-heading" className="text-xl font-bold text-slate-900 mb-4">
                    Opis oferty
                  </h2>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                      {car.description}
                    </div>
                  </div>
                </section>
              )}

              {/* Location */}
              <section
                className="bg-white rounded-xl border border-slate-200 p-6"
                aria-labelledby="location-heading"
              >
                <h2 id="location-heading" className="text-lg font-bold text-slate-900 mb-3">
                  Odbiór i lokalizacja
                </h2>
                <p className="text-slate-600 text-sm">
                  Samochód dostępny do odbioru w komisie <strong className="text-slate-900">Auto Gruby</strong>{' '}
                  w <strong className="text-slate-900">{car.location_city}</strong>. Zapraszamy na jazdę
                  próbną – wystarczy zadzwonić i umówić termin.
                </p>
                <p className="text-brand-gold text-sm font-medium mt-2">
                  📍 {SITE_CONFIG.address}
                </p>
              </section>

              {/* Similar cars */}
              {similar.length > 0 && (
                <section aria-labelledby="similar-heading">
                  <h2 id="similar-heading" className="text-xl font-bold text-slate-900 mb-5">
                    Podobne oferty
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {similar.map((s) => (
                      <CarCard key={s.id} car={s} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT – sticky contact */}
            <div className="xl:sticky xl:top-24 xl:self-start space-y-4">
              <ContactCard carTitle={car.title} />

              {/* Mobile CTAs */}
              <div className="flex flex-col gap-3 xl:hidden">
                <Button variant="gold" size="lg" className="w-full" asChild>
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}>
                    <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                    Zadzwoń
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="w-full border-sky-200 text-slate-700 hover:text-brand-blue hover:border-brand-blue hover:bg-sky-50" asChild>
                  <a href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(`Pytanie o: ${car.title}`)}`}>
                    <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                    Napisz email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
