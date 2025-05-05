import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Property } from '@shared/types';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SectionHeading from '@/components/ui/section-heading';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RecommendedPropertiesSlider } from '@/components/home/property-showcase';

// Component to display a category
function CategoryCard({ 
  title, 
  description, 
  image, 
  count, 
  href 
}: { 
  title: string; 
  description: string; 
  image: string; 
  count: number;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="relative h-[480px] group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
        {/* Subtle elegant border */}
        <div className="absolute inset-0 border border-[#D99B32]/20 rounded-xl z-20 pointer-events-none"></div>
        
        {/* Image Background - Premium presentation */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Premium glass-morphic overlay that enhances the image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80"></div>
        </div>
        
        {/* Modern Glass-morphic Status Ribbon */}
        <div className="absolute top-6 left-0 z-10">
          <div className="bg-[#D99B32] backdrop-blur-sm text-white font-semibold px-6 py-2 rounded-r-full shadow-md text-sm flex items-center">
            {title.split(' ')[0]}
            <div className="w-1.5 h-1.5 bg-white rounded-full ml-2 opacity-80"></div>
          </div>
        </div>
        
        {/* Property Count - Elegant Floating Badge */}
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-[#D99B32] px-4 py-1.5 rounded-full text-sm font-medium shadow-md border border-white/20 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#D99B32] rounded-full"></span>
          {count} {count === 1 ? 'property' : 'properties'}
        </div>
        
        {/* Main Content - Premium Floating Card */}
        <div className="absolute inset-x-4 bottom-4 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg">
          <div className="relative flex flex-col space-y-3">
            {/* Elegant Single Gold Accent */}
            <div className="w-16 h-0.5 bg-[#D99B32]"></div>
            
            {/* Title - Modern & Elegant */}
            <h3 className="text-2xl md:text-3xl font-bold font-montserrat text-white">{title}</h3>
            
            {/* Description - Clean & Refined */}
            <p className="text-white/90 text-sm md:text-base font-normal">
              {description}
            </p>
            
            {/* Stylish Button with Arrow Icon */}
            <Button 
              className="w-fit mt-3 bg-[#D99B32] hover:bg-[#D99B32]/90 text-white font-medium shadow-md transition-all duration-300 rounded-full px-6 group-hover:translate-x-1"
            >
              <span>View Properties</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Commercial properties slider component
function CommercialPropertiesSlider({ properties }: { properties: Property[] }) {
  // Modern slider implementation with image cycling
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Reference to keep track of which property we're viewing
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Set up auto-rotation for images
  useEffect(() => {
    if (properties.length === 0) return;
    
    const property = properties[currentPropertyIndex];
    const imageCount = property.images?.length || 0;
    
    if (imageCount <= 1) return;
    
    const timer = setTimeout(() => {
      // First cycle through all images of current property
      if (currentImageIndex < imageCount - 1) {
        setCurrentImageIndex(prevIndex => prevIndex + 1);
      } else {
        // When we've seen all images, move to next property
        setCurrentImageIndex(0);
        setCurrentPropertyIndex(prevIndex => 
          prevIndex === properties.length - 1 ? 0 : prevIndex + 1
        );
      }
      
      // Update the global index counter for pagination dots
      setCurrentIndex(prevIndex => prevIndex + 1);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [currentPropertyIndex, currentImageIndex, properties]);
  
  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No commercial properties available at the moment.</p>
      </div>
    );
  }
  
  const property = properties[currentPropertyIndex];
  
  const goToPrevious = () => {
    // First check if we're mid-way through images of current property
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prevIndex => prevIndex - 1);
    } else {
      // Go to previous property
      const prevPropertyIndex = currentPropertyIndex === 0 ? properties.length - 1 : currentPropertyIndex - 1;
      setCurrentPropertyIndex(prevPropertyIndex);
      
      // Set image to last image of that property
      const imageCount = properties[prevPropertyIndex].images?.length || 0;
      setCurrentImageIndex(Math.max(0, imageCount - 1));
    }
    
    // Decrement the global index counter
    setCurrentIndex(prevIndex => prevIndex - 1);
  };
  
  const goToNext = () => {
    const imageCount = property.images?.length || 0;
    
    // First check if we should move to next image of current property
    if (currentImageIndex < imageCount - 1) {
      setCurrentImageIndex(prevIndex => prevIndex + 1);
    } else {
      // Go to next property
      setCurrentPropertyIndex(prevIndex => prevIndex === properties.length - 1 ? 0 : prevIndex + 1);
      setCurrentImageIndex(0);
    }
    
    // Increment the global index counter
    setCurrentIndex(prevIndex => prevIndex + 1);
  };
  
  return (
    <div className="relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Subtle border for premium look */}
      <div className="absolute inset-0 border border-[#D99B32]/20 rounded-xl z-20 pointer-events-none"></div>
      
      <div className="relative h-[500px] rounded-xl overflow-hidden">
        {/* Image slider with all property photos */}
        <div className="absolute inset-0 transform transition-transform duration-1000 hover:scale-105">
          {property.images && property.images.length > 0 ? (
            <div className="relative w-full h-full">
              <img 
                src={property.images[currentImageIndex % property.images.length]} 
                alt={`${property.title} - Image ${currentImageIndex + 1}`} 
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              
              {/* Image counter badge */}
              {property.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white rounded-full px-3 py-1 text-xs font-medium">
                  {(currentImageIndex % property.images.length) + 1} / {property.images.length}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
              <p className="text-neutral-500">No image available</p>
            </div>
          )}
          
          {/* Premium overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80"></div>
        </div>
        
        {/* Premium Diagonal Ribbon */}
        <div className="absolute top-6 -left-16 z-20 transform rotate-[-45deg]">
          <div className="bg-[#D99B32] text-white font-medium px-20 py-2 shadow-lg text-xs uppercase tracking-wider flex items-center justify-center">
            <span className="mr-2">Premium</span>
            <div className="w-1 h-1 bg-white rounded-full opacity-80"></div>
            <span className="ml-2">Property</span>
          </div>
        </div>
        
        {/* Property Navigation Indicator - Modern Glass Design */}
        <div className="absolute top-6 right-6 flex items-center">
          <span className="bg-white/80 backdrop-blur-sm text-[#D99B32] rounded-full px-4 py-1.5 text-sm font-medium shadow-sm border border-white/30 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-[#D99B32] rounded-full"></span>
            {currentPropertyIndex + 1} of {properties.length}
          </span>
        </div>
        
        {/* Property Status Badge - Elegant Design */}
        <div className="absolute top-6 left-24">
          <span className="px-4 py-1.5 bg-[#D99B32]/90 text-white rounded-full text-sm font-medium shadow-md">
            {property.status}
          </span>
        </div>
        
        {/* Content Container - Glass Card Design */}
        <div className="absolute inset-x-4 bottom-4 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl">
          <div className="relative">
            {/* Minimalist Gold Accent */}
            <div className="w-20 h-0.5 bg-[#D99B32] mb-4"></div>
            
            {/* Property Information - Clean Layout */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
              <div className="md:col-span-3">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 font-montserrat">{property.title}</h3>
                <p className="text-white/90 text-base md:text-lg mb-3 font-medium">{property.location}</p>
                
                {/* Property Features - Modern Capsules */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full text-xs flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#D99B32] rounded-full mr-1.5"></span>
                    {property.size.toLocaleString()} sq ft
                  </span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full text-xs flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#D99B32] rounded-full mr-1.5"></span>
                    Commercial
                  </span>
                  {property.features && property.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full text-xs flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#D99B32] rounded-full mr-1.5"></span>
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="text-white/90 text-sm mb-4 font-normal">
                  {property.description.substring(0, 120)}...
                </div>
              </div>
              
              <div className="md:col-span-2 flex flex-col md:items-end gap-4">
                <div className="flex flex-col gap-1 items-start md:items-end">
                  <span className="text-[#D99B32] text-xs font-medium uppercase tracking-wider">Price</span>
                  <div className="text-white text-xl md:text-2xl font-bold bg-[#D99B32]/20 backdrop-blur-sm border border-[#D99B32]/20 px-4 py-1 rounded-lg">
                    Ksh {property.price.toLocaleString()}{property.type === 'commercial' ? ' per sq ft' : ''}
                  </div>
                </div>
                
                <Link href={`/property/${property.id}`} className="w-full md:w-auto">
                  <Button className="bg-[#D99B32] hover:bg-[#D99B32]/90 w-full md:w-auto text-white font-medium shadow-md transition-all duration-300 rounded-full px-6 py-2 border-none">
                    <span>View Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-2">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider Controls - Modern Design */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm text-[#D99B32] hover:bg-white border-0 shadow-lg pointer-events-auto transition-all duration-300 hover:scale-105"
          onClick={goToPrevious}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm text-[#D99B32] hover:bg-white border-0 shadow-lg pointer-events-auto transition-all duration-300 hover:scale-105"
          onClick={goToNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Button>
      </div>
      
      {/* Pagination Indicators - Modern Minimalist */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 py-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentPropertyIndex(index);
              setCurrentImageIndex(0);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentPropertyIndex 
                ? 'bg-[#D99B32] scale-125 w-6' 
                : 'bg-gray-300 hover:bg-[#D99B32]/60'
            }`}
            aria-label={`Go to property ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function PropertyCategoriesPage() {
  // Get all properties to calculate counts and display examples
  const { data, isLoading } = useQuery<{
    properties: Property[];
    total: number;
    pages: number;
  }>({
    queryKey: ['/api/properties', { page: 1, pageSize: 100 }], // Get all properties for this page
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16 bg-neutral-lightest flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading property categories...</span>
        </main>
        <Footer />
      </div>
    );
  }
  
  const properties = data?.properties || [];
  
  // Filter properties by type
  // Make sure Chuna Estate only appears in residential properties
  const commercialProperties = properties.filter((p: Property) => 
    p.type === 'commercial' && !p.title.includes('Chuna')
  );
  const residentialProperties = properties.filter((p: Property) => 
    p.type === 'residential' || p.title.includes('Chuna')
  );
  const landProperties = properties.filter((p: Property) => p.type === 'land');
  
  // Find a representative image for each category
  const getFirstImageFromCategory = (propertyList: Property[]) => {
    const property = propertyList.find((p: Property) => p.images && p.images.length > 0);
    return property?.images?.[0] || '/images/placeholder-property.jpg';
  };
  
  const categories = [
    {
      id: 'commercial',
      title: 'Commercial Properties',
      description: 'Office spaces, retail outlets, and other commercial real estate opportunities for your business needs.',
      image: getFirstImageFromCategory(commercialProperties),
      count: commercialProperties.length,
      href: '/properties/category/commercial'
    },
    {
      id: 'residential',
      title: 'Residential Properties',
      description: 'Find your dream home among our selection of houses, apartments, and residential developments.',
      image: getFirstImageFromCategory(residentialProperties),
      count: residentialProperties.length,
      href: '/properties/category/residential'
    },
    {
      id: 'land',
      title: 'Land',
      description: 'Investment opportunities in prime land for development or agricultural purposes.',
      image: getFirstImageFromCategory(landProperties),
      count: landProperties.length,
      href: '/properties/category/land'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Modern Hero Section with Glass Effect */}
      <div className="relative py-16 sm:py-20 bg-white">
        {/* Premium Background with Subtle Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/categories/commercial-bg.jpg')] bg-cover bg-center opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/90"></div>
        </div>
        
        {/* Golden Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <div className="absolute bottom-[-10px] left-0 right-0 h-24 bg-gradient-to-t from-[#D99B32]/5 to-transparent"></div>
          <svg className="absolute bottom-0 w-full h-12 fill-[#D99B32]/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Modern Centered Content */}
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="h-0.5 w-16 bg-[#D99B32]"></div>
                <div className="h-0.5 w-8 bg-[#D99B32]/70 ml-auto mt-1"></div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 font-montserrat leading-tight">
                Explore Our <span className="text-[#D99B32]">Property</span> Categories
              </h1>
              
              <p className="text-base sm:text-lg text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Browse our exclusive collection of premium properties across different categories, 
                designed to meet your specific requirements and preferences.
              </p>

              {/* Modern Glass Button */}
              <div className="inline-block rounded-full bg-neutral-100 shadow-sm p-1">
                <div className="flex space-x-1">
                  <span className="px-5 py-2 rounded-full bg-[#D99B32]/90 text-white text-sm font-medium">
                    Premium Properties
                  </span>
                  <span className="px-5 py-2 rounded-full text-neutral-600 text-sm">
                    Trusted Expertise
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Modern Section Heading with Gold Accent */}
          <div className="mb-16 relative text-center">
            <span className="inline-block h-0.5 w-12 bg-[#D99B32] mb-2"></span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-montserrat mb-3">
              Find Your <span className="text-[#D99B32]">Ideal Property</span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-base leading-relaxed">
              Choose from our selection of premium properties across different categories, 
              each meticulously vetted to ensure exceptional quality and value.
            </p>
            
            {/* Decorative Elements */}
            <div className="hidden md:block absolute top-1/2 left-4 -translate-y-1/2 w-24 h-24">
              <div className="w-full h-full border-l-2 border-t-2 border-[#D99B32]/20"></div>
            </div>
            <div className="hidden md:block absolute top-1/2 right-4 -translate-y-1/2 w-24 h-24">
              <div className="w-full h-full border-r-2 border-b-2 border-[#D99B32]/20"></div>
            </div>
          </div>
          
          {/* Categories Grid with Modern Styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id}
                title={category.title}
                description={category.description}
                image={category.image}
                count={category.count}
                href={category.href}
              />
            ))}
          </div>
          
          {/* Modern Divider with Premium Button */}
          <div className="text-center mb-20 relative">
            <div className="py-4 relative">
              {/* Decorative Lines */}
              <div className="absolute left-0 top-1/2 w-full h-px -translate-y-1/2">
                <div className="h-full bg-gradient-to-r from-transparent via-[#D99B32]/20 to-transparent"></div>
              </div>
              
              {/* Modern Pill Button */}
              <Link href="/properties/all">
                <Button 
                  size="lg" 
                  className="relative mx-auto bg-[#D99B32] hover:bg-[#D99B32]/90 text-white font-medium px-8 py-3 rounded-full border-none shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <span className="mr-2">View All Properties</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Commercial Properties Showcase with Modern Heading */}
          {commercialProperties.length > 0 && (
            <div className="mt-20">
              <div className="mb-12 text-center">
                <span className="inline-block h-0.5 w-10 bg-[#D99B32] mb-2"></span>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 font-montserrat mb-4">
                  Featured <span className="text-[#D99B32]">Commercial Properties</span>
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto text-base leading-relaxed">
                  Discover our premium commercial real estate opportunities perfectly suited for ambitious businesses 
                  looking for strategic locations with exceptional amenities.
                </p>
              </div>
              
              <div className="mt-10">
                <CommercialPropertiesSlider properties={commercialProperties} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}