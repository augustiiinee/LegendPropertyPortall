import { Link } from 'wouter';
import { User } from '@shared/schema';
import { Button } from '@/components/ui/button';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; path: string }[];
  user: User | null;
  onLogout: () => void;
};

export default function MobileMenu({ isOpen, onClose, navigation, user, onLogout }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-neutral-light">
      <div className="px-4 py-4 space-y-4">
        {navigation.map((item) => (
          <Link 
            key={item.name} 
            href={item.path}
            className="block font-montserrat font-medium text-lg text-primary hover:text-secondary bg-amber-50 hover:bg-amber-100 p-3 rounded-md transition-all"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        
        {user && (
          <>
            <Link 
              href="/admin"
              className="block font-montserrat font-medium text-primary hover:text-secondary transition py-2"
              onClick={onClose}
            >
              Admin Dashboard
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full"
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
