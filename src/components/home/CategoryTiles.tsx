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
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Men',
    href: '/shop/men',
    image: '/images/categories/men.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Linen Shop',
    href: '/shop?collection=linen-edit',
    image: '/images/categories/linen.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Last Call',
    href: '/shop?collection=last-call',
    image: '/images/categories/last-call.jpg',
    aspect: 'aspect-[3/4]',
  },
];

export function CategoryTiles() {
  return (
    <section className="py-16 md:py-24 bg-offwhite">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
              <Link href={cat.href} className="group block relative overflow-hidden rounded-xl">
                <div className={`relative ${cat.aspect} w-full`}>
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Warm overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                  <h3 className="text-white font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl mb-3">
                    {cat.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-cream/90 text-sm font-medium group-hover:text-white transition-colors">
                    Shop Now
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}