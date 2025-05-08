import { Link } from 'wouter';
import SectionHeading from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Property } from '@shared/types';

export default function PropertyCategoriesSection() {
  const { data: properties } = useQuery<Property[]>({
    queryKey: ['/api/properties/featured'],
  });
  
  // Get count of properties by type
  const commercialCount = properties?.filter(p => p.type === 'commercial').length || 0;
  const residentialCount = properties?.filter(p => p.type === 'residential').length || 0;
  const landCount = properties?.filter(p => p.type === 'land').length || 0;
  
  return (
    <section id="categories" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-3">Explore Our <span className="text-[#D99B32]">Property</span> Categories</h2>
          <p className="text-[#536270] text-lg max-w-3xl mx-auto">Discover our diverse portfolio of commercial, residential and land properties across Kenya</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Commercial Properties Card */}
          <Link href="/properties/category/commercial">
            <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-2">
              {/* Image Section */}
              <div className="relative h-[360px] overflow-hidden">
                <img 
                  src="/images/categories/commercial.jpg" 
                  alt="Commercial Properties" 
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                />
              </div>
              
              {/* Details Section */}
              <div className="p-6 bg-white border-t border-[#D99B32]/20">
                <div className="flex flex-col space-y-4">
                  {/* Gold Accent Line */}
                  <div className="w-24 h-1 bg-[#D99B32] rounded-full shadow-sm"></div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#2C3E50] hover:text-[#D99B32] transition-colors duration-300 mb-3 relative">
                    <span className="relative z-10">Commercial Properties</span>
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#D99B32] group-hover:w-full transition-all duration-300"></span>
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#536270] leading-relaxed">
                    Office spaces, retail outlets, and other commercial real estate opportunities for your business needs.
                  </p>
                  
                  {/* Button */}
                  <Button className="w-full mt-4 bg-[#D99B32] hover:bg-gradient-to-r hover:from-[#D99B32] hover:to-[#B67B21] text-white font-semibold py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-[#D99B32]/20">
                    <span className="flex items-center justify-center">
                      View Commercial Properties
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Residential Properties Card */}
          <Link href="/properties/category/residential">
            <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-2">
              {/* Image Section */}
              <div className="relative h-[360px] overflow-hidden">
                <img 
                  src="/images/categories/residential.jpg" 
                  alt="Residential Properties" 
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                />
              </div>
              
              {/* Details Section */}
              <div className="p-6 bg-white border-t border-[#D99B32]/20">
                <div className="flex flex-col space-y-4">
                  {/* Gold Accent Line */}
                  <div className="w-24 h-1 bg-[#D99B32] rounded-full shadow-sm"></div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#2C3E50] hover:text-[#D99B32] transition-colors duration-300 mb-3 relative">
                    <span className="relative z-10">Residential Properties</span>
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#D99B32] group-hover:w-full transition-all duration-300"></span>
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#536270] leading-relaxed">
                    Find your dream home among our selection of houses, apartments, and residential developments.
                  </p>
                  
                  {/* Button */}
                  <Button className="w-full mt-4 bg-[#D99B32] hover:bg-gradient-to-r hover:from-[#D99B32] hover:to-[#B67B21] text-white font-semibold py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-[#D99B32]/20">
                    <span className="flex items-center justify-center">
                      View Residential Properties
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Land Properties Card */}
          <Link href="/properties/category/land">
            <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-2">
              {/* Image Section */}
              <div className="relative h-[360px] overflow-hidden">
                <img 
                  src="/images/categories/land.jpg" 
                  alt="Land Properties" 
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                />
              </div>
              
              {/* Details Section */}
              <div className="p-6 bg-white border-t border-[#D99B32]/20">
                <div className="flex flex-col space-y-4">
                  {/* Gold Accent Line */}
                  <div className="w-24 h-1 bg-[#D99B32] rounded-full shadow-sm"></div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#2C3E50] hover:text-[#D99B32] transition-colors duration-300 mb-3 relative">
                    <span className="relative z-10">Land</span>
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#D99B32] group-hover:w-full transition-all duration-300"></span>
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#536270] leading-relaxed">
                    Investment opportunities in prime land for development or agricultural purposes.
                  </p>
                  
                  {/* Button */}
                  <Button className="w-full mt-4 bg-[#D99B32] hover:bg-gradient-to-r hover:from-[#D99B32] hover:to-[#B67B21] text-white font-semibold py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-[#D99B32]/20">
                    <span className="flex items-center justify-center">
                      View Land Properties
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
