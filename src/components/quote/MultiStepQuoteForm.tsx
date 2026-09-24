"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { 
  Calendar, Clock, MapPin, Users, Map, User, Mail, Phone, 
  ArrowRight, ArrowLeft, Check, CheckCircle2, AlertCircle, Loader2, Info,
  IceCream, Star, Sparkles, Shield
} from "lucide-react";
import { PACKAGES, Package } from "@/lib/packages-data";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(
  () => import("@/components/quote/LocationPicker"),
  { ssr: false, loading: () => <div className="h-[500px] bg-cream rounded-2xl animate-pulse flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-coral" /></div> }
);

type RoutingMode = "SINGLE" | "SEQUENTIAL" | "SIMULTANEOUS";

const STEPS = [
  { id: 1, label: "Event", icon: Calendar },
  { id: 2, label: "Location", icon: MapPin },
  { id: 3, label: "Extras", icon: Sparkles },
  { id: 4, label: "Contact", icon: User },
  { id: 5, label: "Review", icon: Check },
];

export default function MultiStepQuoteForm({ dbPackages }: { dbPackages?: any[] }) {
  const searchParams = useSearchParams();
  const initialPackageSlug = searchParams.get("package");
  
  let initialPackage: Package | undefined = undefined;
  
  if (dbPackages && dbPackages.length > 0) {
    const dbMatch = initialPackageSlug 
      ? dbPackages.find(p => p.slug === initialPackageSlug)
      : dbPackages[0];
      
    if (dbMatch) {
      initialPackage = {
        id: dbMatch.id,
        slug: dbMatch.slug,
        name: dbMatch.name,
        tagline: dbMatch.description || "The perfect ice cream experience",
        vehicleType: dbMatch.serviceType === "VAN" ? "VAN" : dbMatch.serviceType === "CUSTOM" ? "CUSTOM" : "TRUCK",
        vehicleLabel: dbMatch.serviceType === "VAN" ? "Premium Van" : dbMatch.serviceType === "CUSTOM" ? "Custom" : "Ice Cream Truck",
        servings: dbMatch.servings,
        price: dbMatch.price,
        extraGuestPrice: dbMatch.extraGuestPrice ?? 5,
        durationMins: dbMatch.durationMins || 60,
        durationLabel: `${dbMatch.durationMins || 60} Minute Service`,
        description: dbMatch.description || "",
        features: [],
        isPopular: dbMatch.badge === "Most Popular",
        isCustom: dbMatch.serviceType === "CUSTOM",
        sortOrder: dbMatch.sortOrder || 1,
        iconName: dbMatch.badge || "Star",
        illustrationSlug: "truck-50",
      };
    }
  }

  if (!initialPackage) {
    initialPackage = initialPackageSlug 
      ? PACKAGES.find((p) => p.slug === initialPackageSlug) || PACKAGES[0]
      : PACKAGES[0];
  }

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [distanceLoading, setDistanceLoading] = useState(false);
  const [distanceError, setDistanceError] = useState<string | null>(null);

  const [selectedPackage, setSelectedPackage] = useState<Package | undefined>(initialPackage);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [eventType, setEventType] = useState("Birthday Party");
  
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [distance, setDistance] = useState(0);
  const [distanceFee, setDistanceFee] = useState(0);
  
  const [address2, setAddress2] = useState("");
  const [zip2, setZip2] = useState("");
  const [city2, setCity2] = useState("");
  const [lat2, setLat2] = useState(0);
  const [lng2, setLng2] = useState(0);
  const [distance2, setDistance2] = useState(0);
  const [distanceFee2, setDistanceFee2] = useState(0);
  const [distanceLoading2, setDistanceLoading2] = useState(false);
  const [distanceError2, setDistanceError2] = useState<string | null>(null);
  
  const [extraGuests, setExtraGuests] = useState(0);
  const [extraTimeHalfHours, setExtraTimeHalfHours] = useState(0);
  const [routingMode, setRoutingMode] = useState<RoutingMode>("SINGLE");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const [customGuests, setCustomGuests] = useState(201);
  const [customTrucks, setCustomTrucks] = useState(1);
  const [customDuration, setCustomDuration] = useState("2 Hours");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const isCustom = selectedPackage?.isCustom || false;

  const isWeekend = useMemo(() => {
    if (!date) return false;
    const d = new Date(date + "T12:00:00.000Z");
    const day = d.getUTCDay();
    return day === 6 || day === 0;
  }, [date]);

  const weekendFee = isWeekend ? 25 : 0;
  
  const routingFee = useMemo(() => {
    if (routingMode === "SEQUENTIAL") return 50;
    if (routingMode === "SIMULTANEOUS") return 200;
    return 0;
  }, [routingMode]);

  const basePrice = selectedPackage?.price || 0;
  const extraGuestFee = extraGuests * (selectedPackage?.extraGuestPrice || 0);
  const extraTimeFee = extraTimeHalfHours * 35;
  
  const total = basePrice + weekendFee + distanceFee + distanceFee2 + extraGuestFee + extraTimeFee + routingFee;

  const handleLocationDataChange = async (newLat: number, newLng: number, newZip: string) => {
    setZip(newZip);
    if (newLat && newLng || newZip.length === 5) {
      setDistanceLoading(true);
      setDistanceError(null);
      try {
        const res = await fetch(`/api/distance?lat=${newLat}&lng=${newLng}&zip=${newZip}`);
        const data = await res.json();
        if (res.ok) {
          setCity(data.city || "Selected Location");
          setDistance(data.distance);
          setDistanceFee(data.fee);
        } else {
          setDistanceError(data.error || "Could not calculate distance");
          setCity("");
          setDistanceFee(0);
        }
      } catch (err) {
        setDistanceError("Network error calculating distance");
      } finally {
        setDistanceLoading(false);
      }
    }
  };

  const handleSecondLocationDataChange = async (newLat: number, newLng: number, newZip: string, currentMode: RoutingMode) => {
    setZip2(newZip);
    if ((newLat && newLng) || newZip.length === 5) {
      setDistanceLoading2(true);
      setDistanceError2(null);
      try {
        let originParams = "";
        if (currentMode === "SEQUENTIAL") {
          originParams = `&originLat=${lat}&originLng=${lng}&freeMiles=0`;
        } else if (currentMode === "SIMULTANEOUS") {
          originParams = `&freeMiles=0`;
        }
        const res = await fetch(`/api/distance?lat=${newLat}&lng=${newLng}&zip=${newZip}${originParams}`);
        const data = await res.json();
        if (res.ok) {
          setCity2(data.city || "Selected Location");
          setDistance2(data.distance);
          setDistanceFee2(data.fee);
        } else {
          setDistanceError2(data.error || "Could not calculate distance for second location");
          setCity2("");
          setDistanceFee2(0);
        }
      } catch (err) {
        setDistanceError2("Network error calculating distance");
      } finally {
        setDistanceLoading2(false);
      }
    }
  };

  useEffect(() => {
    if (routingMode !== "SINGLE" && lat2 !== 0 && lng2 !== 0) {
      handleSecondLocationDataChange(lat2, lng2, zip2, routingMode);
    }
    if (routingMode === "SINGLE") {
      setDistanceFee2(0);
      setDistance2(0);
    }
  }, [routingMode, lat]);

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const submitFinal = async () => {
    const effectiveAddress = address || (zip ? `ZIP: ${zip}` : "");
    const effectiveCity = city || (zip ? "Massachusetts" : "");
    if (!effectiveAddress || effectiveAddress.length < 5) {
      alert("Please select or enter your event location before submitting.");
      setStep(2);
      return;
    }

    setLoading(true);
    setSubmitError(null);
    try {
      const payload = {
        email, otp, name, phone,
        date, time, eventType,
        address: effectiveAddress, city: effectiveCity, zip, distance, distanceFee,
        address2, city2, zip2, distance2, distanceFee2,
        packageId: selectedPackage?.id, extraGuests, extraTimeHalfHours, routingMode,
        basePrice, weekendFee, extraGuestFee, extraTimeFee, routingFee, totalAmount: total
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        setSubmitError("Something went wrong. Please try again or contact us directly.");
        setLoading(false);
        return;
      }
      
      if (res.ok && data.success) {
        window.location.href = `/book/success?status=${data.status}&bookingNumber=${data.bookingNumber}`;
      } else {
        const errMsg = data.error || "Booking failed. Please try again.";
        const detail = data.details ? " (Check details)" : "";
        setSubmitError(errMsg + detail);
      }
    } catch (err: any) {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  if (!selectedPackage) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-navy mb-4">Please select a package first</h2>
        <a href="/packages" className="inline-block px-8 py-4 bg-coral text-white rounded-full font-bold hover:bg-navy transition-colors">
          View Packages
        </a>
      </div>
    );
  }

  const canContinue = () => {
    if (step === 1) return !(!date || !time);
    if (step === 2) return !(!address && !zip);
    if (step === 3) {
      if (routingMode !== "SINGLE" && (!address2 || !!distanceError2)) return false;
      if (isCustom && customGuests < 201) return false;
      return true;
    }
    if (step === 4) {
      if (isCustom) return !(!name || !email);
      return !(!otpSent || otp.length < 6);
    }
    return true;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Ambient glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-coral/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Package badge at top */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy/5 border border-navy/10 rounded-full">
          <IceCream className="w-4 h-4 text-coral" />
          <span className="text-sm font-bold text-navy">{selectedPackage.name}</span>
          <span className="text-gray-400">·</span>
          <span className="text-sm font-bold text-coral">
            {isCustom ? "Custom Quote" : `$${basePrice.toLocaleString()}`}
          </span>
        </div>
      </div>

      <div className="relative z-10 bg-white rounded-[2rem] shadow-2xl shadow-navy/8 border border-gray-100 overflow-hidden">

        {/* Step Progress Header */}
        <div className="bg-gradient-to-r from-navy via-navy to-navy/90 px-3 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isDone = step > s.id;
              return (
                <div key={s.id} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDone ? "bg-coral text-white" :
                      isActive ? "bg-white text-navy ring-2 ring-coral ring-offset-2 ring-offset-navy" :
                      "bg-white/10 text-white/40"
                    }`}>
                      {isDone ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </div>
                    <span className={`text-[10px] font-bold hidden sm:block transition-colors ${
                      isActive ? "text-white" : isDone ? "text-coral" : "text-white/40"
                    }`}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-[2px] w-3 sm:w-8 md:w-12 mx-0.5 sm:mx-1 md:mx-2 rounded-full transition-all duration-500 ${step > s.id ? "bg-coral" : "bg-white/15"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 md:p-10 min-h-[480px] flex flex-col">
          <AnimatePresence mode="wait">

            {/* ─── STEP 1: EVENT DETAILS ─── */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="flex-grow">
                <div className="mb-8">
                  <h2 className="font-display font-black italic text-3xl md:text-4xl text-navy mb-1">When's the celebration? 🎉</h2>
                  <p className="text-gray-500 font-medium">Pick a date, time, and tell us what we're celebrating.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-navy uppercase tracking-wider">Event Date</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-coral w-5 h-5" />
                      <input type="date" value={date} onChange={e => setDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full min-w-full block pl-12 pr-4 py-4 bg-cream/60 border-2 border-transparent focus:border-coral/40 rounded-2xl outline-none transition-all font-semibold text-navy min-h-[56px]" />
                    </div>
                    {isWeekend && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        Weekend surcharge applies (+$25)
                      </div>
                    )}
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-navy uppercase tracking-wider">Start Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-coral w-5 h-5" />
                      <select value={time} onChange={e => setTime(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-cream/60 border-2 border-transparent focus:border-coral/40 rounded-2xl outline-none transition-all font-semibold text-navy appearance-none cursor-pointer">
                        <option value="" disabled>Select Time</option>
                        {Array.from({ length: 24 }).map((_, hour) =>
                          ["00", "30"].map(min => {
                            const t = `${hour.toString().padStart(2, "0")}:${min}`;
                            const h = hour % 12 || 12;
                            const ampm = hour < 12 ? "AM" : "PM";
                            return <option key={t} value={t}>{`${h}:${min} ${ampm}`}</option>;
                          })
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Event Type */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-navy uppercase tracking-wider">Type of Event</label>
                    <div className="relative">
                      <select value={eventType} onChange={e => setEventType(e.target.value)}
                        className="w-full px-5 py-4 bg-cream/60 border-2 border-transparent focus:border-coral/40 rounded-2xl outline-none transition-all font-semibold text-navy appearance-none cursor-pointer">
                        {[
                          "Birthday Party", "Corporate Event", "Wedding", "School Event", 
                          "Festival / Fair", "Graduation", "Baby Shower", "Block Party", 
                          "Fundraiser", "Sports Event", "Employee Appreciation", "Other"
                        ].map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 2: LOCATION ─── */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="flex-grow">
                <div className="mb-6">
                  <h2 className="font-display font-black italic text-3xl md:text-4xl text-navy mb-1">Where's the party? 📍</h2>
                  <p className="text-gray-500 font-medium">Search or drop a pin so we can park right at your event.</p>
                </div>

                <LocationPicker
                  address={address}
                  onAddressChange={(val) => setAddress(val)}
                  onLocationSelect={(data) => {
                    setAddress(data.address);
                    setLat(data.lat);
                    setLng(data.lng);
                    handleLocationDataChange(data.lat, data.lng, data.zip || "");
                  }}
                />

                {distanceLoading && (
                  <div className="mt-5 p-4 bg-cream rounded-2xl border border-navy/10 flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-coral shrink-0" />
                    <p className="text-sm text-gray-600 font-medium">Calculating your travel fee...</p>
                  </div>
                )}

                {distanceError && !distanceLoading && (
                  <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-red-700 text-sm">Outside Service Area</p>
                      <p className="text-sm text-red-600 mt-1">{distanceError}</p>
                    </div>
                  </div>
                )}

                {distance !== 0 && !distanceLoading && !distanceError && (
                  <div className="mt-5 p-5 bg-gradient-to-r from-navy/5 to-coral/5 border border-navy/10 rounded-2xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-black text-navy text-sm">📍 {address || "Selected Location"}, {city} {zip}</p>
                        <p className="text-xs text-gray-500 font-medium mt-1">{distance} miles from our American Legend HQ</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 font-medium">Travel Fee</p>
                        <p className="font-black text-coral text-lg">${distanceFee.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ─── STEP 3: CUSTOMIZATIONS ─── */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="flex-grow">
                <div className="mb-6">
                  <h2 className="font-display font-black italic text-3xl md:text-4xl text-navy mb-1">Make it yours ✨</h2>
                  <p className="text-gray-500 font-medium">Extra guests, extra time, or multiple stops?</p>
                </div>

                <div className="space-y-6">
                  {isCustom ? (
                    <div className="space-y-5 p-6 bg-cream/50 rounded-3xl border border-navy/10">
                      <div>
                        <label className="text-xs font-black text-navy uppercase tracking-wider block mb-3">Total Expected Guests <span className="text-coral">(min. 201)</span></label>
                        <input type="number" value={customGuests}
                          onChange={e => setCustomGuests(parseInt(e.target.value) || 0)}
                          onBlur={() => { if (customGuests < 201) setCustomGuests(201) }}
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 focus:border-coral/40 rounded-2xl outline-none font-black text-navy text-2xl transition-all" />
                        {customGuests < 201 && <p className="text-xs text-red-500 font-bold mt-2">Minimum 201 guests required for custom events.</p>}
                      </div>
                      <div>
                        <label className="text-xs font-black text-navy uppercase tracking-wider block mb-3">Event Duration</label>
                        <input type="text" value={customDuration} onChange={e => setCustomDuration(e.target.value)} placeholder="e.g., 2 Hours"
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 focus:border-coral/40 rounded-2xl outline-none font-bold text-navy transition-all" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Extra Guests */}
                      <div className="p-5 bg-cream/50 rounded-3xl border border-navy/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-coral" />
                          <h3 className="font-black text-navy text-sm">Extra Guests</h3>
                        </div>
                        <p className="text-xs text-gray-500 font-medium mb-4">Includes {selectedPackage.servings}. +${selectedPackage.extraGuestPrice}/guest</p>
                        <div className="flex items-center justify-between gap-3">
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setExtraGuests(Math.max(0, extraGuests - 5))}
                            className="w-11 h-11 rounded-xl bg-white border-2 border-gray-200 font-black text-xl text-navy hover:border-coral/50 transition-all">−</motion.button>
                          <div className="text-center">
                            <div className="text-3xl font-black text-navy">{extraGuests}</div>
                            {extraGuestFee > 0 && <div className="text-xs font-bold text-coral">+${extraGuestFee.toFixed(0)}</div>}
                          </div>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setExtraGuests(extraGuests + 5)}
                            className="w-11 h-11 rounded-xl bg-white border-2 border-gray-200 font-black text-xl text-navy hover:border-coral/50 transition-all">+</motion.button>
                        </div>
                      </div>

                      {/* Extra Time */}
                      <div className="p-5 bg-cream/50 rounded-3xl border border-navy/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-coral" />
                          <h3 className="font-black text-navy text-sm">Extra Time</h3>
                        </div>
                        <p className="text-xs text-gray-500 font-medium mb-4">30-min increments · $35 each</p>
                        <div className="flex items-center justify-between gap-3">
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setExtraTimeHalfHours(Math.max(0, extraTimeHalfHours - 1))}
                            className="w-11 h-11 rounded-xl bg-white border-2 border-gray-200 font-black text-xl text-navy hover:border-coral/50 transition-all">−</motion.button>
                          <div className="text-center">
                            <div className="text-2xl font-black text-navy">{extraTimeHalfHours > 0 ? `+${extraTimeHalfHours * 30}m` : "0"}</div>
                            {extraTimeFee > 0 && <div className="text-xs font-bold text-coral">+${extraTimeFee.toFixed(0)}</div>}
                          </div>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setExtraTimeHalfHours(extraTimeHalfHours + 1)}
                            className="w-11 h-11 rounded-xl bg-white border-2 border-gray-200 font-black text-xl text-navy hover:border-coral/50 transition-all">+</motion.button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Multiple Locations */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Map className="w-4 h-4 text-coral" />
                      <h3 className="font-black text-navy text-sm uppercase tracking-wider">Multiple Locations?</h3>
                    </div>
                    <div className="space-y-3">
                      {([
                        { mode: "SINGLE", label: "Single Location", desc: "One stop only", fee: "Included" },
                        { mode: "SEQUENTIAL", label: "Sequential Stops", desc: "Multiple stops in order (one vehicle)", fee: "+$50" },
                        { mode: "SIMULTANEOUS", label: "Multi-Vehicle Deploy", desc: "Two trucks at different locations simultaneously", fee: "+$200" },
                      ] as const).map(opt => (
                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} key={opt.mode} type="button" onClick={() => setRoutingMode(opt.mode)}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                            routingMode === opt.mode
                              ? "border-coral bg-coral/5"
                              : "border-gray-200 bg-white hover:border-coral/30"
                          }`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${routingMode === opt.mode ? "border-coral" : "border-gray-300"}`}>
                              {routingMode === opt.mode && <div className="w-2 h-2 rounded-full bg-coral" />}
                            </div>
                            <div>
                              <div className="font-bold text-navy text-sm">{opt.label}</div>
                              <div className="text-xs text-gray-500 font-medium">{opt.desc}</div>
                            </div>
                          </div>
                          <span className={`text-sm font-black ${opt.mode !== "SINGLE" ? "text-coral" : "text-gray-400"}`}>{opt.fee}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Second Location Picker */}
                  <AnimatePresence>
                    {routingMode !== "SINGLE" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="pt-2">
                          <label className="text-xs font-black text-navy uppercase tracking-wider block mb-3">Second Location</label>
                          <LocationPicker
                            address={address2}
                            onAddressChange={(val) => setAddress2(val)}
                            onLocationSelect={(data) => {
                              setAddress2(data.address);
                              setLat2(data.lat);
                              setLng2(data.lng);
                              handleSecondLocationDataChange(data.lat, data.lng, data.zip || "", routingMode);
                            }}
                          />
                          {distanceError2 && !distanceLoading2 && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                              <p className="text-sm text-red-600 font-medium">{distanceError2}</p>
                            </div>
                          )}
                          {distance2 !== 0 && !distanceLoading2 && !distanceError2 && (
                            <div className="mt-4 p-4 bg-gradient-to-r from-navy/5 to-coral/5 border border-navy/10 rounded-2xl flex items-center justify-between">
                              <div>
                                <p className="font-bold text-navy text-sm">📍 {address2 || "Second Location"}, {city2}</p>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">{distance2} miles</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500 font-medium">Travel Fee</p>
                                <p className="font-black text-coral text-lg">${distanceFee2.toFixed(2)}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 4: CONTACT & VERIFICATION ─── */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="flex-grow">
                <div className="mb-6">
                  <h2 className="font-display font-black italic text-3xl md:text-4xl text-navy mb-1">Almost there! 🙌</h2>
                  <p className="text-gray-500 font-medium">Let us know who you are so we can send your confirmation.</p>
                </div>

                {!otpSent ? (
                  <div className="space-y-5">
                    {[
                      { label: "Full Name", value: name, setter: setName, type: "text", placeholder: "Jane Smith", Icon: User },
                      { label: "Phone Number", value: phone, setter: setPhone, type: "tel", placeholder: "(617) 555-0100", Icon: Phone },
                      { label: "Email Address", value: email, setter: setEmail, type: "email", placeholder: "jane@example.com", Icon: Mail },
                    ].map(({ label, value, setter, type, placeholder, Icon }) => (
                      <div key={label} className="space-y-2">
                        <label className="text-xs font-black text-navy uppercase tracking-wider">{label}</label>
                        <div className="relative">
                          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-coral w-5 h-5" />
                          <input type={type} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
                            className="w-full pl-12 pr-4 py-4 bg-cream/60 border-2 border-transparent focus:border-coral/40 rounded-2xl outline-none transition-all font-semibold text-navy" />
                        </div>
                      </div>
                    ))}

                    {!isCustom && (
                      <motion.button whileHover={!loading && name && email ? { scale: 1.02 } : {}} whileTap={!loading && name && email ? { scale: 0.98 } : {}} onClick={sendOtp} disabled={!name || !email || loading}
                        className="w-full py-4 bg-navy text-white rounded-2xl font-black disabled:opacity-40 hover:bg-coral transition-colors flex items-center justify-center gap-2 shadow-lg shadow-navy/20 mt-2">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Mail className="w-5 h-5" /> Send Verification Code</>}
                      </motion.button>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <Shield className="w-4 h-4 shrink-0" />
                      Your information is encrypted and never shared.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                    <div className="p-8 bg-gradient-to-br from-navy/5 to-coral/5 border border-navy/10 rounded-3xl text-center">
                      <div className="w-16 h-16 bg-coral/10 text-coral rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <Mail className="w-8 h-8" />
                      </div>
                      <h3 className="font-black text-navy text-xl mb-2">Check your inbox</h3>
                      <p className="text-sm text-gray-500 font-medium">We sent a 6-digit code to <strong className="text-navy">{email}</strong></p>
                    </div>
                    <div>
                      <label className="text-xs font-black text-navy uppercase tracking-wider block mb-3">Verification Code</label>
                      <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="0 0 0 0 0 0" maxLength={6}
                        className="w-full text-center tracking-[0.6em] py-5 bg-cream/60 border-2 border-transparent focus:border-coral/40 rounded-2xl outline-none font-black text-3xl text-navy transition-all" />
                    </div>
                    <button onClick={() => setOtpSent(false)} className="text-sm font-bold text-coral w-full text-center hover:underline">
                      ← Use a different email
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ─── STEP 5: REVIEW & CONFIRM ─── */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="flex-grow">
                <div className="mb-6">
                  <h2 className="font-display font-black italic text-3xl md:text-4xl text-navy mb-1">Review your booking 🍦</h2>
                  <p className="text-gray-500 font-medium">Everything looks right? Let's lock it in!</p>
                </div>

                <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                  {/* Package Header */}
                  <div className="bg-gradient-to-r from-navy to-navy/80 p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-coral flex items-center justify-center shrink-0">
                      <IceCream className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-xl">{isCustom ? "Custom Event Package" : selectedPackage.name}</h3>
                      <p className="text-white/60 text-sm font-medium">{date} at {time} · {city || address}</p>
                    </div>
                  </div>

                  {/* Line items */}
                  <div className="bg-white p-6 space-y-3">
                    {isCustom ? (
                      <>
                        <ReviewRow label="Event Type" value={eventType} />
                        <ReviewRow label="Expected Guests" value={`${customGuests} guests`} />
                        <ReviewRow label="Duration" value={customDuration} />
                        <ReviewRow label="Location" value={`${address}, ${city}`} />
                        {distance > 0 && <ReviewRow label="Travel Distance" value={`${distance} mi`} />}
                        {distanceFee > 0 && <ReviewRow label="Travel Fee" value={`$${distanceFee.toFixed(2)}`} accent />}
                      </>
                    ) : (
                      <>
                        <ReviewRow label="Base Package" value={`$${basePrice.toFixed(2)}`} />
                        {weekendFee > 0 && <ReviewRow label="Weekend Surcharge" value={`+$${weekendFee.toFixed(2)}`} accent />}
                        {distanceFee > 0 && <ReviewRow label={`Travel Fee (${distance} mi)`} value={`+$${distanceFee.toFixed(2)}`} accent />}
                        {extraGuestFee > 0 && <ReviewRow label={`Extra Guests (${extraGuests})`} value={`+$${extraGuestFee.toFixed(2)}`} accent />}
                        {extraTimeFee > 0 && <ReviewRow label={`Extra Time (+${extraTimeHalfHours * 30} mins)`} value={`+$${extraTimeFee.toFixed(2)}`} accent />}
                        {routingFee > 0 && <ReviewRow label={`Multi-Location (${routingMode})`} value={`+$${routingFee.toFixed(2)}`} accent />}
                        {distanceFee2 > 0 && <ReviewRow label="2nd Stop Travel Fee" value={`+$${distanceFee2.toFixed(2)}`} accent />}
                      </>
                    )}
                  </div>

                  {/* Total */}
                  {!isCustom && (
                    <div className="bg-gradient-to-r from-coral/10 to-navy/5 border-t border-gray-100 p-6 flex items-center justify-between">
                      <span className="font-black text-xl text-navy">Estimated Total</span>
                      <span className="font-black text-4xl text-coral">${total.toFixed(2)}</span>
                    </div>
                  )}

                  {isCustom && (
                    <div className="bg-gradient-to-r from-coral/10 to-navy/5 border-t border-gray-100 p-6">
                      <p className="text-sm text-gray-500 font-medium mb-4 text-center">For custom events, our team will provide a personalized quote. Contact us now with your details!</p>
                      <div className="flex flex-col gap-3">
                        <a href={`https://wa.me/17819477676?text=${encodeURIComponent(`Hi American Legend! Custom Event inquiry.\n\nName: ${name}\nDate: ${date} at ${time}\nEvent: ${eventType}\nGuests: ${customGuests}\nDuration: ${customDuration}\nLocation: ${address}, ${city} ${zip}\n\nPlease send a quote!`)}`}
                          target="_blank" rel="noreferrer"
                          className="w-full py-4 rounded-2xl font-black bg-[#25D366] text-white hover:bg-[#128C7E] transition-all shadow-lg flex items-center justify-center gap-2">
                          📱 WhatsApp: 617-999-3803
                        </a>
                        <a href={`https://wa.me/17819477676?text=${encodeURIComponent(`Hi American Legend! Custom Event inquiry.\n\nName: ${name}\nDate: ${date} at ${time}\nEvent: ${eventType}\nGuests: ${customGuests}\nDuration: ${customDuration}\nLocation: ${address}, ${city} ${zip}\n\nPlease send a quote!`)}`}
                          target="_blank" rel="noreferrer"
                          className="w-full py-4 rounded-2xl font-black bg-[#25D366] text-white hover:bg-[#128C7E] transition-all shadow-lg flex items-center justify-center gap-2">
                          📱 WhatsApp: 617-866-2727
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {submitError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-600 font-semibold">{submitError}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── NAVIGATION FOOTER ─── */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button onClick={prevStep}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 rounded-full font-bold text-sm text-gray-500 hover:text-navy hover:bg-gray-50 transition-all">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {/* Live total pill */}
            {!isCustom && !isNaN(total) && total > 0 && step < 5 && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-coral/10 rounded-full">
                <span className="text-xs font-bold text-gray-500">Subtotal</span>
                <span className="font-black text-coral">${total.toFixed(2)}</span>
              </div>
            )}

            {step < 5 ? (
              <motion.button whileHover={canContinue() ? { scale: 1.02 } : {}} whileTap={canContinue() ? { scale: 0.98 } : {}} onClick={nextStep} disabled={!canContinue()}
                className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-black text-sm sm:text-base bg-coral text-white hover:bg-navy disabled:opacity-40 disabled:hover:bg-coral transition-all shadow-lg shadow-coral/20">
                Continue <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : !isCustom ? (
              <motion.button whileHover={!loading ? { scale: 1.05 } : {}} whileTap={!loading ? { scale: 0.95 } : {}} onClick={submitFinal} disabled={loading}
                className="flex items-center gap-2 px-7 sm:px-10 py-3.5 sm:py-4 rounded-full font-black text-sm sm:text-base bg-coral text-white hover:bg-navy disabled:opacity-40 transition-all shadow-xl shadow-coral/30">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Confirm Booking</>}
              </motion.button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helper component ───
function ReviewRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-gray-500 font-medium text-sm">{label}</span>
      <span className={`font-bold text-sm ${accent ? "text-coral" : "text-navy"}`}>{value}</span>
    </div>
  );
}
