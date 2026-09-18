import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

// ─── Arabic & English keyword maps ──────────────────────────────────────────
const BOOKING_KEYS = ["booking", "reservation", "حجز", "حجوزات", "مواعيد", "موعد", "today", "اليوم", "هذا الأسبوع", "هذا الشهر", "pending", "confirmed", "completed", "approved", "week", "month", "انتظار", "تأكيد"];
const CUSTOMER_KEYS = ["customer", "client", "عميل", "عملاء", "زبون", "زبائن", "users", "مستخدم"];
const PACKAGE_KEYS = ["package", "plan", "pricing", "بكج", "باقة", "باقات", "عرض", "تسعير", "أسعار"];
const SETTINGS_KEYS = ["setting", "config", "business hours", "seo", "إعدادات", "اعدادات", "نظام", "ساعات", "هاتف", "ايميل", "عنوان"];
const INQUIRY_KEYS = ["inquiry", "inquiries", "lead", "استفسار", "استفسارات", "طلب", "طلبات"];
const REVENUE_KEYS = ["revenue", "income", "sales", "earnings", "total", "إيرادات", "دخل", "مبيعات", "ارباح"];
const STATS_KEYS = ["stats", "summary", "overview", "report", "dashboard", "إحصائيات", "ملخص", "تقرير", "نظرة عامة"];

function matches(text: string, keys: string[]) {
  return keys.some(k => text.includes(k));
}

// ─── System Prompt ────────────────────────────────────────────────────────────
const BASE_SYSTEM_PROMPT = `You are the Boston Legend Ice Cream Truck Admin AI — a highly capable, friendly, and lively assistant for the owner/admin.

CRITICAL RULES:
1. You ONLY answer based on the LIVE DATA injected below. NEVER invent, hallucinate, or guess data.
2. If a piece of information is not in the injected data, say: "I don't have that data right now. Try rephrasing or check the admin dashboard directly."
3. Format all currency as $X,XXX.XX.
4. You can respond in both Arabic and English — always match the user's language. If they speak Arabic, use a warm, respectful, and friendly Arabic tone (e.g. "أهلاً بك يا مدير! 🍦").
5. Be concise and direct, but keep the tone positive, fun, and lively! Feel free to use emojis (🍦, 📊, 🚀).
6. Today's date and time is: {{TODAY}}.`;

export async function POST(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "dashboard.view");
    if (!auth.success) {
      return Response.json({ reply: "Unauthorized access." }, { status: 403 });
    }
    await getServerSession(authOptions);

    const { messages, conversationId } = await req.json();

    if (!process.env.OPENROUTER_API_KEY && !process.env.GROQ_API_KEY) {
      return Response.json({ reply: "AI service is not configured." });
    }

    // ─── Build full conversation context for keyword detection ──────────────
    const fullContext = messages.map((m: any) => m.content).join(" ").toLowerCase();

    // ─── Fetch relevant DB data based on conversation ───────────────────────
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let dbContext = "";

    try {
      // ── Bookings ───────────────────────────────────────────────────────────
      if (matches(fullContext, BOOKING_KEYS) || matches(fullContext, REVENUE_KEYS) || matches(fullContext, STATS_KEYS)) {
        // Today's bookings
        const todayBookings = await prisma.booking.findMany({
          where: { eventDate: { gte: todayStart, lt: todayEnd } },
          include: {
            customer: { select: { firstName: true, lastName: true, email: true, phone: true } },
            package: { select: { name: true, price: true } },
          },
          orderBy: { eventDate: "asc" },
        });

        // This week's bookings count
        const weekCount = await prisma.booking.count({ where: { eventDate: { gte: weekStart } } });

        // This month's bookings + revenue
        const monthBookings = await prisma.booking.findMany({
          where: { createdAt: { gte: monthStart } },
          select: { totalAmount: true, status: true },
        });
        const monthRevenue = monthBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
        const monthTotal = monthBookings.length;

        // Latest 10 bookings (all time)
        const latestBookings = await prisma.booking.findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            customer: { select: { firstName: true, lastName: true, email: true } },
            package: { select: { name: true } },
          },
        });

        dbContext += `\n\n━━━ LIVE BOOKINGS DATA ━━━
TODAY (${todayStart.toDateString()}): ${todayBookings.length} booking(s)
${todayBookings.length > 0
  ? JSON.stringify(todayBookings.map(b => ({
      bookingNumber: b.bookingNumber,
      customer: b.customer ? `${b.customer.firstName} ${b.customer.lastName}` : "N/A",
      email: b.customer?.email,
      phone: b.customer?.phone,
      package: b.package?.name || "Custom",
      status: b.status,
      eventDate: b.eventDate,
      startTime: b.startTime,
      guests: b.guests,
      address: `${b.address}, ${b.city}, ${b.zip}`,
      totalAmount: b.totalAmount,
    })), null, 2)
  : "No bookings today."}

THIS WEEK: ${weekCount} bookings total
THIS MONTH: ${monthTotal} bookings | Revenue: $${monthRevenue.toFixed(2)}

LATEST 10 BOOKINGS (all time):
${JSON.stringify(latestBookings.map(b => ({
  bookingNumber: b.bookingNumber,
  customer: b.customer ? `${b.customer.firstName} ${b.customer.lastName}` : "N/A",
  status: b.status,
  eventDate: b.eventDate,
  guests: b.guests,
  totalAmount: b.totalAmount,
  createdAt: b.createdAt,
})), null, 2)}`;
      }

      // ── Customers ──────────────────────────────────────────────────────────
      if (matches(fullContext, CUSTOMER_KEYS)) {
        const totalCustomers = await prisma.customer.count();
        const latestCustomers = await prisma.customer.findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
          select: { id: true, firstName: true, lastName: true, email: true, phone: true, city: true, createdAt: true },
        });
        dbContext += `\n\n━━━ LIVE CUSTOMERS DATA ━━━
TOTAL CUSTOMERS: ${totalCustomers}
LATEST 10:
${JSON.stringify(latestCustomers, null, 2)}`;
      }

      // ── Packages ───────────────────────────────────────────────────────────
      if (matches(fullContext, PACKAGE_KEYS)) {
        const packages = await prisma.package.findMany({
          orderBy: { sortOrder: "asc" },
          select: { name: true, slug: true, serviceType: true, price: true, servings: true, durationMins: true, isActive: true, badge: true },
        });
        dbContext += `\n\n━━━ LIVE PACKAGES DATA ━━━\n${JSON.stringify(packages, null, 2)}`;
      }

      // ── Settings ───────────────────────────────────────────────────────────
      if (matches(fullContext, SETTINGS_KEYS)) {
        const settings = await prisma.setting.findMany();
        const dict = settings.reduce((acc: any, s) => { acc[s.key] = s.value; return acc; }, {});
        dbContext += `\n\n━━━ LIVE SETTINGS DATA ━━━\n${JSON.stringify(dict, null, 2)}`;
      }

      // ── Inquiries ──────────────────────────────────────────────────────────
      if (matches(fullContext, INQUIRY_KEYS)) {
        const inquiries = await prisma.inquiry.findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
          select: { id: true, name: true, email: true, eventType: true, status: true, createdAt: true, source: true },
        });
        dbContext += `\n\n━━━ LIVE INQUIRIES DATA (latest 10) ━━━\n${JSON.stringify(inquiries, null, 2)}`;
      }

      // ── Dashboard Overview ────────────────────────────────────────────────
      if (matches(fullContext, STATS_KEYS)) {
        const [totalBookings, totalCustomers, pendingCount, confirmedCount] = await Promise.all([
          prisma.booking.count(),
          prisma.customer.count(),
          prisma.booking.count({ where: { status: "PENDING" } }),
          prisma.booking.count({ where: { status: "CONFIRMED" } }),
        ]);
        const allBookings = await prisma.booking.findMany({ select: { totalAmount: true } });
        const totalRevenue = allBookings.reduce((s, b) => s + (b.totalAmount || 0), 0);
        dbContext += `\n\n━━━ DASHBOARD OVERVIEW ━━━
Total Bookings (all time): ${totalBookings}
Total Customers: ${totalCustomers}
Pending Bookings: ${pendingCount}
Confirmed Bookings: ${confirmedCount}
Total Revenue (all time): $${totalRevenue.toFixed(2)}`;
      }

    } catch (dbErr) {
      console.warn("DB context fetch error:", dbErr);
      dbContext = "\n\n[Note: Could not fetch live DB data at this time. Please check the database connection.]";
    }

    const systemPrompt = BASE_SYSTEM_PROMPT.replace("{{TODAY}}", now.toLocaleString("en-US", { timeZone: "America/New_York" })) + dbContext;

    let apiUrl = "";
    let apiKey = "";
    let apiModel = "";

    if (process.env.GOOGLE_AI_KEY) {
      apiUrl = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
      apiKey = process.env.GOOGLE_AI_KEY;
      apiModel = "gemini-3.6-flash";
    } else if (process.env.GROQ_API_KEY) {
      apiUrl = "https://api.groq.com/openai/v1/chat/completions";
      apiKey = process.env.GROQ_API_KEY;
      apiModel = "openai/gpt-oss-20b";
    } else if (process.env.OPENROUTER_API_KEY) {
      apiUrl = "https://openrouter.ai/api/v1/chat/completions";
      apiKey = process.env.OPENROUTER_API_KEY;
      apiModel = "openai/gpt-4o";
    } else if (process.env.OPENAI_API_KEY) {
      apiUrl = "https://api.openai.com/v1/chat/completions";
      apiKey = process.env.OPENAI_API_KEY;
      apiModel = "gpt-4o-mini";
    } else if (process.env.GROQ_API_KEY) {
      apiUrl = "https://api.groq.com/openai/v1/chat/completions";
      apiKey = process.env.GROQ_API_KEY;
      apiModel = "openai/gpt-oss-20b";
    } else {
      return Response.json({ reply: "No AI service configured." });
    }

    const aiRes = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: apiModel,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.1, // Very low — precision over creativity
        max_tokens: 1000,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("Admin AI Error:", errText);
      return Response.json({ reply: `AI API Error: ${aiRes.status}` });
    }

    const data = await aiRes.json();
    const reply = data.choices?.[0]?.message?.content ?? "No response.";

    // Persist messages to DB if conversationId provided
    if (conversationId) {
      try {
        const userMsg = messages[messages.length - 1];
        await prisma.message.createMany({
          data: [
            { conversationId, role: "user", content: userMsg.content },
            { conversationId, role: "assistant", content: reply },
          ],
        });
        await prisma.conversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date() },
        });
      } catch (dbErr) {
        console.warn("Failed to persist messages:", dbErr);
      }
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Admin AI Chat API Error:", error);
    return new Response("An error occurred processing your request.", { status: 500 });
  }
}
