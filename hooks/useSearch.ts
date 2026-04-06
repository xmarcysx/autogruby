'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useRef, useState, useCallback } from 'react'

/**
 * Debounced search hook for the car listing search bar.
 */
export function useSearch(debounceMs = 400) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') ?? '')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback(
    (newValue: string) => {
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
      }, debounceMs)
    },
    [router, pathname, searchParams, debounceMs],
  )

  const clear = useCallback(() => {
    setValue('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('search')
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  return { value, handleChange, clear }
}
