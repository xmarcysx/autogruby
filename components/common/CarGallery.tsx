'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CarImage } from '@/types/car'

interface CarGalleryProps {
  images: CarImage[]
  carTitle: string
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

  const goTo = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(images.length - 1, index)))
  }

  return (
    <>
      {/* Main image */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-800 border border-slate-700 cursor-zoom-in group">
        <Image
          src={activeImage.url ?? ''}
          alt={activeImage.alt || `${carTitle} – zdjęcie ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 65vw"
          priority={activeIndex === 0}
        />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === images.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Następne zdjęcie"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}

        {/* Counter + zoom */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {images.length > 1 && (
            <span className="bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
              {activeIndex + 1} / {images.length}
            </span>
          )}
          <button
            onClick={() => setLightboxOpen(true)}
            className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            aria-label="Powiększ zdjęcie"
          >
            <ZoomIn className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
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
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            aria-label="Zamknij podgląd"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={() => goTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 disabled:opacity-30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                disabled={activeIndex === images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 disabled:opacity-30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label="Następne zdjęcie"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          )}

          <div className="relative w-full max-w-5xl max-h-[90vh] aspect-[16/10] mx-6">
            <Image
              src={activeImage.url ?? ''}
              alt={activeImage.alt || `${carTitle} – zdjęcie ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  )
}
