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
  
  // Apply additional client-side filtering to ensure Chuna Estate only appears in residential
  const properties = (data?.properties || []).filter(property => {
    if (propertyType === 'residential') {
      // In residential category, show Chuna Estate (even if it has another type)
      return property.type === 'residential' || property.title.includes('Chuna');
    } else if (propertyType === 'commercial') {
      // In commercial category, don't show Chuna Estate
      return property.type === 'commercial' && !property.title.includes('Chuna');
    } else {
      // For land category, show only land properties
      return property.type === propertyType;
    }
  });
  
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
  
  // Background images for category headers
  const categoryBackgrounds = {
    commercial: "/images/categories/commercial-bg.jpg",
    residential: "/images/categories/residential-bg.jpg",
    land: "/images/categories/land-bg.jpg"
  };

  // Get default background image based on property type
  const getBgImage = () => {
    // Try to get an actual property image from this category
    const propertyWithImage = properties.find(p => p.images && p.images.length > 0);
    
    if (propertyWithImage && propertyWithImage.images && propertyWithImage.images.length > 0) {
      return propertyWithImage.images[0];
    }
    
    // Fallback to category background or default
    return categoryBackgrounds[propertyType as keyof typeof categoryBackgrounds] || "/images/categories/commercial-bg.jpg";
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Header with Dynamic Background */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getBgImage()}
            alt={categoryDetails[propertyType as keyof typeof categoryDetails].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <div className="bg-black/40 backdrop-blur-sm px-10 py-6 rounded-xl border border-white/10 shadow-xl">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4 text-center text-[#2C3E50] hover:text-[#D99B32] transition-colors duration-300 drop-shadow-xl">
              {categoryDetails[propertyType as keyof typeof categoryDetails].title}
            </h1>
            <div className="w-24 h-1 bg-primary rounded-full mb-6 mx-auto"></div>
            <p className="max-w-3xl text-center text-lg text-white drop-shadow-lg">
              {categoryDetails[propertyType as keyof typeof categoryDetails].description}
            </p>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-8 right-8">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 shadow-lg">
              <span className="font-medium text-white/90">
                {data?.total || 0} {(data?.total || 0) === 1 ? 'Property' : 'Properties'} Available
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          {/* Properties Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading properties...</span>
            </div>
          ) : (
            <>
              {properties.length > 0 ? (
                <>
                  {/* Properties count */}
                  <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-200">
                    <p className="text-lg text-neutral-dark mb-4 md:mb-0">
                      Found <span className="font-semibold text-primary">{data?.total || 0}</span> {(data?.total || 0) === 1 ? 'property' : 'properties'} in this category
                    </p>
                    
                    {/* Filter options could go here if needed */}
                    <div className="flex gap-4">
                      <Button 
                        onClick={() => window.history.back()}
                        variant="outline"
                        size="sm"
                        className="text-sm"
                      >
                        Back to Categories
                      </Button>
                    </div>
                  </div>
                
                  {/* Properties grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {properties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-8 bg-white rounded-xl shadow-sm p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M7 7h.01" />
                        <path d="M7 12h.01" />
                        <path d="M7 17h.01" />
                        <path d="M12 7h5" />
                        <path d="M12 12h5" />
                        <path d="M12 17h5" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-[#2C3E50] hover:text-[#D99B32] transition-colors duration-300">No properties found</h3>
                    <p className="text-neutral-dark mb-8 max-w-2xl mx-auto">
                      We currently don't have any {propertyType} properties available. 
                      Please check back later or explore our other property categories.
                    </p>
                    <Button 
                      onClick={() => window.history.back()}
                      className="mx-auto"
                    >
                      Back to Categories
                    </Button>
                    
                    <div className="w-full h-px bg-neutral-200 my-10 max-w-md mx-auto"></div>
                    
                    <h4 className="text-lg font-semibold text-[#2C3E50] hover:text-[#D99B32] transition-colors duration-300 mt-10 mb-6">Featured Listings You Might Like</h4>
                  </div>
                  
                  {/* Recommended Properties Carousel */}
                  <div className="mt-4 max-w-5xl mx-auto">
                    <RecommendedPropertiesSlider />
                  </div>
                </div>
              )}
              
              {/* Pagination */}
              {properties.length > 0 && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 py-4 border-t border-neutral-200">
                  <div className="text-sm text-neutral-dark order-2 md:order-1">
                    Showing <span className="font-semibold">{(page - 1) * pageSize + 1}</span> to{' '}
                    <span className="font-semibold">
                      {Math.min(page * pageSize, data?.total || 0)}
                    </span>{' '}
                    of <span className="font-semibold">{data?.total || 0}</span> properties
                  </div>
                  
                  <div className="flex gap-2 order-1 md:order-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={page === 1 || isFetching}
                      className="border-primary/30 text-primary hover:bg-primary/5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                        <path d="m15 18-6-6 6-6"/>
                      </svg>
                      Previous
                    </Button>
                    <div className="flex items-center justify-center px-4 h-9 rounded-md bg-primary/5 border border-primary/20">
                      <span className="text-sm font-medium text-primary">
                        {page} of {totalPages}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={page === totalPages || isFetching}
                      className="border-primary/30 text-primary hover:bg-primary/5"
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
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