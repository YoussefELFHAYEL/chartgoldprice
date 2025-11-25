'use client';

import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getNews, NewsItem } from '@/lib/news-api';

export function NewsSection() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNews() {
            // Since getNews is a server action (or server-side function), we need to call it via an API route or Server Component
            // For simplicity in this client component, we'll fetch from a new API route we'll create
            try {
                const res = await fetch('/api/news');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setNews(data);
                }
            } catch (error) {
                console.error('Failed to load news', error);
            } finally {
                setLoading(false);
            }
        }
        loadNews();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, news.length - 2));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.max(1, news.length - 2)) % Math.max(1, news.length - 2));
    };

    if (loading) {
        return <div className="py-16 text-center text-zinc-500">Loading News...</div>;
    }

    return (
        <section className="py-16 bg-black">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <Newspaper className="h-6 w-6 text-gold-500" />
                        <h2 className="text-2xl font-bold text-white">Market News</h2>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={prevSlide} className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-gold-400">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button onClick={nextSlide} className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-gold-400">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <div
                        className="flex gap-6 transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentIndex * 350}px)` }}
                    >
                        {news.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-w-[300px] md:min-w-[350px] group block rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden transition-all hover:border-gold-500/30 hover:bg-zinc-900"
                            >
                                {item.thumbnail && (
                                    <div className="h-40 w-full overflow-hidden">
                                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-medium text-gold-500">{item.source}</span>
                                        <span className="text-xs text-zinc-500">{item.date}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400 line-clamp-3">
                                        {item.snippet}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/news" className="text-sm text-gold-400 hover:text-gold-300 inline-flex items-center gap-1">
                        View All News <ExternalLink className="h-3 w-3" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
