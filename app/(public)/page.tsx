import { AboutSection } from '@/components/sections/AboutSection'
import { BrandsSection } from '@/components/sections/BrandsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { CTASection } from '@/components/sections/CTASection'
import { FAQSection } from '@/components/sections/FAQSection'
import { FeaturedCarsSection } from '@/components/sections/FeaturedCarsSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { MapSection } from '@/components/sections/MapSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { FAQ_ITEMS, SITE_CONFIG } from '@/lib/constants'
import { buildFaqJsonLd } from '@/utils/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} – Komis Samochodowy Tychy | Samochody Używane`,
  description:
    'Auto Gruby – komis samochodowy w Tychach na Śląsku. Sprawdzone samochody używane, uczciwa sprzedaż bez haczyków. Zadzwoń i umów się na jazdę próbną!',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  const faqJsonLd = buildFaqJsonLd(FAQ_ITEMS)

  return (
    <>
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <HeroSection />
      <AboutSection />
      <WhyUsSection />
      <FeaturedCarsSection />
      {/* SEKCJA PRÓBNA — ocenić czy pasuje przed finalnym wdrożeniem */}
      <BrandsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <MapSection />
      <CTASection />
    </>
  )
}
