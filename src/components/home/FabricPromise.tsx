import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';

const promises = [
  {
    title: 'Soft from day one',
    description:
      'Every piece is pre-washed and garment-dyed so it feels broken-in the moment you unpack it. No scratchy break-in period.',
    image: '/images/fabric/soft.jpg',
  },
  {
    title: 'Made to move',
    description:
      'Relaxed fits and natural fibers designed for real life — coffee runs, desk days, and spontaneous plans.',
    image: '/images/fabric/move.jpg',
  },
  {
    title: 'Easy to wash',
    description:
      'Machine washable fabrics that get softer with every wash. Toss, wash, wear, repeat.',
    image: '/images/fabric/wash.jpg',
  },
];

export function FabricPromise() {
  return (
    <section className="py-20 md:py-28 bg-warm-paper">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-medium tracking-[0.2em] uppercase text-clay mb-4">
            Why our clothes feel different
          </p>
          <h2 className="text-center font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-ink mb-14 md:mb-20">
            The fabric promise
          </h2>
        </Reveal>

        {/* Editorial layout — alternating image/text rows on desktop */}
        <div className="space-y-12 md:space-y-20">
          {promises.map((item, i) => {
            const isReversed = i % 2 === 1;
            return (
              <Reveal
                key={item.title}
                direction={isReversed ? 'right' : 'left'}
                delay={i * 0.08}
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center ${
                    isReversed ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.title} — ${item.description.slice(0, 40)}...`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Text */}
                  <div className="max-w-sm">
                    <span className="text-clay text-xs font-medium tracking-[0.15em] uppercase mb-3 block">
                      0{i + 1}
                    </span>
                    <h3 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-ink mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-brown leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}