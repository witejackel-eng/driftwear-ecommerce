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
  title: 'Shipping & Returns',
  description:
    `Free shipping on orders over ₹${(storeConfig.freeShippingThreshold / 100).toLocaleString('en-IN')}. ${storeConfig.returnWindow}-day returns on unworn items with tags attached.`,
  path: '/shipping-returns',
});

const formatRupees = (amount: number) =>
  `₹${amount.toLocaleString('en-IN')}`;

export default function ShippingReturnsPage() {
  const {
    freeShippingThreshold,
    shippingCost,
    returnWindow,
    estimatedDeliveryDays,
  } = storeConfig;

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
                <BreadcrumbPage>Shipping &amp; Returns</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Reveal>

        <Reveal>
          <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
            Help
          </p>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-deep-ink leading-tight mb-4">
            Shipping &amp; Returns
          </h1>
          <p className="text-sm text-muted-brown max-w-xl mb-12">
            Everything you need to know about getting your order and, if
            needed, sending it back.
          </p>
        </Reveal>

        <div className="max-w-3xl space-y-12">
          {/* Shipping */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl md:text-2xl text-deep-ink mb-6">
                Shipping
              </h2>

              <div className="bg-warm-paper p-4 md:p-6 mb-6">
                <p className="text-sm text-deep-ink font-medium mb-1">
                  Free shipping
                </p>
                <p className="text-sm text-muted-brown">
                  All orders above{' '}
                  <strong className="text-deep-ink">
                    {formatRupees(freeShippingThreshold)}
                  </strong>{' '}
                  qualify for free standard shipping. Orders below this
                  threshold incur a flat fee of{' '}
                  <strong className="text-deep-ink">
                    {formatRupees(shippingCost)}
                  </strong>
                  .
                </p>
              </div>

              <h3 className="font-medium text-deep-ink text-sm mb-3">
                Delivery options
              </h3>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-light-sand">
                      <th className="text-left py-2.5 pr-4 text-deep-ink font-medium">
                        Method
                      </th>
                      <th className="text-left py-2.5 pr-4 text-deep-ink font-medium">
                        Timeline
                      </th>
                      <th className="text-left py-2.5 text-deep-ink font-medium">
                        Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-brown">
                    <tr className="border-b border-light-sand/60">
                      <td className="py-3 pr-4">Standard Delivery</td>
                      <td className="py-3 pr-4">
                        {estimatedDeliveryDays} business days (Pan-India)
                      </td>
                      <td className="py-3">
                        Free above {formatRupees(freeShippingThreshold)} /{' '}
                        {formatRupees(shippingCost)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Express Delivery</td>
                      <td className="py-3 pr-4">
                        2 business days (metro cities only)
                      </td>
                      <td className="py-3">₹149</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile stacked cards */}
              <div className="md:hidden space-y-3">
                <div className="bg-warm-paper p-4">
                  <p className="text-sm text-deep-ink font-medium mb-1">
                    Standard Delivery
                  </p>
                  <p className="text-xs text-muted-brown">
                    {estimatedDeliveryDays} business days across India
                  </p>
                  <p className="text-sm text-deep-ink mt-2">
                    Free above {formatRupees(freeShippingThreshold)} /{' '}
                    {formatRupees(shippingCost)}
                  </p>
                </div>
                <div className="bg-warm-paper p-4">
                  <p className="text-sm text-deep-ink font-medium mb-1">
                    Express Delivery
                  </p>
                  <p className="text-xs text-muted-brown">
                    2 business days (metro cities only)
                  </p>
                  <p className="text-sm text-deep-ink mt-2">₹149</p>
                </div>
              </div>

              <p className="text-xs text-muted-brown mt-4">
                * Delivery timelines are estimates and may vary during sale
                periods, holidays, or in remote locations. Express delivery
                availability depends on your pincode.
              </p>

              <div className="mt-4 text-sm text-muted-brown leading-relaxed space-y-3">
                <p>
                  We ship across India. Once your order is dispatched,
                  you&apos;ll receive a tracking number via email. Orders are
                  typically processed within 1–2 business days.
                </p>
              </div>
            </section>
          </Reveal>

          {/* Returns */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl md:text-2xl text-deep-ink mb-6">
                Returns
              </h2>

              <div className="bg-warm-paper p-4 md:p-6 mb-6">
                <p className="text-sm text-deep-ink font-medium mb-1">
                  {returnWindow}-day return window
                </p>
                <p className="text-sm text-muted-brown">
                  If something isn&apos;t quite right, you can return it within{' '}
                  <strong className="text-deep-ink">{returnWindow} days</strong>{' '}
                  of delivery. Items must be unworn, unwashed, and in their
                  original condition with all tags attached.
                </p>
              </div>

              <h3 className="font-medium text-deep-ink text-sm mb-3">
                Return eligibility
              </h3>
              <ul className="list-none space-y-2 text-sm text-muted-brown mb-6">
                <li className="flex gap-2.5">
                  <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                  <span>
                    Items must be unworn, unwashed, and in original condition
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                  <span>All original tags must still be attached</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-faded-olive shrink-0 mt-0.5">●</span>
                  <span>
                    Items marked &ldquo;Last Call&rdquo; or on sale are
                    eligible for exchange or store credit only
                  </span>
                </li>
              </ul>

              <h3 className="font-medium text-deep-ink text-sm mb-3">
                How to initiate a return
              </h3>
              <ol className="list-none space-y-2 text-sm text-muted-brown mb-6">
                <li className="flex gap-3">
                  <span className="font-[family-name:var(--font-instrument-serif)] text-clay shrink-0 text-sm w-5">
                    1
                  </span>
                  <span>
                    Contact our support team with your order details
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-[family-name:var(--font-instrument-serif)] text-clay shrink-0 text-sm w-5">
                    2
                  </span>
                  <span>
                    We&apos;ll confirm eligibility and arrange a pickup
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-[family-name:var(--font-instrument-serif)] text-clay shrink-0 text-sm w-5">
                    3
                  </span>
                  <span>
                    Once we receive and inspect the item, your refund or
                    exchange will be processed
                  </span>
                </li>
              </ol>

              <h3 className="font-medium text-deep-ink text-sm mb-3">
                Refunds
              </h3>
              <p className="text-sm text-muted-brown leading-relaxed">
                Refunds are processed within 5–7 business days after we
                receive and inspect the returned item. The refund will be
                credited to your original payment method. For COD orders,
                refunds are processed via bank transfer.
              </p>
            </section>
          </Reveal>

          {/* Damaged Items */}
          <Reveal>
            <section>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl md:text-2xl text-deep-ink mb-4">
                Damaged or Defective Items
              </h2>
              <p className="text-sm text-muted-brown leading-relaxed">
                If you receive a damaged, defective, or incorrect item, please
                contact us within 48 hours of delivery with photos of the
                issue. We&apos;ll arrange a free return and send a replacement
                — or issue a full refund if you prefer.
              </p>
            </section>
          </Reveal>

          {/* Contact CTA */}
          <Reveal>
            <div className="pt-6 border-t border-light-sand">
              <p className="text-sm text-muted-brown mb-3">
                Need help with a return, exchange, or shipping issue?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-clay font-medium hover:underline underline-offset-2"
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