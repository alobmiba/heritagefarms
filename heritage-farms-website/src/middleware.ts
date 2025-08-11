import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const adminPaths = [/^\/admin(\/|$)/, /^\/api\/admin(\/|$)/];

export async function middleware(req: Request) {
  const url = new URL(req.url);
  if (!adminPaths.some(rx => rx.test(url.pathname))) return NextResponse.next();
  
  const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !(token as any).email) return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase());
  if (!allowed.includes((token as any).email.toLowerCase())) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
