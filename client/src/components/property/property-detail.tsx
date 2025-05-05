import { useState, useEffect } from 'react';
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
  useEffect(() => {
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
          
          {property.title.includes('National Bank') ? (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-gold">Pricing:</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <span className="mr-2 text-neutral-dark font-medium">Rent:</span>
                  <span className="text-primary font-bold text-xl">Ksh {property.price} / Sqft</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-neutral-dark font-medium">Service Charge:</span>
                  <span className="text-primary font-bold text-xl">Ksh 36 / Sqft</span>
                </div>
              </div>
            </div>
          ) : property.title.includes('Blueshield') ? (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-gold">Pricing:</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <span className="mr-2 text-neutral-dark font-medium">Rent:</span>
                  <span className="text-primary font-bold text-xl">Ksh {property.price} / Sqft</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-neutral-dark font-medium">Service Charge:</span>
                  <span className="text-primary font-bold text-xl">Ksh 25 / Sqft</span>
                </div>
              </div>
            </div>
          ) : property.title.includes('Finance House') ? (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-gold">Pricing:</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <span className="mr-2 text-neutral-dark font-medium">Rent:</span>
                  <span className="text-primary font-bold text-xl">Ksh 85 / Sqft</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-neutral-dark font-medium">Service Charge:</span>
                  <span className="text-primary font-bold text-xl">Ksh 30 / Sqft</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center mb-2">
              <span className="text-primary font-bold text-2xl md:text-3xl mr-4">Ksh {property.price.toLocaleString()}</span>
              {/* Calculate price per square foot */}
              {property.type === 'commercial' && (
                <span className="text-neutral text-sm">(Ksh {(property.price / property.size).toFixed(2)}/sq ft)</span>
              )}
            </div>
          )}
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
                    <p className="text-2xl font-bold text-gold">{property.bedrooms}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">Bathrooms</h3>
                    <p className="text-2xl font-bold text-gold">{property.bathrooms}</p>
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
                    <p className="text-2xl font-bold text-gold">{property.offices}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">Parking Spots</h3>
                    <p className="text-2xl font-bold text-gold">{property.parking}</p>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Separator className="my-8" />
        
        {/* Property Manager Information */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Property Manager</h2>
          <AgentCard 
            agent={{
              id: 1,
              name: "Legend Management Ltd",
              position: "Property Manager",
              imageUrl: "/images/logo.png",
              phone: "+254791181166",
              email: "joseph@propertylegend.com"
            }}
          />
        </div>
        
        <Separator className="my-8" />
        
        {/* Contact Section */}
        <div className="bg-gold p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Interested in this property?</h2>
          <p className="mb-4 text-white">Contact us to schedule a viewing or request more information about this property.</p>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-secondary hover:bg-secondary-light"
              onClick={() => window.open(`tel:+254791181166`, '_blank')} 
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Property Manager
            </Button>
            <Button 
              variant="outline" 
              className="border-secondary text-secondary hover:bg-secondary hover:text-white"
              onClick={() => window.open(`mailto:joseph@propertylegend.com?subject=Inquiry about ${property.title} (Ref: PROP-${property.id.toString().padStart(4, '0')})`, '_blank')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Inquiry
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 flex items-center"
              onClick={() => window.open(`https://wa.me/254746369798?text=I'm interested in ${property.title}%0A%0A*Property Reference ID:* PROP-${property.id.toString().padStart(4, '0')}%0A%0APlease send me more information about this property.`, '_blank')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
