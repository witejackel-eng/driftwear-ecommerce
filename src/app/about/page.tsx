import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Reveal } from '@/components/shared/Reveal';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'About Us',
  description:
    'Driftwear Studio is a demo clothing brand built around the idea that good clothes should make ordinary days feel easier. Learn our story.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] bg-cream overflow-hidden">
        <Image
          src="/images/about/studio.jpg"
          alt="Driftwear Studio workspace"
          fill
          className="object-cover opacity-80"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Container className="text-center">
            <Reveal>
              <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                About Driftwear
              </h1>
              <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto">
                A small studio making clothes that feel like a quiet afternoon.
              </p>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <SectionHeader
                title="How we started"
                subtitle="Not with a grand plan — just a feeling that clothes should be easier."
                align="center"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Driftwear Studio is a demo clothing brand built around the idea that good clothes
                  should make ordinary days feel easier. We started (hypothetically) in a small
                  apartment with a sewing machine and too many fabric swatches, convinced that the
                  world didn&apos;t need another fast-fashion label.
                </p>
                <p>
                  The idea was simple: make a handful of pieces that you&apos;d reach for every
                  single morning. Not statement pieces. Not trend-chasing. Just really, really good
                  basics in fabrics that feel as good on day one hundred as they do on day one.
                </p>
                <p>
                  We&apos;re not trying to be the biggest brand in the world. We&apos;re trying
                  to be the one you keep coming back to because everything just works — the fit,
                  the fabric, the colours that go with literally everything in your closet.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What we care about */}
      <section className="py-16 md:py-24 bg-cream">
        <Container>
          <SectionHeader
            title="What we care about"
            subtitle="A few things that actually matter to us."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: 'Fabric First',
                description:
                  'Every piece starts with the fabric. We source natural fibers — linen, organic cotton, Tencel — because how something feels against your skin is non-negotiable.',
              },
              {
                title: 'Relaxed Fit, Relaxed Mind',
                description:
                  'Our clothes are designed for comfort. Not oversized-for-the-sake-of-it, but thoughtfully proportioned so you look put-together without trying too hard.',
              },
              {
                title: 'Honest Pricing',
                description:
                  'No inflated MSRPs with fake markdowns. The price you see is the price it should be. We cut out middlemen and markups to keep things fair.',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-sm p-6 h-full">
                  <h3 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Fabric Philosophy */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Reveal direction="left">
              <div className="relative aspect-[4/5] bg-cream rounded-sm overflow-hidden">
                <Image
                  src="/images/about/fabric-detail.jpg"
                  alt="Close-up of Driftwear fabric"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <div>
                <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-ink mb-4">
                  Fabric is everything
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    We spend an embarrassing amount of time thinking about fabric. The weight, the
                    drape, how it behaves after the twentieth wash. Most people don&apos;t notice
                    good fabric — but they definitely notice bad fabric.
                  </p>
                  <p>
                    Our linen comes from European flax, pre-washed so it arrives feeling like
                    you&apos;ve already broken it in. Our cotton is organic and brushed for that
                    lived-in softness from the very first wear. Every fabric choice is made with
                    warm climates in mind — breathable, lightweight, and easy to care for.
                  </p>
                  <p>
                    We believe the best fabric is the one you don&apos;t think about. It just
                    feels right, wash after wash.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Team / Studio */}
      <section className="py-16 md:py-24 bg-cream">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Reveal direction="left" className="md:order-2">
              <div className="relative aspect-[4/5] bg-cream rounded-sm overflow-hidden">
                <Image
                  src="/images/about/team.jpg"
                  alt="The Driftwear Studio team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.1} className="md:order-1">
              <div>
                <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-ink mb-4">
                  A small team, a big feeling
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    We&apos;re a small team — the kind where everyone wears multiple hats and
                    the office dog has an official title. There&apos;s no corporate ladder here,
                    just people who care about making good clothes.
                  </p>
                  <p>
                    Our studio is where the magic (and the mess) happens. Fabric swatches
                    everywhere, half-finished prototypes on every chair, and a suspicious amount
                    of chai consumption. It&apos;s not glamorous, but it&apos;s honest work that
                    we genuinely love.
                  </p>
                  <p>
                    If you&apos;re ever in the neighbourhood, say hello. We&apos;ll probably
                    offer you tea and talk your ear off about button plackets.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-ink mb-4">
              Ready to see what the fuss is about?
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              Browse our collection of everyday essentials designed to make getting dressed the
              easiest part of your day.
            </p>
            <Button
              asChild
              className="bg-navy text-white hover:bg-navy/90 rounded-sm"
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