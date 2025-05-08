import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Property } from '@shared/types';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SectionHeading from '@/components/ui/section-heading';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  // Get the category type (first word of the title)
  const categoryType = title.split(' ')[0];
  
  return (
    <Link href={href}>
      <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-2">
        {/* Image Section with custom aspect ratio (normal width, fine-tuned height) */}
        <div className="relative overflow-hidden mx-auto" style={{ 
          aspectRatio: '0.9/0.77', /* Standard width with adjusted height */
          width: '100%',
          maxWidth: '100%'
        }}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-contain object-center transition-all duration-1000 ease-in-out group-hover:scale-105"
            style={{ objectPosition: '50% 50%', objectFit: 'cover', transform: 'scale(0.9)' }}
          />
        </div>
        
        {/* Details Section */}
        <div className="p-6 bg-white border-t border-[#D99B32]/20">
          <div className="flex flex-col space-y-4">
            {/* Property Type and Count */}
            <div className="flex items-center justify-between">
              <div className="bg-[#D99B32]/10 text-[#D99B32] font-semibold px-4 py-1.5 rounded-full text-sm flex items-center">
                {categoryType}
                <div className="w-1.5 h-1.5 bg-[#D99B32] rounded-full ml-2 opacity-80"></div>
              </div>
              
              <div className="bg-[#D99B32]/10 text-[#D99B32] px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-[#D99B32] rounded-full"></span>
                {count} {count === 1 ? 'property' : 'properties'}
              </div>
            </div>
            
            {/* Gold Accent Line */}
            <div className="w-16 h-0.5 bg-[#D99B32]"></div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold text-[#2C3E50] hover:text-[#D99B32] transition-colors duration-300 mb-2">{title}</h3>
            
            {/* Description */}
            <p className="text-[#536270]">
              {description}
            </p>
            
            {/* Button */}
            <Button 
              className="w-full mt-2 bg-[#D99B32] hover:bg-[#D99B32]/90 text-white font-medium py-2 rounded-md transition-all duration-300"
            >
              {categoryType === 'Commercial' ? 'View Commercial Properties' : 
               categoryType === 'Residential' ? 'View Residential Properties' : 
               'View Land Properties'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Commercial properties slider component
function CommercialPropertiesSlider({ properties }: { properties: Property[] }) {
  // Modern slider implementation with predefined building images
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  
  // Only display Hazina and NBK photos as requested
  const buildingImages = [
    { name: 'Hazina Trade Centre', image: '/images/categories/commercial/hazina.jpg' },
    { name: 'National Bank', image: '/images/categories/commercial/nbk.jpg' }
  ];
  
  // Set up auto-rotation for buildings
  useEffect(() => {
    if (properties.length === 0) return;
    
    const timer = setTimeout(() => {
      setCurrentPropertyIndex(prevIndex => 
        prevIndex === properties.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [currentPropertyIndex, properties]);
  
  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No commercial properties available at the moment.</p>
      </div>
    );
  }
  
  const property = properties[currentPropertyIndex];
  
  // Find the appropriate building image based on property title
  const getBuildingImage = (property: Property) => {
    // Try to match the property title with one of our predefined buildings
    const building = buildingImages.find(b => 
      property.title.includes(b.name.split(' ')[0])
    );
    
    // Fall back to the property's first image if no match is found
    return building?.image || (property.images && property.images.length > 0 
      ? property.images[0] 
      : '/images/categories/commercial.jpg');
  };
  
  const goToPrevious = () => {
    // Go to previous property
    setCurrentPropertyIndex(prevIndex => 
      prevIndex === 0 ? properties.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    // Go to next property
    setCurrentPropertyIndex(prevIndex => 
      prevIndex === properties.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <div className="group flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
      {/* Simple Image Section with custom aspect ratio (normal width, fine-tuned height) */}
      <div className="relative overflow-hidden mx-auto" style={{ 
        aspectRatio: '0.9/0.77', /* Standard width with adjusted height */
        width: '100%',
        maxWidth: '100%'
      }}>
        {/* Use our high-quality commercial building images with adjusted zoom level */}
        <img 
          src={getBuildingImage(property)} 
          alt={property.title} 
          className="w-full h-full object-contain object-center transition-all duration-1000 ease-in-out group-hover:scale-105"
          style={{ objectPosition: '50% 50%', objectFit: 'cover', transform: 'scale(0.9)' }}
        />
        
        {/* Slider Controls - Kept for functionality but made more subtle */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-4 right-4 flex justify-between z-30">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full bg-white/60 hover:bg-white text-[#D99B32] hover:text-[#D99B32] border-none shadow-md transition-all duration-300"
            onClick={goToPrevious}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full bg-white/60 hover:bg-white text-[#D99B32] hover:text-[#D99B32] border-none shadow-md transition-all duration-300"
            onClick={goToNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Enhanced Details Section with micro-interactions */}
      <div className="p-6 bg-white border-t border-[#D99B32]/20">
        <div className="flex flex-col space-y-4">
          {/* Property Status and Navigation */}
          <div className="flex items-center justify-between mb-2">
            <div className="bg-[#D99B32]/10 text-[#D99B32] font-semibold px-4 py-1.5 rounded-full text-sm flex items-center transform transition-transform duration-300 group-hover:scale-105">
              {property.status}
              <div className="w-1.5 h-1.5 bg-[#D99B32] rounded-full ml-2 opacity-80 animate-pulse-subtle"></div>
            </div>
            
            <div className="bg-[#D99B32]/10 text-[#D99B32] px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 group-hover:bg-[#D99B32]/20">
              <span>{currentPropertyIndex + 1} of {properties.length}</span>
            </div>
          </div>
          
          {/* Animated Gold Accent Line */}
          <div className="w-16 h-0.5 bg-[#D99B32] group-hover:w-24 transition-all duration-500 ease-in-out"></div>
          
          {/* Property Title and Location */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-primary">{property.title}</h3>
            <p className="text-muted-foreground text-sm md:text-base">{property.location}</p>
          </div>
          
          {/* Property Features */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#D99B32]/10 text-[#D99B32] rounded-full text-xs font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-[#D99B32] rounded-full mr-1.5"></span>
              {property.size.toLocaleString()} sq ft
            </span>
            <span className="px-3 py-1 bg-[#D99B32]/10 text-[#D99B32] rounded-full text-xs font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-[#D99B32] rounded-full mr-1.5"></span>
              Commercial
            </span>
            {property.features && property.features.slice(0, 2).map((feature, idx) => (
              <span key={idx} className="px-3 py-1 bg-[#D99B32]/10 text-[#D99B32] rounded-full text-xs font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-[#D99B32] rounded-full mr-1.5"></span>
                {feature}
              </span>
            ))}
          </div>
          
          {/* Brief Description */}
          <p className="text-muted-foreground text-sm">
            {property.description.substring(0, 100)}...
          </p>
          
          {/* Pricing Information */}
          <div className="flex flex-wrap justify-between items-center">
            <div className="space-y-1">
              <span className="text-[#D99B32] text-xs font-medium uppercase">Price</span>
              {property.title.includes('National Bank') ? (
                <div className="flex flex-col">
                  <div className="text-primary font-bold">Rent: Ksh {property.price}/Sqft</div>
                  <div className="text-primary font-bold">Service: Ksh 36/Sqft</div>
                </div>
              ) : property.title.includes('Blueshield') ? (
                <div className="flex flex-col">
                  <div className="text-primary font-bold">Rent: Ksh {property.price}/Sqft</div>
                  <div className="text-primary font-bold">Service: Ksh 25/Sqft</div>
                </div>
              ) : property.title.includes('Finance House') ? (
                <div className="flex flex-col">
                  <div className="text-primary font-bold">Rent: Ksh 85/Sqft</div>
                  <div className="text-primary font-bold">Service: Ksh 30/Sqft</div>
                </div>
              ) : (
                <div className="text-primary text-lg font-bold">
                  Ksh {property.price.toLocaleString()}{property.type === 'commercial' ? ' per sq ft' : ''}
                </div>
              )}
            </div>
            
            <Link href={`/property/${property.id}`} className="mt-2">
              <Button className="bg-[#D99B32] hover:bg-[#D99B32]/90 text-white font-medium py-2 px-6 rounded-md transition-all duration-300">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Pagination Indicators */}
      <div className="bg-white pt-0 pb-4 flex justify-center gap-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentPropertyIndex(index);
              // No longer need to set currentImageIndex since we're using static images
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentPropertyIndex 
                ? 'bg-[#D99B32] scale-125 w-4' 
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
  const getImageForCategory = (propertyList: Property[]): string => {
    const property = propertyList.find(p => p.images && p.images.length > 0);
    return property?.images?.[0] || '/images/placeholder-property.jpg';
  };

  // Use updated high-quality static images for categories
  const commercialImage = '/images/categories/commercial.jpg'; // Updated Hazina Trade Centre image
  const nbkImage = '/images/categories/nbk.jpg'; // National Bank of Kenya image 
  const residentialImage = '/images/categories/residential.jpg'; // Nyayo Estate
  const landImage = '/images/categories/land.jpg'; // Land development

  const categories = [
    {
      id: 'commercial',
      title: 'Commercial Properties',
      description: 'Office spaces, retail outlets, and other commercial real estate opportunities for your business needs.',
      image: nbkImage, // Using National Bank image for the commercial category
      count: commercialProperties.length,
      href: '/properties/category/commercial'
    },
    {
      id: 'residential',
      title: 'Residential Properties',
      description: 'Find your dream home among our selection of houses, apartments, and residential developments.',
      image: residentialImage,
      count: residentialProperties.length,
      href: '/properties/category/residential'
    },
    {
      id: 'land',
      title: 'Land',
      description: 'Investment opportunities in prime land for development or agricultural purposes.',
      image: landImage,
      count: landProperties.length,
      href: '/properties/category/land'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Banner Section with Dark Overlay similar to the shared image */}
      <div className="w-full relative">
        <div className="h-[300px] w-full relative">
          <img 
            src="/images/categories/commercial/hazina.jpg" 
            alt="Commercial Properties" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '50% 50%', transform: 'scale(0.95)' }}
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
            <div className="bg-emerald-500/80 text-white px-4 py-1.5 rounded-full mb-4 text-sm font-medium">
              {commercialProperties.length} Properties Available
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#98ccfd] mb-4">
              Commercial Properties
            </h2>
            <div className="w-16 h-0.5 bg-[#D99B32] mb-4"></div>
            <p className="text-white/90 max-w-2xl">
              Explore our selection of commercial properties including premium office spaces, retail
              outlets, and commercial buildings strategically located across Kenya.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow pt-0 pb-16 bg-white">
        <div className="container mx-auto px-4">
          
          {/* Commercial Properties Showcase */}
          {commercialProperties.length > 0 && (
            <div className="mt-20">
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-3">Featured <span className="text-[#D99B32]">Commercial Properties</span></h2>
                <p className="text-[#536270] text-lg max-w-3xl mx-auto">
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