export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status    = searchParams.get("status");
  const categoryId = searchParams.get("category");
  const isPublic  = searchParams.get("public") === "1";

  try {
    const where: any = { deletedAt: null };
    if (status && status !== "ALL") where.status = status;
    if (isPublic) where.status = "PUBLISHED";
    if (categoryId) where.categoryId = categoryId;

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        author:   { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ success: true, data: posts });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, "settings.update");
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const body = await req.json();
    const { title, content, excerpt, featuredImage, seoTitle, seoDesc, status, categoryId } = body;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ success: false, error: "Title and content are required." }, { status: 400 });
    }

    const slug = slugify(title);

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        featuredImage: featuredImage || null,
        seoTitle: seoTitle || title,
        seoDesc: seoDesc || excerpt || null,
        status: status || "DRAFT",
        categoryId: categoryId || null,
        authorId: auth.user!.id,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        author:   { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (e: any) {
    if (e.code === "P2002") return NextResponse.json({ success: false, error: "A post with this title already exists." }, { status: 400 });
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
