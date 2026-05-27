import { useI18n } from '../context/I18nContext';

const steps = [
  {
    num: '01',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    num: '02',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    num: '03',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    num: '04',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const capabilities = [
  { label: 'Logo & Branding', desc: 'Full custom logo, color, and brand identity on chassis & packaging' },
  { label: 'Firmware & BIOS', desc: 'Custom BIOS splash, boot settings, pre-installed software' },
  { label: 'Packaging Design', desc: 'Retail-ready box design with your brand and language' },
  { label: 'Certifications', desc: 'CE, FCC, RoHS, ENERGY STAR, regional compliance' },
  { label: 'Hardware Config', desc: 'CPU, RAM, storage, I/O fully configurable per your specs' },
  { label: 'After-Sales', desc: '3-year warranty support, spare parts, RMA management' },
];

export default function OEM() {
  const { t } = useI18n();

  const stepsData = [t.oem.steps.s1, t.oem.steps.s2, t.oem.steps.s3, t.oem.steps.s4];

  return (
    <section id="oem" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t.oem.badge}
          </div>
          <h2 className="section-title">
            {t.oem.title}
            <br />
            <span className="gradient-text">{t.oem.titleHighlight}</span>
          </h2>
          <p className="section-subtitle mt-4">{t.oem.subtitle}</p>
        </div>

        {/* Process Steps */}
        <div className="relative mb-20">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 mx-32" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsData.map((step, i) => (
              <div key={i} className="relative text-center group">
                {/* Step number circle */}
                <div className="relative flex justify-center mb-5">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:shadow-blue-300 group-hover:scale-105 transition-all duration-200 z-10">
                    <div className="text-white">{steps[i].icon}</div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center z-20">
                    <span className="text-blue-600 font-bold text-xs">{steps[i].num}</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Full Customization Scope</h3>
              <p className="text-gray-500 mb-6">Every aspect of your product can be tailored to your brand's exact requirements — from hardware specs to packaging language.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {capabilities.map((cap) => (
                  <div key={cap.label} className="flex gap-3 items-start bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{cap.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{cap.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              {/* OEM visual */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-8 text-white space-y-4 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-cyan-300 text-sm">BL</span>
                  </div>
                  <div>
                    <div className="font-bold">BLCOOF OEM Program</div>
                    <div className="text-blue-300 text-sm">For Brands & Distributors</div>
                  </div>
                </div>
                {[
                  { label: 'Min. Order Quantity', value: '500 units' },
                  { label: 'Sample Lead Time', value: '15 business days' },
                  { label: 'Mass Production', value: '30–45 days' },
                  { label: 'Warranty', value: '3 years (extendable)' },
                  { label: 'Trade Terms', value: 'EXW / FOB / CIF / DDP' },
                  { label: 'Payment', value: 'T/T · LC · PayPal (sample)' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                    <span className="text-blue-200 text-sm">{item.label}</span>
                    <span className="font-semibold text-white text-sm">{item.value}</span>
                  </div>
                ))}
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-blue-900 font-bold py-3 rounded-xl transition-colors mt-2"
                >
                  {t.oem.cta} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
