/**
 * Google Analytics 4 (GA4) Integration & Telemetry Hardening Helper
 * Measurement ID: G-41JM9W8845
 * Defense-in-depth: Strict PII sanitization, length bounds, prototype pollution guards,
 * and silent fallback on ad-blocker or offline execution.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = 'G-41JM9W8845';

// Regex patterns for detecting and redacting sensitive PII
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
const BEARER_TOKEN_REGEX = /bearer\s+[a-zA-Z0-9._~+/-]+=*/gi;
const RAW_JWT_REGEX = /\beyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]+\b/g;
const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
const CREDIT_CARD_REGEX = /\b(?:\d{4}[- ]?){3}\d{4}\b/g;
const FILE_PATH_REGEX = /(?:[a-zA-Z]:\\|\/(?:Users|home|root)\/)[^\s"']+/g;

// Tokens that flag a parameter key as sensitive PII when found as word or delimited token
const FORBIDDEN_KEY_TOKENS = [
  'email',
  'mail',
  'password',
  'pass',
  'token',
  'secret',
  'auth',
  'authorization',
  'ssn',
  'phone',
  'card',
  'credit_card',
  'cvv',
  'address',
  'jwt',
  'cookie',
  'session'
];

const FORBIDDEN_KEY_PATTERN = new RegExp(
  `(^|_|-)(${FORBIDDEN_KEY_TOKENS.join('|')})($|_|-)`,
  'i'
);

/**
 * Sanitizes an event name to conform strictly with GA4 alphanumeric + underscore guidelines
 * and prevents prototype pollution or formatting attacks.
 */
export function sanitizeEventName(name: string): string {
  if (typeof name !== 'string') return 'generic_event';
  const cleaned = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/^[^a-z]+/, '') // GA4 event names must start with an alphabetic letter
    .slice(0, 40);
  return cleaned || 'generic_event';
}

/**
 * Deeply sanitizes event parameters:
 * 1. Strips prototype pollution keys (__proto__, constructor, prototype)
 * 2. Filters out sensitive PII keys (exact or compound like user_email, auth_token, phone_number)
 * 3. Enforces GA4 parameter name guidelines (starts with letter, alphanumeric + underscore, max 40 chars)
 * 4. Redacts embedded emails, auth/JWT tokens, phone numbers, and local file paths from string values
 * 5. Rejects non-finite numbers (NaN, Infinity)
 * 6. Enforces strict length bounds (100 chars) on values
 * 7. Disallows non-primitive types (functions, objects, symbols)
 */
export function sanitizeAnalyticsParams(params: Record<string, any> = {}): Record<string, string | number | boolean> {
  if (!params || typeof params !== 'object' || Array.isArray(params)) {
    return {};
  }

  const cleanParams: Record<string, string | number | boolean> = {};

  for (const [rawKey, rawValue] of Object.entries(params)) {
    // Prototype pollution prevention
    if (
      rawKey === '__proto__' ||
      rawKey === 'constructor' ||
      rawKey === 'prototype'
    ) {
      continue;
    }

    const keyLower = rawKey.toLowerCase().trim();

    // Strip forbidden PII parameter keys (both exact matches and compound names like user_email or auth_token)
    if (FORBIDDEN_KEY_PATTERN.test(keyLower)) {
      continue;
    }

    // Sanitize parameter key format: GA4 requires starting with an alphabetic letter, max 40 chars
    const safeKey = keyLower
      .replace(/[^a-z0-9_]/g, '_')
      .replace(/^[^a-z]+/, '')
      .slice(0, 40);
    if (!safeKey) continue;

    if (typeof rawValue === 'number') {
      if (Number.isFinite(rawValue)) {
        cleanParams[safeKey] = rawValue;
      }
    } else if (typeof rawValue === 'boolean') {
      cleanParams[safeKey] = rawValue;
    } else if (typeof rawValue === 'string') {
      let val = rawValue
        .replace(/[\u0000-\u001F\u007F]/g, '') // remove control chars
        .replace(EMAIL_REGEX, '[REDACTED_EMAIL]')
        .replace(BEARER_TOKEN_REGEX, '[REDACTED_TOKEN]')
        .replace(RAW_JWT_REGEX, '[REDACTED_TOKEN]')
        .replace(PHONE_REGEX, '[REDACTED_PHONE]')
        .replace(CREDIT_CARD_REGEX, '[REDACTED_CARD]')
        .replace(FILE_PATH_REGEX, '[REDACTED_PATH]')
        .trim()
        .slice(0, 100);
      cleanParams[safeKey] = val;
    }
  }

  return cleanParams;
}

/**
 * Send custom telemetry event to Google Analytics 4 with automatic PII scrubbing
 * and resilient buffering in window.dataLayer if gtag is not yet initialized.
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  try {
    if (typeof window !== 'undefined') {
      const safeEvent = sanitizeEventName(eventName);
      const safeParams = sanitizeAnalyticsParams(params);
      if (typeof window.gtag === 'function') {
        window.gtag('event', safeEvent, safeParams);
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(['event', safeEvent, safeParams]);
      }
    }
  } catch (err) {
    // Fail silently in development, sandboxed environments, or if blocked by ad-blocker
  }
};

/**
 * Track CV downloads across all entrypoints
 */
export const trackCvDownload = (source: string, fileName = 'CV_Yerson_Rodriguez.pdf') => {
  trackEvent('download_cv', {
    event_category: 'engagement',
    event_label: source,
    file_name: fileName
  });
};

/**
 * Track recruitment & contact interactions
 */
export const trackContactInteraction = (type: 'email_copy' | 'email_client' | 'whatsapp' | 'linkedin' | 'github') => {
  trackEvent('contact_interaction', {
    event_category: 'lead',
    contact_type: type
  });
};

/**
 * Track repository & project code inspection
 */
export const trackCodeView = (repoName: string) => {
  trackEvent('view_code', {
    event_category: 'projects',
    repo_name: repoName
  });
};

/**
 * Track project tab switches (mockup, overview, flow, code)
 */
export const trackProjectTab = (projectId: string, tab: string) => {
  trackEvent('project_tab_switch', {
    event_category: 'projects',
    project_id: projectId,
    tab
  });
};

/**
 * Track UI personalization
 */
export const trackPreferences = (type: 'language' | 'theme' | 'palette', value: string) => {
  trackEvent('user_preference', {
    preference_type: type,
    value
  });
};

/**
 * Track runtime exceptions safely
 */
export const trackException = (description: string, fatal = false) => {
  trackEvent('exception', {
    description: description.slice(0, 100),
    fatal
  });
};
