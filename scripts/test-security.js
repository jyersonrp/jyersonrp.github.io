import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

// Import directly from the real TypeScript source code
import {
  sanitizeInput,
  sanitizeQuery,
  validateEmail,
  checkRateLimit,
  resetRateLimit,
  getPublicEmail,
  isValidSafeUrl
} from '../src/utils/security.ts';

console.log('--- Starting Rigorous Portfolio Security & Hardening Test Suite ---');

// 1. Test XSS script and iframe neutralization
console.log('[Test 1] Testing XSS script and tag neutralization...');
const maliciousPayload = '<script>alert("XSS")</script>Hello <iframe src="evil.com"></iframe>World!';
const cleanPayload = sanitizeInput(maliciousPayload, 80);
assert.strictEqual(cleanPayload, 'Hello World!', 'Should strip script and iframe tags completely');
assert.ok(!cleanPayload.includes('<script>'), 'Script tag must not survive');
assert.ok(!cleanPayload.includes('alert'), 'Alert payload must not survive');
console.log('✓ XSS neutralization passed:', cleanPayload);

// 2. Test nested tag evasion bypass
console.log('[Test 2] Testing nested tag evasion bypass...');
const nestedPayload = '<scr<script>ipt>alert(1)</script>SafeText';
const cleanNested = sanitizeInput(nestedPayload);
assert.ok(!cleanNested.includes('<script>'), 'Nested script tag must not reconstruct');
assert.ok(!cleanNested.includes('alert(1)'), 'Alert payload in nested tag must not survive');
console.log('✓ Nested evasion neutralization passed:', cleanNested);

// 3. Test pseudo-protocol neutralization
console.log('[Test 3] Testing dangerous URI scheme blocking...');
const evilLink = 'javascript:alert(1)';
const safeLink = sanitizeInput(evilLink);
assert.strictEqual(safeLink, 'blocked-scheme:alert(1)');
const evilVb = 'vbscript:msgbox(1)';
assert.strictEqual(sanitizeInput(evilVb), 'blocked-scheme:msgbox(1)');
console.log('✓ Protocol neutralization passed:', safeLink);

// 4. Test null-byte and control character removal
console.log('[Test 4] Testing null-byte and control characters...');
const poisonedString = 'Hello\u0000World\u0007!';
const sanitizedString = sanitizeInput(poisonedString);
assert.strictEqual(sanitizedString, 'HelloWorld!');
console.log('✓ Poisoned string sanitized:', sanitizedString);

// 5. Test CRLF / Email Header Injection prevention
console.log('[Test 5] Testing CRLF / Email Header Injection prevention...');
const headerInjectionAttempt = 'CEO\r\nBcc: evil@attacker.com\r\nSubject: Pwned';
const sanitizedSingleLine = sanitizeInput(headerInjectionAttempt, 80, false);
assert.ok(!sanitizedSingleLine.includes('\r'), 'CR must be stripped for single-line inputs');
assert.ok(!sanitizedSingleLine.includes('\n'), 'LF must be stripped for single-line inputs');
assert.strictEqual(sanitizedSingleLine, 'CEO Bcc: evil@attacker.com Subject: Pwned');

// Verify multiline is preserved when explicitly allowed (for message bodies)
const multilineValid = 'Line 1\nLine 2\r\nLine 3';
const sanitizedMultiline = sanitizeInput(multilineValid, 200, true);
assert.ok(sanitizedMultiline.includes('\n'), 'Newline must be preserved for message body');
console.log('✓ CRLF injection protection passed');

// 6. Test boundary length truncation
console.log('[Test 6] Testing boundary truncation...');
const longInput = 'X'.repeat(500);
const cappedInput = sanitizeInput(longInput, 80);
assert.strictEqual(cappedInput.length, 80);
console.log('✓ Truncation passed (length 80)');

// 7. Test Query Sanitization
console.log('[Test 7] Testing search query sanitization...');
const rawQuery = '  <script>python 3.11</script>  ';
const cleanQuery = sanitizeQuery(rawQuery, 50);
assert.strictEqual(cleanQuery, 'scriptpython 3.11/script');
assert.ok(!cleanQuery.includes('<'));
assert.ok(!cleanQuery.includes('>'));
console.log('✓ Search query sanitization passed:', cleanQuery);

// 8. Test RFC Email Validation
console.log('[Test 8] Testing RFC Email validation...');
assert.strictEqual(validateEmail('jyerson@gmail.com').isValid, true);
assert.strictEqual(validateEmail('test.user+tag@company.co.uk').isValid, true);
assert.strictEqual(validateEmail('invalid-email').isValid, false);
assert.strictEqual(validateEmail('missing@domain').isValid, false);
assert.strictEqual(validateEmail('@nodomain.com').isValid, false);
assert.strictEqual(validateEmail('').isValid, false);
assert.strictEqual(validateEmail('a'.repeat(95) + '@gmail.com').isValid, false, 'Should reject emails > 100 chars');
console.log('✓ Email RFC validation tests passed');

// 9. Test In-memory Rate Limiting & Reset
console.log('[Test 9] Testing in-memory sliding window rate limiting...');
const testKey = 'test_action_suite';
resetRateLimit(testKey);

const attempt1 = checkRateLimit(testKey, 2, 5000);
assert.strictEqual(attempt1.allowed, true);
assert.strictEqual(attempt1.remaining, 1);

const attempt2 = checkRateLimit(testKey, 2, 5000);
assert.strictEqual(attempt2.allowed, true);
assert.strictEqual(attempt2.remaining, 0);

const attempt3 = checkRateLimit(testKey, 2, 5000);
assert.strictEqual(attempt3.allowed, false, '3rd attempt must be blocked');
assert.ok(attempt3.retryAfterSeconds > 0);

// Reset rate limit
resetRateLimit(testKey);
const attemptAfterReset = checkRateLimit(testKey, 2, 5000);
assert.strictEqual(attemptAfterReset.allowed, true, 'Rate limit should allow submission after reset');
console.log('✓ Rate limiting and reset passed');

// 10. Test Dynamic Email Assembly & Anti-Scraping Obfuscation
console.log('[Test 10] Testing dynamic email assembly and anti-scraper obfuscation...');
assert.strictEqual(getPublicEmail(), 'jyerson@gmail.com');

// Verify that the security source file does NOT contain the raw email string literal
const securitySource = fs.readFileSync(path.resolve('src/utils/security.ts'), 'utf8');
assert.ok(
  !securitySource.includes("'jyerson@gmail.com'") && !securitySource.includes('"jyerson@gmail.com"'),
  'security.ts must not contain raw email string literal'
);
console.log('✓ Email assembly and source obfuscation confirmed');

// 11. Test URL Protocol Validation & Safe URL Opener
console.log('[Test 11] Testing URL protocol validation and safe external navigation...');
assert.strictEqual(isValidSafeUrl('https://github.com/jyersonrp'), true, 'HTTPS URL should be allowed');
assert.strictEqual(isValidSafeUrl('http://localhost:3000'), true, 'HTTP URL should be allowed');
assert.strictEqual(isValidSafeUrl('mailto:jyerson@gmail.com'), true, 'Mailto URL should be allowed');
assert.strictEqual(isValidSafeUrl('tel:+1234567890'), true, 'Tel URL should be allowed');
assert.strictEqual(isValidSafeUrl('javascript:alert(1)'), false, 'javascript: must be rejected');
assert.strictEqual(isValidSafeUrl('data:text/html;base64,evil'), false, 'data: must be rejected');
assert.strictEqual(isValidSafeUrl('vbscript:msgbox(1)'), false, 'vbscript: must be rejected');
assert.strictEqual(isValidSafeUrl('https://evil.com\u0000admin'), false, 'Null byte injection must be rejected');
assert.strictEqual(isValidSafeUrl('https://evil.com\r\nX-Injected: 1'), false, 'CRLF injection in URL must be rejected');
assert.strictEqual(isValidSafeUrl('/local/path'), false, 'Relative path without scheme must be rejected');
assert.strictEqual(isValidSafeUrl(''), false, 'Empty URL must be rejected');
console.log('✓ Safe URL protocol validation confirmed');

// 12. Test Inline Event Handler & Unclosed Tag Neutralization
console.log('[Test 12] Testing inline event handler & unclosed tag neutralization...');
const handlerPayload = 'test onclick=alert(1) onmouseover="evil()" onload=pwn()';
const cleanHandler = sanitizeInput(handlerPayload);
assert.ok(!cleanHandler.includes('onclick='), 'onclick must be neutralized');
assert.ok(!cleanHandler.includes('onmouseover='), 'onmouseover must be neutralized');
assert.ok(!cleanHandler.includes('onload='), 'onload must be neutralized');

const unclosedTagPayload = '<img src=x onerror=alert(1)';
const cleanUnclosed = sanitizeInput(unclosedTagPayload);
assert.ok(!cleanUnclosed.includes('onerror='), 'onerror must be neutralized');
assert.ok(!cleanUnclosed.includes('<img'), 'Dangling unclosed tag must be stripped');
console.log('✓ Event handler & unclosed tag neutralization confirmed');

// 13. Test Static Scan: All target="_blank" links must include rel="noopener noreferrer"
console.log('[Test 13] Scanning codebase for external link tabnabbing vulnerabilities...');
function findFiles(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        results = results.concat(findFiles(filePath, ext));
      }
    } else if (file.endsWith(ext)) {
      results.push(filePath);
    }
  }
  return results;
}

const tsxFiles = findFiles(path.resolve('src'), '.tsx');
const allCheckedFiles = [...tsxFiles, path.resolve('index.html')];
let auditedLinksCount = 0;

for (const filePath of allCheckedFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Match any anchor tag with target="_blank"
  const anchorRegex = /<a\b[^>]*target=["']_blank["'][^>]*>/gi;
  let match;
  while ((match = anchorRegex.exec(content)) !== null) {
    auditedLinksCount++;
    const tag = match[0];
    assert.ok(
      tag.includes('rel="noopener noreferrer"') || tag.includes("rel='noopener noreferrer'"),
      `Link in ${path.relative('.', filePath)} must have rel="noopener noreferrer": ${tag}`
    );
  }
}
assert.ok(auditedLinksCount > 0, 'Should audit at least 1 external target="_blank" link');
console.log(`✓ External link security scan passed: ${auditedLinksCount} links verified secure (no tabnabbing)`);

// 14. Test Content Security Policy (CSP) Directives in index.html
console.log('[Test 14] Verifying Content Security Policy directives in index.html...');
const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf8');
const cspMatch = indexHtml.match(/<meta\s+http-equiv=["']Content-Security-Policy["']\s+content="([^"]*)"/i);
assert.ok(cspMatch, 'index.html must define Content-Security-Policy meta tag');
const csp = cspMatch[1];
assert.ok(csp.includes("default-src 'self'"), "CSP must include default-src 'self'");
assert.ok(csp.includes("object-src 'none'"), "CSP must include object-src 'none'");
assert.ok(csp.includes("base-uri 'self'"), "CSP must include base-uri 'self'");
assert.ok(csp.includes("worker-src 'self' blob:"), "CSP must include worker-src 'self' blob:");
assert.ok(csp.includes("form-action 'self' mailto:"), "CSP must include form-action restriction");
console.log('✓ Content Security Policy directives verified');

// 15. Test Permissions Policy in index.html
console.log('[Test 15] Verifying Permissions-Policy directives in index.html...');
const permMatch = indexHtml.match(/<meta\s+http-equiv=["']Permissions-Policy["']\s+content=["'](.*?)["']/i);
assert.ok(permMatch, 'index.html must define Permissions-Policy meta tag');
const perm = permMatch[1];
assert.ok(perm.includes('camera=()'), 'Permissions-Policy must disable camera');
assert.ok(perm.includes('microphone=()'), 'Permissions-Policy must disable microphone');
assert.ok(perm.includes('geolocation=()'), 'Permissions-Policy must disable geolocation');
assert.ok(perm.includes('display-capture=()'), 'Permissions-Policy must disable display-capture');
console.log('✓ Permissions-Policy directives verified');

console.log('--- ALL RIGOROUS SECURITY TESTS PASSED SUCCESSFULLY (15/15) ---');

