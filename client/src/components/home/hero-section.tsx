import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

type HeroSlide = {
  id: number;
  imageUrl: string;
};

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    imageUrl: '/images/hero/hero1.jpeg'
  },
  {
    id: 2,
    imageUrl: '/images/hero/hero2.jpeg'
  },
  {
    id: 3,
    imageUrl: '/images/hero/hero3.jpeg'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
  
  return (
    <section id="home" className="relative h-[80vh] bg-primary overflow-hidden">
      {/* Hero Carousel */}
      <div className="carousel relative h-full w-full">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`carousel-slide absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
            style={{ 
              backgroundImage: `url('${slide.imageUrl}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
        ))}
        
        {/* Current slide indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-20">
          <div className="max-w-4xl">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              Absolute Property Solutions
            </h1>
            <p className="font-inter text-xl text-white mb-8 max-w-3xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
              Legend Management Ltd delivers exceptional property management services and exclusive sales opportunities
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/properties">
                <Button className="bg-secondary hover:bg-secondary-light text-white font-montserrat font-semibold px-6 py-3 rounded-md transition transform hover:scale-105">
                  View Properties
                </Button>
              </Link>
              <Link href="/#contact">
                <Button variant="outline" className="bg-white text-primary hover:bg-neutral-lightest font-montserrat font-semibold px-6 py-3 rounded-md transition transform hover:scale-105">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
