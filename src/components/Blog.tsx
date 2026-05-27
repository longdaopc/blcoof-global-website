import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import type { BlogPost } from '../admin/types';

const CATEGORY_GRADIENTS: Record<string, string> = {
  'OEM Guide':      'from-violet-500 to-purple-600',
  'Market Trends':  'from-blue-500 to-cyan-600',
  'Compliance':     'from-emerald-500 to-teal-600',
  'Technology':     'from-orange-500 to-amber-600',
  'Buying Guide':   'from-rose-500 to-pink-600',
  'Comparison':     'from-indigo-500 to-blue-600',
  'Industry News':  'from-teal-500 to-cyan-600',
  'OEM/ODM':        'from-cyan-500 to-blue-600',
  'Case Studies':   'from-amber-500 to-yellow-600',
};

function getPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem('blcoof_posts');
    if (!raw) return [];
    return JSON.parse(raw).filter((p: BlogPost) => p.published);
  } catch {
    return [];
  }
}

function getReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

const FALLBACK_POSTS = [
  {
    id: 'mini-pc-oem-guide', category: 'OEM Guide', date: 'May 10, 2026', readTime: '6 min read',
    title: 'The Complete Guide to Mini PC OEM Manufacturing in 2026',
    excerpt: 'Discover the step-by-step process for launching your own branded Mini PC line — from hardware selection to global certification and market entry.',
    tags: ['Mini PC', 'OEM', 'Manufacturing'], color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'aio-vs-desktop', category: 'Market Trends', date: 'Apr 28, 2026', readTime: '5 min read',
    title: 'AIO PCs vs Traditional Desktops: Which Is Right for Your Business?',
    excerpt: 'A detailed comparison of All-in-One computers and tower desktops for office, retail, and enterprise deployments worldwide.',
    tags: ['AIO PC', 'Enterprise', 'Comparison'], color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'ce-fcc-certification', category: 'Compliance', date: 'Apr 15, 2026', readTime: '8 min read',
    title: 'CE & FCC Certification for Computer Hardware: A Practical Export Roadmap',
    excerpt: 'Everything you need to know about obtaining CE and FCC certifications for your branded computer hardware.',
    tags: ['CE', 'FCC', 'Export', 'Compliance'], color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'commercial-display-trends', category: 'Technology', date: 'Mar 30, 2026', readTime: '4 min read',
    title: '2026 Commercial Display Trends: What Buyers and ODM Partners Should Know',
    excerpt: 'From 8K panels to transparent displays — the key commercial monitor trends shaping the global B2B display market.',
    tags: ['Monitor', 'Trends', '2026'], color: 'from-orange-500 to-amber-600',
  },
];

export default function Blog() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const adminPosts = useMemo(() => getPosts(), []);
  const hasAdminPosts = adminPosts.length > 0;

  // Category list from admin posts or fallback
  const categories = useMemo(() => {
    if (hasAdminPosts) {
      const cats = [...new Set(adminPosts.map(p => p.category))];
      return cats;
    }
    return [...new Set(FALLBACK_POSTS.map(p => p.category))];
  }, [adminPosts, hasAdminPosts]);

  // Filter
  const filteredPosts = useMemo(() => {
    let posts;
    if (hasAdminPosts) {
      posts = adminPosts.map(p => ({
        id: p.id,
        slug: p.slug,
        category: p.category,
        date: new Date(p.publishedAt || p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: getReadTime(p.content),
        title: p.title,
        excerpt: p.summary,
        tags: p.tags || [],
        color: CATEGORY_GRADIENTS[p.category] || 'from-blue-500 to-cyan-600',
        coverImage: p.coverImage || '',
      }));
    } else {
      posts = FALLBACK_POSTS;
    }

    if (activeCategory) posts = posts.filter(p => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    return posts;
  }, [adminPosts, activeCategory, searchQuery, hasAdminPosts]);

  return (
    <section id="blog" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="badge mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Tech Blog
          </div>
          <h2 className="section-title">{t.blog.title}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">{t.blog.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 max-w-3xl mx-auto">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                !activeCategory ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          {hasAdminPosts && (
            <div className="relative w-full sm:w-60">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-9 pr-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
            </div>
          )}
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="card group overflow-hidden cursor-pointer hover:-translate-y-1"
                onClick={() => {
                  if (hasAdminPosts && post.slug) {
                    navigate(`/blog/${post.slug}`);
                  } else {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {/* Cover */}
                <div className={`h-36 bg-gradient-to-br ${post.color} relative overflow-hidden flex items-end p-4`}>
                  {post.coverImage ? (
                    <img src={post.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : null}
                  <span className="relative z-10 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="absolute top-3 right-3 text-white/30 text-4xl font-serif relative z-10">"</div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-blue-600 text-xs font-semibold group-hover:gap-2 transition-all">
                    {t.blog.readMore}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-500">No posts found</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory(null); }} className="mt-2 text-blue-600 text-sm hover:underline">Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
