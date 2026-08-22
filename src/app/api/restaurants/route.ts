import { NextResponse } from 'next/server';
import { getRestaurants } from '@/lib/store';

export async function GET() {
  try {
    const restaurants = getRestaurants();
    return NextResponse.json({ success: true, data: restaurants });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}
