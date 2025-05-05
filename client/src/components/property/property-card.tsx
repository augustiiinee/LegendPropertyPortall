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
    // Special case for Blueshield Towers property
    else if (property.title.includes('Blueshield')) {
      return (
        <div className="flex flex-col">
          <span className="text-primary font-bold text-base">Rent: Ksh 75/Sqft</span>
          <span className="text-primary text-sm">Service: Ksh 25/Sqft</span>
          <span className="text-primary text-xs mt-1">Parking: Ksh 6,500/month</span>
        </div>
      );
    }
    // Special case for Finance House property
    else if (property.title.includes('Finance House')) {
      return (
        <div className="flex flex-col">
          <span className="text-primary font-bold text-base">Rent: Ksh 85/Sqft</span>
          <span className="text-primary text-sm">Service: Ksh 30/Sqft</span>
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
    <div className={`
      property-card bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 
      hover:shadow-xl hover:translate-y-[-5px] group
      ${isPremium ? 'border-2 border-primary/30' : ''}
    `}>
      {/* Property Image & Status Badge */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={primaryImage}
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Status Badge */}
        <div className="absolute top-0 right-0 m-3">
          <Badge variant={getBadgeVariant()} className="font-medium uppercase tracking-wider px-3 py-1">
            {property.status}
          </Badge>
        </div>
        
        {/* Featured Badge - Only show for featured properties */}
        {isPremium && (
          <div className="absolute top-0 left-0 m-3">
            <Badge 
              variant="outline" 
              className="bg-primary/90 text-white border-primary font-semibold px-3 py-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </Badge>
          </div>
        )}
        
        {/* Property Type Indicator */}
        <div className="absolute bottom-0 left-0 m-3">
          <span className="inline-flex items-center rounded-md bg-white/90 px-2 py-1 text-xs font-medium">
            {property.type === 'residential' && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-gray-700">Residential</span>
              </>
            )}
            
            {property.type === 'commercial' && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Commercial</span>
              </>
            )}
            
            {property.type === 'land' && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Land</span>
              </>
            )}
          </span>
        </div>
      </div>
      
      {/* Property Details */}
      <div className="p-5">
        {/* Title with tooltip for full title */}
        <h3 
          className="font-semibold text-xl text-primary-light mb-2 hover:text-primary transition-colors duration-300"
          title={property.title}
        >
          {shortTitle}
        </h3>
        
        {/* Location */}
        <p className="flex items-center text-neutral mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {property.location}
        </p>
        
        {/* Property Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {/* Size - shown for all property types */}
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-neutral" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{property.size} sq ft</span>
          </div>
          
          {/* Residential specific features */}
          {property.type === 'residential' && (
            <>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-neutral" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7z" />
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{property.bedrooms || 0} Beds</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-neutral" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{property.bathrooms || 0} Baths</span>
              </div>
            </>
          )}
          
          {/* Commercial specific features */}
          {property.type === 'commercial' && (
            <>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-neutral" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{property.offices || 0} Offices</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-neutral" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span className="text-sm">{property.parking || 0} Parking</span>
              </div>
            </>
          )}
          
          {/* Land specific features - could add more here */}
          {property.type === 'land' && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-neutral" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Land</span>
            </div>
          )}
        </div>
        
        {/* Highlighted Features (if available) */}
        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {property.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="inline-flex px-2 py-1 bg-gray-100 text-xs rounded-md">
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="inline-flex px-2 py-1 bg-gray-100 text-xs rounded-md">
                +{property.features.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Price and Action Button */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <span className="text-primary font-bold text-xl">
            {priceDisplay()}
          </span>
          <Link 
            href={`/property/${property.id}`} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        {/* Property Reference ID and Property Manager */}
        <div className="mt-2 text-xs text-gray-500 flex flex-col">
          <div>Reference: PROP-{property.id.toString().padStart(4, '0')}</div>
          <div className="mt-1 flex items-center text-primary-dark">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>Property Manager: +254746369798</span>
          </div>
        </div>
      </div>
    </div>
  );
}
