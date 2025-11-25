import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

export function AnalysisSection() {
    return (
        <section className="py-16 bg-zinc-900/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Market Analysis & Insights</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Expert technical analysis and market indicators to help you make informed decisions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="rounded-xl bg-black border border-white/10 p-6">
                        <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                            <TrendingUp className="h-6 w-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Technical Trend</h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Gold is currently showing a strong bullish divergence on the 4H chart, suggesting potential upside momentum.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                            <span className="h-2 w-2 rounded-full bg-green-400" />
                            Bullish Signal
                        </div>
                    </div>

                    <div className="rounded-xl bg-black border border-white/10 p-6">
                        <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                            <BarChart3 className="h-6 w-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Volume Analysis</h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Trading volume has increased by 25% compared to last week, indicating strong institutional interest.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-purple-400">
                            <span className="h-2 w-2 rounded-full bg-purple-400" />
                            High Volume
                        </div>
                    </div>

                    <div className="rounded-xl bg-black border border-white/10 p-6">
                        <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                            <AlertCircle className="h-6 w-6 text-orange-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Key Levels</h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Resistance at $2,050 remains a key psychological barrier. Support holds firm at $1,980.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-orange-400">
                            <span className="h-2 w-2 rounded-full bg-orange-400" />
                            Watch Levels
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
