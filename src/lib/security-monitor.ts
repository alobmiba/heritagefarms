// Security monitoring and logging utility

export interface SecurityEvent {
  type: 'auth_attempt' | 'rate_limit' | 'validation_failure' | 'admin_access' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details: Record<string, unknown>;
  timestamp: string;
  ip?: string;
  userAgent?: string;
  userId?: string;
}

class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private maxEvents = 1000; // Keep last 1000 events in memory

  log(event: Omit<SecurityEvent, 'timestamp'>) {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: new Date().toISOString()
    };

    this.events.push(securityEvent);

    // Keep only the last maxEvents
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔒 SECURITY EVENT:', securityEvent);
    }

    // TODO: Send to external logging service in production
    // This could be Sentry, LogRocket, or a custom logging service
  }

  logAuthAttempt(email: string, success: boolean, ip?: string, userAgent?: string) {
    this.log({
      type: 'auth_attempt',
      severity: success ? 'low' : 'medium',
      message: `Authentication attempt ${success ? 'succeeded' : 'failed'} for ${email}`,
      details: { email, success, ip, userAgent },
      ip,
      userAgent
    });
  }

  logRateLimit(ip: string, endpoint: string, userAgent?: string) {
    this.log({
      type: 'rate_limit',
      severity: 'medium',
      message: `Rate limit exceeded for IP ${ip} on endpoint ${endpoint}`,
      details: { ip, endpoint, userAgent },
      ip,
      userAgent
    });
  }

  logValidationFailure(input: string, field: string, ip?: string, userAgent?: string) {
    this.log({
      type: 'validation_failure',
      severity: 'low',
      message: `Validation failed for field ${field}`,
      details: { field, input: input.substring(0, 100), ip, userAgent },
      ip,
      userAgent
    });
  }

  logAdminAccess(email: string, path: string, ip?: string, userAgent?: string) {
    this.log({
      type: 'admin_access',
      severity: 'medium',
      message: `Admin access by ${email} to ${path}`,
      details: { email, path, ip, userAgent },
      ip,
      userAgent
    });
  }

  logSuspiciousActivity(activity: string, details: Record<string, unknown>, ip?: string, userAgent?: string) {
    this.log({
      type: 'suspicious_activity',
      severity: 'high',
      message: `Suspicious activity detected: ${activity}`,
      details: { activity, ...details, ip, userAgent },
      ip,
      userAgent
    });
  }

  getEvents(limit: number = 100): SecurityEvent[] {
    return this.events.slice(-limit);
  }

  getEventsByType(type: SecurityEvent['type'], limit: number = 100): SecurityEvent[] {
    return this.events
      .filter(event => event.type === type)
      .slice(-limit);
  }

  getEventsBySeverity(severity: SecurityEvent['severity'], limit: number = 100): SecurityEvent[] {
    return this.events
      .filter(event => event.severity === severity)
      .slice(-limit);
  }

  getRecentEvents(minutes: number = 60): SecurityEvent[] {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return this.events.filter(event => new Date(event.timestamp) > cutoff);
  }

  // Get security statistics
  getStats() {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000);

    const events24h = this.events.filter(e => new Date(e.timestamp) > last24h);
    const events1h = this.events.filter(e => new Date(e.timestamp) > lastHour);

    return {
      total: this.events.length,
      last24h: events24h.length,
      lastHour: events1h.length,
      byType: this.events.reduce((acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      bySeverity: this.events.reduce((acc, event) => {
        acc[event.severity] = (acc[event.severity] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  // Clear old events (older than 7 days)
  cleanup() {
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    this.events = this.events.filter(event => new Date(event.timestamp) > cutoff);
  }
}

// Export singleton instance
export const securityMonitor = new SecurityMonitor();

// Cleanup old events every hour
if (typeof window === 'undefined') { // Server-side only
  setInterval(() => {
    securityMonitor.cleanup();
  }, 60 * 60 * 1000); // Every hour
}

// Helper functions for common security checks
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isSuspiciousIP(_ip: string): boolean {
  // Add logic to detect suspicious IPs
  // This could check against known malicious IP lists
  return false;
}

export function isSuspiciousUserAgent(userAgent: string): boolean {
  // Add logic to detect suspicious user agents
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}

export function validateCSRFToken(token: string): boolean {
  // Implement CSRF token validation
  // This is a placeholder - implement proper CSRF protection
  return Boolean(token && token.length > 0);
}

export function sanitizeForLogging(data: unknown): unknown {
  // Remove sensitive information before logging
  const sensitiveFields = ['password', 'token', 'secret', 'key', 'credit_card'];
  
  if (typeof data === 'object' && data !== null) {
    const sanitized = { ...data as Record<string, unknown> };
    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    }
    return sanitized;
  }
  
  return data;
}
