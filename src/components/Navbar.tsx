import { useState, useEffect } from 'react';
import { useI18n } from '../context/I18nContext';
import { languageNames } from '../i18n';
import type { Language } from '../types';

const NAV_SECTIONS = ['home', 'products', 'oem', 'about', 'blog', 'contact'] as const;

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  const langs: Language[] = ['en', 'zh', 'ar', 'es', 'de', 'ja', 'ko', 'fr', 'ru', 'pt'];

  // Read announcement banner from admin settings
  const [bannerText, setBannerText] = useState('');
  const [bannerVisible, setBannerVisible] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem('blcoof_settings');
      if (raw) {
        const s = JSON.parse(raw);
        if (s.bannerVisible && s.bannerText) {
          setBannerText(s.bannerText);
          setBannerVisible(true);
        }
      }
    } catch { /* ignore */ }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      {/* Announcement Banner */}
      {bannerVisible && bannerText && (
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center py-2 px-4 text-xs sm:text-sm font-medium">
          <span>{bannerText}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 group"
            aria-label="BLCOOF Home"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-blue-300 transition-shadow">
              <span className="text-white font-bold text-sm">BL</span>
            </div>
            <span className={`font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              BLCOOF
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => scrollTo('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
            >
              {t.nav.home}
            </button>

            {/* Products Dropdown */}
            <div className="relative" onMouseEnter={() => setProductOpen(true)} onMouseLeave={() => setProductOpen(false)}>
              <button
                onClick={() => scrollTo('products')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
              >
                {t.nav.products}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {productOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                  {(['aio', 'minipc', 'monitor', 'desktop'] as const).map((k) => (
                    <button
                      key={k}
                      onClick={() => scrollTo('products')}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      {t.nav.products_sub[k]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {(['oem', 'about', 'blog', 'contact'] as const).map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
              >
                {t.nav[key]}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative hidden lg:block" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white/80 hover:bg-white/10'}`}
                aria-label="Select Language"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                <span className="uppercase text-xs font-bold">{lang}</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 max-h-72 overflow-auto">
                  {langs.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${l === lang ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {languageNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden sm:flex btn-primary text-sm py-2 px-4"
            >
              {t.nav.getQuote}
            </button>

            {/* Mobile menu toggle */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {NAV_SECTIONS.map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(key)}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors"
              >
                {t.nav[key]}
              </button>
            ))}
            <div className="pt-3 border-t border-gray-100 mt-2">
              <p className="px-4 text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Language</p>
              <div className="flex flex-wrap gap-1 px-2">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setMobileOpen(false); }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${l === lang ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => scrollTo('contact')}
              className="w-full btn-primary justify-center mt-3"
            >
              {t.nav.getQuote}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
