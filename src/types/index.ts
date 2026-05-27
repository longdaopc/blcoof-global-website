export type Language = 'en' | 'zh' | 'ar' | 'es' | 'de' | 'ja' | 'ko' | 'fr' | 'ru' | 'pt';

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface Translation {
  nav: {
    home: string;
    products: string;
    oem: string;
    about: string;
    blog: string;
    contact: string;
    getQuote: string;
    products_sub: {
      aio: string;
      minipc: string;
      monitor: string;
      desktop: string;
    };
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
    stat3: { value: string; label: string };
    stat4: { value: string; label: string };
  };
  products: {
    title: string;
    subtitle: string;
    viewAll: string;
    inquire: string;
    customize: string;
    learnMore: string;
    categories: {
      aio: { name: string; desc: string; tag: string };
      minipc: { name: string; desc: string; tag: string };
      monitor: { name: string; desc: string; tag: string };
      desktop: { name: string; desc: string; tag: string };
    };
  };
  oem: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    steps: {
      s1: { title: string; desc: string };
      s2: { title: string; desc: string };
      s3: { title: string; desc: string };
      s4: { title: string; desc: string };
    };
    cta: string;
  };
  why: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  certifications: {
    title: string;
    subtitle: string;
  };
  clients: {
    title: string;
    subtitle: string;
    testimonials: {
      quote: string;
      author: string;
      company: string;
      country: string;
    }[];
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      company: string;
      country: string;
      product: string;
      quantity: string;
      message: string;
      submit: string;
      success: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
    };
  };
  footer: {
    tagline: string;
    products: string;
    company: string;
    support: string;
    followUs: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
  floating: {
    whatsapp: string;
    wechat: string;
    inquiry: string;
  };
}
