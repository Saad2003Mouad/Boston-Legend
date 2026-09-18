"use client";

import { useState, useEffect } from "react";
import { BUSINESS_CONFIG } from "@/lib/config";
import { Phone, Mail, MapPin, Clock, MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import FAQSection from "@/components/shared/FAQSection";

const SITE_KEY = "6LchenctAAAAAHpLKDsK-Igil1E3rCXzI8J2DqzC";

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We proudly serve the entire state of Massachusetts. Depending on the distance from our headquarters, a small travel fee may apply. Contact us to confirm availability in your specific town!"
  },
  {
    question: "Do you only do large events?",
    answer: "Not at all! While we frequently serve massive corporate campuses and large festivals, we also love bringing joy to smaller, intimate gatherings like birthday parties and family reunions. We have packages designed for groups of all sizes."
  },
  {
    question: "How far in advance should I book?",
    answer: "Our calendar fills up extremely fast, especially during the peak summer months. We recommend booking at least 1-2 months in advance. However, we have a large fleet and will always do our best to accommodate last-minute requests if we have an opening."
  }
];

// Load reCAPTCHA Enterprise script
function useRecaptcha() {
  useEffect(() => {
    const existingScript = document.querySelector(`script[src*="recaptcha/enterprise"]`);
    if (existingScript) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const getToken = (action: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const w = window as any;
      if (!w.grecaptcha?.enterprise) {
        reject(new Error("reCAPTCHA not loaded"));
        return;
      }
      w.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await w.grecaptcha.enterprise.execute(SITE_KEY, { action });
          resolve(token);
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  return { getToken };
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    _gotcha: '', // honeypot — hidden from real users
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { getToken } = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Get reCAPTCHA Enterprise token
      let recaptchaToken = '';
      try {
        recaptchaToken = await getToken('CONTACT_FORM');
      } catch (err) {
        console.warn('reCAPTCHA token failed:', err);
        // Still attempt submission — server will handle gracefully
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
      } else if (res.status === 429) {
        setError("You've sent too many messages recently. Please wait a bit and try again.");
      } else if (res.status === 400 && data.error?.includes('Security')) {
        setError("Security check failed. Please refresh the page and try again.");
      } else {
        setError("There was an error sending your message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-cream">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 bg-coral/10 text-coral font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full mb-6 border border-coral/20">
            🍦 Contact Us
          </span>
          <h1 className="font-display italic font-light text-[clamp(3.5rem,7vw,6rem)] leading-tight text-charcoal mb-6">
            Let's <span className="text-coral underline decoration-wavy decoration-coral/50 underline-offset-[12px]">Connect.</span>
          </h1>
          <p className="font-sans font-medium text-lg md:text-2xl text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Have a question about a package? Need a custom quote? We're here to help you plan the perfect event.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 relative z-10 -mt-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Contact Info (Left Side) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-5 sm:p-8 md:p-10 rounded-3xl sm:rounded-[2.5rem] shadow-xl border border-navy/5 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-coral/5 rounded-full blur-2xl" />
                
                <h2 className="font-display font-black text-3xl text-navy mb-8">Get In Touch</h2>
                
                <div className="space-y-8 relative z-10">
                  {/* Phone */}
                  <div className="flex items-start gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-coral/10 text-coral flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-coral group-hover:text-white transition-all duration-300">
                      <Phone size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-lg mb-1">Call Us</h3>
                      <p className="text-navy/60 text-sm font-medium mb-2">Available Mon - Sat.</p>
                      <a href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`} className="block text-xl font-bold text-navy hover:text-coral transition-colors">
                        {BUSINESS_CONFIG.contact.phone1}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                      <Mail size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-lg mb-1">Email Us</h3>
                      <p className="text-navy/60 text-sm font-medium mb-2">We typically reply within hours.</p>
                      <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="text-lg font-bold text-navy hover:text-gold transition-colors break-all">
                        {BUSINESS_CONFIG.contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-navy/10 text-navy flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-navy group-hover:text-white transition-all duration-300">
                      <MapPin size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-lg mb-1">Headquarters</h3>
                      <p className="text-navy/60 text-sm font-medium mb-2">Serving all of Massachusetts</p>
                      <address className="text-navy font-bold not-italic">
                        {BUSINESS_CONFIG.address.street}<br/>
                        {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.state} {BUSINESS_CONFIG.address.zip}
                      </address>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-mint/10 text-mint flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-mint group-hover:text-white transition-all duration-300">
                      <Clock size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-lg mb-1">Hours</h3>
                      <p className="text-navy/70 font-medium">Event Operations: 7 Days a Week</p>
                      <p className="text-navy/70 font-medium">Office Hours: Mon - Sat, 9am - 6pm</p>
                    </div>
                  </div>
                </div>

                {/* Google Reviews CTA */}
                <div className="mt-8 pt-8 border-t border-navy/10">
                  <a
                    href="https://g.page/r/CW93SjQLeL73EAI/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#FBBC05]/10 via-[#EA4335]/5 to-[#4285F4]/10 border border-[#FBBC05]/20 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-white shadow-sm">
                      <svg viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex text-[#FBBC05]">
                          {"★★★★★".split("").map((s, i) => <span key={i} className="text-base">{s}</span>)}
                        </div>
                        <span className="font-black text-navy text-sm">4.9 / 5</span>
                      </div>
                      <p className="font-bold text-navy text-sm">Leave us a Google Review!</p>
                      <p className="text-navy/60 text-xs font-medium">Your feedback means the world to us 💛</p>
                    </div>
                    <svg className="w-5 h-5 text-navy/30 group-hover:text-coral group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Form (Right Side) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-5 sm:p-8 md:p-12 rounded-3xl sm:rounded-[2.5rem] shadow-xl border border-navy/5 relative h-full">
                
                <div className="mb-10">
                  <h2 className="text-3xl font-display font-black text-navy mb-4">Send a Message</h2>
                  <div className="bg-coral/5 border border-coral/10 p-5 rounded-2xl flex items-start gap-4">
                    <MessageSquareHeart className="w-8 h-8 text-coral shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-navy">Looking to book an event?</h3>
                      <p className="text-navy/70 text-sm font-medium mt-1 mb-3">
                        For the fastest response and accurate pricing, please use our dedicated Quote form instead of this general contact form.
                      </p>
                      <Link href="/book" className="inline-block px-5 py-2 bg-coral text-white text-sm font-bold rounded-full hover:bg-navy transition-colors">
                        Book Your Event
                      </Link>
                    </div>
                  </div>
                </div>

                {isSuccess ? (
                  <div className="text-center py-16 bg-cream rounded-3xl border-2 border-dashed border-mint/30">
                    <div className="w-20 h-20 bg-mint text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-mint/20">
                      <span className="text-4xl font-bold">✓</span>
                    </div>
                    <h3 className="text-3xl font-display font-black text-navy mb-3">Message Sent!</h3>
                    <p className="text-navy/70 font-medium max-w-md mx-auto">
                      Thanks for reaching out, <span className="font-bold text-navy">{formData.firstName}</span>. We will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field — hidden from real users, bots fill it */}
                    <input
                      type="text"
                      name="_gotcha"
                      value={formData._gotcha}
                      onChange={(e) => setFormData(prev => ({ ...prev, _gotcha: e.target.value }))}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-navy ml-2">First Name</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full p-4 bg-cream rounded-2xl border-2 border-transparent focus:bg-white focus:border-navy outline-none transition-all font-medium" 
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-navy ml-2">Last Name</label>
                        <input 
                          type="text" 
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full p-4 bg-cream rounded-2xl border-2 border-transparent focus:bg-white focus:border-navy outline-none transition-all font-medium"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-navy ml-2">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-4 bg-cream rounded-2xl border-2 border-transparent focus:bg-white focus:border-navy outline-none transition-all font-medium"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-navy ml-2">Message</label>
                      <textarea 
                        rows={5} 
                        required 
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full p-4 bg-cream rounded-2xl border-2 border-transparent focus:bg-white focus:border-navy outline-none transition-all font-medium resize-none"
                        placeholder="How can we help you today?"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-4 py-3 rounded-xl">
                        {error}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-navy text-white text-lg font-bold rounded-2xl hover:bg-coral transition-colors disabled:opacity-50 disabled:hover:bg-navy shadow-xl shadow-navy/10 mt-4"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                    <p className="text-center text-xs text-navy/40 font-medium">
                      Protected by reCAPTCHA Enterprise.{" "}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-navy/60">Privacy</a>
                      {" & "}
                      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-navy/60">Terms</a>
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <FAQSection 
        title="Contact Questions"
        subtitle="Some common things people ask."
        items={faqs}
      />
    </div>
  );
}
