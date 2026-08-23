'use client';

import { useEffect } from 'react';
import { initAnalytics, trackEvent } from '@/lib/analytics';

interface AnalyticsProviderProps {
  gaMeasurementId?: string;
}

export default function AnalyticsProvider({ gaMeasurementId }: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize Firebase Analytics
    initAnalytics().then(() => {
      trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    });
  }, []);

  return null;
}
