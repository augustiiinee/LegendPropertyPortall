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
          <div className="group relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="relative" style={{ 
              backgroundImage: `url('/images/hero/hero2.jpeg')`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center'
            }}>
              {/* Content section */}
              <div className="h-64 relative">
                <div className="absolute inset-0 bg-primary/40 transition-opacity group-hover:bg-primary/30"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 text-shadow">Commercial Properties</h3>
                  <p className="text-white text-sm mb-4 text-shadow">
                    Office spaces, retail outlets and commercial buildings in prime locations
                  </p>
                  <p className="text-white font-medium text-shadow">{commercialCount} Properties</p>
                </div>
              </div>
              
              {/* Button section - Same background continues */}
              <div className="relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative p-4 text-center">
                  <Link href="/properties?type=commercial" className="block">
                    <Button className="bg-transparent hover:bg-gold w-full text-white border border-white/30 hover:border-transparent transition-all duration-300 font-semibold">
                      View Commercial Properties
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Residential Properties Card */}
          <div className="group relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="relative" style={{ 
              backgroundImage: `url('/images/hero/hero1.jpeg')`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center'
            }}>
              {/* Content section */}
              <div className="h-64 relative">
                <div className="absolute inset-0 bg-primary/40 transition-opacity group-hover:bg-primary/30"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 text-shadow">Residential Properties</h3>
                  <p className="text-white text-sm mb-4 text-shadow">
                    Luxury homes, apartments and housing developments across Kenya
                  </p>
                  <p className="text-white font-medium text-shadow">{residentialCount} Properties</p>
                </div>
              </div>
              
              {/* Button section - Same background continues */}
              <div className="relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative p-4 text-center">
                  <Link href="/properties?type=residential" className="block">
                    <Button className="bg-transparent hover:bg-gold w-full text-white border border-white/30 hover:border-transparent transition-all duration-300 font-semibold">
                      View Residential Properties
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Land Properties Card */}
          <div className="group relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="relative" style={{ 
              backgroundImage: `url('/images/hero/nyayo-estate.jpg')`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center'
            }}>
              {/* Content section */}
              <div className="h-64 relative">
                <div className="absolute inset-0 bg-primary/40 transition-opacity group-hover:bg-primary/30"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 text-shadow">Land Properties</h3>
                  <p className="text-white text-sm mb-4 text-shadow">
                    Prime land parcels for development, agriculture, and investment
                  </p>
                  <p className="text-white font-medium text-shadow">{landCount} Properties</p>
                </div>
              </div>
              
              {/* Button section - Same background continues */}
              <div className="relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative p-4 text-center">
                  <Link href="/properties?type=land" className="block">
                    <Button className="bg-transparent hover:bg-gold w-full text-white border border-white/30 hover:border-transparent transition-all duration-300 font-semibold">
                      View Land Properties
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
