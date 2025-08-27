import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param dirty - The HTML string to sanitize
 * @param options - Optional DOMPurify configuration
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(dirty: string, options?: DOMPurify.Config): string {
  // Default configuration - allow only safe HTML elements and attributes
  const defaultConfig: DOMPurify.Config = {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'strong', 'em', 'b', 'i', 'u',
      'a', 'img',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id',
      'target', 'rel', 'width', 'height', 'style'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    FORCE_BODY: true,
    RETURN_TRUSTED_TYPE: false,
    SANITIZE_DOM: true,
    KEEP_CONTENT: true,
    ...options
  };

  // Additional security: Remove any javascript: protocol
  const clean = DOMPurify.sanitize(dirty, defaultConfig as any);
  
  // Extra layer: Remove any remaining dangerous patterns
  const cleanString = typeof clean === 'string' ? clean : String(clean);
  return cleanString
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

/**
 * Sanitize HTML for blog content with more permissive rules
 * @param content - The blog HTML content to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeBlogContent(content: string): string {
  return sanitizeHtml(content, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'strong', 'em', 'b', 'i', 'u', 'mark', 'small', 'del', 'ins', 'sub', 'sup',
      'a', 'img', 'figure', 'figcaption',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code', 'kbd', 'samp', 'var',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
      'div', 'span', 'section', 'article', 'aside', 'header', 'footer', 'nav',
      'abbr', 'address', 'cite', 'q', 'dfn', 'time'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id',
      'target', 'rel', 'width', 'height', 'style',
      'datetime', 'cite', 'lang', 'dir'
    ],
    // Allow only external links to open in new tabs
    ADD_ATTR: ['target', 'rel'],
    ALLOW_DATA_ATTR: false,
    FORCE_BODY: true
  } as any);
}

/**
 * Sanitize inline styles (for use in style attributes)
 * @param styles - The style string to sanitize
 * @returns Sanitized style string
 */
export function sanitizeStyles(styles: string): string {
  // Remove dangerous CSS properties and values
  const dangerousPatterns = [
    /javascript:/gi,
    /expression\s*\(/gi,
    /@import/gi,
    /behavior:/gi,
    /-moz-binding:/gi,
    /&#/g,
    /\/\*/g
  ];

  let clean = styles;
  dangerousPatterns.forEach(pattern => {
    clean = clean.replace(pattern, '');
  });

  return clean;
}