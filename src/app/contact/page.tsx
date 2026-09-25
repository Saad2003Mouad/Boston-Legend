"use client";

import { useState, useEffect } from "react";
import { BUSINESS_CONFIG } from "@/lib/config";
import { Phone, Mail, ArrowRight, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

const SITE_KEY = "6LchenctAAAAAHpLKDsK-Igil1E3rCXzI8J2DqzC";

function useRecaptcha() {
  useEffect(() => {
    const existingScript = document.querySelector(`script[src*="recaptcha/enterprise"]`);
    if (existingScript) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const getToken = (action: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const w = window as any;
      if (!w.grecaptcha?.enterprise) { reject(new Error("reCAPTCHA not loaded")); return; }
      w.grecaptcha.enterprise.ready(async () => {
        try { resolve(await w.grecaptcha.enterprise.execute(SITE_KEY, { action })); }
        catch (err) { reject(err); }
      });
    });

  return { getToken };
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    _gotcha: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const { getToken } = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      let recaptchaToken = "";
      try { recaptchaToken = await getToken("CONTACT_FORM"); } catch {}
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
      } else if (res.status === 429) {
        setError("Too many messages recently. Please wait a moment and try again.");
      } else if (res.status === 400 && data.error?.includes("Security")) {
        setError("Security check failed. Please refresh the page and try again.");
      } else {
        setError("There was an error sending your message. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 
    "w-full px-0 py-4 bg-transparent border-b-2 border-navy/10 focus:border-coral outline-none transition-colors duration-300 font-medium text-navy placeholder:text-navy/40 text-lg";

  return (
    <div className="bg-cream min-h-screen">
      <section className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT PANE - NAVY */}
        <div className="w-full lg:w-5/12 bg-[#071B3A] relative overflow-hidden flex flex-col justify-center px-8 pt-32 pb-20 md:px-16 lg:px-20 lg:pt-40 lg:pb-32 z-10">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-coral/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
          
          <div className="relative z-10 text-cream h-full flex flex-col justify-between">
            
            <div>
              <span className="inline-block py-1.5 px-5 bg-coral/20 text-coral font-bold text-xs tracking-[0.2em] uppercase rounded-full mb-8 border border-coral/30">
                Get In Touch
              </span>
              <h1 className="font-display font-light italic text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] mb-8">
                Let&apos;s plan something <br/><span className="text-coral not-italic font-normal">legendary.</span>
              </h1>
              <p className="text-cream/70 text-lg max-w-md mb-16 leading-relaxed">
                Whether you&apos;re hosting an intimate backyard party or a massive corporate event, we bring the joy directly to you.
              </p>
            </div>

            <div className="space-y-10">
              <a href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`} className="group flex items-start gap-6 hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-coral/10 text-coral flex items-center justify-center shrink-0 border border-coral/20 group-hover:bg-coral group-hover:text-cream transition-colors duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-cream/50 text-sm font-bold uppercase tracking-wider mb-1">Call Us Directly</p>
                  <p className="text-2xl font-semibold text-cream">{BUSINESS_CONFIG.contact.phone1}</p>
                </div>
              </a>
              
              <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="group flex items-start gap-6 hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0 border border-gold/20 group-hover:bg-gold group-hover:text-navy transition-colors duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-cream/50 text-sm font-bold uppercase tracking-wider mb-1">Send an Email</p>
                  <p className="text-xl font-medium text-cream">{BUSINESS_CONFIG.contact.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-cream/5 text-cream/80 flex items-center justify-center shrink-0 border border-cream/10">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-cream/50 text-sm font-bold uppercase tracking-wider mb-1">Operating Hours</p>
                  <p className="text-lg font-medium text-cream">7 Days a Week</p>
                  <p className="text-cream/50 text-sm mt-1">Ready for any event schedule</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-cream/10">
              <div className="bg-cream/5 backdrop-blur-md rounded-2xl p-6 border border-cream/10 flex items-center justify-between">
                <div>
                  <p className="font-bold text-cream">Want to book an event?</p>
                  <p className="text-sm text-cream/60 mt-1">Skip the form and go straight to booking.</p>
                </div>
                <Link href="/book" className="w-12 h-12 rounded-full bg-coral text-cream flex items-center justify-center hover:scale-105 transition-transform shrink-0 shadow-lg shadow-coral/20">
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANE - CREAM */}
        <div className="w-full lg:w-7/12 bg-[#FFFDF8] flex items-center justify-center p-8 py-20 md:p-16 lg:p-24 lg:pt-40 relative z-0">
          <div className="w-full max-w-2xl">
            {isSuccess ? (
              <div className="bg-green-50 rounded-3xl p-10 md:p-16 text-center border border-green-100 shadow-xl shadow-green-900/5">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle size={48} strokeWidth={1.5} />
                </div>
                <h3 className="font-display italic text-4xl text-navy mb-4">Message Sent!</h3>
                <p className="text-navy/70 text-lg mb-8 max-w-md mx-auto">
                  Thank you for reaching out. A member of our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-4 bg-navy text-white rounded-full font-bold hover:bg-coral transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="mb-14">
                  <h2 className="font-display italic font-light text-[clamp(2.5rem,4vw,3.5rem)] text-navy mb-4 leading-tight tracking-tight">
                    Send us a <span className="text-coral not-italic font-medium">message.</span>
                  </h2>
                  <p className="text-navy/60 text-lg">Fill out the form below and we'll reply as soon as possible.</p>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-5 rounded-2xl border border-red-100 font-medium text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="First Name"
                    className={inputClass}
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Last Name"
                    className={inputClass}
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <textarea
                  name="message"
                  required
                  placeholder="How can we help you?"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                {/* Honeypot */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  value={formData._gotcha}
                  onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                />

                <div className="pt-8">
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full md:w-auto px-12 py-5 bg-navy text-white rounded-full font-bold text-lg hover:bg-coral transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-navy/20 hover:shadow-coral/20"
                  >
                    {isSubmitting ? (
                      <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-navy/40 mt-6 max-w-sm">
                    This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="underline hover:text-navy">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="underline hover:text-navy">Terms of Service</a> apply.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
