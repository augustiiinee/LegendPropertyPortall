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
        <SectionHeading
          title="Explore Our Property Categories"
          description="Discover our diverse portfolio of commercial, residential and land properties across Kenya"
        />
        
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
          
          {/* Residential Properties Card - with enhanced micro-interactions */}
          <div className="group rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col">
            {/* Image Section with micro-interactions */}
            <div className="relative h-64 overflow-hidden">
              {/* Main image with hover effect */}
              <img 
                src="/images/hero/hero1.jpeg" 
                alt="Residential Properties" 
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 filter group-hover:brightness-105"
              />
              
              {/* Overlay gradient appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Category type badge with slide-in animation */}
              <div className="absolute bottom-4 left-4 transform transition-transform duration-500 translate-x-[-100%] group-hover:translate-x-0">
                <span className="inline-flex items-center rounded-md bg-white/90 backdrop-blur-sm px-3 py-1.5 text-sm font-medium shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#D99B32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <path d="M9 22V12h6v10" />
                  </svg>
                  <span className="text-gray-700">Residential</span>
                </span>
              </div>
              
              {/* Property count badge with scale effect */}
              <div className="absolute top-4 right-4 transform transition-all duration-500 scale-0 group-hover:scale-100">
                <span className="inline-flex items-center rounded-full bg-[#D99B32]/80 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white shadow-md">
                  {residentialCount} {residentialCount === 1 ? 'property' : 'properties'}
                </span>
              </div>
              
              {/* View button appears in center on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="bg-white/90 hover:bg-white text-[#D99B32] font-medium px-6 py-2 rounded-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out shadow-lg hover:shadow-xl">
                  View Residential Properties
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Details Section with enhanced styling and animations */}
            <div className="p-6 bg-white border-t border-[#D99B32]/20 flex-grow">
              <div className="flex flex-col space-y-4">
                {/* Property Type and Count */}
                <div className="flex items-center justify-between">
                  <div className="bg-[#D99B32]/10 text-[#D99B32] font-semibold px-4 py-1.5 rounded-full text-sm flex items-center transform transition-transform duration-300 group-hover:scale-105">
                    Residential
                    <div className="w-1.5 h-1.5 bg-[#D99B32] rounded-full ml-2 opacity-80 animate-pulse-subtle"></div>
                  </div>
                  
                  <div className="bg-[#D99B32]/10 text-[#D99B32] px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 group-hover:bg-[#D99B32]/20">
                    <span className="inline-block w-2 h-2 bg-[#D99B32] rounded-full animate-pulse-subtle"></span>
                    {residentialCount} {residentialCount === 1 ? 'property' : 'properties'}
                  </div>
                </div>
                
                {/* Animated Gold Accent Line */}
                <div className="w-16 h-0.5 bg-[#D99B32] group-hover:w-24 transition-all duration-500 ease-in-out"></div>
                
                {/* Title with color transition */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-[#D99B32] transition-colors duration-300">Residential Properties</h3>
                  <p className="text-muted-foreground text-sm transform group-hover:translate-x-1 transition-transform duration-500 ease-in-out">
                    Luxury homes, apartments and housing developments across Kenya
                  </p>
                </div>
                
                {/* Enhanced View Button */}
                <Link href="/properties?type=residential" className="block mt-2">
                  <Button className="bg-transparent hover:bg-gold w-full text-primary border border-[#D99B32]/30 hover:text-white hover:border-transparent transition-all duration-300 font-semibold group-hover:shadow-md">
                    <span>View Residential Properties</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Land Properties Card - with enhanced micro-interactions */}
          <div className="group rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col">
            {/* Image Section with micro-interactions */}
            <div className="relative h-64 overflow-hidden">
              {/* Main image with hover effect */}
              <img 
                src="/images/hero/nyayo-estate.jpg" 
                alt="Land Properties" 
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 filter group-hover:brightness-105"
              />
              
              {/* Overlay gradient appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Category type badge with slide-in animation */}
              <div className="absolute bottom-4 left-4 transform transition-transform duration-500 translate-x-[-100%] group-hover:translate-x-0">
                <span className="inline-flex items-center rounded-md bg-white/90 backdrop-blur-sm px-3 py-1.5 text-sm font-medium shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#D99B32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9" />
                    <rect x="2" y="16" width="20" height="6" rx="2" />
                  </svg>
                  <span className="text-gray-700">Land</span>
                </span>
              </div>
              
              {/* Property count badge with scale effect */}
              <div className="absolute top-4 right-4 transform transition-all duration-500 scale-0 group-hover:scale-100">
                <span className="inline-flex items-center rounded-full bg-[#D99B32]/80 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white shadow-md">
                  {landCount} {landCount === 1 ? 'property' : 'properties'}
                </span>
              </div>
              
              {/* View button appears in center on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="bg-white/90 hover:bg-white text-[#D99B32] font-medium px-6 py-2 rounded-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out shadow-lg hover:shadow-xl">
                  View Land Properties
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Details Section with enhanced styling and animations */}
            <div className="p-6 bg-white border-t border-[#D99B32]/20 flex-grow">
              <div className="flex flex-col space-y-4">
                {/* Property Type and Count */}
                <div className="flex items-center justify-between">
                  <div className="bg-[#D99B32]/10 text-[#D99B32] font-semibold px-4 py-1.5 rounded-full text-sm flex items-center transform transition-transform duration-300 group-hover:scale-105">
                    Land
                    <div className="w-1.5 h-1.5 bg-[#D99B32] rounded-full ml-2 opacity-80 animate-pulse-subtle"></div>
                  </div>
                  
                  <div className="bg-[#D99B32]/10 text-[#D99B32] px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 group-hover:bg-[#D99B32]/20">
                    <span className="inline-block w-2 h-2 bg-[#D99B32] rounded-full animate-pulse-subtle"></span>
                    {landCount} {landCount === 1 ? 'property' : 'properties'}
                  </div>
                </div>
                
                {/* Animated Gold Accent Line */}
                <div className="w-16 h-0.5 bg-[#D99B32] group-hover:w-24 transition-all duration-500 ease-in-out"></div>
                
                {/* Title with color transition */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-[#D99B32] transition-colors duration-300">Land Properties</h3>
                  <p className="text-muted-foreground text-sm transform group-hover:translate-x-1 transition-transform duration-500 ease-in-out">
                    Prime land parcels for development, agriculture, and investment
                  </p>
                </div>
                
                {/* Enhanced View Button */}
                <Link href="/properties?type=land" className="block mt-2">
                  <Button className="bg-transparent hover:bg-gold w-full text-primary border border-[#D99B32]/30 hover:text-white hover:border-transparent transition-all duration-300 font-semibold group-hover:shadow-md">
                    <span>View Land Properties</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
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
