import { getMetalPrice } from '@/lib/gold-api';
import { PriceCard } from './PriceCard';

export async function Hero() {
    const goldData = await getMetalPrice('XAU', 'USD');
    const silverData = await getMetalPrice('XAG', 'USD');

    return (
        <section className="relative overflow-hidden py-12 md:py-20">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full opacity-30 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gold-500/10 to-transparent blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
                        Live Gold Price Chart | <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">Real-Time Silver Prices</span>
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Track live Gold and Silver market data with advanced analytics and historical charts.
                        Stay ahead of the market with our premium dashboard.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <PriceCard symbol="XAU" name="Gold" data={goldData} />
                    <PriceCard symbol="XAG" name="Silver" data={silverData} />
                </div>
            </div>
        </section>
    );
}
