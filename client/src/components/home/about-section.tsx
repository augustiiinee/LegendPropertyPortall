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
            <div className="h-64 relative">
              <img 
                src="/images/hero/hero2.jpeg" 
                alt="Commercial Properties" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/60 transition-opacity group-hover:bg-primary/40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Commercial</h3>
                <p className="text-white text-sm mb-4">
                  Office spaces, retail outlets and commercial buildings in prime locations
                </p>
                <p className="text-white font-medium">{commercialCount} Properties</p>
              </div>
            </div>
            <div className="p-4 bg-white text-center">
              <Link href="/properties?type=commercial">
                <Button className="bg-gold hover:bg-gold/90 w-full">
                  View Commercial Properties
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Residential Properties Card */}
          <div className="group relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="h-64 relative">
              <img 
                src="/images/hero/hero1.jpeg" 
                alt="Residential Properties" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/60 transition-opacity group-hover:bg-primary/40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Residential</h3>
                <p className="text-white text-sm mb-4">
                  Luxury homes, apartments and housing developments across Kenya
                </p>
                <p className="text-white font-medium">{residentialCount} Properties</p>
              </div>
            </div>
            <div className="p-4 bg-white text-center">
              <Link href="/properties?type=residential">
                <Button className="bg-gold hover:bg-gold/90 w-full">
                  View Residential Properties
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Land Properties Card */}
          <div className="group relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="h-64 relative">
              <img 
                src="/images/hero/nyayo-estate.jpg" 
                alt="Land Properties" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/60 transition-opacity group-hover:bg-primary/40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Land</h3>
                <p className="text-white text-sm mb-4">
                  Prime land parcels for development, agriculture, and investment
                </p>
                <p className="text-white font-medium">{landCount} Properties</p>
              </div>
            </div>
            <div className="p-4 bg-white text-center">
              <Link href="/properties?type=land">
                <Button className="bg-gold hover:bg-gold/90 w-full">
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
