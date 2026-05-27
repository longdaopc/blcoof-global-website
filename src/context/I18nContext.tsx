import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, Translation } from '../types';
import { getTranslation, isRTL } from '../i18n';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translation;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: getTranslation('en'),
  isRtl: false,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('blcoof_lang');
    if (saved) return saved as Language;
    const browserLang = navigator.language.split('-')[0] as Language;
    const supported: Language[] = ['en', 'zh', 'ar', 'es', 'de', 'ja', 'ko', 'fr', 'ru', 'pt'];
    return supported.includes(browserLang) ? browserLang : 'en';
  });

  const t = getTranslation(lang);
  const isRtl = isRTL(lang);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('blcoof_lang', newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [lang, isRtl]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isRtl }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
