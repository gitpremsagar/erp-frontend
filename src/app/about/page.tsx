import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  // Award, 
  Target, 
  Heart, 
  Shield, 
  Truck, 
  // Package,
  Star,
  // MapPin,
  Phone,
  Mail,
  // Clock,
  CheckCircle
} from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'We maintain the highest standards of quality for all Haldiram products'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority in every transaction'
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      description: 'Timely and efficient delivery services across the region'
    },
    {
      icon: Users,
      title: 'Trust & Integrity',
      description: 'Building long-term relationships based on trust and transparency'
    }
  ];

  const milestones = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'Started as a small distributor with a vision to serve quality products'
    },
    {
      year: '2015',
      title: 'Regional Expansion',
      description: 'Expanded operations to cover multiple districts and cities'
    },
    {
      year: '2018',
      title: 'Quality Certification',
      description: 'Achieved ISO certification for quality management systems'
    },
    {
      year: '2023',
      title: 'Digital Transformation',
      description: 'Launched online platform for better customer service'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      description: 'Over 15 years of experience in food distribution industry'
    },
    {
      name: 'Priya Sharma',
      role: 'Operations Manager',
      description: 'Expert in supply chain management and quality control'
    },
    {
      name: 'Amit Patel',
      role: 'Sales Director',
      description: 'Specialized in building strong customer relationships'
    },
    {
      name: 'Sneha Reddy',
      role: 'Quality Assurance Head',
      description: 'Ensures all products meet Haldiram\'s strict standards'
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-primary text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About Sri Gopal Traders
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Your trusted partner for authentic Haldiram products with over a decade of excellence in distribution
              </p>
              {/* CTA Button: Our Story & Contact Us */}
              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Our Story
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Contact Us
                </Button>
              </div> */}
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in 2010, we started with a simple mission: to bring the authentic taste of Haldiram products to every household and business in our region. What began as a small family business has grown into one of the most trusted distributors in the area.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Over the years, we&apos;ve built strong relationships with retailers, restaurants, and institutions, becoming their preferred supplier for all Haldiram products. Our commitment to quality, reliability, and customer service has been the cornerstone of our success.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">ISO Certified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Authorized Distributor</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl p-8">
                  <Building2 className="h-24 w-24 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                    Trusted by 500+ Businesses
                  </h3>
                  <p className="text-gray-600 text-center">
                    From small retail stores to large restaurant chains, we serve customers across multiple cities with the same dedication and quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We strive to be the most reliable and trusted distributor of Haldiram products, ensuring quality and authenticity in every delivery.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
                <Target className="h-16 w-16 text-primary mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To provide authentic Haldiram products with exceptional service, ensuring customer satisfaction through reliable delivery, competitive pricing, and unwavering commitment to quality standards.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
                <Star className="h-16 w-16 text-primary mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To become the leading distributor of Haldiram products in our region, known for excellence in service, innovation in delivery, and commitment to building lasting customer relationships.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These values guide everything we do and help us maintain the highest standards of service.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Key milestones that mark our growth and success over the years.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6">
                    <div className="text-3xl font-bold text-primary mb-3">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our dedicated team of professionals ensures that you receive the best service and quality products.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="h-20 w-20 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Get in touch with our team to discuss your Haldiram product requirements and discover how we can serve you better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Phone className="h-5 w-5 mr-2" />
                Call Us Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
