import { Hero } from "@/components/Hero";
import { PriceChart } from "@/components/PriceChart";
import { NewsSection } from "@/components/NewsSection";
import { AnalysisSection } from "@/components/AnalysisSection";
import { GoldCalculator } from "@/components/GoldCalculator";
import { getMetalPrice } from "@/lib/gold-api";

export default async function Home() {
  const goldData = await getMetalPrice('XAU', 'USD');

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <PriceChart />

      {/* Gold Calculator Section */}
      {goldData && (
        <section className="py-12 bg-black">
          <div className="container mx-auto px-4">
            <GoldCalculator goldPricePerOz={goldData.price} />
          </div>
        </section>
      )}

      <AnalysisSection />
      <NewsSection />
    </div>
  );
}
