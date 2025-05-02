import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card,
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type PropertyFiltersProps = {
  onFilterChange: (filters: {
    location: string;
    propertyType: string;
    priceRange: string;
  }) => void;
};

export default function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [location, setLocation] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  
  // Fetch filter options (locations, property types)
  const { data: filterOptions } = useQuery({
    queryKey: ['/api/properties/filter-options'],
    // Default queryFn will be used from queryClient
  });
  
  const handleApplyFilters = () => {
    onFilterChange({
      location,
      propertyType,
      priceRange
    });
  };
  
  // Apply filters when changed
  useEffect(() => {
    handleApplyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Card className="bg-white rounded-lg shadow-md p-4 mb-10">
      <CardContent className="p-0">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto flex-1">
            <Label className="block text-sm font-medium text-neutral mb-1">Location</Label>
            <Select 
              value={location}
              onValueChange={setLocation}
            >
              <SelectTrigger className="w-full px-3 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-secondary">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {filterOptions?.locations && filterOptions.locations.map((loc: string) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
                {!filterOptions?.locations && (
                  <>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="city-center">City Center</SelectItem>
                    <SelectItem value="suburbs">Suburbs</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto flex-1">
            <Label className="block text-sm font-medium text-neutral mb-1">Property Type</Label>
            <Select 
              value={propertyType}
              onValueChange={setPropertyType}
            >
              <SelectTrigger className="w-full px-3 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-secondary">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {filterOptions?.propertyTypes && filterOptions.propertyTypes.map((type: string) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
                {!filterOptions?.propertyTypes && (
                  <>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto flex-1">
            <Label className="block text-sm font-medium text-neutral mb-1">Price Range</Label>
            <Select 
              value={priceRange}
              onValueChange={setPriceRange}
            >
              <SelectTrigger className="w-full px-3 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-secondary">
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Price</SelectItem>
                <SelectItem value="100000-250000">$100k - $250k</SelectItem>
                <SelectItem value="250000-500000">$250k - $500k</SelectItem>
                <SelectItem value="500000-1000000">$500k - $1M</SelectItem>
                <SelectItem value="1000000-99999999">$1M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto flex items-end">
            <Button 
              onClick={handleApplyFilters}
              className="w-full bg-secondary hover:bg-secondary-light text-white font-montserrat font-medium"
            >
              Filter Properties
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
