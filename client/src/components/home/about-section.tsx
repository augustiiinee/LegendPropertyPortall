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
          <div className="group bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              {/* Gold Accent Line */}
              <div className="w-16 h-0.5 bg-[#D99B32] mb-4"></div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-[#D99B32] mb-3">Commercial Properties</h3>
              
              {/* Description */}
              <p className="text-[#536270] mb-6">
                Office spaces, retail outlets, and other commercial real estate opportunities for your business needs.
              </p>
              
              {/* Button */}
              <Link href="/properties?type=commercial">
                <Button className="bg-[#D99B32] hover:bg-[#D99B32]/90 w-full text-white font-medium py-2 rounded-md transition-all duration-300">
                  View Commercial Properties
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Residential Properties Card */}
          <div className="group bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              {/* Gold Accent Line */}
              <div className="w-16 h-0.5 bg-[#D99B32] mb-4"></div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">Residential Properties</h3>
              
              {/* Description */}
              <p className="text-[#536270] mb-6">
                Find your dream home among our selection of houses, apartments, and residential developments.
              </p>
              
              {/* Button */}
              <Link href="/properties?type=residential">
                <Button className="bg-[#D99B32] hover:bg-[#D99B32]/90 w-full text-white font-medium py-2 rounded-md transition-all duration-300">
                  View Residential Properties
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Land Properties Card */}
          <div className="group bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              {/* Gold Accent Line */}
              <div className="w-16 h-0.5 bg-[#D99B32] mb-4"></div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">Land</h3>
              
              {/* Description */}
              <p className="text-[#536270] mb-6">
                Investment opportunities in prime land for development or agricultural purposes.
              </p>
              
              {/* Button */}
              <Link href="/properties?type=land">
                <Button className="bg-[#D99B32] hover:bg-[#D99B32]/90 w-full text-white font-medium py-2 rounded-md transition-all duration-300">
                  View Land Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
