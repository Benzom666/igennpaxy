// Google Analytics 4 + Meta Pixel Analytics Utilities

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// GA4 Event Types
export type GAEvent =
  | "page_view"
  | "scroll"
  | "click"
  | "form_submit"
  | "form_start"
  | "contact"
  | "generate_lead"
  | "begin_checkout"
  | "purchase"
  | "view_item"
  | "select_content"
  | "share";

// Meta Pixel Event Types
export type MetaEvent =
  | "PageView"
  | "Lead"
  | "Contact"
  | "SubmitApplication"
  | "Schedule"
  | "ViewContent"
  | "InitiateCheckout"
  | "Purchase";

// Analytics Configuration
export const analyticsConfig = {
  ga4: {
    trackingId: process.env.NEXT_PUBLIC_GA4_ID || "GA_MEASUREMENT_ID",
  },
  meta: {
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "META_PIXEL_ID",
  },
};

// Track GA4 Event
export function trackGA4Event(
  eventName: GAEvent,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      ...params,
      send_to: analyticsConfig.ga4.trackingId,
    });
  }
}

// Track Meta Pixel Event
export function trackMetaEvent(
  eventName: MetaEvent,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
}

// Track both GA4 and Meta events
export function trackEvent(
  gaEvent: GAEvent,
  metaEvent: MetaEvent,
  params?: Record<string, string | number | boolean | undefined>
) {
  trackGA4Event(gaEvent, params);
  trackMetaEvent(metaEvent, params);
}

// Scroll depth tracking
export function trackScrollDepth() {
  const thresholds = [25, 50, 75, 90];
  const tracked = new Set<number>();

  const checkScroll = () => {
    const scrollPercent =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    thresholds.forEach((threshold) => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackGA4Event("scroll", {
          percent_scrolled: threshold,
        });
      }
    });
  };

  window.addEventListener("scroll", checkScroll, { passive: true });
  return () => window.removeEventListener("scroll", checkScroll);
}

// Form tracking
export function trackFormStart(formName: string) {
  trackEvent("form_start", "InitiateCheckout", {
    form_name: formName,
  });
}

export function trackFormSubmit(formName: string, value?: number) {
  trackEvent("form_submit", "Lead", {
    form_name: formName,
    value: value || 0,
    currency: "USD",
  });
}

// CTA tracking
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent("click", "ViewContent", {
    cta_name: ctaName,
    location: location,
  });
}

// Exit intent tracking
export function trackExitIntent() {
  trackGA4Event("generate_lead", {
    event_category: "exit_intent",
  });
}

// Time on page tracking
export function trackTimeOnPage() {
  const intervals = [30, 60, 120, 180]; // seconds
  
  intervals.forEach((seconds) => {
    setTimeout(() => {
      trackGA4Event("select_content", {
        content_type: "time_on_page",
        value: seconds,
      });
    }, seconds * 1000);
  });
}

// Analytics scripts to be included in layout
export function getAnalyticsScripts() {
  return {
    ga4: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${analyticsConfig.ga4.trackingId}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      });
    `,
    meta: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${analyticsConfig.meta.pixelId}');
      fbq('track', 'PageView');
    `,
  };
}
