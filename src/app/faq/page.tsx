import type { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { faqs } from '@/data/faqs';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about Driftwear Studio — shipping, returns, sizing, fabrics, and more.',
  path: '/faq',
});

// Add the honest demo question
const allFaqs = [
  ...faqs,
  {
    question: 'Is this a real store?',
    answer:
      "This is a demo project built to showcase what a modern ecommerce experience could look like. No real products are sold, no payments are processed, and no orders are shipped. If you're a developer exploring the code, everything is open and well-structured — enjoy!",
  },
];

export default function FAQPage() {
  return (
    <main className="flex-1">
      <Container className="py-8 md:py-12">
        {/* Breadcrumb */}
        <Reveal>
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>FAQ</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Reveal>

        <Reveal>
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about Driftwear Studio."
            align="left"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {allFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-sm md:text-base text-ink hover:text-navy hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div className="max-w-3xl mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Still have questions? We&apos;d love to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm text-navy font-medium hover:underline"
            >
              Contact our support team →
            </a>
          </div>
        </Reveal>
      </Container>
    </main>
  );
}