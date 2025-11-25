'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/contexts/CurrencyContext';
import { WeightUnit, GRAMS_PER_OZ } from '@/lib/conversions';

interface PriceCardProps {
    symbol: 'XAU' | 'XAG';
    name: string;
    data: {
        price: number;
        ch: number;
        chp: number;
        high_price: number;
        low_price: number;
    } | null;
}

function PriceCard({ symbol, name, data }: PriceCardProps) {
    const { currency, convertPrice } = useCurrency();
    const [unit, setUnit] = useState<WeightUnit>('oz');

    if (!data) {
        return (
            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm">
                <div className="h-20 animate-pulse rounded-lg bg-white/5" />
            </div>
        );
    }

    const isPositive = data.ch >= 0;

    // Convert price based on unit
    const pricePerOz = convertPrice(data.price);
    const pricePerGram = pricePerOz / GRAMS_PER_OZ;
    const priceInUnit = unit === 'oz' ? pricePerOz : unit === 'gram' ? pricePerGram : pricePerGram * 1000;

    const convertedHigh = convertPrice(data.high_price);
    const convertedLow = convertPrice(data.low_price);

    return (
        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:border-gold-500/30 hover:bg-zinc-900/80">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold-500/10 blur-2xl transition-all group-hover:bg-gold-500/20" />

            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-500/20">
                            <span className="font-bold text-gold-400">{symbol}</span>
                        </div>
                        <div>
                            <h3 className="font-medium text-zinc-400">{name}</h3>
                            <p className="text-xs text-zinc-500">Live Price ({currency})</p>
                        </div>
                    </div>
                    <div className={cn(
                        "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                        isPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                    )}>
                        {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {data.chp.toFixed(2)}%
                    </div>
                </div>

                {/* Unit Selector */}
                <div className="flex gap-1 mb-3 bg-zinc-800/50 rounded-lg p-1">
                    {(['oz', 'gram', 'kg'] as WeightUnit[]).map((u) => (
                        <button
                            key={u}
                            onClick={() => setUnit(u)}
                            className={cn(
                                "flex-1 rounded-md px-2 py-1 text-xs font-medium transition-all",
                                unit === u
                                    ? "bg-gold-500 text-white"
                                    : "text-zinc-400 hover:text-white"
                            )}
                        >
                            {u}
                        </button>
                    ))}
                </div>

                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white tracking-tight">
                        {priceInUnit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-sm text-zinc-500">{currency}/{unit}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                    <div>
                        <p className="text-xs text-zinc-500">High (oz)</p>
                        <p className="text-sm font-medium text-zinc-300">{convertedHigh.toLocaleString('en-US')} {currency}</p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500">Low (oz)</p>
                        <p className="text-sm font-medium text-zinc-300">{convertedLow.toLocaleString('en-US')} {currency}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { PriceCard };
