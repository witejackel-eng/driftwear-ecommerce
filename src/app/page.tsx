import { Hero } from "@/components/home/Hero";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { ThisJustIn } from "@/components/home/ThisJustIn";
import { CollectionFeature } from "@/components/home/CollectionFeature";
import { BestSellers } from "@/components/home/BestSellers";
import { WeekendShop } from "@/components/home/WeekendShop";
import { FabricPromise } from "@/components/home/FabricPromise";
import { SocialStrip } from "@/components/home/SocialStrip";
import { Newsletter } from "@/components/home/Newsletter";
import { getCollectionBySlug } from "@/data/collections";

export default function Home() {
  const linenCollection = getCollectionBySlug("linen-edit")!;

  return (
    <>
      <Hero />
      <CategoryTiles />
      <ThisJustIn />
      <CollectionFeature collection={linenCollection} />
      <BestSellers />
      <WeekendShop />
      <FabricPromise />
      <SocialStrip />
      <Newsletter />
    </>
  );
}