import type { Inquiry, Product, BlogPost, SiteSettings } from './types';

// ============ LocalStorage Keys ============
const KEYS = {
  AUTH: 'blcoof_admin_auth',
  INQUIRIES: 'blcoof_inquiries',
  PRODUCTS: 'blcoof_products',
  POSTS: 'blcoof_posts',
  SETTINGS: 'blcoof_settings',
};

// ============ Auth ============
export const authStore = {
  login(username: string, password: string): boolean {
    // Default credentials — change in Settings after first login
    if (username === 'admin' && password === 'Blcoof@2025') {
      localStorage.setItem(KEYS.AUTH, JSON.stringify({ username, loginAt: Date.now() }));
      return true;
    }
    return false;
  },
  logout() {
    localStorage.removeItem(KEYS.AUTH);
  },
  isLoggedIn(): boolean {
    const raw = localStorage.getItem(KEYS.AUTH);
    if (!raw) return false;
    try {
      const { loginAt } = JSON.parse(raw);
      // Session expires after 8 hours
      return Date.now() - loginAt < 8 * 60 * 60 * 1000;
    } catch {
      return false;
    }
  },
};

// ============ Generic CRUD ============
function getAll<T>(key: string, defaults: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaults;
  } catch {
    return defaults;
  }
}

function saveAll<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ============ Inquiries ============
// 无演示数据，全新部署从空白开始
const mockInquiries: Inquiry[] = [];

export const inquiryStore = {
  getAll(): Inquiry[] {
    return getAll<Inquiry>(KEYS.INQUIRIES, mockInquiries);
  },
  add(data: Omit<Inquiry, 'id' | 'createdAt' | 'status' | 'notes'>): Inquiry {
    const item: Inquiry = {
      ...data,
      id: genId(),
      createdAt: new Date().toISOString(),
      status: 'new',
      notes: '',
    };
    const all = this.getAll();
    all.unshift(item);
    saveAll(KEYS.INQUIRIES, all);
    return item;
  },
  update(id: string, patch: Partial<Inquiry>) {
    const all = this.getAll().map(i => i.id === id ? { ...i, ...patch } : i);
    saveAll(KEYS.INQUIRIES, all);
  },
  delete(id: string) {
    saveAll(KEYS.INQUIRIES, this.getAll().filter(i => i.id !== id));
  },
  exportCSV(): string {
    const all = this.getAll();
    const headers = ['ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Country', 'Product', 'Quantity', 'Status', 'Requirement'];
    const rows = all.map(i => [
      i.id, i.createdAt.split('T')[0], i.name, i.company, i.email, i.phone, i.country,
      i.productType, i.quantity, i.status, `"${i.requirement.replace(/"/g, "'")}"`,
    ].join(','));
    return [headers.join(','), ...rows].join('\n');
  },
};

// ============ Products ============
// 无演示数据，全新部署从空白开始
const mockProducts: Product[] = [];

export const productStore = {
  getAll(): Product[] { return getAll<Product>(KEYS.PRODUCTS, mockProducts); },
  add(data: Omit<Product, 'id' | 'createdAt'>): Product {
    const item: Product = { ...data, id: genId(), createdAt: new Date().toISOString() };
    const all = this.getAll(); all.unshift(item);
    saveAll(KEYS.PRODUCTS, all);
    return item;
  },
  update(id: string, patch: Partial<Product>) {
    saveAll(KEYS.PRODUCTS, this.getAll().map(p => p.id === id ? { ...p, ...patch } : p));
  },
  delete(id: string) {
    saveAll(KEYS.PRODUCTS, this.getAll().filter(p => p.id !== id));
  },
};

// ============ Blog Posts ============
// 无演示数据，全新部署从空白开始
const mockPosts: BlogPost[] = [];

export const postStore = {
  getAll(): BlogPost[] { return getAll<BlogPost>(KEYS.POSTS, mockPosts); },
  add(data: Omit<BlogPost, 'id' | 'createdAt'>): BlogPost {
    const item: BlogPost = { ...data, id: genId(), createdAt: new Date().toISOString() };
    const all = this.getAll(); all.unshift(item);
    saveAll(KEYS.POSTS, all);
    return item;
  },
  update(id: string, patch: Partial<BlogPost>) {
    saveAll(KEYS.POSTS, this.getAll().map(p => p.id === id ? { ...p, ...patch } : p));
  },
  delete(id: string) {
    saveAll(KEYS.POSTS, this.getAll().filter(p => p.id !== id));
  },
};

// ============ Site Settings ============
const defaultSettings: SiteSettings = {
  companyName: 'BLCOOF',
  tagline: 'Professional Computer Hardware Manufacturer',
  whatsapp: '+8675588880000',
  wechat: 'blcoof_official',
  email: 'sales@blcoof.com',
  phone: '+86 755 8888 0000',
  address: 'Shenzhen, Guangdong, China',
  heroTitle: 'China\'s Leading Computer Hardware Manufacturer',
  heroSubtitle: 'AIO PCs · Mini PCs · Commercial Displays · Desktops — OEM/ODM Welcome',
  metaTitle: 'BLCOOF - Professional Computer Hardware Manufacturer | OEM/ODM',
  metaDescription: 'BLCOOF is a China-based computer hardware manufacturer specializing in All-in-One PCs, Mini PCs, Commercial Displays, and Desktops. OEM/ODM available.',
  googleAnalyticsId: '',
  bannerText: '🌐 Global Shipping · CE/FCC/RoHS Certified · OEM/ODM from 50 units',
  bannerVisible: true,
  carouselSlides: [],
  contactWhatsapp: '+8675588880000',
};

export const settingsStore = {
  get(): SiteSettings {
    try {
      const raw = localStorage.getItem(KEYS.SETTINGS);
      return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  },
  save(data: SiteSettings) {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(data));
  },
};
