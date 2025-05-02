import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from '@/components/property/property-card';
import SectionHeading from '@/components/ui/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Property } from '@shared/types';

// Recommended Properties Slider Component - exported for reuse
export function RecommendedPropertiesSlider() {
  const { data: allProperties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties/featured'],
    // Default queryFn will be used from queryClient
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const properties = allProperties || [];
  // Responsive visible properties: 1 on mobile, 2 on desktop
  const [visibleProperties, setVisibleProperties] = useState(2);
  
  // Update visible properties based on screen size
  useEffect(() => {
    const handleResize = () => {
      setVisibleProperties(window.innerWidth < 768 ? 1 : 2);
    };
    
    // Initial calculation
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate max index based on number of properties
  const maxIndex = Math.max(0, properties.length - visibleProperties);
  
  // Use useCallback to prevent recreating function on each render
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);
  
  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);
  
  // Handle slider transform effect
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * (100 / visibleProperties)}%)`;
    }
  }, [currentIndex, visibleProperties]);
  
  // Touch swipe functionality for mobile
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    let startX: number;
    let isDragging = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;
      
      // Prevent scroll when swiping horizontally
      if (Math.abs(diff) > 5) {
        e.preventDefault();
      }
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const currentX = e.changedTouches[0].clientX;
      const diff = startX - currentX;
      
      // Swipe right to left (next)
      if (diff > 50 && currentIndex < maxIndex) {
        nextSlide();
      }
      
      // Swipe left to right (previous)
      if (diff < -50 && currentIndex > 0) {
        prevSlide();
      }
      
      isDragging = false;
    };
    
    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: false });
    slider.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, maxIndex, nextSlide, prevSlide]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!properties.length) {
    return (
      <div className="text-center py-4">
        <p>No properties available at the moment.</p>
      </div>
    );
  }
  
  return (
    <div className="relative px-4">
      {/* Slider Navigation Title */}
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-gray-700 font-medium">Browse Featured Properties</h5>
        <div className="flex space-x-2">
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full bg-white shadow-md text-primary hover:bg-gray-50 transition-colors ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`p-2 rounded-full bg-white shadow-md text-primary hover:bg-gray-50 transition-colors ${currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Slider Container */}
      <div className="overflow-hidden">
        <div 
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: `${properties.length * (100 / visibleProperties)}%` }}
        >
          {properties.map((property) => (
            <div 
              key={property.id} 
              className="px-2"
              style={{ width: `${100 / visibleProperties}%` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 mb-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 mx-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-110 shadow-sm' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function PropertyShowcase() {
  const [accordionValue, setAccordionValue] = useState<string>("item-1"); // Default to open
  
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties/featured'],
    // Default queryFn will be used from queryClient
  });
  
  return (
    <section id="properties" className="py-16 md:py-24 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Featured Properties"
          description="Browse our exclusive selection of properties available for sale through our recently awarded tender."
        />
        
        <Accordion 
          type="single" 
          collapsible 
          className="w-full" 
          value={accordionValue} 
          onValueChange={setAccordionValue}
        >
          <AccordionItem value="item-1" className="border-0">
            <div className="flex justify-between items-center border-b-2 border-gray-100 pb-2">
              <div className="flex-1">
                <AccordionTrigger className="flex items-center py-0 hover:no-underline [&>svg]:hidden w-full justify-start cursor-pointer">
                  <div className="flex items-center group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <h3 className="text-base font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">Latest Properties</h3>
                    <ChevronDown className={`h-4 w-4 ml-2 text-blue-500 transition-transform duration-200 ${accordionValue === "item-1" ? "rotate-180" : ""} group-hover:text-blue-600`} />
                  </div>
                </AccordionTrigger>
              </div>
              <Link href="/properties" className="flex items-center text-blue-500 hover:text-blue-700 font-medium transition-colors text-sm ml-4">
                View All Properties
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <AccordionContent className="mt-6 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
              {/* Property Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
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
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 py-4">
                    <div className="text-center mb-6">
                      <p className="text-neutral-dark">No properties found matching your criteria.</p>
                      <h4 className="text-lg font-semibold text-primary mt-6 mb-4">Featured Listings You Might Like</h4>
                    </div>
                    
                    {/* Recommended Properties Carousel */}
                    <div className="mt-4">
                      <RecommendedPropertiesSlider />
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
