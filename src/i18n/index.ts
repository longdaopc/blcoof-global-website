import type { Language, Translation } from '../types';
import en from './en';
import zh from './zh';
import ar from './ar';
import es from './es';
import ru from './ru';
import pt from './pt';

// Lazy-loaded partial translations for DE, JA, KO, FR (reuse EN structure with key terms translated)
const de: Translation = {
  ...en,
  nav: { ...en.nav, home: 'Startseite', products: 'Produkte', oem: 'OEM / ODM', about: 'Über uns', blog: 'Blog', contact: 'Kontakt', getQuote: 'Angebot anfordern', products_sub: { aio: 'All-in-One PCs', minipc: 'Mini PCs', monitor: 'Geschäftsmonitore', desktop: 'Desktop-Computer' } },
  hero: { ...en.hero, badge: 'Chinesischer Profi-Hersteller · Gegr. 2008', title: 'Ihr zuverlässiger Partner für', titleHighlight: 'globale Computerhardware', cta1: 'Produkte erkunden', cta2: 'OEM-Angebot' },
  footer: { ...en.footer, copyright: '© 2026 BLCOOF Technology Co., Ltd. Alle Rechte vorbehalten.', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen' },
  floating: { whatsapp: 'WhatsApp Chat', wechat: 'WeChat', inquiry: 'Schnellanfrage' },
};

const ja: Translation = {
  ...en,
  nav: { ...en.nav, home: 'ホーム', products: '製品', oem: 'OEM / ODM', about: '会社情報', blog: 'ブログ', contact: 'お問い合わせ', getQuote: '見積もり依頼', products_sub: { aio: '一体型PC', minipc: 'ミニPC', monitor: 'ビジネスモニター', desktop: 'デスクトップPC' } },
  hero: { ...en.hero, badge: '中国プロフェッショナルメーカー · 2008年設立', title: '信頼できるパートナー', titleHighlight: 'グローバルコンピューターハードウェア', cta1: '製品を見る', cta2: 'OEM見積もり' },
  footer: { ...en.footer, copyright: '© 2026 BLCOOF Technology Co., Ltd. All rights reserved.', privacy: 'プライバシーポリシー', terms: '利用規約' },
  floating: { whatsapp: 'WhatsAppで話す', wechat: 'WeChat', inquiry: '簡単お問い合わせ' },
};

const ko: Translation = {
  ...en,
  nav: { ...en.nav, home: '홈', products: '제품', oem: 'OEM / ODM', about: '회사소개', blog: '블로그', contact: '문의하기', getQuote: '견적 요청', products_sub: { aio: '일체형 PC', minipc: '미니 PC', monitor: '상업용 모니터', desktop: '데스크톱 컴퓨터' } },
  hero: { ...en.hero, badge: '중국 전문 제조업체 · 2008년 설립', title: '신뢰할 수 있는 파트너', titleHighlight: '글로벌 컴퓨터 하드웨어', cta1: '제품 살펴보기', cta2: 'OEM 견적' },
  footer: { ...en.footer, copyright: '© 2026 BLCOOF Technology Co., Ltd. All rights reserved.', privacy: '개인정보처리방침', terms: '이용약관' },
  floating: { whatsapp: 'WhatsApp 채팅', wechat: 'WeChat', inquiry: '빠른 문의' },
};

const fr: Translation = {
  ...en,
  nav: { ...en.nav, home: 'Accueil', products: 'Produits', oem: 'OEM / ODM', about: 'À propos', blog: 'Blog', contact: 'Contact', getQuote: 'Demander un devis', products_sub: { aio: 'PC Tout-en-Un', minipc: 'Mini PC', monitor: 'Écrans Professionnels', desktop: 'Ordinateurs de Bureau' } },
  hero: { ...en.hero, badge: 'Fabricant Professionnel Chinois · Fondé en 2008', title: 'Votre Partenaire de Confiance en', titleHighlight: 'Matériel Informatique Mondial', cta1: 'Explorer les Produits', cta2: 'Devis OEM' },
  footer: { ...en.footer, copyright: '© 2026 BLCOOF Technology Co., Ltd. Tous droits réservés.', privacy: 'Politique de Confidentialité', terms: "Conditions d'Utilisation" },
  floating: { whatsapp: 'Chat WhatsApp', wechat: 'WeChat', inquiry: 'Demande Rapide' },
};

const translations: Record<Language, Translation> = { en, zh, ar, es, de, ja, ko, fr, ru, pt };

export const languageNames: Record<Language, string> = {
  en: 'English',
  zh: '中文',
  ar: 'العربية',
  es: 'Español',
  de: 'Deutsch',
  ja: '日本語',
  ko: '한국어',
  fr: 'Français',
  ru: 'Русский',
  pt: 'Português',
};

export const rtlLanguages: Language[] = ['ar'];

export function getTranslation(lang: Language): Translation {
  return translations[lang] || translations.en;
}

export function isRTL(lang: Language): boolean {
  return rtlLanguages.includes(lang);
}

export { translations };
