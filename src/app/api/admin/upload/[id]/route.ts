import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requirePermission(req, "settings.update");
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

    const { id } = await params;

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) return NextResponse.json({ success: false, error: "Media not found" }, { status: 404 });

    // Delete from Vercel Blob
    try {
      await del(media.url);
    } catch (e) {
      console.warn("Failed to delete from blob storage, but continuing:", e);
    }

    // Delete from DB
    await prisma.media.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
