/**
 * Server-Side Rate Limiting
 *
 * Simple in-memory rate limiter for server actions
 * For production, use Redis or a dedicated rate limiting service
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Server-side rate limiting
 * 
 * @param identifier - Unique identifier (IP, user ID, etc.)
 * @param maxRequests - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Rate limit result
 */
export function rateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // Clean up old records periodically
  if (rateLimitStore.size > 1000) {
    cleanupRateLimit();
  }

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
 * Get client identifier from request headers
 */
export function getClientIdentifier(headers: Headers): string {
  // Try to get IP from various headers (for production, use proper IP detection)
  const forwarded = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");
  const cfConnectingIp = headers.get("cf-connecting-ip");

  return (
    cfConnectingIp ||
    realIp ||
    forwarded?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/**
 * Clean up old rate limit records
 */
function cleanupRateLimit(maxAge: number = 3600000): void {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime + maxAge) {
      rateLimitStore.delete(key);
    }
  }
}

