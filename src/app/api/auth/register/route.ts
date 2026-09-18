import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendOtpEmail, sendWelcomeEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, password, firstName, lastName, phone, otp } = body;

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    if (action === "SEND_OTP") {
      // 1. Check if user already exists
      const existingCustomer = await prisma.customer.findUnique({ where: { email: email.toLowerCase() } });
      const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
      
      if (existingCustomer || existingUser) {
        return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
      }

      // 2. Generate and store OTP
      const code = crypto.randomInt(100000, 999999).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

      await prisma.otpCode.create({
        data: {
          email: email.toLowerCase(),
          code,
          expiresAt,
          purpose: "REGISTRATION",
        }
      });

      // 3. Send email
      await sendOtpEmail(email, code, firstName, "GENERAL"); // Using GENERAL or PORTAL
      
      return NextResponse.json({ success: true, message: "OTP sent to email" });
    }

    if (action === "VERIFY_AND_CREATE") {
      if (!otp || !password || !firstName || !lastName || !phone) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      // 1. Verify OTP
      const validOtp = await prisma.otpCode.findFirst({
        where: {
          email: email.toLowerCase(),
          code: otp,
          purpose: "REGISTRATION",
          expiresAt: { gt: new Date() },
          verified: false
        },
        orderBy: { createdAt: 'desc' }
      });

      if (!validOtp) {
        return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 400 });
      }

      // Mark verified
      await prisma.otpCode.update({
        where: { id: validOtp.id },
        data: { verified: true }
      });

      // 2. Hash Password and Create Customer
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const customer = await prisma.customer.create({
        data: {
          firstName,
          lastName,
          email: email.toLowerCase(),
          phone,
          passwordHash
        }
      });

      // 3. Send Welcome Email
      // Run in background so it doesn't block response
      sendWelcomeEmail(email, firstName).catch(console.error);

      return NextResponse.json({ success: true, message: "Account created successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Register API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
