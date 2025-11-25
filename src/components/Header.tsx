'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Menu, X } from 'lucide-react';
import { CurrencySelector } from './CurrencySelector';
import { cn } from '@/lib/utils';

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">
                            Chart<span className="text-gold-400">Gold</span>Price
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                            <Link href="/" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                Dashboard
                            </Link>
                            <Link href="/gold-price-today" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                Gold Price
                            </Link>
                            <Link href="/silver-price-today" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                Silver Price
                            </Link>
                            <Link href="/gold-price-calculator" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                Calculator
                            </Link>
                            <Link href="/gold-price-history" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                History
                            </Link>
                            <Link href="/news" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                News
                            </Link>
                            <Link href="/blog" className="text-zinc-400 hover:text-gold-400 transition-colors">
                                Blog
                            </Link>
                        </nav>

                        <CurrencySelector />

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-zinc-400 hover:text-white"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <nav className="md:hidden pb-4 space-y-2">
                        <Link
                            href="/"
                            className="block py-2 text-zinc-400 hover:text-gold-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/gold-price-today"
                            className="block py-2 text-zinc-400 hover:text-gold-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Gold Price
                        </Link>
                        <Link
                            href="/silver-price-today"
                            className="block py-2 text-zinc-400 hover:text-gold-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Silver Price
                        </Link>
                        <Link
                            href="/gold-price-calculator"
                            className="block py-2 text-zinc-400 hover:text-gold-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Calculator
                        </Link>
                        <Link
                            href="/gold-price-history"
                            className="block py-2 text-zinc-400 hover:text-gold-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            History
                        </Link>
                        <Link
                            href="/news"
                            className="block py-2 text-zinc-400 hover:text-gold-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            News
                        </Link>
                        <Link
                            href="/blog"
                            className="block py-2 text-zinc-400 hover:text-gold-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
