import { z } from "zod";

export const BookingSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(5, "Valid phone number is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  time: z.string().min(1, "Time is required"),
  eventType: z.string().min(1, "Event type is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().optional().or(z.literal("")),
  zip: z.string().optional().or(z.literal("")),
  distance: z.number().min(0),
  distanceFee: z.number().min(0),
  packageId: z.string().optional(),
  extraGuests: z.number().min(0),
  extraTimeHalfHours: z.number().min(0).optional(),
  routingMode: z.string().optional(),
  basePrice: z.number().min(0),
  weekendFee: z.number().min(0),
  extraGuestFee: z.number().min(0),
  extraTimeFee: z.number().min(0).optional(),
  routingFee: z.number().min(0),
  totalAmount: z.number().min(0),
  // Multi-stop fields (optional)
  address2: z.string().optional().or(z.literal("")),
  city2: z.string().optional().or(z.literal("")),
  zip2: z.string().optional().or(z.literal("")),
  distance2: z.number().optional(),
  distanceFee2: z.number().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  lat2: z.number().optional(),
  lng2: z.number().optional(),
});

export const OtpSchema = z.object({
  email: z.string().email("Invalid email address"),
});
