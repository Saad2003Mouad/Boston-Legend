export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

// GET /api/admin/conversations/[id] — get conversation with messages
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req, "ai.view");
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const { id } = await params;
  try {
    const conv = await prisma.conversation.findFirst({
      where: { id, userId: auth.user!.id, deletedAt: null },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });
    if (!conv) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: conv });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

// PATCH /api/admin/conversations/[id] — rename conversation
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req, "ai.use");
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const { id } = await params;
  try {
    const { title } = await req.json();
    const conv = await prisma.conversation.update({
      where: { id },
      data: { title, updatedAt: new Date() },
      select: { id: true, title: true },
    });
    return NextResponse.json({ success: true, data: conv });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

// DELETE /api/admin/conversations/[id] — soft delete
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req, "ai.use");
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const { id } = await params;
  try {
    await prisma.conversation.update({
      where: { id, userId: auth.user!.id },
      data: { deletedAt: new Date() },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
