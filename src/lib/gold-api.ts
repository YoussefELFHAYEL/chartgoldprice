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
            next: { revalidate: 28800 } // 8 hours
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[GoldAPI] Error ${response.status} for ${symbol}:`, errorText);
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data: GoldPriceResponse = await response.json();
        console.log(`[GoldAPI] Successfully fetched ${symbol}:`, data.price);
        return data;
    } catch (error) {
        console.error(`[GoldAPI] Fetch failed for ${symbol}:`, error);
        return null;
    }
}

export const getMetalPrice = async (symbol: 'XAU' | 'XAG', currency: 'USD' = 'USD') => {
    // Each symbol gets its own cache key
    const getCachedPrice = unstable_cache(
        async () => fetchMetalPrice(symbol, currency),
        [`metal-price-${symbol}-${currency}`], // Unique cache key per symbol
        {
            revalidate: 28800, // 8 hours in seconds
            tags: [`price-${symbol}`] // Tag for cache invalidation
        }
    );

    return getCachedPrice();
};
