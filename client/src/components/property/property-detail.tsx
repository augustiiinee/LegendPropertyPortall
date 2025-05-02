import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Property } from '@shared/types';
import AgentCard from './agent-card';

type PropertyDetailProps = {
  propertyId: string;
};

export default function PropertyDetail({ propertyId }: PropertyDetailProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { data: property, isLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
    // Default queryFn will be used from queryClient
  });
  
  // Update current slide index when carousel moves
  React.useEffect(() => {
    if (!api) return;
    
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
          <div className="h-96 bg-neutral-light mb-6 rounded-lg"></div>
          <div className="h-10 bg-neutral-light w-3/4 mb-4 rounded"></div>
          <div className="h-6 bg-neutral-light w-1/3 mb-6 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="h-20 bg-neutral-light rounded"></div>
            <div className="h-20 bg-neutral-light rounded"></div>
            <div className="h-20 bg-neutral-light rounded"></div>
          </div>
          <div className="h-32 bg-neutral-light rounded mb-8"></div>
        </div>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Property Not Found</h2>
          <p>The requested property could not be found or has been removed.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
        {/* Image Carousel */}
        <div className="mb-8">
          {property.images && property.images.length > 0 ? (
            <div className="relative">
              <Carousel setApi={setApi}>
                <CarouselContent>
                  {property.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="h-64 md:h-96 w-full">
                        <img 
                          src={image} 
                          alt={`${property.title} - Image ${index + 1}`} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              
              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                {currentSlide + 1} / {property.images.length}
              </div>
            </div>
          ) : (
            <div className="h-64 md:h-96 bg-neutral-light flex items-center justify-center rounded-lg">
              <p className="text-neutral">No images available</p>
            </div>
          )}
        </div>
        
        {/* Property Header */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-between items-start mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">{property.title}</h1>
            <div>
              <Badge variant="secondary" className="text-white">
                {property.status.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center text-neutral mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{property.location}</span>
          </div>
          
          <div className="flex flex-wrap items-center mb-2">
            <span className="text-primary font-bold text-2xl md:text-3xl mr-4">${property.price.toLocaleString()}</span>
            {property.pricePerSqFt && (
              <span className="text-neutral text-sm">(${property.pricePerSqFt}/sq ft)</span>
            )}
          </div>
        </div>
        
        {/* Property Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-1">Property Size</h3>
                <p className="text-2xl font-bold text-primary">{property.size} sq ft</p>
              </div>
            </CardContent>
          </Card>
          
          {property.type === 'residential' && (
            <>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">Bedrooms</h3>
                    <p className="text-2xl font-bold text-primary">{property.bedrooms}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">Bathrooms</h3>
                    <p className="text-2xl font-bold text-primary">{property.bathrooms}</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
          
          {property.type === 'commercial' && (
            <>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">Offices</h3>
                    <p className="text-2xl font-bold text-primary">{property.offices}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">Parking Spots</h3>
                    <p className="text-2xl font-bold text-primary">{property.parking}</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
        
        {/* Property Description */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Description</h2>
          <p className="text-neutral-dark whitespace-pre-line">{property.description}</p>
        </div>
        
        {/* Property Features */}
        {property.features && property.features.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Separator className="my-8" />
        
        {/* Contact Section */}
        <div className="bg-neutral-lightest p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Interested in this property?</h2>
          <p className="mb-4">Contact us to schedule a viewing or request more information about this property.</p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-secondary hover:bg-secondary-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Agent
            </Button>
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Inquiry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
