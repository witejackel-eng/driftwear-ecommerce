import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProductCard } from '@/components/product/ProductCard';
import { getBestSellers } from '@/data/products';

export function BestSellers() {
  const products = getBestSellers().slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-offwhite">
      <Container>
        <SectionHeader
          title="Soft stuff people keep coming back for."
          align="center"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}