import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requirePermission(req, "customers.view");
    if (!auth.success) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const { id } = await params;

    const customer = await prisma.customer.findUnique({
      where: { id, deletedAt: null },
      include: {
        bookings: {
          include: {
            package: true,
            quote: true,
          },
          orderBy: { eventDate: "desc" }
        }
      }
    });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customer details" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requirePermission(req, "customers.update");
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

    const { id } = await params;
    const data = await req.json();

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      }
    });

    return NextResponse.json({ success: true, data: customer });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requirePermission(req, "customers.delete");
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

    const { id } = await params;

    await prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date() }
    });

    await prisma.auditLog.create({
      data: {
        entityType: "CUSTOMER",
        entityId: id,
        action: "CUSTOMER_SOFT_DELETED",
        actorId: auth.user!.id
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
