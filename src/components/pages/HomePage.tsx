import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, MapPin, Clock, Shield, Users, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PHONE_NUMBER = '9330315009';
const PHONE_LINK = `tel:+91${PHONE_NUMBER}`;

export default function HomePage() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-700 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[120rem] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="font-paragraph text-sm text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400/20">
                ✨ Premium Self-Drive Rental in Kolkata
              </span>
            </motion.div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight leading-tight">
              Self Drive Car Rental in Kolkata
            </h1>

            <p className="font-paragraph text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience the freedom of self-drive car rental with our premium fleet. No driver, no hassle—just you, the road, and your perfect ride.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/book-now">
                <Button className="bg-blue-600 text-white font-heading text-base px-8 py-3 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                  Book Your Car Now <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href={PHONE_LINK}>
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white font-heading text-base px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-all"
                >
                  Call Us: {PHONE_NUMBER}
                </Button>
              </a>
            </div>

            {/* Hero Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://static.wixstatic.com/media/2ab110_1b265a23443e4581973b27d2bf9485e4~mv2.png?originWidth=1152&originHeight=576"
                alt="Premium self-drive cars in Kolkata"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">Why Choose Rentigo?</h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Premium self-drive car rental experience with unmatched convenience and reliability
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: MapPin,
                title: 'Easy Pickup & Drop',
                description: 'Convenient locations across Kolkata with flexible pickup and drop-off options',
              },
              {
                icon: Clock,
                title: 'Flexible Booking',
                description: 'Hourly, daily, or weekly rentals tailored to your travel needs',
              },
              {
                icon: Shield,
                title: 'Full Insurance',
                description: 'Comprehensive insurance coverage included in every rental',
              },
              {
                icon: Users,
                title: '24/7 Support',
                description: 'Round-the-clock customer support for a worry-free experience',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg overflow-hidden"
              >
                {/* Glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-xl text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="font-paragraph text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section className="py-24 px-6 md:px-8 bg-gray-50">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">Our Premium Fleet</h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated selection of well-maintained vehicles
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all hover:shadow-xl"
              >
                {/* Glassmorphism card */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <Image
                    src="https://static.wixstatic.com/media/2ab110_064a5f8d7baf48f599e42fcb8c02e26e~mv2.png?originWidth=576&originHeight=384"
                    alt={`Premium car ${index}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-xl text-gray-900 mb-2">Car Model {index}</h3>
                  <p className="font-paragraph text-sm text-gray-600 mb-4">Premium sedan for comfort and style</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="font-paragraph text-gray-700">5 Seats</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="font-paragraph text-gray-700">Automatic Transmission</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <p className="font-heading text-2xl text-gray-900 mb-1">
                      ₹[Price]/day
                    </p>
                    <p className="font-paragraph text-xs text-gray-600">Flexible rental periods available</p>
                  </div>

                  <Link to="/book-now">
                    <Button className="w-full bg-blue-600 text-white font-heading rounded-full py-2 hover:bg-blue-700 transition-colors">
                      Book This Car
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link to="/fleet">
              <Button className="bg-gray-900 text-white font-heading px-8 py-3 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
                View Full Fleet <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">How It Works</h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, transparent, and hassle-free booking process
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { step: '1', title: 'Browse Fleet', description: 'Explore our premium collection of vehicles' },
              { step: '2', title: 'Select Dates', description: 'Choose your pickup and drop-off dates' },
              { step: '3', title: 'Confirm Booking', description: 'Complete payment and get instant confirmation' },
              { step: '4', title: 'Enjoy Your Ride', description: 'Pick up your car and hit the road' },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 border border-blue-200 text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-heading text-lg font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-heading text-xl text-gray-900 mb-3">{item.title}</h3>
                    <p className="font-paragraph text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-blue-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Travel Inspiration Section */}
      <section className="py-24 px-6 md:px-8 bg-gray-50">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">Explore Kolkata & Beyond</h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Discover popular destinations and travel routes from Kolkata
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { destination: 'Darjeeling', distance: '600 km', description: 'Mountain beauty and tea gardens' },
              { destination: 'Sundarbans', distance: '80 km', description: 'Tiger reserve and mangrove forests' },
              { destination: 'Shantiniketan', distance: '160 km', description: 'Cultural heritage and art hub' },
            ].map((place, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                  <Image
                    src="https://static.wixstatic.com/media/2ab110_498056e4ff3c416c9a9a4188d53b1136~mv2.png?originWidth=448&originHeight=320"
                    alt={place.destination}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-2xl text-gray-900 mb-2">{place.destination}</h3>
                  <p className="font-paragraph text-sm text-blue-600 mb-3">{place.distance} from Kolkata</p>
                  <p className="font-paragraph text-gray-600 text-sm mb-6">{place.description}</p>
                  <Link to="/book-now">
                    <Button className="w-full bg-blue-600 text-white font-heading rounded-full py-2 hover:bg-blue-700 transition-colors">
                      Plan Your Trip
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from our satisfied customers
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Business Traveler',
                review: 'Excellent service and well-maintained cars. The booking process was smooth and the team was very helpful.',
                rating: 5,
              },
              {
                name: 'Priya Sharma',
                role: 'Tourist',
                review: 'Perfect for exploring Kolkata at my own pace. Great value for money and friendly customer support.',
                rating: 5,
              },
              {
                name: 'Amit Patel',
                role: 'Weekend Traveler',
                review: 'Reliable cars, transparent pricing, and hassle-free experience. Highly recommended!',
                rating: 5,
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 border border-blue-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-paragraph text-gray-700 mb-6 leading-relaxed italic">"{review.review}"</p>
                <div>
                  <p className="font-heading text-gray-900">{review.name}</p>
                  <p className="font-paragraph text-sm text-gray-600">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 md:px-8 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[120rem] mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="font-paragraph text-lg text-gray-300 max-w-2xl mx-auto mb-12">
              Book your self-drive car rental in Kolkata today and experience the freedom of the road
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-now">
                <Button className="bg-blue-600 text-white font-heading text-base px-8 py-3 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                  Book Now <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href={PHONE_LINK}>
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white font-heading text-base px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-all"
                >
                  Call: {PHONE_NUMBER}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: showScrollToTop ? 1 : 0, opacity: showScrollToTop ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40 cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowRight className="w-5 h-5 text-white rotate-[-90deg]" />
      </motion.button>
    </div>
  );
}
