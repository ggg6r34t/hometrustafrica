/**
 * Security Utilities
 *
 * Input sanitization, validation, and security helpers
 */

/**
 * Sanitize string input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") {
    return "";
  }

  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, "") // Remove < and >
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim();
}

/**
 * Sanitize HTML content (for rich text areas)
 */
export function sanitizeHTML(html: string): string {
  if (typeof html !== "string") {
    return "";
  }

  // Basic HTML sanitization - in production, use a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate phone number format (international)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") {
    return false;
  }

  // Allow international format: +1234567890, (123) 456-7890, etc.
  const phoneRegex =
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * Validate and sanitize form data
 */
export interface SanitizedFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  isValid: boolean;
  errors: string[];
}

export function sanitizeFormData(data: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}): SanitizedFormData {
  const errors: string[] = [];
  let isValid = true;

  const name = sanitizeInput(data.name || "");
  const email = sanitizeInput(data.email || "");
  const phone = sanitizeInput(data.phone || "");
  const message = sanitizeInput(data.message || "");

  // Validate name
  if (!name || name.length < 2) {
    errors.push("Name must be at least 2 characters");
    isValid = false;
  }
  if (name.length > 100) {
    errors.push("Name must be less than 100 characters");
    isValid = false;
  }

  // Validate email
  if (!email) {
    errors.push("Email is required");
    isValid = false;
  } else if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address");
    isValid = false;
  }

  // Validate phone (optional but if provided, must be valid)
  if (phone && !isValidPhone(phone)) {
    errors.push("Please enter a valid phone number");
    isValid = false;
  }

  // Validate message
  if (!message || message.length < 10) {
    errors.push("Message must be at least 10 characters");
    isValid = false;
  }
  if (message.length > 5000) {
    errors.push("Message must be less than 5000 characters");
    isValid = false;
  }

  return {
    name,
    email,
    phone,
    message,
    isValid,
    errors,
  };
}

/**
 * Rate limiting helper (client-side check)
 * Note: Real rate limiting should be implemented server-side
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    // Create new record
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: resetTime,
    };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetTime,
    };
  }

  // Increment count
  record.count++;
  rateLimitStore.set(identifier, record);

  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetAt: record.resetTime,
  };
}

/**
 * Clean up old rate limit records (run periodically)
 */
export function cleanupRateLimit(maxAge: number = 3600000): void {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime + maxAge) {
      rateLimitStore.delete(key);
    }
  }
}

