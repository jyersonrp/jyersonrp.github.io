/**
 * Security & Defense-in-Depth Utilities
 * Provides input sanitization, RFC email validation, in-memory rate limiting,
 * email obfuscation against automated scraping bots, and secure window opener.
 */

// In-memory rate limiter store
const rateLimitStore = new Map<string, number[]>();

/**
 * Sanitizes user input string against XSS, injection vectors, and control characters.
 * Trims input and enforces maximum character bounds.
 * @param input Raw user input string
 * @param maxLength Maximum allowable length
 * @param allowMultiline Whether newline characters are permitted (false for headers/single-line fields)
 */
export function sanitizeInput(
  input: string,
  maxLength = 2000,
  allowMultiline = true
): string {
  if (typeof input !== 'string') return '';

  let sanitized = input
    // Remove null bytes and dangerous control characters
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '');

  // Strip CRLF for single-line inputs to prevent Email Header Injection
  if (!allowMultiline) {
    sanitized = sanitized.replace(/[\r\n]+/g, ' ');
  }

  // Multi-pass HTML and script tag stripping to prevent nested bypass vectors (e.g., <scr<script>ipt>)
  let previous: string;
  let iterations = 0;
  do {
    previous = sanitized;
    sanitized = sanitized
      .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
      .replace(/<\s*style[^>]*>[\s\S]*?<\s*\/\s*style\s*>/gi, '')
      .replace(/<\s*iframe[^>]*>[\s\S]*?<\s*\/\s*iframe\s*>/gi, '')
      .replace(/<\s*object[^>]*>[\s\S]*?<\s*\/\s*object\s*>/gi, '')
      .replace(/<\s*embed[^>]*>[\s\S]*?<\s*\/\s*embed\s*>/gi, '')
      .replace(/<\/?(?:[a-z][a-z0-9]*)\b[^>]*>/gi, '');
    iterations++;
  } while (sanitized !== previous && iterations < 5);

  // Neutralize dangerous pseudo-protocol URI schemes
  sanitized = sanitized
    .replace(/javascript\s*:/gi, 'blocked-scheme:')
    .replace(/vbscript\s*:/gi, 'blocked-scheme:')
    .replace(/data\s*:\s*text\/html/gi, 'blocked-scheme:')
    .trim();

  // Enforce boundary limit
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitizes search query input for command palette or filters.
 */
export function sanitizeQuery(query: string, maxLength = 100): string {
  if (typeof query !== 'string') return '';
  return query
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .slice(0, maxLength)
    .trim();
}

/**
 * Validates email format strictly using RFC-compliant pattern and length bounds.
 */
export function validateEmail(email: string): { isValid: boolean; message?: string } {
  const sanitized = email.trim();
  if (!sanitized) {
    return { isValid: false, message: 'Email is required' };
  }
  if (sanitized.length > 100) {
    return { isValid: false, message: 'Email address exceeds maximum length (100 characters)' };
  }
  // Standard RFC 5322 compliant regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(sanitized)) {
    return { isValid: false, message: 'Invalid email address format' };
  }
  return { isValid: true };
}

/**
 * In-memory sliding window rate limiter for client-side forms.
 * Prevents automated or accidental repeat spam.
 */
export function checkRateLimit(
  actionKey: string,
  maxAttempts = 3,
  windowMs = 30000
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const timestamps = rateLimitStore.get(actionKey) || [];

  // Evict timestamps outside current window
  const validTimestamps = timestamps.filter((time) => now - time < windowMs);

  if (validTimestamps.length >= maxAttempts) {
    const oldestTimestamp = validTimestamps[0];
    const retryAfterMs = windowMs - (now - oldestTimestamp);
    const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds
    };
  }

  // Record this attempt
  validTimestamps.push(now);
  rateLimitStore.set(actionKey, validTimestamps);

  return {
    allowed: true,
    remaining: maxAttempts - validTimestamps.length,
    retryAfterSeconds: 0
  };
}

/**
 * Resets rate limit for a specific action key (useful for test suites or resets).
 */
export function resetRateLimit(actionKey?: string): void {
  if (actionKey) {
    rateLimitStore.delete(actionKey);
  } else {
    rateLimitStore.clear();
  }
}

/**
 * Opens an external URL safely with noopener and noreferrer to neutralize reverse tabnabbing.
 * Validates protocol to prevent pseudo-protocol exploitation.
 */
export function safeOpenUrl(url: string): void {
  if (!url || typeof url !== 'string') return;
  const trimmed = url.trim();

  // Allow only secure http, https, mailto, tel, or wa.me
  const isAllowedScheme =
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:');

  if (!isAllowedScheme) {
    console.warn('Blocked unsafe URL navigation attempt:', trimmed);
    return;
  }

  window.open(trimmed, '_blank', 'noopener,noreferrer');
}

/**
 * Assembles email dynamically from char codes at runtime to prevent static bot scraping.
 * Obfuscates character representation completely so simple text regex scanners fail.
 */
const EMAIL_CHAR_CODES = [
  106, 121, 101, 114, 115, 111, 110, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109
];

export function getPublicEmail(): string {
  return EMAIL_CHAR_CODES.map((code) => String.fromCharCode(code)).join('');
}
