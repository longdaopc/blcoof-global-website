import { useState, useMemo } from 'react';
import { useI18n } from '../context/I18nContext';
import type { Product } from '../admin/types';

// Category key normalization: admin uses 'aio'|'mini'|'monitor'|'desktop'
// Frontend uses 'aio'|'minipc'|'monitor'|'desktop' for i18n keys
type FrontendCategory = 'aio' | 'minipc' | 'monitor' | 'desktop';
type AdminCategory = Product['category'];

const CATEGORY_MAP: Record<AdminCategory, FrontendCategory> = {
  aio: 'aio',
  mini: 'minipc',
  monitor: 'monitor',
  desktop: 'desktop',
};

const CATEGORY_COLORS: Record<FrontendCategory, { gradient: string; color: string }> = {
  aio:    { gradient: 'from-blue-500 to-cyan-400',   color: 'bg-blue-100 text-blue-700' },
  minipc: { gradient: 'from-violet-500 to-purple-400', color: 'bg-violet-100 text-violet-700' },
  monitor: { gradient: 'from-emerald-500 to-teal-400', color: 'bg-emerald-100 text-emerald-700' },
  desktop: { gradient: 'from-orange-500 to-amber-400', color: 'bg-orange-100 text-orange-700' },
};

// SVG Product Illustrations for each category
function ProductIllustration({ category, size = 140 }: { category: FrontendCategory; size?: number }) {
  const s = size;
  const fill = 'white';
  const screen = '#0F172A';
  const accent = '#38BDF8';

  switch (category) {
    case 'aio':
      return (
        <svg width={s} height={s} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stand base */}
          <rect x="65" y="150" width="50" height="8" rx="4" fill={fill} fillOpacity="0.9"/>
          <rect x="80" y="135" width="20" height="17" rx="3" fill={fill} fillOpacity="0.85"/>
          {/* Screen frame */}
          <rect x="22" y="18" width="136" height="105" rx="8" fill={fill} fillOpacity="0.95"/>
          {/* Screen */}
          <rect x="30" y="26" width="120" height="90" rx="5" fill={screen}/>
          {/* Screen glare */}
          <rect x="30" y="26" width="120" height="15" rx="5" fill={fill} fillOpacity="0.12"/>
          {/* Camera dot */}
          <circle cx="90" cy="18" r="2.5" fill={accent} opacity="0.6"/>
          {/* Screen content hint */}
          <rect x="50" y="55" width="80" height="4" rx="2" fill={fill} fillOpacity="0.15"/>
          <rect x="55" y="65" width="70" height="4" rx="2" fill={fill} fillOpacity="0.1"/>
          <rect x="60" y="75" width="50" height="4" rx="2" fill={fill} fillOpacity="0.08"/>
        </svg>
      );
    case 'minipc':
      return (
        <svg width={s} height={s} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Box body */}
          <rect x="35" y="42" width="110" height="86" rx="12" fill={fill} fillOpacity="0.95"/>
          {/* Box front */}
          <rect x="43" y="50" width="94" height="70" rx="8" fill={screen}/>
          {/* Vents */}
          {[60,68,76,84,92,100,108].map((y, i) => (
            <rect key={i} x="52" y={y} width={i < 3 ? 76 : 56} height="3" rx="1.5" fill={fill} fillOpacity={i < 3 ? 0.18 : 0.1}/>
          ))}
          {/* Power LED */}
          <circle cx="130" cy="60" r="4" fill="#22C55E" fillOpacity="0.7"/>
          {/* Front ports hint */}
          <rect x="52" y="116" width="8" height="4" rx="1" fill={fill} fillOpacity="0.15"/>
          <rect x="64" y="116" width="8" height="4" rx="1" fill={fill} fillOpacity="0.15"/>
        </svg>
      );
    case 'monitor':
      return (
        <svg width={s} height={s} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <rect x="60" y="158" width="60" height="6" rx="3" fill={fill} fillOpacity="0.8"/>
          {/* Neck */}
          <rect x="80" y="128" width="20" height="33" rx="3" fill={fill} fillOpacity="0.85"/>
          {/* Display frame */}
          <rect x="10" y="12" width="160" height="110" rx="6" fill={fill} fillOpacity="0.95"/>
          {/* Display panel */}
          <rect x="18" y="20" width="144" height="94" rx="4" fill={screen}/>
          {/* Screen glare */}
          <rect x="18" y="20" width="144" height="12" rx="4" fill={fill} fillOpacity="0.1"/>
          {/* Content hint */}
          <rect x="40" y="52" width="100" height="5" rx="2.5" fill={fill} fillOpacity="0.15"/>
          <rect x="45" y="63" width="85" height="5" rx="2.5" fill={fill} fillOpacity="0.1"/>
          <rect x="50" y="74" width="60" height="5" rx="2.5" fill={fill} fillOpacity="0.08"/>
        </svg>
      );
    case 'desktop':
      return (
        <svg width={s} height={s} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tower case */}
          <rect x="45" y="24" width="90" height="132" rx="6" fill={fill} fillOpacity="0.95"/>
          {/* Front panel */}
          <rect x="53" y="32" width="74" height="116" rx="4" fill={screen}/>
          {/* Drive bays */}
          <rect x="61" y="40" width="58" height="8" rx="2" fill={fill} fillOpacity="0.15"/>
          <rect x="61" y="54" width="58" height="8" rx="2" fill={fill} fillOpacity="0.15"/>
          {/* Vents */}
          {[68,76,84,92,100,108,116].map((y, i) => (
            <rect key={i} x="61" y={y} width={48 - i * 2} height="3" rx="1.5" fill={fill} fillOpacity={0.12}/>
          ))}
          {/* Power LED */}
          <circle cx="126" cy="42" r="3.5" fill="#22C55E" fillOpacity="0.7"/>
          {/* USB/audio ports hint */}
          <rect x="61" y="132" width="10" height="4" rx="1" fill={fill} fillOpacity="0.15"/>
          <rect x="75" y="132" width="10" height="4" rx="1" fill={fill} fillOpacity="0.1"/>
        </svg>
      );
  }
}

const CATEGORY_SPEC_STRIPS: Record<FrontendCategory, string> = {
  aio:    'Intel Core i3~i9 / AMD Ryzen \u00b7 21.5"\u201327" FHD/4K IPS \u00b7 DDR5 8GB~64GB \u00b7 NVMe SSD',
  minipc: 'Intel N100~Core i9 / AMD Ryzen \u00b7 Fanless & Active \u00b7 2.5G LAN \u00b7 NVMe + SATA \u00b7 <1L volume',
  monitor: '21"\u201355" IPS/VA/OLED \u00b7 FHD/4K/8K \u00b7 HDMI+DP+VGA \u00b7 Brightness 250~1000nit \u00b7 VESA Mount',
  desktop: 'Intel Core i5~i9 / AMD Ryzen \u00b7 ATX/mATX/ITX \u00b7 GPU Optional \u00b7 RAID Support \u00b7 Enterprise Config',
};

// Read products from localStorage (admin-managed)
function getProducts(): Product[] {
  try {
    const raw = localStorage.getItem('blcoof_products');
    if (!raw) return [];
    return JSON.parse(raw).filter((p: Product) => p.visible !== false);
  } catch {
    return [];
  }
}

// Fallback hardcoded products when admin has no products configured
const FALLBACK_PRODUCTS: Record<FrontendCategory, Array<{ id: string; name: string; specs: string; tag: string; badge: string }>> = {
  aio: [
    { id: 'aio-27pro', name: 'BL-AIO27 Pro', specs: '27" 4K \u00b7 i7-13700 \u00b7 16GB \u00b7 512GB NVMe', tag: 'Best Seller', badge: 'bg-blue-100 text-blue-700' },
    { id: 'aio-24', name: 'BL-AIO24 Business', specs: '23.8" FHD \u00b7 i5-13500 \u00b7 16GB \u00b7 256GB', tag: 'Popular', badge: 'bg-emerald-100 text-emerald-700' },
    { id: 'aio-21slim', name: 'BL-AIO21 Slim', specs: '21.5" FHD \u00b7 i3-N305 \u00b7 8GB \u00b7 256GB', tag: 'Budget', badge: 'bg-gray-100 text-gray-700' },
    { id: 'aio-21t', name: 'BL-AIO21T Touch', specs: '21.5" Touch \u00b7 i5 \u00b7 8GB \u00b7 POS Ready', tag: 'Retail', badge: 'bg-teal-100 text-teal-700' },
  ],
  minipc: [
    { id: 'mini-n100', name: 'BL-Mini N100', specs: 'N100 \u00b7 8GB \u00b7 256GB \u00b7 Fanless \u00b7 2.5G', tag: 'Fanless', badge: 'bg-violet-100 text-violet-700' },
    { id: 'mini-i5', name: 'BL-Mini i5 Pro', specs: 'i5-13500H \u00b7 16GB DDR5 \u00b7 512GB NVMe', tag: 'Performance', badge: 'bg-blue-100 text-blue-700' },
  ],
  monitor: [
    { id: 'mon-27', name: 'BL-M27 4K', specs: '27" 4K IPS \u00b7 350nit \u00b7 HDMI2.1+DP1.4 \u00b7 USB-C', tag: '4K', badge: 'bg-emerald-100 text-emerald-700' },
    { id: 'mon-43', name: 'BL-M43 Commercial', specs: '43" FHD \u00b7 400nit \u00b7 3x HDMI \u00b7 16/7 Operation', tag: 'Signage', badge: 'bg-teal-100 text-teal-700' },
  ],
  desktop: [
    { id: 'dt-office', name: 'BL-DT Office', specs: 'i5-13400 \u00b7 B760 \u00b7 16GB DDR5 \u00b7 512GB \u00b7 Win11', tag: 'Office', badge: 'bg-gray-100 text-gray-700' },
    { id: 'dt-workstation', name: 'BL-WS Creator', specs: 'i9-14900K \u00b7 Z790 \u00b7 64GB \u00b7 2TB \u00b7 RTX 4070', tag: 'Workstation', badge: 'bg-orange-100 text-orange-700' },
  ],
};

export default function Products() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<FrontendCategory>('aio');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Products from admin
  const allAdminProducts = useMemo(() => getProducts(), []);

  const categories: { key: FrontendCategory; label: string }[] = [
    { key: 'aio', label: t.products.categories.aio.name },
    { key: 'minipc', label: t.products.categories.minipc.name },
    { key: 'monitor', label: t.products.categories.monitor.name },
    { key: 'desktop', label: t.products.categories.desktop.name },
  ];

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return allAdminProducts.filter(p => CATEGORY_MAP[p.category] === activeTab);
  }, [allAdminProducts, activeTab]);

  // Apply search filter
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return categoryProducts;
    const q = searchQuery.toLowerCase();
    return categoryProducts.filter(
      p => p.name.toLowerCase().includes(q) || p.model.toLowerCase().includes(q)
    );
  }, [categoryProducts, searchQuery]);

  const hasAdminProducts = allAdminProducts.length > 0;

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="products" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="badge mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Product Lines
          </div>
          <h2 className="section-title">{t.products.title}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">{t.products.subtitle}</p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map(({ key }) => {
            const cat = t.products.categories[key];
            const meta = CATEGORY_COLORS[key];
            const isActive = activeTab === key;
            const count = allAdminProducts.filter(p => CATEGORY_MAP[p.category] === key).length;
            return (
              <button
                key={key}
                onClick={() => { setActiveTab(key); setSearchQuery(''); }}
                className={`group p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                  isActive
                    ? 'border-blue-500 bg-white shadow-lg shadow-blue-100'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center mb-3 shadow-sm`}>
                  <ProductIllustration category={key} size={40} />
                </div>
                <div className={`font-semibold text-sm mb-1 ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
                  {cat.name}
                </div>
                <div className="text-xs text-gray-400 line-clamp-2">{cat.desc}</div>
                <div className="mt-2 flex items-center justify-between">
                  {isActive && (
                    <span className="flex items-center gap-1 text-blue-600 text-xs font-medium">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {cat.tag}
                    </span>
                  )}
                  {hasAdminProducts && count > 0 && (
                    <span className="text-xs text-gray-400 ml-auto">{count} products</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Search Bar (only when admin products exist) */}
        {hasAdminProducts && (
          <div className="mb-6 max-w-md mx-auto">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by product name or model..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Spec Strip */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl px-6 py-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-sm font-semibold text-cyan-300 shrink-0">
            {t.products.categories[activeTab].name} \u2014 Specs:
          </span>
          <span className="text-sm text-blue-100">{CATEGORY_SPEC_STRIPS[activeTab]}</span>
        </div>

        {/* Product Grid */}
        {hasAdminProducts && filteredProducts.length > 0 ? (
          // Admin-managed products
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const catKey = CATEGORY_MAP[product.category];
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="card group overflow-hidden hover:-translate-y-1 cursor-pointer"
                >
                  {/* Product image */}
                  <div className={`h-48 bg-gradient-to-br ${CATEGORY_COLORS[catKey].gradient} flex items-center justify-center relative overflow-hidden`}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLElement).nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`${product.image ? 'hidden' : ''}`}>
                      <ProductIllustration category={catKey} size={140} />
                    </div>
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      {product.featured && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900">
                          Featured
                        </span>
                      )}
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[catKey].color}`}>
                        {product.model}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-1 leading-relaxed line-clamp-2">
                      {product.specs.slice(0, 3).join(' \u00b7 ')}
                    </p>
                    {product.moq && (
                      <p className="text-xs text-blue-600 font-medium mb-2">MOQ: {product.moq}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); scrollToContact(); }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
                      >
                        {t.products.inquire}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); document.getElementById('oem')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="flex-1 border border-gray-200 hover:border-blue-300 hover:text-blue-600 text-gray-600 text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
                      >
                        {t.products.customize}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : filteredProducts.length === 0 && searchQuery ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">
              <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500">No products match "{searchQuery}"</p>
            <button onClick={() => setSearchQuery('')} className="mt-2 text-blue-600 text-sm hover:underline">Clear search</button>
          </div>
        ) : (
          // Fallback: hardcoded demo products
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FALLBACK_PRODUCTS[activeTab].map((product) => (
              <div key={product.id} className="card group overflow-hidden hover:-translate-y-1">
                <div className={`h-48 bg-gradient-to-br ${CATEGORY_COLORS[activeTab].gradient} flex items-center justify-center relative overflow-hidden`}>
                  <ProductIllustration category={activeTab} size={140} />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product.badge}`}>
                      {product.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{product.specs}</p>
                  <div className="flex gap-2">
                    <button onClick={scrollToContact} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors">
                      {t.products.inquire}
                    </button>
                    <button
                      onClick={() => document.getElementById('oem')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex-1 border border-gray-200 hover:border-blue-300 hover:text-blue-600 text-gray-600 text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
                    >
                      {t.products.customize}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-10">
          <button onClick={scrollToContact} className="btn-secondary">
            {t.products.viewAll}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setSelectedProduct(null)}>
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className={`h-56 bg-gradient-to-br ${CATEGORY_COLORS[CATEGORY_MAP[selectedProduct.category]].gradient} flex items-center justify-center relative rounded-t-2xl`}>
              {selectedProduct.image ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover rounded-t-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLElement).parentElement!.querySelector('.fallback-svg')?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`fallback-svg ${selectedProduct.image ? 'hidden' : ''}`}>
                <ProductIllustration category={CATEGORY_MAP[selectedProduct.category]} size={180} />
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {selectedProduct.featured && (
                <span className="absolute top-4 left-4 text-xs font-bold px-2.5 py-1 rounded-full bg-yellow-400 text-yellow-900">Featured</span>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mt-1">{selectedProduct.model}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[CATEGORY_MAP[selectedProduct.category]].color}`}>
                  {t.products.categories[CATEGORY_MAP[selectedProduct.category]].name}
                </span>
              </div>

              {/* Specs */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Specifications</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProduct.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & MOQ */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedProduct.price && (
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="text-xs text-blue-600 font-medium">Price</p>
                    <p className="text-sm font-bold text-blue-800">{selectedProduct.price}</p>
                  </div>
                )}
                {selectedProduct.moq && (
                  <div className="bg-emerald-50 rounded-xl p-3">
                    <p className="text-xs text-emerald-600 font-medium">MOQ</p>
                    <p className="text-sm font-bold text-emerald-800">{selectedProduct.moq}</p>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => { setSelectedProduct(null); scrollToContact(); }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  {t.products.inquire}
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-3 border border-gray-200 hover:border-gray-300 text-gray-600 rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
