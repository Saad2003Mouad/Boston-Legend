export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { posts: { where: { deletedAt: null } } } }
      }
    });
    return NextResponse.json({ success: true, data: categories });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, "settings.update");
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const { name, description } = await req.json();
    if (!name?.trim()) return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });

    const slug = slugify(name);
    
    // Check uniqueness
    const exists = await prisma.category.findUnique({ where: { slug } });
    if (exists) return NextResponse.json({ success: false, error: "Category with similar name already exists" }, { status: 400 });

    const cat = await prisma.category.create({
      data: { name, slug, description },
      include: { _count: { select: { posts: true } } }
    });

    return NextResponse.json({ success: true, data: cat }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
