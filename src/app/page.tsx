import { Hero } from "@/components/Hero";
import { PriceChart } from "@/components/PriceChart";
import { NewsSection } from "@/components/NewsSection";
import { AnalysisSection } from "@/components/AnalysisSection";
import { GoldCalculator } from "@/components/GoldCalculator";
import { getMetalPrice } from "@/lib/gold-api";

export default async function Home() {
  // Fetch both gold and silver data once to avoid duplicate API calls
  const [goldData, silverData] = await Promise.all([
    getMetalPrice('XAU', 'USD'),
    getMetalPrice('XAG', 'USD'),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero goldData={goldData} silverData={silverData} />
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
