import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req, "settings.view"); // general admin access
  if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const media = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        uploadedBy: { select: { name: true } }
      }
    });

    const total = await prisma.media.count();

    return NextResponse.json({ success: true, data: media, meta: { total, page, limit } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check packages.update permission or settings.update
    let auth = await requirePermission(req, "packages.update");
    if (!auth.success) {
      auth = await requirePermission(req, "settings.update");
      if (!auth.success) {
        return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
      }
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Validate type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Invalid file type. Only JPG, PNG, and WebP are allowed." }, { status: 400 });
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File size exceeds 5MB limit." }, { status: 400 });
    }

    // Clean name and set filename path
    const ext = file.name.split(".").pop() || "jpg";
    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    const filename = `uploads/${Date.now()}-${cleanName}.${ext}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    });

    // Save to Media DB
    const mediaRecord = await prisma.media.create({
      data: {
        url: blob.url,
        key: blob.url, // Using URL as key since Vercel Blob urls are unique and standard
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        uploadedById: auth.user!.id
      }
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      data: mediaRecord
    });
  } catch (error: any) {
    console.error("Upload route error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
