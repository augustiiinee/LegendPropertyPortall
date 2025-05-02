import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/home/hero-section';
import AboutSection from '@/components/home/about-section';
import PropertyShowcase from '@/components/home/property-showcase';
import DirectorsSection from '@/components/home/directors-section';
import ContactSection from '@/components/home/contact-section';
import AdminDashboardPreview from '@/components/home/admin-dashboard-preview';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <PropertyShowcase />
        <DirectorsSection />
        <ContactSection />
        <AdminDashboardPreview />
      </main>
      <Footer />
    </div>
  );
}
