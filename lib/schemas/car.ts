import { z } from 'zod'

export const carsFilterSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  price_min: z.coerce.number().min(0).optional(),
  price_max: z.coerce.number().min(0).optional(),
  year_min: z.coerce.number().min(1990).max(2030).optional(),
  year_max: z.coerce.number().min(1990).max(2030).optional(),
  mileage_max: z.coerce.number().min(0).optional(),
  fuel_type: z
    .enum(['benzyna', 'diesel', 'hybryda', 'elektryczny', 'lpg', 'benzyna+lpg', 'hybryda_plug_in'])
    .optional(),
  transmission: z.enum(['manualna', 'automatyczna', 'półautomatyczna']).optional(),
  body_type: z
    .enum(['sedan', 'kombi', 'hatchback', 'suv', 'crossover', 'coupe', 'kabriolet', 'van', 'pickup'])
    .optional(),
  power_min: z.coerce.number().min(0).optional(),
  power_max: z.coerce.number().min(0).optional(),
  drive_type: z.enum(['FWD', 'RWD', '4WD', 'AWD']).optional(),
  country_origin: z.string().optional(),
  accident_free: z.coerce.boolean().optional(),
  search: z.string().max(100).optional(),
  sort: z
    .enum(['newest', 'oldest', 'price_asc', 'price_desc', 'mileage_asc', 'year_desc'])
    .optional()
    .default('newest'),
  page: z.coerce.number().min(1).optional().default(1),
  per_page: z.coerce.number().min(1).max(50).optional().default(12),
})

export type CarsFilterInput = z.infer<typeof carsFilterSchema>

export const inquirySchema = z.object({
  car_id: z.string().uuid().optional(),
  name: z.string().min(2, 'Imię jest wymagane').max(100),
  phone: z.string().min(9, 'Nieprawidłowy numer telefonu').max(20).optional(),
  email: z.string().email('Nieprawidłowy email').optional(),
  message: z.string().min(10, 'Wiadomość jest za krótka').max(2000),
})

export type InquiryInput = z.infer<typeof inquirySchema>
