import { createClient as _createClient } from '@/lib/supabase/server'
import type { Car, CarCardData, CarImage, CarsFilter, CarsListResult } from '@/types/car'
import { CARS_PER_PAGE } from '@/lib/constants'

// Cast to any to bypass Supabase PostgrestVersion "12" typing strictness
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createClient(): Promise<any> {
  return _createClient()
}

/**
 * Retrieves a paginated, filtered list of published cars (public).
 */
export async function getCars(filters: CarsFilter = {}): Promise<CarsListResult> {
  const supabase = await createClient()
  const page = filters.page ?? 1
  const perPage = filters.per_page ?? CARS_PER_PAGE
  const from = (page - 1) * perPage
  const to = from + perPage - 1

  let query = supabase
    .from('cars')
    .select(
      `
      id, slug, title, brand, model, year, mileage,
      fuel_type, transmission, body_type, engine_power_hp, engine_capacity,
      price, currency, featured, location_city, accident_free,
      car_images!inner(id, car_id, storage_path, alt, sort_order, is_cover, created_at)
    `,
      { count: 'exact' },
    )
    .eq('published', true)
    .eq('car_images.is_cover', true)

  // Apply filters
  if (filters.brand) query = query.ilike('brand', `%${filters.brand}%`)
  if (filters.model) query = query.ilike('model', `%${filters.model}%`)
  if (filters.price_min != null) query = query.gte('price', filters.price_min)
  if (filters.price_max != null) query = query.lte('price', filters.price_max)
  if (filters.year_min != null) query = query.gte('year', filters.year_min)
  if (filters.year_max != null) query = query.lte('year', filters.year_max)
  if (filters.mileage_max != null) query = query.lte('mileage', filters.mileage_max)
  if (filters.fuel_type) query = query.eq('fuel_type', filters.fuel_type)
  if (filters.transmission) query = query.eq('transmission', filters.transmission)
  if (filters.body_type) query = query.eq('body_type', filters.body_type)
  if (filters.power_min != null) query = query.gte('engine_power_hp', filters.power_min)
  if (filters.power_max != null) query = query.lte('engine_power_hp', filters.power_max)
  if (filters.drive_type) query = query.eq('drive_type', filters.drive_type)
  if (filters.country_origin) query = query.eq('country_origin', filters.country_origin)
  if (filters.accident_free != null) query = query.eq('accident_free', filters.accident_free)
  if (filters.search)
    query = query.or(`title.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,model.ilike.%${filters.search}%`)

  // Sorting
  switch (filters.sort) {
    case 'price_asc':
      query = query.order('price', { ascending: true })
      break
    case 'price_desc':
      query = query.order('price', { ascending: false })
      break
    case 'mileage_asc':
      query = query.order('mileage', { ascending: true })
      break
    case 'year_desc':
      query = query.order('year', { ascending: false })
      break
    case 'oldest':
      query = query.order('created_at', { ascending: true })
      break
    default: // newest
      query = query.order('created_at', { ascending: false })
  }

  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    console.error('[getCars] Supabase error:', error.message)
    return { cars: [], total: 0, page, per_page: perPage, total_pages: 0 }
  }

  const cars = (data ?? []).map((row: any) => {
    const images = (row.car_images ?? []) as CarImage[]
    const cover = images.find((img) => img.is_cover) ?? images[0] ?? null
    return {
      ...(row as unknown as CarCardData),
      cover_image: cover ? withPublicUrl(cover) : null,
    }
  })

  const total = count ?? 0
  return {
    cars,
    total,
    page,
    per_page: perPage,
    total_pages: Math.ceil(total / perPage),
  }
}

/**
 * Fetches a single published car by slug (public).
 */
export async function getCarBySlug(slug: string): Promise<Car | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cars')
    .select(
      `
      *,
      car_images(id, car_id, storage_path, alt, sort_order, is_cover, created_at)
    `,
    )
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) return null

  const images = ((data.car_images as CarImage[]) ?? [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(withPublicUrl)

  return {
    ...(data as unknown as Car),
    car_images: images,
    cover_image: images.find((img) => img.is_cover) ?? images[0] ?? null,
  }
}

/**
 * Fetches featured/highlighted cars for the homepage.
 */
export async function getFeaturedCars(limit = 3): Promise<CarCardData[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cars')
    .select(
      `
      id, slug, title, brand, model, year, mileage,
      fuel_type, transmission, body_type, engine_power_hp, engine_capacity,
      price, currency, featured, location_city, accident_free,
      car_images!inner(id, car_id, storage_path, alt, sort_order, is_cover, created_at)
    `,
    )
    .eq('published', true)
    .eq('featured', true)
    .eq('car_images.is_cover', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[getFeaturedCars] error:', error.message)
    return []
  }

  return (data ?? []).map((row: any) => {
    const images = (row.car_images ?? []) as CarImage[]
    const cover = images.find((img) => img.is_cover) ?? images[0] ?? null
    return {
      ...(row as unknown as CarCardData),
      cover_image: cover ? withPublicUrl(cover) : null,
    }
  })
}

/**
 * Fetches slugs of all published cars (for sitemap / generateStaticParams).
 */
export async function getAllCarSlugs(): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('cars')
    .select('slug')
    .eq('published', true)
    .order('created_at', { ascending: false })
  return (data ?? []).map((row: any) => row.slug)
}

/**
 * Returns a list of similar cars (same brand or body type), excluding the given slug.
 */
export async function getSimilarCars(car: Pick<Car, 'brand' | 'body_type' | 'slug'>, limit = 3): Promise<CarCardData[]> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('cars')
    .select(
      `
      id, slug, title, brand, model, year, mileage,
      fuel_type, transmission, body_type, engine_power_hp, engine_capacity,
      price, currency, featured, location_city, accident_free,
      car_images!inner(id, car_id, storage_path, alt, sort_order, is_cover, created_at)
    `,
    )
    .eq('published', true)
    .eq('brand', car.brand)
    .neq('slug', car.slug)
    .eq('car_images.is_cover', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  return (data ?? []).map((row: any) => {
    const images = (row.car_images ?? []) as CarImage[]
    const cover = images.find((img) => img.is_cover) ?? images[0] ?? null
    return {
      ...(row as unknown as CarCardData),
      cover_image: cover ? withPublicUrl(cover) : null,
    }
  })
}

// --- helpers ---

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''

function withPublicUrl(image: CarImage): CarImage {
  return {
    ...image,
    url: `${SUPABASE_URL}/storage/v1/object/public/car-images/${image.storage_path}`,
  }
}
