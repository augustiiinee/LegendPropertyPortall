import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/ui/contact-modal';
import { Search, Home, Building, MapPin } from 'lucide-react';

type HeroSlide = {
  id: number;
  imageUrl: string;
  title?: string;
};

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    imageUrl: '/images/hero/hero1.jpeg',
    title: 'Prime Residential Properties'
  },
  {
    id: 2,
    imageUrl: '/images/hero/hero2.jpeg',
    title: 'Prestigious Commercial Spaces'
  },
  {
    id: 3,
    imageUrl: '/images/hero/hero3.jpeg',
    title: 'Exclusive Property Management'
  },
  {
    id: 4,
    imageUrl: '/images/hero/nyayo-estate.jpg',
    title: 'Investment Opportunities'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [searchType, setSearchType] = useState<'buy' | 'rent'>('buy');
  const [searchLocation, setSearchLocation] = useState('');
  
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
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ))}
        
        {/* Current slide indicators */}
        <div className="absolute bottom-36 md:bottom-44 left-0 right-0 flex justify-center space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full transition border border-white ${
                index === currentSlide ? 'bg-white' : 'bg-transparent hover:bg-white/50'
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
          <div className="max-w-5xl mb-8">
            <h2 className="font-light text-white text-2xl mb-2">Welcome to</h2>
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              Legend Management Ltd
            </h1>
            <p className="font-inter text-xl text-white mb-4 max-w-3xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
              Absolute Property Solutions
            </p>
            <h3 className="text-xl md:text-2xl font-semibold text-white mt-4 mb-6 shadow-text">
              {heroSlides[currentSlide].title || "Exceptional Property Services"}
            </h3>
          </div>
          
          {/* Property Search Box - Knight Frank style */}
          <div className="w-full max-w-4xl bg-white rounded-md shadow-xl overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button 
                className={`flex-1 py-3 px-4 text-center font-medium ${searchType === 'buy' ? 'bg-gold text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setSearchType('buy')}
              >
                <span className="flex items-center justify-center">
                  <Home className="w-4 h-4 mr-2" />
                  Buy / Sale
                </span>
              </button>
              <button 
                className={`flex-1 py-3 px-4 text-center font-medium ${searchType === 'rent' ? 'bg-gold text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setSearchType('rent')}
              >
                <span className="flex items-center justify-center">
                  <Building className="w-4 h-4 mr-2" />
                  Rent / Lease
                </span>
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      placeholder="Location, e.g. Nairobi, Upperhill"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Link href={`/properties?status=${searchType === 'buy' ? 'For Sale' : 'For Rent'}&location=${searchLocation}`}>
                    <Button className="w-full md:w-auto bg-gold hover:bg-gold/90 text-white font-medium py-2 px-6">
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap">
                <Link href="/properties?type=residential" className="text-sm text-gray-600 hover:text-gold mr-4 mb-2">
                  Residential
                </Link>
                <Link href="/properties?type=commercial" className="text-sm text-gray-600 hover:text-gold mr-4 mb-2">
                  Commercial
                </Link>
                <Link href="/properties?type=land" className="text-sm text-gray-600 hover:text-gold mr-4 mb-2">
                  Land
                </Link>
                <Link href="/properties" className="text-sm text-gray-600 hover:text-gold mr-4 mb-2">
                  All Properties
                </Link>
                <button className="text-sm text-gray-600 hover:text-gold mb-2" onClick={openContactModal}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      
      {/* Note: Custom CSS for text shadow is applied via global CSS */}
    </section>
  );
}
