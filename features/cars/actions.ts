'use server'

/**
 * Server Actions for car-related mutations.
 *
 * Current:
 * - submitInquiry: Save contact inquiry from a car detail page
 *
 * TODO (admin panel):
 * - createCar
 * - updateCar
 * - deleteCar
 * - uploadCarImage
 * - deleteCarImage
 * - setCoverImage
 * - publishCar / unpublishCar
 */

import { createClient } from '@/lib/supabase/server'
import { inquirySchema } from '@/lib/schemas/car'
import type { InquiryInput } from '@/lib/schemas/car'

type ActionResult = { success: true } | { success: false; error: string }

export async function submitInquiry(input: InquiryInput): Promise<ActionResult> {
  const parsed = inquirySchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: 'Nieprawidłowe dane formularza.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.from('inquiries').insert({
    car_id: parsed.data.car_id ?? null,
    name: parsed.data.name,
    phone: parsed.data.phone ?? null,
    email: parsed.data.email ?? null,
    message: parsed.data.message,
  })

  if (error) {
    console.error('[submitInquiry] error:', error.message)
    return { success: false, error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' }
  }

  return { success: true }
}

/**
 * Records a page view for a car (for analytics).
 * Called from car detail page — fire and forget.
 */
export async function recordCarView(carId: string, ipHash?: string): Promise<void> {
  try {
    const supabase = await createClient()
    await supabase.from('car_views_stats').insert({
      car_id: carId,
      ip_hash: ipHash ?? null,
    })
  } catch {
    // Non-critical — silently fail
  }
}
