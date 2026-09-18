"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";

type Step = "loading" | "error" | "set-password" | "done";

function AcceptInviteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [step, setStep] = useState<Step>("loading");
  const [inviteData, setInviteData] = useState<{ email: string; role: string } | null>(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) { setError("No invitation token found. Please use the link from your email."); setStep("error"); return; }
    fetch(`/api/admin/staff-invite?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) { setInviteData(data.data); setStep("set-password"); }
        else { setError(data.error || "Invalid invitation"); setStep("error"); }
      })
      .catch(() => { setError("Network error. Please try again."); setStep("error"); });
  }, [token]);

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/staff-invite?action=accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, name, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) { setStep("done"); setTimeout(() => router.push("/admin"), 3000); }
      else { setError(data.error || "Failed to activate account"); }
    } catch { setError("Network error. Please try again."); }
    setSaving(false);
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-coral via-amber-400 to-coral" />

        {step === "loading" && (
          <div className="flex flex-col items-center py-12 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-coral" />
            <p className="text-slate-500 font-semibold text-sm">Verifying invitation...</p>
          </div>
        )}

        {step === "error" && (
          <div className="flex flex-col items-center py-8 gap-4 text-center">
            <AlertCircle className="w-14 h-14 text-red-400" />
            <h2 className="text-xl font-black text-navy">Invalid Invitation</h2>
            <p className="text-sm text-slate-500 font-semibold">{error}</p>
            <a href="/admin" className="text-xs font-bold text-coral hover:underline mt-2">Go to Admin →</a>
          </div>
        )}

        {step === "done" && (
          <div className="flex flex-col items-center py-8 gap-4 text-center">
            <CheckCircle2 className="w-14 h-14 text-emerald-500" />
            <h2 className="text-xl font-black text-navy">Account Activated! 🎉</h2>
            <p className="text-sm text-slate-500 font-semibold">Your Boston Legend Ice Cream Truck staff account is ready. Redirecting...</p>
          </div>
        )}

        {step === "set-password" && inviteData && (
          <>
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-6 h-6 text-coral" />
              <div>
                <h2 className="text-navy font-black text-xl">Set Up Your Account</h2>
                <p className="text-navy/50 font-medium text-xs">
                  {inviteData.email} · Role: <span className="font-black text-coral">{inviteData.role}</span>
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 font-bold text-xs flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={handleAccept} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-navy mb-1">Your Full Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-coral/30 text-sm" placeholder="First Last" autoComplete="name" />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1">Create Password</label>
                <div className="relative">
                  <input required type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-coral/30 text-sm pr-12" placeholder="Min 8 characters" autoComplete="new-password" minLength={8} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy">
                    {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1">Confirm Password</label>
                <input required type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-coral/30 text-sm" placeholder="Repeat password" autoComplete="new-password" minLength={8} />
              </div>
              <button type="submit" disabled={saving} className="w-full py-4 rounded-2xl font-black text-base text-white bg-navy hover:bg-navy/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
                {saving ? <><Loader2 className="w-5 h-5 animate-spin" /> Activating...</> : <>Activate Account <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </>
        )}
      </div>
      <div className="mt-6 text-center">
        <a href="/admin" className="text-xs font-bold text-slate-500 hover:text-coral transition-colors">← Return to Admin</a>
      </div>
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <Suspense fallback={<div className="py-12"><Loader2 className="w-10 h-10 animate-spin text-coral" /></div>}>
        <AcceptInviteContent />
      </Suspense>
    </div>
  );
}
