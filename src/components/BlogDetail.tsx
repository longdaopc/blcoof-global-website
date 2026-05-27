import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import type { BlogPost } from '../admin/types';

function getPost(slug: string): BlogPost | null {
  try {
    const raw = localStorage.getItem('blcoof_posts');
    if (!raw) return null;
    const posts: BlogPost[] = JSON.parse(raw);
    return posts.find(p => p.slug === slug && p.published) || null;
  } catch {
    return null;
  }
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) { setNotFound(true); return; }
    const found = getPost(slug);
    if (!found) { setNotFound(true); return; }
    setPost(found);
    try {
      setHtmlContent(marked.parse(found.content) as string);
    } catch {
      setHtmlContent(found.content);
    }
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
          <p className="text-gray-500 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const date = new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back & Meta Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-gray-400">{post.category}</span>
          <span className="text-xs text-gray-400 ml-auto">{date}</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt=""
              className="w-full h-48 sm:h-64 object-cover rounded-xl mb-8 shadow-lg"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            {post.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs text-blue-200 px-2 py-0.5 rounded-full border border-blue-400/30">{tag}</span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-blue-200">
            <span>{date}</span>
            {post.author && (
              <>
                <span>·</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <article
          className="prose prose-gray max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-ul:my-4 prose-li:text-gray-700
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-img:rounded-xl prose-img:shadow-md
            prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Back to Home CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm mb-4">Interested in learning more about our products?</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Explore Our Products
          </button>
        </div>
      </div>
    </div>
  );
}
