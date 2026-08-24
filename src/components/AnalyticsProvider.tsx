'use client';

import { useEffect } from 'react';
import { initAnalytics, trackEvent } from '@/lib/analytics';

export default function AnalyticsProvider() {
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
