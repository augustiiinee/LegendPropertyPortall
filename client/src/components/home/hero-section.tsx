import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/ui/contact-modal';

type HeroSlide = {
  id: number;
  imageUrl: string;
};

// Updated to use high-quality building images in requested order: Hazina, Finance, Blueshield, Utalii, NBK, Uchumi
const heroSlides: HeroSlide[] = [
  {
    id: 1,
    imageUrl: '/images/buildings/hazina.JPG'
  },
  {
    id: 2,
    imageUrl: '/images/buildings/finance.JPG'
  },
  {
    id: 3,
    imageUrl: '/images/buildings/blueshield.jpeg'
  },
  {
    id: 4,
    imageUrl: '/images/buildings/utalii.JPG'
  },
  {
    id: 5,
    imageUrl: '/images/buildings/nbk.JPG'
  },
  {
    id: 6,
    imageUrl: '/images/buildings/uchumi.JPG'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };
  
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };
  
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };
  
  return (
    <section id="home" className="relative h-auto overflow-hidden">
      {/* Hero Carousel - Pure landscape display of building images with no extra background */}
      <div className="carousel relative w-full" style={{ aspectRatio: '16/9' }}>
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`carousel-slide absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
          >
            {/* Using img instead of background-image for better image quality control */}
            <img 
              src={slide.imageUrl} 
              alt={`Legend Management Property ${slide.id}`}
              className="absolute inset-0 w-full h-full"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'fill', // Fill the entire container
                objectPosition: 'center'
              }}
            />
            {/* No overlay at all */}
          </div>
        ))}
        
        {/* Current slide indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-[#D99B32]' : 'bg-white bg-opacity-70 hover:bg-[#D99B32]/70'
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Hero Content Overlay */}
        <div className="absolute bottom-20 inset-x-0 flex items-center justify-center text-center px-4 z-20">
          <div className="max-w-4xl bg-[#2C3E50] bg-opacity-80 p-4 rounded-lg shadow-xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 drop-shadow-lg text-shadow">
              Absolute Property Solutions
            </h1>
            <p className="font-inter text-xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md text-shadow">
              Legend Management Ltd delivers exceptional property management services and exclusive sales opportunities
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/properties">
                <Button className="bg-secondary hover:bg-secondary-light text-white font-montserrat font-semibold px-6 py-3 rounded-md transition transform hover:scale-105">
                  View Properties
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="bg-white text-primary hover:bg-neutral-lightest font-montserrat font-semibold px-6 py-3 rounded-md transition transform hover:scale-105"
                onClick={openContactModal}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </section>
  );
}
