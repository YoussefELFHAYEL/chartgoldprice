import { NextResponse } from 'next/server';
import { getNews } from '@/lib/news-api';

export async function GET() {
    const news = await getNews();
    return NextResponse.json(news || []);
}
