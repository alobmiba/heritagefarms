import { NextRequest } from 'next/server';
import crypto from 'crypto';

/**
 * CSRF Protection utility for Next.js API routes
 */

// Store for CSRF tokens (in production, use Redis or database)
const tokenStore = new Map<string, { token: string; expires: number }>();

// Clean up expired tokens periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of tokenStore.entries()) {
    if (value.expires < now) {
      tokenStore.delete(key);
    }
  }
}, 60 * 60 * 1000); // Clean up every hour

/**
 * Generate a CSRF token for a session
 * @param sessionId - The session identifier
 * @returns The generated CSRF token
 */
export function generateCSRFToken(sessionId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + (4 * 60 * 60 * 1000); // 4 hours
  
  tokenStore.set(sessionId, { token, expires });
  
  return token;
}

/**
 * Validate a CSRF token
 * @param sessionId - The session identifier
 * @param token - The token to validate
 * @returns True if the token is valid
 */
export function validateCSRFToken(sessionId: string, token: string): boolean {
  const stored = tokenStore.get(sessionId);
  
  if (!stored) {
    return false;
  }
  
  if (stored.expires < Date.now()) {
    tokenStore.delete(sessionId);
    return false;
  }
  
  // Use timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(stored.token),
    Buffer.from(token)
  );
}

/**
 * Middleware to check CSRF token in API routes
 * @param request - The Next.js request object
 * @returns True if CSRF check passes
 */
export async function checkCSRF(request: NextRequest): Promise<boolean> {
  // Skip CSRF check for GET and HEAD requests
  if (request.method === 'GET' || request.method === 'HEAD') {
    return true;
  }
  
  // Get CSRF token from header or body
  const headerToken = request.headers.get('X-CSRF-Token');
  
  if (!headerToken) {
    return false;
  }
  
  // Get session ID from cookie or authorization header
  const sessionId = request.cookies.get('sessionId')?.value || 
                   request.headers.get('Authorization')?.replace('Bearer ', '');
  
  if (!sessionId) {
    return false;
  }
  
  return validateCSRFToken(sessionId, headerToken);
}

/**
 * Generate a secure session ID
 * @returns A secure session ID
 */
export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Double Submit Cookie pattern implementation
 * This is an alternative to stateful CSRF tokens
 */
export function generateDoubleSubmitToken(): { token: string; hash: string } {
  const token = crypto.randomBytes(32).toString('hex');
  const secret = process.env.CSRF_SECRET || 'default-secret-change-in-production';
  const hash = crypto
    .createHmac('sha256', secret)
    .update(token)
    .digest('hex');
  
  return { token, hash };
}

/**
 * Validate double submit token
 */
export function validateDoubleSubmitToken(token: string, hash: string): boolean {
  const secret = process.env.CSRF_SECRET || 'default-secret-change-in-production';
  const expectedHash = crypto
    .createHmac('sha256', secret)
    .update(token)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(expectedHash)
  );
}