import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { CarCard } from '@/components/common/CarCard'
import { EmptyState } from '@/components/common/EmptyState'
import { FiltersSidebar } from '@/components/common/FiltersSidebar'
import { Pagination } from '@/components/common/Pagination'
import { SearchBar } from '@/components/common/SearchBar'
import { SortSelect } from '@/components/common/SortSelect'
import { SITE_CONFIG } from '@/lib/constants'
import { carsFilterSchema } from '@/lib/schemas/car'
import { getCars } from '@/services/cars'
import { buildBreadcrumbJsonLd } from '@/utils/seo'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Oferty samochodów używanych – Komis Tychy | Auto Gruby',
  description:
    'Przeglądaj oferty sprawdzonych samochodów używanych w komisie Auto Gruby w Tychach. Filtruj po marce, roku, cenie i paliwie. Nowe auta dodawane regularnie!',
  keywords: [
    'samochody używane Tychy',
    'komis samochodowy Tychy oferty',
    'tanie auta Tychy',
    'auto komis Tychy',
    'Auto Gruby oferty',
    'kupno samochodu Tychy',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/oferty`,
  },
  openGraph: {
    title: 'Oferty samochodów używanych – Auto Gruby Tychy',
    description: 'Sprawdzone samochody używane z komisu w Tychach. Szeroki wybór, uczciwe ceny.',
    url: `${SITE_CONFIG.url}/oferty`,
  },
}

interface PageProps {
  searchParams: Promise<Record<string, string | string[]>>
}

export default async function OffersPage({ searchParams }: PageProps) {
  const params = await searchParams
  // Normalize searchParams (always string)
  const normalized = Object.fromEntries(
    Object.entries(params).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
  )

  const filters = carsFilterSchema.parse(normalized)
  const { cars, total, page, per_page, total_pages } = await getCars(filters)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Auto Gruby', url: SITE_CONFIG.url },
    { name: 'Oferty', url: `${SITE_CONFIG.url}/oferty` },
  ])

  function buildHref(p: number) {
    const qs = new URLSearchParams(normalized)
    qs.set('page', String(p))
    return `/oferty?${qs.toString()}`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-slate-900 pt-24">
        {/* Page header */}
        <div className="bg-slate-800 border-b border-slate-800">
          <div className="container py-8">
            <Breadcrumbs items={[{ label: 'Oferty samochodów' }]} />
            <h1 className="text-3xl md:text-4xl font-black text-white mt-4">
              Samochody używane – <span className="text-brand-gold">Tychy</span>
            </h1>
            <p className="text-slate-400 mt-2">
              {total > 0
                ? `Znaleziono ${total} ${pluralCars(total)} w naszej ofercie`
                : 'Brak ofert spełniających kryteria'}
            </p>
          </div>
        </div>

        <div className="container py-8 md:py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <aside className="w-full lg:w-72 xl:w-80 shrink-0">
              <Suspense fallback={<div className="bg-slate-900 rounded-xl h-96 animate-pulse" />}>
                <FiltersSidebar />
              </Suspense>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Search + Sort bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1">
                  <Suspense>
                    <SearchBar />
                  </Suspense>
                </div>
                <Suspense>
                  <SortSelect />
                </Suspense>
              </div>

              {/* Results */}
              {cars.length === 0 ? (
                <EmptyState
                  title="Brak ofert spełniających kryteria"
                  description="Spróbuj zmienić lub wyczyścić filtry, aby zobaczyć więcej samochodów."
                  action={{ label: 'Wyczyść filtry', href: '/oferty' }}
                />
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {cars.map((car, index) => (
                      <CarCard key={car.id} car={car} priority={index < 3} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {total_pages > 1 && (
                    <div className="mt-10">
                      <Pagination
                        currentPage={page}
                        totalPages={total_pages}
                        buildHref={buildHref}
                      />
                      <p className="text-center text-slate-500 text-sm mt-3">
                        Strona {page} z {total_pages} · {total} {pluralCars(total)}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function pluralCars(n: number): string {
  if (n === 1) return 'samochód'
  if (n >= 2 && n <= 4) return 'samochody'
  return 'samochodów'
}
