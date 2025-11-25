import { NextResponse } from 'next/server';
import { getMetalPrice } from '@/lib/gold-api';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') as 'XAU' | 'XAG' | null;
    const currency = (searchParams.get('currency') as 'USD' | null) || 'USD';

    if (!symbol || !['XAU', 'XAG'].includes(symbol)) {
        return NextResponse.json({ error: 'Invalid symbol. Use XAU or XAG.' }, { status: 400 });
    }

    const data = await getMetalPrice(symbol, currency);

    if (!data) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }

    return NextResponse.json(data);
}
