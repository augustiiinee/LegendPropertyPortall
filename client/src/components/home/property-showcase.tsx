import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/property/property-card';
import PropertyFilters from '@/components/property/property-filters';
import SectionHeading from '@/components/ui/section-heading';
import { Property } from '@shared/types';

export default function PropertyShowcase() {
  const [filters, setFilters] = useState({
    location: 'all',
    propertyType: 'all',
    priceRange: 'all'
  });
  
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties', { ...filters, limit: 3 }],
    // Default queryFn will be used from queryClient
  });
  
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };
  
  return (
    <section id="properties" className="py-16 md:py-24 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Featured Properties"
          description="Browse our exclusive selection of properties available for sale through our recently awarded tender."
        />
        
        {/* Property Filters */}
        <PropertyFilters onFilterChange={handleFilterChange} />
        
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
        
        {/* View All Properties Button */}
        <div className="text-center mt-12">
          <Link href="/properties">
            <Button className="bg-primary hover:bg-primary-light text-white font-montserrat font-semibold px-8 py-3 rounded-md transition transform hover:scale-105">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
