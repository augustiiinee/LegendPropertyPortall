import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearch } from 'wouter';
import { Property } from '@shared/types';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PropertyCard from '@/components/property/property-card';
import PropertyFilters from '@/components/property/property-filters';
import SectionHeading from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { RecommendedPropertiesSlider } from '@/components/home/property-showcase';

export default function PropertiesPage() {
  // Get URL search parameters
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const typeParam = searchParams.get('type');
  
  // Filters
  const [filters, setFilters] = useState({
    location: 'all',
    propertyType: typeParam || 'all',
    priceRange: 'all'
  });
  
  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 9;
  
  // Get properties with filters and pagination
  const { data, isLoading, isFetching } = useQuery<{
    properties: Property[];
    total: number;
    pages: number;
  }>({
    queryKey: ['/api/properties', { ...filters, page, pageSize }],
    // Default queryFn will be used from queryClient
  });
  
  const properties = data?.properties || [];
  const totalPages = data?.pages || 1;
  
  // Debug log properties
  console.log("Properties from API:", properties.map(p => ({ id: p.id, title: p.title, status: p.status })));
  
  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);
  
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };
  
  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={typeParam ? 
              `${typeParam.charAt(0).toUpperCase() + typeParam.slice(1)} Properties` : 
              "Our Properties"
            }
            description="Browse our exclusive selection of properties available for sale and management."
          />
          
          {/* Property Filters */}
          <PropertyFilters 
            onFilterChange={handleFilterChange} 
            initialFilters={filters}
          />
          
          {/* Properties Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading properties...</span>
            </div>
          ) : (
            <>
              {properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {properties.map((property) => (
                    <div key={property.id} className="flex justify-center">
                      <div className="w-full max-w-xs">
                        <PropertyCard property={property} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                    <p className="text-neutral-dark mb-8">
                      We couldn't find any properties matching your criteria. Try adjusting your filters or explore our featured listings below.
                    </p>
                    <Button 
                      onClick={() => setFilters({ location: 'all', propertyType: 'all', priceRange: 'all' })}
                      variant="outline"
                      className="mb-8"
                    >
                      Reset Filters
                    </Button>
                    
                    <h4 className="text-lg font-semibold text-primary mt-10 mb-6">Featured Listings You Might Like</h4>
                  </div>
                  
                  {/* Recommended Properties Carousel */}
                  <div className="mt-4 max-w-5xl mx-auto">
                    <RecommendedPropertiesSlider />
                  </div>
                </div>
              )}
              
              {/* Pagination */}
              {properties.length > 0 && (
                <div className="flex justify-between items-center mt-12">
                  <div className="text-sm text-neutral-dark">
                    Showing <span className="font-semibold">{(page - 1) * pageSize + 1}</span> to{' '}
                    <span className="font-semibold">
                      {Math.min(page * pageSize, data?.total || 0)}
                    </span>{' '}
                    of <span className="font-semibold">{data?.total || 0}</span> properties
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={page === 1 || isFetching}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center justify-center px-3 h-9 rounded-md border">
                      <span className="text-sm">
                        Page <span className="font-medium">{page}</span> of{' '}
                        <span className="font-medium">{totalPages}</span>
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={page === totalPages || isFetching}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
