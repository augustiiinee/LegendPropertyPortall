import { useEffect, useState } from 'react';
import { X, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [isContentVisible, setIsContentVisible] = useState(false);
  
  // Cycle through locations every 5 seconds
  useEffect(() => {
    if (isOpen) {
      setIsContentVisible(true);
      const interval = setInterval(() => {
        setActiveLocation((prev) => (prev + 1) % officeLocations.length);
      }, 5000);
      return () => clearInterval(interval);
    } else {
      setIsContentVisible(false);
    }
  }, [isOpen]);

  const handleLocationClick = (index: number) => {
    setActiveLocation(index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gold text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-montserrat font-bold">Our Offices</h2>
              <button 
                onClick={onClose}
                className="text-white hover:text-white/80 transition-colors p-1 rounded-full hover:bg-black/20"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-neutral-50 rounded-lg p-4 overflow-y-auto max-h-[400px] md:max-h-none">
                <h3 className="font-montserrat font-semibold text-lg mb-4 text-primary border-b pb-2">Our Locations</h3>
                <div className="space-y-2">
                  {officeLocations.map((location, index) => (
                    <button
                      key={location.name}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        activeLocation === index 
                          ? "bg-gold text-white font-medium shadow-md" 
                          : "bg-white hover:bg-neutral-100 text-neutral-800"
                      }`}
                      onClick={() => handleLocationClick(index)}
                    >
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{location.name}</span>
                      </div>
                      <div className="text-xs mt-1 ml-6 opacity-80">{location.region}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLocation}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg p-6 shadow-md border h-full"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-white mr-4">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-semibold text-xl text-primary">
                          {officeLocations[activeLocation].name} Office
                        </h3>
                        <p className="text-neutral-500">{officeLocations[activeLocation].region}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-gold mr-4 flex-shrink-0">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-montserrat font-medium text-primary-light mb-2">Address</h4>
                          {officeLocations[activeLocation].address.map((line, i) => (
                            <p key={i} className="text-neutral-600">{line}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-gold mr-4 flex-shrink-0">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-montserrat font-medium text-primary-light mb-2">Contact</h4>
                          {officeLocations[activeLocation].telephone.map((line, i) => (
                            <p key={i} className="text-neutral-600">{line}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-gold mr-4 flex-shrink-0">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-montserrat font-medium text-primary-light mb-2">Email</h4>
                          <p className="text-neutral-600">propertylegendke@gmail.com</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-gold mr-4 flex-shrink-0">
                          <Clock className="h-5 w-5" />
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}