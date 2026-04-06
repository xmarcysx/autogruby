/**
 * Car feature queries — thin wrappers around services/cars.ts.
 *
 * These are used by Server Components and can be extended later
 * with caching (React cache(), unstable_cache, etc.)
 *
 * TODO: Add caching layer here when traffic warrants it.
 */

export {
  getCars,
  getCarBySlug,
  getFeaturedCars,
  getAllCarSlugs,
  getSimilarCars,
} from '@/services/cars'
