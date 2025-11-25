'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { WeightUnit, Karat, calculateGoldValue, KARAT_PURITY } from '@/lib/conversions';
import { cn } from '@/lib/utils';

interface GoldCalculatorProps {
    goldPricePerOz: number; // In USD
}

export function GoldCalculator({ goldPricePerOz }: GoldCalculatorProps) {
    const [weight, setWeight] = useState<string>('1');
    const [unit, setUnit] = useState<WeightUnit>('oz');
    const [karat, setKarat] = useState<Karat>('24K');
    const { currency, convertPrice } = useCurrency();

    const weightNum = parseFloat(weight) || 0;
    const valueUSD = calculateGoldValue(goldPricePerOz, weightNum, unit, karat);
    const valueInCurrency = convertPrice(valueUSD);

    return (
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
                <Calculator className="h-5 w-5 text-gold-500" />
                <h3 className="text-xl font-bold text-white">Gold Value Calculator</h3>
            </div>

            <div className="space-y-4">
                {/* Weight Input */}
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Weight</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            min="0"
                            step="0.01"
                            className="flex-1 rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-white placeholder-zinc-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                            placeholder="Enter weight"
                        />
                        <select
                            value={unit}
                            onChange={(e) => setUnit(e.target.value as WeightUnit)}
                            className="rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                        >
                            <option value="oz">oz</option>
                            <option value="gram">gram</option>
                            <option value="kg">kg</option>
                        </select>
                    </div>
                </div>

                {/* Karat Selector */}
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Purity (Karat)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {(['24K', '22K', '18K', '14K'] as Karat[]).map((k) => (
                            <button
                                key={k}
                                onClick={() => setKarat(k)}
                                className={cn(
                                    "rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                    karat === k
                                        ? "bg-gold-500 text-white shadow-lg"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                )}
                            >
                                {k}
                                <div className="text-xs opacity-70">
                                    {(KARAT_PURITY[k] * 100).toFixed(1)}%
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Result */}
                <div className="mt-6 rounded-lg bg-gradient-to-br from-gold-500/10 to-gold-600/10 border border-gold-500/20 p-4">
                    <p className="text-sm text-zinc-400 mb-1">Estimated Value</p>
                    <p className="text-3xl font-bold text-gold-400">
                        {valueInCurrency.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </p>
                    <p className="text-sm text-zinc-500 mt-1">{currency}</p>
                </div>

                {/* Info */}
                <div className="text-xs text-zinc-500 text-center">
                    Based on current gold price: ${goldPricePerOz.toFixed(2)}/oz
                </div>
            </div>
        </div>
    );
}
