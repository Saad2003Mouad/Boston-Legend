import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requirePermission(req, "packages.update");
    if (!auth.success) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const data = await req.json();
    const updateData: any = {};
    
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.serviceType !== undefined) updateData.serviceType = data.serviceType;
    if (data.price !== undefined) updateData.price = parseFloat(data.price);
    if (data.servings !== undefined) updateData.servings = parseInt(data.servings);
    if (data.extraPiecePrice !== undefined) updateData.extraPiecePrice = parseFloat(data.extraPiecePrice);
    if (data.extraGuestPrice !== undefined) updateData.extraGuestPrice = parseFloat(data.extraGuestPrice);
    if (data.durationMins !== undefined) updateData.durationMins = parseInt(data.durationMins);
    if (data.features !== undefined) updateData.features = JSON.stringify(data.features);
    if (data.image !== undefined) updateData.imageUrl = data.image;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.sortOrder !== undefined) updateData.sortOrder = parseInt(data.sortOrder);
    if (data.badge !== undefined) updateData.badge = data.badge;

    const updated = await prisma.package.update({
      where: { id: (await params).id },
      data: updateData
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Update package error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requirePermission(req, "packages.delete");
    if (!auth.success) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const { id } = await params;

    await prisma.package.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false }
    });

    await prisma.auditLog.create({
      data: {
        entityType: "PACKAGE",
        entityId: id,
        action: "PACKAGE_SOFT_DELETED",
        actorId: auth.user!.id
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete package error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
