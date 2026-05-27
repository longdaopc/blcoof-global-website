import SEOHead from './components/SEOHead';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import OEM from './components/OEM';
import WhyUs from './components/WhyUs';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import Analytics from './components/Analytics';
import { I18nProvider } from './context/I18nContext';

function App() {
  return (
    <I18nProvider>
      <SEOHead />
      <Analytics />
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Products />
          <OEM />
          <WhyUs />
          <Certifications />
          <Testimonials />
          <Blog />
          <Contact />
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </I18nProvider>
  );
}

export default App;
