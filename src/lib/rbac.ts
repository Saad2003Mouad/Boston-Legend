import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export * from "./permissions";
import { hasPermission } from "./permissions";


export async function getSessionUser(req: NextRequest | Request) {
  // Using getServerSession is more robust than getToken in App Router API routes
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  return {
    id: (session.user as any).id as string,
    email: session.user.email as string,
    role: (session.user as any).role as string,
    permissions: ((session.user as any).permissions as string[]) || []
  };
}

export async function checkPermission(req: NextRequest | Request, requiredPermission: string): Promise<boolean> {
  const user = await getSessionUser(req);
  if (!user) return false;
  return hasPermission(user.role, requiredPermission, user.permissions);
}

export async function requirePermission(req: NextRequest | Request, permission: string) {
  const user = await getSessionUser(req);
  if (!user) {
    return { success: false, status: 401, error: "Unauthenticated access: Please log in." as string, user: null };
  }
  if (!hasPermission(user.role, permission, user.permissions)) {
    return { success: false, status: 403, error: "Unauthorized access: You lack the required permissions." as string, user };
  }
  return { success: true, status: 200, error: null, user };
}

export function unauthenticated() {
  return NextResponse.json({ success: false, error: "Unauthenticated access: Please log in." }, { status: 401 });
}

export function unauthorized() {
  return NextResponse.json({ success: false, error: "Unauthorized access: You lack the required permissions." }, { status: 403 });
}
