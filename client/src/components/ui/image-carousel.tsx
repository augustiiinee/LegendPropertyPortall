import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

type ImageCarouselProps = {
  images: string[];
  autoplay?: boolean;
  autoplayInterval?: number;
};

export default function ImageCarousel({ 
  images, 
  autoplay = true, 
  autoplayInterval = 5000 
}: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Set up autoplay
  useEffect(() => {
    if (autoplay && images.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, autoplayInterval);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, autoplayInterval, images.length]);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    
    // Reset timer on manual navigation
    if (autoplay && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, autoplayInterval);
    }
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // If no images, render placeholder
  if (!images || images.length === 0) {
    return (
      <div className="relative h-full w-full bg-neutral-light flex items-center justify-center">
        <p className="text-neutral">No images available</p>
      </div>
    );
  }
  
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Slides */}
      {images.map((image, index) => (
        <div 
          key={index}
          className={`carousel-slide absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
          style={{ backgroundImage: `url('${image}')` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}
      
      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </>
      )}
      
      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
          {images.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
