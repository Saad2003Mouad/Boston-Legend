import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendQuoteRequestNotification } from '@/lib/email';

// Simple in-memory rate limiter (resets on server restart/cold start)
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT = 5; // Max 5 requests
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRate = rateLimitMap.get(ip);
  if (!userRate) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  if (now - userRate.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  if (userRate.count >= RATE_LIMIT) {
    return false;
  }
  userRate.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();

    // Basic validation
    if (!body.firstName || !body.email || !body.phone || !body.eventType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: `${body.firstName} ${body.lastName || ''}`.trim(),
        email: body.email,
        phone: body.phone,
        eventType: body.eventType,
        eventDate: body.date ? new Date(body.date) : null,
        guestCount: body.guestCount ? parseInt(body.guestCount) : null,
        notes: body.notes || null,
        source: 'QUOTE_FORM',
        status: 'NEW',
      },
    });

    try {
      await sendQuoteRequestNotification(inquiry);
    } catch (e) {
      console.error("Failed to send quote notification", e);
    }

    return NextResponse.json({ success: true, quoteId: inquiry.id });
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
