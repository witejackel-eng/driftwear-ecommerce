import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'About',
  description:
    'Driftwear Studio makes soft, everyday clothing for warm weather and real life. Designed for slow mornings, warm streets, and weekend travel.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero — full-width image, 50vh */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/about/studio.jpg"
          alt="Driftwear Studio workspace"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-deep-ink/30" />
        <div className="absolute inset-0 flex items-end">
          <Container className="pb-10 md:pb-14">
            <Reveal>
              <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-5xl lg:text-6xl text-offwhite leading-tight">
                Clothes for the
                <br />
                days that matter
              </h1>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-16 md:py-24 bg-offwhite">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
                Our Philosophy
              </p>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl lg:text-4xl text-deep-ink leading-snug mb-6">
                Soft, everyday clothing for warm weather and real life
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>
                  Driftwear Studio makes the kind of clothes you reach for without
                  thinking — the ones that feel right the moment you put them on and
                  still feel right eight hours later.
                </p>
                <p>
                  We&apos;re not chasing trends or building a lifestyle brand. We&apos;re
                  making a handful of well-considered pieces that work with the way
                  people actually dress: simply, comfortably, and without fuss.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Why these clothes exist */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal direction="left">
              <div>
                <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
                  The Idea
                </p>
                <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-deep-ink leading-snug mb-6">
                  Designed for slow mornings, warm streets, coffee walks, and weekend travel
                </h2>
                <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                  <p>
                    Most clothing is designed around occasions — meetings, parties,
                    workouts. But the majority of life happens in between: the quiet
                    mornings, the errand runs, the weekends with nowhere specific to be.
                  </p>
                  <p>
                    That&apos;s the wardrobe gap we&apos;re interested in. Clothes that
                    are presentable enough for a café lunch but comfortable enough to
                    wear all day at home. No switching required.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <div className="relative aspect-[4/5] bg-warm-paper overflow-hidden">
                <Image
                  src="/images/about/fabric-detail.jpg"
                  alt="Close-up of linen fabric texture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Fabric approach */}
      <section className="py-16 md:py-24 bg-warm-paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal direction="left">
              <div className="relative aspect-[4/5] bg-light-sand overflow-hidden">
                <Image
                  src="/images/about/team.jpg"
                  alt="Fabric draped in natural light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <div>
                <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
                  Fabric First
                </p>
                <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-deep-ink leading-snug mb-6">
                  Natural fibers, pre-washed for softness, breathable for Indian summers
                </h2>
                <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                  <p>
                    We start with fabric because that&apos;s what you actually feel. Linen
                    that drapes without clinging. Cotton that breathes when the
                    temperature climbs. Every piece is pre-washed so it arrives soft
                    from day one — no breaking-in period, no surprises after the first wash.
                  </p>
                  <p>
                    We focus on natural fibers because they work best in warm weather.
                    They&apos;re breathable, they age well, and they get softer with
                    wear rather than losing their hand feel.
                  </p>
                  <p>
                    We think about weight, drape, and how a fabric behaves after
                    twenty washes — not just how it looks on a hanger.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Three pillars */}
      <section className="py-16 md:py-24 bg-offwhite">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl lg:text-4xl text-deep-ink leading-snug">
                What we focus on
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: '01',
                title: 'Fabric that feels right',
                description:
                  'Every piece starts with the material. Natural fibers, pre-washed for immediate softness, chosen for how they feel against your skin in warm weather.',
              },
              {
                label: '02',
                title: 'Relaxed, intentional fit',
                description:
                  'Not oversized for the sake of it. Thoughtfully proportioned so you look put-together without trying — comfortable without looking sloppy.',
              },
              {
                label: '03',
                title: 'Honest pricing',
                description:
                  'The price you see is the price it costs. No inflated MSRPs with fake markdowns. We keep margins fair by focusing on fewer, better pieces.',
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
                <div className="h-full">
                  <span className="font-[family-name:var(--font-instrument-serif)] text-clay text-3xl md:text-4xl block mb-4">
                    {item.label}
                  </span>
                  <h3 className="font-[family-name:var(--font-instrument-serif)] text-xl text-deep-ink mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-brown leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-deep-ink mb-4">
              See what we make
            </h2>
            <p className="text-sm text-muted-brown mb-8 max-w-md mx-auto">
              Browse the collection — everyday essentials in fabrics that feel as good
              as they look.
            </p>
            <Button
              asChild
              className="bg-deep-ink text-offwhite hover:bg-deep-ink/90 rounded-sm"
            >
              <Link href="/shop">
                Shop Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}