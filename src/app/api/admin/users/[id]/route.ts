export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requirePermission(req, "users.update");
    if (!auth.success) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }
    const loggedInUser = auth.user!;
    const { id } = await params;

    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (!targetUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    if (targetUser.role === "OWNER" && loggedInUser.role !== "OWNER") {
      return NextResponse.json({ success: false, error: "Only an OWNER can modify OWNER users." }, { status: 403 });
    }

    const body = await req.json();
    const { name, role, permissions, active } = body;

    if ((role === "OWNER" || targetUser.role === "OWNER") && loggedInUser.role !== "OWNER") {
      return NextResponse.json({ success: false, error: "Only an OWNER can change OWNER roles." }, { status: 403 });
    }

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (role !== undefined) data.role = role;
    if (permissions !== undefined) data.permissions = permissions;
    if (active !== undefined) data.active = active;

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true, permissions: true, active: true }
    });

    await prisma.auditLog.create({
      data: {
        entityType: "USER",
        entityId: updatedUser.id,
        action: "USER_UPDATED",
        metadataJson: JSON.stringify({ updatedFields: Object.keys(data) }),
        actorId: loggedInUser.id
      }
    });

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Failed to update user", error);
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requirePermission(req, "users.delete");
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

    const { id } = await params;
    if (auth.user!.id === id) {
      return NextResponse.json({ success: false, error: "You cannot delete your own account." }, { status: 400 });
    }

    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    if (target.role === "OWNER" && auth.user!.role !== "OWNER") {
      return NextResponse.json({ success: false, error: "Only OWNER can delete OWNER accounts." }, { status: 403 });
    }

    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), active: false },
    });

    await prisma.auditLog.create({
      data: {
        entityType: "USER",
        entityId: id,
        action: "USER_SOFT_DELETED",
        actorId: auth.user!.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete user", error);
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
  }
}
