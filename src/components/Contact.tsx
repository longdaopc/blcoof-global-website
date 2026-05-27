import { useState } from 'react';
import { useI18n } from '../context/I18nContext';

// Save inquiry to localStorage so admin can see it
function saveInquiry(data: Record<string, string>) {
  try {
    const key = 'blcoof_inquiries';
    const raw = localStorage.getItem(key);
    const all = raw ? JSON.parse(raw) : [];
    all.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      createdAt: new Date().toISOString(),
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone || '',
      country: data.country,
      productType: data.product,
      quantity: data.quantity,
      requirement: data.message,
      status: 'new',
      notes: '',
    });
    localStorage.setItem(key, JSON.stringify(all));
  } catch {
    // Silently fail — don't block UX
  }
}

const countries = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy',
  'United Arab Emirates', 'Saudi Arabia', 'Australia', 'Canada', 'Japan',
  'South Korea', 'Singapore', 'India', 'Brazil', 'Mexico', 'South Africa',
  'Netherlands', 'Belgium', 'Sweden', 'Norway', 'Denmark', 'Poland',
  'Turkey', 'Russia', 'Indonesia', 'Malaysia', 'Thailand', 'Philippines',
  'Vietnam', 'Egypt', 'Nigeria', 'Kenya', 'China', 'Other',
];

const products = [
  'All-in-One PC (AIO)', 'Mini PC', 'Commercial Monitor', 'Desktop Computer',
  'Multiple Products', 'Not sure yet',
];

const quantities = [
  '500 – 1,000 units', '1,000 – 5,000 units', '5,000 – 20,000 units',
  '20,000 – 50,000 units', '50,000+ units', 'Sample / Prototype first',
];

export default function Contact() {
  const { t } = useI18n();
  const f = t.contact.form;

  const [form, setForm] = useState({
    name: '', email: '', company: '', country: '',
    product: '', quantity: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Save inquiry to admin storage
    saveInquiry(form);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="badge mb-4">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get In Touch
              </div>
              <h2 className="section-title text-left">{t.contact.title}</h2>
              <p className="text-gray-500 mt-2">{t.contact.subtitle}</p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
                  label: 'Address',
                  value: t.contact.info.address,
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                  label: 'Phone',
                  value: t.contact.info.phone,
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                  label: 'Email',
                  value: t.contact.info.email,
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 items-start">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</div>
                    <div className="text-gray-700 text-sm mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp direct */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">WhatsApp Business</div>
                  <div className="text-green-600 text-xs">Typically replies within 1 hour</div>
                </div>
                <a
                  href={`https://wa.me/${(() => { try { const raw = localStorage.getItem('blcoof_settings'); const n = raw ? JSON.parse(raw).contactWhatsapp || JSON.parse(raw).whatsapp : '8675588880000'; return (n || '8675588880000').replace(/[^0-9]/g, ''); } catch { return '8675588880000'; } })()}?text=Hello+BLCOOF,+I%27m+interested+in+your+products.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Chat Now
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="card p-6 lg:p-8">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{f.success}</h3>
                  <p className="text-gray-500">Our sales team will review your inquiry and respond shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary mt-4"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{f.name} *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{f.email} *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{f.company} *</label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={form.company}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="Your Company Ltd."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{f.country} *</label>
                      <select
                        name="country"
                        required
                        value={form.country}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white"
                      >
                        <option value="">Select country...</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{f.product}</label>
                      <select
                        name="product"
                        value={form.product}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white"
                      >
                        <option value="">Select product...</option>
                        {products.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{f.quantity}</label>
                      <select
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white"
                      >
                        <option value="">Select quantity...</option>
                        {quantities.map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{f.message} *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                      placeholder="Describe your project, target market, specific requirements, timeline..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary justify-center py-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        {f.submit}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    🔒 Your information is kept confidential and only used for sales communication.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
