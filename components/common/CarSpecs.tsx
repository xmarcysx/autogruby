import {
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Car,
  Cog,
  Users,
  DoorOpen,
  Globe,
  ShieldCheck,
  Wrench,
  Palette,
  Zap,
} from 'lucide-react'
import type { Car as CarType } from '@/types/car'
import {
  FUEL_TYPE_LABELS,
  TRANSMISSION_LABELS,
  BODY_TYPE_LABELS,
  DRIVE_TYPE_LABELS,
} from '@/lib/constants'
import {
  formatMileage,
  formatEngineCapacity,
  formatPower,
} from '@/utils/formatters'

interface CarSpecsProps {
  car: CarType
}

export function CarSpecs({ car }: CarSpecsProps) {
  const specs = [
    {
      icon: Calendar,
      label: 'Rok produkcji',
      value: `${car.year} r.`,
    },
    {
      icon: Gauge,
      label: 'Przebieg',
      value: formatMileage(car.mileage),
    },
    {
      icon: Fuel,
      label: 'Rodzaj paliwa',
      value: FUEL_TYPE_LABELS[car.fuel_type] ?? car.fuel_type,
    },
    {
      icon: Settings2,
      label: 'Skrzynia biegów',
      value: TRANSMISSION_LABELS[car.transmission] ?? car.transmission,
    },
    {
      icon: Car,
      label: 'Typ nadwozia',
      value: BODY_TYPE_LABELS[car.body_type] ?? car.body_type,
    },
    car.engine_capacity
      ? { icon: Cog, label: 'Pojemność silnika', value: formatEngineCapacity(car.engine_capacity) }
      : null,
    car.engine_power_hp
      ? { icon: Zap, label: 'Moc silnika', value: formatPower(car.engine_power_hp) }
      : null,
    car.drive_type
      ? { icon: Cog, label: 'Napęd', value: DRIVE_TYPE_LABELS[car.drive_type] ?? car.drive_type }
      : null,
    car.color ? { icon: Palette, label: 'Kolor', value: car.color } : null,
    car.doors ? { icon: DoorOpen, label: 'Liczba drzwi', value: String(car.doors) } : null,
    car.seats ? { icon: Users, label: 'Liczba miejsc', value: String(car.seats) } : null,
    car.country_origin ? { icon: Globe, label: 'Kraj pochodzenia', value: car.country_origin } : null,
    car.first_registration_date
      ? {
          icon: Calendar,
          label: 'Pierwsza rejestracja',
          value: new Date(car.first_registration_date).toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
          }),
        }
      : null,
    {
      icon: ShieldCheck,
      label: 'Bezwypadkowy',
      value: car.accident_free ? 'Tak' : 'Nie',
      highlight: car.accident_free,
    },
    {
      icon: Wrench,
      label: 'Historia serwisowa',
      value: car.service_history ? 'Dostępna' : 'Brak/niepełna',
    },
  ].filter(Boolean) as Array<{
    icon: typeof Calendar
    label: string
    value: string
    highlight?: boolean
  }>

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-4">Parametry techniczne</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {specs.map((spec) => {
          const Icon = spec.icon
          return (
            <div
              key={spec.label}
              className="flex items-center gap-3 p-3.5 bg-white rounded-lg border border-slate-200"
            >
              <div className="shrink-0 w-8 h-8 rounded-md bg-sky-50 flex items-center justify-center">
                <Icon className="h-4 w-4 text-brand-blue" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 mb-0.5">{spec.label}</p>
                <p
                  className={`text-sm font-semibold ${spec.highlight ? 'text-emerald-600' : 'text-slate-900'}`}
                >
                  {spec.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
