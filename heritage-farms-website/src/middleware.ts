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
  console.log('Middleware - Token:', { email: token?.email, isAdmin: token?.isAdmin });
  
  if (!token || !token.email) {
    console.log('Middleware - No token, redirecting to signin');
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  
  // Check if user is admin (either by isAdmin flag or email)
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase());
  const isAdmin = token.isAdmin || allowed.includes(token.email.toLowerCase());
  
  console.log('Middleware - Admin check:', { email: token.email, isAdmin, allowed });
  
  if (!isAdmin) {
    console.log('Middleware - Not admin, returning forbidden');
    return new NextResponse("Forbidden", { status: 403 });
  }
  
  console.log('Middleware - Admin access granted');
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
