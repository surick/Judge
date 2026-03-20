import { searchLaws } from '@/lib/laws/searcher';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, limit } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const result = await searchLaws({
      query,
      limit: limit || 5,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Law search error:', error);
    return NextResponse.json(
      { error: 'Failed to search laws' },
      { status: 500 }
    );
  }
}
