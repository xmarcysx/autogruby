'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'all')
    setVisible(false)
  }

  function acceptNecessary() {
    localStorage.setItem('cookie_consent', 'necessary')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Zgoda na pliki cookies"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 p-4 md:p-5"
    >
      <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
          Korzystamy z plików cookies w celu zapewnienia prawidłowego działania strony.
          Opcjonalne pliki cookies (analityczne) pomagają nam ulepszać serwis.{' '}
          <a href="/polityka-prywatnosci" className="text-brand-gold hover:underline">
            Polityka prywatności
          </a>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={acceptNecessary}
            className="border-slate-600 text-slate-300 hover:bg-slate-800 text-xs"
          >
            Tylko niezbędne
          </Button>
          <Button variant="gold" size="sm" onClick={accept} className="text-xs">
            Akceptuję wszystkie
          </Button>
        </div>
      </div>
    </div>
  )
}
