import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { PriceChart } from '@/components/PriceChart';
import { NewsSection } from '@/components/NewsSection';

export const metadata: Metadata = {
    title: 'Gold Price Today | Live Gold Rates in USD, EUR, GBP',
    description: 'Check today\'s gold price updated live. Real-time gold rates per troy ounce in multiple currencies. Track gold price movements with interactive charts.',
    keywords: ['gold price today', 'gold rate today', 'today gold price', 'live gold price', 'current gold price'],
};

export default function GoldPriceTodayPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-12 bg-zinc-900/50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
                        Gold Price Today
                    </h1>
                    <p className="text-zinc-400 text-center max-w-3xl mx-auto mb-8">
                        Stay updated with today's live gold price. Our real-time gold rates are updated continuously
                        throughout the trading day. View current gold prices in multiple currencies including USD, EUR, GBP, and more.
                    </p>
                </div>
            </section>

            <Hero />
            <PriceChart />

            <section className="py-12 bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-6">Understanding Today's Gold Price</h2>
                    <div className="grid md:grid-cols-2 gap-8 text-zinc-400">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Factors Affecting Gold Prices</h3>
                            <ul className="space-y-2 list-disc list-inside">
                                <li>Global economic conditions and inflation</li>
                                <li>Currency strength, especially US Dollar</li>
                                <li>Central bank policies and interest rates</li>
                                <li>Geopolitical events and uncertainty</li>
                                <li>Supply and demand dynamics</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Why Track Gold Prices Daily?</h3>
                            <ul className="space-y-2 list-disc list-inside">
                                <li>Timing your gold purchases and sales</li>
                                <li>Portfolio diversification decisions</li>
                                <li>Hedging against economic uncertainty</li>
                                <li>Understanding market trends</li>
                                <li>Making informed investment decisions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <NewsSection />
        </div>
    );
}
