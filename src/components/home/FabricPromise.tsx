import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';

const promises = [
  {
    title: 'Soft from day one',
    description:
      'Every piece is pre-washed and garment-dyed so it feels broken-in the moment you unpack it. No scratchy break-in period — just instant soft.',
    image: '/images/fabric/soft.jpg',
  },
  {
    title: 'Made to move',
    description:
      'Relaxed fits, natural fibers, and just the right amount of stretch. Designed for real life — coffee runs, desk days, and spontaneous plans.',
    image: '/images/fabric/move.jpg',
  },
  {
    title: 'Easy to wash',
    description:
      'Machine washable fabrics that get softer with every wash. No dry cleaning, no fuss — just toss, wash, wear, repeat.',
    image: '/images/fabric/wash.jpg',
  },
];

export function FabricPromise() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {promises.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <div className="bg-offwhite rounded-2xl overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-[family-name:var(--font-instrument-serif)] text-xl md:text-2xl text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}