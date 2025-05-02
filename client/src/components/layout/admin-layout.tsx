import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { 
  LayoutDashboard, 
  Home, 
  Building, 
  Users, 
  MessageSquare,
  LogOut, 
  Menu, 
  X, 
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigation = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/admin',
      current: location === '/admin',
    },
    {
      name: 'Properties',
      icon: <Building className="h-5 w-5" />,
      path: '/admin/properties',
      current: location.startsWith('/admin/properties'),
    },
    {
      name: 'Inquiries',
      icon: <MessageSquare className="h-5 w-5" />,
      path: '/admin/inquiries',
      current: location === '/admin/inquiries',
    },
    {
      name: 'Directors',
      icon: <Users className="h-5 w-5" />,
      path: '/admin/directors',
      current: location === '/admin/directors',
    },
    {
      name: 'Website',
      icon: <Home className="h-5 w-5" />,
      path: '/',
      current: false,
    },
  ];
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  return (
    <div className="flex min-h-screen bg-neutral-lightest">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-neutral-light bg-white pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-lg font-bold text-primary">Legend Management</h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-4 space-y-1">
              {navigation.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${item.current 
                      ? 'bg-primary text-white' 
                      : 'text-neutral-dark hover:bg-neutral-lightest'}
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">
                  Logged in as:
                </p>
                <p className="text-sm text-neutral-dark truncate">
                  {user?.username}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b border-neutral-light px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-primary">Legend Management</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-25" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      {/* Mobile menu panel */}
      <div
        className={`
          md:hidden fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full pt-16 pb-4">
          <div className="flex-grow flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 space-y-1 mt-4">
              {navigation.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${item.current 
                      ? 'bg-primary text-white' 
                      : 'text-neutral-dark hover:bg-neutral-lightest'}
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 px-4 py-4 border-t border-neutral-light">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">
                  Logged in as:
                </p>
                <p className="text-sm text-neutral-dark truncate">
                  {user?.username}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 px-4 sm:px-6 py-8 mt-14 md:mt-0">
          <div className="mx-auto max-w-7xl">
            {/* Page header with breadcrumbs */}
            <div className="mb-6">
              <div className="flex items-center text-sm text-neutral-dark">
                <Link href="/admin" className="hover:text-primary">
                  Admin
                </Link>
                {location !== '/admin' && (
                  <>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-primary font-medium">
                      {location.split('/').pop()?.replace(/-/g, ' ')}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            {/* Page content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}