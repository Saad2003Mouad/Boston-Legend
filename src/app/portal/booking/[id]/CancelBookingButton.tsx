"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { XCircle, Loader2 } from "lucide-react";

export default function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/portal/booking/${bookingId}/cancel`, { method: "POST" });
      if (res.ok) {
        router.refresh();
        router.push("/portal");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to cancel booking");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!confirmOpen) {
    return (
      <button
        onClick={() => setConfirmOpen(true)}
        className="w-full px-4 py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-200 hover:bg-red-100 transition-all flex items-center justify-center gap-2 text-sm"
      >
        <XCircle size={16} />
        Cancel Booking
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-red-600 font-bold text-center">
        Are you sure you want to cancel this booking?
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setConfirmOpen(false)}
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all text-sm"
        >
          Keep It
        </button>
        <button
          onClick={handleCancel}
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all text-sm flex items-center justify-center gap-1"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
          {loading ? "Cancelling..." : "Yes, Cancel"}
        </button>
      </div>
    </div>
  );
}
