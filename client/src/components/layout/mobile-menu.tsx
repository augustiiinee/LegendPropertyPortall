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
      <div className="px-4 py-2 space-y-3">
        {navigation.map((item) => (
          <Link key={item.name} href={item.path}>
            <a 
              className="block font-montserrat font-medium text-primary hover:text-secondary transition py-2"
              onClick={onClose}
            >
              {item.name}
            </a>
          </Link>
        ))}
        
        {user ? (
          <>
            <Link href="/admin">
              <a 
                className="block font-montserrat font-medium text-primary hover:text-secondary transition py-2"
                onClick={onClose}
              >
                Admin Dashboard
              </a>
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
        ) : (
          <Link href="/auth">
            <a 
              className="block font-montserrat font-medium text-primary hover:text-secondary transition py-2"
              onClick={onClose}
            >
              Login
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
