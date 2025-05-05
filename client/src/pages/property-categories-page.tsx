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
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer h-full group">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-sm opacity-90">{count} {count === 1 ? 'property' : 'properties'} available</p>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-neutral-dark text-sm line-clamp-2">{description}</p>
          <Button 
            variant="link" 
            className="p-0 mt-2 text-primary font-semibold"
          >
            View Properties →
          </Button>
        </CardContent>
      </Card>
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
    <div className="relative overflow-hidden rounded-xl shadow-md">
      <div className="relative h-96 bg-neutral-100">
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
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-white text-2xl font-bold mb-2">{property.title}</h3>
          <p className="text-white/90 mb-4">{property.location}</p>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-primary text-white rounded-full text-sm font-semibold">
              {property.status}
            </span>
            <span className="text-white font-semibold">
              Ksh {property.price.toLocaleString()}{property.type === 'commercial' ? ' per sq ft' : ''}
            </span>
          </div>
          <Link href={`/properties/${property.id}`}>
            <Button className="mt-4 bg-white text-primary hover:bg-white/90">
              View Details
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Slider controls */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-between px-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-white/80 hover:bg-white"
          onClick={goToPrevious}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-white/80 hover:bg-white"
          onClick={goToNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Button>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
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