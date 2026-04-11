'use client'

import { cn } from '@/lib/utils'
import type { CarImage } from '@/types/car'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface CarGalleryProps {
  images: CarImage[]
  carTitle: string
}

const SWIPE_THRESHOLD = 50

function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const touchStartX = useRef<number | null>(null)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > SWIPE_THRESHOLD) onSwipeLeft()
    else if (delta < -SWIPE_THRESHOLD) onSwipeRight()
    touchStartX.current = null
  }

  return { onTouchStart, onTouchEnd }
}

export function CarGallery({ images, carTitle }: CarGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/10] bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
        <p className="text-slate-500">Brak zdjęć dla tej oferty</p>
      </div>
    )
  }

  const activeImage = images[activeIndex]
  const total = images.length

  const goTo = (index: number) => setActiveIndex((index + total) % total)
  const goPrev = () => goTo(activeIndex - 1)
  const goNext = () => goTo(activeIndex + 1)

  const gallerySwipe = useSwipe(goNext, goPrev)
  const lightboxSwipe = useSwipe(goNext, goPrev)

  return (
    <>
      {/* Main image */}
      <div
        className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-800 border border-slate-700 group cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
        {...gallerySwipe}
        role="button"
        aria-label="Otwórz podgląd zdjęcia"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
      >
        <Image
          src={activeImage.url ?? ''}
          alt={activeImage.alt || `${carTitle} – zdjęcie ${activeIndex + 1}`}
          fill
          className="object-cover select-none pointer-events-none"
          sizes="(max-width: 768px) 100vw, 65vw"
          priority={activeIndex === 0}
          draggable={false}
        />

        {/* Nav arrows — always visible on mobile, hover-only on desktop */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Następne zdjęcie"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}

        {/* Counter + zoom */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {total > 1 && (
            <span className="bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
              {activeIndex + 1} / {total}
            </span>
          )}
          <div
            className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
            aria-hidden="true"
          >
            <ZoomIn className="h-4 w-4" />
          </div>
        </div>

        {/* Mobile dot indicators */}
        {total > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-all',
                  idx === activeIndex ? 'bg-white w-3' : 'bg-white/50',
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div
          className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin"
          role="tablist"
          aria-label="Miniaturki zdjęć"
        >
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => goTo(idx)}
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Zdjęcie ${idx + 1}`}
              className={cn(
                'relative shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
                idx === activeIndex ? 'border-brand-blue' : 'border-slate-700 opacity-60 hover:opacity-100',
              )}
            >
              <Image
                src={img.url ?? ''}
                alt={img.alt || `Miniaturka ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-label="Podgląd zdjęcia"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
          {...lightboxSwipe}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false) }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold z-10"
            aria-label="Zamknij podgląd"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold z-10"
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold z-10"
                aria-label="Następne zdjęcie"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl max-h-[90vh] aspect-[16/10] mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage.url ?? ''}
              alt={activeImage.alt || `${carTitle} – zdjęcie ${activeIndex + 1}`}
              fill
              className="object-contain select-none"
              sizes="100vw"
              draggable={false}
            />
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {activeIndex + 1} / {total}
          </p>
        </div>
      )}
    </>
  )
}
