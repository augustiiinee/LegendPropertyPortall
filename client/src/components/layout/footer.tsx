import { Link } from 'wouter';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import { SiTiktok } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            {/* Logo */}
            <Link 
              href="/"
              className="flex items-center mb-4"
            >
              <img 
                src="/images/logo.png" 
                alt="Legend Management Ltd" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-white text-opacity-80 mb-4">
              Absolute Property Solutions, delivering excellence and value to our clients.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.facebook.com/profile.php?id=61557337761112" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors duration-300" aria-label="Facebook">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@legend.real.estat?_t=ZM-8w29kDLHhUV&_r=1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors duration-300" aria-label="TikTok">
                <SiTiktok className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/propertylegend254?igsh=OTM2ZHVtOTZrZXBx" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors duration-300" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/254746369798" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors duration-300" aria-label="WhatsApp">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/properties"
                  className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link 
                  href="/directors"
                  className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link 
                  href="/#contact"
                  className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300">Property Management</Link>
              </li>
              <li>
                <Link href="/services" className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300">Estate Agency</Link>
              </li>
              <li>
                <Link href="/services" className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300">Project Consultancy</Link>
              </li>
              <li>
                <Link href="/services" className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300">Property Valuation</Link>
              </li>
              <li>
                <Link href="/services" className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300">Rental Assessment</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaMapMarkerAlt className="w-5 h-5 mr-3 text-amber-300" />
                <span className="text-white text-opacity-80">
                  NHIF Building, 3rd floor, Off Ragati Road, Community/Upperhill
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="w-5 h-5 mr-3 text-amber-300" />
                <a 
                  href="tel:+254202713445" 
                  className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300"
                >
                  +254 020-2713445/6
                </a>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="w-5 h-5 mr-3 text-amber-300" />
                <a 
                  href="https://wa.me/254746369798" 
                  className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  +254 746 369 798
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="w-5 h-5 mr-3 text-amber-300" />
                <a 
                  href="mailto:info@propertylegend.com" 
                  className="text-white text-opacity-80 hover:text-amber-300 transition-colors duration-300"
                >
                  info@propertylegend.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 pt-6 text-center">
          <div className="mb-6 bg-primary-dark p-4 rounded-lg shadow-inner">
            <h4 className="text-amber-300 font-semibold mb-4 text-lg">Our Leadership Team</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary bg-opacity-40 p-3 rounded text-white text-opacity-90 text-sm">
                <p className="font-semibold text-amber-200">Mr. Boniface K. Terer</p>
                <p className="text-xs text-white text-opacity-90 mt-1">CEO | 31 years experience</p>
              </div>
              <div className="bg-primary bg-opacity-40 p-3 rounded text-white text-opacity-90 text-sm">
                <p className="font-semibold text-amber-200">Mr. David C. Ruto</p>
                <p className="text-xs text-white text-opacity-90 mt-1">Director, Agency Marketing & Letting | 33 years experience</p>
              </div>
              <div className="bg-primary bg-opacity-40 p-3 rounded text-white text-opacity-90 text-sm">
                <p className="font-semibold text-amber-200">Mr. Geoffrey Koros</p>
                <p className="text-xs text-white text-opacity-90 mt-1">Director, Property Management | 15+ years experience</p>
              </div>
            </div>
          </div>
          <p className="text-white text-opacity-80 text-sm mt-4">
            &copy; {currentYear} Legend Management Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
