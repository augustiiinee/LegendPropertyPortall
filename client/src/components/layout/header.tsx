import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import MobileMenu from './mobile-menu';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'Properties', path: '/properties' },
  { name: 'Directors', path: '/#directors' },
  { name: 'Contact', path: '/#contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const isActiveLink = (path: string) => {
    if (path === '/') return location === '/';
    if (path.startsWith('/#')) return location === '/';
    return location.startsWith(path);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="h-12 w-48 bg-primary flex items-center justify-center text-white font-montserrat font-bold">
            LEGEND MANAGEMENT
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className={`font-montserrat font-medium ${isActiveLink(item.path) ? 'text-secondary' : 'text-primary hover:text-secondary'} transition`}
            >
              {item.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin"
                className="font-montserrat font-medium text-primary hover:text-secondary transition"
              >
                Admin
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link 
              href="/auth"
              className="font-montserrat font-medium text-primary hover:text-secondary transition"
            >
              Login
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-primary focus:outline-none" 
          onClick={handleMobileMenuToggle}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
}
