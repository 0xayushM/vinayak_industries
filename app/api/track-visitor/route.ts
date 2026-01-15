import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get IP address from headers
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Get referer
    const referer = request.headers.get('referer') || 'direct';
    
    const { data, error } = await supabase
      .from('visitor_tracking')
      .insert([
        {
          ip_address: ip,
          user_agent: userAgent,
          referer: referer,
          page_url: body.pageUrl || '',
          country: body.country || null,
          city: body.city || null,
          region: body.region || null,
          latitude: body.latitude || null,
          longitude: body.longitude || null,
          timezone: body.timezone || null,
          browser: body.browser || null,
          os: body.os || null,
          device_type: body.deviceType || null,
          screen_resolution: body.screenResolution || null,
          language: body.language || null,
          visited_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error tracking visitor:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in track-visitor API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
