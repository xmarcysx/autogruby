export * from './car'
export * from './database'

export interface SiteConfig {
  name: string
  description: string
  url: string
  phone: string
  email: string
  address: string
  city: string
  postalCode: string
  nip?: string
  openingHours: string
  socialLinks: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
}

export interface Testimonial {
  id: string
  name: string
  rating: number
  content: string
  date: string
  carBought?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface NavItem {
  label: string
  href: string
  description?: string
}
