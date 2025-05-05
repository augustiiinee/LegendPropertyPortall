import { useState } from 'react';
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
      <div className="relative h-[450px] group rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-2xl cursor-pointer border-2 border-primary hover:border-primary">
        {/* Image Background with Split Design - Image Shows Clearly on Top Half */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Very light gradient overlay - almost transparent at top */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70 transition-all duration-500"></div>
        </div>
        
        {/* Gold Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/images/gold-pattern.svg')] bg-repeat opacity-15"></div>
        
        {/* Gold frame for top half of image - makes image more visible */}
        <div className="absolute top-0 left-0 right-0 h-1/2 border-2 border-primary/20 border-b-0 rounded-t-lg"></div>
        
        {/* Golden Frame Corners for premium look */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary rounded-br-lg"></div>
        
        {/* Category Label - Enhanced Gold Theme */}
        <div className="absolute top-6 left-6 bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg z-10 text-sm border border-primary/80">
          {title.split(' ')[0]}
        </div>
        
        {/* Property Count Badge - Enhanced Gold Theme */}
        <div className="absolute top-6 right-6 bg-white text-primary px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-primary/80">
          {count} {count === 1 ? 'property' : 'properties'}
        </div>
        
        {/* Main Content - Always Visible */}
        <div className="absolute inset-x-0 bottom-0 p-8">
          {/* Very light semi-transparent background for text readability only */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent rounded-t-lg"></div>
          
          <div className="relative flex flex-col space-y-4">
            {/* Golden Double Accent Lines */}
            <div className="flex flex-col gap-1">
              <div className="w-24 h-1 bg-primary rounded-full"></div>
              <div className="w-16 h-1 bg-primary/70 rounded-full"></div>
            </div>
            
            {/* Title - Larger and Always Visible */}
            <h3 className="text-3xl font-bold font-montserrat text-white drop-shadow-lg">{title}</h3>
            
            {/* Description - Always Visible with better contrast */}
            <p className="text-white/90 text-base font-medium drop-shadow-md">
              {description}
            </p>
            
            {/* Button - Always Visible Gold-themed */}
            <Button 
              className="w-fit mt-3 bg-primary hover:bg-primary/90 text-white shadow-lg transform transition-transform hover:translate-y-[-3px] border border-primary/50"
            >
              View Properties
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Commercial properties slider component
function CommercialPropertiesSlider({ properties }: { properties: Property[] }) {
  // Simple slider implementation
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No commercial properties available at the moment.</p>
      </div>
    );
  }
  
  const property = properties[currentIndex];
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? properties.length - 1 : prevIndex - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === properties.length - 1 ? 0 : prevIndex + 1));
  };
  
  return (
    <div className="relative overflow-hidden rounded-xl shadow-xl border-2 border-primary/30 p-1">
      {/* Gold-themed decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/60 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/60 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/60 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/60 rounded-br-lg"></div>
      
      <div className="relative h-[500px] bg-neutral-100 rounded-lg overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 transform transition-transform duration-1000 hover:scale-105">
          {property.images && property.images.length > 0 ? (
            <img 
              src={property.images[0]} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
              <p className="text-neutral-500">No image available</p>
            </div>
          )}
        </div>
        
        {/* Very light gradient overlay - almost transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/70"></div>
        
        {/* Gold frame for top half of image to make it more visible */}
        <div className="absolute top-0 left-0 right-0 h-1/2 border-2 border-primary/20 border-b-0 rounded-t-lg"></div>
        
        {/* Premium Property Label */}
        <div className="absolute top-8 transform -rotate-45 -left-20 z-20">
          <div className="bg-primary text-white font-bold px-24 py-2 shadow-lg text-xs uppercase tracking-wider">
            Premium Property
          </div>
        </div>
        
        {/* Property count indicator - Gold themed */}
        <div className="absolute top-6 right-6 flex items-center">
          <span className="text-white text-sm font-bold bg-primary border border-primary/30 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            {currentIndex + 1} / {properties.length}
          </span>
        </div>
        
        {/* Property status badge - Gold themed */}
        <div className="absolute top-6 left-16">
          <span className="px-4 py-2 bg-white text-primary border border-primary/30 rounded-full text-sm font-bold shadow-lg">
            {property.status}
          </span>
        </div>
        
        {/* Content container with enhanced readability */}
        <div className="absolute inset-x-0 bottom-0 p-8">
          {/* Very light semi-transparent backdrop for text readability only */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent rounded-t-lg border-t border-primary/30"></div>
          
          <div className="relative">
            {/* Golden Accent double lines */}
            <div className="flex flex-col gap-1 mb-4">
              <div className="w-32 h-1 bg-primary rounded-full"></div>
              <div className="w-20 h-1 bg-primary/70 rounded-full"></div>
            </div>
            
            {/* Property information with better readability */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
              <div className="md:col-span-3">
                <h3 className="text-white text-3xl font-bold mb-2 font-montserrat drop-shadow-md">{property.title}</h3>
                <p className="text-white/90 text-lg mb-3 font-medium">{property.location}</p>
                
                {/* Property features in gold-themed pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/20 border border-primary/40 text-white font-medium rounded-full text-xs">
                    {property.size.toLocaleString()} sq ft
                  </span>
                  <span className="px-3 py-1 bg-primary/20 border border-primary/40 text-white font-medium rounded-full text-xs">
                    Commercial
                  </span>
                  {property.features && property.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-primary/20 border border-primary/40 text-white font-medium rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="text-white text-sm mb-4 font-medium drop-shadow-md">
                  {property.description.substring(0, 150)}...
                </div>
              </div>
              
              <div className="md:col-span-2 flex flex-col md:items-end gap-4">
                <div className="flex flex-col gap-1 items-start md:items-end">
                  <span className="text-primary/90 text-sm font-medium">PRICE</span>
                  <div className="text-white text-2xl font-bold bg-primary/20 border border-primary/30 px-4 py-1 rounded-lg">
                    Ksh {property.price.toLocaleString()}{property.type === 'commercial' ? ' per sq ft' : ''}
                  </div>
                </div>
                
                <Link href={`/property/${property.id}`} className="w-full md:w-auto">
                  <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto text-white font-semibold shadow-xl transform transition-transform hover:translate-y-[-2px] border border-primary/50">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider controls - Gold themed */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 rounded-full bg-primary/20 hover:bg-primary/40 border-primary/50 text-white shadow-lg pointer-events-auto transition-all duration-300 hover:scale-110"
          onClick={goToPrevious}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 rounded-full bg-primary/20 hover:bg-primary/40 border-primary/50 text-white shadow-lg pointer-events-auto transition-all duration-300 hover:scale-110"
          onClick={goToNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Button>
      </div>
      
      {/* Gold-themed indicators */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-primary/10 backdrop-blur-sm py-2 px-6 rounded-full border border-primary/30">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125 border border-white/30' 
                : 'bg-white/60 hover:bg-white/90 border border-primary/30'
            }`}
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
  const commercialProperties = properties.filter((p: Property) => p.type === 'commercial');
  const residentialProperties = properties.filter((p: Property) => p.type === 'residential');
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
      
      {/* Gold-themed hero section */}
      <div className="relative py-12 bg-neutral-900 border-b-4 border-primary/80">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/categories/commercial-bg.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-montserrat">
              Property Categories
            </h1>
            <div className="flex justify-center gap-2 my-6">
              <div className="h-1 w-20 bg-primary rounded-full"></div>
              <div className="h-1 w-10 bg-primary/70 rounded-full"></div>
              <div className="h-1 w-6 bg-primary/50 rounded-full"></div>
            </div>
            <p className="text-lg text-white/90 mb-8">
              Browse our exclusive property listings by category to find the perfect property for your needs.
            </p>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-primary/30 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-primary/30 rounded-bl-3xl"></div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          {/* Categories title with gold accent */}
          <div className="mb-12 relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 -z-10"></div>
            <h2 className="text-3xl font-bold text-neutral-900 pl-6 border-l-4 border-primary">Find Your Ideal Property</h2>
            <p className="mt-4 text-neutral-700 max-w-3xl">
              Choose from our selection of premium properties across different categories designed to meet your specific requirements.
            </p>
          </div>
          
          {/* Categories Grid with enhanced styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
          
          {/* "View All" button with gold theme */}
          <div className="text-center mb-16 relative">
            <div className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            <div className="py-8">
              <Link href="/properties/all">
                <Button size="lg" className="mx-auto bg-primary hover:bg-primary/90 text-white px-8 border border-primary/50 shadow-md">
                  View All Properties
                </Button>
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          </div>
          
          {/* Commercial Properties Showcase with gold-themed heading */}
          {commercialProperties.length > 0 && (
            <div className="mt-16">
              <div className="mb-12 relative">
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold text-neutral-900 font-montserrat relative inline-block">
                    Featured Commercial Properties
                    <div className="absolute -bottom-2 left-0 w-20 h-1 bg-primary rounded-full"></div>
                  </h2>
                  <p className="mt-6 text-neutral-700 max-w-3xl">
                    Discover our prime commercial real estate opportunities perfect for your business needs.
                  </p>
                </div>
                
                {/* Gold corner decorations */}
                <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-primary/30 rounded-tr-lg"></div>
              </div>
              
              <div className="mt-8">
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