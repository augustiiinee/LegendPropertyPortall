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
      <div className="relative h-[450px] group rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl cursor-pointer border border-transparent hover:border-primary/20">
        {/* Image Background with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-90 transition-opacity duration-500"></div>
        </div>
        
        {/* Category Label */}
        <div className="absolute top-4 left-4 bg-primary/90 text-white px-4 py-2 rounded-full font-semibold shadow-md z-10 text-sm">
          {title.split(' ')[0]}
        </div>
        
        {/* Property Count Badge */}
        <div className="absolute top-4 right-4 bg-white/90 text-primary px-3 py-1 rounded-full text-sm font-bold shadow-md">
          {count} {count === 1 ? 'property' : 'properties'}
        </div>
        
        {/* Content Container */}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
          <div className="flex flex-col space-y-3">
            {/* Golden Accent Line */}
            <div className="w-12 h-1 bg-primary rounded-full transition-all duration-500 group-hover:w-20"></div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold font-montserrat">{title}</h3>
            
            {/* Description - Hidden until hover */}
            <p className="text-white/90 text-sm max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500">
              {description}
            </p>
            
            {/* Button - Visible on hover */}
            <Button 
              className="w-fit mt-3 bg-primary hover:bg-primary/90 shadow-lg transform transition-all duration-300 opacity-0 group-hover:opacity-100"
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
    <div className="relative overflow-hidden rounded-xl shadow-xl bg-gradient-to-r from-blue-900/10 to-blue-700/10 p-1">
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
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        {/* Property count indicator */}
        <div className="absolute top-6 right-6 flex items-center">
          <span className="text-white text-sm font-medium bg-primary/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            {currentIndex + 1} / {properties.length}
          </span>
        </div>
        
        {/* Property status badge */}
        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 bg-white/90 text-primary rounded-full text-sm font-bold shadow-md">
            {property.status}
          </span>
        </div>
        
        {/* Content container */}
        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
          {/* Accent line */}
          <div className="w-20 h-1 bg-primary rounded-full mb-4"></div>
          
          {/* Property information */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
            <div className="md:col-span-3">
              <h3 className="text-white text-3xl font-bold mb-2 font-montserrat">{property.title}</h3>
              <p className="text-white/80 text-lg mb-3">{property.location}</p>
              
              {/* Property features in pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-800/70 text-white/90 rounded-full text-xs">
                  {property.size.toLocaleString()} sq ft
                </span>
                <span className="px-3 py-1 bg-gray-800/70 text-white/90 rounded-full text-xs">
                  Commercial
                </span>
                {property.features && property.features.slice(0, 2).map((feature, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-800/70 text-white/90 rounded-full text-xs">
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="text-white/90 text-sm line-clamp-2 mb-4">
                {property.description.substring(0, 120)}...
              </div>
            </div>
            
            <div className="md:col-span-2 flex flex-col md:items-end gap-4">
              <div className="text-white text-2xl font-bold">
                Ksh {property.price.toLocaleString()}{property.type === 'commercial' ? ' per sq ft' : ''}
              </div>
              
              <Link href={`/property/${property.id}`} className="w-full md:w-auto">
                <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto text-white font-semibold shadow-xl transform transition-transform hover:translate-y-[-2px]">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider controls - Larger, more prominent */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/30 border-white/30 text-white shadow-lg pointer-events-auto transition-all duration-300 hover:scale-110"
          onClick={goToPrevious}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/30 border-white/30 text-white shadow-lg pointer-events-auto transition-all duration-300 hover:scale-110"
          onClick={goToNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Button>
      </div>
      
      {/* Enhanced indicators */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-110' 
                : 'bg-white/50 hover:bg-white/70'
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
      <main className="flex-grow py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Property Categories"
            description="Browse our property listings by category to find what suits your needs."
          />
          
          {/* Categories Grid */}
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
          
          <div className="text-center mb-16">
            <Link href="/properties/all">
              <Button size="lg" className="mx-auto">
                View All Properties
              </Button>
            </Link>
          </div>
          
          {/* Commercial Properties Showcase */}
          {commercialProperties.length > 0 && (
            <div className="mt-16">
              <SectionHeading
                title="Featured Commercial Properties"
                description="Discover our prime commercial real estate opportunities."
                className="text-left"
              />
              
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