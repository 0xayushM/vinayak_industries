import { NextRequest, NextResponse } from 'next/server';
import { sendProfileOutreachEmail } from '@/lib/outreachEmail';
import { checkSubmission, guardResponse } from '@/lib/spamGuard';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Without this check anyone could make the site send mail to any address
    const verdict = checkSubmission(request, body, { texts: [email], names: [name] });
    if (verdict.action !== 'allow') return guardResponse(verdict, request);

    if (typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email is required' },
        { status: 400 }
      );
    }

    await sendProfileOutreachEmail(email.trim(), typeof name === 'string' ? name : '');

    return NextResponse.json(
      { success: true, message: 'Email sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in send-profile-email API:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
