import { NextResponse } from 'next/server';
import { upvoteRestaurant } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Restaurant id required' }, { status: 400 });
    }
    const result = upvoteRestaurant(id);
    if (!result.success) {
      return NextResponse.json({ success: false, error: 'Restaurant not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, upvotes: result.upvotes });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to upvote' }, { status: 500 });
  }
}
