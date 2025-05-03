import { Link } from 'wouter';
import { FaBuilding, FaHandshake, FaClipboardCheck, FaChartLine } from 'react-icons/fa';

export default function ServicesPage() {
  return (
    <div className="bg-neutral-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl">
            At Legend Management Limited, we provide an integrated suite of real estate services 
            designed to meet the diverse needs of property owners, investors, institutions, and individuals.
          </p>
        </div>
      </div>
      
      {/* Introduction */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8">
            With shared leadership and expertise from our sister company, Legend Valuers Limited, 
            we combine in-depth industry knowledge, regulatory understanding, and market analysis 
            to deliver results-driven solutions in the following core areas:
          </p>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Property Management */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary p-6 text-white flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Property Management</h3>
                <FaBuilding className="h-8 w-8 text-amber-300" />
              </div>
              <div className="p-6">
                <p className="mb-4">
                  We manage a wide range of properties—residential, commercial, industrial, and mixed-use—with 
                  the aim of maximising returns and preserving long-term value. Our approach is hands-on, 
                  responsive, and tailored to each client's goals.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Lease Administration:</strong> We handle lease documentation, renewals, compliance monitoring, and tenant onboarding to ensure seamless occupancy and legal protection.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Rent Collection and Arrears Management:</strong> We implement efficient billing systems, enforce payment schedules, and manage arrears diplomatically to protect revenue streams.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Maintenance Coordination:</strong> Our team oversees regular inspections, preventive maintenance, and emergency repairs to keep properties safe, functional, and attractive.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Facilities Management:</strong> We coordinate service contracts, utilities, and environmental systems, focusing on cost-efficiency, sustainability, and operational excellence.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Regulatory Compliance:</strong> We ensure all property operations adhere to statutory requirements, including safety, taxation, and zoning laws.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Estate Agency */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary p-6 text-white flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Estate Agency</h3>
                <FaHandshake className="h-8 w-8 text-amber-300" />
              </div>
              <div className="p-6">
                <p className="mb-4">
                  Our estate agency services are designed to simplify property transactions and connect 
                  clients to valuable real estate opportunities.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Sales and Acquisitions:</strong> We facilitate the purchase and sale of residential, commercial, and investment properties, offering guidance on pricing, market positioning, and due diligence.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Letting Services:</strong> We support landlords by marketing properties, conducting tenant screenings, drafting leases, and managing the move-in process.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Market Research and Advisory:</strong> Using up-to-date data and local knowledge, we provide clients with insights into market trends, property values, and investment opportunities.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Project Consultancy */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary p-6 text-white flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Project Consultancy</h3>
                <FaClipboardCheck className="h-8 w-8 text-amber-300" />
              </div>
              <div className="p-6">
                <p className="mb-4">
                  We provide strategic advice and management support throughout the property development 
                  lifecycle, helping clients bring their visions to life efficiently and profitably.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Project Feasibility and Planning:</strong> We evaluate the technical, financial, and legal viability of proposed developments to support informed decision-making.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Development Coordination:</strong> From design to construction and handover, we oversee all project phases to ensure timeliness, budget control, and quality standards are met.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Investment Appraisal:</strong> We assess return potential, risks, and financing options for proposed developments or acquisitions, helping clients make sound, data-backed investments.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Valuation */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary p-6 text-white flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Valuation</h3>
                <FaChartLine className="h-8 w-8 text-amber-300" />
              </div>
              <div className="p-6">
                <p className="mb-4">
                  We deliver reliable, objective valuation services across multiple asset classes. 
                  Our valuation reports are used for financing, insurance, legal proceedings, taxation, 
                  investment, and accounting purposes.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Mortgage Valuations:</strong> We conduct valuations for banks, SACCOs, and other lenders to determine fair market value of properties for loan security and refinancing.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Public Auction & Forced Sale:</strong> We provide professional valuations to guide distressed sales, ensuring accurate asset pricing and optimal recovery in debt enforcement scenarios.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Insurance Valuation:</strong> We assess replacement costs to support appropriate insurance coverage, helping property owners avoid underinsurance or overpayment.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Agricultural Valuation:</strong> We specialize in valuing crops, floriculture farms, greenhouses, and associated production equipment—vital for agribusiness investments.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span><strong>Rental Assessment:</strong> We determine current and projected rental values for a wide range of properties, guiding lease negotiations, rent reviews, and investment planning.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-primary-light to-primary p-8 rounded-lg text-white text-center">
            <h3 className="text-2xl font-semibold mb-4">Need Professional Property Services?</h3>
            <p className="mb-6">Contact our team today for a consultation tailored to your specific needs.</p>
            <Link href="/#contact" className="inline-block bg-amber-400 hover:bg-amber-500 text-primary font-semibold px-6 py-3 rounded-md transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}