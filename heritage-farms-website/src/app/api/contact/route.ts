import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

// super-simple in-memory rate limiter (per server instance)
const hits = new Map<string, { t: number; c: number }>();
const WINDOW_MS = 60_000;
const LIMIT = 10;

function rateLimit(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip) ?? { t: now, c: 0 };
  if (now - rec.t > WINDOW_MS) { rec.t = now; rec.c = 0; }
  rec.c += 1;
  hits.set(ip, rec);
  return rec.c <= LIMIT;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const form = await req.formData();
  const payload: ContactPayload = {
    name: String(form.get("name") || ""),
    email: String(form.get("email") || ""),
    phone: form.get("phone") ? String(form.get("phone")) : undefined,
    subject: form.get("subject") ? String(form.get("subject")) : undefined,
    message: String(form.get("message") || ""),
  };

  // basic validation
  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // TODO: swap this for email service / CRM integration
  console.log("CONTACT_FORM", payload);

  return NextResponse.json({ ok: true });
}
