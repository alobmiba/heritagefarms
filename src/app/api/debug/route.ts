import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    adminEmails: process.env.ADMIN_EMAILS || 'Not set',
    nextauthUrl: process.env.NEXTAUTH_URL || 'Not set',
    hasSecret: !!process.env.NEXTAUTH_SECRET,
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
  });
}
