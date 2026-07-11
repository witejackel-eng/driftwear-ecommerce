import type { Metadata } from 'next';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Privacy Policy',
  description: 'Driftwear Studio privacy policy — how we handle your information in this demo project.',
  path: '/privacy',
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <Container className="py-8 md:py-12">
        <Reveal>
          <SectionHeader
            title="Privacy Policy"
            subtitle="How we handle your information."
            align="left"
          />
        </Reveal>

        <div className="max-w-3xl space-y-8">
          {/* Demo disclaimer */}
          <Reveal>
            <div className="bg-sun-yellow/10 border border-sun-yellow/30 rounded-sm p-4">
              <p className="text-xs text-ink/70 leading-relaxed">
                <strong>Demo project:</strong> Driftwear Studio is a demo website.
                No real data collection, payment processing, or user tracking
                occurs. This privacy policy describes how a production version
                would handle your information.
              </p>
            </div>
          </Reveal>

          {/* Information We Collect */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  In a production version of this website, we would collect the
                  following types of information:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-ink">Account information:</strong> Name,
                    email address, phone number, and shipping address when you create
                    an account or place an order.
                  </li>
                  <li>
                    <strong className="text-ink">Order information:</strong> Products
                    purchased, payment details (processed securely by a payment
                    gateway — we never store full card numbers), and order history.
                  </li>
                  <li>
                    <strong className="text-ink">Browsing data:</strong> Pages visited,
                    products viewed, and anonymised analytics to improve the shopping
                    experience.
                  </li>
                  <li>
                    <strong className="text-ink">Communication data:</strong> Messages
                    sent through the contact form, customer support emails, and
                    newsletter preferences.
                  </li>
                </ul>
                <p>
                  In this demo, the only data stored is in your browser&apos;s
                  localStorage (cart items, wishlist, and recently viewed products).
                  No server-side data collection occurs.
                </p>
              </div>
            </section>
          </Reveal>

          {/* How We Use Your Information */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>If this were a real store, your information would be used to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Process and fulfil your orders</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Provide customer support</li>
                  <li>Send marketing communications (only with your consent)</li>
                  <li>Improve our website and product offerings</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
                <p>
                  We would never sell your personal information to third parties.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Payment Processing */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Payment Processing
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  This demo does not process any real payments. In a production
                  environment, payments would be handled by a PCI-DSS compliant
                  payment gateway (such as Razorpay, Stripe, or similar). We would
                  not store full credit/debit card numbers on our servers.
                </p>
                <p>
                  Payment details are encrypted end-to-end and processed according
                  to the highest industry standards.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Data Storage & Security */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Data Storage & Security
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  In production, your data would be stored on secure, encrypted
                  servers. We would implement appropriate technical and
                  organisational measures to protect your personal information
                  against unauthorised access, alteration, disclosure, or
                  destruction.
                </p>
                <p>
                  Access to personal data would be limited to authorised team
                  members who need it to perform their duties.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Cookies */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Cookies
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  In production, this website would use cookies and similar
                  technologies for:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-ink">Essential cookies:</strong> Required
                    for the website to function (cart, session management).
                  </li>
                  <li>
                    <strong className="text-ink">Analytics cookies:</strong> To
                    understand how visitors use the site (anonymised data only).
                  </li>
                  <li>
                    <strong className="text-ink">Marketing cookies:</strong> To
                    deliver relevant ads (only with your consent).
                  </li>
                </ul>
                <p>
                  In this demo, localStorage is used for cart, wishlist, and
                  recently viewed products — no cookies are set.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Your Rights */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Your Rights
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Under applicable data protection laws, you would have the right
                  to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to or restrict processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p>
                  To exercise any of these rights, you would contact us at{' '}
                  <a
                    href="mailto:hello@driftwear.studio"
                    className="text-navy hover:underline"
                  >
                    hello@driftwear.studio
                  </a>
                  .
                </p>
              </div>
            </section>
          </Reveal>

          {/* Changes */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
                Changes to This Policy
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. Any changes
                would be posted on this page with an updated effective date. Your
                continued use of the website after changes constitutes acceptance of
                the updated policy.
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