import { NextResponse } from 'next/server';
import { getIngredients } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { dish } = await request.json();
    const ingredients = await getIngredients(dish);
    return NextResponse.json({ ingredients });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ingredients' }, { status: 500 });
  }
}
