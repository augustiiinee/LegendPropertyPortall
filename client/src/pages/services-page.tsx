import { useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ServicesContent from '@/components/services/services-content';

export default function ServicesPage() {
  useEffect(() => {
    console.log("Services page loaded");
    document.title = "Our Services | Legend Management Ltd";
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ServicesContent />
      <Footer />
    </div>
  );
}