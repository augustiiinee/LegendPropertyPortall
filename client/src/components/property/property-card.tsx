import { Link } from 'wouter';
import { Property } from '@shared/types';
import { Badge } from '@/components/ui/badge';

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  // Determine if this is a premium property (featured)
  const isPremium = property.featured; 
  
  // Get first image with a fallback
  const primaryImage = property.images && property.images.length > 0 
    ? property.images[0]
    : '/images/property-placeholder.jpg';
  
  // Determine price display format based on property status and special cases
  const priceDisplay = () => {
    if (!property.price) return "Price on Request";
    
    const formattedPrice = property.price.toLocaleString();
    
    // Special case for National Bank of Kenya property
    if (property.title.includes('National Bank')) {
      return (
        <div className="flex flex-col">
          <span className="text-primary font-bold text-base">Rent: Ksh 90/Sqft</span>
          <span className="text-primary text-sm">Service: Ksh 36/Sqft</span>
          <span className="text-primary text-xs mt-1">Parking: Ksh 10,000/month</span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full mt-1">
            Only 2 Spaces Available
          </span>
        </div>
      );
    }
    // Special case for Uchumi House property
    else if (property.title.includes('Uchumi House')) {
      return (
        <div className="flex flex-col">
          <span className="text-primary font-bold text-base">Ground Floor: Ksh 230/Sqft</span>
          <span className="text-primary text-sm">Other Floors: Ksh 106/Sqft</span>
          <span className="text-primary text-sm">Service: Ksh 26/Sqft</span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full mt-1">
            5 Floors Available
          </span>
        </div>
      );
    }
    // Special case for Blueshield Towers property
    else if (property.title.includes('Blueshield')) {
      return (
        <div className="flex flex-col">
          <span className="text-primary font-bold text-base">Rent: Ksh 75/Sqft</span>
          <span className="text-primary text-sm">Service: Ksh 25/Sqft</span>
          <span className="text-primary text-xs mt-1">Parking: Ksh 10,000/month</span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full mt-1">
            14 Spaces Available
          </span>
        </div>
      );
    }
    // Special case for Finance House property
    else if (property.title.includes('Finance House')) {
      return (
        <div className="flex flex-col">
          <span className="text-primary font-bold text-base">Rent: Ksh 85/Sqft</span>
          <span className="text-primary text-sm">Service: Ksh 30/Sqft</span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full mt-1">
            Only 7 Spaces Available
          </span>
        </div>
      );
    } 
    else if (property.status === "For Lease" || property.status === "For Rent") {
      return `Ksh ${formattedPrice}/month`;
    } else {
      return `Ksh ${formattedPrice}`;
    }
  };
  
  // Get a compact version of the title (for mobile displays)
  const shortTitle = property.title.length > 30 
    ? property.title.substring(0, 30) + '...' 
    : property.title;
  
  // Determine property badge color based on status
  const getBadgeVariant = () => {
    switch(property.status) {
      case "For Sale": return "secondary";
      case "For Lease": return "outline";
      case "For Rent": return "secondary";
      case "Sold": return "destructive";
      case "Pending": return "default";
      default: return "default";
    }
  };
  
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      {/* Property Image */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={primaryImage}
          alt={property.title} 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Knight Frank style overlay for status */}
        <div className="absolute top-0 left-0 w-full">
          <div className="flex justify-between p-3">
            {/* Status Badge */}
            <Badge className="bg-gold hover:bg-gold/90 text-white font-medium text-xs tracking-wider px-2.5 py-1.5 rounded">
              {property.status}
            </Badge>
            
            {/* Featured Badge - Only show for featured properties */}
            {isPremium && (
              <Badge className="bg-white text-gold border border-gold font-medium text-xs px-2.5 py-1.5 rounded">
                Featured
              </Badge>
            )}
          </div>
        </div>
        
        {/* Property Type Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center text-white">
            {property.type === 'residential' && (
              <span className="text-xs font-medium">
                Residential | {property.bedrooms || 0} Bed | {property.bathrooms || 0} Bath
              </span>
            )}
            
            {property.type === 'commercial' && (
              <span className="text-xs font-medium">
                Commercial | {property.size} sqft | {property.offices || 0} Space{property.offices !== 1 ? 's' : ''}
              </span>
            )}
            
            {property.type === 'land' && (
              <span className="text-xs font-medium">
                Land | {property.size} sqft
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Property Details */}
      <div className="p-4">
        {/* Title */}
        <h3 
          className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-gold transition-colors duration-300"
          title={property.title}
        >
          {shortTitle}
        </h3>
        
        {/* Location */}
        <p className="flex items-center text-gray-600 text-sm mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gold" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {property.location}
        </p>
        
        {/* Price and Action Button in Knight Frank style */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <div className="text-gray-900 font-bold">
            {priceDisplay()}
          </div>
          <Link 
            href={`/property/${property.id}`} 
            className="bg-gold hover:bg-gold/90 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors inline-flex items-center"
          >
            Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
