"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import Logo from "@/components/shared/Logo";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"EMAIL" | "OTP_AND_RESET">("EMAIL");
  
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "SEND_RESET_OTP", email }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to send code");
      
      setStep("OTP_AND_RESET");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "VERIFY_AND_RESET",
          email,
          newPassword,
          otp
        }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Verification failed");
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream relative overflow-hidden font-sans pt-20 pb-12">
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-coral/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-navy/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Logo width={200} height={100} />
            </Link>
          </div>
          <h1 className="font-display font-black text-3xl text-navy mb-2">Reset Password</h1>
          <p className="text-gray-500 font-medium">Get back to your account</p>
        </div>

        {success ? (
          <div className="bg-[#FFFDF8] p-8 rounded-[2rem] shadow-xl text-center space-y-4">
            <CheckCircle2 className="mx-auto text-green-500" size={64} />
            <h2 className="text-2xl font-black text-navy">Password Reset!</h2>
            <p className="text-gray-500 font-medium">Your password has been successfully updated. Redirecting to login...</p>
          </div>
        ) : (
          <div className="bg-[#FFFDF8] p-8 rounded-[2rem] shadow-xl shadow-navy/5 border border-navy/5">
            {error && (
              <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center border border-red-100">
                {error}
              </div>
            )}

            {step === "EMAIL" ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <p className="text-gray-500 text-sm mb-4">Enter your email address and we'll send you a 6-digit code to reset your password.</p>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all text-navy font-medium"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-navy text-white rounded-2xl font-black text-lg hover:bg-coral hover:shadow-xl hover:shadow-coral/20 transition-all duration-300 disabled:opacity-70 disabled:hover:bg-navy flex items-center justify-center gap-2 group mt-4"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      Send Reset Code
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-gray-500 font-medium text-sm mt-6">
                  <Link href="/login" className="text-navy font-bold hover:text-coral transition-colors">
                    ← Back to Login
                  </Link>
                </p>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-black text-navy mb-2">Check your email</h3>
                  <p className="text-gray-500 text-sm font-medium">We sent a 6-digit verification code to<br/><strong className="text-navy">{email}</strong></p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy ml-1 text-center block">Verification Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all text-navy font-black text-center text-2xl tracking-[0.5em]"
                    placeholder="000000"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy ml-1">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all text-navy font-medium"
                      placeholder="••••••••"
                      minLength={8}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6 || newPassword.length < 8}
                  className="w-full py-4 bg-coral text-white rounded-2xl font-black text-lg hover:bg-coral/90 transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : "Update Password"}
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep("EMAIL")}
                  className="w-full py-3 text-gray-500 font-bold hover:text-navy transition-colors text-sm"
                >
                  ← Try another email
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
