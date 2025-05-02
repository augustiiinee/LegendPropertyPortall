import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import PropertyCard from '@/components/property/property-card';
import SectionHeading from '@/components/ui/section-heading';
import { Property } from '@shared/types';

export default function PropertyShowcase() {
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties', { limit: 3 }],
    // Default queryFn will be used from queryClient
  });
  
  return (
    <section id="properties" className="py-16 md:py-24 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Featured Properties"
          description="Browse our exclusive selection of properties available for sale through our recently awarded tender."
        />
        
        {/* Latest Properties and View All heading */}
        <div className="flex justify-between items-center mb-8 border-b-2 border-gray-100 pb-2">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <h3 className="text-base font-medium text-gray-700">Latest Properties</h3>
          </div>
          <Link href="/properties" className="flex items-center text-blue-500 hover:text-blue-700 font-medium transition-colors text-sm">
            View All Properties
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loaders for properties
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-56 bg-neutral-light animate-pulse"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-neutral-light animate-pulse rounded"></div>
                  <div className="h-4 bg-neutral-light animate-pulse rounded w-3/4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-neutral-light animate-pulse rounded w-1/4"></div>
                    <div className="h-4 bg-neutral-light animate-pulse rounded w-1/4"></div>
                    <div className="h-4 bg-neutral-light animate-pulse rounded w-1/4"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-neutral-light animate-pulse rounded w-1/3"></div>
                    <div className="h-4 bg-neutral-light animate-pulse rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))
          ) : properties && properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8">
              <p className="text-neutral-dark">No properties found matching your criteria. Please try different filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
