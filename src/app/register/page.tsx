"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, Loader2, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"DETAILS" | "OTP">("DETAILS");
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "SEND_OTP", email, firstName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send code");
      setStep("OTP");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "VERIFY_AND_CREATE", email, password, firstName, lastName, phone, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* ── Left Panel: Desktop Only ── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col items-center justify-center overflow-hidden p-12 bg-navy">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/10 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          <div className="w-28 h-28 mb-8">
            <Image src="/images/logo.png" alt="American Legend Ice Cream Truck" width={112} height={112}
              className="w-full h-full object-contain drop-shadow-2xl" priority />
          </div>
          <p className="text-coral font-black text-xs tracking-[0.3em] uppercase mb-3">Join the Family</p>
          <h1 className="font-display font-light italic text-4xl text-white leading-tight mb-5">
            Create Your <br /><span className="text-coral font-black not-italic">Sweet Account</span>
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            Book your ice cream truck experience, track your events, and manage everything from one place.
          </p>
          <div className="flex flex-col gap-3 w-full">
            {["🍦 Easy online booking", "📍 Real-time tracking", "🎉 Manage all events"].map(f => (
              <div key={f} className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-sm text-white/80 font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:flex-1 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-8 bg-slate-50 relative">
        {/* Mobile top gradient */}
        <div className="lg:hidden absolute top-0 left-0 right-0 h-40 bg-navy pointer-events-none" />

        {/* Mobile logo */}
        <div className="lg:hidden relative z-10 flex flex-col items-center mb-5 mt-2">
          <div className="w-16 h-16 rounded-full border-2 border-white/20 shadow-xl p-2 bg-white/10 backdrop-blur-sm mb-2">
            <Image src="/images/logo.png" alt="American Legend Ice Cream Truck" width={64} height={64}
              className="w-full h-full object-contain" />
          </div>
          <p className="font-display font-black text-lg text-white">American <span className="text-coral">Legend</span></p>
          <p className="text-xs text-white/70 font-medium">Ice Cream Truck</p>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="mb-5">
            <h2 className="text-2xl font-black text-navy tracking-tight">Create an Account</h2>
            <p className="text-slate-500 text-sm mt-1">Join American Legend Ice Cream Truck</p>
          </div>

          {success ? (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center space-y-4">
              <CheckCircle2 className="mx-auto text-green-500" size={56} />
              <h2 className="text-xl font-black text-navy">Account Created!</h2>
              <p className="text-slate-500 text-sm">Your account has been verified. Redirecting to login...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl shadow-navy/10 border border-slate-100 p-6">
              {error && (
                <div className="p-3 mb-5 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center border border-red-100">
                  {error}
                </div>
              )}

              {step === "DETAILS" ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                          className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/25 focus:border-coral transition-all text-slate-800 font-medium text-sm placeholder:text-slate-400"
                          placeholder="John" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                          className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/25 focus:border-coral transition-all text-slate-800 font-medium text-sm placeholder:text-slate-400"
                          placeholder="Doe" required />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/25 focus:border-coral transition-all text-slate-800 font-medium text-sm placeholder:text-slate-400"
                        placeholder="you@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/25 focus:border-coral transition-all text-slate-800 font-medium text-sm placeholder:text-slate-400"
                        placeholder="(617) 555-0123" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                      <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/25 focus:border-coral transition-all text-slate-800 font-medium text-sm placeholder:text-slate-400"
                        placeholder="Min. 8 characters" minLength={8} required />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" tabIndex={-1}>
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 bg-navy text-white rounded-xl font-black text-sm hover:bg-coral transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 group shadow-lg shadow-navy/20 mt-2">
                    {loading ? <Loader2 className="animate-spin" size={18} /> : (
                      <> Continue to Verification <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /> </>
                    )}
                  </button>

                  <p className="text-center text-slate-500 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-navy font-bold hover:text-coral transition-colors">Sign In</Link>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleVerifyAndCreate} className="space-y-5">
                  <div className="text-center mb-4">
                    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="text-blue-500" size={28} />
                    </div>
                    <h3 className="text-lg font-black text-navy mb-1">Check your email</h3>
                    <p className="text-slate-500 text-sm">We sent a 6-digit code to<br/><strong className="text-navy">{email}</strong></p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 text-center block">Verification Code</label>
                    <input type="text" value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/25 focus:border-coral transition-all text-navy font-black text-center text-2xl tracking-[0.5em]"
                      placeholder="000000" required />
                  </div>

                  <button type="submit" disabled={loading || otp.length !== 6}
                    className="w-full py-3.5 bg-coral text-white rounded-xl font-black text-sm hover:bg-coral/90 transition-all duration-300 flex items-center justify-center disabled:opacity-60 shadow-lg shadow-coral/20">
                    {loading ? <Loader2 className="animate-spin" size={18} /> : "Verify & Create Account"}
                  </button>

                  <button type="button" onClick={() => setStep("DETAILS")}
                    className="w-full py-2.5 text-slate-500 font-bold hover:text-navy transition-colors text-sm">
                    ← Back to details
                  </button>
                </form>
              )}
            </div>
          )}

          <p className="text-center text-xs text-slate-400 mt-5">
            &copy; {new Date().getFullYear()} American Legend Ice Cream Truck LLC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
