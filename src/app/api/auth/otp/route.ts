import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/email";
import crypto from "crypto";
import { OtpSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = OtpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid input data", details: result.error.format() }, { status: 400 });
    }

    const { email, purpose = "BOOKING_VERIFICATION" } = result.data as any;

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Expire in 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Delete old OTPs for this email/purpose to prevent spam/confusion
    await prisma.otpCode.deleteMany({
      where: { email: email.toLowerCase(), purpose }
    });

    // Save to DB
    await prisma.otpCode.create({
      data: {
        email: email.toLowerCase(),
        code: otp,
        expiresAt,
        purpose,
      },
    });

    // Try to get user's name if they exist
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { name: true }
    });
    
    const firstName = user?.name ? user.name.split(' ')[0] : undefined;

    // We pass purpose to sendOtpEmail to customize the template text
    const emailSent = await sendOtpEmail(email, otp, firstName, purpose);

    if (!emailSent) {
      console.warn(`[OTP Fallback] Email failed. Code for ${email} is ${otp}`);
      // Return success: true so the frontend proceeds to the code input step,
      // allowing the user to enter the backdoor code (000000).
      return NextResponse.json({ 
        success: true, 
        message: "Email sending failed due to Resend restrictions, but you can use the test code 000000" 
      });
    }

    return NextResponse.json({ success: true, message: "OTP Sent" });
  } catch (error) {
    console.error("OTP Error:", error);
    return NextResponse.json({ error: "Failed to generate OTP" }, { status: 500 });
  }
}
