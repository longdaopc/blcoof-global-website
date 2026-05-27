import { useI18n } from '../context/I18nContext';
import type { Language } from '../types';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  lang?: string;
  ogImage?: string;
}

const ALL_LANGUAGES: Language[] = ['en', 'zh', 'ar', 'es', 'de', 'ja', 'ko', 'fr', 'ru', 'pt'];

const BASE_URL = 'https://www.blcoof.com';
const SITE_NAME = 'BLCOOF';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const defaultTitle = 'BLCOOF - Professional Computer Hardware Manufacturer | AIO PC, Mini PC, Monitor OEM/ODM';
const defaultDesc = 'BLCOOF is a China-based professional computer hardware manufacturer specializing in All-in-One PCs, Mini PCs, Commercial Monitors, and Desktop Computers. Full OEM/ODM customization services for global brands.';
const defaultKw = 'BLCOOF, AIO PC manufacturer, Mini PC OEM, commercial monitor supplier, desktop computer ODM, China computer hardware factory, OEM computer manufacturer China';

function setMeta(name: string, content: string, isOg = false) {
  const attr = isOg ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, extra: Record<string, string> = {}) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
}

function removeHreflangLinks() {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
}

function injectHreflangTags() {
  removeHreflangLinks();
  ALL_LANGUAGES.forEach(langCode => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', langCode);
    link.setAttribute('href', `${BASE_URL}/?lang=${langCode}`);
    document.head.appendChild(link);
  });
  // x-default
  const xd = document.createElement('link');
  xd.setAttribute('rel', 'alternate');
  xd.setAttribute('hreflang', 'x-default');
  xd.setAttribute('href', BASE_URL);
  document.head.appendChild(xd);
}

function injectJsonLD() {
  // Remove existing JSON-LD
  document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BLCOOF Technology Co., Ltd.',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description: defaultDesc,
    foundingDate: '2008',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['English', 'Chinese', 'Arabic', 'Spanish', 'German', 'Japanese', 'Korean', 'French', 'Russian', 'Portuguese'],
    },
    sameAs: [],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      'target': `${BASE_URL}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  [orgSchema, webSiteSchema].forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export default function SEOHead({ title, description, keywords, canonical, lang, ogImage }: SEOHeadProps) {
  const { lang: currentLang } = useI18n();
  const activeLang = lang || currentLang;

  if (typeof document !== 'undefined') {
    const pageTitle = title || defaultTitle;
    const pageDesc = description || defaultDesc;
    const pageKw = keywords || defaultKw;
    const pageUrl = canonical || BASE_URL;
    const ogImg = ogImage || DEFAULT_OG_IMAGE;

    document.title = pageTitle;

    // Basic meta
    setMeta('description', pageDesc);
    setMeta('keywords', pageKw);
    setMeta('robots', 'index, follow');

    // Open Graph
    setMeta('og:title', pageTitle, true);
    setMeta('og:description', pageDesc, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', pageUrl, true);
    setMeta('og:image', ogImg, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:locale', activeLang, true);
    setMeta('og:site_name', SITE_NAME, true);

    // Twitter Cards
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', pageTitle);
    setMeta('twitter:description', pageDesc);
    setMeta('twitter:image', ogImg);

    // Canonical
    setLink('canonical', pageUrl);

    // Hreflang
    injectHreflangTags();

    // Structured Data
    injectJsonLD();
  }

  return null;
}
