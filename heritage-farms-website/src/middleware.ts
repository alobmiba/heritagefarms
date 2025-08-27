import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

interface JWTToken {
  email?: string;
  isAdmin?: boolean;
  [key: string]: unknown;
}

const adminPaths = [/^\/admin(\/|$)/, /^\/api\/admin(\/|$)/];

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  if (!adminPaths.some(rx => rx.test(url.pathname))) return NextResponse.next();
  
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as JWTToken | null;
  
  if (!token || !token.email) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  
  // Check if user is admin (either by isAdmin flag or email)
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase());
  const isAdmin = token.isAdmin || allowed.includes(token.email.toLowerCase());
  
  if (!isAdmin) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
