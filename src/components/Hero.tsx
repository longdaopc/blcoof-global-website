import { useState, useEffect, useCallback } from 'react';
import { useI18n } from '../context/I18nContext';
import type { CarouselSlide } from '../admin/types';

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
  duration: Math.random() * 4 + 3,
}));

function getCarouselSlides(): CarouselSlide[] {
  try {
    const raw = localStorage.getItem('blcoof_settings');
    if (!raw) return [];
    const s = JSON.parse(raw);
    return (s.carouselSlides || []).filter((sl: CarouselSlide) => sl.image).sort((a: CarouselSlide, b: CarouselSlide) => a.order - b.order);
  } catch {
    return [];
  }
}

export default function Hero() {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);

  useEffect(() => {
    setSlides(getCarouselSlides());
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const hasCarousel = slides.length > 0;

  const gotoSlide = (idx: number) => setCurrentSlide(idx);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A2463 0%, #03045E 40%, #023E8A 70%, #0077B6 100%)',
      }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/30 animate-float"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Glow Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Carousel Slides */}
      {hasCarousel && (
        <div className="absolute inset-0">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A2463]/85 via-[#03045E]/75 to-[#0077B6]/85" />
            </div>
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-cyan-300 text-sm font-medium px-4 py-2 rounded-full animate-fade-in-up">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-slow" />
              {t.hero.badge}
            </div>

            {/* Carousel Content or Static */}
            {hasCarousel ? (
              <div key={currentSlide} className="space-y-4 animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                  {slides[currentSlide].title}
                </h1>
                {slides[currentSlide].subtitle && (
                  <p className="text-lg text-blue-100/80 leading-relaxed max-w-xl">
                    {slides[currentSlide].subtitle}
                  </p>
                )}
                {slides[currentSlide].ctaText && slides[currentSlide].ctaLink && (
                  <div className="flex flex-wrap gap-4">
                    {slides[currentSlide].ctaLink.startsWith('#') ? (
                      <button onClick={() => scrollTo(slides[currentSlide].ctaLink.replace('#', ''))} className="btn-white">
                        {slides[currentSlide].ctaText}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    ) : (
                      <a href={slides[currentSlide].ctaLink} className="btn-white">
                        {slides[currentSlide].ctaText}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}

                {/* Slide Indicators */}
                {slides.length > 1 && (
                  <div className="flex gap-2 pt-2">
                    {slides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => gotoSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-cyan-400' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Default Static Hero */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                    {t.hero.title}
                    <br />
                    <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                      {t.hero.titleHighlight}
                    </span>
                  </h1>
                </div>
                <p
                  className="text-lg text-blue-100/80 leading-relaxed max-w-xl animate-fade-in-up"
                  style={{ animationDelay: '0.2s', opacity: 0 }}
                >
                  {t.hero.subtitle}
                </p>
                <div
                  className="flex flex-wrap gap-4 animate-fade-in-up"
                  style={{ animationDelay: '0.3s', opacity: 0 }}
                >
                  <button onClick={() => scrollTo('products')} className="btn-white">
                    {t.hero.cta1}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollTo('oem')}
                    className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm hover:bg-white/10"
                  >
                    {t.hero.cta2}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {/* Stats */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 animate-fade-in-up"
              style={{ animationDelay: '0.4s', opacity: 0 }}
            >
              {([
                t.hero.stat1, t.hero.stat2, t.hero.stat3, t.hero.stat4,
              ]).map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center hover:bg-white/10 transition-colors"
                >
                  <div className="text-2xl font-bold text-cyan-300">{stat.value}</div>
                  <div className="text-xs text-blue-200/70 mt-0.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Visual */}
          <div className="hidden lg:flex justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <div className="relative w-[420px] h-[420px] flex items-center justify-center">
              {/* AIO PC - center back */}
              <svg className="absolute" width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Glow */}
                <ellipse cx="140" cy="200" rx="90" ry="30" fill="#38BDF8" fillOpacity="0.1"/>
                {/* Stand */}
                <rect x="115" y="190" width="50" height="12" rx="6" fill="white" fillOpacity="0.2"/>
                <rect x="126" y="176" width="28" height="18" rx="4" fill="white" fillOpacity="0.15"/>
                {/* Screen frame */}
                <rect x="30" y="24" width="220" height="158" rx="12" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="1.5" strokeOpacity="0.25"/>
                {/* Screen */}
                <rect x="42" y="36" width="196" height="134" rx="8" fill="#0F172A"/>
                {/* Screen glare */}
                <rect x="42" y="36" width="196" height="22" rx="8" fill="white" fillOpacity="0.06"/>
                {/* Camera */}
                <circle cx="140" cy="28" r="3" fill="#38BDF8" fillOpacity="0.6"/>
                {/* BL logo on screen */}
                <rect x="95" y="75" width="50" height="50" rx="12" fill="url(#logoGrad)"/>
                <text x="120" y="107" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Inter, sans-serif">BL</text>
                {/* Spec lines */}
                <rect x="60" y="144" width="120" height="3" rx="1.5" fill="white" fillOpacity="0.12"/>
                <rect x="70" y="152" width="100" height="3" rx="1.5" fill="white" fillOpacity="0.08"/>
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="100%" stopColor="#06B6D4"/>
                  </linearGradient>
                </defs>
              </svg>

              {/* Mini PC - bottom left */}
              <svg className="absolute" style={{left: -20, bottom: 30}} width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="70" cy="80" rx="45" ry="10" fill="#A855F7" fillOpacity="0.1"/>
                <rect x="15" y="10" width="110" height="70" rx="10" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="1" strokeOpacity="0.2"/>
                <rect x="25" y="20" width="90" height="50" rx="6" fill="#0F172A"/>
                {[28,36,44,52,60].map((y, i) => (
                  <rect key={i} x="33" y={y} width={70 - i * 4} height="2.5" rx="1.25" fill="white" fillOpacity={0.18 - i * 0.02}/>
                ))}
                <circle cx="108" cy="28" r="4" fill="#22C55E" fillOpacity="0.6"/>
              </svg>

              {/* Monitor - top right */}
              <svg className="absolute" style={{right: -15, top: 20}} width="160" height="140" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="80" cy="120" rx="40" ry="8" fill="#10B981" fillOpacity="0.08"/>
                <rect x="60" y="108" width="40" height="18" rx="3" fill="white" fillOpacity="0.15"/>
                <rect x="65" y="10" width="30" height="98" rx="4" fill="white" fillOpacity="0.12"/>
                <rect x="5" y="14" width="150" height="92" rx="6" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="1" strokeOpacity="0.2"/>
                <rect x="13" y="22" width="134" height="76" rx="4" fill="#0F172A"/>
                <rect x="13" y="22" width="134" height="10" rx="4" fill="white" fillOpacity="0.06"/>
                {[40,48,56,64].map((y, i) => (
                  <rect key={i} x="30" y={y} width={100 - i * 8} height="2.5" rx="1.25" fill="white" fillOpacity={0.1 - i * 0.015}/>
                ))}
              </svg>

              {/* Floating badges */}
              <div className="absolute -right-8 top-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-white text-xs animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="font-bold text-cyan-300">CE / FCC</div>
                <div className="text-white/60">Certified</div>
              </div>
              <div className="absolute -left-6 bottom-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-white text-xs animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="font-bold text-cyan-300">OEM Ready</div>
                <div className="text-white/60">Custom Brand</div>
              </div>
              <div className="absolute right-8 bottom-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-white text-xs animate-float" style={{ animationDelay: '2.5s' }}>
                <div className="font-bold text-green-300">ISO 9001</div>
                <div className="text-white/60">Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/40" />
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
