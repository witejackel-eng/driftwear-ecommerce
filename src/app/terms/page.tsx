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
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { storeConfig } from '@/lib/store-config';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Terms of Service',
  description:
    'Driftwear Studio terms of service — conditions for using this website.',
  path: '/terms',
  noIndex: true,
});

const contactLine = storeConfig.supportEmail ? (
  <a
    href={`mailto:${storeConfig.supportEmail}`}
    className="text-clay hover:underline underline-offset-2"
  >
    {storeConfig.supportEmail}
  </a>
) : (
  <Link href="/contact" className="text-clay hover:underline underline-offset-2">
    our contact page
  </Link>
);

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-deep-ink mb-4">
      {children}
    </h2>
  );
}

export default function TermsPage() {
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
                <BreadcrumbPage>Terms of Service</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Reveal>

        <Reveal>
          <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
            Legal
          </p>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-deep-ink leading-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-brown max-w-xl mb-12">
            The conditions for using this website.
          </p>
        </Reveal>

        <div className="max-w-3xl space-y-10">
          {/* Legal review notice */}
          <Reveal>
            <div className="bg-warm-paper border border-light-sand p-4">
              <p className="text-xs text-muted-brown leading-relaxed">
                <strong className="text-deep-ink">Important:</strong> These
                terms of service should be reviewed by a legal professional
                before deployment. This document does not constitute legal
                advice.
              </p>
            </div>
          </Reveal>

          {/* Acceptance */}
          <Reveal>
            <section>
              <SectionHeading>Acceptance of Terms</SectionHeading>
              <p className="text-sm text-muted-brown leading-relaxed">
                By accessing or using the Driftwear Studio website (the
                &ldquo;Site&rdquo;), you agree to be bound by these Terms of
                Service (&ldquo;Terms&rdquo;). If you do not agree with any
                part of these Terms, you should not use the Site. These terms
                apply to all visitors, users, and others who access or use
                the Site.
              </p>
            </section>
          </Reveal>

          {/* Products */}
          <Reveal>
            <section>
              <SectionHeading>Products</SectionHeading>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>
                  We make every effort to display our products accurately,
                  including descriptions, images, and pricing. However:
                </p>
                <ul className="list-none space-y-2">
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>
                      Product colours may vary slightly depending on your screen
                      settings and dye lots
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>
                      We reserve the right to discontinue any product at any
                      time
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>
                      Measurements on our size guide are approximate and may
                      vary slightly between production batches
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </Reveal>

          {/* Pricing */}
          <Reveal>
            <section>
              <SectionHeading>Pricing</SectionHeading>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>
                  All prices are listed in Indian Rupees (₹) and include
                  applicable taxes. Prices are subject to change without
                  notice, though we will make reasonable efforts to communicate
                  price changes before they take effect.
                </p>
                <p>
                  Promotional pricing and discounts are available for limited
                  periods and may be changed or withdrawn at any time.
                </p>
                <p>
                  In the event of a pricing error, we reserve the right to
                  cancel any orders placed at the incorrect price and will
                  notify you of the cancellation.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Orders */}
          <Reveal>
            <section>
              <SectionHeading>Orders</SectionHeading>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>
                  Placing an order constitutes an offer to purchase. We
                  reserve the right to accept or decline any order. An order
                  is confirmed only when you receive a confirmation from us.
                </p>
                <p>
                  We reserve the right to limit order quantities and refuse
                  service to anyone for any lawful reason, including suspected
                  fraud or violations of these Terms.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Payment */}
          <Reveal>
            <section>
              <SectionHeading>Payment</SectionHeading>
              <p className="text-sm text-muted-brown leading-relaxed">
                Payment is processed at the time of order placement through
                our payment gateway. All payment transactions are encrypted
                and processed in accordance with PCI-DSS standards. We do not
                store full credit or debit card details on our servers. Cash
                on Delivery (COD) may be available for select locations.
              </p>
            </section>
          </Reveal>

          {/* Shipping */}
          <Reveal>
            <section>
              <SectionHeading>Shipping</SectionHeading>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>
                  We ship across India. Delivery timelines provided are
                  estimates and may vary during sale periods, holidays, or to
                  remote locations. Risk of loss and title for items purchased
                  pass to you upon delivery to the shipping carrier.
                </p>
                <p>
                  Free shipping is available on orders above{' '}
                  <strong className="text-deep-ink">
                    ₹
                    {(storeConfig.freeShippingThreshold / 100).toLocaleString(
                      'en-IN'
                    )}
                  </strong>
                  . For full shipping details, see our{' '}
                  <Link
                    href="/shipping-returns"
                    className="text-clay hover:underline underline-offset-2"
                  >
                    Shipping &amp; Returns page
                  </Link>
                  .
                </p>
              </div>
            </section>
          </Reveal>

          {/* Returns */}
          <Reveal>
            <section>
              <SectionHeading>Returns</SectionHeading>
              <p className="text-sm text-muted-brown leading-relaxed">
                Returns are accepted within{' '}
                <strong className="text-deep-ink">
                  {storeConfig.returnWindow} days
                </strong>{' '}
                of delivery for unworn, unwashed items with original tags
                attached. Items marked as &ldquo;Last Call&rdquo; or on sale
                are eligible for exchange or store credit only. For full
                details, see our{' '}
                <Link
                  href="/shipping-returns"
                  className="text-clay hover:underline underline-offset-2"
                >
                  Shipping &amp; Returns page
                </Link>
                .
              </p>
            </section>
          </Reveal>

          {/* Intellectual Property */}
          <Reveal>
            <section>
              <SectionHeading>Intellectual Property</SectionHeading>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>
                  All content on this Site — including text, graphics, logos,
                  images, and software — is the property of{' '}
                  {storeConfig.businessName} or its content suppliers and is
                  protected by intellectual property laws. You may not
                  reproduce, distribute, or create derivative works from any
                  content without our express written permission.
                </p>
                <p>
                  The {storeConfig.businessName} name, logo, and all related
                  marks are trademark property of their respective owners.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Limitation of Liability */}
          <Reveal>
            <section>
              <SectionHeading>Limitation of Liability</SectionHeading>
              <p className="text-sm text-muted-brown leading-relaxed">
                To the fullest extent permitted by law,{' '}
                {storeConfig.businessName} (including its directors, employees,
                and agents) shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your
                use of the Site. This includes damages for loss of profits,
                data, or other intangible losses, even if we have been advised
                of the possibility of such damages. Our total liability for
                any claim arising from or related to the Site shall not exceed
                the amount you paid to us in the twelve months preceding the
                claim.
              </p>
            </section>
          </Reveal>

          {/* Governing Law */}
          <Reveal>
            <section>
              <SectionHeading>Governing Law</SectionHeading>
              <p className="text-sm text-muted-brown leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of India. Any disputes arising from these Terms
                or your use of the Site shall be subject to the exclusive
                jurisdiction of the courts in India.
              </p>
            </section>
          </Reveal>

          {/* Contact */}
          <Reveal>
            <section>
              <SectionHeading>Contact</SectionHeading>
              <p className="text-sm text-muted-brown leading-relaxed">
                If you have questions about these Terms, reach out through{' '}
                {contactLine}.
              </p>
            </section>
          </Reveal>

          {/* Last updated */}
          <Reveal>
            <p className="text-xs text-muted-brown pt-6 border-t border-light-sand">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </Reveal>
        </div>
      </Container>
    </main>
  );
}