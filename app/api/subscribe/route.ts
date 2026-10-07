import { NextRequest, NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/googleSheets';
import { checkSubmission, guardResponse } from '@/lib/spamGuard';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    const verdict = checkSubmission(request, body, { texts: [email, phone], names: [name] });
    if (verdict.action !== 'allow') return guardResponse(verdict, request);

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    // Leading apostrophe keeps phone numbers as text in Sheets
    const values = [[timestamp, name, email, `'${String(phone).trim()}`, 'Company Presentation Download']];

    await appendToSheet(values, 'Subscribers!A:E');

    return NextResponse.json(
      { success: true, message: 'Subscription successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in subscribe API:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
