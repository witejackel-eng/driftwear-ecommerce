import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';

const images = Array.from({ length: 5 }, (_, i) => ({
  src: `/images/social/social-${i + 1}.jpg`,
  alt: `Driftwear Studio social — lifestyle ${i + 1}`,
}));

export function SocialStrip() {
  return (
    <section className="py-16 md:py-24 bg-offwhite">
      <Container>
        <SectionHeader title="The latest from @driftwearstudio" />

        {/* Scrollable image row */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {images.map((img) => (
            <div
              key={img.src}
              className="flex-shrink-0 w-64 md:w-72 lg:w-80 aspect-square rounded-xl overflow-hidden group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="320px"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}