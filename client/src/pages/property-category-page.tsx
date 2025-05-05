import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { Property } from '@shared/types';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PropertyCard from '@/components/property/property-card';
import SectionHeading from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { RecommendedPropertiesSlider } from '@/components/home/property-showcase';

// Component to display a specific property type (commercial, residential, land)
export default function PropertyCategoryPage() {
  // Get category from URL parameters
  const params = useParams<{ category: string }>();
  const category = params?.category || 'commercial';
  
  // Validate category
  const validCategories = ['commercial', 'residential', 'land'];
  const propertyType = validCategories.includes(category) ? category : 'commercial';
  
  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 9;
  
  // Get properties of the specified type
  const { data, isLoading, isFetching } = useQuery<{
    properties: Property[];
    total: number;
    pages: number;
  }>({
    queryKey: ['/api/properties', { propertyType, page, pageSize }],
  });
  
  const properties = data?.properties || [];
  const totalPages = data?.pages || 1;
  
  // Category details
  const categoryDetails = {
    commercial: {
      title: "Commercial Properties",
      description: "Explore our selection of commercial properties including premium office spaces, retail outlets, and commercial buildings strategically located across Kenya."
    },
    residential: {
      title: "Residential Properties",
      description: "Find your ideal home from our wide range of residential properties, including family homes, apartments, and luxury villas in prime locations."
    },
    land: {
      title: "Land Properties",
      description: "Invest in our selection of land properties suitable for development, agriculture, or long-term investment, located in high-growth areas across Kenya."
    }
  };
  
  // Handle pagination
  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  // Scroll to top when changing pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={categoryDetails[propertyType as keyof typeof categoryDetails].title}
            description={categoryDetails[propertyType as keyof typeof categoryDetails].description}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="py-8">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                    <p className="text-neutral-dark mb-8">
                      We currently don't have any {propertyType} properties available. 
                      Please check back later or explore our other property categories.
                    </p>
                    <Button 
                      onClick={() => window.history.back()}
                      variant="outline"
                      className="mb-8"
                    >
                      Back to Categories
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