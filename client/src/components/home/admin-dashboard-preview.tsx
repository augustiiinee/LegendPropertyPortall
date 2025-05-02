import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPreview() {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">Property Management System</h2>
          <p className="max-w-3xl mx-auto text-white text-opacity-80">Our comprehensive admin dashboard puts you in control of your property listings.</p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <h3 className="font-montserrat font-semibold text-2xl mb-4">Powerful Admin Features</h3>
            <p className="mb-6 text-white text-opacity-80">
              Our custom-built backend system allows property managers to easily add, edit, and manage properties across the entire portfolio.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-montserrat font-medium text-lg">Easy Property Management</h4>
                  <p className="text-white text-opacity-80">Add, edit, and remove property listings with a user-friendly interface.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-montserrat font-medium text-lg">Image Management</h4>
                  <p className="text-white text-opacity-80">Upload and organize multiple property images with drag-and-drop functionality.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-montserrat font-medium text-lg">Detailed Analytics</h4>
                  <p className="text-white text-opacity-80">Track property views, inquiries, and engagement metrics.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-montserrat font-medium text-lg">Inquiry Management</h4>
                  <p className="text-white text-opacity-80">Receive and respond to client inquiries directly through the dashboard.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/auth">
                <Button variant="outline" className="bg-white text-primary hover:bg-neutral-lightest font-montserrat font-semibold px-6 py-3 rounded-md transition transform hover:scale-105">
                  Request Admin Access
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <div className="bg-white p-2 rounded-lg shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Admin dashboard interface" 
                className="rounded-md w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
