import { Metadata } from 'next';
import { Newspaper } from 'lucide-react';
import { getNews } from '@/lib/news-api';

export const metadata: Metadata = {
    title: 'Gold Market News | Latest Updates & Analysis',
    description: 'Stay updated with the latest gold and precious metals market news, analysis, and insights.',
};

export default async function NewsPage() {
    const news = await getNews();

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                    <Newspaper className="h-8 w-8 text-gold-500" />
                    <h1 className="text-4xl font-bold text-white">Market News</h1>
                </div>

                {!news || news.length === 0 ? (
                    <p className="text-zinc-500 text-center py-12">No news available at the moment.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden transition-all hover:border-gold-500/30 hover:bg-zinc-900"
                            >
                                {item.thumbnail && (
                                    <div className="h-48 w-full overflow-hidden">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
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
                                    <p className="text-sm text-zinc-400 line-clamp-3">{item.snippet}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
