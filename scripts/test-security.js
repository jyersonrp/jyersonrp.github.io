import assert from 'node:assert';

// Mirroring the exact functions from src/utils/security.ts to run under standard Node.js
const rateLimitStore = new Map();

function sanitizeInput(input, maxLength = 2000) {
  if (typeof input !== 'string') return '';

  let sanitized = input
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
    .replace(/<\s*style[^>]*>[\s\S]*?<\s*\/\s*style\s*>/gi, '')
    .replace(/<\s*iframe[^>]*>[\s\S]*?<\s*\/\s*iframe\s*>/gi, '')
    .replace(/<\s*object[^>]*>[\s\S]*?<\s*\/\s*object\s*>/gi, '')
    .replace(/<\s*embed[^>]*>[\s\S]*?<\s*\/\s*embed\s*>/gi, '')
    .replace(/<\/?(?:[a-z][a-z0-9]*)\b[^>]*>/gi, '')
    .replace(/javascript\s*:/gi, 'blocked-scheme:')
    .replace(/vbscript\s*:/gi, 'blocked-scheme:')
    .replace(/data\s*:\s*text\/html/gi, 'blocked-scheme:')
    .trim();

  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
}

function sanitizeQuery(query, maxLength = 100) {
  if (typeof query !== 'string') return '';
  return query
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .slice(0, maxLength)
    .trim();
}

function validateEmail(email) {
  const sanitized = email.trim();
  if (!sanitized) {
    return { isValid: false, message: 'Email is required' };
  }
  if (sanitized.length > 100) {
    return { isValid: false, message: 'Email address exceeds maximum length (100 characters)' };
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(sanitized)) {
    return { isValid: false, message: 'Invalid email address format' };
  }
  return { isValid: true };
}

function checkRateLimit(actionKey, maxAttempts = 3, windowMs = 30000) {
  const now = Date.now();
  const timestamps = rateLimitStore.get(actionKey) || [];
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

  validTimestamps.push(now);
  rateLimitStore.set(actionKey, validTimestamps);

  return {
    allowed: true,
    remaining: maxAttempts - validTimestamps.length,
    retryAfterSeconds: 0
  };
}

const EMAIL_PARTS = ['jyerson', '@', 'gmail', '.com'];
function getPublicEmail() {
  return EMAIL_PARTS.join('');
}

// -----------------------------------------------------------------------------
// Test Suite Execution
// -----------------------------------------------------------------------------
console.log('--- Starting Portfolio Security Verification Suite ---');

// 1. Test XSS / Script injection stripping
console.log('[Test 1] Testing XSS script and iframe neutralization...');
const maliciousPayload = '<script>alert("XSS")</script>Hello <iframe src="evil.com"></iframe>World!';
const cleanPayload = sanitizeInput(maliciousPayload, 80);
assert.strictEqual(cleanPayload, 'Hello World!', 'Should strip script and iframe tags completely');
assert.ok(!cleanPayload.includes('<script>'), 'Script tag must not survive');
assert.ok(!cleanPayload.includes('alert'), 'Alert payload must not survive');
console.log('✓ XSS neutralization passed:', cleanPayload);

// 2. Test pseudo-protocol neutralization
console.log('[Test 2] Testing javascript: URI scheme blocking...');
const evilLink = 'javascript:alert(1)';
const safeLink = sanitizeInput(evilLink);
assert.strictEqual(safeLink, 'blocked-scheme:alert(1)');
console.log('✓ Protocol neutralization passed:', safeLink);

// 3. Test null-byte and control character removal
console.log('[Test 3] Testing null-byte and control characters...');
const poisonedString = 'Hello\u0000World\u0007!';
const sanitizedString = sanitizeInput(poisonedString);
assert.strictEqual(sanitizedString, 'HelloWorld!');
console.log('✓ Poisoned string sanitized:', sanitizedString);

// 4. Test max length truncation
console.log('[Test 4] Testing boundary truncation...');
const longInput = 'A'.repeat(500);
const cappedInput = sanitizeInput(longInput, 80);
assert.strictEqual(cappedInput.length, 80);
console.log('✓ Truncation passed (length 80)');

// 5. Test RFC Email Validation
console.log('[Test 5] Testing RFC Email validation...');
assert.strictEqual(validateEmail('jyerson@gmail.com').isValid, true);
assert.strictEqual(validateEmail('test.user+tag@company.co.uk').isValid, true);
assert.strictEqual(validateEmail('invalid-email').isValid, false);
assert.strictEqual(validateEmail('missing@domain').isValid, false);
assert.strictEqual(validateEmail('@nodomain.com').isValid, false);
assert.strictEqual(validateEmail('').isValid, false);
console.log('✓ Email RFC validation tests passed');

// 6. Test In-memory Rate Limiting
console.log('[Test 6] Testing in-memory rate limiting...');
const key = 'test_action_ratelimit';
const attempt1 = checkRateLimit(key, 2, 5000);
assert.strictEqual(attempt1.allowed, true);
assert.strictEqual(attempt1.remaining, 1);

const attempt2 = checkRateLimit(key, 2, 5000);
assert.strictEqual(attempt2.allowed, true);
assert.strictEqual(attempt2.remaining, 0);

const attempt3 = checkRateLimit(key, 2, 5000);
assert.strictEqual(attempt3.allowed, false, '3rd attempt must be blocked');
assert.ok(attempt3.retryAfterSeconds > 0);
console.log('✓ Rate limiting correctly blocked excess attempts:', attempt3);

// 7. Test Email Obfuscation
console.log('[Test 7] Testing dynamic email assembly...');
assert.strictEqual(getPublicEmail(), 'jyerson@gmail.com');
console.log('✓ Email assembly matches official contact:', getPublicEmail());

console.log('--- ALL SECURITY TESTS PASSED SUCCESSFULLY (7/7) ---');
