import { useState } from 'react';
import { settingsStore } from './store';
import type { SiteSettings, CarouselSlide } from './types';
import {
  Save, Globe, MessageCircle, Mail, Phone,
  Search, BarChart2, Bell, CheckCircle2, Layout,
  Plus, Trash2, GripVertical, Image, X
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(() => settingsStore.get());
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('company');

  const update = (key: keyof SiteSettings, value: string | boolean) => {
    setSettings(s => ({ ...s, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    settingsStore.save(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sections = [
    { id: 'company', label: 'Company Info', icon: Globe },
    { id: 'contact', label: 'Contact & Social', icon: Phone },
    { id: 'hero', label: 'Hero / Banner', icon: Layout },
    { id: 'seo', label: 'SEO Settings', icon: Search },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 text-sm mt-0.5">Configure your website content and integrations</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
        >
          {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Section Nav */}
        <div className="w-48 flex-shrink-0 space-y-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left transition ${activeSection === id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 space-y-5">
          {activeSection === 'company' && (
            <>
              <SectionTitle icon={Globe} title="Company Information" />
              <Field label="Company Name">
                <input value={settings.companyName} onChange={e => update('companyName', e.target.value)} className="input-dark" />
              </Field>
              <Field label="Tagline">
                <input value={settings.tagline} onChange={e => update('tagline', e.target.value)} className="input-dark" placeholder="Professional Computer Hardware Manufacturer" />
              </Field>
              <Field label="Address">
                <input value={settings.address} onChange={e => update('address', e.target.value)} className="input-dark" placeholder="Shenzhen, Guangdong, China" />
              </Field>
            </>
          )}

          {activeSection === 'contact' && (
            <>
              <SectionTitle icon={MessageCircle} title="Contact & Communication" />
              <Field label="WhatsApp Number" hint="Include country code, e.g. +8675588880000">
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                  <input value={settings.whatsapp} onChange={e => update('whatsapp', e.target.value)} className="input-dark pl-9" placeholder="+8675588880000" />
                </div>
              </Field>
              <Field label="WeChat ID">
                <input value={settings.wechat} onChange={e => update('wechat', e.target.value)} className="input-dark" placeholder="blcoof_official" />
              </Field>
              <Field label="Sales Email">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                  <input type="email" value={settings.email} onChange={e => update('email', e.target.value)} className="input-dark pl-9" placeholder="sales@blcoof.com" />
                </div>
              </Field>
              <Field label="Phone">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input value={settings.phone} onChange={e => update('phone', e.target.value)} className="input-dark pl-9" placeholder="+86 755 8888 0000" />
                </div>
              </Field>
              <Field label="Floating WhatsApp Number" hint="Used for the floating chat button">
                <input value={settings.contactWhatsapp || settings.whatsapp} onChange={e => update('contactWhatsapp', e.target.value)} className="input-dark" placeholder="+8675588880000" />
              </Field>
            </>
          )}

          {activeSection === 'hero' && (
            <>
              <SectionTitle icon={Layout} title="Hero Section & Announcement" />
              <Field label="Hero Title">
                <input value={settings.heroTitle} onChange={e => update('heroTitle', e.target.value)} className="input-dark" />
              </Field>
              <Field label="Hero Subtitle">
                <textarea value={settings.heroSubtitle} onChange={e => update('heroSubtitle', e.target.value)} rows={2} className="input-dark resize-none" />
              </Field>
              <div className="border-t border-slate-700 pt-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-white">Announcement Banner</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs text-slate-400">{settings.bannerVisible ? 'Visible' : 'Hidden'}</span>
                    <div
                      onClick={() => update('bannerVisible', !settings.bannerVisible)}
                      className={`w-10 h-5 rounded-full transition cursor-pointer relative ${settings.bannerVisible ? 'bg-blue-600' : 'bg-slate-600'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${settings.bannerVisible ? 'left-5' : 'left-0.5'}`} />
                    </div>
                  </label>
                </div>
                <Field label="Banner Text">
                  <input value={settings.bannerText} onChange={e => update('bannerText', e.target.value)} className="input-dark" placeholder="🌐 Global Shipping · CE/FCC/RoHS Certified" />
                </Field>
              </div>

              {/* Carousel Slides */}
              <div className="border-t border-slate-700 pt-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">Hero Carousel Slides</span>
                    <span className="text-xs text-slate-500">({settings.carouselSlides?.length || 0} slides)</span>
                  </div>
                  <button
                    onClick={() => {
                      const newSlide: CarouselSlide = {
                        id: Date.now().toString(36),
                        image: '',
                        title: '',
                        subtitle: '',
                        ctaText: '',
                        ctaLink: '',
                        order: (settings.carouselSlides?.length || 0),
                      };
                      setSettings(s => ({ ...s, carouselSlides: [...(s.carouselSlides || []), newSlide] }));
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 text-xs font-medium hover:bg-blue-600/30 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />Add Slide
                  </button>
                </div>

                {(!settings.carouselSlides || settings.carouselSlides.length === 0) ? (
                  <div className="bg-slate-700/30 border border-dashed border-slate-600 rounded-xl p-6 text-center">
                    <Image className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">No carousel slides yet</p>
                    <p className="text-xs text-slate-500 mt-1">Add slides to create a rotating hero carousel</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(settings.carouselSlides || []).sort((a, b) => a.order - b.order).map((slide, idx) => (
                      <div key={slide.id} className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GripVertical className="w-4 h-4 text-slate-500" />
                            <span className="text-xs font-medium text-slate-300">Slide {idx + 1}</span>
                          </div>
                          <button
                            onClick={() => setSettings(s => ({ ...s, carouselSlides: (s.carouselSlides || []).filter(sl => sl.id !== slide.id) }))}
                            className="p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="col-span-2">
                            <label className="block text-xs text-slate-400 mb-1">Image URL</label>
                            <input value={slide.image}
                              onChange={e => setSettings(s => ({ ...s, carouselSlides: (s.carouselSlides || []).map(sl => sl.id === slide.id ? { ...sl, image: e.target.value } : sl) }))}
                              className="input-dark text-xs" placeholder="https://i.ibb.co/... or /images/slide.jpg" />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Title</label>
                            <input value={slide.title}
                              onChange={e => setSettings(s => ({ ...s, carouselSlides: (s.carouselSlides || []).map(sl => sl.id === slide.id ? { ...sl, title: e.target.value } : sl) }))}
                              className="input-dark text-xs" placeholder="Slide heading" />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Subtitle</label>
                            <input value={slide.subtitle}
                              onChange={e => setSettings(s => ({ ...s, carouselSlides: (s.carouselSlides || []).map(sl => sl.id === slide.id ? { ...sl, subtitle: e.target.value } : sl) }))}
                              className="input-dark text-xs" placeholder="Slide description" />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">CTA Button Text</label>
                            <input value={slide.ctaText}
                              onChange={e => setSettings(s => ({ ...s, carouselSlides: (s.carouselSlides || []).map(sl => sl.id === slide.id ? { ...sl, ctaText: e.target.value } : sl) }))}
                              className="input-dark text-xs" placeholder="e.g. Learn More" />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">CTA Link</label>
                            <input value={slide.ctaLink}
                              onChange={e => setSettings(s => ({ ...s, carouselSlides: (s.carouselSlides || []).map(sl => sl.id === slide.id ? { ...sl, ctaLink: e.target.value } : sl) }))}
                              className="input-dark text-xs" placeholder="#products or full URL" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeSection === 'seo' && (
            <>
              <SectionTitle icon={Search} title="SEO Configuration" />
              <Field label="Meta Title" hint="Recommended: 50–60 characters">
                <input value={settings.metaTitle} onChange={e => update('metaTitle', e.target.value)} className="input-dark" />
                <CharCount value={settings.metaTitle} max={60} />
              </Field>
              <Field label="Meta Description" hint="Recommended: 120–160 characters">
                <textarea value={settings.metaDescription} onChange={e => update('metaDescription', e.target.value)} rows={3} className="input-dark resize-none" />
                <CharCount value={settings.metaDescription} max={160} />
              </Field>
              <div className="bg-slate-700/40 rounded-xl p-4 space-y-1.5">
                <p className="text-xs font-medium text-slate-300 mb-3">Google Search Preview</p>
                <p className="text-blue-400 text-sm font-medium truncate">{settings.metaTitle || 'Page Title'}</p>
                <p className="text-emerald-400 text-xs">https://www.blcoof.com/</p>
                <p className="text-slate-400 text-xs line-clamp-2">{settings.metaDescription || 'Page description...'}</p>
              </div>
            </>
          )}

          {activeSection === 'analytics' && (
            <>
              <SectionTitle icon={BarChart2} title="Analytics & Tracking" />
              <Field label="Google Analytics 4 Measurement ID" hint="Format: G-XXXXXXXXXX">
                <input value={settings.googleAnalyticsId} onChange={e => update('googleAnalyticsId', e.target.value)} className="input-dark font-mono" placeholder="G-XXXXXXXXXX" />
              </Field>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <p className="text-blue-400 text-sm font-medium mb-1">How to get your GA4 ID</p>
                <ol className="text-slate-400 text-xs space-y-1 list-decimal list-inside">
                  <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener" className="text-blue-400 hover:underline">analytics.google.com</a></li>
                  <li>Create a property for your domain</li>
                  <li>Under Admin → Data Streams, find your Measurement ID (G-XXXXXXX)</li>
                  <li>Paste it above and save</li>
                </ol>
              </div>
              <div className="bg-slate-700/40 rounded-xl p-4">
                <p className="text-slate-300 text-sm font-medium mb-2">Also Recommended</p>
                <div className="space-y-2 text-xs text-slate-400">
                  <a href="https://clarity.microsoft.com" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-white transition">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    Microsoft Clarity — Free heatmaps & session recordings
                  </a>
                  <a href="https://search.google.com/search-console" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-white transition">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    Google Search Console — Monitor SEO performance
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-blue-400" />
      <h2 className="font-semibold text-white text-sm">{title}</h2>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="block text-sm font-medium text-slate-300">{label}</label>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const color = len > max ? 'text-red-400' : len > max * 0.85 ? 'text-amber-400' : 'text-slate-500';
  return <p className={`text-xs mt-1 text-right ${color}`}>{len} / {max}</p>;
}
