export type FuelType = 'benzyna' | 'diesel' | 'hybryda' | 'elektryczny' | 'lpg' | 'benzyna+lpg' | 'hybryda_plug_in'
export type TransmissionType = 'manualna' | 'automatyczna' | 'półautomatyczna'
export type BodyType = 'sedan' | 'kombi' | 'hatchback' | 'suv' | 'crossover' | 'coupe' | 'kabriolet' | 'van' | 'pickup'
export type DriveType = 'FWD' | 'RWD' | '4WD' | 'AWD'
export type Currency = 'PLN' | 'EUR'

export interface Car {
  id: string
  slug: string
  title: string
  brand: string
  model: string
  generation: string | null
  year: number
  mileage: number
  fuel_type: FuelType
  transmission: TransmissionType
  body_type: BodyType
  engine_capacity: number | null // in cc
  engine_power_hp: number | null
  drive_type: DriveType | null
  color: string | null
  doors: number | null
  seats: number | null
  country_origin: string | null
  first_registration_date: string | null
  accident_free: boolean
  service_history: boolean
  description: string | null
  price: number
  currency: Currency
  featured: boolean
  published: boolean
  location_city: string
  created_at: string
  updated_at: string
  // Joined
  car_images?: CarImage[]
  cover_image?: CarImage | null
}

export interface CarImage {
  id: string
  car_id: string
  storage_path: string
  url?: string // derived
  alt: string
  sort_order: number
  is_cover: boolean
  created_at: string
}

export interface CarFeature {
  id: string
  car_id: string
  category: string
  name: string
}

export interface CarViewStat {
  id: string
  car_id: string
  viewed_at: string
  ip_hash: string | null
}

export interface Inquiry {
  id: string
  car_id: string | null
  name: string
  phone: string | null
  email: string | null
  message: string
  status: 'new' | 'read' | 'replied' | 'closed'
  created_at: string
}

// DTO for car card (lighter, no full description)
export interface CarCardData
  extends Pick<
    Car,
    | 'id'
    | 'slug'
    | 'title'
    | 'brand'
    | 'model'
    | 'year'
    | 'mileage'
    | 'fuel_type'
    | 'transmission'
    | 'body_type'
    | 'engine_power_hp'
    | 'engine_capacity'
    | 'price'
    | 'currency'
    | 'featured'
    | 'location_city'
    | 'accident_free'
  > {
  cover_image: CarImage | null
}

export interface CarsFilter {
  brand?: string
  model?: string
  price_min?: number
  price_max?: number
  year_min?: number
  year_max?: number
  mileage_max?: number
  fuel_type?: FuelType
  transmission?: TransmissionType
  body_type?: BodyType
  power_min?: number
  power_max?: number
  drive_type?: DriveType
  country_origin?: string
  accident_free?: boolean
  search?: string
  sort?: CarsSortOption
  page?: number
  per_page?: number
}

export type CarsSortOption =
  | 'newest'
  | 'oldest'
  | 'price_asc'
  | 'price_desc'
  | 'mileage_asc'
  | 'year_desc'

export interface CarsListResult {
  cars: CarCardData[]
  total: number
  page: number
  per_page: number
  total_pages: number
}
