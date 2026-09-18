export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req, "settings.update");
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const { id } = await params;
  try {
    const { name, description } = await req.json();
    const data: any = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;

    const cat = await prisma.category.update({
      where: { id },
      data,
      include: { _count: { select: { posts: true } } }
    });
    return NextResponse.json({ success: true, data: cat });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req, "settings.update");
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const { id } = await params;
  try {
    const postCount = await prisma.post.count({ where: { categoryId: id } });
    if (postCount > 0) {
      return NextResponse.json({ success: false, error: "Cannot delete category with existing posts" }, { status: 400 });
    }

    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
