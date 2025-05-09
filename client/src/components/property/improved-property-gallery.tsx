import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Property } from "@shared/schema";

type ImprovedPropertyGalleryProps = {
  property: Property;
};

export default function ImprovedPropertyGallery({ property }: ImprovedPropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const goToNextImage = () => {
    if (!property.images || property.images.length === 0) return;
    const imagesLength = property.images.length;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === imagesLength - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPrevImage = () => {
    if (!property.images || property.images.length === 0) return;
    const imagesLength = property.images.length;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? imagesLength - 1 : prevIndex - 1
    );
  };
  
  return (
    <div className="relative bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Gallery Tab Header */}
      <div className="border-b border-gray-200">
        <div className="bg-red-600 text-white px-4 py-2 inline-block font-medium">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span>GALLERY</span>
          </div>
        </div>
      </div>
      
      {/* Property Image Carousel - IMPROVED VERSION */}
      <div className="p-4">
        {/* Main Image Container - Improved to maintain aspect ratio without cropping */}
        <div className="relative mb-6 group">
          {property.featured && (
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-red-600 text-white px-3 py-1 text-sm font-medium">
                FEATURED
              </div>
            </div>
          )}
          
          {/* Main Image */}
          {property.images && property.images.length > 0 ? (
            <div className="w-full h-auto max-h-[600px] overflow-hidden flex justify-center items-center bg-gray-100">
              <img 
                src={property.images[currentImageIndex]} 
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                className="w-auto h-auto max-w-full max-h-[600px] object-contain"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/properties/placeholder.jpg';
                }}
              />
            </div>
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          
          {/* Navigation Arrows */}
          {property.images && property.images.length > 1 && (
            <>
              <button 
                onClick={goToPrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-red-600 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={goToNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-red-600 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          
          {/* Image Counter */}
          {property.images && property.images.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 text-sm rounded-full">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          )}
          
          {/* Web Ref */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 text-sm">
            Web Ref LM{property.id}
          </div>
        </div>
        
        {/* Thumbnail Navigation */}
        {property.images && property.images.length > 1 && (
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            {property.images.map((image, index) => (
              <div 
                key={index}
                className={`cursor-pointer transition-all duration-200 ${
                  currentImageIndex === index ? 'ring-2 ring-red-600' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="h-16 w-24 object-cover rounded"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/images/properties/placeholder.jpg';
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}