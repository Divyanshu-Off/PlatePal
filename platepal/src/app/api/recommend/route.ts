import { NextResponse } from 'next/server';
import { getRecommendations } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { history, userRequest } = await request.json();
    const recommendations = await getRecommendations(history, userRequest);
    return NextResponse.json({ recommendations });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}
