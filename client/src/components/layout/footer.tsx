import { Link } from 'wouter';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

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
              <a href="https://www.facebook.com/share/19AwPuhwhS/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition" aria-label="Facebook">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@legend.real.estat?_t=ZM-8w29kDLHhUV&_r=1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition" aria-label="TikTok">
                <FaTiktok className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/propertylegend254?igsh=OTM2ZHVtOTZrZXBx" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-white text-opacity-80 hover:text-gold transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="text-white text-opacity-80 hover:text-gold transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/properties"
                  className="text-white text-opacity-80 hover:text-gold transition"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link 
                  href="/directors"
                  className="text-white text-opacity-80 hover:text-gold transition"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link 
                  href="/#contact"
                  className="text-white text-opacity-80 hover:text-gold transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-gold transition">Property Management</a>
              </li>
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-gold transition">Property Sales</a>
              </li>
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-gold transition">Investment Consulting</a>
              </li>
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-gold transition">Property Maintenance</a>
              </li>
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-gold transition">Tenant Placement</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-white text-opacity-80 mb-4">
              Subscribe to our newsletter for the latest property updates and offers.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-l-md w-full focus:outline-none text-neutral-dark"
              />
              <button 
                type="submit" 
                className="bg-gold hover:bg-gold-light px-4 py-2 rounded-r-md transition"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 pt-6 text-center">
          <p className="text-white text-opacity-80 text-sm">
            &copy; {currentYear} Legend Management Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
