import { useState } from 'react';
import { useI18n } from '../context/I18nContext';

export default function Testimonials() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const testimonials = t.clients.testimonials;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            Client Testimonials
          </div>
          <h2 className="section-title">{t.clients.title}</h2>
          <p className="section-subtitle">{t.clients.subtitle}</p>
        </div>

        {/* Main testimonial card */}
        <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-8 lg:p-12 text-white mb-6 shadow-xl shadow-blue-200">
          {/* Quote mark */}
          <div className="absolute top-6 left-8 text-7xl text-white/10 font-serif leading-none select-none">"</div>

          <div className="relative">
            <p className="text-lg lg:text-xl leading-relaxed text-blue-100 mb-8 min-h-[80px]">
              "{testimonials[active].quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {testimonials[active].author[0]}
              </div>
              <div>
                <div className="font-bold text-white">{testimonials[active].author}</div>
                <div className="text-blue-300 text-sm">{testimonials[active].company}</div>
              </div>
              <div className="ml-auto text-lg">{testimonials[active].country}</div>
            </div>
          </div>

          {/* Stars */}
          <div className="absolute top-8 right-8 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Thumbnail nav */}
        <div className="flex gap-3 justify-center flex-wrap">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                i === active
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                  : 'border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              <span>{item.country.split(' ')[0]}</span>
              <span>{item.author}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
