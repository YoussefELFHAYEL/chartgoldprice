import Link from 'next/link';
import { TrendingUp, Mail, Github, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-zinc-950">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                Chart<span className="text-gold-400">Gold</span>Price
                            </span>
                        </div>
                        <p className="text-sm text-zinc-400 max-w-md">
                            Your premium source for real-time gold and silver prices with advanced analytics,
                            historical charts, and market news. Track precious metal prices in multiple currencies.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/gold-price-today" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                    Gold Price Today
                                </Link>
                            </li>
                            <li>
                                <Link href="/silver-price-today" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                    Silver Price Today
                                </Link>
                            </li>
                            <li>
                                <Link href="/gold-price-calculator" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                    Gold Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                    Market News
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-zinc-500">
                        © {new Date().getFullYear()} ChartGoldPrice.com. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-zinc-400 hover:text-gold-400 transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-zinc-400 hover:text-gold-400 transition-colors">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-zinc-400 hover:text-gold-400 transition-colors">
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
