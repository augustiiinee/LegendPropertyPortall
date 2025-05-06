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
          <Link href="/properties?type=commercial">
            <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-2">
              {/* Image Section */}
              <div className="relative h-[280px] overflow-hidden">
                <img 
                  src="/images/hero/hero2.jpeg" 
                  alt="Commercial Properties" 
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                />
              </div>
              
              {/* Details Section */}
              <div className="p-6 bg-white border-t border-[#D99B32]/20">
                <div className="flex flex-col space-y-4">
                  {/* Gold Accent Line */}
                  <div className="w-16 h-0.5 bg-[#D99B32]"></div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#D99B32] mb-2">Commercial Properties</h3>
                  
                  {/* Description */}
                  <p className="text-[#536270]">
                    Office spaces, retail outlets, and other commercial real estate opportunities for your business needs.
                  </p>
                  
                  {/* Button */}
                  <Button className="w-full mt-2 bg-[#D99B32] hover:bg-[#D99B32]/90 text-white font-medium py-2 rounded-md transition-all duration-300">
                    View Commercial Properties
                  </Button>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Residential Properties Card */}
          <Link href="/properties?type=residential">
            <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-2">
              {/* Image Section */}
              <div className="relative h-[280px] overflow-hidden">
                <img 
                  src="/images/hero/hero1.jpeg" 
                  alt="Residential Properties" 
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                />
              </div>
              
              {/* Details Section */}
              <div className="p-6 bg-white border-t border-[#D99B32]/20">
                <div className="flex flex-col space-y-4">
                  {/* Gold Accent Line */}
                  <div className="w-16 h-0.5 bg-[#D99B32]"></div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#D99B32] mb-2">Residential Properties</h3>
                  
                  {/* Description */}
                  <p className="text-[#536270]">
                    Find your dream home among our selection of houses, apartments, and residential developments.
                  </p>
                  
                  {/* Button */}
                  <Button className="w-full mt-2 bg-[#D99B32] hover:bg-[#D99B32]/90 text-white font-medium py-2 rounded-md transition-all duration-300">
                    View Residential Properties
                  </Button>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Land Properties Card */}
          <Link href="/properties?type=land">
            <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-2">
              {/* Image Section */}
              <div className="relative h-[280px] overflow-hidden">
                <img 
                  src="/images/hero/nyayo-estate.jpg" 
                  alt="Land Properties" 
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                />
              </div>
              
              {/* Details Section */}
              <div className="p-6 bg-white border-t border-[#D99B32]/20">
                <div className="flex flex-col space-y-4">
                  {/* Gold Accent Line */}
                  <div className="w-16 h-0.5 bg-[#D99B32]"></div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#D99B32] mb-2">Land</h3>
                  
                  {/* Description */}
                  <p className="text-[#536270]">
                    Investment opportunities in prime land for development or agricultural purposes.
                  </p>
                  
                  {/* Button */}
                  <Button className="w-full mt-2 bg-[#D99B32] hover:bg-[#D99B32]/90 text-white font-medium py-2 rounded-md transition-all duration-300">
                    View Land Properties
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
