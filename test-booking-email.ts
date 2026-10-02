import { sendBookingConfirmationEmail } from './src/lib/email';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function test() {
  const dummyBooking = {
    id: "booking_12345",
    name: "Test Customer",
    email: "info@americanlegendicecreamtruck.com", // Send to self
    phone: "555-123-4567",
    eventType: "Birthday Party",
    packageType: "Gold Package",
    guestCount: "50",
    date: new Date(),
    time: "14:00",
    location: "Boston, MA",
    status: "PENDING"
  };

  try {
    console.log("Sending booking confirmation email...");
    await sendBookingConfirmationEmail(dummyBooking as any);
    console.log("Booking email sent successfully!");
  } catch (error) {
    console.error("Failed to send booking email:", error);
  }
}

test();
