import { useI18n } from '../context/I18nContext';

const footerLinks = {
  Products: ['All-in-One PCs', 'Mini PCs', 'Commercial Monitors', 'Desktop Computers', 'OEM Products'],
  Company: ['About BLCOOF', 'Manufacturing Facility', 'Quality Assurance', 'Global Certifications', 'Careers'],
  Support: ['Product Catalog', 'Technical Specs', 'OEM/ODM Services', 'After-Sales Support', 'Warranty Policy'],
};

export default function Footer() {
  const { t } = useI18n();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand column */}
          <div className="col-span-2">
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">BL</span>
              </div>
              <span className="font-bold text-xl text-white">BLCOOF</span>
            </button>
            <p className="text-sm leading-relaxed mb-5">{t.footer.tagline}</p>

            {/* Social */}
            <div className="flex gap-3">
              {/* LinkedIn */}
              <a href="#" className="w-9 h-9 bg-white/5 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-9 h-9 bg-white/5 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-9 h-9 bg-white/5 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${(() => { try { const raw = localStorage.getItem('blcoof_settings'); const n = raw ? JSON.parse(raw).contactWhatsapp || JSON.parse(raw).whatsapp : '8675588880000'; return (n || '8675588880000').replace(/[^0-9]/g, ''); } catch { return '8675588880000'; } })()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bold text-white text-sm mb-4">
                {(t.footer as any)[section.toLowerCase()] || section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo('contact')}
                      className="text-sm hover:text-white transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <button className="text-xs text-gray-600 hover:text-gray-400 transition-colors">{t.footer.privacy}</button>
            <span className="text-gray-700">·</span>
            <button className="text-xs text-gray-600 hover:text-gray-400 transition-colors">{t.footer.terms}</button>
            <span className="text-gray-700">·</span>
            <span className="text-xs text-gray-600">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
