import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Material & Care Transparency',
  description:
    'Honest information about the fabrics, processes, and care behind Driftwear Studio clothing. No greenwashing — just what we use and why.',
  path: '/sustainability',
});

export default function SustainabilityPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/sustainability/fabric.jpg"
          alt="Natural linen fabric in soft light"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-deep-ink/25" />
        <div className="absolute inset-0 flex items-end">
          <Container className="pb-10 md:pb-14">
            <Reveal>
              <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
                Transparency
              </p>
              <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-5xl lg:text-6xl text-offwhite leading-tight">
                Material &amp; Care
              </h1>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 bg-offwhite">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>
                  We think you deserve to know what your clothes are made of, how
                  they&apos;re made, and how to make them last. This page covers
                  exactly that — no invented certifications, no vague commitments.
                </p>
                <p>
                  We&apos;re working toward more sustainable practices. In the
                  meantime, here&apos;s what we can honestly tell you.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Section 1: Our Materials */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal direction="left">
              <div className="relative aspect-[4/5] bg-warm-paper overflow-hidden">
                <Image
                  src="/images/fabric/soft.jpg"
                  alt="Pre-washed linen fabric texture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <div>
                <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
                  Our Materials
                </p>
                <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-deep-ink leading-snug mb-6">
                  Linen &amp; cotton — chosen for warm climates
                </h2>
                <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                  <p>
                    <strong className="text-deep-ink">Linen</strong> — Our primary
                    fabric. Linen is made from the flax plant, requires less water
                    than cotton to grow, and is naturally biodegradable. It gets
                    softer with every wash and is one of the most breathable fabrics
                    available — ideal for Indian summers. We specify the GSM (weight)
                    on each product page because weight affects how a garment drapes
                    and wears.
                  </p>
                  <p>
                    <strong className="text-deep-ink">Cotton</strong> — Used in
                    select pieces where we want a softer, smoother hand feel. Cotton
                    is familiar, comfortable, and easy to care for. We specify the
                    fabric weight for every cotton piece so you know exactly what
                    you&apos;re getting.
                  </p>
                  <p>
                    Every product page lists the exact fabric composition and weight.
                    We don&apos;t use vague terms like &ldquo;premium blend&rdquo; —
                    you&apos;ll see the real breakdown.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Section 2: How We Make Things */}
      <section className="py-16 md:py-24 bg-warm-paper">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
                  How We Make Things
                </p>
                <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-deep-ink leading-snug">
                  What &ldquo;soft from day one&rdquo; actually means
                </h2>
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal delay={0.05}>
                <div className="flex gap-6">
                  <span className="font-[family-name:var(--font-instrument-serif)] text-clay text-2xl shrink-0 w-8">
                    01
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-instrument-serif)] text-lg text-deep-ink mb-2">
                      Pre-washing
                    </h3>
                    <p className="text-sm text-muted-brown leading-relaxed">
                      Every garment goes through a pre-wash process before it reaches you.
                      This does two things: it softens the fabric so it feels
                      broken-in immediately, and it pre-shrinks the garment so your
                      correct size stays your correct size after the first wash at
                      home. No surprises.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex gap-6">
                  <span className="font-[family-name:var(--font-instrument-serif)] text-clay text-2xl shrink-0 w-8">
                    02
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-instrument-serif)] text-lg text-deep-ink mb-2">
                      Fabric selection
                    </h3>
                    <p className="text-sm text-muted-brown leading-relaxed">
                      We choose fabrics for how they perform in warm, humid conditions.
                      Breathability, weight, and drape are the deciding factors — not
                      marketing appeal. We handle and wash-test fabrics before committing
                      to them in a collection.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex gap-6">
                  <span className="font-[family-name:var(--font-instrument-serif)] text-clay text-2xl shrink-0 w-8">
                    03
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-instrument-serif)] text-lg text-deep-ink mb-2">
                      Fewer pieces, better made
                    </h3>
                    <p className="text-sm text-muted-brown leading-relaxed">
                      We release small collections rather than large seasonal drops.
                      This means more attention per style, better quality control,
                      and less wasted inventory. We&apos;d rather make one shirt
                      really well than ten passable ones.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3: Caring for Your Clothes */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal direction="left">
              <div>
                <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
                  Caring for Your Clothes
                </p>
                <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-deep-ink leading-snug mb-6">
                  The most sustainable garment is the one you wear often
                </h2>
                <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                  <p>
                    How you wash and store your clothes has a bigger impact on their
                    lifespan than most people realise. A well-cared-for linen shirt can
                    last years. Here are some straightforward tips:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-faded-olive shrink-0">—</span>
                      <span>
                        <strong className="text-deep-ink">Wash cold</strong> —
                        Machine wash on a gentle, cold cycle. Hot water weakens fibers
                        over time and causes colors to fade faster.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-faded-olive shrink-0">—</span>
                      <span>
                        <strong className="text-deep-ink">Air dry when you can</strong> —
                        Tumble drying is fine occasionally, but air drying extends
                        fabric life significantly. Linen actually benefits from it.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-faded-olive shrink-0">—</span>
                      <span>
                        <strong className="text-deep-ink">Store properly</strong> —
                        Fold knits and tees. Hang linen shirts and dresses to avoid
                        deep creases. Keep away from direct sunlight to prevent
                        fading.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-faded-olive shrink-0">—</span>
                      <span>
                        <strong className="text-deep-ink">Wash less often</strong> —
                        Not every wear requires a full wash. Airing out a garment
                        between wears can keep it fresh and extend its life.
                      </span>
                    </li>
                  </ul>
                  <p>
                    Detailed care instructions are included on every product page and
                    on the garment label.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <div className="relative aspect-[4/5] bg-warm-paper overflow-hidden">
                <Image
                  src="/images/fabric/wash.jpg"
                  alt="Linen fabric drying in natural light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Honest statement */}
      <section className="py-16 md:py-24 bg-warm-paper">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-deep-ink leading-snug mb-6">
                Where we&apos;re headed
              </h2>
              <div className="space-y-4 text-sm text-muted-brown leading-relaxed">
                <p>
                  We&apos;re not going to pretend we have all the answers. We
                  don&apos;t hold organic certifications or run closed-loop
                  production facilities. What we do is focus on natural fibers,
                  make garments that last, and share honest information about
                  what goes into each piece.
                </p>
                <p>
                  We&apos;re working toward more sustainable practices — better
                  packaging, responsible sourcing, and transparency about our
                  supply chain. When we make meaningful progress, we&apos;ll
                  share it here. When we don&apos;t, we&apos;ll say that too.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-deep-ink mb-4">
              Browse the collection
            </h2>
            <p className="text-sm text-muted-brown mb-8 max-w-md mx-auto">
              See the fabrics and care details for every piece in our range.
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