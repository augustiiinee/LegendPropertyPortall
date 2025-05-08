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
import UchumiHouseGallery from './uchumi-house-gallery';

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
        {/* Enhanced Image Carousel with micro-interactions */}
        <div className="mb-8">
          {property.title.includes('Uchumi House') ? (
            /* Use our special Uchumi House Gallery component for Uchumi property */
            <UchumiHouseGallery property={property} />
          ) : property.images && property.images.length > 0 ? (
            <div className="relative overflow-hidden rounded-xl shadow-xl group">
              <Carousel setApi={setApi} className="transition-all duration-500">
                <CarouselContent>
                  {property.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="h-80 md:h-[31.2rem] w-full bg-gray-50 overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${property.title} - Image ${index + 1}`} 
                          className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105 filter hover:brightness-105"
                        />
                        
                        {/* Elegant overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Enhanced navigation buttons */}
                <CarouselPrevious className="left-4 bg-white/80 hover:bg-white text-[#D99B32] hover:text-[#D99B32] border-none shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110" />
                <CarouselNext className="right-4 bg-white/80 hover:bg-white text-[#D99B32] hover:text-[#D99B32] border-none shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110" />
              </Carousel>
              
              {/* Enhanced image counter with animation */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full shadow-md transform group-hover:translate-y-[-5px] transition-transform duration-300">
                <span className="font-medium">{currentSlide + 1}</span>
                <span className="mx-1 opacity-70">/</span>
                <span className="opacity-80">{property.images.length}</span>
              </div>
              
              {/* Property type badge */}
              <div className="absolute top-4 left-4 transform transition-transform duration-500 ease-in-out group-hover:scale-110">
                <Badge className="bg-[#D99B32]/90 backdrop-blur-sm text-white font-medium py-1 px-3 shadow-md">
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </Badge>
              </div>
              
              {/* Featured badge if premium property */}
              {property.featured && (
                <div className="absolute top-4 right-4 transform transition-all duration-500 group-hover:rotate-3">
                  <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-[#D99B32] border-[#D99B32]/50 font-semibold py-1 px-3 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 animate-spin-slow" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Premium
                  </Badge>
                </div>
              )}
              
              {/* Interactive hint */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="bg-white/80 backdrop-blur-sm text-[#D99B32] rounded-full p-3 shadow-lg animate-float">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-80 md:h-[31.2rem] bg-neutral-light flex items-center justify-center rounded-lg shadow-inner">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral mb-2 animate-pulse opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="text-neutral font-medium">No images available</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Property Header */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-between items-start mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">{property.title}</h1>
            <div>
              <Badge className="bg-gold text-white font-medium">
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
          ) : property.title.includes('Uchumi House') ? (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-gold">Pricing:</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <span className="mr-2 text-neutral-dark font-medium">Ground Floor Rent:</span>
                  <span className="text-primary font-bold text-xl">Ksh 230 / Sqft</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-neutral-dark font-medium">Other Floors Rent:</span>
                  <span className="text-primary font-bold text-xl">Ksh {property.price} / Sqft</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-neutral-dark font-medium">Service Charge:</span>
                  <span className="text-primary font-bold text-xl">Ksh 26 / Sqft</span>
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
        
        {/* Property Details Cards with micro-interactions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="overflow-hidden group hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-neutral-100 hover:border-[#D99B32]/20">
            <CardContent className="pt-6 relative">
              {/* Icon with animation */}
              <div className="absolute top-0 right-0 mr-3 mt-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 text-[#D99B32]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float">
                  <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
                  <path d="M5.3 16a10 10 0 0 1 13.4 0" />
                </svg>
              </div>
              
              <div className="text-center">
                <div className="rounded-full bg-neutral-50 group-hover:bg-[#D99B32]/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D99B32]">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1 text-neutral-700 group-hover:text-[#D99B32] transition-colors duration-300">Property Size</h3>
                <p className="text-3xl font-bold text-primary group-hover:scale-110 transform transition-transform duration-500">{property.size} <span className="text-base font-medium">sq ft</span></p>
              </div>
            </CardContent>
          </Card>
          
          {property.type === 'residential' && (
            <>
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-neutral-100 hover:border-[#D99B32]/20">
                <CardContent className="pt-6 relative">
                  {/* Icon with animation */}
                  <div className="absolute top-0 right-0 mr-3 mt-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 text-[#D99B32]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float" style={{ animationDelay: '0.2s' }}>
                      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
                      <path d="M5.3 16a10 10 0 0 1 13.4 0" />
                    </svg>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full bg-neutral-50 group-hover:bg-[#D99B32]/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center transition-colors duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D99B32]">
                        <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
                        <path d="M18 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2" />
                        <path d="M10 12h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-neutral-700 group-hover:text-[#D99B32] transition-colors duration-300">Bedrooms</h3>
                    <p className="text-3xl font-bold text-gold group-hover:scale-110 transform transition-transform duration-500">{property.bedrooms}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-neutral-100 hover:border-[#D99B32]/20">
                <CardContent className="pt-6 relative">
                  {/* Icon with animation */}
                  <div className="absolute top-0 right-0 mr-3 mt-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 text-[#D99B32]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float" style={{ animationDelay: '0.4s' }}>
                      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
                      <path d="M5.3 16a10 10 0 0 1 13.4 0" />
                    </svg>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full bg-neutral-50 group-hover:bg-[#D99B32]/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center transition-colors duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D99B32]">
                        <path d="M9 6 A3 3 0 0 1 12 9 A3 3 0 0 1 9 12 A3 3 0 0 1 6 9 A3 3 0 0 1 9 6" />
                        <path d="M18 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h2" />
                        <path d="M18 12V4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-neutral-700 group-hover:text-[#D99B32] transition-colors duration-300">Bathrooms</h3>
                    <p className="text-3xl font-bold text-gold group-hover:scale-110 transform transition-transform duration-500">{property.bathrooms}</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
          
          {property.type === 'commercial' && (
            <>
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-neutral-100 hover:border-[#D99B32]/20">
                <CardContent className="pt-6 relative">
                  {/* Icon with animation */}
                  <div className="absolute top-0 right-0 mr-3 mt-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 text-[#D99B32]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float" style={{ animationDelay: '0.2s' }}>
                      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
                      <path d="M5.3 16a10 10 0 0 1 13.4 0" />
                    </svg>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full bg-neutral-50 group-hover:bg-[#D99B32]/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center transition-colors duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D99B32]">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="3" y1="15" x2="21" y2="15"></line>
                        <line x1="9" y1="3" x2="9" y2="21"></line>
                        <line x1="15" y1="3" x2="15" y2="21"></line>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-neutral-700 group-hover:text-[#D99B32] transition-colors duration-300">Offices</h3>
                    <p className="text-3xl font-bold text-gold group-hover:scale-110 transform transition-transform duration-500">{property.offices}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-neutral-100 hover:border-[#D99B32]/20">
                <CardContent className="pt-6 relative">
                  {/* Icon with animation */}
                  <div className="absolute top-0 right-0 mr-3 mt-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 text-[#D99B32]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float" style={{ animationDelay: '0.4s' }}>
                      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
                      <path d="M5.3 16a10 10 0 0 1 13.4 0" />
                    </svg>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full bg-neutral-50 group-hover:bg-[#D99B32]/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center transition-colors duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D99B32]">
                        <rect x="4" y="13" width="6" height="7" />
                        <rect x="14" y="13" width="6" height="7" />
                        <circle cx="7" cy="17" r="1" />
                        <circle cx="17" cy="17" r="1" />
                        <path d="M12 20h.01" />
                        <path d="M17 10L5 10" />
                        <path d="M5 6L14 6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-neutral-700 group-hover:text-[#D99B32] transition-colors duration-300">Parking Spots</h3>
                    <p className="text-3xl font-bold text-gold group-hover:scale-110 transform transition-transform duration-500">{property.parking}</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
        
        {/* Property Information in simplified format */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">{property.title}</h1>
              <Badge className="bg-gold text-white font-medium">
                {property.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex items-center text-neutral mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{property.location}</span>
            </div>
            
            {/* Property Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
              <div className="bg-[#f9f5ed] p-4 rounded-lg border border-[#D99B32]/10">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2 text-neutral-700">Property Size</h3>
                  <p className="text-2xl font-bold text-primary">{property.size.toLocaleString()} <span className="text-base font-medium">sq ft</span></p>
                </div>
              </div>
              
              {property.type === 'commercial' && (
                <div className="bg-[#f9f5ed] p-4 rounded-lg border border-[#D99B32]/10">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2 text-neutral-700">Offices</h3>
                    <p className="text-2xl font-bold text-gold">{property.title.includes('Uchumi') ? '10' : property.title.includes('NBK') ? '5' : '8'}</p>
                  </div>
                </div>
              )}
              
              {property.type === 'residential' && (
                <>
                  <div className="bg-[#f9f5ed] p-4 rounded-lg border border-[#D99B32]/10">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2 text-neutral-700">Bedrooms</h3>
                      <p className="text-2xl font-bold text-gold">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="bg-[#f9f5ed] p-4 rounded-lg border border-[#D99B32]/10">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2 text-neutral-700">Bathrooms</h3>
                      <p className="text-2xl font-bold text-gold">{property.bathrooms}</p>
                    </div>
                  </div>
                </>
              )}
              
              <div className="bg-[#f9f5ed] p-4 rounded-lg border border-[#D99B32]/10">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2 text-neutral-700">Parking Spots</h3>
                  <p className="text-2xl font-bold text-gold">{property.title.includes('Uchumi') ? '20' : '10'}</p>
                </div>
              </div>
            </div>
            
            {/* Pricing Info */}
            <div className="mb-6 bg-[#f9f5ed] p-4 rounded-lg border border-[#D99B32]/10">
              <h3 className="text-xl font-semibold mb-3 text-[#D99B32]">Pricing:</h3>
              
              {property.title.includes('Uchumi House') ? (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="mr-2 text-neutral-dark font-medium">Ground Floor Rent:</span>
                    <span className="text-primary font-bold text-xl">Ksh 230 / Sqft</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-neutral-dark font-medium">Other Floors Rent:</span>
                    <span className="text-primary font-bold text-xl">Ksh 106 / Sqft</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-neutral-dark font-medium">Service Charge:</span>
                    <span className="text-primary font-bold text-xl">Ksh 26 / Sqft</span>
                  </div>
                </div>
              ) : property.title.includes('National Bank') ? (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="mr-2 text-neutral-dark font-medium">Rent:</span>
                    <span className="text-primary font-bold text-xl">Ksh {property.price} / Sqft</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-neutral-dark font-medium">Service Charge:</span>
                    <span className="text-primary font-bold text-xl">Ksh 36 / Sqft</span>
                  </div>
                </div>
              ) : property.title.includes('Blueshield') ? (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="mr-2 text-neutral-dark font-medium">Rent:</span>
                    <span className="text-primary font-bold text-xl">Ksh 130 / Sqft</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-neutral-dark font-medium">Service Charge:</span>
                    <span className="text-primary font-bold text-xl">Ksh 25 / Sqft</span>
                  </div>
                </div>
              ) : property.title.includes('Finance House') ? (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="mr-2 text-neutral-dark font-medium">Rent:</span>
                    <span className="text-primary font-bold text-xl">Ksh 85 / Sqft</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-neutral-dark font-medium">Service Charge:</span>
                    <span className="text-primary font-bold text-xl">Ksh 30 / Sqft</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-primary font-bold text-2xl">{property.price.toLocaleString()} KSh</span>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-[#D99B32]/10">
                <div className="flex items-center text-neutral">
                  <span className="font-medium">Reference:</span>
                  <span className="ml-2">LM-{property.id.toString().padStart(4, '0')}</span>
                </div>
              </div>
            </div>
            
            {/* Property Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-[#D99B32]">Description</h3>
              <div className="space-y-4 text-neutral-dark">
                {property.description.split('\n\n')[0].split('\n').map((line, idx) => (
                  <p key={idx} className="text-neutral-dark leading-relaxed">{line}</p>
                ))}
              </div>
            </div>
            
            {/* Additional Information Sections */}
            {property.description.split('\n\n').slice(1).map((paragraph, index) => {
              if (paragraph.startsWith('Pricing') || paragraph.startsWith('Amenities') || paragraph.startsWith('Contact Information')) {
                // Extract the title and content
                const [title, ...content] = paragraph.split('\n');
                return (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-[#D99B32]">{title}</h3>
                    <div className="whitespace-pre-line leading-relaxed text-neutral-dark">{content.join('\n')}</div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-[#D99B32]">Additional Information</h3>
                    <p className="whitespace-pre-line leading-relaxed text-neutral-dark">{paragraph}</p>
                  </div>
                );
              }
            })}
            
            {/* Contact Section */}
            <div className="mt-8 pt-4 border-t border-[#D99B32]/10">
              <h3 className="text-xl font-semibold mb-3 text-[#D99B32]">Contact Information</h3>
              <p className="mb-2 text-neutral-dark">📞 To Arrange a Viewing or Get More Details:</p>
              <p className="font-medium">Legend Management Ltd.</p>
              <p className="text-neutral-dark">Tel: 0791181166</p>
              <p className="text-neutral-dark">Email: joseph@propertylegend.com | dianaruto@propertylegend.com</p>
              <p className="text-neutral-dark">Reference: LM-{property.id.toString().padStart(4, '0')}</p>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <Button 
                  className="bg-green-600 hover:bg-green-700 hover:scale-105 transform transition-all duration-300 flex items-center"
                  onClick={() => window.open(`https://wa.me/254746369798?text=I'm interested in ${property.title}%0A%0A*Property Reference ID:* LM-${property.id.toString().padStart(4, '0')}%0A%0APlease send me more information about this property.`, '_blank')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  <span className="font-medium">Contact via WhatsApp</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#D99B32] text-[#D99B32] hover:bg-[#D99B32] hover:text-white hover:scale-105 transform transition-all duration-300"
                  onClick={() => window.open(`tel:+254791181166`, '_blank')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="font-medium">Call Now</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Property Features with micro-interactions */}
        {property.features && property.features.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center">
              <span className="bg-[#D99B32]/10 text-[#D99B32] p-1 rounded-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
                  <path d="M7 16v6" />
                  <path d="M13 19v3" />
                  <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-4 4-4 4v0" />
                </svg>
              </span>
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {property.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-2 rounded-lg transition-all duration-300 hover:bg-[#D99B32]/5 group transform hover:translate-x-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="rounded-full bg-[#D99B32]/10 p-1.5 mr-3 transition-colors duration-300 group-hover:bg-[#D99B32]/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#D99B32]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="group-hover:text-[#D99B32] transition-colors duration-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Separator className="my-8" />
        
        {/* Contact Section with micro-interactions */}
        <div className="bg-gradient-to-br from-[#D99B32] to-[#D99B32]/90 p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
            <span className="inline-block mr-2 animate-pulse-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </span>
            Interested in this property?
          </h2>
          <p className="mb-6 text-white text-opacity-90 leading-relaxed">
            Contact us to schedule a viewing or request more information about this premium property.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-white text-[#D99B32] hover:bg-white/90 hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => window.open(`tel:+254791181166`, '_blank')} 
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-500 animate-float" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-medium">Call Agent</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-white bg-transparent text-white hover:bg-white hover:text-[#D99B32] hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => window.open(`mailto:joseph@propertylegend.com?subject=Inquiry about ${property.title} (Ref: PROP-${property.id.toString().padStart(4, '0')})`, '_blank')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-500 animate-float" style={{ animationDelay: '0.2s' }} viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="font-medium">Email Now</span>
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 hover:scale-105 transform transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
              onClick={() => window.open(`https://wa.me/254746369798?text=I'm interested in ${property.title}%0A%0A*Property Reference ID:* PROP-${property.id.toString().padStart(4, '0')}%0A%0APlease send me more information about this property.`, '_blank')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-500 animate-float" style={{ animationDelay: '0.4s' }} viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              <span className="font-medium">WhatsApp</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
