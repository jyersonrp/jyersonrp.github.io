/**
 * Google Analytics 4 (GA4) Integration Helper
 * Measurement ID: G-41JM9W8845
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = 'G-41JM9W8845';

/**
 * Send custom telemetry event to Google Analytics 4
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch (err) {
    // Fail silently in development or if blocked by ad-blocker
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
export const trackContactInteraction = (type: 'email_copy' | 'whatsapp' | 'linkedin' | 'github') => {
  trackEvent('contact_interaction', {
    event_category: 'lead',
    contact_type: type
  });
};

/**
 * Track repository & project inspection
 */
export const trackCodeView = (repoName: string) => {
  trackEvent('view_code', {
    event_category: 'projects',
    repo_name: repoName
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
