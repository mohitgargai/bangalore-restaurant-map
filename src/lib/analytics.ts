import { getAnalytics, isSupported, logEvent, Analytics } from 'firebase/analytics';
import { getApps } from 'firebase/app';

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

let analyticsInstance: Analytics | null = null;

export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window === 'undefined') return null;
  if (analyticsInstance) return analyticsInstance;

  try {
    const supported = await isSupported();
    if (supported && getApps().length > 0) {
      analyticsInstance = getAnalytics(getApps()[0]);
      return analyticsInstance;
    }
  } catch (err) {
    console.debug('Analytics initialization notice:', err);
  }
  return null;
};

export const trackEvent = async (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;

  try {
    const analytics = await initAnalytics();
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
    // Also dispatch to window.gtag if present
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch (err) {
    console.debug(`Failed to track event ${eventName}:`, err);
  }
};

