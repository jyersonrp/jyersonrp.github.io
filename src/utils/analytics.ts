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
const BEARER_TOKEN_REGEX = /bearer\s+[a-zA-Z0-9._-]+/gi;
const FORBIDDEN_KEYS = new Set([
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
  'address'
]);

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
    .replace(/^[^a-z]+/, '') // GA4 event names must start with a letter
    .slice(0, 40);
  return cleaned || 'generic_event';
}

/**
 * Deeply sanitizes event parameters:
 * 1. Strips prototype pollution keys (__proto__, constructor, prototype)
 * 2. Filters out sensitive PII keys (email, password, token, etc.)
 * 3. Redacts embedded emails and auth tokens from string values
 * 4. Enforces strict length bounds (100 chars) on values
 * 5. Disallows non-primitive types (functions, objects, symbols)
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

    // Strip forbidden PII parameter keys
    if (FORBIDDEN_KEYS.has(keyLower)) {
      continue;
    }

    // Sanitize parameter key format (letters, numbers, underscore, max 40 chars)
    const safeKey = keyLower.replace(/[^a-z0-9_]/g, '_').slice(0, 40);
    if (!safeKey) continue;

    if (typeof rawValue === 'number' || typeof rawValue === 'boolean') {
      cleanParams[safeKey] = rawValue;
    } else if (typeof rawValue === 'string') {
      let val = rawValue
        .replace(/[\u0000-\u001F\u007F]/g, '') // remove control chars
        .replace(EMAIL_REGEX, '[REDACTED_EMAIL]')
        .replace(BEARER_TOKEN_REGEX, '[REDACTED_TOKEN]')
        .trim()
        .slice(0, 100);
      cleanParams[safeKey] = val;
    }
  }

  return cleanParams;
}

/**
 * Send custom telemetry event to Google Analytics 4 with automatic PII scrubbing
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const safeEvent = sanitizeEventName(eventName);
      const safeParams = sanitizeAnalyticsParams(params);
      window.gtag('event', safeEvent, safeParams);
    }
  } catch (err) {
    // Fail silently in development, sandboxed environments, or if blocked by ad-blocker
  }
};

/**
 * Track CV downloads across all entrypoints
 */
export const trackCvDownload = (source: string) => {
  trackEvent('download_cv', {
    event_category: 'engagement',
    event_label: source,
    file_name: 'CV_Yerson_Rodriguez.pdf'
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
