import { useEffect, useState } from 'react';
import { X, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import './scrollbar.css';

type OfficeLocation = {
  name: string;
  address: string[];
  telephone: string[];
  region: string;
};

const officeLocations: OfficeLocation[] = [
  {
    name: "Nairobi",
    address: [
      "NHIF Building, 3rd floor",
      "Off Ragati Road, Community/Upperhill",
      "P. O. Box 47155-00100",
      "Nairobi, Kenya"
    ],
    telephone: ["+254 020-2713445/6", "Fax: +254 2727491", "Mobile: 0729 229955"],
    region: "Head Office"
  },
  {
    name: "Kisumu",
    address: [
      "Alpha Center",
      "Oginga Odinga Street",
      "P. O. Box: 3970-40100",
      "Kisumu, Kenya"
    ],
    telephone: ["Tel: 0720 384941"],
    region: "Western Region"
  },
  {
    name: "Eldoret",
    address: [
      "Eldo Center, Room 10 & 11",
      "Uganda Road",
      "Eldoret"
    ],
    telephone: ["Tel: +254 713918080", "+254 725794243"],
    region: "North Rift Region"
  },
  {
    name: "Kericho",
    address: [
      "Sinendet Towers 9th Floor",
      "P.O. BOX 2147 -20200",
      "Kericho"
    ],
    telephone: ["Tel: 0712 600360"],
    region: "South Rift Region"
  },
  {
    name: "Nanyuki",
    address: [
      "P. O. Box: 49-10400",
      "Nanyuki"
    ],
    telephone: ["Tel: 0622030031"],
    region: "Mount Kenya Region"
  },
  {
    name: "Mombasa",
    address: [
      "NSSF Building",
      "Nkrumah Road",
      "Room 715"
    ],
    telephone: ["Tel: 0770292368"],
    region: "Coastal Region"
  }
];

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [activeLocation, setActiveLocation] = useState(0);
  
  // Cycle through locations every 5 seconds
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setActiveLocation((prev) => (prev + 1) % officeLocations.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleLocationClick = (index: number) => {
    setActiveLocation(index);
  };
  
  // Current location data
  const currentLocation = officeLocations[activeLocation];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-[95%] md:max-w-3xl h-[70vh] md:h-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gold text-white p-3 sm:p-4 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-lg sm:text-xl font-montserrat font-bold">Our Offices</h2>
              <button 
                onClick={onClose}
                className="text-white hover:text-white/80 transition-colors p-1 rounded-full hover:bg-black/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-2 sm:p-4 overflow-y-auto">
              {/* Mobile view: Tabs */}
              <div className="flex md:hidden overflow-x-auto pb-2 mb-2 scrollbar-hide">
                {officeLocations.map((location, index) => (
                  <button
                    key={location.name}
                    className={`flex-shrink-0 px-2 py-1 mr-1.5 rounded-full text-xs transition-all ${
                      activeLocation === index 
                        ? "bg-gold text-white font-medium shadow-md" 
                        : "bg-neutral-100 text-neutral-800"
                    }`}
                    onClick={() => handleLocationClick(index)}
                  >
                    {location.name}
                  </button>
                ))}
              </div>
              
              {/* Desktop view: Grid layout */}
              <div className="hidden md:grid grid-cols-3 gap-4">
                <div className="bg-neutral-50 rounded-lg p-3 h-[350px] overflow-y-auto">
                  <h3 className="font-montserrat font-semibold text-base mb-3 text-primary border-b pb-2">Our Locations</h3>
                  <div className="space-y-2">
                    {officeLocations.map((location, index) => (
                      <button
                        key={location.name}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                          activeLocation === index 
                            ? "bg-gold text-white font-medium shadow-md" 
                            : "bg-white hover:bg-neutral-100 text-neutral-800"
                        }`}
                        onClick={() => handleLocationClick(index)}
                      >
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                          <span>{location.name}</span>
                        </div>
                        <div className="text-xs mt-1 ml-5 opacity-80">{location.region}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="col-span-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeLocation}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-lg p-4 shadow-md border h-full"
                    >
                      {/* Desktop location content */}
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white mr-3">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-montserrat font-semibold text-lg text-primary">
                            {currentLocation.name} Office
                          </h3>
                          <p className="text-neutral-500 text-sm">{currentLocation.region}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex">
                          <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-gold mr-3 flex-shrink-0">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-montserrat font-medium text-primary-light mb-2">Address</h4>
                            {currentLocation.address.map((line, i) => (
                              <p key={i} className="text-neutral-600">{line}</p>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-gold mr-3 flex-shrink-0">
                            <Phone className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-montserrat font-medium text-primary-light mb-2">Contact</h4>
                            {currentLocation.telephone.map((line, i) => (
                              <p key={i} className="text-neutral-600">{line}</p>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-gold mr-3 flex-shrink-0">
                            <Mail className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-montserrat font-medium text-primary-light mb-2">Email</h4>
                            <p className="text-neutral-600">propertylegendke@gmail.com</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-gold mr-3 flex-shrink-0">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-montserrat font-medium text-primary-light mb-2">Business Hours</h4>
                            <p className="text-neutral-600">Monday - Friday: 9AM - 5PM</p>
                            <p className="text-neutral-600">Saturday: 10AM - 2PM</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Mobile location content */}
              <div className="md:hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLocation}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-lg p-3 shadow-sm border"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-white mr-2">
                        <MapPin className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-semibold text-sm text-primary">
                          {currentLocation.name} Office
                        </h3>
                        <p className="text-neutral-500 text-xs">{currentLocation.region}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-gold mr-2 flex-shrink-0">
                          <MapPin className="h-3 w-3" />
                        </div>
                        <div>
                          <h4 className="font-montserrat font-medium text-primary-light text-xs mb-0.5">Address</h4>
                          {currentLocation.address.map((line, i) => (
                            <p key={i} className="text-neutral-600 text-xs leading-tight">{line}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-gold mr-2 flex-shrink-0">
                          <Phone className="h-3 w-3" />
                        </div>
                        <div>
                          <h4 className="font-montserrat font-medium text-primary-light text-xs mb-0.5">Contact</h4>
                          {currentLocation.telephone.map((line, i) => (
                            <p key={i} className="text-neutral-600 text-xs leading-tight">{line}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-gold mr-2 flex-shrink-0">
                          <Mail className="h-3 w-3" />
                        </div>
                        <div>
                          <h4 className="font-montserrat font-medium text-primary-light text-xs mb-0.5">Email</h4>
                          <p className="text-neutral-600 text-xs">propertylegendke@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}