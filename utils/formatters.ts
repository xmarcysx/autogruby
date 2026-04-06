import type { Currency } from '@/types/car'

export function formatPrice(price: number, currency: Currency = 'PLN'): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat('pl-PL').format(mileage) + ' km'
}

export function formatEngineCapacity(cc: number): string {
  return (cc / 1000).toFixed(1) + ' l'
}

export function formatPower(hp: number): string {
  const kw = Math.round(hp * 0.7355)
  return `${hp} KM (${kw} kW)`
}

export function formatYear(year: number): string {
  return String(year)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatShortDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pl-PL')
}
