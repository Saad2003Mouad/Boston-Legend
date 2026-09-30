import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";
import { SERVICE_AREAS } from "@/lib/serviceAreas";

export const dynamic = "force-dynamic";

// POST — seed ZIP codes from static list (upsert, idempotent)
export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, "serviceAreas.create");
  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const records = SERVICE_AREAS.map(area => ({
      zip: area.zip,
      city: area.city,
      county: area.county || null,
      isActive: true,
    }));

    const result = await prisma.serviceZipCode.createMany({
      data: records,
      skipDuplicates: true, // Don't throw if zip already exists
    });

    return NextResponse.json({
      message: `Seed complete. ${result.count} new ZIP codes added. (Duplicates skipped)`,
      total: SERVICE_AREAS.length,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: "Failed to seed zip codes",
      details: error.message
    }, { status: 500 });
  }
}
