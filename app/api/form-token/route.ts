import { NextResponse } from 'next/server';
import { issueFormToken } from '@/lib/spamGuard';

export const dynamic = 'force-dynamic';

// Signed, timestamped token a form must present when it submits. See lib/spamGuard.ts.
export async function GET() {
  return NextResponse.json({ token: issueFormToken() }, { headers: { 'Cache-Control': 'no-store' } });
}
