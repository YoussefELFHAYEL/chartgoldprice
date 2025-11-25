import { unstable_cache } from 'next/cache';

const API_KEY = 'fca_live_Ik8ZCBK09jDNbxQPqYHaD6q4WyEtJqu9Qw80hoPr';
const BASE_URL = 'https://api.freecurrencyapi.com/v1/latest';

export interface ExchangeRates {
    [currency: string]: number;
}

async function fetchExchangeRates(): Promise<ExchangeRates | null> {
    console.log('[CurrencyAPI] Fetching fresh exchange rates...');
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&base_currency=USD`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('[CurrencyAPI] Fetch failed:', error);
        return null;
    }
}

export const getExchangeRates = async () => {
    const getCachedRates = unstable_cache(
        async () => fetchExchangeRates(),
        ['exchange-rates-usd'],
        { revalidate: 10800 } // 3 hours in seconds
    );

    return getCachedRates();
};
