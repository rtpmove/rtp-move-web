import { Container } from '@/components/shared/container';
import { SectionHeading } from '@/components/shared/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { JsonLd } from '@/components/seo/json-ld';
import { faqSchema } from '@/lib/seo/schema';
import { faqs } from '@/lib/data/faqs';

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
      <JsonLd data={faqSchema(faqs)} />
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos tus dudas"
          description="Si tienes alguna otra pregunta, escríbenos y te responderemos lo antes posible."
        />

        <Accordion className="mt-12 w-full">
          {faqs.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium text-neutral-900">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
