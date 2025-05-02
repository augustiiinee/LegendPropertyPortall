import { useEffect, useRef } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SectionHeading from '@/components/ui/section-heading';
import { Building2, Map, Users, Briefcase, Award, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate elements when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));
    
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-gold py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-on-scroll opacity-0">About Legend Management</h1>
            <p className="text-white text-lg md:text-xl max-w-4xl mx-auto leading-relaxed animate-on-scroll opacity-0 shadow-sm p-4 bg-gold/90 rounded-lg" style={{ animationDelay: '200ms' }}>
              A premier real estate consultancy with over 22 years of experience providing integrated property solutions across Kenya. Our expertise spans valuation, facility management, leasing, project oversight, and dispute resolution—all delivered with professional integrity.
            </p>
          </div>
        </div>
        
        <section className="py-16 md:py-24" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Our Story" 
              description=""
            />
            
            <div className="max-w-5xl mx-auto mb-16">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-12 animate-on-scroll opacity-0" style={{ animationDelay: '300ms' }}>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Legend Management Limited is a premier real estate consultancy and property management firm with over 22 years of industry experience since our establishment in 2003. We specialize in providing integrated solutions in property valuation, facility management, leasing, project oversight, and dispute resolution—tailored to meet the diverse needs of individual clients, corporations, government agencies, and institutions across Kenya.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  With a presence in Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and Nanyuki, our operations are rooted in professional integrity, industry expertise, and a commitment to client satisfaction. Whether managing residential complexes or overseeing large-scale property portfolios, we deliver efficient, value-driven services that enhance the performance and longevity of our clients' real estate investments.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center animate-on-scroll opacity-0" style={{ animationDelay: '400ms' }}>
                  <Building2 className="w-12 h-12 text-gold mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Property Management</h3>
                  <p className="text-gray-600">Comprehensive management solutions for residential and commercial properties.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center animate-on-scroll opacity-0" style={{ animationDelay: '500ms' }}>
                  <Map className="w-12 h-12 text-gold mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Property Valuation</h3>
                  <p className="text-gray-600">Expert property valuation services for various purposes including sales, taxation, and insurance.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center animate-on-scroll opacity-0" style={{ animationDelay: '600ms' }}>
                  <Briefcase className="w-12 h-12 text-gold mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Facility Management</h3>
                  <p className="text-gray-600">Comprehensive facility management services to maintain and enhance property value.</p>
                </div>
              </div>
            </div>
            
            <SectionHeading 
              title="Our Presence" 
              description=""
            />
            
            <div className="max-w-5xl mx-auto mb-16">
              <div className="bg-white rounded-lg shadow-lg p-8 animate-on-scroll opacity-0" style={{ animationDelay: '700ms' }}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gold">Nairobi</h4>
                    <p className="text-gray-600">Head Office</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gold">Mombasa</h4>
                    <p className="text-gray-600">Coastal Region</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gold">Kisumu</h4>
                    <p className="text-gray-600">Western Region</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gold">Eldoret</h4>
                    <p className="text-gray-600">North Rift Region</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gold">Nakuru</h4>
                    <p className="text-gray-600">Central Region</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gold">Nanyuki</h4>
                    <p className="text-gray-600">Mount Kenya Region</p>
                  </div>
                </div>
              </div>
            </div>
            
            <SectionHeading 
              title="Our Values" 
              description=""
            />
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6 flex items-start animate-on-scroll opacity-0" style={{ animationDelay: '800ms' }}>
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Professional Integrity</h3>
                    <p className="text-gray-600">We maintain the highest standards of professional conduct and transparency in all our dealings.</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 flex items-start animate-on-scroll opacity-0" style={{ animationDelay: '900ms' }}>
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Industry Expertise</h3>
                    <p className="text-gray-600">Our team brings decades of combined experience in Kenya's real estate market.</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 flex items-start animate-on-scroll opacity-0" style={{ animationDelay: '1000ms' }}>
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Client Satisfaction</h3>
                    <p className="text-gray-600">We are dedicated to exceeding client expectations through personalized service delivery.</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 flex items-start animate-on-scroll opacity-0" style={{ animationDelay: '1100ms' }}>
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Value Enhancement</h3>
                    <p className="text-gray-600">We focus on strategies that enhance the performance and longevity of our clients' investments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}