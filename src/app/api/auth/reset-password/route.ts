import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendForgotPasswordEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, otp, newPassword } = body;

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    if (action === "SEND_RESET_OTP") {
      // 1. Check if user/customer exists
      const customer = await prisma.customer.findUnique({ where: { email: email.toLowerCase() } });
      const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
      
      const accountName = customer?.firstName || user?.name || "there";

      if (!customer && !user) {
        // We still return success to prevent email enumeration, but we don't send an email
        return NextResponse.json({ success: true, message: "If an account exists, a reset code was sent." });
      }

      // 2. Generate and store OTP
      const code = crypto.randomInt(100000, 999999).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

      await prisma.otpCode.create({
        data: {
          email: email.toLowerCase(),
          code,
          expiresAt,
          purpose: "PASSWORD_RESET",
        }
      });

      // 3. Send email
      await sendForgotPasswordEmail(email, code, accountName);
      
      return NextResponse.json({ success: true, message: "If an account exists, a reset code was sent." });
    }

    if (action === "VERIFY_AND_RESET") {
      if (!otp || !newPassword) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      // 1. Verify OTP
      const validOtp = await prisma.otpCode.findFirst({
        where: {
          email: email.toLowerCase(),
          code: otp,
          purpose: "PASSWORD_RESET",
          expiresAt: { gt: new Date() },
          verified: false
        },
        orderBy: { createdAt: 'desc' }
      });

      if (!validOtp) {
        return NextResponse.json({ error: "Invalid or expired reset code." }, { status: 400 });
      }

      // 2. Hash Password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      // 3. Update Password for Customer and/or User
      let updated = false;
      const customer = await prisma.customer.findUnique({ where: { email: email.toLowerCase() } });
      if (customer) {
        await prisma.customer.update({ where: { id: customer.id }, data: { passwordHash } });
        updated = true;
      }
      const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
      if (user) {
        await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
        updated = true;
      }

      if (updated) {
        // Mark verified
        await prisma.otpCode.update({
          where: { id: validOtp.id },
          data: { verified: true }
        });
        return NextResponse.json({ success: true, message: "Password has been reset successfully" });
      } else {
        return NextResponse.json({ error: "Account not found" }, { status: 404 });
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Reset Password API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
