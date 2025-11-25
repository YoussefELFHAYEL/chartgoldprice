import { notFound } from 'next/navigation';
import { PriceChart } from '@/components/PriceChart';
import { AnalysisSection } from '@/components/AnalysisSection';
import { getMetalPrice } from '@/lib/gold-api';

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
    const { symbol } = await params;
    const symbolUpper = symbol.toUpperCase();
    const name = symbolUpper === 'GOLD' ? 'Gold' : symbolUpper === 'SILVER' ? 'Silver' : symbolUpper;

    return {
        title: `${name} Price Chart | Real-Time Analysis`,
        description: `Track live ${name} prices, view historical charts, and read expert analysis.`,
    };
}

export default async function ChartPage({ params }: { params: Promise<{ symbol: string }> }) {
    const { symbol } = await params;
    const symbolLower = symbol.toLowerCase();

    if (!['gold', 'silver'].includes(symbolLower)) {
        notFound();
    }

    const apiSymbol = symbolLower === 'gold' ? 'XAU' : 'XAG';
    const data = await getMetalPrice(apiSymbol, 'USD');

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-12 bg-zinc-900/50">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {symbolLower === 'gold'
                            ? 'Gold Price Chart Today | XAU USD Live'
                            : 'Silver Price Chart Today | XAG USD Live'
                        }
                    </h1>
                    {data && (
                        <div className="text-2xl font-medium text-gold-400">
                            ${data.price.toLocaleString()} <span className="text-sm text-zinc-500">USD</span>
                        </div>
                    )}
                </div>
            </section>

            <PriceChart />
            <AnalysisSection />
        </div>
    );
}
