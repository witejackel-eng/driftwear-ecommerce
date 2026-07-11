import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Shipping & Returns',
  description:
    'Free shipping on orders over ₹2,999. 30-day returns on unworn items with tags attached. Read our full shipping and returns policy.',
  path: '/shipping-returns',
});

export default function ShippingReturnsPage() {
  return (
    <main className="flex-1">
      <Container className="py-8 md:py-12">
        <Reveal>
          <SectionHeader
            title="Shipping & Returns"
            subtitle="Everything you need to know about getting your order and sending it back if needed."
            align="left"
          />
        </Reveal>

        <div className="max-w-3xl space-y-12">
          {/* Shipping Policy */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl md:text-2xl text-ink mb-4">
                Shipping Policy
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  We ship across India via trusted courier partners. All orders are
                  carefully packed in our eco-friendly packaging and dispatched within
                  1–2 business days of placing the order.
                </p>

                <div className="bg-cream/50 rounded-sm p-4">
                  <h3 className="font-medium text-ink text-sm mb-2">
                    Free Shipping
                  </h3>
                  <p className="text-sm">
                    All orders above <strong className="text-ink">₹2,999</strong> qualify
                    for free standard shipping. Orders below this threshold incur a
                    flat shipping fee of <strong className="text-ink">₹99</strong>.
                  </p>
                </div>

                <h3 className="font-medium text-ink text-sm mt-6">Delivery Timelines</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 pr-4 text-ink font-medium">
                          Shipping Method
                        </th>
                        <th className="text-left py-2 pr-4 text-ink font-medium">
                          Timeline
                        </th>
                        <th className="text-left py-2 text-ink font-medium">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-2.5 pr-4">Standard Delivery</td>
                        <td className="py-2.5 pr-4">3–5 business days</td>
                        <td className="py-2.5">
                          Free above ₹2,999 / ₹99
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2.5 pr-4">Express Delivery</td>
                        <td className="py-2.5 pr-4">2 business days (metro cities)</td>
                        <td className="py-2.5">₹149</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4">Same Day</td>
                        <td className="py-2.5 pr-4">Same day (select pincodes)</td>
                        <td className="py-2.5">₹249</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  * Delivery timelines are estimates and may vary during sale periods,
                  holidays, or in remote locations.
                </p>

                <p>
                  Once your order is dispatched, you&apos;ll receive a tracking number
                  via email and SMS. You can track your package directly from the
                  courier&apos;s website.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Returns Policy */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl md:text-2xl text-ink mb-4">
                Returns Policy
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  We want you to love your Driftwear pieces. If something isn&apos;t
                  quite right, we offer hassle-free returns within{' '}
                  <strong className="text-ink">30 days</strong> of delivery.
                </p>

                <h3 className="font-medium text-ink text-sm">Return Eligibility</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    Items must be unworn, unwashed, and in their original condition
                  </li>
                  <li>All original tags must be attached</li>
                  <li>
                    Items must be returned in their original packaging (or equivalent
                    protective packaging)
                  </li>
                  <li>
                    Items marked as &ldquo;Last Call&rdquo; or final sale are eligible
                    for exchange or store credit only
                  </li>
                </ul>

                <h3 className="font-medium text-ink text-sm mt-6">Exchange Process</h3>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>
                    Initiate an exchange from your order confirmation email or contact
                    us at{' '}
                    <a
                      href="mailto:hello@driftwear.studio"
                      className="text-navy hover:underline"
                    >
                      hello@driftwear.studio
                    </a>
                  </li>
                  <li>Specify the item(s) and the new size/colour you&apos;d prefer</li>
                  <li>
                    We&apos;ll arrange a pickup from your address (free for standard
                    exchanges)
                  </li>
                  <li>
                    The replacement will be shipped once we receive and inspect the
                    original item
                  </li>
                </ol>

                <h3 className="font-medium text-ink text-sm mt-6">Refund Process</h3>
                <p>
                  Refunds are processed within 5–7 business days after we receive and
                  inspect the returned item. The refund will be credited to your
                  original payment method. For COD orders, refunds are processed via
                  bank transfer — please share your bank details when initiating the
                  return.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Damaged Items */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl md:text-2xl text-ink mb-4">
                Damaged or Defective Items
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  If you receive a damaged, defective, or incorrect item, please
                  contact us within <strong className="text-ink">48 hours</strong> of
                  delivery. Share photos of the issue and we&apos;ll arrange a free
                  return and replacement — or a full refund if you prefer.
                </p>
                <p>
                  We take quality seriously and will work with you to make it right.
                  No one should receive a less-than-perfect Driftwear piece.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Demo disclaimer */}
          <Reveal>
            <div className="bg-sun-yellow/10 border border-sun-yellow/30 rounded-sm p-4">
              <p className="text-xs text-ink/70 leading-relaxed">
                <strong>Demo notice:</strong> This is a demo shipping & returns
                policy. No real orders are processed, shipped, or returned. The
                policies described above represent what a real store might offer.
              </p>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">
                Need help with a return or exchange?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-navy font-medium hover:underline"
              >
                Contact support →
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </main>
  );
}