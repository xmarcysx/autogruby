'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Phone, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

const NAV_LINKS = [
  { label: 'Strona główna', href: '/' },
  { label: 'Oferty', href: '/oferty' },
  { label: 'O nas', href: '/#o-nas' },
  { label: 'Kontakt', href: '/kontakt' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMobileOpen
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl'
          : 'bg-transparent',
      )}
      role="banner"
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-lg"
            aria-label="Auto Gruby – strona główna"
          >
            <Image
              src="/logo.webp"
              alt="Auto Gruby – komis samochodowy Tychy"
              width={120}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Nawigacja główna" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  'text-slate-300 hover:text-white hover:bg-slate-800/60',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
                  pathname === link.href && 'text-white bg-slate-800/40',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA phone */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="gold" size="default" asChild>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                aria-label={`Zadzwoń: ${SITE_CONFIG.phone}`}
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE_CONFIG.phone}
              </a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-800 bg-slate-950/98"
          role="navigation"
          aria-label="Menu mobilne"
        >
          <div className="container py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-4 py-3 rounded-md text-sm font-medium transition-colors',
                  'text-slate-300 hover:text-white hover:bg-slate-800',
                  pathname === link.href && 'text-white bg-slate-800',
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-1">
              <Button variant="gold" size="lg" className="w-full" asChild>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                  aria-label={`Zadzwoń: ${SITE_CONFIG.phone}`}
                >
                  <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                  {SITE_CONFIG.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
