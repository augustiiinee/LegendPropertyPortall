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
  
  // Debug log
  console.log("Featured properties:", properties.map(p => ({ id: p.id, title: p.title, status: p.status })));
  
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
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties/featured'],
    // Default queryFn will be used from queryClient
  });
  
  // Group properties by type
  const commercialProperties = properties?.filter(p => p.type === 'commercial') || [];
  const residentialProperties = properties?.filter(p => p.type === 'residential') || [];
  const landProperties = properties?.filter(p => p.type === 'land') || [];
  
  return (
    <section id="properties" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Properties</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our exclusive selection of premium properties available for sale and lease
          </p>
        </div>
        
        {/* Knight Frank style tabs */}
        <div className="mb-8 max-w-5xl mx-auto">
          <div className="border-b border-gray-300 flex justify-center">
            <button className="py-3 px-6 font-medium text-gray-800 border-b-2 border-gold">
              Featured Properties
            </button>
          </div>
        </div>
        
        {/* Main property carousel */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            <RecommendedPropertiesSlider />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Commercial Properties Card */}
              <div className="group relative rounded-md overflow-hidden shadow-md transition-transform hover:shadow-xl hover:-translate-y-1">
                <div className="h-64 bg-gray-200 relative">
                  {commercialProperties.length > 0 && (
                    <img 
                      src={commercialProperties[0].images?.[0] || '/images/commercial-placeholder.jpg'} 
                      alt="Commercial Properties" 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-xl text-white font-bold mb-1">Commercial</h3>
                    <p className="text-white text-sm">{commercialProperties.length} properties available</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">Prime commercial spaces in strategic locations across Kenya</p>
                  <Link href="/properties?type=commercial" className="inline-flex items-center text-gold hover:text-gold/80 font-semibold">
                    View All Commercial Properties
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Residential Properties Card */}
              <div className="group relative rounded-md overflow-hidden shadow-md transition-transform hover:shadow-xl hover:-translate-y-1">
                <div className="h-64 bg-gray-200 relative">
                  {residentialProperties.length > 0 && (
                    <img 
                      src={residentialProperties[0].images?.[0] || '/images/residential-placeholder.jpg'} 
                      alt="Residential Properties" 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-xl text-white font-bold mb-1">Residential</h3>
                    <p className="text-white text-sm">{residentialProperties.length} properties available</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">Exceptional homes designed for modern living across sought-after locations</p>
                  <Link href="/properties?type=residential" className="inline-flex items-center text-gold hover:text-gold/80 font-semibold">
                    View All Residential Properties
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Land Properties Card */}
              <div className="group relative rounded-md overflow-hidden shadow-md transition-transform hover:shadow-xl hover:-translate-y-1">
                <div className="h-64 bg-gray-200 relative">
                  {landProperties.length > 0 ? (
                    <img 
                      src={landProperties[0].images?.[0] || '/images/land.jpg'} 
                      alt="Land Properties" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src="/images/land.jpg" 
                      alt="Land Properties" 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-xl text-white font-bold mb-1">Land</h3>
                    <p className="text-white text-sm">{landProperties.length} properties available</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-600 mb-4">Investment-ready land parcels with potential for development</p>
                  <Link href="/properties?type=land" className="inline-flex items-center text-gold hover:text-gold/80 font-semibold">
                    View All Land Properties
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/properties" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gold hover:bg-gold/90 md:py-4 md:text-lg md:px-10 transition-all">
                View All Properties
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600 mb-8">No properties available at the moment.</p>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gold hover:bg-gold/90 md:py-4 md:text-lg md:px-10 transition-all">
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
