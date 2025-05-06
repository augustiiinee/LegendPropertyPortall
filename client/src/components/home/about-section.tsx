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
          <div className="group flex flex-col gap-4">
            {/* Image Card - Completely separate with no overlay */}
            <div className="rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src="/images/hero/hero2.jpeg" 
                  alt="Commercial Properties" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
            
            {/* Details Card - Completely separate */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col space-y-4">
                {/* Property Type and Count */}
                <div className="flex items-center justify-between">
                  <div className="bg-[#D99B32]/10 text-[#D99B32] font-semibold px-4 py-1.5 rounded-full text-sm flex items-center">
                    Commercial
                    <div className="w-1.5 h-1.5 bg-[#D99B32] rounded-full ml-2 opacity-80"></div>
                  </div>
                  
                  <div className="bg-[#D99B32]/10 text-[#D99B32] px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-[#D99B32] rounded-full"></span>
                    {commercialCount} {commercialCount === 1 ? 'property' : 'properties'}
                  </div>
                </div>
                
                {/* Gold Accent Line */}
                <div className="w-16 h-0.5 bg-[#D99B32]"></div>
                
                {/* Title and Description */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Commercial Properties</h3>
                  <p className="text-muted-foreground text-sm">
                    Office spaces, retail outlets and commercial buildings in prime locations
                  </p>
                </div>
                
                {/* View Button */}
                <Link href="/properties?type=commercial" className="block mt-2">
                  <Button className="bg-transparent hover:bg-gold w-full text-primary border border-[#D99B32]/30 hover:text-white hover:border-transparent transition-all duration-300 font-semibold">
                    View Commercial Properties
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Residential Properties Card */}
          <div className="group flex flex-col gap-4">
            {/* Image Card - Completely separate with no overlay */}
            <div className="rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src="/images/hero/hero1.jpeg" 
                  alt="Residential Properties" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
            
            {/* Details Card - Completely separate */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col space-y-4">
                {/* Property Type and Count */}
                <div className="flex items-center justify-between">
                  <div className="bg-[#D99B32]/10 text-[#D99B32] font-semibold px-4 py-1.5 rounded-full text-sm flex items-center">
                    Residential
                    <div className="w-1.5 h-1.5 bg-[#D99B32] rounded-full ml-2 opacity-80"></div>
                  </div>
                  
                  <div className="bg-[#D99B32]/10 text-[#D99B32] px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-[#D99B32] rounded-full"></span>
                    {residentialCount} {residentialCount === 1 ? 'property' : 'properties'}
                  </div>
                </div>
                
                {/* Gold Accent Line */}
                <div className="w-16 h-0.5 bg-[#D99B32]"></div>
                
                {/* Title and Description */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Residential Properties</h3>
                  <p className="text-muted-foreground text-sm">
                    Luxury homes, apartments and housing developments across Kenya
                  </p>
                </div>
                
                {/* View Button */}
                <Link href="/properties?type=residential" className="block mt-2">
                  <Button className="bg-transparent hover:bg-gold w-full text-primary border border-[#D99B32]/30 hover:text-white hover:border-transparent transition-all duration-300 font-semibold">
                    View Residential Properties
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Land Properties Card */}
          <div className="group flex flex-col gap-4">
            {/* Image Card - Completely separate with no overlay */}
            <div className="rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src="/images/hero/nyayo-estate.jpg" 
                  alt="Land Properties" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
            
            {/* Details Card - Completely separate */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col space-y-4">
                {/* Property Type and Count */}
                <div className="flex items-center justify-between">
                  <div className="bg-[#D99B32]/10 text-[#D99B32] font-semibold px-4 py-1.5 rounded-full text-sm flex items-center">
                    Land
                    <div className="w-1.5 h-1.5 bg-[#D99B32] rounded-full ml-2 opacity-80"></div>
                  </div>
                  
                  <div className="bg-[#D99B32]/10 text-[#D99B32] px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-[#D99B32] rounded-full"></span>
                    {landCount} {landCount === 1 ? 'property' : 'properties'}
                  </div>
                </div>
                
                {/* Gold Accent Line */}
                <div className="w-16 h-0.5 bg-[#D99B32]"></div>
                
                {/* Title and Description */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Land Properties</h3>
                  <p className="text-muted-foreground text-sm">
                    Prime land parcels for development, agriculture, and investment
                  </p>
                </div>
                
                {/* View Button */}
                <Link href="/properties?type=land" className="block mt-2">
                  <Button className="bg-transparent hover:bg-gold w-full text-primary border border-[#D99B32]/30 hover:text-white hover:border-transparent transition-all duration-300 font-semibold">
                    View Land Properties
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
