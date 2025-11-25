import { Metadata } from 'next';
import { PriceChart } from '@/components/PriceChart';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Gold Price History | Historical Gold Charts & Price Trends',
    description: 'Explore historical gold prices with interactive charts. View gold price trends over 1 week, 1 month, 6 months, and 1 year. Analyze past performance for better investment decisions.',
    keywords: ['gold price history', 'historical gold prices', 'gold price trends', 'gold price chart history', 'past gold prices'],
};

export default function GoldPriceHistoryPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-12 bg-zinc-900/50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Calendar className="h-8 w-8 text-gold-400" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Gold Price History
                        </h1>
                    </div>
                    <p className="text-zinc-400 text-center max-w-3xl mx-auto mb-8">
                        Explore historical gold price data with our interactive charts. Analyze price trends over different time periods
                        to make informed investment decisions. View gold price movements from 1 week to 1 year.
                    </p>
                </div>
            </section>

            <PriceChart />

            <section className="py-12 bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Historical Gold Price Milestones</h2>
                    <div className="max-w-4xl mx-auto space-y-4">
                        <div className="border-l-4 border-gold-500 pl-6 py-3">
                            <h3 className="text-lg font-semibold text-white">2020 - All-Time High</h3>
                            <p className="text-zinc-400">Gold reached its all-time high of over $2,070 per ounce during the COVID-19 pandemic as investors sought safe-haven assets.</p>
                        </div>
                        <div className="border-l-4 border-gold-500 pl-6 py-3">
                            <h3 className="text-lg font-semibold text-white">2011 - Previous Peak</h3>
                            <p className="text-zinc-400">Following the 2008 financial crisis, gold hit $1,920 per ounce as global economies struggled and central banks implemented quantitative easing.</p>
                        </div>
                        <div className="border-l-4 border-gold-500 pl-6 py-3">
                            <h3 className="text-lg font-semibold text-white">2001-2011 - Bull Market</h3>
                            <p className="text-zinc-400">Gold experienced a decade-long bull run, rising from around $250 to nearly $2,000 per ounce.</p>
                        </div>
                        <div className="border-l-4 border-gold-500 pl-6 py-3">
                            <h3 className="text-lg font-semibold text-white">1980 - Historic Peak</h3>
                            <p className="text-zinc-400">During high inflation and geopolitical tensions, gold briefly touched $850 per ounce (equivalent to over $2,500 in today's dollars).</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-zinc-900/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Historical Gold Prices Matter</h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="border border-white/10 rounded-lg p-6 text-center">
                            <h3 className="text-xl font-semibold text-gold-400 mb-3">Identify Trends</h3>
                            <p className="text-zinc-400 text-sm">
                                Historical data helps identify long-term trends, seasonality patterns, and cyclical movements in gold prices.
                            </p>
                        </div>
                        <div className="border border-white/10 rounded-lg p-6 text-center">
                            <h3 className="text-xl font-semibold text-gold-400 mb-3">Timing Decisions</h3>
                            <p className="text-zinc-400 text-sm">
                                Understanding past price behavior can help you time your purchases and sales more effectively.
                            </p>
                        </div>
                        <div className="border border-white/10 rounded-lg p-6 text-center">
                            <h3 className="text-xl font-semibold text-gold-400 mb-3">Risk Assessment</h3>
                            <p className="text-zinc-400 text-sm">
                                Historical volatility and drawdowns provide insight into potential risks and expected price movements.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Gold Price Performance by Decade</h2>
                    <div className="max-w-3xl mx-auto overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="py-3 px-4 text-white font-semibold">Decade</th>
                                    <th className="py-3 px-4 text-white font-semibold">Avg. Annual Return</th>
                                    <th className="py-3 px-4 text-white font-semibold">Performance</th>
                                </tr>
                            </thead>
                            <tbody className="text-zinc-400">
                                <tr className="border-b border-white/10">
                                    <td className="py-3 px-4">2020s*</td>
                                    <td className="py-3 px-4 text-green-400">+8.5%</td>
                                    <td className="py-3 px-4">Strong performance amid global uncertainty</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="py-3 px-4">2010s</td>
                                    <td className="py-3 px-4 text-green-400">+1.3%</td>
                                    <td className="py-3 px-4">Consolidation after bull market</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="py-3 px-4">2000s</td>
                                    <td className="py-3 px-4 text-green-400">+15.8%</td>
                                    <td className="py-3 px-4">Massive bull run decade</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="py-3 px-4">1990s</td>
                                    <td className="py-3 px-4 text-red-400">-0.7%</td>
                                    <td className="py-3 px-4">Weak amid tech boom</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-xs text-zinc-500 mt-2">*2020s data through 2024</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
