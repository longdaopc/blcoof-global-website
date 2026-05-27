import { useI18n } from '../context/I18nContext';

const certs = [
  { name: 'CE', region: 'European Union', color: 'from-blue-500 to-blue-700', desc: 'Conformité Européenne' },
  { name: 'FCC', region: 'United States', color: 'from-red-500 to-red-700', desc: 'Federal Communications Commission' },
  { name: 'RoHS', region: 'Global', color: 'from-emerald-500 to-emerald-700', desc: 'Restriction of Hazardous Substances' },
  { name: 'ENERGY\nSTAR', region: 'US / Global', color: 'from-green-500 to-green-700', desc: 'Energy Efficiency Certified' },
  { name: 'ISO\n9001', region: 'International', color: 'from-violet-500 to-violet-700', desc: 'Quality Management System 2015' },
  { name: 'Win 11\nReady', region: 'Global', color: 'from-cyan-500 to-cyan-700', desc: 'Windows 11 Compatible' },
  { name: 'UKCA', region: 'United Kingdom', color: 'from-indigo-500 to-indigo-700', desc: 'UK Conformity Assessed' },
  { name: 'SAA', region: 'Australia / NZ', color: 'from-orange-500 to-orange-700', desc: 'Standards Australia Approved' },
];

const partnerLogos = [
  'RetailTech Solutions', 'EduSystems Ltd.', 'Gulf IT Distribution',
  'AsiaPC Group', 'TechVision EU', 'SmartOffice Korea',
  'Nordic Systems', 'MedTech Display', 'FranchiSoft',
];

export default function Certifications() {
  const { t } = useI18n();

  return (
    <section className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="badge mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Certifications
          </div>
          <h2 className="section-title">{t.certifications.title}</h2>
          <p className="section-subtitle">{t.certifications.subtitle}</p>
        </div>

        {/* Cert Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-16">
          {certs.map((cert) => (
            <div key={cert.name} className="group card p-4 text-center hover:-translate-y-1 cursor-default">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:shadow-md transition-shadow`}>
                <span className="text-white font-bold text-xs text-center leading-tight whitespace-pre">{cert.name}</span>
              </div>
              <div className="text-xs font-semibold text-gray-700">{cert.region}</div>
              <div className="text-xs text-gray-400 mt-0.5 leading-tight">{cert.desc}</div>
            </div>
          ))}
        </div>

        {/* Partner logos ticker */}
        <div className="border-t border-gray-200 pt-10">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Trusted by Global Partners
          </p>
          <div className="relative overflow-hidden">
            <div className="flex gap-10 items-center animate-[scroll_20s_linear_infinite] whitespace-nowrap">
              {[...partnerLogos, ...partnerLogos].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 shrink-0 bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{name[0]}</span>
                  </div>
                  <span className="text-gray-600 font-medium text-sm">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
