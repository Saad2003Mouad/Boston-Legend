"use client";
import { usePathname } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AIChatWidget from "@/components/layout/AIChatWidget";
import SplashScreen from "@/components/shared/SplashScreen";

import ScrollToTop from "@/components/shared/ScrollToTop";

/** Routes where the public site chrome (header, footer, blobs) are hidden */
const ADMIN_PREFIXES = ["/admin", "/login", "/book"];

export default function PublicLayout({ 
  children,
  footerConfig
}: { 
  children: React.ReactNode,
  footerConfig?: {
    companyName?: string;
    companyPhone?: string;
    companyEmail?: string;
    companyAddress?: string;
    facebookUrl?: string;
    instagramUrl?: string;
  }
}) {
  const pathname = usePathname();
  const isAdminRoute = ADMIN_PREFIXES.some(p => pathname.startsWith(p));

  if (isAdminRoute) {
    // Admin pages get NO public chrome — just children
    return <>{children}</>;
  }

  // Public site pages get the full chrome
  return (
    <>

      <SplashScreen />
      <SiteHeader />
      <main className="flex-1 flex flex-col w-full z-10">
        <ScrollToTop />
        {children}
      </main>
      <SiteFooter {...footerConfig} />
      <AIChatWidget />
    </>
  );
}


