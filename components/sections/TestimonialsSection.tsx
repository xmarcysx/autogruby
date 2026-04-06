import { Star } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { MOCK_TESTIMONIALS } from '@/lib/constants'
import { formatDate } from '@/utils/formatters'

// TODO: Replace MOCK_TESTIMONIALS with real reviews (e.g. from Google Reviews API)
export function TestimonialsSection() {
  return (
    <section
      className="py-20 md:py-28 bg-slate-900"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Opinie klientów"
          id="testimonials-heading"
          title="Co mówią nasi klienci"
          description="Najlepszą rekomendacją są słowa zadowolonych kupujących. Przeczytaj, co sądzą o nas osoby, które już skorzystały z naszej oferty."
          centered
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-slate-950 rounded-xl border border-slate-800 p-5 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3" aria-label={`Ocena: ${testimonial.rating} na 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? 'fill-brand-gold text-brand-gold' : 'text-slate-700'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-slate-300 text-sm leading-relaxed flex-1">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                {testimonial.carBought && (
                  <p className="text-xs text-brand-gold mt-0.5">Kupił: {testimonial.carBought}</p>
                )}
                <time
                  dateTime={testimonial.date}
                  className="text-xs text-slate-500 mt-0.5 block"
                >
                  {formatDate(testimonial.date)}
                </time>
              </div>
            </article>
          ))}
        </div>

        {/* Trust seal */}
        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            {/* TODO: Link to real Google Reviews */}
            Przeczytaj więcej opinii na{' '}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline"
            >
              Google Maps
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
