import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';
import { beaconBotTap } from '@beacon/next/middleware';

// Next 16 renamed middleware.ts to proxy.ts; this is Beacon's AI-bot tap.
export function proxy(req: NextRequest, event: NextFetchEvent) {
  beaconBotTap(req, { event }); // only AI and search bots; never slows the page
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
