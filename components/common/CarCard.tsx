import Link from 'next/link'
import Image from 'next/image'
import { Fuel, Gauge, Calendar, Settings2, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatMileage } from '@/utils/formatters'
import { FUEL_TYPE_LABELS, TRANSMISSION_LABELS } from '@/lib/constants'
import type { CarCardData } from '@/types/car'
import { cn } from '@/lib/utils'

interface CarCardProps {
  car: CarCardData
  priority?: boolean
}

export function CarCard({ car, priority = false }: CarCardProps) {
  const imageUrl = car.cover_image?.url
  const imageAlt = car.cover_image?.alt ?? `${car.brand} ${car.model} ${car.year}`

  return (
    <article className="group relative flex flex-col bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-brand-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/10">
      {/* Image */}
      <Link
        href={`/oferty/${car.slug}`}
        className="block relative aspect-[4/3] overflow-hidden bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        tabIndex={0}
        aria-label={`Zobacz ofertę: ${car.title}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <span className="text-slate-600 text-sm">Brak zdjęcia</span>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {car.featured && (
            <Badge variant="gold" className="text-xs">
              Wyróżnione
            </Badge>
          )}
          {car.accident_free && (
            <Badge variant="success" className="text-xs flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              Bezwypadkowy
            </Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title & price */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <Link
              href={`/oferty/${car.slug}`}
              className="block font-bold text-white text-base leading-tight hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:underline"
            >
              {car.title}
            </Link>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-brand-gold font-bold text-lg leading-none">
              {formatPrice(car.price, car.currency)}
            </p>
          </div>
        </div>

        {/* Key specs */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mt-auto">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-500 shrink-0" aria-hidden="true" />
            <span>{car.year} r.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-slate-500 shrink-0" aria-hidden="true" />
            <span>{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-slate-500 shrink-0" aria-hidden="true" />
            <span>{FUEL_TYPE_LABELS[car.fuel_type] ?? car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5 text-slate-500 shrink-0" aria-hidden="true" />
            <span>{TRANSMISSION_LABELS[car.transmission] ?? car.transmission}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/oferty/${car.slug}`}
          className={cn(
            'mt-4 block text-center py-2.5 px-4 rounded-lg text-sm font-semibold',
            'bg-slate-800 text-slate-300 hover:bg-brand-blue hover:text-white',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
          )}
          aria-label={`Szczegóły: ${car.title}`}
        >
          Zobacz szczegóły
        </Link>
      </div>
    </article>
  )
}
