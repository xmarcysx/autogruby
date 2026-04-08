'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import type { FuelType, TransmissionType, BodyType, DriveType, Currency } from '@/types/car'

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function generateSlug(brand: string, model: string, year: string): string {
  const base = slugify(`${brand} ${model} ${year}`)
  const suffix = Math.random().toString(36).slice(2, 6)
  return `${base}-${suffix}`
}

export interface CarFormState {
  error?: string
  success?: boolean
}

function parseCarData(formData: FormData, brand?: string, model?: string, year?: string) {
  return {
    title: formData.get('title') as string,
    brand: brand ?? (formData.get('brand') as string),
    model: model ?? (formData.get('model') as string),
    generation: (formData.get('generation') as string) || null,
    year: parseInt((year ?? formData.get('year')) as string),
    mileage: parseInt(formData.get('mileage') as string),
    fuel_type: formData.get('fuel_type') as FuelType,
    transmission: formData.get('transmission') as TransmissionType,
    body_type: formData.get('body_type') as BodyType,
    engine_capacity: formData.get('engine_capacity') ? parseInt(formData.get('engine_capacity') as string) : null,
    engine_power_hp: formData.get('engine_power_hp') ? parseInt(formData.get('engine_power_hp') as string) : null,
    drive_type: (formData.get('drive_type') as DriveType) || null,
    color: (formData.get('color') as string) || null,
    doors: formData.get('doors') ? parseInt(formData.get('doors') as string) : null,
    seats: formData.get('seats') ? parseInt(formData.get('seats') as string) : null,
    vin: (formData.get('vin') as string) || null,
    registration_number: (formData.get('registration_number') as string) || null,
    country_origin: (formData.get('country_origin') as string) || null,
    first_registration_date: (formData.get('first_registration_date') as string) || null,
    accident_free: formData.get('accident_free') === 'true',
    service_history: formData.get('service_history') === 'true',
    description: (formData.get('description') as string) || null,
    price: parseInt(formData.get('price') as string),
    currency: (formData.get('currency') as Currency) || 'PLN',
    featured: formData.get('featured') === 'true',
    published: formData.get('published') === 'true',
    sold: formData.get('sold') === 'true',
    location_city: (formData.get('location_city') as string) || 'Tychy',
  }
}

async function uploadImages(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  carId: string,
  title: string,
  imageFiles: File[],
  coverIndex: number,
) {
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i]
    if (!file || file.size === 0) continue

    const ext = file.name.split('.').pop() ?? 'jpg'
    const storagePath = `${carId}/${Date.now()}-${i}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    const { error: uploadError } = await supabase.storage
      .from('car-images')
      .upload(storagePath, buffer, { contentType: file.type, upsert: false })

    if (uploadError) {
      console.error('[uploadImages] upload error:', uploadError.message)
      continue
    }

    await supabase.from('car_images').insert({
      car_id: carId,
      storage_path: storagePath,
      alt: title,
      sort_order: i,
      is_cover: i === coverIndex,
    })
  }
}

export async function createCarAction(
  _prev: CarFormState,
  formData: FormData,
): Promise<CarFormState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = (await createAdminClient()) as any

  const brand = formData.get('brand') as string
  const model = formData.get('model') as string
  const year = formData.get('year') as string

  const carData = {
    slug: generateSlug(brand, model, year),
    ...parseCarData(formData, brand, model, year),
  }

  const { data: car, error } = await supabase.from('cars').insert(carData).select('id').single()

  if (error || !car) {
    console.error('[createCarAction]', error?.message)
    return { error: 'Błąd podczas dodawania auta: ' + (error?.message ?? 'nieznany błąd') }
  }

  const imageFiles = formData.getAll('images') as File[]
  const coverIndex = parseInt((formData.get('cover_index') as string) ?? '0')
  await uploadImages(supabase, car.id, carData.title, imageFiles, coverIndex)

  revalidatePath('/admin/cars')
  revalidatePath('/oferty')
  redirect('/admin/cars')
}

export async function updateCarAction(
  carId: string,
  _prev: CarFormState,
  formData: FormData,
): Promise<CarFormState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = (await createAdminClient()) as any

  const carData = parseCarData(formData)

  const { error } = await supabase.from('cars').update(carData).eq('id', carId)

  if (error) {
    console.error('[updateCarAction]', error.message)
    return { error: 'Błąd podczas aktualizacji auta: ' + error.message }
  }

  // Handle new image uploads
  const imageFiles = formData.getAll('images') as File[]
  await uploadImages(supabase, carId, carData.title, imageFiles, -1)

  // Update cover image if specified
  const existingCoverId = formData.get('existing_cover_id') as string
  if (existingCoverId) {
    await supabase.from('car_images').update({ is_cover: false }).eq('car_id', carId)
    await supabase.from('car_images').update({ is_cover: true }).eq('id', existingCoverId)
  }

  revalidatePath('/admin/cars')
  revalidatePath(`/oferty/${formData.get('slug') as string}`)
  revalidatePath('/oferty')
  redirect('/admin/cars')
}

export async function deleteCarAction(carId: string): Promise<{ error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = (await createAdminClient()) as any

  const { data: images } = await supabase
    .from('car_images')
    .select('storage_path')
    .eq('car_id', carId)

  if (images && images.length > 0) {
    const { error: storageError } = await supabase.storage
      .from('car-images')
      .remove(images.map((img: { storage_path: string }) => img.storage_path))
    if (storageError) console.error('[deleteCarAction] storage error:', storageError.message)
  }

  const { error } = await supabase.from('cars').delete().eq('id', carId)
  if (error) {
    console.error('[deleteCarAction] db error:', error.message)
    return { error: 'Błąd podczas usuwania: ' + error.message }
  }

  revalidatePath('/admin/cars')
  revalidatePath('/oferty')
  return {}
}

export async function toggleSoldAction(carId: string, sold: boolean): Promise<{ error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = (await createAdminClient()) as any
  const { error } = await supabase.from('cars').update({ sold }).eq('id', carId)
  if (error) {
    console.error('[toggleSoldAction] db error:', error.message)
    return { error: 'Błąd podczas zmiany statusu: ' + error.message }
  }
  revalidatePath('/admin/cars')
  revalidatePath('/oferty')
  return {}
}

export async function deleteCarImageAction(imageId: string, storagePath: string, carId: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = (await createAdminClient()) as any
  await supabase.storage.from('car-images').remove([storagePath])
  await supabase.from('car_images').delete().eq('id', imageId)
  revalidatePath(`/admin/cars/${carId}/edit`)
}

export async function setCoverImageAction(imageId: string, carId: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = (await createAdminClient()) as any
  await supabase.from('car_images').update({ is_cover: false }).eq('car_id', carId)
  await supabase.from('car_images').update({ is_cover: true }).eq('id', imageId)
  revalidatePath(`/admin/cars/${carId}/edit`)
}
