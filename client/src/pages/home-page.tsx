import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/home/hero-section';
import AboutSection from '@/components/home/about-section';
import PropertyShowcase from '@/components/home/property-showcase';
import ContactSection from '@/components/home/contact-section';
import { Link } from 'wouter';

// Direct implementation of required components
const TeamSection = () => (
  <section className="py-16 bg-orange-600">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-white mb-8 text-center pb-2 border-b-4 border-white inline-block">OUR LEADERSHIP TEAM</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-primary p-5 rounded-lg shadow-lg border-4 border-yellow-400">
          <p className="font-bold text-yellow-300 text-xl">Mr. Boniface K. Terer</p>
          <p className="text-white text-lg">CEO</p>
          <p className="text-yellow-200">31 years experience</p>
        </div>
        <div className="bg-primary p-5 rounded-lg shadow-lg border-4 border-yellow-400">
          <p className="font-bold text-yellow-300 text-xl">Mr. David C. Ruto</p>
          <p className="text-white text-lg">Director, Agency</p>
          <p className="text-yellow-200">33 years experience</p>
        </div>
        <div className="bg-primary p-5 rounded-lg shadow-lg border-4 border-yellow-400">
          <p className="font-bold text-yellow-300 text-xl">Mr. Geoffrey Koros</p>
          <p className="text-white text-lg">Director, Property Management</p>
          <p className="text-yellow-200">15+ years experience</p>
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="py-16 bg-blue-100">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-primary mb-10 text-center">OUR SERVICES</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
          <h3 className="text-xl font-semibold mb-3">Property Management</h3>
          <p>Comprehensive property management services to maximize returns and preserve value.</p>
          <Link href="/services" className="inline-block mt-4 text-primary font-semibold hover:underline">Learn More</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
          <h3 className="text-xl font-semibold mb-3">Estate Agency</h3>
          <p>Connecting buyers with sellers and tenants with landlords for smooth transactions.</p>
          <Link href="/services" className="inline-block mt-4 text-primary font-semibold hover:underline">Learn More</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
          <h3 className="text-xl font-semibold mb-3">Project Consultancy</h3>
          <p>Expert guidance throughout development projects from feasibility to completion.</p>
          <Link href="/services" className="inline-block mt-4 text-primary font-semibold hover:underline">Learn More</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
          <h3 className="text-xl font-semibold mb-3">Valuation Services</h3>
          <p>Professional valuation for residential, commercial, and industrial properties.</p>
          <Link href="/services" className="inline-block mt-4 text-primary font-semibold hover:underline">Learn More</Link>
        </div>
      </div>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Added Services Section directly in home page */}
        <ServicesSection />
        
        <AboutSection />
        <PropertyShowcase />
        
        {/* Added Team Section directly in home page */}
        <TeamSection />
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
