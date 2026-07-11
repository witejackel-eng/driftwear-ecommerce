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
  title: 'Privacy Policy',
  description:
    'Driftwear Studio privacy policy — how we collect, use, and protect your information.',
  path: '/privacy',
  noIndex: true,
});

const analyticsConfigured =
  !!storeConfig.analytics.gtmId || !!storeConfig.analytics.metaPixel;

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

export default function PrivacyPage() {
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
                <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Reveal>

        <Reveal>
          <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
            Legal
          </p>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-deep-ink leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-brown max-w-xl mb-12">
            How we collect, use, and protect your information.
          </p>
        </Reveal>

        <div className="max-w-3xl space-y-10">
          {/* Legal review notice */}
          <Reveal>
            <div className="bg-warm-paper border border-light-sand p-4">
              <p className="text-xs text-muted-brown leading-relaxed">
                <strong className="text-deep-ink">Important:</strong> This
                privacy policy should be reviewed by a legal professional
                before deployment. This document does not constitute legal
                advice.
              </p>
            </div>
          </Reveal>

          {/* Information We Collect */}
          <Reveal>
            <section>
              <SectionHeading>Information We Collect</SectionHeading>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>We collect the following types of information:</p>
                <ul className="list-none space-y-3">
                  <li className="flex gap-3">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>
                      <strong className="text-deep-ink">Contact form data:</strong>{' '}
                      When you use our contact form, we collect your name, email
                      address, order number (if provided), reason for contact,
                      and message content.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>
                      <strong className="text-deep-ink">Newsletter data:</strong>{' '}
                      If you subscribe to our newsletter, your email address is
                      stored in your browser&apos;s localStorage. This data
                      does not leave your browser unless an email service is
                      configured.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>
                      <strong className="text-deep-ink">Cart &amp; browsing data:</strong>{' '}
                      Your shopping cart and recently viewed products are stored
                      in your browser&apos;s localStorage for your convenience.
                      This data is not transmitted to our servers.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>
                      <strong className="text-deep-ink">Order information:</strong>{' '}
                      When you place an order, we collect your name, email,
                      phone number, shipping address, and payment information.
                      Payment details are processed by our payment gateway — we
                      do not store full card numbers.
                    </span>
                  </li>
                </ul>
                <p>
                  We do not collect information from children under 13. We do
                  not sell your personal information to third parties.
                </p>
              </div>
            </section>
          </Reveal>

          {/* How We Use It */}
          <Reveal>
            <section>
              <SectionHeading>How We Use Your Information</SectionHeading>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>Your information is used to:</p>
                <ul className="list-none space-y-2">
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>Process and fulfil your orders</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>Send order confirmations and shipping updates</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>Respond to your contact form messages</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>
                      Send marketing communications (only with your consent,
                      and only if an email service is configured)
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>Prevent fraud and ensure site security</span>
                  </li>
                </ul>
              </div>
            </section>
          </Reveal>

          {/* Cookies */}
          <Reveal>
            <section>
              <SectionHeading>Cookies</SectionHeading>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>
                  This website currently uses browser localStorage for cart
                  persistence, recently viewed products, and newsletter
                  subscription state. No third-party cookies are set by default.
                </p>
                {analyticsConfigured && (
                  <p>
                    Analytics services ({storeConfig.analytics.gtmId ? 'Google Tag Manager' : ''}
                    {storeConfig.analytics.gtmId && storeConfig.analytics.metaPixel ? ' and ' : ''}
                    {storeConfig.analytics.metaPixel ? 'Meta Pixel' : ''})
                    may set their own cookies for traffic analysis. These
                    services collect anonymised data about how visitors use the
                    site.
                  </p>
                )}
                <p>
                  Your browser settings allow you to block or delete cookies.
                  Note that blocking essential storage may affect site
                  functionality (e.g., your cart will not persist between
                  visits).
                </p>
              </div>
            </section>
          </Reveal>

          {/* Third-Party Services */}
          <Reveal>
            <section>
              <SectionHeading>Third-Party Services</SectionHeading>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>
                  When you place an order, your payment information is
                  processed by a PCI-DSS compliant payment gateway. We do not
                  store full credit or debit card numbers on our servers.
                </p>
                {analyticsConfigured && (
                  <p>
                    We use analytics services to understand how visitors
                    interact with the site. This data is anonymised and used
                    solely to improve the shopping experience.
                  </p>
                )}
                <p>
                  We do not share your personal information with third parties
                  for their own marketing purposes.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Data Security */}
          <Reveal>
            <section>
              <SectionHeading>Data Security</SectionHeading>
              <p className="text-sm text-muted-brown leading-relaxed">
                We implement appropriate technical measures to protect your
                personal information against unauthorised access, alteration,
                or destruction. This includes HTTPS encryption for all data
                in transit, secure server infrastructure, and limited access
                to personal data. No system is completely secure, and we
                cannot guarantee the absolute security of your information.
              </p>
            </section>
          </Reveal>

          {/* Your Rights */}
          <Reveal>
            <section>
              <SectionHeading>Your Rights</SectionHeading>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-none space-y-2">
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>Access the personal data we hold about you</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>Request correction of inaccurate data</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>Request deletion of your data</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>Object to or restrict processing</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                    <span>
                      Request data portability or withdraw consent at any time
                    </span>
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, contact us at {contactLine}.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Changes to This Policy */}
          <Reveal>
            <section>
              <SectionHeading>Changes to This Policy</SectionHeading>
              <p className="text-sm text-muted-brown leading-relaxed">
                We may update this privacy policy from time to time. Changes
                will be posted on this page with an updated effective date.
                Your continued use of the website after changes are posted
                constitutes acceptance of the updated policy.
              </p>
            </section>
          </Reveal>

          {/* Contact */}
          <Reveal>
            <section>
              <SectionHeading>Contact</SectionHeading>
              <p className="text-sm text-muted-brown leading-relaxed">
                If you have questions about this privacy policy, reach out
                through {contactLine}.
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