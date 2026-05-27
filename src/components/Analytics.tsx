import { useEffect } from 'react';

interface AnalyticsSettings {
  googleAnalyticsId?: string;
  microsoftClarityId?: string;
}

function getSettings(): AnalyticsSettings | null {
  try {
    const raw = localStorage.getItem('blcoof_settings');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function Analytics() {
  useEffect(() => {
    const settings = getSettings();

    // Google Analytics 4
    if (settings?.googleAnalyticsId) {
      const gtagId = settings.googleAnalyticsId;
      // Only inject once
      if (!document.querySelector(`script[src*="${gtagId}"]`)) {
        // gtag.js
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
        document.head.appendChild(script);

        // gtag config
        const inline = document.createElement('script');
        inline.textContent = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtagId}');
        `;
        document.head.appendChild(inline);
      }
    }

    // Microsoft Clarity
    if (settings?.microsoftClarityId) {
      const clarityId = settings.microsoftClarityId;
      if (!document.querySelector(`script[src*="clarity.ms"]`)) {
        const script = document.createElement('script');
        script.textContent = `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `;
        document.head.appendChild(script);
      }
    }
  }, []);

  return null;
}
