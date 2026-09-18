import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";

export default async function BookingSuccessPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const isPending = searchParams?.status === "PENDING_REVIEW";
  const bookingNumber = (searchParams?.bookingNumber as string) || "";

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center relative overflow-hidden">
        {/* Blob Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-coral/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-navy/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border ${isPending ? 'bg-amber-50 border-amber-100' : 'bg-emerald-50 border-emerald-100'}`}>
            {isPending ? (
              <Clock className="w-10 h-10 text-amber-500" />
            ) : (
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            )}
          </div>
          
          <h1 className="text-3xl font-black text-navy tracking-tight mb-3">
            {isPending ? "Under Review" : "Booking Confirmed!"}
          </h1>
          
          <p className="text-gray-500 font-medium mb-2">
            {isPending 
              ? "Your request has been received. Our team will review the details and get back to you shortly." 
              : "Thank you for choosing Boston Legend Ice Cream Truck. We've received your booking and sent a confirmation email to your inbox."}
          </p>
          
          {bookingNumber && (
            <p className="text-navy font-bold mb-8 text-lg">
              Booking #{bookingNumber}
            </p>
          )}

          <div className="space-y-3 mt-4">
            <Link href="/" className="block w-full py-3.5 bg-navy text-white rounded-xl font-bold hover:bg-navy-mid transition-colors shadow-sm">
              Return Home
            </Link>
            <Link href="/packages" className="block w-full py-3.5 bg-gray-50 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Explore Our Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
