'use client'

import { CarCard } from '@/components/common/CarCard'
import type { CarCardData } from '@/types/car'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface CarCarouselProps {
  cars: CarCardData[]
}

export function CarCarousel({ cars }: CarCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const firstItemRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [arrowTop, setArrowTop] = useState<number | null>(null)

  const updateScrollState = () => {
    const track = trackRef.current
    if (!track) return
    setCanScrollPrev(track.scrollLeft > 8)
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 8)
  }

  useEffect(() => {
    updateScrollState()

    const item = firstItemRef.current
    if (!item) return

    // Karta ma obrazek w proporcji 4:3 — środek strzałek = połowa wysokości obrazka
    const updateArrowTop = () => setArrowTop(item.offsetWidth * 0.75 * 0.5)
    updateArrowTop()

    const observer = new ResizeObserver(updateArrowTop)
    observer.observe(item)
    return () => observer.disconnect()
  }, [])

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-carousel-item]')
    const amount = (card?.offsetWidth ?? track.clientWidth) + 24
    track.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2 mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {cars.map((car, index) => (
          <div
            key={car.id}
            ref={index === 0 ? firstItemRef : undefined}
            data-carousel-item
            className="snap-start shrink-0 w-[85%] sm:w-[46%] lg:w-[31%]"
          >
            <CarCard car={car} priority={index === 0} />
          </div>
        ))}
      </div>

      {arrowTop !== null && (
        <>
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollPrev}
            aria-label="Poprzednie oferty"
            style={{ top: arrowTop }}
            className="absolute left-2 sm:left-3 -translate-y-1/2 z-10 flex items-center justify-center h-12 w-12 rounded-full bg-white/90 shadow-md text-slate-700 hover:bg-brand-gold hover:text-slate-900 transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-10 w-10" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollNext}
            aria-label="Następne oferty"
            style={{ top: arrowTop }}
            className="absolute right-2 sm:right-3 -translate-y-1/2 z-10 flex items-center justify-center h-12 w-12 rounded-full bg-white/90 shadow-md text-slate-700 hover:bg-brand-gold hover:text-slate-900 transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight className="h-10 w-10" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  )
}
