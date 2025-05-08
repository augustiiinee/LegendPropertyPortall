import { useState, useEffect } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Property } from '@shared/types';

type UchumiHouseGalleryProps = {
  property: Property;
};

export default function UchumiHouseGallery({ property }: UchumiHouseGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Custom Uchumi House images - using the new image you provided
  const uchumiImages = [
    "/images/properties/uchumi/main.jpg", // This is the new image you uploaded
    ...(property.images || []).filter(img => 
      !img.includes('main.jpg') && 
      !img.includes('uchumi-house-1') // Skip any old main images
    )
  ];
  
  // Update current slide index when carousel moves
  useEffect(() => {
    if (!api) return;
    
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);
  
  return (
    <div className="relative overflow-hidden rounded-xl shadow-xl group">
      <Carousel setApi={setApi} className="transition-all duration-500">
        <CarouselContent>
          {uchumiImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="h-64 md:h-96 w-full bg-gray-50 overflow-hidden">
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
        <span className="opacity-80">{uchumiImages.length}</span>
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
    </div>
  );
}