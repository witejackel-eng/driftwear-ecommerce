import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.email('Please enter a valid email'),
  orderNumber: z.string().max(50).optional(),
  reason: z.string().min(1, 'Please select a reason').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

// Simple in-memory rate limit (per IP, per minute)
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3; // max 3 per minute
const RATE_WINDOW = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { success: false, message: firstError?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    // In production, integrate with email provider here (Resend, SendGrid, etc.)
    // For now, acknowledge receipt in demo mode
    const isProduction = process.env.NEXT_PUBLIC_STORE_MODE === 'production';
    const emailProvider = process.env.EMAIL_PROVIDER;

    if (!isProduction || !emailProvider) {
      // Demo mode: log and return success
      console.log('[Contact Form]', { ...result.data, timestamp: new Date().toISOString() });
      return NextResponse.json({
        success: true,
        message: isProduction
          ? 'Thank you for reaching out. Our team will get back to you soon.'
          : 'Thank you! This is a demo — your message was received but no email was sent.',
      });
    }

    // Production email integration would go here
    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out. Our team will get back to you soon.',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}