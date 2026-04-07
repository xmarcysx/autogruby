import Image from 'next/image'
import Link from 'next/link'
import { PlusCircle, Search, Car } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import CarRowActions from '@/components/admin/CarRowActions'
import { getAdminCars } from '@/services/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FUEL_TYPE_LABELS, TRANSMISSION_LABELS } from '@/lib/constants'

interface PageProps {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>
}

export default async function AdminCarsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const status = (params.status as 'active' | 'sold' | 'all') ?? 'all'
  const search = params.search ?? ''
  const page = parseInt(params.page ?? '1')

  const { cars, total, total_pages } = await getAdminCars({ status, search, page, per_page: 20 })

  const statusTabs = [
    { value: 'all', label: 'Wszystkie', count: null },
    { value: 'active', label: 'Aktywne', count: null },
    { value: 'sold', label: 'Sprzedane', count: null },
  ]

  return (
    <AdminShell>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Oferty samochodów</h1>
            <p className="text-slate-500 text-sm mt-1">
              {total} {total === 1 ? 'auto' : total < 5 ? 'auta' : 'aut'} łącznie
            </p>
          </div>
          <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white shrink-0">
            <Link href="/admin/cars/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              Dodaj auto
            </Link>
          </Button>
        </div>

        {/* Filters bar */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <form className="flex-1">
              <input type="hidden" name="status" value={status} />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                <input
                  name="search"
                  type="text"
                  placeholder="Szukaj po marce, modelu, tytule..."
                  defaultValue={search}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20"
                />
              </div>
            </form>

            {/* Status tabs */}
            <div className="flex gap-1 p-1 bg-slate-800 rounded-xl">
              {statusTabs.map((tab) => (
                <Link
                  key={tab.value}
                  href={`/admin/cars?status=${tab.value}${search ? `&search=${search}` : ''}`}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    status === tab.value
                      ? 'bg-slate-700 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Cars table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          {cars.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                <Car className="h-7 w-7 text-slate-600" />
              </div>
              <p className="text-slate-400 font-medium">Brak samochodów</p>
              <p className="text-slate-600 text-sm mt-1">
                {search ? 'Zmień kryteria wyszukiwania' : 'Dodaj pierwsze auto do oferty'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Samochód
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                      Szczegóły
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                      Cena
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Akcje
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-slate-800/50 transition-colors group">
                      {/* Thumbnail + title */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-4">
                          <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                            {car.cover_image?.url ? (
                              <Image
                                src={car.cover_image.url}
                                alt={car.cover_image.alt || car.title}
                                fill
                                className="object-cover"
                                sizes="96px"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Car className="h-6 w-6 text-slate-600" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-white truncate max-w-48">
                              {car.title}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {car.brand} {car.model} · {car.year}
                            </div>
                            <div className="text-xs text-slate-600 mt-0.5 font-mono">
                              {car.mileage.toLocaleString('pl-PL')} km
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Details */}
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="space-y-1">
                          <div className="text-xs text-slate-400">
                            {FUEL_TYPE_LABELS[car.fuel_type] ?? car.fuel_type} ·{' '}
                            {TRANSMISSION_LABELS[car.transmission] ?? car.transmission}
                          </div>
                          {car.engine_power_hp && (
                            <div className="text-xs text-slate-500">
                              {car.engine_power_hp} KM
                              {car.engine_capacity ? ` · ${car.engine_capacity} cm³` : ''}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="text-sm font-bold text-white">
                          {car.price.toLocaleString('pl-PL')}
                          <span className="text-slate-500 font-normal ml-1 text-xs">
                            {car.currency}
                          </span>
                        </div>
                      </td>

                      {/* Status badges */}
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {car.sold ? (
                            <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 text-xs w-fit">
                              Sprzedany
                            </Badge>
                          ) : (
                            <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 text-xs w-fit">
                              Aktywny
                            </Badge>
                          )}
                          {!car.published && (
                            <Badge className="bg-slate-700 text-slate-400 border-slate-600 text-xs w-fit">
                              Ukryty
                            </Badge>
                          )}
                          {car.featured && (
                            <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 text-xs w-fit">
                              Wyróżniony
                            </Badge>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <CarRowActions
                          carId={car.id}
                          carSlug={car.slug}
                          sold={car.sold}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {total_pages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: total_pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/admin/cars?status=${status}&page=${p}${search ? `&search=${search}` : ''}`}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                  p === page
                    ? 'bg-brand-blue text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  )
}
