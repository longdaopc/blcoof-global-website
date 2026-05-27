import { useState, useMemo } from 'react';
import { productStore } from './store';
import type { Product } from './types';
import {
  Plus, Search, Edit2, Trash2, Eye, EyeOff,
  Star, StarOff, X, Save, Package
} from 'lucide-react';

const CATEGORIES = [
  { key: 'aio', label: 'All-in-One PC' },
  { key: 'mini', label: 'Mini PC' },
  { key: 'monitor', label: 'Commercial Display' },
  { key: 'desktop', label: 'Desktop PC' },
];

const emptyForm = (): Omit<Product, 'id' | 'createdAt'> => ({
  category: 'aio',
  name: '',
  model: '',
  specs: [''],
  price: '',
  moq: '',
  image: '',
  featured: false,
  visible: true,
});

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(() => productStore.getAll());
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm());

  const refresh = () => setProducts(productStore.getAll());

  const filtered = useMemo(() => products.filter(p => {
    const matchCat = filterCat === 'all' || p.category === filterCat;
    const q = search.toLowerCase();
    const matchSearch = !q || [p.name, p.model, p.category].some(v => v.toLowerCase().includes(q));
    return matchCat && matchSearch;
  }), [products, search, filterCat]);

  const openCreate = () => { setForm(emptyForm()); setCreating(true); setEditing(null); };
  const openEdit = (p: Product) => {
    setForm({ category: p.category, name: p.name, model: p.model, specs: [...p.specs], price: p.price, moq: p.moq, image: p.image, featured: p.featured, visible: p.visible });
    setEditing(p);
    setCreating(false);
  };
  const closeModal = () => { setCreating(false); setEditing(null); };

  const handleSave = () => {
    if (!form.name.trim() || !form.model.trim()) return alert('Name and Model are required.');
    const cleanedSpecs = form.specs.filter(s => s.trim());
    if (editing) {
      productStore.update(editing.id, { ...form, specs: cleanedSpecs });
    } else {
      productStore.add({ ...form, specs: cleanedSpecs });
    }
    refresh();
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this product?')) { productStore.delete(id); refresh(); }
  };

  const toggleVisible = (p: Product) => { productStore.update(p.id, { visible: !p.visible }); refresh(); };
  const toggleFeatured = (p: Product) => { productStore.update(p.id, { featured: !p.featured }); refresh(); };

  const updateSpec = (idx: number, val: string) => {
    const specs = [...form.specs];
    specs[idx] = val;
    setForm(f => ({ ...f, specs }));
  };
  const addSpec = () => setForm(f => ({ ...f, specs: [...f.specs, ''] }));
  const removeSpec = (idx: number) => setForm(f => ({ ...f, specs: f.specs.filter((_, i) => i !== idx) }));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Products</h1>
          <p className="text-slate-400 text-sm mt-0.5">{products.length} products</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {[{ key: 'all', label: 'All' }, ...CATEGORIES].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterCat(key)}
              className={`px-3 py-2 rounded-lg text-sm transition ${filterCat === key ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => (
          <div key={p.id} className={`bg-slate-800/50 border rounded-xl overflow-hidden transition group ${p.visible ? 'border-slate-700/50' : 'border-slate-700/30 opacity-60'}`}>
            {/* Image placeholder */}
            <div className="h-36 bg-slate-700/50 flex items-center justify-center border-b border-slate-700/30 relative">
              {p.image ? (
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              ) : (
                <Package className="w-10 h-10 text-slate-500" />
              )}
              {p.featured && (
                <span className="absolute top-2 left-2 bg-amber-500 text-xs font-bold text-white px-2 py-0.5 rounded-full">Featured</span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <p className="font-semibold text-white text-sm leading-tight">{p.name}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{p.model}</p>
                </div>
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded flex-shrink-0">
                  {CATEGORIES.find(c => c.key === p.category)?.label.split(' ')[0]}
                </span>
              </div>
              <div className="mt-2 space-y-0.5">
                {p.specs.slice(0, 3).map((s, i) => (
                  <p key={i} className="text-xs text-slate-400">• {s}</p>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
                <div>
                  <p className="text-sm font-bold text-blue-400">{p.price}</p>
                  <p className="text-xs text-slate-500">MOQ: {p.moq}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => toggleFeatured(p)} title={p.featured ? 'Unfeature' : 'Feature'}
                    className={`p-1.5 rounded transition ${p.featured ? 'text-amber-400 hover:text-slate-400' : 'text-slate-500 hover:text-amber-400'}`}>
                    {p.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => toggleVisible(p)} title={p.visible ? 'Hide' : 'Show'}
                    className={`p-1.5 rounded transition ${p.visible ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-400'}`}>
                    {p.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
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
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(creating || editing) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Category */}
              <Field label="Category">
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Product['category'] }))}
                  className="input-dark">
                  {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Product Name *">
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-dark" placeholder="BLCOOF AIO Pro 24" />
                </Field>
                <Field label="Model No. *">
                  <input value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))} className="input-dark" placeholder="BA-P24" />
                </Field>
                <Field label="Starting Price">
                  <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="input-dark" placeholder="$320" />
                </Field>
                <Field label="MOQ">
                  <input value={form.moq} onChange={e => setForm(f => ({ ...f, moq: e.target.value }))} className="input-dark" placeholder="50 units" />
                </Field>
              </div>
              <Field label="Image URL">
                <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="input-dark" placeholder="https://..." />
              </Field>
              {/* Specs */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Specifications</label>
                <div className="space-y-2">
                  {form.specs.map((s, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={s}
                        onChange={e => updateSpec(i, e.target.value)}
                        className="input-dark flex-1"
                        placeholder={`Spec ${i + 1}`}
                      />
                      <button onClick={() => removeSpec(i)} className="p-2 text-slate-500 hover:text-red-400 transition">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button onClick={addSpec} className="text-blue-400 text-sm hover:text-blue-300 transition flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add Spec
                  </button>
                </div>
              </div>
              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 rounded accent-amber-500" />
                  <span className="text-sm text-slate-300">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.visible} onChange={e => setForm(f => ({ ...f, visible: e.target.checked }))}
                    className="w-4 h-4 rounded accent-blue-500" />
                  <span className="text-sm text-slate-300">Visible</span>
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={closeModal} className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition">Cancel</button>
                <button onClick={handleSave}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
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
