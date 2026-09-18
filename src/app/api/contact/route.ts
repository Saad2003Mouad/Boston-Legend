import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendContactMessageNotification } from '@/lib/email';
import { isHuman } from '@/lib/recaptcha';

// Simple name sanity check — rejects obvious bot-generated strings
// (all-consonants, random char sequences, etc.)
function looksLikeRealName(name: string): boolean {
  if (!name || name.length < 2 || name.length > 80) return false;
  // Reject if more than 60% are consecutive consonants (bot pattern)
  const consonants = (name.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
  if (consonants / name.length > 0.75) return false;
  // Reject if it contains numbers or special characters mixed oddly
  if (/\d/.test(name) && /[a-z]/i.test(name) && name.length > 12) return false;
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ── Honeypot check ──────────────────────────────────────────
    // Bots fill every field; real users never see/fill this hidden field.
    if (body._gotcha) {
      console.warn('[Contact] Honeypot triggered — rejecting bot submission');
      // Return 200 so bots think it worked
      return NextResponse.json({ success: true, messageId: 'msg-' + Date.now() });
    }

    // ── reCAPTCHA Enterprise verification ───────────────────────
    const recaptchaToken = body.recaptchaToken;
    const human = await isHuman(recaptchaToken || '', 'CONTACT_FORM');
    if (!human) {
      console.warn('[Contact] reCAPTCHA score too low — rejected');
      return NextResponse.json({ error: 'Security check failed. Please try again.' }, { status: 400 });
    }

    // ── Field validation ────────────────────────────────────────
    if (!body.firstName || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Reject suspiciously bot-like names
    const fullName = `${body.firstName} ${body.lastName || ''}`.trim();
    if (!looksLikeRealName(body.firstName)) {
      console.warn(`[Contact] Suspicious name rejected: "${body.firstName}"`);
      return NextResponse.json({ success: true, messageId: 'msg-' + Date.now() }); // Silent reject
    }

    // ── Rate limit: max 3 messages per email per hour ────────────
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = await prisma.inquiry.count({
      where: {
        email: body.email,
        createdAt: { gte: oneHourAgo },
        source: 'CONTACT_FORM',
      },
    });
    if (recentCount >= 3) {
      console.warn(`[Contact] Rate limit hit for ${body.email}`);
      return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
    }

    // ── Save to database ────────────────────────────────────────
    await prisma.inquiry.create({
      data: {
        name: fullName,
        email: body.email,
        phone: body.phone || null,
        eventType: 'General Inquiry',
        notes: body.message,
        source: 'CONTACT_FORM',
        status: 'OPEN',
      },
    });

    // ── Send admin notification ─────────────────────────────────
    await sendContactMessageNotification({
      name: fullName,
      email: body.email,
      message: body.message,
    });

    return NextResponse.json({ success: true, messageId: 'msg-' + Date.now() });
  } catch (error) {
    console.error('Error processing contact message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
