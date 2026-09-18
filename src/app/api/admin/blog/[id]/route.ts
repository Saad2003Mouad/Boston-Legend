export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const post = await prisma.post.findFirst({
      where: { id, deletedAt: null },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        author:   { select: { id: true, name: true } },
      },
    });
    if (!post) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: post });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req, "settings.update");
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const { id } = await params;
  try {
    const body = await req.json();
    const { title, content, excerpt, featuredImage, seoTitle, seoDesc, status, categoryId } = body;

    const current = await prisma.post.findUnique({ where: { id } });
    if (!current) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    const data: any = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;
    if (excerpt !== undefined) data.excerpt = excerpt;
    if (featuredImage !== undefined) data.featuredImage = featuredImage;
    if (seoTitle !== undefined) data.seoTitle = seoTitle;
    if (seoDesc !== undefined) data.seoDesc = seoDesc;
    if (categoryId !== undefined) data.categoryId = categoryId || null;
    if (status !== undefined) {
      data.status = status;
      if (status === "PUBLISHED" && !current.publishedAt) data.publishedAt = new Date();
      if (status === "DRAFT") data.publishedAt = null;
    }

    const post = await prisma.post.update({
      where: { id },
      data,
      include: {
        category: { select: { id: true, name: true, slug: true } },
        author:   { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ success: true, data: post });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req, "settings.update");
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const { id } = await params;
  try {
    await prisma.post.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
