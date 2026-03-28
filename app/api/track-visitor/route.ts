import { NextRequest, NextResponse } from 'next/server';
import { appendVisitorTracking } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'direct';
    const timestamp = new Date().toISOString();
    
    const values = [[
      timestamp,
      ip,
      userAgent,
      referer,
      body.pageUrl || '',
      body.country || '',
      body.city || '',
      body.region || '',
      body.latitude?.toString() || '',
      body.longitude?.toString() || '',
      body.timezone || '',
      body.browser || '',
      body.os || '',
      body.deviceType || '',
      body.screenResolution || '',
      body.language || ''
    ]];

    await appendVisitorTracking(values);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in track-visitor API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
