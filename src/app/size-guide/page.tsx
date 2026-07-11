import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { womenSizeGuide, menSizeGuide, accessorySizeGuide } from '@/data/size-guide';
import { Ruler, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Size Guide | Driftwear Studio',
  description: 'Find your perfect fit with the Driftwear Studio size guide. Includes measurement tables for women, men, and accessories.',
  robots: { index: true, follow: true },
};

function SizeTable({
  data,
  category,
}: {
  data: { size: string; chest: string; waist: string; length: string }[];
  category: string;
}) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-deep-ink/10">
            <th className="text-left py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-brown">
              Size
            </th>
            <th className="text-left py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-brown">
              Chest
            </th>
            <th className="text-left py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-brown">
              Waist
            </th>
            <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-muted-brown">
              Length
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.size} className="border-b border-light-sand/50">
              <td className="py-3 pr-4 font-medium text-deep-ink">{row.size}</td>
              <td className="py-3 pr-4 text-muted-brown">{row.chest}</td>
              <td className="py-3 pr-4 text-muted-brown">{row.waist}</td>
              <td className="py-3 text-muted-brown">{row.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <main className="flex-1">
      <Container className="py-12 md:py-20">
        {/* Back link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm text-muted-brown hover:text-deep-ink transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Ruler className="w-6 h-6 text-clay" />
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-deep-ink">
              Size Guide
            </h1>
          </div>
          <p className="text-muted-brown mb-10 max-w-lg">
            Our pieces are designed for a relaxed, easy fit. Use the tables below to find your size.
            If you are between sizes, we recommend sizing up for a more oversized look or down for a closer fit.
            All measurements are in inches.
          </p>

          {/* How to Measure */}
          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-deep-ink mb-4">
              How to Measure
            </h2>
            <div className="space-y-3 text-sm text-muted-brown leading-relaxed">
              <p>
                <strong className="text-deep-ink">Chest:</strong> Measure around the fullest part of your chest,
                keeping the tape level and snug but not tight.
              </p>
              <p>
                <strong className="text-deep-ink">Waist:</strong> Measure around your natural waistline,
                which is the narrowest part of your torso.
              </p>
              <p>
                <strong className="text-deep-ink">Length:</strong> Measured from the highest point of the
                shoulder seam to the hem. This varies by garment type.
              </p>
            </div>
          </section>

          {/* Women */}
          <section className="mb-12">
            <SectionHeader title="Women" />
            <SizeTable data={womenSizeGuide} category="women" />
          </section>

          {/* Men */}
          <section className="mb-12">
            <SectionHeader title="Men" />
            <SizeTable data={menSizeGuide} category="men" />
          </section>

          {/* Accessories */}
          <section className="mb-8">
            <SectionHeader title="Accessories" />
            <div className="space-y-3">
              {accessorySizeGuide.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 py-3 border-b border-light-sand/50"
                >
                  <span className="text-sm font-medium text-deep-ink min-w-[120px]">
                    {item.label}
                  </span>
                  <span className="text-sm text-muted-brown">{item.description}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}