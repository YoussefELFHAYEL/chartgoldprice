import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { PriceChart } from '@/components/PriceChart';
import { NewsSection } from '@/components/NewsSection';
import { getMetalPrice } from '@/lib/gold-api';

export const metadata: Metadata = {
    title: 'Silver Price Today | Live Silver Rates in USD, EUR, GBP',
    description: 'Check today\'s silver price updated live. Real-time silver rates per troy ounce in multiple currencies. Track silver price movements with interactive charts.',
    keywords: ['silver price today', 'silver rate today', 'today silver price', 'live silver price', 'current silver price'],
};

export default async function SilverPriceTodayPage() {
    // Fetch both gold and silver data to avoid duplicate API calls
    const [goldData, silverData] = await Promise.all([
        getMetalPrice('XAU', 'USD'),
        getMetalPrice('XAG', 'USD'),
    ]);

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-12 bg-zinc-900/50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
                        Silver Price Today
                    </h1>
                    <p className="text-zinc-400 text-center max-w-3xl mx-auto mb-8">
                        Stay updated with today's live silver price. Our real-time silver rates are updated continuously
                        throughout the trading day. View current silver prices in multiple currencies including USD, EUR, GBP, and more.
                    </p>
                </div>
            </section>

            <Hero goldData={goldData} silverData={silverData} />
            <PriceChart />

            <section className="py-12 bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-6">Understanding Today's Silver Price</h2>
                    <div className="grid md:grid-cols-2 gap-8 text-zinc-400">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Factors Affecting Silver Prices</h3>
                            <ul className="space-y-2 list-disc list-inside">
                                <li>Industrial demand (electronics, solar panels)</li>
                                <li>Investment demand and ETF holdings</li>
                                <li>Mining supply and production costs</li>
                                <li>Gold-to-silver ratio trends</li>
                                <li>Global economic growth indicators</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Silver vs Gold Investment</h3>
                            <ul className="space-y-2 list-disc list-inside">
                                <li>More volatile than gold prices</li>
                                <li>Lower price point for entry</li>
                                <li>Dual role: precious metal and industrial commodity</li>
                                <li>Higher percentage gains potential</li>
                                <li>Popular for small investors</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <NewsSection />
        </div>
    );
}
