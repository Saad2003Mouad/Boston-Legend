import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser, hasPermission, unauthenticated, unauthorized } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const user = await getSessionUser(req);
    if (!user) return unauthenticated();

    const canViewFull    = hasPermission(user.role, "dashboard.view");
    const canViewLimited = hasPermission(user.role, "dashboard.view.limited");

    if (!canViewFull && !canViewLimited) return unauthorized();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    // ── 1. COMPREHENSIVE STATS ────────────────────────────────────────────
    const [
      totalBookings,
      pendingReview,
      confirmedCount,
      completedCount,
      cancelledCount,
      totalCustomers,
      weekRevAggr,
      monthRevAggr,
      allTimeRevAggr,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "PENDING_REVIEW" } }),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.booking.count({ where: { status: "COMPLETED" } }),
      prisma.booking.count({ where: { status: "CANCELLED" } }),
      prisma.customer.count(),
      prisma.booking.aggregate({
        where: { status: { in: ["COMPLETED", "CONFIRMED"] }, eventDate: { gte: sevenDaysAgo } },
        _sum: { totalAmount: true },
      }),
      prisma.booking.aggregate({
        where: { status: { in: ["COMPLETED", "CONFIRMED"] }, eventDate: { gte: thirtyDaysAgo } },
        _sum: { totalAmount: true },
      }),
      prisma.booking.aggregate({
        where: { status: { in: ["COMPLETED", "CONFIRMED"] } },
        _sum: { totalAmount: true },
      }),
    ]);

    // ── 2. TODAY BOOKINGS ─────────────────────────────────────────────────
    const todayBookings = await prisma.booking.findMany({
      where: { eventDate: { gte: today, lt: new Date(today.getTime() + 86400000) } },
      include: { customer: true, vehicle: true, package: true },
      orderBy: { startTime: "asc" },
    });

    // ── 3. PENDING REVIEW BOOKINGS ────────────────────────────────────────
    const pendingBookings = await prisma.booking.findMany({
      where: { status: "PENDING_REVIEW" },
      include: { customer: true, package: true },
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    // ── 4. RECENT BOOKINGS (all statuses) ────────────────────────────────
    const recentBookings = await prisma.booking.findMany({
      include: { customer: true, package: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    });

    // ── 5. VEHICLES ───────────────────────────────────────────────────────
    const vehicles = await prisma.vehicle.findMany({ orderBy: { code: "asc" } });

    // ── 6. REVENUE CHART — real 7-day data ───────────────────────────────
    const sevenDaysBookings = await prisma.booking.findMany({
      where: {
        status: { in: ["CONFIRMED", "COMPLETED"] },
        eventDate: { gte: sevenDaysAgo },
      },
      select: { eventDate: true, totalAmount: true },
    });

    const revenueChart = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
      const dayKey   = d.toISOString().split("T")[0];
      const revenue  = sevenDaysBookings
        .filter(b => b.eventDate.toISOString().split("T")[0] === dayKey)
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
      return { day: dayLabel, revenue };
    });

    // ── 7. UPCOMING BOOKINGS (next 30 days, confirmed) ────────────────────
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        status: { in: ["CONFIRMED", "PENDING_REVIEW"] },
        eventDate: { gte: today },
      },
      include: { customer: true, package: true },
      orderBy: { eventDate: "asc" },
      take: 5,
    });

    // ── 8. ACTIVITY FEED ────────────────────────────────────────────────────
    const activityFeed = await prisma.auditLog.findMany({
      take: 15,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } }
    });

    const finalStats = {
      totalBookings,
      todayJobs:      todayBookings.length,
      pending:        pendingReview,
      confirmed:      confirmedCount,
      completed:      completedCount,
      cancelled:      cancelledCount,
      weekRevenue:    canViewFull ? (weekRevAggr._sum.totalAmount  || 0) : 0,
      monthRevenue:   canViewFull ? (monthRevAggr._sum.totalAmount || 0) : 0,
      allTimeRevenue: canViewFull ? (allTimeRevAggr._sum.totalAmount || 0) : 0,
      totalCustomers,
    };

    return NextResponse.json({
      success: true,
      data: {
        stats: finalStats,
        todayBookings: todayBookings.map(b => ({
          id:            b.id,
          bookingNumber: b.bookingNumber,
          startTime:     b.startTime,
          customer:      { firstName: b.customer.firstName, lastName: b.customer.lastName },
          eventType:     b.eventType,
          city:          b.city,
          address:       b.address,
          package:       b.package ? { name: b.package.name } : null,
          vehicle:       b.vehicle ? { code: b.vehicle.code } : null,
          status:        b.status,
          totalAmount:   b.totalAmount,
        })),
        pendingBookings: pendingBookings.map(b => ({
          id:            b.id,
          bookingNumber: b.bookingNumber,
          customer:      { firstName: b.customer.firstName, lastName: b.customer.lastName },
          eventType:     b.eventType,
          totalAmount:   b.totalAmount,
          package:       b.package ? { name: b.package.name } : null,
          createdAt:     b.createdAt,
        })),
        recentBookings: recentBookings.map(b => ({
          id:            b.id,
          bookingNumber: b.bookingNumber,
          customer:      { firstName: b.customer.firstName, lastName: b.customer.lastName },
          eventType:     b.eventType,
          totalAmount:   b.totalAmount,
          package:       b.package ? { name: b.package.name } : null,
          status:        b.status,
          createdAt:     b.createdAt,
          eventDate:     b.eventDate,
          city:          b.city,
        })),
        upcomingBookings: upcomingBookings.map(b => ({
          id:            b.id,
          bookingNumber: b.bookingNumber,
          customer:      { firstName: b.customer.firstName, lastName: b.customer.lastName },
          eventDate:     b.eventDate,
          startTime:     b.startTime,
          city:          b.city,
          status:        b.status,
          package:       b.package ? { name: b.package.name } : null,
          totalAmount:   b.totalAmount,
        })),
        vehicles:    vehicles.map(v => ({ code: v.code, type: v.type, status: v.status })),
        revenueChart: canViewFull ? revenueChart : [],
        activityFeed: activityFeed.map(a => ({
          id: a.id,
          action: a.action,
          entityType: a.entityType,
          entityId: a.entityId,
          createdAt: a.createdAt,
          actorName: a.user?.name || a.user?.email || "System",
          metadata: a.metadataJson ? JSON.parse(a.metadataJson) : null
        }))
      },
    });
  } catch (error: any) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to load dashboard" }, { status: 500 });
  }
}
