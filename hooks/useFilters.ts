'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import type { CarsFilter } from '@/types/car'

/**
 * Hook for reading and updating URL-based car filters.
 * Used by FiltersSidebar and other interactive filter components.
 */
export function useFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters: CarsFilter = {
    brand: searchParams.get('brand') ?? undefined,
    model: searchParams.get('model') ?? undefined,
    price_min: searchParams.get('price_min') ? Number(searchParams.get('price_min')) : undefined,
    price_max: searchParams.get('price_max') ? Number(searchParams.get('price_max')) : undefined,
    year_min: searchParams.get('year_min') ? Number(searchParams.get('year_min')) : undefined,
    year_max: searchParams.get('year_max') ? Number(searchParams.get('year_max')) : undefined,
    mileage_max: searchParams.get('mileage_max') ? Number(searchParams.get('mileage_max')) : undefined,
    fuel_type: (searchParams.get('fuel_type') as CarsFilter['fuel_type']) ?? undefined,
    transmission: (searchParams.get('transmission') as CarsFilter['transmission']) ?? undefined,
    body_type: (searchParams.get('body_type') as CarsFilter['body_type']) ?? undefined,
    accident_free: searchParams.get('accident_free') === 'true' ? true : undefined,
    search: searchParams.get('search') ?? undefined,
    sort: (searchParams.get('sort') as CarsFilter['sort']) ?? 'newest',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  }

  const setFilter = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page') // reset to page 1 on filter change
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  const clearFilters = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  const hasActiveFilters = Array.from(searchParams.entries()).some(
    ([key]) => !['sort', 'page'].includes(key),
  )

  return { filters, setFilter, clearFilters, hasActiveFilters }
}
