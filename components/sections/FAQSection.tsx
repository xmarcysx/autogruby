import { SectionHeading } from '@/components/common/SectionHeading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FAQ_ITEMS } from '@/lib/constants'

// TODO: Update FAQ_ITEMS in lib/constants.ts with real questions from customers
export function FAQSection() {
  return (
    <section
      className="py-20 md:py-28 bg-slate-900"
      aria-labelledby="faq-heading"
    >
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            id="faq-heading"
            title="Najczęściej zadawane pytania"
            description="Masz pytanie? Sprawdź, czy nie mamy już na nie odpowiedzi. Jeśli nie – dzwoń!"
            centered
          />

          <div className="mt-12">
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-1 data-[state=open]:border-brand-blue/30"
                >
                  <AccordionTrigger className="text-white text-left text-sm md:text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 text-sm leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="text-center mt-8 text-slate-500 text-sm">
            Nie znalazłeś odpowiedzi?{' '}
            <a
              href="/kontakt"
              className="text-brand-gold hover:underline font-medium"
            >
              Skontaktuj się z nami
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
