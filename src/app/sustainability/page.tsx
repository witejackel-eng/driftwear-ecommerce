import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Package, Recycle, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Reveal } from '@/components/shared/Reveal';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Sustainability',
  description:
    'Honest thoughts on responsibility from Driftwear Studio. No greenwashing, no invented certifications — just what we would do if we were a real brand.',
  path: '/sustainability',
});

export default function SustainabilityPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] bg-cream overflow-hidden">
        <Image
          src="/images/sustainability/packaging.jpg"
          alt="Sustainable packaging materials"
          fill
          className="object-cover opacity-70"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Container className="text-center">
            <Reveal>
              <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                Sustainability
              </h1>
              <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto">
                Honest thoughts on doing things a little better. No greenwashing, we promise.
              </p>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  We&apos;re going to be straight with you: this is a demo website. But if
                  Driftwear Studio were a real brand, here&apos;s how we&apos;d think about
                  sustainability — not as a marketing tool, but as a genuine responsibility.
                </p>
                <p>
                  We don&apos;t claim to have all the answers. We&apos;re not claiming to be
                  organic, or recycled, or B-Corp certified (because we aren&apos;t any of those
                  things — yet). What we do claim is a genuine desire to make clothes in a way
                  that doesn&apos;t make us cringe.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What we would measure */}
      <section className="py-16 md:py-24 bg-cream">
        <Container>
          <SectionHeader
            title="What we would measure"
            subtitle="The metrics that actually matter — not the ones that look good in a report."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            {[
              {
                icon: Leaf,
                title: 'Carbon per garment',
                description:
                  "We'd calculate the full lifecycle carbon footprint of each piece — from raw material to your doorstep — and publish it transparently. Not to brag, but so we (and you) can see where to improve.",
              },
              {
                icon: Recycle,
                title: 'Waste percentage',
                description:
                  "How much fabric ends up in the bin during production? We'd track this obsessively and work to bring it as close to zero as possible. Zero-waste pattern cutting isn't easy, but it's worth pursuing.",
              },
              {
                icon: Package,
                title: 'Packaging materials',
                description:
                  "Every shipping bag, every tag, every tissue paper — we'd audit it all. Goal: 100% plastic-free, 100% recyclable or compostable. No microplastics hiding in your mailer.",
              },
              {
                icon: Wrench,
                title: 'Garment longevity',
                description:
                  "The most sustainable garment is the one you wear 100 times. We'd track how our pieces hold up over months and years of real wear, then use that data to make the next batch even better.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="bg-white rounded-sm p-6 h-full">
                  <item.icon className="w-6 h-6 text-olive mb-4" />
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

      {/* Fabric Transparency */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <SectionHeader
                title="Fabric transparency"
                subtitle="Where our materials come from and why we chose them."
                align="center"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  We believe you should know what&apos;s touching your skin. Every product page
                  lists the exact fabric composition, weight, and origin. Here&apos;s the general
                  idea:
                </p>
                <p>
                  <strong className="text-ink">Linen</strong> — We use European flax linen,
                  garment-washed for softness. Linen is naturally biodegradable, requires less
                  water than cotton, and gets softer with every wash. It&apos;s not the cheapest
                  option, but it&apos;s the right one.
                </p>
                <p>
                  <strong className="text-ink">Organic Cotton</strong> — Grown without synthetic
                  pesticides or fertilizers. We specify the GSM (grams per square meter) because
                  weight matters — a 220gsm tee feels very different from a 150gsm one, and
                  you deserve to know the difference.
                </p>
                <p>
                  <strong className="text-ink">Tencel™ Lyocell</strong> — Made from sustainably
                  sourced wood pulp in a closed-loop process that recycles water and solvents.
                  It&apos;s incredibly soft, drapes beautifully, and is biodegradable.
                </p>
                <p>
                  We don&apos;t use virgin polyester, acrylic, or nylon in any of our main
                  collections. If we ever do, we&apos;ll explain exactly why and what
                  alternatives we considered.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Lower-waste packaging */}
      <section className="py-16 md:py-24 bg-cream">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Reveal direction="left">
              <div className="relative aspect-[4/5] bg-cream rounded-sm overflow-hidden">
                <Image
                  src="/images/sustainability/packaging.jpg"
                  alt="Eco-friendly packaging"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <div>
                <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-ink mb-4">
                  Lower-waste packaging
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Your order arrives in a mailer made from recycled kraft paper — no plastic
                    poly mailers, no bubble wrap. Garments are wrapped in tissue paper and
                    protected with recycled paper stuffing instead of foam peanuts.
                  </p>
                  <p>
                    Tags are made from recycled paper with soy-based ink. Size labels are printed
                    directly on the garment to reduce waste. Even the thank-you card is
                    plantable — stick it in soil and wildflowers will grow (hypothetically).
                  </p>
                  <p>
                    It costs us more than plastic, but we think it&apos;s worth it. And if you
                    have ideas for doing it even better, we&apos;re all ears.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Repair and resale */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <SectionHeader
                title="Repair and resale ideas"
                subtitle="Clothes that last longer are better for everyone."
                align="center"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The most sustainable thing we can do as a brand is make clothes that last long
                  enough to be loved, not just worn. But when things do wear out, we have ideas:
                </p>
                <p>
                  <strong className="text-ink">Repair guide</strong> — We&apos;d publish free
                  repair guides for common issues: resewn buttons, patching elbows, fixing hem
                  unraveling. Simple stuff that extends a garment&apos;s life by years.
                </p>
                <p>
                  <strong className="text-ink">Take-back program</strong> — When you&apos;re
                  done with a Driftwear piece (even if it took 5 years — that&apos;s the goal),
                  send it back. We&apos;d clean, repair if needed, and resell it at a discount,
                  or responsibly recycle what can&apos;t be saved.
                </p>
                <p>
                  <strong className="text-ink">Second-life marketplace</strong> — A dedicated
                  section on our site for pre-owned Driftwear pieces. Same quality standards, just
                  with a story already attached. Because a good linen shirt deserves more than one
                  life.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Demo disclaimer */}
      <section className="py-12 bg-sun-yellow/10">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <p className="text-sm text-ink/70 leading-relaxed">
                <strong>Demo notice:</strong> This page shows how a brand can communicate
                responsibility without inventing certifications or making unsubstantiated claims.
                None of the programs or measurements described above currently exist — they
                represent what we believe honest sustainability communication should look like.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-ink mb-4">
              See what we&apos;re (hypothetically) making
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              Browse our collection of everyday essentials.
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