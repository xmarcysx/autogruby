import { createClient } from '@/lib/supabase/client'

export interface UploadedImage {
  storage_path: string
  alt: string
  sort_order: number
  is_cover: boolean
}

/**
 * Uploads a car image directly from the browser to Supabase Storage,
 * bypassing the Vercel serverless function body-size limit (4.5MB)
 * that a server action upload would otherwise hit.
 */
export async function uploadCarImage(
  carId: string,
  file: File,
  opts: { alt: string; sortOrder: number; isCover: boolean },
): Promise<UploadedImage> {
  const supabase = createClient()
  const ext = file.name.split('.').pop() ?? 'jpg'
  const storagePath = `${carId}/${Date.now()}-${opts.sortOrder}.${ext}`

  const { error } = await supabase.storage
    .from('car-images')
    .upload(storagePath, file, { contentType: file.type, upsert: false })

  if (error) throw new Error(`Błąd wysyłania zdjęcia: ${error.message}`)

  return {
    storage_path: storagePath,
    alt: opts.alt,
    sort_order: opts.sortOrder,
    is_cover: opts.isCover,
  }
}
