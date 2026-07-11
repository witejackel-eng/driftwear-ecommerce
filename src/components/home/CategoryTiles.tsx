import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'Women',
    href: '/shop/women',
    image: '/images/categories/women.jpg',
  },
  {
    title: 'Men',
    href: '/shop/men',
    image: '/images/categories/men.jpg',
  },
  {
    title: 'Linen Shop',
    href: '/shop?collection=linen-edit',
    image: '/images/categories/linen.jpg',
  },
  {
    title: 'Last Call',
    href: '/shop?collection=last-call',
    image: '/images/categories/last-call.jpg',
  },
];

export function CategoryTiles() {
  return (
    <section className="py-20 md:py-28 bg-warm-paper">
      <Container>
        {/* Asymmetrical 2x2 grid on desktop — first card spans full width */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4">
          {/* Women — spans 2 cols on desktop */}
          <Reveal delay={0} className="col-span-2 row-span-1">
            <Link href={categories[0].href} className="group block relative overflow-hidden rounded-lg">
              <div className="relative aspect-[2/1] md:aspect-[3/1] w-full">
                <Image
                  src={categories[0].image}
                  alt="Women's collection — linen shirts, dresses, and everyday essentials"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <h3 className="text-white font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl mb-2">
                  {categories[0].title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-offwhite/85 text-sm font-medium group-hover:text-white transition-colors">
                  Shop Now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Men */}
          <Reveal delay={0.08} className="col-span-1">
            <Link href={categories[1].href} className="group block relative overflow-hidden rounded-lg">
              <div className="relative aspect-square w-full">
                <Image
                  src={categories[1].image}
                  alt="Men's collection — relaxed shirts, tees, and weekend wear"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="text-white font-[family-name:var(--font-instrument-serif)] text-xl md:text-2xl mb-1.5">
                  {categories[1].title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-offwhite/85 text-xs md:text-sm font-medium group-hover:text-white transition-colors">
                  Shop Now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Linen Shop */}
          <Reveal delay={0.16} className="col-span-1">
            <Link href={categories[2].href} className="group block relative overflow-hidden rounded-lg">
              <div className="relative aspect-square w-full">
                <Image
                  src={categories[2].image}
                  alt="Linen Shop — sunwashed, breathable linen pieces"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="text-white font-[family-name:var(--font-instrument-serif)] text-xl md:text-2xl mb-1.5">
                  {categories[2].title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-offwhite/85 text-xs md:text-sm font-medium group-hover:text-white transition-colors">
                  Shop Now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Last Call — spans 2 cols on desktop */}
          <Reveal delay={0.12} className="col-span-2 row-span-1">
            <Link href={categories[3].href} className="group block relative overflow-hidden rounded-lg">
              <div className="relative aspect-[2/1] md:aspect-[3/1] w-full">
                <Image
                  src={categories[3].image}
                  alt="Last Call — final chance on favorite styles before they're gone"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <h3 className="text-white font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl mb-2">
                  {categories[3].title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-offwhite/85 text-sm font-medium group-hover:text-white transition-colors">
                  Shop Now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}