'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BODY_TYPE_LABELS,
  CAR_BRANDS,
  FUEL_TYPE_LABELS,
  TRANSMISSION_LABELS,
} from '@/lib/constants'
import { SlidersHorizontal, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function FiltersSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getParam = (key: string) => searchParams.get(key) ?? ''

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  const clearAll = () => {
    router.push(pathname)
  }

  const hasFilters = Array.from(searchParams.entries()).some(
    ([key]) => key !== 'sort' && key !== 'page',
  )

  return (
    <aside
      className="bg-white rounded-xl border border-sky-200 p-5 space-y-5 shadow-sm"
      aria-label="Filtry ofert"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-slate-900 font-bold flex items-center gap-2 text-sm">
          <SlidersHorizontal className="h-4 w-4 text-brand-blue" aria-hidden="true" />
          Filtry
        </h2>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-slate-500 hover:text-brand-blue flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:underline"
            aria-label="Wyczyść wszystkie filtry"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Wyczyść
          </button>
        )}
      </div>

      {/* Brand */}
      <FilterField label="Marka">
        <Select value={getParam('brand')} onValueChange={(v) => updateParam('brand', v === '__all' ? '' : v)}>
          <SelectTrigger className="bg-sky-50 border-sky-200 text-slate-800 text-sm h-9">
            <SelectValue placeholder="Wszystkie marki" />
          </SelectTrigger>
          <SelectContent className="bg-white border-sky-200 max-h-56">
            <SelectItem value="__all" className="text-slate-500 focus:bg-sky-50">Wszystkie marki</SelectItem>
            {CAR_BRANDS.map((brand) => (
              <SelectItem key={brand} value={brand} className="text-slate-800 focus:bg-sky-50 focus:text-brand-blue">
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      {/* Price range */}
      <FilterField label="Cena (PLN)">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Od"
            className="bg-sky-50 border-sky-200 text-slate-800 text-sm h-9"
            defaultValue={getParam('price_min')}
            onBlur={(e) => updateParam('price_min', e.target.value)}
            aria-label="Cena od"
            min={0}
          />
          <Input
            type="number"
            placeholder="Do"
            className="bg-sky-50 border-sky-200 text-slate-800 text-sm h-9"
            defaultValue={getParam('price_max')}
            onBlur={(e) => updateParam('price_max', e.target.value)}
            aria-label="Cena do"
            min={0}
          />
        </div>
      </FilterField>

      {/* Year range */}
      <FilterField label="Rok produkcji">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Od"
            className="bg-sky-50 border-sky-200 text-slate-800 text-sm h-9"
            defaultValue={getParam('year_min')}
            onBlur={(e) => updateParam('year_min', e.target.value)}
            aria-label="Rok od"
            min={1990}
            max={new Date().getFullYear()}
          />
          <Input
            type="number"
            placeholder="Do"
            className="bg-sky-50 border-sky-200 text-slate-800 text-sm h-9"
            defaultValue={getParam('year_max')}
            onBlur={(e) => updateParam('year_max', e.target.value)}
            aria-label="Rok do"
            min={1990}
            max={new Date().getFullYear()}
          />
        </div>
      </FilterField>

      {/* Max mileage */}
      <FilterField label="Przebieg do (km)">
        <Input
          type="number"
          placeholder="np. 150000"
          className="bg-sky-50 border-sky-200 text-slate-800 text-sm h-9"
          defaultValue={getParam('mileage_max')}
          onBlur={(e) => updateParam('mileage_max', e.target.value)}
          aria-label="Maksymalny przebieg"
          min={0}
        />
      </FilterField>

      {/* Fuel type */}
      <FilterField label="Paliwo">
        <Select value={getParam('fuel_type')} onValueChange={(v) => updateParam('fuel_type', v === '__all' ? '' : v)}>
          <SelectTrigger className="bg-sky-50 border-sky-200 text-slate-800 text-sm h-9">
            <SelectValue placeholder="Wszystkie" />
          </SelectTrigger>
          <SelectContent className="bg-white border-sky-200">
            <SelectItem value="__all" className="text-slate-500 focus:bg-sky-50">Wszystkie</SelectItem>
            {Object.entries(FUEL_TYPE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value} className="text-slate-800 focus:bg-sky-50 focus:text-brand-blue">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      {/* Transmission */}
      <FilterField label="Skrzynia biegów">
        <Select value={getParam('transmission')} onValueChange={(v) => updateParam('transmission', v === '__all' ? '' : v)}>
          <SelectTrigger className="bg-sky-50 border-sky-200 text-slate-800 text-sm h-9">
            <SelectValue placeholder="Wszystkie" />
          </SelectTrigger>
          <SelectContent className="bg-white border-sky-200">
            <SelectItem value="__all" className="text-slate-500 focus:bg-sky-50">Wszystkie</SelectItem>
            {Object.entries(TRANSMISSION_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value} className="text-slate-800 focus:bg-sky-50 focus:text-brand-blue">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      {/* Body type */}
      <FilterField label="Typ nadwozia">
        <Select value={getParam('body_type')} onValueChange={(v) => updateParam('body_type', v === '__all' ? '' : v)}>
          <SelectTrigger className="bg-sky-50 border-sky-200 text-slate-800 text-sm h-9">
            <SelectValue placeholder="Wszystkie" />
          </SelectTrigger>
          <SelectContent className="bg-white border-sky-200">
            <SelectItem value="__all" className="text-slate-500 focus:bg-sky-50">Wszystkie</SelectItem>
            {Object.entries(BODY_TYPE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value} className="text-slate-800 focus:bg-sky-50 focus:text-brand-blue">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      {/* Accident free */}
      <FilterField label="Stan">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={getParam('accident_free') === 'true'}
            onChange={(e) => updateParam('accident_free', e.target.checked ? 'true' : '')}
            className="w-4 h-4 accent-brand-blue"
            aria-label="Tylko bezwypadkowe"
          />
          <span className="text-sm text-slate-700 group-hover:text-brand-blue transition-colors">
            Tylko bezwypadkowe
          </span>
        </label>
      </FilterField>

      {hasFilters && (
        <Button
          variant="outline"
          size="sm"
          className="w-full border-sky-300 text-slate-600 hover:text-brand-blue hover:border-brand-blue hover:bg-sky-50"
          onClick={clearAll}
        >
          <X className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
          Wyczyść filtry
        </Button>
      )}
    </aside>
  )
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-slate-500 uppercase tracking-wide font-semibold">{label}</Label>
      {children}
    </div>
  )
}
