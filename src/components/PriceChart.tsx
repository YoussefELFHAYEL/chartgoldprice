'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/contexts/CurrencyContext';

type TimeRange = '1W' | '1M' | '6M' | '1Y';

const generateMockData = (basePrice: number, volatility: number, range: TimeRange) => {
    const data = [];
    let price = basePrice;
    const now = new Date();
    const days = range === '1W' ? 7 : range === '1M' ? 30 : range === '6M' ? 180 : 365;

    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        price = price + (Math.random() - 0.5) * volatility;
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: price,
        });
    }
    return data;
};

export function PriceChart() {
    const [activeTab, setActiveTab] = useState<'gold' | 'silver'>('gold');
    const [timeRange, setTimeRange] = useState<TimeRange>('1M');
    const { currency, convertPrice } = useCurrency();

    // Generate mock data in USD
    const dataUSD = generateMockData(
        activeTab === 'gold' ? 2000 : 23,
        activeTab === 'gold' ? 50 : 1,
        timeRange
    );

    // Convert to selected currency
    const data = dataUSD.map(item => ({
        ...item,
        price: convertPrice(item.price)
    }));

    const color = activeTab === 'gold' ? '#d6a93e' : '#94a3b8';

    return (
        <section className="py-12 bg-zinc-900/30 border-y border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Price History</h2>
                        <p className="text-zinc-400 text-sm">Market Trend Analysis ({currency})</p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                        {/* Metal Selector */}
                        <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/10">
                            <button
                                onClick={() => setActiveTab('gold')}
                                className={cn(
                                    "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                                    activeTab === 'gold' ? "bg-gold-500 text-white shadow-lg" : "text-zinc-400 hover:text-white"
                                )}
                            >
                                Gold
                            </button>
                            <button
                                onClick={() => setActiveTab('silver')}
                                className={cn(
                                    "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                                    activeTab === 'silver' ? "bg-zinc-600 text-white shadow-lg" : "text-zinc-400 hover:text-white"
                                )}
                            >
                                Silver
                            </button>
                        </div>

                        {/* Time Range Selector */}
                        <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/10">
                            {(['1W', '1M', '6M', '1Y'] as TimeRange[]).map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                                        timeRange === range ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"
                                    )}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="h-[400px] w-full rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="#666"
                                tick={{ fill: '#666', fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                minTickGap={30}
                            />
                            <YAxis
                                stroke="#666"
                                tick={{ fill: '#666', fontSize: 12 }}
                                tickFormatter={(value) => value.toLocaleString('en-US')}
                                tickLine={false}
                                axisLine={false}
                                domain={['auto', 'auto']}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#18181b',
                                    border: '1px solid #3f3f46',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value: number) => [`${value.toFixed(2)} ${currency}`, 'Price']}
                            />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke={color}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorPrice)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}
