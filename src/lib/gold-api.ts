import { unstable_cache } from 'next/cache';
import { GoldPriceResponse } from '@/types';

const API_KEY = 'goldapi-n4hsmi9298tt-io'; // In production, use process.env.GOLD_API_KEY
const BASE_URL = 'https://www.goldapi.io/api';

async function fetchMetalPrice(symbol: 'XAU' | 'XAG', currency: 'USD' = 'USD'): Promise<GoldPriceResponse | null> {
    console.log(`[GoldAPI] Fetching fresh data for ${symbol}/${currency}...`);
    try {
        const response = await fetch(`${BASE_URL}/${symbol}/${currency}`, {
            method: 'GET',
            headers: {
                'x-access-token': API_KEY,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data: GoldPriceResponse = await response.json();
        return data;
    } catch (error) {
        console.error('[GoldAPI] Fetch failed:', error);
        return null;
    }
}

export const getMetalPrice = async (symbol: 'XAU' | 'XAG', currency: 'USD' = 'USD') => {
    const getCachedPrice = unstable_cache(
        async () => fetchMetalPrice(symbol, currency),
        [`price-${symbol}-${currency}`],
        { revalidate: 28800 } // 8 hours in seconds
    );

    return getCachedPrice();
};
