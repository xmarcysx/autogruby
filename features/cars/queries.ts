/**
 * Car feature queries — thin wrappers around services/cars.ts.
 *
 * These are used by Server Components and can be extended later
 * with caching (React cache(), unstable_cache, etc.)
 *
 */

export {
  getAllCarSlugs, getCarBySlug, getCars, getFeaturedCars, getSimilarCars
} from '@/services/cars';

