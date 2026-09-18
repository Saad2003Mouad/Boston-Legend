"use client";

import { useState } from "react";
import { Edit3, XCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditBookingButton({ bookingId, initialData }: { bookingId: string, initialData: any }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/portal/booking/${bookingId}/edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setShowModal(false);
        router.refresh();
      } else {
        setError(data.error || "Failed to edit booking");
      }
    } catch (e) {
      setError("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-200 transition-colors"
      >
        <Edit3 className="w-4 h-4" /> Edit Booking
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-black text-navy text-lg flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-coral" /> Edit Details
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-xl border border-red-100">
                  {error}
                </div>
              )}
              <p className="text-xs text-gray-500 font-medium">
                You can change the date, time, and add notes up to 48 hours before your event. Changing the date to a weekend may incur additional fees.
              </p>
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Event Date</label>
                <input 
                  type="date" 
                  value={formData.eventDate} 
                  onChange={e => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full border-gray-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Start Time</label>
                <input 
                  type="time" 
                  value={formData.startTime} 
                  onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full border-gray-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Additional Notes</label>
                <textarea 
                  rows={3} 
                  value={formData.notes || ""} 
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full border-gray-200 rounded-xl text-sm resize-none"
                  placeholder="Any special instructions?"
                />
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700">
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                disabled={loading} 
                className="px-5 py-2.5 text-sm font-bold bg-coral text-white rounded-xl hover:bg-coral-dark disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
