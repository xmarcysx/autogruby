import { createAdminClient as _createAdminClient } from '@/lib/supabase/server'
import type { Car, CarImage, Inquiry } from '@/types/car'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''

// Admin client cast to any to bypass Supabase PostgrestVersion typing strictness
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createAdminClient(): Promise<any> {
  return _createAdminClient()
}

function withPublicUrl(image: CarImage): CarImage {
  return {
    ...image,
    url: `${SUPABASE_URL}/storage/v1/object/public/car-images/${image.storage_path}`,
  }
}

export interface AdminCarsFilter {
  status?: 'active' | 'sold' | 'all'
  search?: string
  page?: number
  per_page?: number
}

export interface AdminCarsResult {
  cars: Car[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export async function getAdminCars(filters: AdminCarsFilter = {}): Promise<AdminCarsResult> {
  const supabase = await createAdminClient()
  const page = filters.page ?? 1
  const perPage = filters.per_page ?? 20
  const from = (page - 1) * perPage
  const to = from + perPage - 1

  let query = supabase
    .from('cars')
    .select(
      `*, car_images(id, car_id, storage_path, alt, sort_order, is_cover, created_at)`,
      { count: 'exact' },
    )

  if (filters.status === 'sold') {
    query = query.eq('sold', true)
  } else if (filters.status === 'active') {
    query = query.eq('sold', false)
  }

  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,model.ilike.%${filters.search}%`,
    )
  }

  query = query.order('created_at', { ascending: false }).range(from, to)

  const { data, error, count } = await query

  if (error) {
    console.error('[getAdminCars] error:', error.message)
    return { cars: [], total: 0, page, per_page: perPage, total_pages: 0 }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cars = (data ?? []).map((row: any) => {
    const images = ((row.car_images ?? []) as CarImage[])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(withPublicUrl)
    return {
      ...(row as unknown as Car),
      car_images: images,
      cover_image: images.find((img) => img.is_cover) ?? images[0] ?? null,
    }
  })

  const total = count ?? 0
  return { cars, total, page, per_page: perPage, total_pages: Math.ceil(total / perPage) }
}

export async function getAdminCarById(id: string): Promise<Car | null> {
  const supabase = await createAdminClient()

  const { data, error } = await supabase
    .from('cars')
    .select(`*, car_images(id, car_id, storage_path, alt, sort_order, is_cover, created_at)`)
    .eq('id', id)
    .single()

  if (error || !data) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const images = ((data.car_images as CarImage[]) ?? [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(withPublicUrl)

  return {
    ...(data as unknown as Car),
    car_images: images,
    cover_image: images.find((img) => img.is_cover) ?? images[0] ?? null,
  }
}

export async function getAdminStats() {
  const supabase = await createAdminClient()

  const [carsResult, soldResult, inquiriesResult, viewsResult] = await Promise.all([
    supabase.from('cars').select('id', { count: 'exact', head: true }).eq('published', true).eq('sold', false),
    supabase.from('cars').select('id', { count: 'exact', head: true }).eq('sold', true),
    supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase
      .from('car_views_stats')
      .select('id', { count: 'exact', head: true })
      .gte('viewed_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
  ])

  return {
    activeCars: carsResult.count ?? 0,
    soldCars: soldResult.count ?? 0,
    newInquiries: inquiriesResult.count ?? 0,
    viewsLast30Days: viewsResult.count ?? 0,
  }
}

export async function getAdminViewsChart(): Promise<{ date: string; views: number }[]> {
  const supabase = await createAdminClient()
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const { data } = await supabase
    .from('car_views_stats')
    .select('viewed_at')
    .gte('viewed_at', thirtyDaysAgo)
    .order('viewed_at', { ascending: true })

  if (!data || data.length === 0) {
    return generateMockViewsData()
  }

  const byDay: Record<string, number> = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of data as any[]) {
    const day = (row.viewed_at as string).slice(0, 10)
    byDay[day] = (byDay[day] ?? 0) + 1
  }

  const result: { date: string; views: number }[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const key = d.toISOString().slice(0, 10)
    result.push({ date: key, views: byDay[key] ?? 0 })
  }

  return result
}

export async function getAdminInquiries(): Promise<Inquiry[]> {
  const supabase = await createAdminClient()
  const { data } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)
  return (data ?? []) as Inquiry[]
}

function generateMockViewsData(): { date: string; views: number }[] {
  const result = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const key = d.toISOString().slice(0, 10)
    result.push({ date: key, views: Math.floor(Math.random() * 40) + 5 })
  }
  return result
}
