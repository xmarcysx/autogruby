import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CarCard } from '@/components/common/CarCard'
import { SectionHeading } from '@/components/common/SectionHeading'
import { getFeaturedCars } from '@/services/cars'

export async function FeaturedCarsSection() {
  const cars = await getFeaturedCars(3)

  if (cars.length === 0) return null

  return (
    <section
      className="py-20 md:py-28 bg-slate-900"
      aria-labelledby="featured-heading"
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <SectionHeading
            eyebrow="Polecane oferty"
            id="featured-heading"
            title="Wyróżnione samochody"
            description="Wybrane propozycje — sprawdzone auta w świetnym stosunku jakości do ceny."
          />
          <Button variant="outline-gold" size="default" asChild className="self-start md:self-auto shrink-0">
            <Link href="/oferty" aria-label="Zobacz wszystkie oferty samochodów">
              Wszystkie oferty
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car} priority={index === 0} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
          <Button variant="gold" size="lg" asChild>
            <Link href="/oferty">
              Zobacz wszystkie oferty
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
