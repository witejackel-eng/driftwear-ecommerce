import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';

const journalEntries = [
  {
    src: '/images/social/social-1.jpg',
    caption: 'Morning light through the studio window',
  },
  {
    src: '/images/social/social-2.jpg',
    caption: 'Linen, fresh from the wash',
  },
  {
    src: '/images/social/social-3.jpg',
    caption: 'A quiet corner, a slow morning',
  },
];

export function SocialStrip() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Container>
        <Reveal>
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-clay mb-3">
              Driftwear Journal
            </p>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-ink">
              Moments worth wearing soft clothes for
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {journalEntries.map((entry, i) => (
            <Reveal key={entry.src} delay={i * 0.1}>
              <figure className="group">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                  <Image
                    src={entry.src}
                    alt={entry.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted-brown leading-relaxed">
                  {entry.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}