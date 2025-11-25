'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/contexts/CurrencyContext';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CNY', 'INR'];

export function CurrencySelector() {
    const [isOpen, setIsOpen] = useState(false);
    const { currency, setCurrency } = useCurrency();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.currency-selector')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="relative currency-selector">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-400 transition-colors hover:bg-gold-500/20"
            >
                {currency}
                <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-24 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 p-1 shadow-xl backdrop-blur-xl z-50">
                    {CURRENCIES.map((curr) => (
                        <button
                            key={curr}
                            onClick={() => {
                                setCurrency(curr);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-white/5",
                                currency === curr ? "text-gold-400" : "text-zinc-400"
                            )}
                        >
                            {curr}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
