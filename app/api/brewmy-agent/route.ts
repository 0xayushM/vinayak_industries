import { NextRequest, NextResponse } from 'next/server';
import { checkSubmission, guardResponse } from '@/lib/spamGuard';

// Only the site's own lead forms may be relayed
const FORM_NAMES = new Set(['contact_form', 'moulding_inquiry', 'download_dialog']);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { form_name, data } = body;

    // Validate required fields
    if (!FORM_NAMES.has(form_name) || !data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Missing required fields: form_name and data' },
        { status: 400 }
      );
    }

    const { name, company, ...rest } = data as Record<string, unknown>;
    const verdict = checkSubmission(request, body, { texts: Object.values(rest), names: [name, company] });
    if (verdict.action !== 'allow') return guardResponse(verdict, request);

    // Get environment variables from server side (secure)
    const endpoint = process.env.BREW_MY_AGENT_ENDPOINT;
    const apiKey = process.env.BREW_MY_AGENT_API_KEY;

    if (!endpoint || !apiKey) {
      console.error('Missing BrewMyAgent environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Send to BrewMyAgent API
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        form_name,
        data
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('BrewMyAgent API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to submit to BrewMyAgent' },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    console.log('BrewMyAgent success:', responseData);

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      data: responseData 
    });

  } catch (error) {
    console.error('BrewMyAgent route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
