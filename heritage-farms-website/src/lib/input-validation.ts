import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Comprehensive input validation and sanitization utilities
 */

// Email validation regex - RFC 5322 compliant
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Phone validation - international format
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

// Postal code validation for Canada
const CANADA_POSTAL_CODE_REGEX = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

// US ZIP code validation
const US_ZIP_REGEX = /^\d{5}(-\d{4})?$/;

/**
 * Sanitize text input to prevent XSS and injection attacks
 */
export function sanitizeText(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove HTML tags and scripts
  let sanitized = DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  
  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');
  
  // Trim and limit length
  sanitized = sanitized.trim().substring(0, maxLength);
  
  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  return sanitized;
}

/**
 * Sanitize and validate email address
 */
export function sanitizeEmail(email: string): string {
  const sanitized = sanitizeText(email, 254).toLowerCase();
  
  if (!EMAIL_REGEX.test(sanitized)) {
    throw new Error('Invalid email address format');
  }
  
  return sanitized;
}

/**
 * Sanitize and validate phone number
 */
export function sanitizePhone(phone: string): string {
  // Remove all non-numeric characters except + at the beginning
  let sanitized = phone.replace(/[^\d+]/g, '');
  
  // Ensure + is only at the beginning
  if (sanitized.includes('+') && !sanitized.startsWith('+')) {
    sanitized = sanitized.replace(/\+/g, '');
  }
  
  if (!PHONE_REGEX.test(sanitized)) {
    throw new Error('Invalid phone number format');
  }
  
  return sanitized;
}

/**
 * Sanitize and validate postal/ZIP code
 */
export function sanitizePostalCode(code: string, country: 'CA' | 'US' = 'CA'): string {
  const sanitized = sanitizeText(code, 10).toUpperCase();
  
  if (country === 'CA') {
    if (!CANADA_POSTAL_CODE_REGEX.test(sanitized)) {
      throw new Error('Invalid Canadian postal code format');
    }
  } else {
    if (!US_ZIP_REGEX.test(sanitized)) {
      throw new Error('Invalid US ZIP code format');
    }
  }
  
  return sanitized;
}

/**
 * Sanitize numeric input
 */
export function sanitizeNumber(input: any, min?: number, max?: number): number {
  const num = Number(input);
  
  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Invalid number');
  }
  
  if (min !== undefined && num < min) {
    throw new Error(`Number must be at least ${min}`);
  }
  
  if (max !== undefined && num > max) {
    throw new Error(`Number must be at most ${max}`);
  }
  
  return num;
}

/**
 * Sanitize URL
 */
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid URL protocol');
    }
    
    // Prevent javascript: and data: URLs
    if (url.toLowerCase().includes('javascript:') || url.toLowerCase().includes('data:')) {
      throw new Error('Dangerous URL detected');
    }
    
    return parsed.toString();
  } catch (error) {
    throw new Error('Invalid URL format');
  }
}

/**
 * Enhanced Order validation schema with sanitization
 */
export const EnhancedOrderSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .transform(val => sanitizeText(val, 100)),
  
  email: z.string()
    .email('Invalid email address')
    .transform(val => sanitizeEmail(val)),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 digits')
    .transform(val => sanitizePhone(val)),
  
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters')
    .transform(val => sanitizeText(val, 200))
    .optional(),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters')
    .transform(val => sanitizeText(val, 100))
    .optional(),
  
  postalCode: z.string()
    .transform(val => sanitizePostalCode(val))
    .optional(),
  
  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .transform(val => sanitizeText(val, 1000))
    .optional(),
  
  items: z.array(z.object({
    sku: z.string()
      .max(50)
      .transform(val => sanitizeText(val, 50)),
    name: z.string()
      .max(200)
      .transform(val => sanitizeText(val, 200)),
    qty: z.number()
      .int()
      .positive()
      .max(100),
    price: z.number()
      .int()
      .nonnegative()
      .max(1000000), // Max $10,000 per item
  })).min(1).max(50), // Max 50 items per order
  
  subtotal: z.number()
    .int()
    .nonnegative()
    .max(10000000), // Max $100,000 subtotal
  
  tax: z.number()
    .int()
    .nonnegative()
    .max(1000000), // Max $10,000 tax
  
  total: z.number()
    .int()
    .positive()
    .max(10000000), // Max $100,000 total
});

/**
 * Validate and sanitize cart item
 */
export function validateCartItem(item: any): boolean {
  try {
    const schema = z.object({
      id: z.string().max(50),
      name: z.string().max(200),
      localName: z.string().max(200),
      price: z.string().regex(/^\$?\d+(\.\d{2})?$/),
      image: z.string().url().or(z.string().startsWith('/')),
      quantity: z.number().int().positive().max(100),
    });
    
    schema.parse(item);
    return true;
  } catch {
    return false;
  }
}

/**
 * SQL Injection prevention - escape SQL special characters
 */
export function escapeSql(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case "\0": return "\\0";
        case "\x08": return "\\b";
        case "\x09": return "\\t";
        case "\x1a": return "\\z";
        case "\n": return "\\n";
        case "\r": return "\\r";
        case "\"":
        case "'":
        case "\\":
        case "%":
          return "\\" + char;
        default:
          return char;
      }
    });
}

/**
 * NoSQL Injection prevention - remove MongoDB operators
 */
export function sanitizeNoSql(input: any): any {
  if (typeof input === 'string') {
    // Remove potential MongoDB operators
    return input.replace(/[$]/g, '');
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = Array.isArray(input) ? [] : {};
    
    for (const key in input) {
      // Skip keys that start with $ (MongoDB operators)
      if (key.startsWith('$')) {
        continue;
      }
      
      sanitized[key] = sanitizeNoSql(input[key]);
    }
    
    return sanitized;
  }
  
  return input;
}

/**
 * Validate file upload
 */
export function validateFileUpload(file: {
  name: string;
  type: string;
  size: number;
}, allowedTypes: string[], maxSize: number): boolean {
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed`);
  }
  
  // Check file size
  if (file.size > maxSize) {
    throw new Error(`File size exceeds maximum of ${maxSize / 1024 / 1024}MB`);
  }
  
  // Check for dangerous file extensions
  const dangerousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.ps1', '.vbs', '.js'];
  const fileName = file.name.toLowerCase();
  
  for (const ext of dangerousExtensions) {
    if (fileName.endsWith(ext)) {
      throw new Error('Dangerous file type detected');
    }
  }
  
  return true;
}