import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/home/hero-section';
import PropertyCategoriesSection from '@/components/home/about-section';
import PropertyShowcase from '@/components/home/property-showcase';
import ContactSection from '@/components/home/contact-section';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <PropertyCategoriesSection />
        <PropertyShowcase />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
