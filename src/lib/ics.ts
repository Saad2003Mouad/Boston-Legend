/**
 * Generates an RFC 5545 iCalendar (.ics) string for Outlook, Google, and Apple Calendar.
 */
export function generateIcsEvent({
  id,
  summary,
  description,
  location,
  startDate,
  startTime,
  durationMins = 60,
  organizerEmail = "info@americanlegendicecreamtruck.com",
  organizerName = "American Legend Ice Cream Truck",
}: {
  id: string;
  summary: string;
  description: string;
  location: string;
  startDate: Date | string;
  startTime: string; // e.g. "14:00" or "2:00 PM"
  durationMins?: number;
  organizerEmail?: string;
  organizerName?: string;
}): string {
  const d = new Date(startDate);
  
  // Parse time
  let hours = 14;
  let minutes = 0;
  if (startTime) {
    const cleanTime = startTime.trim().toUpperCase();
    const isPM = cleanTime.includes("PM");
    const isAM = cleanTime.includes("AM");
    const parts = cleanTime.replace(/[APM]/g, "").trim().split(":");
    if (parts.length >= 2) {
      hours = parseInt(parts[0], 10);
      minutes = parseInt(parts[1], 10);
      if (isPM && hours < 12) hours += 12;
      if (isAM && hours === 12) hours = 0;
    } else if (parts.length === 1 && !isNaN(parseInt(parts[0], 10))) {
      hours = parseInt(parts[0], 10);
      if (isPM && hours < 12) hours += 12;
      if (isAM && hours === 12) hours = 0;
    }
  }

  // Set local date/time
  d.setHours(hours, minutes, 0, 0);

  const startUtc = new Date(d.getTime());
  const endUtc = new Date(d.getTime() + durationMins * 60 * 1000);

  const formatIcsDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };

  const dtStart = formatIcsDate(startUtc);
  const dtEnd = formatIcsDate(endUtc);
  const dtStamp = formatIcsDate(new Date());
  const uid = `booking-${id}@americanlegendicecreamtruck.com`;

  // Escape text fields per RFC 5545
  const escapeIcs = (str: string) => {
    return (str || "")
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\n/g, "\\n");
  };

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//American Legend Ice Cream Truck//Booking System//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcs(summary)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(location)}`,
    `ORGANIZER;CN="${escapeIcs(organizerName)}":mailto:${organizerEmail}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    `DESCRIPTION:Reminder: ${escapeIcs(summary)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Returns a direct URL to open and add the event into Outlook Web Calendar
 */
export function getOutlookWebCalendarUrl({
  summary,
  description,
  location,
  startDate,
  startTime,
  durationMins = 60,
}: {
  summary: string;
  description: string;
  location: string;
  startDate: Date | string;
  startTime: string;
  durationMins?: number;
}): string {
  const d = new Date(startDate);
  let hours = 14;
  let minutes = 0;
  if (startTime) {
    const cleanTime = startTime.trim().toUpperCase();
    const isPM = cleanTime.includes("PM");
    const isAM = cleanTime.includes("AM");
    const parts = cleanTime.replace(/[APM]/g, "").trim().split(":");
    if (parts.length >= 2) {
      hours = parseInt(parts[0], 10);
      minutes = parseInt(parts[1], 10);
      if (isPM && hours < 12) hours += 12;
      if (isAM && hours === 12) hours = 0;
    }
  }
  d.setHours(hours, minutes, 0, 0);
  const startIso = d.toISOString();
  const endIso = new Date(d.getTime() + durationMins * 60 * 1000).toISOString();

  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: summary,
    body: description,
    location: location,
    startdt: startIso,
    enddt: endIso,
  });

  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
}
