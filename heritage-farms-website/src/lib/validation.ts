import { z } from 'zod';

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string()
    .email('Invalid email address')
    .max(254, 'Email must be less than 254 characters'),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val.replace(/[\s\-\(\)]/g, '')), {
      message: 'Invalid phone number format'
    }),
  subject: z.string()
    .optional()
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .min(1, 'Message is required')
    .max(1000, 'Message must be less than 1000 characters')
    .regex(/^[^<>]*$/, 'Message cannot contain HTML tags'),
});

// Product review validation schema
export const reviewSchema = z.object({
  customerName: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  rating: z.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  title: z.string()
    .min(1, 'Review title is required')
    .max(200, 'Review title must be less than 200 characters')
    .regex(/^[^<>]*$/, 'Title cannot contain HTML tags'),
  comment: z.string()
    .min(1, 'Review comment is required')
    .max(1000, 'Review comment must be less than 1000 characters')
    .regex(/^[^<>]*$/, 'Comment cannot contain HTML tags'),
});

// Wishlist item validation schema
export const wishlistItemSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z.string()
    .min(1, 'Product name is required')
    .max(200, 'Product name must be less than 200 characters')
    .regex(/^[^<>]*$/, 'Product name cannot contain HTML tags'),
  price: z.number().positive('Price must be positive'),
  priceUnit: z.string().min(1, 'Price unit is required'),
  image: z.string().url('Image must be a valid URL'),
  sku: z.string().min(1, 'SKU is required'),
});

// Cart item validation schema
export const cartItemSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z.string()
    .min(1, 'Product name is required')
    .max(200, 'Product name must be less than 200 characters')
    .regex(/^[^<>]*$/, 'Product name cannot contain HTML tags'),
  price: z.string().min(1, 'Price is required'),
  priceUnit: z.string().min(1, 'Price unit is required'),
  image: z.string().url('Image must be a valid URL'),
  sku: z.string().min(1, 'SKU is required'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});

// Input sanitization function
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
}

// Email validation function
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Phone number validation function
export function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(cleanPhone);
}

// Rate limiting helper
export class RateLimiter {
  private hits = new Map<string, { timestamp: number; count: number }>();
  private windowMs: number;
  private limit: number;

  constructor(windowMs: number = 60000, limit: number = 10) {
    this.windowMs = windowMs;
    this.limit = limit;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.hits.get(identifier) || { timestamp: now, count: 0 };

    if (now - record.timestamp > this.windowMs) {
      record.timestamp = now;
      record.count = 0;
    }

    record.count++;
    this.hits.set(identifier, record);

    return record.count <= this.limit;
  }

  getRemaining(identifier: string): number {
    const record = this.hits.get(identifier);
    if (!record) return this.limit;
    
    const now = Date.now();
    if (now - record.timestamp > this.windowMs) {
      return this.limit;
    }
    
    return Math.max(0, this.limit - record.count);
  }
}

// CSRF token generation and validation
export class CSRFProtection {
  private static tokens = new Set<string>();

  static generateToken(): string {
    const token = crypto.randomUUID();
    this.tokens.add(token);
    return token;
  }

  static validateToken(token: string): boolean {
    const isValid = this.tokens.has(token);
    if (isValid) {
      this.tokens.delete(token); // Use once
    }
    return isValid;
  }

  static cleanup(): void {
    // Clean up old tokens periodically
    this.tokens.clear();
  }
}
