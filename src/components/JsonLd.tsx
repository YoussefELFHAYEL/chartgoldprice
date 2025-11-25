'use client';

import { useCurrency } from '@/contexts/CurrencyContext';

interface JsonLdProps {
    goldPrice?: number;
    silverPrice?: number;
}

export function JsonLd({ goldPrice, silverPrice }: JsonLdProps = {}) {
    const { currency } = useCurrency();

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ChartGoldPrice',
        url: 'https://chartgoldprice.com',
        logo: 'https://chartgoldprice.com/favicon.png',
        description: 'Real-time gold and silver price charts with multi-currency support and market analysis',
        sameAs: [
            'https://twitter.com/chartgoldprice',
            'https://github.com/chartgoldprice',
        ],
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: 'https://chartgoldprice.com',
        name: 'ChartGoldPrice',
        description: 'Track live gold and silver prices with interactive charts',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://chartgoldprice.com/?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };

    const financialServiceSchema = {
        '@context': 'https://schema.org',
        '@type': 'FinancialProduct',
        name: 'Gold Price Tracker',
        description: 'Real-time gold and silver price tracking with historical charts and analysis',
        provider: {
            '@type': 'Organization',
            name: 'ChartGoldPrice',
        },
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'What is the current gold price?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: goldPrice
                        ? `The current gold price is ${goldPrice.toFixed(2)} USD per troy ounce. You can view real-time prices in multiple currencies on our dashboard.`
                        : 'View real-time gold prices in multiple currencies on our dashboard with live updates.',
                },
            },
            {
                '@type': 'Question',
                name: 'How often are gold prices updated?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Gold prices are cached and updated every 8 hours to provide you with near real-time market data while ensuring optimal performance.',
                },
            },
            {
                '@type': 'Question',
                name: 'Can I view gold prices in different currencies?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! ChartGoldPrice supports multiple currencies including USD, EUR, GBP, JPY, CAD, AUD, CNY, and INR. Simply use the currency selector in the header.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is a gold calculator?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Our gold calculator helps you estimate the value of your gold based on weight (oz, grams, kg) and purity (24K, 22K, 18K, 14K). It uses real-time gold prices for accurate valuations.',
                },
            },
        ],
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://chartgoldprice.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Gold Chart',
                item: 'https://chartgoldprice.com/charts/gold',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Silver Chart',
                item: 'https://chartgoldprice.com/charts/silver',
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(financialServiceSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
        </>
    );
}
