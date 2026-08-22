import { NextResponse } from 'next/server';
import { addSubmission, getSubmissionsQueue } from '@/lib/store';
import { SubmissionForm } from '@/types';

export async function GET() {
  try {
    const queue = getSubmissionsQueue();
    return NextResponse.json({ success: true, data: queue });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmissionForm;
    if (!body.name || !body.category || !body.neighborhood) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (name, category, neighborhood)' },
        { status: 400 }
      );
    }
    const created = addSubmission(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process submission' }, { status: 500 });
  }
}
