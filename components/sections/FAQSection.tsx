import { SectionHeading } from '@/components/common/SectionHeading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FAQ_ITEMS } from '@/lib/constants'

// TODO: Update FAQ_ITEMS in lib/constants.ts with real questions from customers
export function FAQSection() {
  return (
    <section
      className="py-20 md:py-28 bg-slate-100"
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
                  className="bg-white border border-slate-200 rounded-xl px-5 py-1 data-[state=open]:border-sky-400 data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="text-slate-900 text-left text-sm md:text-base hover:no-underline hover:text-sky-700">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-sm leading-relaxed">
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
              className="text-sky-700 hover:underline font-medium"
            >
              Skontaktuj się z nami
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
