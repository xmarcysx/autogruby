import { createAdminClient as _createAdminClient } from '@/lib/supabase/server'
import type { Car, CarImage, Inquiry } from '@/types/car'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''

// Admin client cast to any to bypass Supabase PostgrestVersion typing strictness
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createAdminClient(): Promise<any> {
  return _createAdminClient()
}

function withPublicUrl(image: CarImage): CarImage {
  const url = image.storage_path.startsWith('http')
    ? image.storage_path
    : `${SUPABASE_URL}/storage/v1/object/public/car-images/${image.storage_path}`
  return { ...image, url }
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
  const now = Date.now()
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString()
  const sixtyDaysAgo = new Date(now - 60 * 24 * 60 * 60 * 1000).toISOString()

  const [carsResult, soldResult, inquiriesResult, viewsResult, prevViewsResult] = await Promise.all([
    supabase.from('cars').select('id', { count: 'exact', head: true }).eq('published', true).eq('sold', false),
    supabase.from('cars').select('id', { count: 'exact', head: true }).eq('sold', true),
    supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase
      .from('car_views_stats')
      .select('id', { count: 'exact', head: true })
      .gte('viewed_at', thirtyDaysAgo),
    supabase
      .from('car_views_stats')
      .select('id', { count: 'exact', head: true })
      .gte('viewed_at', sixtyDaysAgo)
      .lt('viewed_at', thirtyDaysAgo),
  ])

  const viewsCurrent = viewsResult.count ?? 0
  const viewsPrev = prevViewsResult.count ?? 0
  const viewsGrowthPct =
    viewsPrev === 0 ? null : Math.round(((viewsCurrent - viewsPrev) / viewsPrev) * 100)

  return {
    activeCars: carsResult.count ?? 0,
    soldCars: soldResult.count ?? 0,
    newInquiries: inquiriesResult.count ?? 0,
    viewsLast30Days: viewsCurrent,
    viewsGrowthPct,
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

  const byDay: Record<string, number> = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of (data ?? []) as any[]) {
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

export async function getAdminWeeklyActivity(): Promise<
  { day: string; wyswietlenia: number; zapytania: number }[]
> {
  const supabase = await createAdminClient()

  const now = new Date()
  const daysFromMonday = now.getDay() === 0 ? 6 : now.getDay() - 1
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - daysFromMonday)
  weekStart.setHours(0, 0, 0, 0)

  const [viewsResult, inquiriesResult] = await Promise.all([
    supabase.from('car_views_stats').select('viewed_at').gte('viewed_at', weekStart.toISOString()),
    supabase.from('inquiries').select('created_at').gte('created_at', weekStart.toISOString()),
  ])

  const viewsByDay: Record<number, number> = {}
  const inquiriesByDay: Record<number, number> = {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of (viewsResult.data ?? []) as any[]) {
    const d = new Date(row.viewed_at)
    const idx = d.getDay() === 0 ? 6 : d.getDay() - 1
    viewsByDay[idx] = (viewsByDay[idx] ?? 0) + 1
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of (inquiriesResult.data ?? []) as any[]) {
    const d = new Date(row.created_at)
    const idx = d.getDay() === 0 ? 6 : d.getDay() - 1
    inquiriesByDay[idx] = (inquiriesByDay[idx] ?? 0) + 1
  }

  const DAY_LABELS = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd']
  return DAY_LABELS.map((day, idx) => ({
    day,
    wyswietlenia: viewsByDay[idx] ?? 0,
    zapytania: inquiriesByDay[idx] ?? 0,
  }))
}

export async function getAdminTopCars(
  limit = 5,
): Promise<{ id: string; title: string; views: number }[]> {
  const supabase = await createAdminClient()
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const { data } = await supabase
    .from('car_views_stats')
    .select('car_id')
    .gte('viewed_at', thirtyDaysAgo)

  if (!data || data.length === 0) return []

  const countMap: Record<string, number> = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const row of data as any[]) {
    countMap[row.car_id] = (countMap[row.car_id] ?? 0) + 1
  }

  const topEntries = Object.entries(countMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)

  if (topEntries.length === 0) return []

  const { data: cars } = await supabase
    .from('cars')
    .select('id, title')
    .in('id', topEntries.map(([id]) => id))

  const carMap: Record<string, string> = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const car of (cars ?? []) as any[]) {
    carMap[car.id] = car.title
  }

  return topEntries.map(([id, views]) => ({
    id,
    title: carMap[id] ?? 'Nieznana oferta',
    views,
  }))
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

