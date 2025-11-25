import { Metadata } from 'next';
import { GoldCalculator } from '@/components/GoldCalculator';
import { getMetalPrice } from '@/lib/gold-api';

export const metadata: Metadata = {
    title: 'Gold Price Calculator | Calculate Gold Value by Weight and Karat',
    description: 'Free gold calculator to determine the value of your gold by weight (oz, grams, kg) and purity (24K, 22K, 18K, 14K). Get instant valuations in multiple currencies.',
    keywords: ['gold calculator', 'gold value calculator', 'gold price calculator', 'calculate gold value', 'gold worth calculator', 'karat gold calculator'],
};

export default async function GoldCalculatorPage() {
    const goldData = await getMetalPrice('XAU', 'USD');

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-12 bg-zinc-900/50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
                        Gold Price Calculator
                    </h1>
                    <p className="text-zinc-400 text-center max-w-3xl mx-auto mb-8">
                        Calculate the value of your gold instantly with our free gold calculator. Enter the weight of your gold
                        in ounces, grams, or kilograms, select the karat purity, and get an accurate valuation based on live gold prices.
                    </p>
                </div>
            </section>

            {goldData && (
                <section className="py-12 bg-black">
                    <div className="container mx-auto px-4">
                        <GoldCalculator goldPricePerOz={goldData.price} />
                    </div>
                </section>
            )}

            <section className="py-12 bg-zinc-900/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">How to Use the Gold Calculator</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gold-400 mb-3">1</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Enter Weight</h3>
                            <p className="text-zinc-400 text-sm">
                                Input the weight of your gold in your preferred unit (ounces, grams, or kilograms)
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gold-400 mb-3">2</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Select Karat</h3>
                            <p className="text-zinc-400 text-sm">
                                Choose the purity level: 24K (99.9%), 22K (91.7%), 18K (75%), or 14K (58.3%)
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gold-400 mb-3">3</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Get Value</h3>
                            <p className="text-zinc-400 text-sm">
                                Instantly see the estimated value in your chosen currency based on live gold prices
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-6">Understanding Gold Karats</h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="border border-white/10 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gold-400 mb-3">24K Gold (99.9% Pure)</h3>
                            <p className="text-zinc-400 mb-3">
                                The purest form of gold available. Softer and more yellow in color.
                                Primarily used for investment-grade gold bars and coins.
                            </p>
                            <p className="text-sm text-zinc-500">Best for: Investment bullion</p>
                        </div>
                        <div className="border border-white/10 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gold-400 mb-3">22K Gold (91.7% Pure)</h3>
                            <p className="text-zinc-400 mb-3">
                                Popular in Asia and the Middle East. Slightly harder than 24K,
                                making it more durable for jewelry while maintaining high gold content.
                            </p>
                            <p className="text-sm text-zinc-500">Best for: High-end jewelry</p>
                        </div>
                        <div className="border border-white/10 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gold-400 mb-3">18K Gold (75% Pure)</h3>
                            <p className="text-zinc-400 mb-3">
                                The most common gold purity for fine jewelry. Good balance of
                                purity, durability, and affordability.
                            </p>
                            <p className="text-sm text-zinc-500">Best for: Fine jewelry, watches</p>
                        </div>
                        <div className="border border-white/10 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gold-400 mb-3">14K Gold (58.3% Pure)</h3>
                            <p className="text-zinc-400 mb-3">
                                More durable and affordable. Popular in the United States
                                for everyday jewelry that can withstand daily wear.
                            </p>
                            <p className="text-sm text-zinc-500">Best for: Daily wear jewelry</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
