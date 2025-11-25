'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CurrencyContextType {
    currency: string;
    setCurrency: (currency: string) => void;
    rates: { [key: string]: number } | null;
    convertPrice: (priceInUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrency] = useState('USD');
    const [rates, setRates] = useState<{ [key: string]: number } | null>(null);

    useEffect(() => {
        async function fetchRates() {
            try {
                const res = await fetch('/api/currency');
                const data = await res.json();
                setRates(data);
            } catch (error) {
                console.error('Failed to fetch currency rates', error);
            }
        }
        fetchRates();
    }, []);

    const convertPrice = (priceInUSD: number): number => {
        if (currency === 'USD' || !rates) return priceInUSD;
        const rate = rates[currency];
        return rate ? priceInUSD * rate : priceInUSD;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, rates, convertPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
