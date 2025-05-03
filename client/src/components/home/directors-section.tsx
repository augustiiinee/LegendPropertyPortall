import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import SectionHeading from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function DirectorsSection() {
  // Leadership preview data for homepage
  const leadershipPreview = [
    {
      id: 1,
      name: "Mr. Boniface K. Terer",
      position: "Chief Executive Officer",
    },
    {
      id: 2,
      name: "Mr. David C. Ruto",
      position: "Director, Agency Marketing & Letting",
    },
    {
      id: 3,
      name: "Mr. Geoffrey Koros",
      position: "Director, Property Management",
    }
  ];
  
  return (
    <section id="directors" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Our Leadership Team"
          description="Meet the experienced professionals guiding Legend Management Limited to success."
        />
        
        <div className="mt-12 max-w-4xl mx-auto bg-primary/5 p-8 rounded-lg">
          <h3 className="font-montserrat font-semibold text-xl text-primary mb-6 text-center">Board of Directors</h3>
          
          <div className="grid grid-cols-1 gap-4 mb-8">
            {leadershipPreview.map((leader) => (
              <div key={leader.id} className="border-l-4 border-primary pl-4 py-1">
                <h4 className="font-medium text-primary">{leader.name}</h4>
                <p className="text-neutral-700">{leader.position}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-neutral-700 mb-6">
              Our leadership team brings over 79 years of combined experience in property consulting and real estate management across Kenya.
            </p>
            <Link href="/directors">
              <Button variant="primary" className="flex items-center gap-2 mx-auto">
                <span>View Director Profiles</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-neutral-700 max-w-2xl mx-auto mb-6">
            Legend Management Limited is a premier property consultancy firm established in Kenya. 
            We specialize in providing integrated solutions in property valuation, facility management, project management, 
            and investment appraisal across Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and Nanyuki.
          </p>
          <Link href="/about">
            <Button variant="secondary" className="font-medium">
              Learn More About Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}