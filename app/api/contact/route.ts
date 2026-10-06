import { NextRequest, NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/googleSheets';

// Sheet1 columns: Timestamp | Name | Company | Phone | Email | Country | Message | Source
const SOURCES = new Set(['contact_form', 'moulding_inquiry']);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, phone, email, country, message } = body;
    const source = SOURCES.has(body.source) ? body.source : 'contact_form';

    // The moulding dialog has no country field, so only the contact form requires it.
    if (!name || !phone || !message || (source === 'contact_form' && !country)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    // Leading apostrophe keeps phone numbers as text (stops Sheets turning them into 9.31E9)
    const values = [[timestamp, name, company || '', `'${String(phone).trim()}`, email || '', country || '', message, source]];

    await appendToSheet(values, 'Sheet1!A:H');

    return NextResponse.json({ success: true, message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}
