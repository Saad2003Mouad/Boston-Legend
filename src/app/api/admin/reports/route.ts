import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const auth = await requirePermission(req, "bookings.view"); // Using bookings.view as proxy for reports for now
    if (!auth.success) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    // City Analytics
    const cityGroup = await prisma.booking.groupBy({
      by: ["city"],
      _count: {
        id: true,
      },
      _sum: {
        totalAmount: true,
      },
      where: {
        status: { notIn: ["CANCELLED"] },
      },
      orderBy: {
        _sum: {
          totalAmount: "desc",
        },
      },
    });

    const cityStats = cityGroup.map((c: any) => ({
      city: c.city,
      count: c._count.id,
      revenue: c._sum.totalAmount || 0,
    }));

    // Monthly Revenue (Current Year)
    const currentYear = new Date().getFullYear();
    const startDate = new Date(`${currentYear}-01-01T00:00:00.000Z`);
    
    const bookingsThisYear = await prisma.booking.findMany({
      where: {
        eventDate: { gte: startDate },
        status: { notIn: ["CANCELLED"] },
      },
      select: {
        eventDate: true,
        totalAmount: true,
      }
    });

    const monthlyRevenue = Array(12).fill(0).map((_, i) => ({
      month: new Date(0, i).toLocaleString('en', { month: 'short' }),
      revenue: 0,
      bookings: 0
    }));

    bookingsThisYear.forEach((b: any) => {
      const m = new Date(b.eventDate).getMonth();
      monthlyRevenue[m].revenue += b.totalAmount || 0;
      monthlyRevenue[m].bookings += 1;
    });

    // Overview Stats
    const totalRevenue = cityStats.reduce((sum: number, c: any) => sum + c.revenue, 0);
    const totalBookings = cityStats.reduce((sum: number, c: any) => sum + c.count, 0);

    return NextResponse.json({
      success: true,
      data: {
        cityStats,
        monthlyRevenue,
        overview: { totalRevenue, totalBookings },
      }
    });
  } catch (error) {
    console.error("Reports error:", error);
    return NextResponse.json({ error: "Failed to generate reports" }, { status: 500 });
  }
}
