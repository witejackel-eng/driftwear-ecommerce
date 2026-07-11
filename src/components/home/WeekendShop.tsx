import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function WeekendShop() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Reveal>
        <div className="relative w-full aspect-[16/7] md:aspect-[21/9] overflow-hidden mx-0">
          <Image
            src="/images/collections/weekend-shop.jpg"
            alt="Weekend morning — coffee cup on a wooden table, soft light through linen curtains"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />

          {/* Gradient overlay — anchored to bottom-left for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/25 to-transparent" />

          {/* Text — anchored bottom-left */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14 lg:p-16">
            <div className="max-w-md">
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl lg:text-4xl text-white leading-[1.1] mb-3">
                The Weekend Shop
              </h2>
              <p className="text-offwhite/85 text-sm md:text-base max-w-sm mb-6 leading-relaxed">
                For road trips, coffee walks, beach evenings, and plans that
                start with &ldquo;let&apos;s just see.&rdquo;
              </p>
              <Link href="/shop?collection=weekend-shop">
                <Button className="bg-offwhite text-ink hover:bg-offwhite/90 h-11 px-6 rounded-md text-sm font-medium">
                  Shop Weekend
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}