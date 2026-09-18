import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "@/components/shared/Logo";
import MeltingDrip from "@/components/shared/MeltingDrip";
import { BUSINESS_CONFIG } from "@/lib/config";

export interface SiteFooterProps {
  companyName?: string;
  companyPhone?: string;
  companyEmail?: string;
  companyAddress?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export default function SiteFooter({
  companyName,
  companyPhone,
  companyEmail,
  companyAddress,
  facebookUrl,
  instagramUrl,
}: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  const phone = companyPhone || BUSINESS_CONFIG.contact.phone1;
  const email = companyEmail || BUSINESS_CONFIG.contact.email;
  const address = companyAddress || BUSINESS_CONFIG.address.display;
  const name = companyName || BUSINESS_CONFIG.name;
  const fbUrl = facebookUrl || BUSINESS_CONFIG.social.facebook;
  const igUrl = instagramUrl || BUSINESS_CONFIG.social.instagram;

  return (
    <footer className="relative z-10 text-cream">
      <div className="bg-[#1A1009] pt-16 pb-12 relative overflow-hidden">
        {/* Professional Vector Drip Texture in Background */}
        <div className="absolute top-0 left-0 right-0 opacity-5 pointer-events-none">
          <MeltingDrip color="#FFFFFF" height={250} variant="random" />
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Main Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            
            {/* Brand & Socials */}
            <div className="space-y-6 sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block">
                <Logo variant="light" width={190} height={95} />
              </Link>
              <p className="text-cream/90 text-xl font-display italic leading-relaxed max-w-sm drop-shadow-sm border-l-2 border-coral pl-4 py-1">
                {BUSINESS_CONFIG.description}
              </p>
              <div className="flex gap-4">
                {igUrl ? (
                  <a
                    href={igUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-coral hover:text-white transition-all shadow-sm"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                ) : null}
                {fbUrl ? (
                  <a
                    href={fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-coral hover:text-white transition-all shadow-sm"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                ) : null}
                {BUSINESS_CONFIG.social.tiktok ? (
                  <a
                    href={BUSINESS_CONFIG.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-coral hover:text-white transition-all shadow-sm"
                    aria-label="TikTok"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/></svg>
                  </a>
                ) : null}
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col md:items-center">
              <div className="w-full md:w-auto text-left md:text-center">
                <h3 className="font-display text-2xl font-black mb-8 text-white tracking-wide flex items-center md:justify-center gap-3">
                  <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-coral drop-shadow-sm">
                    <path d="M7 20C10.866 20 14 16.866 14 13C14 9.13401 7 0 7 0C7 0 0 9.13401 0 13C0 16.866 3.13401 20 7 20Z" fill="currentColor"/>
                  </svg>
                  Quick Links
                </h3>
                <ul className="space-y-5 text-xl font-display italic text-cream/80 capitalize">
                  <li><Link href="/packages" className="hover:text-coral hover:translate-x-2 inline-block transition-transform duration-300">Packages & Pricing</Link></li>
                  <li><Link href="/menu" className="hover:text-coral hover:translate-x-2 inline-block transition-transform duration-300">Ice Cream Menu</Link></li>
                  <li><Link href="/occasions" className="hover:text-coral hover:translate-x-2 inline-block transition-transform duration-300">Events & Catering</Link></li>
                  <li><Link href="/cities" className="hover:text-coral hover:translate-x-2 inline-block transition-transform duration-300">Massachusetts Cities</Link></li>
                  <li><Link href="/blog" className="hover:text-coral hover:translate-x-2 inline-block transition-transform duration-300">Sweet Stories & Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-coral hover:translate-x-2 inline-block transition-transform duration-300">Contact & Inquiries</Link></li>
                </ul>
              </div>
            </div>


            {/* Contact Details */}
            <div>
              <h3 className="font-display text-2xl font-black mb-8 text-white tracking-wide flex items-center gap-3">
                <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-mint drop-shadow-sm">
                  <path d="M7 20C10.866 20 14 16.866 14 13C14 9.13401 7 0 7 0C7 0 0 9.13401 0 13C0 16.866 3.13401 20 7 20Z" fill="currentColor"/>
                </svg>
                Contact Us
              </h3>
              <ul className="space-y-5 text-base font-medium text-cream/80">
                <li className="flex items-start gap-3 group">
                  <Phone className="text-coral shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                  <div className="space-y-1">
                    <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="block hover:text-white transition-colors font-bold">{phone}</a>
                    <a href={`tel:${BUSINESS_CONFIG.contact.phone2Formatted}`} className="block hover:text-white transition-colors text-xs opacity-75">{BUSINESS_CONFIG.contact.phone2} (Reservations)</a>
                  </div>
                </li>
                <li className="flex items-center gap-3 group">
                  <Mail className="text-coral shrink-0 group-hover:scale-110 transition-transform" size={18} />
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
                </li>
                <li className="flex items-start gap-3 group">
                  <MapPin className="text-coral shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                  <address className="not-italic leading-relaxed hover:text-white transition-colors">{address}</address>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium text-cream/50">
            <p>&copy; {currentYear} {name}. Serving all of Massachusetts with pride.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
