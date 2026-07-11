import type { Metadata } from 'next';
import Link from 'next/link';
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
import { faqs } from '@/data/faqs';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about Driftwear Studio — shipping, returns, sizing, fabrics, and more.',
  path: '/faq',
});

const faqCategories = [
  {
    title: 'Products & Sizing',
    items: faqs.filter(
      (f) =>
        f.question.includes('fabric') ||
        f.question.includes('size') ||
        f.question.includes('care')
    ),
  },
  {
    title: 'Shipping & Orders',
    items: faqs.filter(
      (f) =>
        f.question.includes('shipping') ||
        f.question.includes('modify') ||
        f.question.includes('cancel')
    ),
  },
  {
    title: 'Returns',
    items: faqs.filter((f) => f.question.includes('return')),
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
          <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
            Help
          </p>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-deep-ink leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-muted-brown max-w-xl mb-10">
            Everything you need to know about Driftwear Studio. Can&apos;t find
            what you&apos;re looking for?{' '}
            <Link href="/contact" className="text-clay hover:underline underline-offset-2">
              Get in touch
            </Link>
            .
          </p>
        </Reveal>

        <div className="max-w-3xl space-y-10">
          {faqCategories.map((category, catIdx) => (
            <Reveal key={category.title} delay={catIdx * 0.05}>
              <section>
                <h2 className="font-[family-name:var(--font-instrument-serif)] text-lg text-deep-ink mb-4">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((faq, index) => {
                    const value = `${catIdx}-${index}`;
                    return (
                      <AccordionItem key={value} value={value}>
                        <AccordionTrigger className="text-left text-sm md:text-base text-deep-ink hover:text-clay hover:no-underline py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-brown leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </section>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div className="max-w-3xl mt-12 pt-8 border-t border-light-sand">
            <p className="text-sm text-muted-brown mb-4">
              Still have questions? We&apos;d love to help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm text-clay font-medium hover:underline underline-offset-2"
            >
              Contact our support team →
            </Link>
          </div>
        </Reveal>
      </Container>
    </main>
  );
}