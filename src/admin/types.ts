// ============ Admin Types ============

export interface AdminUser {
  username: string;
  password: string;
  name: string;
  role: 'super' | 'editor';
}

export interface Inquiry {
  id: string;
  createdAt: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  productType: string;
  quantity: string;
  requirement: string;
  status: 'new' | 'processing' | 'replied' | 'closed';
  notes: string;
}

export interface Product {
  id: string;
  category: 'aio' | 'mini' | 'monitor' | 'desktop';
  name: string;
  model: string;
  specs: string[];
  price: string;
  moq: string;
  image: string;
  featured: boolean;
  visible: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  whatsapp: string;
  wechat: string;
  email: string;
  phone: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  googleAnalyticsId: string;
  bannerText: string;
  bannerVisible: boolean;
  carouselSlides: CarouselSlide[];
  contactWhatsapp: string;
}

export interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  order: number;
}

export interface DashboardStats {
  totalInquiries: number;
  newInquiries: number;
  totalProducts: number;
  totalPosts: number;
  monthlyInquiries: { month: string; count: number }[];
  inquiryByCountry: { country: string; count: number }[];
  inquiryByProduct: { product: string; count: number }[];
}
