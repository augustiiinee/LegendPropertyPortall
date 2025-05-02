import { Link } from 'wouter';
import SectionHeading from '@/components/ui/section-heading';

type PropertyCategory = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};

const propertyCategories: PropertyCategory[] = [
  {
    id: 'residential',
    title: 'Residential Properties',
    description: 'Find your dream home with our exclusive selection of residential properties ranging from apartments to luxury villas.',
    imageUrl: '/images/hero/hero1.jpeg',
    link: '/properties?type=residential'
  },
  {
    id: 'commercial',
    title: 'Commercial Properties',
    description: 'Discover prime commercial spaces for your business including office buildings, retail spaces, and warehouses.',
    imageUrl: '/images/hero/hero2.jpeg',
    link: '/properties?type=commercial'
  },
  {
    id: 'land',
    title: 'Land',
    description: 'Invest in high-potential land for development or agricultural purposes across prime locations in Kenya.',
    imageUrl: '/images/hero/hero3.jpeg',
    link: '/properties?type=land'
  }
];

export default function PropertyCategories() {
  return (
    <section id="categories" className="py-16 md:py-24 bg-gold">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Our Property Categories"
          description="Explore our diverse range of property offerings"
          alignment="center"
          titleClass="text-white"
          descriptionClass="text-white"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {propertyCategories.map((category) => (
            <div 
              key={category.id}
              className="group bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={category.imageUrl} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-montserrat font-bold text-white z-10">{category.title}</h3>
              </div>
              
              <div className="p-6">
                <p className="text-neutral-dark mb-6">{category.description}</p>
                <Link href={category.link} className="inline-flex items-center font-montserrat font-medium text-secondary hover:text-primary transition">
                  View Properties
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}