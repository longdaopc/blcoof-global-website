import { useState, useMemo } from 'react';
import { inquiryStore } from './store';
import type { Inquiry } from './types';
import {
  Search, Download, Trash2, MessageSquare,
  Clock, CheckCircle2, AlertCircle, XCircle,
  ChevronDown, Eye, X, Mail, Phone, Globe, Package
} from 'lucide-react';

const STATUS_CONFIG = {
  new:        { label: 'New',        color: 'bg-amber-500/15 text-amber-400 border-amber-500/30',  icon: AlertCircle },
  processing: { label: 'Processing', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30',    icon: Clock },
  replied:    { label: 'Replied',    color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 },
  closed:     { label: 'Closed',     color: 'bg-slate-500/15 text-slate-400 border-slate-500/30',  icon: XCircle },
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => inquiryStore.getAll());
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [editNotes, setEditNotes] = useState('');

  const refresh = () => setInquiries(inquiryStore.getAll());

  const filtered = useMemo(() => {
    return inquiries.filter(i => {
      const matchStatus = filterStatus === 'all' || i.status === filterStatus;
      const q = search.toLowerCase();
      const matchSearch = !q || [i.name, i.company, i.email, i.country, i.productType]
        .some(v => v.toLowerCase().includes(q));
      return matchStatus && matchSearch;
    });
  }, [inquiries, search, filterStatus]);

  const handleStatusChange = (id: string, status: Inquiry['status']) => {
    inquiryStore.update(id, { status });
    refresh();
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this inquiry? This action cannot be undone.')) {
      inquiryStore.delete(id);
      refresh();
      if (selected?.id === id) setSelected(null);
    }
  };

  const handleSaveNotes = () => {
    if (!selected) return;
    inquiryStore.update(selected.id, { notes: editNotes });
    refresh();
    setSelected(prev => prev ? { ...prev, notes: editNotes } : null);
  };

  const handleExport = () => {
    const csv = inquiryStore.exportCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blcoof-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openDetail = (inq: Inquiry) => {
    setSelected(inq);
    setEditNotes(inq.notes);
  };

  const newCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            Inquiries
            {newCount > 0 && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{newCount}</span>
            )}
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">{filtered.length} of {inquiries.length} records</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, company, email, country..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="pl-3 pr-8 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="processing">Processing</option>
            <option value="replied">Replied</option>
            <option value="closed">Closed</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                {['Contact', 'Company', 'Country', 'Product', 'Quantity', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-slate-400 uppercase tracking-wide px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-slate-500 py-12">
                    No inquiries found
                  </td>
                </tr>
              ) : filtered.map(inq => {
                const s = STATUS_CONFIG[inq.status];
                const StatusIcon = s.icon;
                return (
                  <tr key={inq.id} className="hover:bg-slate-700/30 transition group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-600/30 flex items-center justify-center text-xs font-bold text-blue-400 flex-shrink-0">
                          {inq.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{inq.name}</p>
                          <p className="text-xs text-slate-400">{inq.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{inq.company}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{inq.country}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{inq.productType}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{inq.quantity}</td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative group/status flex items-center gap-1.5">
                        <StatusIcon className="w-3.5 h-3.5" />
                        <select
                          value={inq.status}
                          onChange={e => handleStatusChange(inq.id, e.target.value as Inquiry['status'])}
                          className={`text-xs px-2.5 py-1 rounded-md border font-medium appearance-none cursor-pointer focus:outline-none ${s.color} bg-transparent`}
                        >
                          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                            <option key={k} value={k} className="bg-slate-800 text-white">{v.label}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openDetail(inq)}
                          className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition"
                          title="View detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">Inquiry Detail</h2>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Status */}
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-sm">Status:</span>
                <select
                  value={selected.status}
                  onChange={e => handleStatusChange(selected.id, e.target.value as Inquiry['status'])}
                  className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
                <span className="text-slate-500 text-xs ml-auto">{new Date(selected.createdAt).toLocaleString()}</span>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <InfoRow icon={MessageSquare} label="Name" value={selected.name} />
                <InfoRow icon={Mail} label="Email" value={selected.email} />
                <InfoRow icon={Phone} label="Phone" value={selected.phone} />
                <InfoRow icon={Globe} label="Country" value={selected.country} />
                <InfoRow icon={Package} label="Company" value={selected.company} />
                <InfoRow icon={Package} label="Product" value={`${selected.productType} × ${selected.quantity} units`} />
              </div>

              {/* Requirement */}
              <div className="bg-slate-700/40 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide font-medium">Requirement</p>
                <p className="text-slate-200 text-sm leading-relaxed">{selected.requirement}</p>
              </div>

              {/* Notes */}
              <div>
                <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide font-medium">Internal Notes</p>
                <textarea
                  value={editNotes}
                  onChange={e => setEditNotes(e.target.value)}
                  rows={3}
                  placeholder="Add your notes here..."
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <button
                  onClick={handleSaveNotes}
                  className="mt-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition"
                >
                  Save Notes
                </button>
              </div>

              {/* Quick Reply */}
              <div className="pt-2 border-t border-slate-700">
                <a
                  href={`mailto:${selected.email}?subject=RE: Your Inquiry for ${selected.productType} - BLCOOF`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition w-fit"
                >
                  <Mail className="w-4 h-4" /> Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm text-white">{value}</p>
      </div>
    </div>
  );
}
