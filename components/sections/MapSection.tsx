import { MapPlaceholder } from '@/components/common/MapPlaceholder'
import { SectionHeading } from '@/components/common/SectionHeading'

export function MapSection() {
  return (
    <section
      className="py-20 md:py-28 bg-slate-900"
      aria-labelledby="map-heading"
    >
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Lokalizacja"
            id="map-heading"
            title="Znajdziesz nas w Tychach"
            description="Zapraszamy do odwiedzin. Parkowanie dostępne na miejscu – przyjedź i obejrzyj auto na żywo."
            centered
          />

          <div className="mt-10">
            <MapPlaceholder />
          </div>
        </div>
      </div>
    </section>
  )
}
