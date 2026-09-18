export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

// GET /api/admin/conversations — list conversations for current user
export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, "ai.view");
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const conversations = await prisma.conversation.findMany({
      where: { userId: auth.user!.id, deletedAt: null },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { messages: true } },
      },
    });
    return NextResponse.json({ success: true, data: conversations });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

// POST /api/admin/conversations — create new conversation
export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, "ai.use");
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const { title } = await req.json();
    const conv = await prisma.conversation.create({
      data: {
        userId: auth.user!.id,
        title: title || "New Conversation",
      },
      select: { id: true, title: true, createdAt: true, updatedAt: true },
    });
    return NextResponse.json({ success: true, data: conv });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
