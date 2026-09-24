import nodemailer from 'nodemailer';
import { prisma } from "./prisma";
import { BUSINESS_CONFIG } from "./config";

const BRAND_NAVY  = "#1A1009";
const BRAND_CORAL = "#FF6B6B";
// Hardcode the site URL to the domain so the logo always loads in emails
const SITE_URL    = "https://bostonlegendicecream.com";
const LOGO_URL    = `${SITE_URL}/images/logo.png`; 

const SENDER_EMAIL = 'info@bostonlegendicecream.com';
const ADMIN_EMAIL  = process.env.ADMIN_EMAIL || 'info@bostonlegendicecream.com';
const REPLY_TO     = 'info@bostonlegendicecream.com';

const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.gmail.com",
  port: smtpPort,
  secure: false, // STARTTLS (works for port 587)
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export function getAdminRecipients() {
  const recipients = new Set(['info@bostonlegendicecream.com']);
  if (process.env.ADMIN_EMAIL) {
    recipients.add(process.env.ADMIN_EMAIL);
  }
  return Array.from(recipients);
}

// ─── BASE TEMPLATE ───────────────────────────────────────────────
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
      .card     { border-radius: 16px !important; }
      .hdr      { padding: 24px 16px !important; }
      .body     { padding: 20px 16px !important; }
      .ftr      { padding: 16px !important; }
      h2.title  { font-size: 20px !important; }
      .otp-code { font-size: 28px !important; letter-spacing: 6px !important; }
      .btn      { padding: 14px 20px !important; font-size: 14px !important; }
      .data-table td { font-size: 13px !important; padding: 8px 6px !important; }
      .total-row td  { font-size: 16px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#F4F2EE;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="wrapper" style="padding:24px 12px;background:#F4F2EE;">
    <tr><td align="center">

      <!-- Card -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="card" style="max-width:580px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 2px 16px rgba(10,17,40,0.08);">

        <!-- Header -->
        <tr>
          <td class="hdr" style="background:#ffffff;padding:32px 24px 24px;text-align:center;border-bottom:3px solid ${BRAND_CORAL};">
            <img src="${LOGO_URL}" alt="Boston Legend Ice Cream Truck" width="80" height="80" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin:0 auto 12px;border:3px solid #F4F2EE;"/>
            <p style="margin:0;font-size:13px;font-weight:700;color:#9CA3AF;letter-spacing:2px;text-transform:uppercase;">Boston Legend Ice Cream Truck</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="body" style="padding:28px 28px 20px;">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="ftr" style="background:#F8F7F5;padding:20px 28px;text-align:center;border-top:1px solid #EDE9E4;">
            <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:${BRAND_NAVY};">Boston Legend Ice Cream Truck</p>
            <p style="margin:0 0 4px;font-size:12px;color:#9CA3AF;">Greater Boston, MA &middot; <a href="tel:617-999-3803" style="color:${BRAND_CORAL};font-weight:600;text-decoration:none;">617-999-3803</a></p>
            <p style="margin:0;font-size:11px;color:#C4BFB8;">&copy; ${new Date().getFullYear()} Boston Legend Ice Cream Truck LLC. All rights reserved.</p>
          </td>
        </tr>

      </table>

    </td></tr>
  </table>
</body>
</html>`;
}

// ─── CORE SEND WITH RETRY ──────────────────────────────────────
export async function sendEmail({ to, subject, html, title, replyTo }: { to: string | string[]; subject: string; html: string; title?: string; replyTo?: string }) {
  const MAX_RETRIES = 2;
  const RETRY_DELAY_MS = 2000;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn(`[Email] ⚠️ SMTP credentials not set. Skipped sending "${subject}" to ${JSON.stringify(to)}`);
    return false;
  }

  const recipients = Array.from(new Set((Array.isArray(to) ? to : [to]).filter(Boolean)));

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const info = await transporter.sendMail({
        from: `"Boston Legend Ice Cream Truck" <${SENDER_EMAIL}>`,
        replyTo: replyTo || REPLY_TO,
        to: recipients,
        subject: subject,
        html: baseTemplate(html, title || subject),
      });

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

// ─── OTP EMAIL ───────────────────────────────────────────────────
// Unified OTP email — used by booking, portal login, forgot password,
// staff invite, and sensitive action flows. Previously duplicated in otp.ts.
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
    SETTINGS: "Sensitive Action Verification",
    STAFF_INVITE: "Staff Account Setup",
    GENERAL: "Verification",
  };
  const label = purposeLabels[purpose] || "Verification";
  const TTL = 10;

  const html = `
    <h2 style="margin:0 0 16px;color:${BRAND_NAVY};font-size:26px;font-weight:900;">Hey ${firstName ?? "there"}! 👋</h2>
    <p style="margin:0 0 32px;color:#4B5563;font-size:16px;line-height:1.6;font-weight:600;">
      Use the code below to complete your <strong>${label}</strong>.
    </p>

    <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:20px;padding:24px;text-align:center;margin-bottom:32px;">
      <p style="margin:0 0 8px;color:#9CA3AF;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:2px;">${label} Code</p>
      <p style="margin:0 0 8px;font-size:32px;font-weight:900;letter-spacing:12px;color:${BRAND_NAVY};font-family:monospace;">${otp}</p>
      <p style="margin:0;color:#9CA3AF;font-size:12px;font-weight:700;">⏱ Expires in ${TTL} minutes</p>
    </div>

    <div style="background:#F8F9FC;border-radius:12px;padding:20px;">
      <p style="margin:0;color:#9CA3AF;font-size:13px;line-height:1.6;font-weight:500;">
        🔒 <strong>Security notice:</strong> We will never ask for this code by phone or chat. If you didn't request this, you can safely ignore this email.
      </p>
    </div>
  `;

  return sendEmail({
    to,
    subject: `${otp} — Your Boston Legend Ice Cream Truck ${label} Code`,
    html,
    title: `Boston Legend Ice Cream Truck ${label}`,
  });
}

// ─── WELCOME EMAIL ────────────────────────────────────────────
export async function sendWelcomeEmail(to: string, firstName: string) {
  const html = `
    <h2 class="title" style="margin:0 0 8px;color:${BRAND_NAVY};font-size:24px;font-weight:900;">Welcome, ${firstName}! 🍦</h2>
    <p style="margin:0 0 20px;color:#6B7280;font-size:15px;line-height:1.6;">Greater Boston's premium ice cream truck service.</p>

    <div style="background:#F9FAFB;border-radius:12px;padding:16px 20px;margin:0 0 20px;">
      <p style="margin:0;color:${BRAND_NAVY};font-size:14px;font-weight:700;">✅ Your email is verified. Your account is now active.</p>
    </div>

    <p style="color:#6B7280;font-size:14px;line-height:1.7;margin:0 0 24px;">
      Thank you for joining Boston Legend Ice Cream Truck! Browse our packages and book your sweet event today.
    </p>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
      <tr><td align="center">
        <a href="${SITE_URL}/packages" class="btn" style="display:inline-block;background:${BRAND_CORAL};color:#ffffff;padding:16px 36px;border-radius:50px;text-decoration:none;font-weight:800;font-size:15px;">Browse Our Packages →</a>
      </td></tr>
    </table>

    <p style="text-align:center;font-size:13px;color:#9CA3AF;margin:0;">Questions? <a href="tel:617-999-3803" style="color:${BRAND_CORAL};font-weight:700;text-decoration:none;">617-999-3803</a></p>
  `;
  return sendEmail({ to, subject: "Welcome to Boston Legend Ice Cream Truck! 🍦", html, title: "Welcome to Boston Legend Ice Cream Truck" });
}

// ─── FORGOT PASSWORD EMAIL ────────────────────────────────────
export async function sendForgotPasswordEmail(to: string, otp: string, firstName?: string) {
  const TTL = 10;
  const html = `
    <div style="text-align:center;padding:24px 0 20px;">
      <div style="font-size:32px;line-height:1;margin-bottom:16px;">🔐</div>
      <h2 style="margin:0 0 8px;color:${BRAND_NAVY};font-size:26px;font-weight:900;">Password Reset Request</h2>
      <p style="margin:0;color:#6B7280;font-size:15px;font-weight:600;">Hi ${firstName ?? "there"} — we received a request to reset your password.</p>
    </div>

    <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:20px;padding:24px;text-align:center;margin:24px 0;">
      <p style="margin:0 0 8px;color:#9CA3AF;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:2px;">Reset Code</p>
      <p style="margin:0 0 8px;font-size:32px;font-weight:900;letter-spacing:12px;color:${BRAND_NAVY};font-family:monospace;">${otp}</p>
      <p style="margin:0;color:#9CA3AF;font-size:12px;font-weight:700;">⏱ Expires in ${TTL} minutes</p>
    </div>

    <div style="background:#FFF5F5;border:1px solid #FFBABA;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0;color:${BRAND_CORAL};font-size:13px;font-weight:700;">
        🔒 If you did NOT request a password reset, ignore this email. Your password will not change.
      </p>
    </div>

    <p style="color:#6B7280;font-size:13px;font-weight:600;text-align:center;">
      Need help? Call us at <a href="tel:617-999-3803" style="color:${BRAND_NAVY};font-weight:800;">617-999-3803</a>
    </p>
  `;
  return sendEmail({ to, subject: `${otp} — Boston Legend Ice Cream Truck Password Reset Code`, html, title: "Password Reset" });
}

// ─── STAFF INVITE EMAIL ──────────────────────────────────────
export async function sendStaffInviteEmail(to: string, inviterName: string, inviteToken: string, role: string) {
  const acceptUrl = `${SITE_URL}/admin/accept-invite?token=${inviteToken}`;
  const EXPIRES_HOURS = 48;

  const html = `
      <p style="margin:0;color:#9CA3AF;font-size:12px;font-weight:600;">
        If the button doesn't work, copy and paste this link: <br/>
        <span style="color:${BRAND_NAVY};word-break:break-all;">${acceptUrl}</span>
      </p>
    </div>
  `;
  return sendEmail({ to, subject: `You've been invited to join Boston Legend Ice Cream Truck Staff`, html, title: "Staff Invitation" });
}

// ─── SENSITIVE ACTION OTP EMAIL ──────────────────────────────
export async function sendSensitiveActionOtpEmail(to: string, otp: string, action: string, userName?: string) {
  const TTL = 5;
  const html = `
    <div style="text-align:center;padding:24px 0 20px;">
      <div style="font-size:32px;line-height:1;margin-bottom:16px;">🛡️</div>
      <h2 style="margin:0 0 8px;color:${BRAND_NAVY};font-size:26px;font-weight:900;">Security Verification Required</h2>
      <p style="margin:0;color:#6B7280;font-size:15px;font-weight:600;">Hi ${userName ?? "Admin"} — a sensitive action requires your verification.</p>
    </div>

    <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:16px;padding:16px 20px;margin:20px 0;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:900;text-transform:uppercase;color:#6B7280;">Action Requested</p>
      <p style="margin:0;color:\${BRAND_NAVY};font-size:15px;font-weight:700;">${action}</p>
    </div>

    <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:20px;padding:24px;text-align:center;margin:24px 0;">
      <p style="margin:0 0 8px;color:#9CA3AF;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:2px;">Verification Code</p>
      <p style="margin:0 0 8px;font-size:32px;font-weight:900;letter-spacing:12px;color:${BRAND_NAVY};font-family:monospace;">${otp}</p>
      <p style="margin:0;color:#9CA3AF;font-size:12px;font-weight:700;">⏱ Expires in ${TTL} minutes — single use only</p>
    </div>

    <div style="background:#FFF5F5;border:1px solid #FFBABA;border-radius:12px;padding:16px 20px;">
      <p style="margin:0;color:\${BRAND_CORAL};font-size:13px;font-weight:700;">
        🚨 If you did NOT initiate this action, your account may be compromised. Contact support immediately.
      </p>
    </div>
  `;
  return sendEmail({ to, subject: `${otp} — Boston Legend Ice Cream Truck Admin Security Code`, html, title: "Security Verification" });
}

// ─── BOOKING DETAIL FORMATTER ─────────────────────────────────
function formatBookingDetailsHtml(booking: any) {
  if (!booking) return "";
  
  const formatEnDate = (d: Date) => {
    if (!d) return "";
    try {
      const dateObj = new Date(d);
      return dateObj.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
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
  const billableMiles = breakdown.billableMiles ?? Math.max(0, distanceMiles - 10);
  const additionalStopsCount = breakdown.additionalStopsCount ?? (booking.additionalStops || 0);
  const additionalStopsFee = breakdown.additionalStopsFee ?? (booking.additionalStopsFee || 0);
  const estimatedTotal = breakdown.estimatedTotal ?? booking.totalAmount;
  const additionalVehicleSetupFee = breakdown.additionalVehicleSetupFee ?? 0;
  const weekendFee = breakdown.weekendFee ?? 0;

  return `
    <!-- Event Summary -->
    <h3 style="margin:24px 0 12px;color:${BRAND_NAVY};font-size:20px;font-weight:900;border-bottom:2px solid #F3F4F6;padding-bottom:8px;">Event Summary</h3>
    <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom:24px;font-size:16px;color:#4B5563;">
      <tr><td width="40%" style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #F3F4F6;">Event Type</td><td style="border-bottom:1px solid #F3F4F6;font-weight:600;">${booking.eventType}</td></tr>
      <tr><td style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #F3F4F6;">Package</td><td style="border-bottom:1px solid #F3F4F6;font-weight:600;">${pkg?.name || 'Custom Package'}</td></tr>
      <tr><td style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #F3F4F6;">Date &amp; Time</td><td style="border-bottom:1px solid #F3F4F6;font-weight:600;">${formatEnDate(booking.eventDate)} at ${booking.startTime}</td></tr>
      <tr><td style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #F3F4F6;">Included Service Time</td><td style="border-bottom:1px solid #F3F4F6;font-weight:600;">${pkgDurationMins} minutes</td></tr>
      ${extraServiceMins > 0 ? `<tr><td style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #F3F4F6;">Additional Service Time</td><td style="border-bottom:1px solid #F3F4F6;font-weight:600;">+${extraServiceMins} minutes</td></tr>` : ''}
      <tr><td style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #F3F4F6;">Included Guests</td><td style="border-bottom:1px solid #F3F4F6;font-weight:600;">${pkgServings} guests</td></tr>
      <tr>
        <td style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #F3F4F6;">Location</td>
        <td style="border-bottom:1px solid #F3F4F6;font-weight:600;">
          ${booking.address}, ${booking.city} ${booking.zip}
          ${booking.stops && booking.stops.length > 0 ? `<br/><br/>
            <strong style="color:${BRAND_CORAL}">Additional Stops:</strong><br/>
            ${booking.stops.map((s: any, i: number) => `Stop ${i+1}: ${s.street}, ${s.city} ${s.state} ${s.zipCode}`).join('<br/>')}
          ` : ''}
        </td>
      </tr>
      <tr><td style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #F3F4F6;">Dispatch Origin</td><td style="border-bottom:1px solid #F3F4F6;font-weight:600;">Boston, MA (ZIP 02108)</td></tr>
      <tr><td style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #F3F4F6;">Total Distance</td><td style="border-bottom:1px solid #F3F4F6;font-weight:600;">${distanceMiles.toFixed(1)} miles</td></tr>
    </table>

    <!-- Pricing Breakdown -->
    <h3 style="margin:0 0 12px;color:${BRAND_NAVY};font-size:20px;font-weight:900;border-bottom:2px solid #F3F4F6;padding-bottom:8px;">Pricing &amp; Travel Fee</h3>
    ${(booking.package?.slug === "custom-event-package" || booking.packageId === "custom-event-package" || booking.package?.name === "Custom Event Package") ? `
    <div style="background:#FFF9F0;border:1px dashed #FFA000;border-radius:12px;padding:16px 20px;margin-bottom:24px;font-size:16px;color:\${BRAND_NAVY};font-weight:700;">
      Custom Quote Pending — our team will review your guest count, vehicle needs, route, timing, and event details before preparing your final quote.
    </div>
    ` : `
    <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom:24px;font-size:16px;color:#4B5563;background:#F8F9FC;border-radius:12px;">
      <tr><td width="65%" style="font-weight:600;">Base Package Price</td><td width="35%" align="right" style="font-weight:800;color:${BRAND_NAVY};">$${basePrice.toFixed(2)}</td></tr>
      <tr><td style="font-weight:600;color:#6B7280;font-size:14px;">Included: ${pkgServings} guests, ${pkgDurationMins} min</td><td></td></tr>
      ${extraGuestsFee > 0 ? `<tr><td style="font-weight:600;">Extra Guests Fee (${extraGuestsCount} × $${extraPiecePrice})</td><td align="right" style="font-weight:800;color:${BRAND_NAVY};">+$${extraGuestsFee.toFixed(2)}</td></tr>` : ''}
      ${breakdown.extraTimeFee > 0 ? `<tr><td style="font-weight:600;">Extra Service Time (+${(breakdown.extraTimeFee / 35) * 30} mins)</td><td align="right" style="font-weight:800;color:${BRAND_NAVY};">+$${Number(breakdown.extraTimeFee).toFixed(2)}</td></tr>` : ''}
      ${additionalStopsFee > 0 ? `<tr><td style="font-weight:600;">Multi-Location Fee (${breakdown.routingMode ?? 'SEQUENTIAL'})</td><td align="right" style="font-weight:800;color:${BRAND_NAVY};">+$${additionalStopsFee.toFixed(2)}</td></tr>` : ''}
      ${breakdown.distanceFee2 > 0 ? `<tr><td style="font-weight:600;">Second Stop Travel Fee</td><td align="right" style="font-weight:800;color:${BRAND_NAVY};">+$${Number(breakdown.distanceFee2).toFixed(2)}</td></tr>` : ''}
      ${extraServiceFee > 0 ? `<tr><td style="font-weight:600;">Additional Service Time (${extraServiceMins} min)</td><td align="right" style="font-weight:800;color:${BRAND_NAVY};">+$${extraServiceFee.toFixed(2)}</td></tr>` : ''}
      ${overtimeFee > 0 ? `<tr><td style="font-weight:600;">Overtime Fee</td><td align="right" style="font-weight:800;color:${BRAND_NAVY};">+$${overtimeFee.toFixed(2)}</td></tr>` : ''}
      ${travelFee > 0 ? `<tr><td style="font-weight:600;">Travel Fee</td><td align="right" style="font-weight:800;color:${BRAND_NAVY};">+$${travelFee.toFixed(2)}</td></tr>` : ''}
      ${additionalVehicleSetupFee > 0 ? `<tr><td style="font-weight:600;">Additional Vehicle Setup Fee</td><td align="right" style="font-weight:800;color:${BRAND_NAVY};">+$${additionalVehicleSetupFee.toFixed(2)}</td></tr>` : ''}
      ${weekendFee > 0 ? `<tr><td style="font-weight:600;">Weekend Event Fee</td><td align="right" style="font-weight:800;color:${BRAND_NAVY};">+$${weekendFee.toFixed(2)}</td></tr>` : ''}
      <tr><td style="font-weight:900;color:${BRAND_NAVY};border-top:2px solid #E5E7EB;padding-top:16px;">Total Estimated Price</td><td align="right" style="font-weight:900;color:${BRAND_CORAL};font-size:22px;border-top:2px solid #E5E7EB;padding-top:16px;">$${estimatedTotal.toFixed(2)}</td></tr>
    </table>
    `}

    ${additionalVehicleSetupFee > 0 ? `
    <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:\${BRAND_NAVY};font-weight:600;">
      🚚 Additional Vehicle Setup Fee: If your event requires another truck/van for the same package at the same time, each additional vehicle includes a $200 setup and dispatch fee.
    </div>
    ` : ''}

    ${weekendFee > 0 ? `
    <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:\${BRAND_NAVY};font-weight:600;">
      📅 Weekend Event Fee: Saturday and Sunday bookings include an additional $25 weekend event fee.
    </div>
    ` : ''}

    <!-- Payment Policy -->
    <div style="background:#F0FDF4;border:1px solid #86EFAC;border-radius:12px;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0;color:#166534;font-size:14px;font-weight:700;">💳 Payment Policy: Payment is collected after the service. We accept multiple payment methods.</p>
    </div>
  `;
}

// ─── BOOKING APPROVED ─────────────────────────────────────────
export async function sendBookingApprovedEmail(to: string, firstName: string, bookingNumber: string, paymentUrl: string, amount: string, bookingId: string) {
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bostonlegendicecream.com'}/portal/booking/${bookingId}`;
  let bookingDetailsHtml = "";
  let isCustom = false;
  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { customer: true, package: true, quote: true, stops: { orderBy: { stopOrder: 'asc' } } } });
    bookingDetailsHtml = formatBookingDetailsHtml(booking);
    if (booking?.package?.slug === "custom-event-package" || booking?.packageId === "custom-event-package" || booking?.package?.name === "Custom Event Package") isCustom = true;
  } catch (e) { console.error("Error formatting booking details for approved email:", e); }

  const subject = isCustom ? `Approved: Your Boston Legend Ice Cream Truck Custom Quote #${bookingNumber}` : `Approved: Your Boston Legend Ice Cream Truck Booking #${bookingNumber}`;
  const headerText = isCustom ? `Your Custom Quote is Approved! 🎉` : `Legendary News, ${firstName}! 🎉`;
  const bodyText = isCustom
    ? `Your custom quote request **#${bookingNumber}** has been approved with a finalized price.`
    : `Your reservation **#${bookingNumber}** has been officially **APPROVED**. We can't wait to sweeten your event!`;

  const html = `
    <h2 style="margin:0 0 16px;color:${BRAND_NAVY};font-size:28px;font-weight:900;">${headerText}</h2>
    <p style="margin:0 0 24px;color:#4B5563;font-size:16px;line-height:1.6;font-weight:600;">${bodyText}</p>
    <div style="background:#F9FAFB;border:2px solid #E5E7EB;border-radius:16px;padding:24px;margin-bottom:32px;text-align:center;">
      <p style="margin:0 0 4px;color:\${BRAND_NAVY};font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1px;">Approved Price Total</p>
      <p style="margin:0 0 10px;color:${BRAND_NAVY};font-size:36px;font-weight:900;">$${amount}</p>
      <p style="margin:0;color:#047857;font-size:14px;font-weight:700;">Payment is collected after the service. We accept multiple payment methods.</p>
    </div>
    ${bookingDetailsHtml}
    <div style="text-align:center;margin-top:24px;padding:24px 16px;background:#F8F9FC;border-radius:16px;">
      <p style="margin:0 0 16px;font-size:16px;font-weight:800;color:${BRAND_NAVY};">Need to check details or manage your booking?</p>
      <a href="${portalUrl}" style="display:block;width:100%;box-sizing:border-box;background:${BRAND_NAVY};color:${BRAND_CORAL};padding:18px 24px;border-radius:12px;text-decoration:none;font-weight:900;font-size:16px;text-transform:uppercase;">Access Booking Portal</a>
    </div>
  `;
  return sendEmail({ to, subject, html });
}

// ─── BOOKING PENDING ──────────────────────────────────────────
export async function sendBookingPendingEmail(to: string, firstName: string, bookingNumber: string, details: any, bookingId: string) {
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bostonlegendicecream.com'}/portal/booking/${bookingId}`;
  let bookingDetailsHtml = "";
  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { customer: true, package: true, quote: true, stops: { orderBy: { stopOrder: 'asc' } } } });
    bookingDetailsHtml = formatBookingDetailsHtml(booking);
  } catch (e) { console.error("Error formatting booking details for pending email:", e); }

  const html = `
    <h2 style="margin:0 0 16px;color:${BRAND_NAVY};font-size:24px;font-weight:900;">🎉 Booking Confirmed!</h2>
    <p style="margin:0 0 24px;color:#4B5563;font-size:16px;line-height:1.6;font-weight:600;">
      Hello ${firstName},<br/><br/>
      Your Boston Legend Ice Cream Truck booking has been <strong style="color:#16a34a;">confirmed</strong>! We're excited to bring the sweet celebration to your event. You'll receive a follow-up from our team with final details.
    </p>
    <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center;">
      <p style="margin:0 0 4px;color:\${BRAND_NAVY};font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1px;">Booking Reference</p>
      <p style="margin:0;color:${BRAND_NAVY};font-size:24px;font-weight:900;">#${bookingNumber}</p>
    </div>
    ${bookingDetailsHtml}
    <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:24px;font-size:13px;line-height:1.6;color:\${BRAND_NAVY};text-align:left;">
      <p style="margin:0 0 8px;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:${BRAND_NAVY};">📍 Travel &amp; Distance Policy</p>
      <p style="margin:0 0 12px;font-weight:600;">Travel is calculated at $2.00 per mile based on the actual driving distance from our Boston dispatch location (ZIP 02108) to your event location. There are no free miles — the travel fee applies from mile 1.</p>
      <p style="margin:0 0 8px;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:${BRAND_NAVY};">👥 Extra Guests Policy</p>
      <p style="margin:0 0 12px;font-weight:600;">Extra guests beyond the included package count are calculated at $5 per person.</p>
      <p style="margin:0 0 8px;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:${BRAND_NAVY};">💳 Payment Policy</p>
      <p style="margin:0;font-weight:600;">Payment is collected after the service. We accept multiple payment methods.</p>
    </div>
    <div style="text-align:center;margin-bottom:32px;">
      <p style="margin:0 0 20px;color:#4B5563;font-size:16px;font-weight:700;">Our team will be in touch to finalize the details. We can't wait to make your event special! 🍦</p>
      <a href="${portalUrl}" style="display:block;width:100%;box-sizing:border-box;background:${BRAND_NAVY};color:white;padding:18px 24px;border-radius:12px;text-decoration:none;font-weight:900;font-size:16px;text-transform:uppercase;">View Booking Details</a>
    </div>
    <div style="background:#F3F4F6;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;color:#6B7280;font-size:13px;font-weight:600;">Questions? Call us directly at <a href="tel:617-999-3803" style="color:${BRAND_NAVY};text-decoration:none;font-weight:800;">617-999-3803</a>.</p>
    </div>
  `;
  return sendEmail({ to, subject: `✅ Booking Confirmed — #${bookingNumber} | Boston Legend Ice Cream Truck`, html });
}

// ─── BOOKING REJECTED ─────────────────────────────────────────
export async function sendBookingRejectedEmail(to: string, firstName: string, bookingNumber: string, reason: string, bookingId: string) {
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bostonlegendicecream.com'}/portal/booking/${bookingId}`;
  let bookingDetailsHtml = "";
  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { customer: true, package: true, quote: true, stops: { orderBy: { stopOrder: 'asc' } } } });
    bookingDetailsHtml = formatBookingDetailsHtml(booking);
  } catch (e) { console.error("Error formatting booking details for rejected email:", e); }

  const html = `
    <div style="text-align:center;padding:24px 0 24px;">
      <h2 style="margin:0 0 8px;color:${BRAND_NAVY};font-size:26px;font-weight:900;">Update Needed for Your Request</h2>
      <p style="margin:0;color:#6B7280;font-size:15px;font-weight:600;">Hi ${firstName}, your request needs a quick adjustment before we can confirm it.</p>
    </div>
    <div style="background:#F3F4F6;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:900;text-transform:uppercase;color:#9CA3AF;">Booking Reference</p>
      <p style="margin:0;font-family:monospace;font-size:20px;font-weight:900;color:${BRAND_NAVY};">#${bookingNumber}</p>
    </div>
    <div style="background:#F9FAFB;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:900;text-transform:uppercase;color:#6B7280;">Details / Reason</p>
      <p style="margin:0;color:\${BRAND_NAVY};font-size:15px;font-weight:600;">${reason}</p>
    </div>
    ${bookingDetailsHtml}
    <div style="text-align:center;margin-bottom:32px;">
      <a href="${portalUrl}" style="display:block;width:100%;box-sizing:border-box;background:${BRAND_NAVY};color:${BRAND_CORAL};padding:18px 24px;border-radius:12px;text-decoration:none;font-weight:900;font-size:16px;text-transform:uppercase;">Update My Booking Request</a>
    </div>
  `;
  return sendEmail({ to, subject: `Update Needed: Your Boston Legend Ice Cream Truck Booking Request #${bookingNumber}`, html });
}

// ─── BOOKING PENDING REVIEW ───────────────────────────────────
export async function sendBookingPendingReviewEmail(to: string, firstName: string, bookingNumber: string, reason: string, bookingId: string) {
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bostonlegendicecream.com'}/portal/booking/${bookingId}`;
  let bookingDetailsHtml = "";
  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { customer: true, package: true, quote: true, stops: { orderBy: { stopOrder: 'asc' } } } });
    bookingDetailsHtml = formatBookingDetailsHtml(booking);
  } catch (e) { console.error("Error formatting booking details for pending review email:", e); }

  const html = `
    <div style="text-align:center;padding:24px 0 24px;">
      <h2 style="margin:0 0 8px;color:${BRAND_NAVY};font-size:26px;font-weight:900;">Booking Under Review</h2>
      <p style="margin:0;color:#6B7280;font-size:15px;font-weight:600;">Hi ${firstName}, your booking request is currently under review by our team.</p>
    </div>
    <div style="background:#F3F4F6;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:900;text-transform:uppercase;color:#9CA3AF;">Booking Reference</p>
      <p style="margin:0;font-family:monospace;font-size:20px;font-weight:900;color:${BRAND_NAVY};">#${bookingNumber}</p>
    </div>
    <div style="background:#F9FAFB;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:900;text-transform:uppercase;color:#6B7280;">Review Reason</p>
      <p style="margin:0;color:\${BRAND_NAVY};font-size:15px;font-weight:600;">${reason}</p>
    </div>
    ${bookingDetailsHtml}
    <div style="text-align:center;margin-bottom:32px;">
      <a href="${portalUrl}" style="display:block;width:100%;box-sizing:border-box;background:${BRAND_NAVY};color:${BRAND_CORAL};padding:18px 24px;border-radius:12px;text-decoration:none;font-weight:900;font-size:16px;text-transform:uppercase;">View or Manage Your Booking</a>
    </div>
  `;
  return sendEmail({ to, subject: `Booking Under Review: Your Boston Legend Ice Cream Truck Request #${bookingNumber}`, html });
}

// ─── CUSTOM QUOTE ─────────────────────────────────────────────
export async function sendCustomQuoteEmail(to: string, firstName: string, bookingNumber: string, bookingId: string) {
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bostonlegendicecream.com'}/portal/booking/${bookingId}`;
  let bookingDetailsHtml = "";
  let bookingDateStr = "";
  let bookingStartTime = "";
  let bookingGuests = "200+";
  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { customer: true, package: true, quote: true, stops: { orderBy: { stopOrder: 'asc' } } } });
    bookingDetailsHtml = formatBookingDetailsHtml(booking);
    if (booking) { bookingDateStr = booking.eventDate ? new Date(booking.eventDate).toLocaleDateString("en-US") : ""; bookingStartTime = booking.startTime || ""; bookingGuests = String(booking.guests); }
  } catch (e) { console.error("Error formatting booking details for custom quote email:", e); }

  const getWaLink = (waNumber: string) => {
    const msg = `Hello! I just submitted a Custom Quote request (Ref: #${bookingNumber}) for my event on ${bookingDateStr} at ${bookingStartTime} with ${bookingGuests} guests. Please review and provide the custom quote.`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  };

  const html = `
    <div style="text-align:center;padding:24px 0 24px;">
      <h2 style="margin:0 0 8px;color:${BRAND_NAVY};font-size:26px;font-weight:900;">Custom Quote Request Received</h2>
      <p style="margin:8px 0 0;color:#4B5563;font-size:16px;font-weight:600;line-height:1.5;">Hi ${firstName}, thank you for requesting a custom Boston Legend Ice Cream Truck event package. Because your event is for more than 200 guests, our team will personally review your request before preparing your final quote.</p>
    </div>
    <div style="background:#F3F4F6;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:900;text-transform:uppercase;color:#9CA3AF;">Booking Reference</p>
      <p style="margin:0;font-family:monospace;font-size:20px;font-weight:900;color:${BRAND_NAVY};">#${bookingNumber}</p>
    </div>
    <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:900;text-transform:uppercase;color:\${BRAND_NAVY};">WhatsApp Contact</p>
      <p style="margin:0 0 16px;color:\${BRAND_NAVY};font-size:15px;font-weight:600;line-height:1.4;">We will contact you through WhatsApp: 📞 617-999-3803 · 📞 617-866-2727</p>
      <a href="${getWaLink('16179993803')}" style="display:block;background:#25D366;color:#ffffff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:950;font-size:15px;margin-bottom:10px;text-align:center;">WhatsApp 617-999-3803</a>
      <a href="${getWaLink('16178662727')}" style="display:block;background:#25D366;color:#ffffff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:950;font-size:15px;text-align:center;">WhatsApp 617-866-2727</a>
    </div>
    ${bookingDetailsHtml}
    <div style="text-align:center;margin:32px 0 24px;">
      <a href="${portalUrl}" style="display:block;width:100%;box-sizing:border-box;background:${BRAND_NAVY};color:${BRAND_CORAL};padding:18px 24px;border-radius:12px;text-decoration:none;font-weight:950;font-size:16px;text-transform:uppercase;">View or Manage Your Request</a>
    </div>
  `;
  return sendEmail({ to, subject: `Custom Quote Request Received — Boston Legend Ice Cream Truck`, html });
}

// ─── OWNER NOTIFICATIONS ────────────────────────────────────────
function formatEventDate(dateObj: Date | string | null | undefined) {
  if (!dateObj) return "";
  try { return new Date(dateObj).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }); } catch { return String(dateObj); }
}

export async function sendOwnerNewBookingEmail(booking: any) {
  const to = getAdminRecipients();
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bostonlegendicecream.com'}/admin/bookings/${booking.id}`;
  const dateStr = formatEventDate(booking.eventDate);
  const subject = `New Booking Received – ${booking.customer?.firstName} ${booking.customer?.lastName} – ${dateStr}`;
  const html = `
    <h2 style="color:${BRAND_NAVY};margin-top:0;">New Booking Received</h2>
    <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;font-size:15px;color:#374151;">
      <tr><td width="35%" style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Customer Name</td><td style="border-bottom:1px solid #E5E7EB;">${booking.customer?.firstName} ${booking.customer?.lastName}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Phone Number</td><td style="border-bottom:1px solid #E5E7EB;">${booking.customer?.phone || 'N/A'}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Email Address</td><td style="border-bottom:1px solid #E5E7EB;">${booking.customer?.email || 'N/A'}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Event Date</td><td style="border-bottom:1px solid #E5E7EB;">${dateStr}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Start Time</td><td style="border-bottom:1px solid #E5E7EB;">${booking.startTime}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Package Selected</td><td style="border-bottom:1px solid #E5E7EB;">${booking.package?.name || 'Custom Package'}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Location</td><td style="border-bottom:1px solid #E5E7EB;">${booking.address}, ${booking.city} ${booking.zip}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Guest Count</td><td style="border-bottom:1px solid #E5E7EB;">${booking.guests}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Status</td><td style="border-bottom:1px solid #E5E7EB;">${booking.status}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Special Requests</td><td style="border-bottom:1px solid #E5E7EB;">${booking.notes || 'None'}</td></tr>
    </table>
    <br/>
    <div style="text-align:center;">
      <a href="${portalUrl}" style="display:inline-block;background:${BRAND_NAVY};color:${BRAND_CORAL};padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">View Booking</a>
    </div>
  `;
  return sendEmail({ to, subject, html, replyTo: booking.customer?.email });
}

export async function sendOwnerRequiresApprovalEmail(booking: any) {
  const to = getAdminRecipients();
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bostonlegendicecream.com'}/admin/bookings/${booking.id}`;
  const html = `
    <h2 style="color:${BRAND_NAVY};margin-top:0;">Booking Awaiting Approval</h2>
    <p>The following booking requires manual approval:</p>
    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:15px;color:#374151;">
      <tr><td width="35%" style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Customer Name</td><td style="border-bottom:1px solid #E5E7EB;">${booking.customer?.firstName} ${booking.customer?.lastName}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Date</td><td style="border-bottom:1px solid #E5E7EB;">${formatEventDate(booking.eventDate)}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Package</td><td style="border-bottom:1px solid #E5E7EB;">${booking.package?.name || 'Custom Package'}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Booking ID</td><td style="border-bottom:1px solid #E5E7EB;">${booking.bookingNumber}</td></tr>
    </table>
    <br/><div style="text-align:center;"><a href="${portalUrl}" style="display:inline-block;background:${BRAND_NAVY};color:${BRAND_CORAL};padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">Approve Booking</a></div>
  `;
  return sendEmail({ to, subject: `Booking Awaiting Approval`, html, replyTo: booking.customer?.email });
}

export async function sendOwnerLateBookingAlert(booking: any) {
  const to = getAdminRecipients();
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bostonlegendicecream.com'}/admin/bookings/${booking.id}`;
  const html = `
    <h2 style="color:${BRAND_CORAL};margin-top:0;">⚠️ URGENT – Last Minute Booking</h2>
    <p>A booking was just created for an event starting in less than 24 hours.</p>
    <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;font-size:15px;color:#374151;">
      <tr><td width="35%" style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Customer Name</td><td style="border-bottom:1px solid #E5E7EB;">${booking.customer?.firstName} ${booking.customer?.lastName}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Event Date</td><td style="border-bottom:1px solid #E5E7EB;">${formatEventDate(booking.eventDate)}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Start Time</td><td style="border-bottom:1px solid #E5E7EB;">${booking.startTime}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Location</td><td style="border-bottom:1px solid #E5E7EB;">${booking.address}, ${booking.city} ${booking.zip}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Package</td><td style="border-bottom:1px solid #E5E7EB;">${booking.package?.name || 'Custom Package'}</td></tr>
    </table>
    <br/><div style="text-align:center;"><a href="${portalUrl}" style="display:inline-block;background:\${BRAND_CORAL};color:#FFFFFF;padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">View Urgent Booking</a></div>
  `;
  return sendEmail({ to, subject: `URGENT – Last Minute Booking`, html, replyTo: booking.customer?.email });
}

export async function sendOwnerEventReminderEmail(booking: any) {
  const to = ADMIN_EMAIL;
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bostonlegendicecreamtruck.com'}/admin/bookings/${booking.id}`;
  const html = `
    <h2 style="color:${BRAND_NAVY};margin-top:0;">Upcoming Event Tomorrow</h2>
    <p>This is a 24-hour reminder for the following upcoming event:</p>
    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:15px;color:#374151;">
      <tr><td width="35%" style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Customer Name</td><td style="border-bottom:1px solid #E5E7EB;">${booking.customer?.firstName} ${booking.customer?.lastName}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Date</td><td style="border-bottom:1px solid #E5E7EB;">${formatEventDate(booking.eventDate)}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Time</td><td style="border-bottom:1px solid #E5E7EB;">${booking.startTime}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Address</td><td style="border-bottom:1px solid #E5E7EB;">${booking.address}, ${booking.city} ${booking.zip}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Package</td><td style="border-bottom:1px solid #E5E7EB;">${booking.package?.name || 'Custom Package'}</td></tr>
    </table>
    <br/><div style="text-align:center;"><a href="${portalUrl}" style="display:inline-block;background:${BRAND_NAVY};color:${BRAND_CORAL};padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">Review Booking Details</a></div>
  `;
  return sendEmail({ to, subject: `Upcoming Event Tomorrow`, html });
}

// ─── INQUIRY REPLY / ESCALATION ──────────────────────────────
export async function sendChatEscalationOwnerEmail(inquiry: { id: string; name: string; email: string; phone?: string | null; notes?: string | null; pageUrl?: string | null; createdAt?: Date | string; }) {
  const OWNER_EMAIL = BUSINESS_CONFIG.contact.email;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bostonlegendicecreamtruck.com';
  const inquiryUrl = `${siteUrl}/admin/inquiries`;
  const timestamp = inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

  const html = `
    <div style="text-align:center;padding:24px 0 20px;">
      <h2 style="margin:0 0 8px;color:${BRAND_NAVY};font-size:26px;font-weight:900;">Human Support Requested</h2>
      <p style="margin:0;color:#6B7280;font-size:15px;font-weight:600;">A customer needs live assistance via the AI Chat Widget.</p>
    </div>
    <table width="100%" cellpadding="12" cellspacing="0" style="font-size:15px;color:#374151;border-collapse:collapse;margin-bottom:24px;background:#F8F9FC;border-radius:12px;">
      <tr><td width="35%" style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #E5E7EB;">Customer Name</td><td style="border-bottom:1px solid #E5E7EB;font-weight:600;">${inquiry.name}</td></tr>
      <tr><td style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #E5E7EB;">Email</td><td style="border-bottom:1px solid #E5E7EB;font-weight:600;"><a href="mailto:${inquiry.email}" style="color:${BRAND_NAVY};font-weight:700;">${inquiry.email}</a></td></tr>
      <tr><td style="font-weight:800;color:${BRAND_NAVY};border-bottom:1px solid #E5E7EB;">Phone</td><td style="border-bottom:1px solid #E5E7EB;font-weight:600;">${inquiry.phone || 'Not provided'}</td></tr>
      <tr><td style="font-weight:800;color:${BRAND_NAVY};">Timestamp</td><td style="font-weight:600;">${timestamp}</td></tr>
    </table>
    ${inquiry.notes ? `<div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:16px 20px;margin-bottom:24px;"><p style="margin:0 0 8px;font-size:12px;font-weight:900;text-transform:uppercase;color:\${BRAND_NAVY};">Chat Context</p><p style="margin:0;color:#374151;font-size:14px;font-weight:600;white-space:pre-wrap;">${inquiry.notes}</p></div>` : ''}
    <div style="text-align:center;margin-top:16px;">
      <a href="${inquiryUrl}" style="display:block;width:100%;box-sizing:border-box;background:${BRAND_NAVY};color:${BRAND_CORAL};padding:18px 24px;border-radius:12px;text-decoration:none;font-weight:900;font-size:16px;text-transform:uppercase;">View Conversation in Admin Inbox</a>
    </div>
  `;
  return sendEmail({ to: OWNER_EMAIL, subject: `🚨 Human Support Requested — ${inquiry.name}`, html, title: "Human Support Requested", replyTo: inquiry.email });
}

// ─── GOOGLE REVIEW REQUEST ────────────────────────────────────
const GOOGLE_REVIEW_URL = "https://g.page/r/CWDhxc3sMbFAEAI/review";

export async function sendGoogleReviewRequestEmail(booking: { id: string; bookingNumber: string; eventDate: Date; eventType: string; customer: { firstName: string; lastName: string; email: string }; package?: { name: string } | null; }) {
  const customerName = `${booking.customer.firstName}`;
  const packageName = booking.package?.name ?? "Ice Cream Truck";
  const eventDate = new Date(booking.eventDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const html = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="font-size:40px;line-height:1;margin-bottom:16px;">🍦⭐</div>
      <h1 style="font-size:26px;font-weight:900;color:${BRAND_NAVY};margin:0 0 8px;">Thank You, ${customerName}!</h1>
      <p style="font-size:15px;color:#6B7280;font-weight:600;margin:0;">We hope your event was absolutely delicious.</p>
    </div>
    <div style="background:#F9FAFB;border:2px solid #FEF3C7;border-radius:16px;padding:24px;margin-bottom:24px;text-align:center;">
      <p style="font-size:15px;color:\${BRAND_NAVY};font-weight:700;margin:0 0 4px;">Your recent event</p>
      <p style="font-size:20px;font-weight:900;color:${BRAND_NAVY};margin:0;">${packageName} — ${eventDate}</p>
    </div>
    <p style="font-size:16px;color:#374151;font-weight:600;line-height:1.7;margin-bottom:20px;">
      It was a pleasure serving your event! If you enjoyed your Boston Legend Ice Cream Truck experience, we'd be incredibly grateful if you could take 30 seconds to leave us a review on Google. It really helps other families and businesses discover us!
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${GOOGLE_REVIEW_URL}" style="display:inline-block;background:${BRAND_CORAL};color:${BRAND_NAVY};padding:18px 40px;border-radius:50px;text-decoration:none;font-weight:900;font-size:17px;box-shadow:0 8px 20px rgba(255,160,0,0.35);">⭐ Leave a Google Review</a>
    </div>
    <p style="font-size:13px;color:#9CA3AF;font-weight:600;text-align:center;margin-top:20px;">Takes less than 30 seconds — and it means the world to our small business! 🙏</p>
    <div style="margin-top:24px;padding:16px;background:#F9FAFB;border-radius:12px;text-align:center;">
      <p style="font-size:13px;color:#6B7280;font-weight:600;margin:0 0 4px;">Need anything else?</p>
      <a href="https://www.bostonlegendicecreamtruck.com/packages" style="color:${BRAND_CORAL};font-weight:800;font-size:14px;">Book your next event →</a>
    </div>
  `;
  return sendEmail({ to: booking.customer.email, subject: `${customerName}, thank you for choosing Boston Legend Ice Cream Truck! ⭐`, html, title: "Thank You — Boston Legend Ice Cream Truck" });
}

// ─── CONTACT AND QUOTE REQUEST NOTIFICATIONS ──────────────────
export async function sendContactMessageNotification(data: { name: string, email: string, message: string }) {
  const html = `
    <h2 style="color:${BRAND_NAVY};margin-top:0;">New Contact Form Message</h2>
    <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;font-size:15px;color:#374151;">
      <tr><td width="25%" style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Name</td><td style="border-bottom:1px solid #E5E7EB;">${data.name}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Email</td><td style="border-bottom:1px solid #E5E7EB;">${data.email}</td></tr>
    </table>
    <div style="margin-top:20px;padding:15px;background:#F9FAFB;border-left:4px solid ${BRAND_CORAL};">
      <p style="margin:0;font-weight:600;white-space:pre-wrap;">${data.message}</p>
    </div>
  `;
  return sendEmail({ to: getAdminRecipients(), subject: `Contact Form Message from ${data.name}`, html, replyTo: data.email });
}

export async function sendQuoteRequestNotification(inquiry: any) {
  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bostonlegendicecreamtruck.com'}/admin/inquiries`;
  const html = `
    <h2 style="color:${BRAND_NAVY};margin-top:0;">New Custom Quote Request</h2>
    <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;font-size:15px;color:#374151;">
      <tr><td width="35%" style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Customer Name</td><td style="border-bottom:1px solid #E5E7EB;">${inquiry.name}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Phone</td><td style="border-bottom:1px solid #E5E7EB;">${inquiry.phone || 'N/A'}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Email</td><td style="border-bottom:1px solid #E5E7EB;">${inquiry.email}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Event Type</td><td style="border-bottom:1px solid #E5E7EB;">${inquiry.eventType}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Event Date</td><td style="border-bottom:1px solid #E5E7EB;">${inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : 'N/A'}</td></tr>
      <tr><td style="font-weight:bold;border-bottom:1px solid #E5E7EB;">Guest Count</td><td style="border-bottom:1px solid #E5E7EB;">${inquiry.guestCount || 'N/A'}</td></tr>
    </table>
    ${inquiry.notes ? `<div style="margin-top:20px;padding:15px;background:#F9FAFB;border-left:4px solid ${BRAND_CORAL};"><p style="margin:0;font-weight:600;white-space:pre-wrap;">${inquiry.notes}</p></div>` : ''}
    <br/><div style="text-align:center;"><a href="${portalUrl}" style="display:inline-block;background:${BRAND_NAVY};color:${BRAND_CORAL};padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">View in Admin</a></div>
  `;
  return sendEmail({ to: ADMIN_EMAIL, subject: `Custom Quote Request: ${inquiry.name}`, html, replyTo: inquiry.email });
}
