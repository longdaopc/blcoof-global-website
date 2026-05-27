import { useState, useMemo } from 'react';
import { postStore } from './store';
import type { BlogPost } from './types';
import {
  Plus, Search, Edit2, Trash2, Globe, EyeOff,
  X, Save, FileText, Tag, Calendar
} from 'lucide-react';

const CATEGORIES = ['Buying Guide', 'Comparison', 'Industry News', 'OEM/ODM', 'Technology', 'Case Study'];

const emptyForm = (): Omit<BlogPost, 'id' | 'createdAt'> => ({
  title: '',
  slug: '',
  summary: '',
  content: '',
  category: 'Buying Guide',
  tags: [],
  coverImage: '',
  author: 'BLCOOF Team',
  published: false,
  publishedAt: new Date().toISOString(),
});

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 80);
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(() => postStore.getAll());
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [tagInput, setTagInput] = useState('');
  const [activeTab, setActiveTab] = useState<'meta' | 'content'>('meta');

  const refresh = () => setPosts(postStore.getAll());

  const filtered = useMemo(() => posts.filter(p => {
    const q = search.toLowerCase();
    return !q || [p.title, p.category, p.author].some(v => v.toLowerCase().includes(q));
  }), [posts, search]);

  const openCreate = () => {
    setForm(emptyForm());
    setTagInput('');
    setCreating(true);
    setEditing(null);
    setActiveTab('meta');
  };

  const openEdit = (p: BlogPost) => {
    setForm({
      title: p.title, slug: p.slug, summary: p.summary, content: p.content,
      category: p.category, tags: [...p.tags], coverImage: p.coverImage,
      author: p.author, published: p.published, publishedAt: p.publishedAt,
    });
    setTagInput('');
    setEditing(p);
    setCreating(false);
    setActiveTab('meta');
  };

  const closeModal = () => { setCreating(false); setEditing(null); };

  const handleSave = () => {
    if (!form.title.trim()) return alert('Title is required.');
    const data = { ...form, slug: form.slug || toSlug(form.title) };
    if (editing) {
      postStore.update(editing.id, data);
    } else {
      postStore.add(data);
    }
    refresh();
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this post?')) { postStore.delete(id); refresh(); }
  };

  const togglePublish = (p: BlogPost) => {
    postStore.update(p.id, { published: !p.published, publishedAt: !p.published ? new Date().toISOString() : p.publishedAt });
    refresh();
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm(f => ({ ...f, tags: [...f.tags, t] }));
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Blog Posts</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {posts.filter(p => p.published).length} published · {posts.filter(p => !p.published).length} drafts
          </p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Posts List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">No posts found</div>
        )}
        {filtered.map(p => (
          <div key={p.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 flex gap-4 items-start hover:bg-slate-800/70 transition">
            {/* Cover */}
            <div className="w-16 h-16 rounded-lg bg-slate-700/50 flex items-center justify-center flex-shrink-0 overflow-hidden border border-slate-700">
              {p.coverImage
                ? <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                : <FileText className="w-6 h-6 text-slate-500" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white text-sm leading-snug">{p.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded">{p.category}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(p.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${p.published ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">{p.summary}</p>
              {p.tags.length > 0 && (
                <div className="flex items-center gap-1.5 mt-2">
                  <Tag className="w-3 h-3 text-slate-500" />
                  {p.tags.map(t => (
                    <span key={t} className="text-xs text-slate-400 bg-slate-700/50 px-1.5 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => togglePublish(p)}
                title={p.published ? 'Unpublish' : 'Publish'}
                className={`p-1.5 rounded transition ${p.published ? 'text-emerald-400 hover:text-slate-400' : 'text-slate-500 hover:text-emerald-400'}`}>
                {p.published ? <Globe className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => openEdit(p)}
                className="p-1.5 text-slate-400 hover:text-blue-400 rounded transition">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(p.id)}
                className="p-1.5 text-slate-400 hover:text-red-400 rounded transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {(creating || editing) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-700 flex-shrink-0">
              <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition"><X className="w-5 h-5" /></button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-700 flex-shrink-0">
              {(['meta', 'content'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm font-medium capitalize transition ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'}`}>
                  {tab === 'meta' ? 'Post Info' : 'Content (Markdown)'}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'meta' ? (
                <div className="space-y-4">
                  <Field label="Title *">
                    <input value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: toSlug(e.target.value) }))}
                      className="input-dark" placeholder="How to Choose the Right PC..." />
                  </Field>
                  <Field label="URL Slug">
                    <input value={form.slug}
                      onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                      className="input-dark font-mono text-sm" placeholder="auto-generated-from-title" />
                  </Field>
                  <Field label="Summary">
                    <textarea value={form.summary}
                      onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
                      rows={2} className="input-dark resize-none" placeholder="Brief description for SEO..." />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Category">
                      <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-dark">
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Author">
                      <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} className="input-dark" />
                    </Field>
                  </div>
                  <Field label="Cover Image URL">
                    <input value={form.coverImage} onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))} className="input-dark" placeholder="https://..." />
                  </Field>
                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Tags</label>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {form.tags.map(t => (
                        <span key={t} className="flex items-center gap-1 text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded-full">
                          {t}
                          <button onClick={() => removeTag(t)} className="hover:text-white"><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="input-dark flex-1 text-sm"
                        placeholder="Type tag and press Enter..."
                      />
                      <button onClick={addTag} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition">Add</button>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                      className="w-4 h-4 rounded accent-blue-500" />
                    <span className="text-sm text-slate-300">Publish immediately</span>
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Write in Markdown format. Supports headings, bold, lists, links, etc.</p>
                  <textarea
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    rows={18}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="# Post Title&#10;&#10;Your content here..."
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 p-6 border-t border-slate-700 flex-shrink-0">
              <button onClick={closeModal} className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition">Cancel</button>
              <button onClick={handleSave}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
