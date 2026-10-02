import Link from "next/link";
import { Clock, MessageCircle } from "lucide-react";
import { BUSINESS_CONFIG } from "@/lib/config";

export default async function BookingSuccessPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const status = (searchParams?.status as string) || "PENDING_REVIEW";
  const bookingNumber = (searchParams?.bookingNumber as string) || "";
  
  // WhatsApp Link Generation
  const whatsappNumber = BUSINESS_CONFIG.contact.phone1Formatted.replace("+", "");
  const whatsappMessage = encodeURIComponent(
    `Hello! I just submitted a booking request (${bookingNumber ? `Booking #${bookingNumber}` : "New Booking"}). I would like to confirm the details.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center relative overflow-hidden">
        {/* Blob Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-coral/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-navy/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10">
          {status === "REJECTED" ? (
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border bg-red-50 border-red-100">
              <div className="text-4xl">❌</div>
            </div>
          ) : status === "CONFIRMED" ? (
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border bg-green-50 border-green-100">
              <div className="text-4xl">✅</div>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border bg-amber-50 border-amber-100">
              <Clock className="w-10 h-10 text-amber-500" />
            </div>
          )}
          
          <h1 className="text-3xl font-black text-navy tracking-tight mb-3">
            {status === "REJECTED" ? "Booking Declined" : status === "CONFIRMED" ? "Booking Confirmed! 🎉" : "Request Received"}
          </h1>
          
          {status === "REJECTED" ? (
            <>
              <p className="text-gray-500 font-medium mb-2">
                Unfortunately, your booking request was <span className="font-bold text-red-600">Declined</span> automatically by our system.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This is typically because the event is too soon (less than 24 hours away). Please contact us directly if you need immediate assistance.
              </p>
            </>
          ) : status === "CONFIRMED" ? (
            <>
              <p className="text-gray-500 font-medium mb-2">
                Great news! Your booking has been <span className="font-bold text-green-600">Confirmed</span>.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                We've sent a confirmation email to you. You can also view your booking details from your inbox.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-500 font-medium mb-2">
                Thank you! Your booking request has been received and is currently <span className="font-bold text-amber-600">Pending Review</span> by our team.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                We will review your details and confirm the booking shortly. If you need immediate assistance, please message us on WhatsApp.
              </p>
            </>
          )}
          
          {bookingNumber && (
            <div className="bg-navy/5 rounded-xl py-3 px-4 mb-8 inline-block">
              <span className="text-navy/60 text-xs uppercase tracking-widest font-bold block mb-1">Booking Ref</span>
              <p className="text-navy font-black text-xl">
                #{bookingNumber}
              </p>
            </div>
          )}

          <div className="space-y-3 mt-2">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#128C7E] transition-colors shadow-sm"
            >
              <MessageCircle size={20} />
              Message us on WhatsApp
            </a>
            <Link href="/" className="block w-full py-3.5 bg-navy text-white rounded-xl font-bold hover:bg-navy-mid transition-colors shadow-sm">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
