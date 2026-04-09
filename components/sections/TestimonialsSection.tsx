import { SectionHeading } from '@/components/common/SectionHeading'
import { MOCK_TESTIMONIALS } from '@/lib/constants'
import { formatDate } from '@/utils/formatters'
import { Star } from 'lucide-react'

// TODO: Replace MOCK_TESTIMONIALS with real reviews (e.g. from Google Reviews API)
export function TestimonialsSection() {
  return (
    <section
      className="py-20 md:py-28 bg-sky-800 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Speed lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-55deg, transparent, transparent 28px, rgba(255,255,255,0.9) 28px, rgba(255,255,255,0.9) 29px)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,_rgba(2,56,95,0.6)_0%,_transparent_70%)]" aria-hidden="true" />

      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Opinie klientów"
          id="testimonials-heading"
          title="Co mówią nasi klienci"
          description="Najlepszą rekomendacją są słowa zadowolonych kupujących. Przeczytaj, co sądzą o nas osoby, które już skorzystały z naszej oferty."
          centered
          light
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-sky-900/60 backdrop-blur-sm rounded-xl border border-sky-700/60 p-5 flex flex-col hover:border-brand-gold/40 hover:bg-sky-900/80 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3" aria-label={`Ocena: ${testimonial.rating} na 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? 'fill-brand-gold text-brand-gold' : 'text-sky-700'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-sky-100 text-sm leading-relaxed flex-1">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-4 pt-4 border-t border-sky-700/60">
                <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                {testimonial.carBought && (
                  <p className="text-xs text-brand-gold mt-0.5">{testimonial.gender === 'male' ? 'Kupił' : 'Kupiła'}: {testimonial.carBought}</p>
                )}
                <time
                  dateTime={testimonial.date}
                  className="text-xs text-sky-500 mt-0.5 block"
                >
                  {formatDate(testimonial.date)}
                </time>
              </div>
            </article>
          ))}
        </div>

        {/* Trust seal */}
        <div className="mt-10 text-center">
          <p className="text-sky-400 text-sm">
            Przeczytaj więcej opinii na{' '}
            <a
              href="https://www.google.com/search?sa=X&sca_esv=1a51245140343e35&sxsrf=ANbL-n72pls6PDXN2jbuw0PvperPeC9n4Q:1775571277747&q=Auto+Gruby+Opinie&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2N7M0MzQ0N7UwMrUwNTe3tDSz2MDI-IpR0LG0JF_Bvag0qVLBvyAzLzN1ESumGAA0nG3HQgAAAA&rldimm=7696117582585779968&tbm=lcl&hl=pl-PL&ved=2ahUKEwj5-aG69tuTAxX4PxAIHcMZO7wQ9fQKegQIRBAG&biw=1232&bih=820&dpr=1#lkt=LocalPoiReviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline"
            >
              Google
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
