/**
 * Generates a URL-friendly slug for a car listing.
 * Format: brand-model-generation-year[-uid-suffix]
 * Example: bmw-seria-3-f30-2017-ab1234
 */
export function generateCarSlug(
  brand: string,
  model: string,
  year: number,
  generation?: string | null,
  uid?: string,
): string {
  const parts = [brand, model, generation, String(year)]
    .filter(Boolean)
    .map((p) => slugify(p as string))

  if (uid) {
    // Append short unique suffix to prevent collisions
    parts.push(uid.slice(0, 6))
  }

  return parts.join('-')
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // decompose accented chars
    .replace(/[\u0300-\u036f]/g, '') // remove accent marks
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź|ż/g, 'z')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '')
}
