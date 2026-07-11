import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Terms of Service',
  description: 'Driftwear Studio terms of service — conditions for using this demo website.',
  path: '/terms',
  noIndex: true,
});

export default function TermsPage() {
  return (
    <main className="flex-1">
      <Container className="py-8 md:py-12">
        <Reveal>
          <SectionHeader
            title="Terms of Service"
            subtitle="The conditions for using this website."
            align="left"
          />
        </Reveal>

        <div className="max-w-3xl space-y-8">
          {/* Demo disclaimer */}
          <Reveal>
            <div className="bg-sun-yellow/10 border border-sun-yellow/30 rounded-sm p-4">
              <p className="text-xs text-ink/70 leading-relaxed">
                <strong>Demo project:</strong> Driftwear Studio is a demo website
                and not a real business. These terms describe what production terms
                would look like. No real transactions, services, or legal
                obligations are created by using this website. Please replace this
                entire document with proper legal terms before using in production.
              </p>
            </div>
          </Reveal>

          {/* Acceptance of Terms */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By accessing or using the Driftwear Studio website (the &ldquo;Site&rdquo;),
                you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;).
                If you do not agree with any part of these Terms, you should not use
                the Site. These terms apply to all visitors, users, and others who
                access or use the Site.
              </p>
            </section>
          </Reveal>

          {/* Use of the Site */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Use of the Site
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  You may use the Site for lawful personal, non-commercial purposes
                  only. You agree not to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use the Site in any way that violates applicable laws</li>
                  <li>Attempt to gain unauthorised access to any part of the Site</li>
                  <li>
                    Use automated systems (bots, scrapers) to access the Site
                  </li>
                  <li>
                    Reproduce, distribute, or modify any content without written
                    permission
                  </li>
                  <li>Interfere with the proper functioning of the Site</li>
                </ul>
              </div>
            </section>
          </Reveal>

          {/* Products and Pricing */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Products and Pricing
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  All product descriptions, images, and prices on this Site are for
                  demonstration purposes only. In a production environment:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Prices are subject to change without notice (though we&apos;d
                    try to notify you)
                  </li>
                  <li>
                    We reserve the right to limit quantities and refuse service to
                    anyone
                  </li>
                  <li>
                    Product colours may vary slightly due to screen settings and
                    dye lots
                  </li>
                  <li>
                    We make every effort to display products accurately, but we
                    cannot guarantee that your display will accurately reflect the
                    actual colour
                  </li>
                </ul>
              </div>
            </section>
          </Reveal>

          {/* Orders and Payment */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Orders and Payment
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-ink">Demo notice:</strong> This website
                  does not process real payments. No real orders are placed, and no
                  payment information is collected or stored.
                </p>
                <p>
                  In a production environment, placing an order would constitute an
                  offer to purchase. We would reserve the right to accept or decline
                  any order. Payment would be processed at the time of order
                  placement through a secure, PCI-DSS compliant payment gateway.
                </p>
                <p>
                  We would not be responsible for pricing errors. If a product is
                  listed at an incorrect price, we would notify you and either
                  cancel the order or offer the correct price.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Intellectual Property */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Intellectual Property
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  All content on this Site — including text, graphics, logos, images,
                  and software — is the property of Driftwear Studio or its content
                  suppliers and is protected by intellectual property laws. You may
                  not reproduce, distribute, or create derivative works from any
                  content without our express written permission.
                </p>
                <p>
                  The Driftwear Studio name, logo, and all related marks are
                  trademark property of their respective owners.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Forms and Submissions */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Forms and Submissions
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-ink">Demo notice:</strong> All forms on
                  this website (contact form, checkout form, newsletter signup) are
                  placeholders. Data entered into forms is saved to your
                  browser&apos;s localStorage and is not sent to any server.
                </p>
                <p>
                  In a production environment, form submissions would be handled by
                  appropriate backend services. Newsletter signups would be managed
                  by an email service provider. Contact form submissions would be
                  routed to our customer support team.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Limitation of Liability */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Limitation of Liability
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, Driftwear Studio (including
                its directors, employees, and agents) shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages
                arising from your use of the Site. This includes damages for loss of
                profits, data, or other intangible losses, even if we have been
                advised of the possibility of such damages.
              </p>
            </section>
          </Reveal>

          {/* Changes to Terms */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Changes to These Terms
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We reserve the right to modify or replace these Terms at any time.
                Material changes will be posted on this page with an updated
                effective date. Your continued use of the Site after any changes
                constitutes acceptance of the new Terms.
              </p>
            </section>
          </Reveal>

          {/* Contact */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Contact
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you have questions about these Terms, please contact us at{' '}
                <a
                  href="mailto:hello@driftwear.studio"
                  className="text-navy hover:underline"
                >
                  hello@driftwear.studio
                </a>
                . For a real production site, replace this email with an actual
                contact method and consider adding a physical address as required
                by applicable law.
              </p>
            </section>
          </Reveal>

          {/* Last updated */}
          <Reveal>
            <p className="text-xs text-muted-foreground pt-4 border-t border-border">
              Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} (demo)
            </p>
          </Reveal>
        </div>
      </Container>
    </main>
  );
}