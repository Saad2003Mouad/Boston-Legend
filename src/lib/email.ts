import nodemailer from 'nodemailer';
import { prisma } from "./prisma";
import { BUSINESS_CONFIG } from "./config";

// ─── BRAND CONSTANTS & DESIGN SYSTEM ──────────────────────────────
const BRAND_PRIMARY   = "#1E293B"; // Slate navy - calm, professional
const BRAND_ACCENT    = "#EA580C"; // Warm terracotta / burnt orange - subtle & premium
const BRAND_BG        = "#F8FAFC"; // Soft neutral slate background
const BRAND_CARD_BG   = "#FFFFFF";
const BRAND_BORDER    = "#E2E8F0";
const BRAND_TEXT_MAIN = "#0F172A";
const BRAND_TEXT_MUTED= "#64748B";

const SITE_URL    = BUSINESS_CONFIG.domain || "https://americanlegendicecreamtruck.com";
const LOGO_URL    = `${SITE_URL}/images/logo_new.png`; 
const SENDER_EMAIL = BUSINESS_CONFIG.contact.email || 'info@americanlegendicecreamtruck.com';
const ADMIN_EMAIL  = process.env.ADMIN_EMAIL || SENDER_EMAIL;
const REPLY_TO     = SENDER_EMAIL;

const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.office365.com",
  port: smtpPort,
  secure: false, // STARTTLS for port 587
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export function getAdminRecipients(): string[] {
  const recipients = new Set<string>([SENDER_EMAIL]);
  if (process.env.ADMIN_EMAIL) {
    recipients.add(process.env.ADMIN_EMAIL);
  }
  return Array.from(recipients);
}

// ─── REFINED, CALM BASE TEMPLATE (NO CLUTTER) ───────────────────────
function baseTemplate(content: string, title: string) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; }
    body, table, td, p, a { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    img { border:0; display:block; line-height:100%; outline:none; text-decoration:none; }
    a { color: inherit; }
    @media only screen and (max-width: 600px) {
      .wrapper  { padding: 12px 8px !important; }
      .card     { border-radius: 12px !important; }
      .hdr      { padding: 24px 16px !important; }
      .body     { padding: 20px 16px !important; }
      .ftr      { padding: 20px 16px !important; }
      h2.title  { font-size: 20px !important; }
      .otp-code { font-size: 28px !important; letter-spacing: 6px !important; }
      .btn      { padding: 14px 20px !important; font-size: 14px !important; }
      .data-table td { font-size: 13px !important; padding: 8px 6px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${BRAND_BG};-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="wrapper" style="padding:32px 16px;background:${BRAND_BG};">
    <tr><td align="center">

      <!-- Card Container -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="card" style="max-width:560px;width:100%;background:${BRAND_CARD_BG};border-radius:16px;border:1px solid ${BRAND_BORDER};overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.04);">

        <!-- Header -->
        <tr>
          <td class="hdr" style="padding:28px 32px 20px;text-align:center;border-bottom:1px solid ${BRAND_BORDER};">
            <a href="${SITE_URL}" target="_blank" style="text-decoration:none;display:inline-block;">
              <img src="${LOGO_URL}" alt="${BUSINESS_CONFIG.name}" style="width:100%;max-width:240px;height:auto;margin:0 auto;display:block;"/>
            </a>
          </td>
        </tr>

        <!-- Main Body -->
        <tr>
          <td class="body" style="padding:32px 32px 24px;color:${BRAND_TEXT_MAIN};font-size:15px;line-height:1.6;">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="ftr" style="background:#FAFBFD;padding:24px 32px;text-align:center;border-top:1px solid ${BRAND_BORDER};">
            <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:${BRAND_PRIMARY};">${BUSINESS_CONFIG.legalName}</p>
            <p style="margin:0 0 6px;font-size:12px;color:${BRAND_TEXT_MUTED};">
              ${BUSINESS_CONFIG.description.split('.')[0]}. &middot; 
              <a href="tel:${BUSINESS_CONFIG.contact.phone1Formatted}" style="color:${BRAND_ACCENT};font-weight:600;text-decoration:none;">${BUSINESS_CONFIG.contact.phone1}</a>
            </p>
            <p style="margin:0 0 8px;font-size:12px;color:${BRAND_TEXT_MUTED};">
              ${BUSINESS_CONFIG.address.display}
            </p>
            <p style="margin:0;font-size:11px;color:#94A3B8;">&copy; ${new Date().getFullYear()} ${BUSINESS_CONFIG.legalName}. All rights reserved.</p>
          </td>
        </tr>

      </table>

    </td></tr>
  </table>
</body>
</html>`;
}

import { generateIcsEvent } from './ics';

// ─── CORE SEND WITH RETRY ──────────────────────────────────────
export async function sendEmail({
  to,
  subject,
  html,
  title,
  replyTo,
  icsContent,
  icsFilename,
}: {
  to: string | string[];
  subject: string;
  html: string;
  title?: string;
  replyTo?: string;
  icsContent?: string;
  icsFilename?: string;
}) {
  const MAX_RETRIES = 2;
  const RETRY_DELAY_MS = 2000;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn(`[Email] ⚠️ SMTP credentials not set. Skipped sending "${subject}" to ${JSON.stringify(to)}`);
    return false;
  }

  const recipients = Array.from(new Set((Array.isArray(to) ? to : [to]).filter(Boolean)));

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const mailOptions: any = {
        from: `"${BUSINESS_CONFIG.name}" <${SENDER_EMAIL}>`,
        replyTo: replyTo || REPLY_TO,
        to: recipients,
        subject: subject,
        html: baseTemplate(html, title || subject),
      };

      if (icsContent) {
        mailOptions.icalEvent = {
          filename: icsFilename || 'event.ics',
          method: 'REQUEST',
          content: icsContent,
        };
        mailOptions.alternatives = [
          {
            contentType: 'text/calendar; charset="utf-8"; method=REQUEST',
            content: icsContent,
          },
        ];
        mailOptions.attachments = [
          {
            filename: icsFilename || 'event.ics',
            content: icsContent,
            contentType: 'application/ics',
          },
        ];
      }

      const info = await transporter.sendMail(mailOptions);

      console.log(`[Email] ✅ Sent "${subject}" → ${to} (Message-ID: ${info.messageId})`);
      return true;
    } catch (err: any) {
      console.error(`[Email] ❌ Attempt ${attempt}/${MAX_RETRIES} failed for "${subject}" → ${to}:`, err.message);
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }
  console.error(`[Email] 🔴 All ${MAX_RETRIES} attempts exhausted for "${subject}" → ${to}`);
  return false;
}

// ─── 1. OTP VERIFICATION EMAIL ──────────────────────────────────
export async function sendOtpEmail(
  to: string,
  otp: string,
  firstName?: string,
  purpose: "BOOKING" | "PORTAL" | "PASSWORD_RESET" | "EMAIL_CHANGE" | "SETTINGS" | "STAFF_INVITE" | "GENERAL" = "GENERAL"
) {
  const purposeLabels: Record<string, string> = {
    BOOKING: "Booking Verification",
    PORTAL: "Booking Portal Access",
    PASSWORD_RESET: "Password Reset",
    EMAIL_CHANGE: "Email Change Verification",
    SETTINGS: "Security Verification",
    STAFF_INVITE: "Staff Account Setup",
    GENERAL: "Verification",
  };
  const label = purposeLabels[purpose] || "Verification";
  const TTL = 10;

  const html = `
    <h2 style="margin:0 0 12px;color:${BRAND_PRIMARY};font-size:22px;font-weight:700;">Hello ${firstName ?? "there"},</h2>
    <p style="margin:0 0 24px;color:${BRAND_TEXT_MUTED};font-size:15px;line-height:1.5;">
      Please use the single-use verification code below to complete your <strong>${label}</strong>:
    </p>

    <div style="background:#F8FAFC;border:1px solid ${BRAND_BORDER};border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
      <p style="margin:0 0 6px;color:${BRAND_TEXT_MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">${label} Code</p>
      <p style="margin:0 0 6px;font-size:32px;font-weight:800;letter-spacing:10px;color:${BRAND_PRIMARY};font-family:ui-monospace,SFMono-Regular,Consolas,monospace;">${otp}</p>
      <p style="margin:0;color:#94A3B8;font-size:12px;">Expires in ${TTL} minutes</p>
    </div>

    <div style="background:#FAFBFD;border-left:3px solid #CBD5E1;border-radius:4px;padding:12px 16px;">
      <p style="margin:0;color:${BRAND_TEXT_MUTED};font-size:13px;line-height:1.5;">
        <strong>Security note:</strong> American Legend will never ask for this code by phone or social media. If you did not make this request, you can safely ignore this email.
      </p>
    </div>
  `;

  return sendEmail({
    to,
    subject: `${otp} — Your ${label} Code | ${BUSINESS_CONFIG.name}`,
    html,
    title: `${label} Code`,
  });
}

// ─── 2. WELCOME EMAIL ───────────────────────────────────────────
export async function sendWelcomeEmail(to: string, firstName: string) {
  const html = `
    <h2 style="margin:0 0 12px;color:${BRAND_PRIMARY};font-size:22px;font-weight:700;">Welcome, ${firstName}</h2>
    <p style="margin:0 0 20px;color:${BRAND_TEXT_MUTED};font-size:15px;line-height:1.6;">
      Thank you for registering with <strong>${BUSINESS_CONFIG.name}</strong>. Your account is verified and ready.
    </p>

    <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
      <p style="margin:0;color:#166534;font-size:14px;font-weight:600;">✓ Email successfully confirmed. You can now manage your bookings online.</p>
    </div>

    <p style="color:${BRAND_TEXT_MUTED};font-size:14px;line-height:1.6;margin:0 0 24px;">
      Planning an upcoming party, corporate event, or family celebration? View our packages and reserve your ice cream truck in just a few minutes.
    </p>

    <div style="text-align:center;margin-bottom:28px;">
      <a href="${SITE_URL}/packages" class="btn" style="display:inline-block;background:${BRAND_PRIMARY};color:#FFFFFF;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Browse Packages &rarr;</a>
    </div>

    <p style="text-align:center;font-size:13px;color:${BRAND_TEXT_MUTED};margin:0;">
      Questions or custom inquiries? Call <a href="tel:${BUSINESS_CONFIG.contact.phone1Formatted}" style="color:${BRAND_ACCENT};font-weight:600;text-decoration:none;">${BUSINESS_CONFIG.contact.phone1}</a>.
    </p>
  `;
  return sendEmail({ to, subject: `Welcome to ${BUSINESS_CONFIG.name}`, html, title: "Welcome" });
}

// ─── 3. PASSWORD RESET EMAIL ───────────────────────────────────
export async function sendForgotPasswordEmail(to: string, otp: string, firstName?: string) {
  const TTL = 10;
  const html = `
    <h2 style="margin:0 0 12px;color:${BRAND_PRIMARY};font-size:22px;font-weight:700;">Password Reset Request</h2>
    <p style="margin:0 0 20px;color:${BRAND_TEXT_MUTED};font-size:15px;line-height:1.5;">
      Hello ${firstName ?? "there"}, we received a request to reset your password. Use the verification code below:
    </p>

    <div style="background:#F8FAFC;border:1px solid ${BRAND_BORDER};border-radius:12px;padding:24px;text-align:center;margin:20px 0;">
      <p style="margin:0 0 6px;color:${BRAND_TEXT_MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Reset Code</p>
      <p style="margin:0 0 6px;font-size:32px;font-weight:800;letter-spacing:10px;color:${BRAND_PRIMARY};font-family:ui-monospace,SFMono-Regular,Consolas,monospace;">${otp}</p>
      <p style="margin:0;color:#94A3B8;font-size:12px;">Expires in ${TTL} minutes</p>
    </div>

    <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:12px 16px;margin-bottom:20px;">
      <p style="margin:0;color:#991B1B;font-size:13px;line-height:1.5;">
        If you did not request this reset, your account is secure and you can safely ignore this email.
      </p>
    </div>

    <p style="color:${BRAND_TEXT_MUTED};font-size:13px;text-align:center;margin:0;">
      Need assistance? Contact our team at <a href="tel:${BUSINESS_CONFIG.contact.phone1Formatted}" style="color:${BRAND_PRIMARY};font-weight:600;">${BUSINESS_CONFIG.contact.phone1}</a>.
    </p>
  `;
  return sendEmail({ to, subject: `${otp} — Password Reset Code | ${BUSINESS_CONFIG.name}`, html, title: "Password Reset" });
}

// ─── 4. STAFF INVITATION EMAIL ─────────────────────────────────
export async function sendStaffInviteEmail(to: string, inviterName: string, inviteToken: string, role: string) {
  const acceptUrl = `${SITE_URL}/admin/accept-invite?token=${inviteToken}`;

  const html = `
    <h2 style="margin:0 0 12px;color:${BRAND_PRIMARY};font-size:22px;font-weight:700;">Team Invitation</h2>
    <p style="margin:0 0 20px;color:${BRAND_TEXT_MUTED};font-size:15px;line-height:1.6;">
      <strong>${inviterName}</strong> has invited you to join the <strong>${BUSINESS_CONFIG.name}</strong> administration portal as <strong>${role}</strong>.
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${acceptUrl}" class="btn" style="display:inline-block;background:${BRAND_PRIMARY};color:#FFFFFF;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Accept Invitation &rarr;</a>
    </div>

    <div style="background:#F8FAFC;border:1px solid ${BRAND_BORDER};border-radius:8px;padding:14px 16px;">
      <p style="margin:0;color:${BRAND_TEXT_MUTED};font-size:12px;line-height:1.5;">
        If the button does not work, copy and paste this link in your browser:<br/>
        <span style="color:${BRAND_PRIMARY};word-break:break-all;">${acceptUrl}</span>
      </p>
    </div>
  `;
  return sendEmail({ to, subject: `You've been invited to join ${BUSINESS_CONFIG.name} Staff`, html, title: "Staff Invitation" });
}

// ─── 5. SENSITIVE ACTION OTP EMAIL ─────────────────────────────
export async function sendSensitiveActionOtpEmail(to: string, otp: string, action: string, userName?: string) {
  const TTL = 5;
  const html = `
    <h2 style="margin:0 0 12px;color:${BRAND_PRIMARY};font-size:22px;font-weight:700;">Security Verification Required</h2>
    <p style="margin:0 0 20px;color:${BRAND_TEXT_MUTED};font-size:15px;line-height:1.5;">
      Hello ${userName ?? "Admin"}, a sensitive administrative action requires your verification:
    </p>

    <div style="background:#F8FAFC;border:1px solid ${BRAND_BORDER};border-radius:8px;padding:14px 18px;margin-bottom:20px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;color:${BRAND_TEXT_MUTED};">Action</p>
      <p style="margin:0;color:${BRAND_PRIMARY};font-size:14px;font-weight:600;">${action}</p>
    </div>

    <div style="background:#F8FAFC;border:1px solid ${BRAND_BORDER};border-radius:12px;padding:20px;text-align:center;margin-bottom:20px;">
      <p style="margin:0 0 6px;color:${BRAND_TEXT_MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Verification Code</p>
      <p style="margin:0 0 6px;font-size:32px;font-weight:800;letter-spacing:10px;color:${BRAND_PRIMARY};font-family:ui-monospace,SFMono-Regular,Consolas,monospace;">${otp}</p>
      <p style="margin:0;color:#94A3B8;font-size:12px;">Expires in ${TTL} minutes &middot; Single use</p>
    </div>

    <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:12px 16px;">
      <p style="margin:0;color:#991B1B;font-size:12px;line-height:1.5;">
        If you did not initiate this action, please secure your account immediately.
      </p>
    </div>
  `;
  return sendEmail({ to, subject: `${otp} — Security Code | ${BUSINESS_CONFIG.name}`, html, title: "Security Verification" });
}

// ─── BOOKING DETAIL FORMATTER (CLEAN & MINIMAL) ─────────────────
function formatBookingDetailsHtml(booking: any) {
  if (!booking) return "";
  
  const formatEnDate = (d: Date) => {
    if (!d) return "";
    try {
      const dateObj = new Date(d);
      return dateObj.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return String(d); }
  };

  const quote = booking.quote;
  const pkg = booking.package;

  let breakdown: any = {};
  try {
    if (quote?.snapshotJson) {
      breakdown = JSON.parse(quote.snapshotJson);
    }
  } catch (e) {
    console.error("Failed to parse quote snapshot JSON in email:", e);
  }

  const pkgDurationMins = breakdown.includedServiceMins ?? ((pkg as any)?.durationMins ?? pkg?.includedMinutes ?? booking.durationMins);
  const pkgServings = breakdown.includedGuests ?? (pkg?.servings ?? 50);
  const extraPiecePrice = breakdown.extraGuestPrice ?? ((pkg as any)?.extraGuestPrice ?? pkg?.extraPiecePrice ?? 5);
  const extraGuestsCount = breakdown.additionalGuests ?? Math.max(0, booking.guests - pkgServings);
  const extraGuestsFee = breakdown.additionalGuestsFee ?? (extraGuestsCount * extraPiecePrice);
  const distanceMiles = breakdown.distanceMiles ?? (quote?.distanceMiles ?? 0);
  const travelFee = breakdown.travelFee ?? (quote?.travelFee ?? 0);
  const overtimeFee = quote?.overtimeFee ?? 0;
  const extraServiceFee = breakdown.additionalServiceFee ?? (quote?.additionalServiceFee ?? (booking.extraServiceFee || 0));
  const extraServiceMins = breakdown.additionalServiceMins ?? (quote?.extraServiceMins ?? (booking.extraServiceMins || 0));
  const basePrice = breakdown.packagePrice ?? (quote?.basePrice ?? (booking.totalAmount - travelFee - overtimeFee - extraServiceFee - extraGuestsFee));
  const additionalStopsFee = breakdown.additionalStopsFee ?? (booking.additionalStopsFee || 0);
  const estimatedTotal = breakdown.estimatedTotal ?? booking.totalAmount;
  const additionalVehicleSetupFee = breakdown.additionalVehicleSetupFee ?? 0;
  const weekendFee = breakdown.weekendFee ?? 0;

  return `
    <!-- Event Details Table -->
    <table width="100%" cellpadding="10" cellspacing="0" style="margin:20px 0;font-size:14px;border-collapse:collapse;background:#F8FAFC;border:1px solid ${BRAND_BORDER};border-radius:8px;">
      <tr>
        <td style="color:${BRAND_TEXT_MUTED};border-bottom:1px solid ${BRAND_BORDER};font-weight:600;width:38%;">Event Date &amp; Time</td>
        <td style="color:${BRAND_PRIMARY};border-bottom:1px solid ${BRAND_BORDER};font-weight:700;">${formatEnDate(booking.eventDate)} at ${booking.startTime}</td>
      </tr>
      <tr>
        <td style="color:${BRAND_TEXT_MUTED};border-bottom:1px solid ${BRAND_BORDER};font-weight:600;">Package</td>
        <td style="color:${BRAND_PRIMARY};border-bottom:1px solid ${BRAND_BORDER};font-weight:700;">${pkg?.name || 'Custom Package'}</td>
      </tr>
      <tr>
        <td style="color:${BRAND_TEXT_MUTED};border-bottom:1px solid ${BRAND_BORDER};font-weight:600;">Included Guests / Time</td>
        <td style="color:${BRAND_PRIMARY};border-bottom:1px solid ${BRAND_BORDER};font-weight:600;">${pkgServings} guests &middot; ${pkgDurationMins} minutes</td>
      </tr>
      <tr>
        <td style="color:${BRAND_TEXT_MUTED};border-bottom:1px solid ${BRAND_BORDER};font-weight:600;">Location</td>
        <td style="color:${BRAND_PRIMARY};border-bottom:1px solid ${BRAND_BORDER};font-weight:600;">${booking.address}, ${booking.city} ${booking.zip}</td>
      </tr>
      <tr>
        <td style="color:${BRAND_TEXT_MUTED};font-weight:600;">Estimated Total</td>
        <td style="color:${BRAND_PRIMARY};font-weight:800;font-size:16px;">$${Number(estimatedTotal).toFixed(2)}</td>
      </tr>
    </table>

    <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:12px 16px;margin-bottom:20px;">
      <p style="margin:0;color:#166534;font-size:13px;font-weight:600;">Payment Policy: Payment is collected on the day of the event after service. No prepayment required.</p>
    </div>
  `;
}

// ─── 6. BOOKING APPROVED EMAIL ──────────────────────────────────
export async function sendBookingApprovedEmail(to: string, firstName: string, bookingNumber: string, paymentUrl: string, amount: string, bookingId: string) {
  const portalUrl = `${SITE_URL}/portal/booking/${bookingId}`;
  let bookingDetailsHtml = "";
  let icsContent: string | undefined;
  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { customer: true, package: true, quote: true, stops: { orderBy: { stopOrder: 'asc' } } } });
    bookingDetailsHtml = formatBookingDetailsHtml(booking);
    if (booking) {
      icsContent = generateIcsEvent({
        id: booking.id,
        summary: `American Legend Ice Cream Truck — #${bookingNumber}`,
        description: `Booking #${bookingNumber}\nPackage: ${booking.package?.name || 'Custom Package'}\nAddress: ${booking.address}, ${booking.city} ${booking.zip}\nGuests: ${booking.guests}`,
        location: `${booking.address}, ${booking.city} ${booking.zip}`,
        startDate: booking.eventDate,
        startTime: booking.startTime,
        durationMins: booking.durationMins || 60,
      });
    }
  } catch (e) { console.error("Error formatting booking details for approved email:", e); }

  const html = `
    <h2 style="margin:0 0 12px;color:${BRAND_PRIMARY};font-size:22px;font-weight:700;">Booking Approved — #${bookingNumber}</h2>
    <p style="margin:0 0 20px;color:${BRAND_TEXT_MUTED};font-size:15px;line-height:1.6;">
      Hello ${firstName}, your reservation has been officially <strong>approved</strong>. We look forward to serving your event!
    </p>

    <div style="background:#F8FAFC;border:1px solid ${BRAND_BORDER};border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
      <p style="margin:0 0 4px;color:${BRAND_TEXT_MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Approved Total</p>
      <p style="margin:0;color:${BRAND_PRIMARY};font-size:28px;font-weight:800;">$${amount}</p>
    </div>

    ${bookingDetailsHtml}

    <div style="text-align:center;margin:28px 0 16px;">
      <a href="${portalUrl}" class="btn" style="display:inline-block;background:${BRAND_PRIMARY};color:#FFFFFF;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Access Booking Portal &rarr;</a>
    </div>
  `;
  return sendEmail({
    to,
    subject: `Approved: Your Booking #${bookingNumber} | ${BUSINESS_CONFIG.name}`,
    html,
    title: "Booking Approved",
    icsContent,
    icsFilename: `AmericanLegend-${bookingNumber}.ics`
  });
}

// ─── 7. BOOKING PENDING / CONFIRMED EMAIL ───────────────────────
export async function sendBookingPendingEmail(to: string, firstName: string, bookingNumber: string, details: any, bookingId: string) {
  const portalUrl = `${SITE_URL}/portal/booking/${bookingId}`;
  let bookingDetailsHtml = "";
  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { customer: true, package: true, quote: true, stops: { orderBy: { stopOrder: 'asc' } } } });
    bookingDetailsHtml = formatBookingDetailsHtml(booking);
  } catch (e) { console.error("Error formatting booking details for pending email:", e); }

  const html = `
    <h2 style="margin:0 0 12px;color:${BRAND_PRIMARY};font-size:22px;font-weight:700;">Booking Received — #${bookingNumber}</h2>
    <p style="margin:0 0 20px;color:${BRAND_TEXT_MUTED};font-size:15px;line-height:1.6;">
      Hello ${firstName}, we have received your booking request. Our team will review the scheduling details and confirm promptly.
    </p>

    <div style="background:#F8FAFC;border:1px solid ${BRAND_BORDER};border-radius:8px;padding:14px 18px;margin-bottom:20px;text-align:center;">
      <p style="margin:0 0 4px;color:${BRAND_TEXT_MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Reference Number</p>
      <p style="margin:0;color:${BRAND_PRIMARY};font-size:20px;font-weight:800;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;">#${bookingNumber}</p>
    </div>

    ${bookingDetailsHtml}

    <div style="text-align:center;margin:24px 0 16px;">
      <a href="${portalUrl}" class="btn" style="display:inline-block;background:${BRAND_PRIMARY};color:#FFFFFF;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">View Booking Status &rarr;</a>
    </div>
  `;
  return sendEmail({ to, subject: `Booking Received #${bookingNumber} | ${BUSINESS_CONFIG.name}`, html, title: "Booking Received" });
}

// ─── 8. BOOKING REJECTED / UPDATE NEEDED ────────────────────────
export async function sendBookingRejectedEmail(to: string, firstName: string, bookingNumber: string, reason: string, bookingId: string) {
  const portalUrl = `${SITE_URL}/portal/booking/${bookingId}`;

  const html = `
    <h2 style="margin:0 0 12px;color:${BRAND_PRIMARY};font-size:22px;font-weight:700;">Update Needed — Request #${bookingNumber}</h2>
    <p style="margin:0 0 20px;color:${BRAND_TEXT_MUTED};font-size:15px;line-height:1.6;">
      Hello ${firstName}, we reviewed your booking request and need a minor adjustment before finalizing confirmation:
    </p>

    <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:16px 18px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;color:#92400E;">Reason / Notes</p>
      <p style="margin:0;color:${BRAND_PRIMARY};font-size:14px;font-weight:600;line-height:1.5;">${reason}</p>
    </div>

    <div style="text-align:center;margin:28px 0;">
      <a href="${portalUrl}" class="btn" style="display:inline-block;background:${BRAND_PRIMARY};color:#FFFFFF;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Update Booking Details &rarr;</a>
    </div>
  `;
  return sendEmail({ to, subject: `Update Needed: Booking Request #${bookingNumber} | ${BUSINESS_CONFIG.name}`, html, title: "Update Needed" });
}

// ─── 9. BOOKING PENDING REVIEW ──────────────────────────────────
export async function sendBookingPendingReviewEmail(to: string, firstName: string, bookingNumber: string, reason: string, bookingId: string) {
  const portalUrl = `${SITE_URL}/portal/booking/${bookingId}`;

  const html = `
    <h2 style="margin:0 0 12px;color:${BRAND_PRIMARY};font-size:22px;font-weight:700;">Booking Under Review — #${bookingNumber}</h2>
    <p style="margin:0 0 20px;color:${BRAND_TEXT_MUTED};font-size:15px;line-height:1.6;">
      Hello ${firstName}, your booking request is currently under review by our dispatch and catering team:
    </p>

    <div style="background:#F8FAFC;border:1px solid ${BRAND_BORDER};border-radius:8px;padding:14px 18px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;color:${BRAND_TEXT_MUTED};">Review Details</p>
      <p style="margin:0;color:${BRAND_PRIMARY};font-size:14px;font-weight:600;line-height:1.5;">${reason}</p>
    </div>

    <div style="text-align:center;margin:24px 0;">
      <a href="${portalUrl}" class="btn" style="display:inline-block;background:${BRAND_PRIMARY};color:#FFFFFF;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">View Booking &rarr;</a>
    </div>
  `;
  return sendEmail({ to, subject: `Booking Under Review #${bookingNumber} | ${BUSINESS_CONFIG.name}`, html, title: "Under Review" });
}

// ─── 10. CUSTOM QUOTE RECEIVED ──────────────────────────────────
export async function sendCustomQuoteEmail(to: string, firstName: string, bookingNumber: string, bookingId: string) {
  const portalUrl = `${SITE_URL}/portal/booking/${bookingId}`;

  const html = `
    <h2 style="margin:0 0 12px;color:${BRAND_PRIMARY};font-size:22px;font-weight:700;">Custom Quote Request Received</h2>
    <p style="margin:0 0 20px;color:${BRAND_TEXT_MUTED};font-size:15px;line-height:1.6;">
      Hello ${firstName}, thank you for requesting a custom event package. Due to your event scale or specific requirements, our catering team is personally preparing a tailored proposal for you.
    </p>

    <div style="background:#F8FAFC;border:1px solid ${BRAND_BORDER};border-radius:8px;padding:14px 18px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;color:${BRAND_TEXT_MUTED};">Reference</p>
      <p style="margin:0;color:${BRAND_PRIMARY};font-size:16px;font-weight:700;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;">#${bookingNumber}</p>
    </div>

    <p style="color:${BRAND_TEXT_MUTED};font-size:14px;line-height:1.5;margin-bottom:24px;">
      We will contact you via phone or email within 24 hours. For urgent questions, reach our team directly at <a href="tel:${BUSINESS_CONFIG.contact.phone1Formatted}" style="color:${BRAND_ACCENT};font-weight:600;text-decoration:none;">${BUSINESS_CONFIG.contact.phone1}</a>.
    </p>

    <div style="text-align:center;">
      <a href="${portalUrl}" class="btn" style="display:inline-block;background:${BRAND_PRIMARY};color:#FFFFFF;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">View Request Status &rarr;</a>
    </div>
  `;
  return sendEmail({ to, subject: `Custom Quote Request Received #${bookingNumber} | ${BUSINESS_CONFIG.name}`, html, title: "Custom Quote Received" });
}

// ─── 11. OWNER: NEW BOOKING NOTIFICATION ────────────────────────
export async function sendOwnerNewBookingEmail(booking: any) {
  const to = getAdminRecipients();
  const portalUrl = `${SITE_URL}/admin/bookings/${booking.id}`;
  const dateStr = booking.eventDate ? new Date(booking.eventDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "";

  let icsContent: string | undefined;
  try {
    icsContent = generateIcsEvent({
      id: booking.id,
      summary: `Booking #${booking.bookingNumber || booking.id}: ${booking.customer?.firstName} ${booking.customer?.lastName}`,
      description: `Customer: ${booking.customer?.firstName} ${booking.customer?.lastName}\nPhone: ${booking.customer?.phone || 'N/A'}\nPackage: ${booking.package?.name || 'Custom Package'}\nGuests: ${booking.guests}\nLocation: ${booking.address}, ${booking.city} ${booking.zip}`,
      location: `${booking.address}, ${booking.city} ${booking.zip}`,
      startDate: booking.eventDate,
      startTime: booking.startTime,
      durationMins: booking.durationMins || 60,
    });
  } catch (err) {
    console.error("Error generating ICS for owner email:", err);
  }

  const html = `
    <h2 style="color:${BRAND_PRIMARY};margin:0 0 16px;font-size:20px;font-weight:700;">New Booking Notification</h2>
    <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;border-collapse:collapse;border:1px solid ${BRAND_BORDER};border-radius:6px;background:#F8FAFC;">
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;width:35%;border-bottom:1px solid ${BRAND_BORDER};">Customer</td><td style="color:${BRAND_PRIMARY};font-weight:700;border-bottom:1px solid ${BRAND_BORDER};">${booking.customer?.firstName} ${booking.customer?.lastName}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Phone</td><td style="border-bottom:1px solid ${BRAND_BORDER};"><a href="tel:${booking.customer?.phone}">${booking.customer?.phone || 'N/A'}</a></td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Email</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${booking.customer?.email || 'N/A'}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Date &amp; Time</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${dateStr} at ${booking.startTime}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Package</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${booking.package?.name || 'Custom Package'}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Location</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${booking.address}, ${booking.city} ${booking.zip}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;">Estimated Amount</td><td style="color:${BRAND_PRIMARY};font-weight:800;">$${Number(booking.totalAmount || 0).toFixed(2)}</td></tr>
    </table>
    <div style="text-align:center;margin-top:24px;">
      <a href="${portalUrl}" class="btn" style="display:inline-block;background:${BRAND_PRIMARY};color:#FFFFFF;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px;">Open in Admin Portal &rarr;</a>
    </div>
  `;
  return sendEmail({
    to,
    subject: `New Booking: ${booking.customer?.firstName} ${booking.customer?.lastName} (${dateStr})`,
    html,
    replyTo: booking.customer?.email,
    icsContent,
    icsFilename: `AmericanLegend-${booking.bookingNumber || booking.id}.ics`
  });
}

// ─── 12. OWNER: APPROVAL REQUIRED ───────────────────────────────
export async function sendOwnerRequiresApprovalEmail(booking: any) {
  const to = getAdminRecipients();
  const portalUrl = `${SITE_URL}/admin/bookings/${booking.id}`;
  const dateStr = booking.eventDate ? new Date(booking.eventDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "";

  const html = `
    <h2 style="color:${BRAND_PRIMARY};margin:0 0 12px;font-size:20px;font-weight:700;">Booking Requires Approval</h2>
    <p style="color:${BRAND_TEXT_MUTED};font-size:14px;margin:0 0 16px;">The following booking is awaiting administrative review:</p>
    <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;border-collapse:collapse;border:1px solid ${BRAND_BORDER};background:#F8FAFC;">
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;width:35%;border-bottom:1px solid ${BRAND_BORDER};">Customer</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${booking.customer?.firstName} ${booking.customer?.lastName}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Date</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${dateStr}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Booking Ref</td><td style="border-bottom:1px solid ${BRAND_BORDER};font-weight:700;">#${booking.bookingNumber}</td></tr>
    </table>
    <div style="text-align:center;margin-top:20px;">
      <a href="${portalUrl}" class="btn" style="display:inline-block;background:${BRAND_PRIMARY};color:#FFFFFF;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px;">Review &amp; Approve &rarr;</a>
    </div>
  `;
  return sendEmail({ to, subject: `Action Required: Booking #${booking.bookingNumber} Awaiting Approval`, html, replyTo: booking.customer?.email });
}

// ─── 13. OWNER: URGENT LAST-MINUTE ALERT ────────────────────────
export async function sendOwnerLateBookingAlert(booking: any) {
  const to = getAdminRecipients();
  const portalUrl = `${SITE_URL}/admin/bookings/${booking.id}`;
  const dateStr = booking.eventDate ? new Date(booking.eventDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "";

  const html = `
    <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:14px 18px;margin-bottom:16px;">
      <p style="margin:0;color:#991B1B;font-weight:700;font-size:14px;">Urgent: Last-Minute Booking Request (&lt;24 hours)</p>
    </div>
    <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;border-collapse:collapse;border:1px solid ${BRAND_BORDER};background:#F8FAFC;">
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;width:35%;border-bottom:1px solid ${BRAND_BORDER};">Customer</td><td style="border-bottom:1px solid ${BRAND_BORDER};font-weight:700;">${booking.customer?.firstName} ${booking.customer?.lastName}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Phone</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${booking.customer?.phone || 'N/A'}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Date &amp; Time</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${dateStr} at ${booking.startTime}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;">Location</td><td>${booking.address}, ${booking.city}</td></tr>
    </table>
    <div style="text-align:center;margin-top:20px;">
      <a href="${portalUrl}" class="btn" style="display:inline-block;background:#DC2626;color:#FFFFFF;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px;">View Urgent Request &rarr;</a>
    </div>
  `;
  return sendEmail({ to, subject: `URGENT: Last-Minute Booking (${dateStr})`, html, replyTo: booking.customer?.email });
}

// ─── 14. OWNER: 24-HOUR EVENT REMINDER ──────────────────────────
export async function sendOwnerEventReminderEmail(booking: any) {
  const to = ADMIN_EMAIL;
  const portalUrl = `${SITE_URL}/admin/bookings/${booking.id}`;
  const dateStr = booking.eventDate ? new Date(booking.eventDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "";

  const html = `
    <h2 style="color:${BRAND_PRIMARY};margin:0 0 12px;font-size:20px;font-weight:700;">24-Hour Event Reminder</h2>
    <p style="color:${BRAND_TEXT_MUTED};font-size:14px;margin:0 0 16px;">Reminder for tomorrow's scheduled event:</p>
    <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;border-collapse:collapse;border:1px solid ${BRAND_BORDER};background:#F8FAFC;">
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;width:35%;border-bottom:1px solid ${BRAND_BORDER};">Customer</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${booking.customer?.firstName} ${booking.customer?.lastName}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Date &amp; Time</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${dateStr} at ${booking.startTime}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Address</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${booking.address}, ${booking.city} ${booking.zip}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;">Package</td><td>${booking.package?.name || 'Custom Package'}</td></tr>
    </table>
    <div style="text-align:center;margin-top:20px;">
      <a href="${portalUrl}" class="btn" style="display:inline-block;background:${BRAND_PRIMARY};color:#FFFFFF;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px;">View Booking Details &rarr;</a>
    </div>
  `;
  return sendEmail({ to, subject: `Upcoming Event Tomorrow: ${booking.customer?.firstName} ${booking.customer?.lastName}`, html });
}


// ─── 16. GOOGLE REVIEW REQUEST ───────────────────────────────────
const GOOGLE_REVIEW_URL = "https://g.page/r/CWDhxc3sMbFAEAI/review";

export async function sendGoogleReviewRequestEmail(booking: { id: string; bookingNumber: string; eventDate: Date; eventType: string; customer: { firstName: string; lastName: string; email: string }; package?: { name: string } | null; }) {
  const customerName = `${booking.customer.firstName}`;
  const packageName = booking.package?.name ?? "Ice Cream Truck";
  const eventDate = new Date(booking.eventDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

  const html = `
    <h2 style="margin:0 0 12px;color:${BRAND_PRIMARY};font-size:22px;font-weight:700;">Thank You, ${customerName}!</h2>
    <p style="margin:0 0 20px;color:${BRAND_TEXT_MUTED};font-size:15px;line-height:1.6;">
      It was an absolute pleasure catering your <strong>${packageName}</strong> on ${eventDate}. We hope your guests enjoyed every sweet moment!
    </p>

    <div style="background:#F8FAFC;border:1px solid ${BRAND_BORDER};border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:14px;color:${BRAND_TEXT_MUTED};line-height:1.5;">
        Would you take 30 seconds to share your experience on Google? As an independent business, your feedback means everything to us:
      </p>
      <a href="${GOOGLE_REVIEW_URL}" class="btn" style="display:inline-block;background:${BRAND_ACCENT};color:#FFFFFF;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;box-shadow:0 2px 8px rgba(234,88,12,0.2);">Leave a Google Review &rarr;</a>
    </div>

    <p style="text-align:center;font-size:13px;color:${BRAND_TEXT_MUTED};margin:0;">
      Planning your next celebration? <a href="${SITE_URL}/packages" style="color:${BRAND_PRIMARY};font-weight:600;text-decoration:none;">Reserve again anytime &rarr;</a>
    </p>
  `;
  return sendEmail({ to: booking.customer.email, subject: `Thank you for choosing ${BUSINESS_CONFIG.name}!`, html, title: "Thank You" });
}

// ─── 17. CONTACT FORM MESSAGE NOTIFICATION ───────────────────────
export async function sendContactMessageNotification(data: { name: string, email: string, message: string }) {
  const html = `
    <h2 style="color:${BRAND_PRIMARY};margin:0 0 14px;font-size:20px;font-weight:700;">New Contact Form Message</h2>
    <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;border-collapse:collapse;border:1px solid ${BRAND_BORDER};background:#F8FAFC;">
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;width:25%;border-bottom:1px solid ${BRAND_BORDER};">Name</td><td style="border-bottom:1px solid ${BRAND_BORDER};font-weight:700;">${data.name}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Email</td><td style="border-bottom:1px solid ${BRAND_BORDER};"><a href="mailto:${data.email}">${data.email}</a></td></tr>
    </table>
    <div style="margin-top:16px;padding:14px 16px;background:#FAFBFD;border-left:3px solid ${BRAND_PRIMARY};border-radius:4px;">
      <p style="margin:0;font-size:14px;color:${BRAND_PRIMARY};line-height:1.6;white-space:pre-wrap;">${data.message}</p>
    </div>
  `;
  return sendEmail({ to: getAdminRecipients(), subject: `Contact Message from ${data.name}`, html, replyTo: data.email });
}

// ─── 18. QUOTE REQUEST NOTIFICATION ─────────────────────────────
export async function sendQuoteRequestNotification(inquiry: any) {
  const portalUrl = `${SITE_URL}/admin/inquiries`;
  const dateStr = inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : 'N/A';

  const html = `
    <h2 style="color:${BRAND_PRIMARY};margin:0 0 14px;font-size:20px;font-weight:700;">New Custom Quote Request</h2>
    <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;border-collapse:collapse;border:1px solid ${BRAND_BORDER};background:#F8FAFC;">
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;width:35%;border-bottom:1px solid ${BRAND_BORDER};">Customer</td><td style="border-bottom:1px solid ${BRAND_BORDER};font-weight:700;">${inquiry.name}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Phone</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${inquiry.phone || 'N/A'}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Email</td><td style="border-bottom:1px solid ${BRAND_BORDER};"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Event Type</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${inquiry.eventType}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;border-bottom:1px solid ${BRAND_BORDER};">Event Date</td><td style="border-bottom:1px solid ${BRAND_BORDER};">${dateStr}</td></tr>
      <tr><td style="color:${BRAND_TEXT_MUTED};font-weight:600;">Guests</td><td>${inquiry.guestCount || 'N/A'}</td></tr>
    </table>
    ${inquiry.notes ? `<div style="margin-top:14px;padding:12px 14px;background:#FAFBFD;border-left:3px solid ${BRAND_PRIMARY};"><p style="margin:0;font-size:13px;white-space:pre-wrap;">${inquiry.notes}</p></div>` : ''}
    <div style="text-align:center;margin-top:20px;">
      <a href="${portalUrl}" class="btn" style="display:inline-block;background:${BRAND_PRIMARY};color:#FFFFFF;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px;">View in Admin &rarr;</a>
    </div>
  `;
  return sendEmail({ to: ADMIN_EMAIL, subject: `Custom Quote Request: ${inquiry.name}`, html, replyTo: inquiry.email });
}
