import { unstable_cache } from 'next/cache';

const API_KEY = '7bd3fa1bd4a4cbe1452cee498d65f1a4669dd235b5f021bca1e406ae917ca727';
const BASE_URL = 'https://serpapi.com/search.json';

export interface NewsItem {
    position: number;
    link: string;
    title: string;
    source: string;
    date: string;
    published_at?: string;
    snippet: string;
    thumbnail?: string;
}

async function fetchNews(): Promise<NewsItem[] | null> {
    console.log('[NewsAPI] Fetching fresh news...');
    try {
        const params = new URLSearchParams({
            api_key: API_KEY,
            engine: 'google',
            q: 'gold news',
            location: 'United States',
            google_domain: 'google.com',
            gl: 'us',
            hl: 'en',
            tbm: 'nws'
        });

        const response = await fetch(`${BASE_URL}?${params.toString()}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const newsResults = data.news_results || [];

        // Sort by published_at from newest to oldest
        return newsResults.sort((a: NewsItem, b: NewsItem) => {
            const dateA = new Date(a.published_at || a.date).getTime();
            const dateB = new Date(b.published_at || b.date).getTime();
            return dateB - dateA;
        });
    } catch (error) {
        console.error('[NewsAPI] Fetch failed:', error);
        return null;
    }
}

export const getNews = async () => {
    const getCachedNews = unstable_cache(
        async () => fetchNews(),
        ['news-gold-us'],
        { revalidate: 10800 } // 3 hours in seconds
    );

    return getCachedNews();
};
