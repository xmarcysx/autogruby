import type { Car } from '@/types/car'
import { SITE_CONFIG } from '@/lib/constants'
import { formatPrice, formatMileage } from './formatters'

export function buildCarTitle(car: Pick<Car, 'brand' | 'model' | 'year' | 'engine_power_hp' | 'fuel_type'>): string {
  const power = car.engine_power_hp ? ` ${car.engine_power_hp} KM` : ''
  return `${car.brand} ${car.model} ${car.year}${power} – komis Tychy | Auto Gruby`
}

export function buildCarDescription(car: Car): string {
  const mileage = formatMileage(car.mileage)
  const price = formatPrice(car.price, car.currency)
  return `${car.brand} ${car.model} ${car.year} r., przebieg ${mileage}, cena ${price}. ${car.accident_free ? 'Bezwypadkowy. ' : ''}Sprawdzone auto z komisu samochodowego Auto Gruby w Tychach.`
}

export function buildCarKeywords(car: Car): string {
  return [
    `${car.brand} ${car.model}`,
    `${car.brand} ${car.model} ${car.year}`,
    `${car.brand} ${car.model} używany`,
    `${car.brand} użytkowany Tychy`,
    'komis samochodowy Tychy',
    'samochody używane Tychy',
    'Auto Gruby',
    car.fuel_type,
  ].join(', ')
}

export function buildCarJsonLd(car: Car, imageUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${car.brand} ${car.model} ${car.year}`,
    description: car.description ?? '',
    brand: { '@type': 'Brand', name: car.brand },
    model: car.model,
    modelDate: String(car.year),
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.mileage,
      unitCode: 'KMT',
    },
    vehicleTransmission: car.transmission,
    fuelType: car.fuel_type,
    bodyType: car.body_type,
    color: car.color ?? undefined,
    numberOfDoors: car.doors ?? undefined,
    vehicleSeatingCapacity: car.seats ?? undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: car.currency,
      price: car.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
    },
    ...(imageUrl ? { image: imageUrl } : {}),
    url: `${SITE_CONFIG.url}/oferty/${car.slug}`,
  }
}

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Przykładowa 1', // TODO: real address
      addressLocality: 'Tychy',
      postalCode: '43-100',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // TODO: replace with real coordinates
      latitude: 50.1373,
      longitude: 18.9959,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'PLN',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    sameAs: [
      SITE_CONFIG.socialLinks.facebook,
      SITE_CONFIG.socialLinks.instagram,
    ].filter(Boolean),
  }
}

export function buildFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
