'use client'

import { useEffect, useRef } from 'react'
import { recordCarView } from '@/features/cars/actions'

interface ViewTrackerProps {
  carId: string
}

export function ViewTracker({ carId }: ViewTrackerProps) {
  const recorded = useRef(false)

  useEffect(() => {
    if (recorded.current) return
    recorded.current = true
    recordCarView(carId)
  }, [carId])

  return null
}
