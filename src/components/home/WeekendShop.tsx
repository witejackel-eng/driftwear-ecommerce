import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function WeekendShop() {
  return (
    <section className="py-16 md:py-24">
      <Reveal>
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden mx-4 sm:mx-6 lg:mx-auto max-w-7xl">
          <Image
            src="/images/collections/weekend-shop.jpg"
            alt="Weekend Shop — relaxed coastal lifestyle"
            fill
            className="object-cover"
            sizes="100vw"
          />

          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />

          {/* Text overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
            <p className="text-cream/90 text-sm md:text-base max-w-lg mb-4 leading-relaxed">
              For road trips, coffee walks, beach evenings, and plans that start with
              &ldquo;let&apos;s just see.&rdquo;
            </p>
            <Link href="/shop?collection=weekend-shop">
              <Button
                variant="outline"
                className="border-cream/40 text-cream hover:bg-cream/10 hover:text-white h-10 px-5 rounded-md text-sm"
              >
                Shop Weekend
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}