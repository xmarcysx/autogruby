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
      <label htmlFor="sort-select" className="text-sm text-slate-400 whitespace-nowrap">
        Sortuj:
      </label>
      <Select value={current} onValueChange={handleChange}>
        <SelectTrigger
          id="sort-select"
          className="w-[200px] bg-slate-900 border-slate-700 text-slate-200 h-9 text-sm"
          aria-label="Sortowanie ofert"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700">
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-slate-200 focus:bg-slate-800 focus:text-white">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
