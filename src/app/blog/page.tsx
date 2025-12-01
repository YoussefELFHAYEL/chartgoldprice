import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

export const metadata: Metadata = {
    title: 'Gold & Silver Market Blog | Price Analysis & Investment Insights',
    description: 'Expert articles on gold and silver prices, market analysis, investment strategies, and precious metals news. Stay informed about precious metals trends.',
    keywords: ['gold blog', 'silver blog', 'precious metals blog', 'gold investment', 'silver investment', 'gold market analysis'],
};

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, body}`;

const options = { next: { revalidate: 30 } };

async function getBlogPosts() {
    try {
        const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
        return posts;
    } catch (error) {
        console.error("Error fetching posts from Sanity:", error);
        return [];
    }
}

export default async function BlogPage() {
    const blogPosts = await getBlogPosts();

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-12 bg-zinc-900/50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <BookOpen className="h-8 w-8 text-gold-400" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Precious Metals Blog
                        </h1>
                    </div>
                    <p className="text-zinc-400 text-center max-w-3xl mx-auto">
                        Expert insights, market analysis, and educational content about gold, silver, and precious metals investing.
                    </p>
                </div>
            </section>

            <section className="py-12 bg-black">
                <div className="container mx-auto px-4">
                    {blogPosts.length === 0 ? (
                        <div className="text-center text-zinc-400">
                            <p className="text-lg">No blog posts yet. Create your first post in the Sanity Studio!</p>
                            <p className="text-sm mt-2">Run <code className="bg-zinc-800 px-2 py-1 rounded">npm run dev</code> in the studio-cgp directory to access the Studio.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {blogPosts.map((post) => {
                                // Extract first paragraph as excerpt
                                const excerpt = Array.isArray(post.body) && post.body.length > 0
                                    ? post.body[0]?.children?.[0]?.text || 'No preview available'
                                    : 'No preview available';

                                return (
                                    <article
                                        key={post._id}
                                        className="border border-white/10 rounded-lg overflow-hidden hover:border-gold-500/30 transition-all group"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">
                                                    Article
                                                </span>
                                                <div className="flex items-center gap-1 text-xs text-zinc-500">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </div>
                                            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                                                {post.title}
                                            </h2>
                                            <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                                                {excerpt}
                                            </p>
                                            <Link
                                                href={`/blog/${post.slug.current}`}
                                                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
                                            >
                                                Read More
                                                <TrendingUp className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <section className="py-12 bg-zinc-900/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
                        <p className="text-zinc-400 mb-6">
                            Subscribe to our newsletter for the latest gold and silver market insights, price alerts, and exclusive analysis.
                        </p>
                        <div className="flex gap-2 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-lg bg-zinc-800 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                            />
                            <button className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-lg transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
