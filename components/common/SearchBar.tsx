'use client'

import { Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

export function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get('search') ?? ''
  const [value, setValue] = useState(current)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setValue(newValue)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (newValue) {
        params.set('search', newValue)
      } else {
        params.delete('search')
      }
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    }, 400)
  }

  function handleClear() {
    setValue('')
    if (timerRef.current) clearTimeout(timerRef.current)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('search')
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (timerRef.current) clearTimeout(timerRef.current)
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <label htmlFor="car-search" className="sr-only">
          Wyszukaj samochód
        </label>
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          id="car-search"
          type="search"
          placeholder="Wyszukaj markę, model..."
          value={value}
          onChange={handleChange}
          className="w-full pl-9 pr-9 h-10 rounded-lg bg-white border border-sky-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent shadow-sm"
          aria-label="Wyszukaj samochód"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus-visible:outline-none"
            aria-label="Wyczyść wyszukiwanie"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="shrink-0 h-10 px-4 rounded-lg bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-medium flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Szukaj</span>
      </button>
    </form>
  )
}
