import { Badge } from '@/components/ui/badge'
import { FUEL_TYPE_LABELS, TRANSMISSION_LABELS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { CarCardData } from '@/types/car'
import { formatMileage, formatPrice } from '@/utils/formatters'
import { ArrowRight, Calendar, Fuel, Gauge, Settings2, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CarCardProps {
  car: CarCardData
  priority?: boolean
}

export function CarCard({ car, priority = false }: CarCardProps) {
  const imageUrl = car.cover_image?.url
  const imageAlt = car.cover_image?.alt ?? `${car.brand} ${car.model} ${car.year}`

  return (
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-brand-blue/15 hover:-translate-y-1.5 transition-all duration-300">
      {/* Image */}
      <Link
        href={`/oferty/${car.slug}`}
        className="block relative aspect-[4/3] overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
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
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
            <span className="text-slate-400 text-sm">Brak zdjęcia</span>
          </div>
        )}

        {/* Gradient overlay na dole zdjęcia */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {car.featured && (
            <Badge variant="gold" className="text-xs shadow-sm">
              Wyróżnione
            </Badge>
          )}
          {car.accident_free && (
            <Badge variant="success" className="text-xs flex items-center gap-1 shadow-sm">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              Bezwypadkowy
            </Badge>
          )}
        </div>

        {/* Cena na zdjęciu — prawy dół */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-brand-gold text-slate-900 font-black text-base px-3 py-1 rounded-lg shadow-lg">
            {formatPrice(car.price, car.currency)}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Tytuł */}
        <Link
          href={`/oferty/${car.slug}`}
          className="block font-bold text-slate-900 text-base leading-tight hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:underline mb-3"
        >
          {car.title}
        </Link>

        {/* Key specs */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-brand-blue/60 shrink-0" aria-hidden="true" />
            <span>{car.year} r.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-brand-blue/60 shrink-0" aria-hidden="true" />
            <span>{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-brand-blue/60 shrink-0" aria-hidden="true" />
            <span>{FUEL_TYPE_LABELS[car.fuel_type] ?? car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5 text-brand-blue/60 shrink-0" aria-hidden="true" />
            <span>{TRANSMISSION_LABELS[car.transmission] ?? car.transmission}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/oferty/${car.slug}`}
          className={cn(
            'mt-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold',
            'bg-brand-blue text-white hover:bg-brand-blue-dark',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
          )}
          aria-label={`Szczegóły: ${car.title}`}
        >
          Zobacz szczegóły
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
