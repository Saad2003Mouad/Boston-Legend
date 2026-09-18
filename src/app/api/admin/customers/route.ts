import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const auth = await requirePermission(req, "customers.view");
    if (!auth.success) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const customers = await prisma.customer.findMany({
      where: { deletedAt: null },
      include: {
        _count: { select: { bookings: true } },
        bookings: {
          select: { quote: { select: { totalAmount: true } } }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const formatted = customers.map((c: any) => ({
      id: c.id,
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      phone: c.phone,
      company: c.company,
      createdAt: c.createdAt,
      bookingsCount: c._count.bookings,
      totalSpent: c.bookings.reduce((sum: number, b: any) => sum + (b.quote?.totalAmount ?? 0), 0)
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}
