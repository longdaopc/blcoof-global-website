import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { inquiryStore, productStore, postStore } from './store';
import {
  MessageSquare, Package, FileText, TrendingUp,
  Clock, CheckCircle2, AlertCircle, ArrowRight,
  Globe, Star
} from 'lucide-react';

export default function Dashboard() {
  const inquiries = useMemo(() => inquiryStore.getAll(), []);
  const products = useMemo(() => productStore.getAll(), []);
  const posts = useMemo(() => postStore.getAll(), []);

  const stats = useMemo(() => {
    const newCount = inquiries.filter(i => i.status === 'new').length;
    const processingCount = inquiries.filter(i => i.status === 'processing').length;
    const repliedCount = inquiries.filter(i => i.status === 'replied').length;

    // Monthly trend (last 6 months)
    const monthlyMap: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
      monthlyMap[key] = 0;
    }
    inquiries.forEach(inq => {
      const d = new Date(inq.createdAt);
      const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
      if (key in monthlyMap) monthlyMap[key]++;
    });

    // By country
    const countryMap: Record<string, number> = {};
    inquiries.forEach(i => {
      countryMap[i.country] = (countryMap[i.country] || 0) + 1;
    });
    const topCountries = Object.entries(countryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // By product
    const productMap: Record<string, number> = {};
    inquiries.forEach(i => {
      productMap[i.productType] = (productMap[i.productType] || 0) + 1;
    });

    return {
      total: inquiries.length,
      newCount,
      processingCount,
      repliedCount,
      monthly: Object.entries(monthlyMap),
      topCountries,
      topProducts: Object.entries(productMap).sort((a, b) => b[1] - a[1]).slice(0, 4),
    };
  }, [inquiries]);

  const maxMonthly = Math.max(...stats.monthly.map(([, v]) => v), 1);

  const statCards = [
    { label: 'Total Inquiries', value: stats.total, icon: MessageSquare, color: 'blue', link: '/admin/inquiries' },
    { label: 'New Inquiries', value: stats.newCount, icon: AlertCircle, color: 'amber', link: '/admin/inquiries?status=new' },
    { label: 'Total Products', value: products.length, icon: Package, color: 'emerald', link: '/admin/products' },
    { label: 'Blog Posts', value: posts.length, icon: FileText, color: 'purple', link: '/admin/blog' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  const recentInquiries = inquiries.slice(0, 5);

  const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    new: { label: 'New', color: 'bg-amber-500/10 text-amber-400', icon: AlertCircle },
    processing: { label: 'Processing', color: 'bg-blue-500/10 text-blue-400', icon: Clock },
    replied: { label: 'Replied', color: 'bg-emerald-500/10 text-emerald-400', icon: CheckCircle2 },
    closed: { label: 'Closed', color: 'bg-slate-500/10 text-slate-400', icon: CheckCircle2 },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">
          Welcome back! Here's an overview of your website activity.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, link }) => (
          <Link key={label} to={link}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800 transition group">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${colorMap[color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition mt-1" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-slate-400 text-sm">{label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <h2 className="font-semibold text-white">Inquiry Trend (6 Months)</h2>
          </div>
          <div className="flex items-end gap-3 h-32">
            {stats.monthly.map(([month, count]) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">{count}</span>
                <div
                  className="w-full bg-blue-500 rounded-t-md transition-all"
                  style={{ height: `${count === 0 ? 4 : (count / maxMonthly) * 96}px`, minHeight: '4px' }}
                />
                <span className="text-xs text-slate-500 whitespace-nowrap">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Status Summary */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <h2 className="font-semibold text-white">Status Overview</h2>
          </div>
          <div className="space-y-3">
            {[
              { key: 'new', label: 'New', count: stats.newCount, color: 'bg-amber-500' },
              { key: 'processing', label: 'Processing', count: stats.processingCount, color: 'bg-blue-500' },
              { key: 'replied', label: 'Replied', count: stats.repliedCount, color: 'bg-emerald-500' },
              { key: 'closed', label: 'Closed', count: inquiries.filter(i => i.status === 'closed').length, color: 'bg-slate-500' },
            ].map(({ label, count, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">{label}</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${color} transition-all`}
                    style={{ width: `${stats.total ? (count / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Recent Inquiries</h2>
            <Link to="/admin/inquiries" className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentInquiries.map(inq => {
              const s = statusConfig[inq.status];
              const Icon = s.icon;
              return (
                <div key={inq.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition">
                  <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {inq.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{inq.name}</p>
                    <p className="text-xs text-slate-400 truncate">{inq.company} · {inq.productType}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md ${s.color} flex-shrink-0`}>
                    <Icon className="w-3 h-3" />
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Countries & Products */}
        <div className="space-y-4">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-blue-400" />
              <h2 className="font-semibold text-white text-sm">Top Inquiry Countries</h2>
            </div>
            <div className="space-y-2">
              {stats.topCountries.length === 0 ? (
                <p className="text-slate-500 text-sm">No data yet</p>
              ) : stats.topCountries.map(([country, count]) => (
                <div key={country} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{country}</span>
                  <span className="text-slate-400 font-medium">{count} inquiries</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-amber-400" />
              <h2 className="font-semibold text-white text-sm">Top Inquired Products</h2>
            </div>
            <div className="space-y-2">
              {stats.topProducts.length === 0 ? (
                <p className="text-slate-500 text-sm">No data yet</p>
              ) : stats.topProducts.map(([product, count]) => (
                <div key={product} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{product}</span>
                  <span className="text-slate-400 font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
