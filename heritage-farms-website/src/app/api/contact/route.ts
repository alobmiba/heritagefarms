import { NextResponse } from "next/server";
import { contactSchema, RateLimiter, sanitizeInput } from "@/lib/validation";
import { securityMonitor, isSuspiciousIP, isSuspiciousUserAgent } from "@/lib/security-monitor";

// Enhanced rate limiter
const rateLimiter = new RateLimiter(60000, 10); // 10 requests per minute

export async function POST(req: Request) {
  try {
    // Get client information
    const ip = req.headers.get("x-forwarded-for") ?? 
               req.headers.get("x-real-ip") ?? 
               "unknown";
    const userAgent = req.headers.get("user-agent") ?? "unknown";

    // Security checks
    if (isSuspiciousIP(ip)) {
      securityMonitor.logSuspiciousActivity(
        'Suspicious IP detected',
        { ip, userAgent },
        ip,
        userAgent
      );
    }

    if (isSuspiciousUserAgent(userAgent)) {
      securityMonitor.logSuspiciousActivity(
        'Suspicious user agent detected',
        { ip, userAgent },
        ip,
        userAgent
      );
    }

    // Rate limiting
    if (!rateLimiter.isAllowed(ip)) {
      securityMonitor.logRateLimit(ip, '/api/contact', userAgent);
      return NextResponse.json(
        { 
          error: "Too many requests", 
          retryAfter: Math.ceil(60 - (Date.now() % 60000) / 1000)
        }, 
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Remaining': rateLimiter.getRemaining(ip).toString()
          }
        }
      );
    }

    // Parse form data
    const form = await req.formData();
    
    // Sanitize inputs
    const rawPayload = {
      name: sanitizeInput(String(form.get("name") || "")),
      email: sanitizeInput(String(form.get("email") || "")),
      phone: form.get("phone") ? sanitizeInput(String(form.get("phone"))) : undefined,
      subject: form.get("subject") ? sanitizeInput(String(form.get("subject"))) : undefined,
      message: sanitizeInput(String(form.get("message") || "")),
    };

    // Validate with Zod schema
    const validationResult = contactSchema.safeParse(rawPayload);
    
    if (!validationResult.success) {
      // Log validation failures for security monitoring
      validationResult.error.issues.forEach(error => {
        securityMonitor.logValidationFailure(
          String(error.input || ''),
          error.path.join('.'),
          ip,
          userAgent
        );
      });

      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: validationResult.error.issues 
        }, 
        { status: 400 }
      );
    }

    const payload = validationResult.data;

    // Log contact form submission (sanitized)
    console.log("CONTACT_FORM_SUBMISSION", {
      name: payload.name,
      email: payload.email,
      hasPhone: !!payload.phone,
      hasSubject: !!payload.subject,
      messageLength: payload.message.length,
      timestamp: new Date().toISOString(),
      ip: ip
    });

    // TODO: Implement email service / CRM integration
    // For now, just return success

    return NextResponse.json({ 
      ok: true,
      message: "Thank you for your message. We'll get back to you soon."
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
