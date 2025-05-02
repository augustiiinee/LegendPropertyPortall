import SectionHeading from '@/components/ui/section-heading';
import { Award, Home, CheckCircle, MapPin, Users, Briefcase } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gold">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Legend Management"
          description="Absolute Property Solutions Since 2003"
          titleClass="text-white"
          descriptionClass="text-white text-xl"
        />
        
        <div className="max-w-5xl mx-auto mt-12">
          <div className="w-full bg-gold/20 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white/10 p-6 rounded-lg border border-white/30 backdrop-blur-sm">
                <h3 className="font-montserrat font-semibold text-2xl text-white mb-4 flex items-center">
                  <Home className="h-6 w-6 mr-2" />
                  Our Story
                </h3>
                <p className="text-white leading-relaxed">
                  Founded in 2003, Legend Management Limited has established itself as a premier real estate consultancy and property management firm with over 22 years of industry experience across Kenya's major cities including Nairobi, Mombasa, and Kisumu.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg border border-white/30 backdrop-blur-sm">
                <h3 className="font-montserrat font-semibold text-2xl text-white mb-4 flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  Vision & Mission
                </h3>
                <p className="text-white leading-relaxed">
                  Our mission is to deliver integrated property solutions with professional integrity and industry expertise. Our vision is to be the most trusted leader in Kenya's real estate sector, enhancing the performance and longevity of our clients' investments.
                </p>
              </div>
            </div>
            
            <h3 className="font-montserrat font-semibold text-2xl text-white mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              What Sets Us Apart
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-5 border border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold shadow-md">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h4 className="font-montserrat font-medium text-lg text-white ml-4">Professional Expertise</h4>
                </div>
                <p className="text-white">Delivering exceptional property management with specialized knowledge of Kenyan real estate markets.</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-5 border border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold shadow-md">
                    <Users className="h-6 w-6" />
                  </div>
                  <h4 className="font-montserrat font-medium text-lg text-white ml-4">Client Commitment</h4>
                </div>
                <p className="text-white">Creating customized solutions for individuals, corporations, government agencies, and institutions.</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-5 border border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold shadow-md">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h4 className="font-montserrat font-medium text-lg text-white ml-4">Nationwide Presence</h4>
                </div>
                <p className="text-white">Serving clients across Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and Nanyuki with local market expertise.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
