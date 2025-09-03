import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Truck, 
  Users, 
  Award, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  Shield,
  Heart
} from 'lucide-react';

export default function Home() {
  const products = [
    {
      name: 'Haldiram Namkeen Mix',
      category: 'Namkeen',
      image: '/namkeen-mix.jpg',
      description: 'Traditional savory snacks mix'
    },
    {
      name: 'Haldiram Sweets',
      category: 'Sweets',
      image: '/sweets.jpg',
      description: 'Premium quality Indian sweets'
    },
    {
      name: 'Haldiram Papad',
      category: 'Papad',
      image: '/papad.jpg',
      description: 'Crispy papad varieties'
    },
    {
      name: 'Haldiram Ready-to-Eat',
      category: 'Ready-to-Eat',
      image: '/ready-to-eat.jpg',
      description: 'Convenient meal solutions'
    }
  ];

  const services = [
    {
      icon: Truck,
      title: 'Bulk Supply',
      description: 'Reliable bulk supply to retailers, restaurants, and institutions'
    },
    {
      icon: Package,
      title: 'Quality Assurance',
      description: 'All products meet Haldiram\'s strict quality standards'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Quick and efficient delivery across the region'
    },
    {
      icon: Shield,
      title: 'Genuine Products',
      description: '100% authentic Haldiram products with warranty'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Restaurant Owner',
      content: 'Excellent service and genuine Haldiram products. Highly recommended!',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Retail Store Owner',
      content: 'Best distributor in the region. Always on time with quality products.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Catering Business',
      content: 'Reliable supplier for all our Haldiram product needs.',
      rating: 5
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
                Sri Gopal Traders
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Your trusted partner for authentic Haldiram products. Serving retailers, restaurants, 
                and institutions with premium quality snacks, sweets, and ready-to-eat foods.
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Order Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </div> */}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Product Varieties</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Product Range
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the complete range of authentic Haldiram products including namkeen, sweets, 
                papad, and ready-to-eat meals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-primary flex items-center justify-center">
                    <Package className="h-16 w-16 text-white" />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-primary font-medium mb-2">{product.category}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive distribution services with a focus on quality, reliability, and customer satisfaction.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  About Our Distribution
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                 {` We are an authorized distributor of Haldiram products, serving the region with 
                  authentic and high-quality food products. With years of experience in the food 
                  distribution industry, we understand the needs of our customers and provide 
                  reliable service.`}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-3" />
                    <span className="text-gray-700">Authorized Haldiram Distributor</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-primary mr-3" />
                    <span className="text-gray-700">Customer-Focused Service</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-3" />
                    <span className="text-gray-700">Quality Guaranteed Products</span>
                  </div>
                </div>
              </div>
              <div className="bg-primary rounded-lg p-8">
                <div className="text-center">
                  <Users className="h-16 w-16 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-yellow-300 mb-2">Serving Since 2014</h3>
                  <p className="text-white">
                    {`Trusted by hundreds of businesses across the region for their Haldiram product needs.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {`Don't just take our word for it. Here's what our valued customers have to say about our service.`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{`"{testimonial.content}"`}</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get In Touch
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                {`Ready to partner with us? Contact us today for bulk orders, pricing, and more information.`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="opacity-90">+91 98765 43210</p>
                <p className="opacity-90">+91 98765 43211</p>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="opacity-90">info@haldiramdistributor.com</p>
                <p className="opacity-90">orders@haldiramdistributor.com</p>
              </div>
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p className="opacity-90">123 Food Street, Market Area</p>
                <p className="opacity-90">City, State - 123456</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Mail className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
