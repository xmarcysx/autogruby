'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Najnowsze' },
  { value: 'oldest', label: 'Najstarsze' },
  { value: 'price_asc', label: 'Cena: rosnąco' },
  { value: 'price_desc', label: 'Cena: malejąco' },
  { value: 'year_desc', label: 'Rok: najnowszy' },
  { value: 'mileage_asc', label: 'Przebieg: najniższy' },
]

export function SortSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get('sort') ?? 'newest'

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-slate-600 whitespace-nowrap">
        Sortuj:
      </label>
      <Select value={current} onValueChange={handleChange}>
        <SelectTrigger
          id="sort-select"
          className="w-[200px] bg-white border-sky-200 text-slate-800 h-9 text-sm shadow-sm"
          aria-label="Sortowanie ofert"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white border-sky-200">
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-slate-800 focus:bg-sky-50 focus:text-brand-blue">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
