import { motion } from 'framer-motion';
import { Check, MapPin, Users, Award } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
      <section className="pt-32 pb-16 px-6 md:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[120rem] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl md:text-6xl text-white mb-4 tracking-tight">
              About Rentigo
            </h1>
            <p className="font-paragraph text-lg text-gray-300 max-w-2xl mx-auto">
              Your trusted partner for self-drive car rentals in Kolkata
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Overview Section */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-6">
                Self-Drive Car Rental Service
              </h2>
              <p className="font-paragraph text-lg text-gray-600 mb-6 leading-relaxed">
                Rentigo provides premium self-drive car rental services in Kolkata, offering you the freedom to explore at your own pace. Whether you're a business traveler, tourist, or weekend adventurer, we have the perfect vehicle for your needs.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Wide selection of well-maintained vehicles',
                  'Flexible hourly, daily, and weekly rental options',
                  'Comprehensive insurance coverage included',
                  'Convenient pickup and drop-off locations',
                  '24/7 customer support and roadside assistance',
                  'Transparent pricing with no hidden charges',
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="font-paragraph text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <Link to="/book-now">
                <Button className="bg-blue-600 text-white font-heading px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
                  Book Your Car Today
                </Button>
              </Link>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://static.wixstatic.com/media/2ab110_f184b2d73b9c4b92aae8bd2e3992ab8a~mv2.png?originWidth=896&originHeight=576"
                alt="Premium self-drive cars"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 md:px-8 bg-gray-50">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">Why Choose Rentigo?</h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing an exceptional self-drive rental experience
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
                title: 'Strategic Locations',
                description: 'Multiple pickup and drop-off points across Kolkata for your convenience',
              },
              {
                icon: Users,
                title: 'Customer-Centric',
                description: 'Dedicated support team available 24/7 to assist you anytime',
              },
              {
                icon: Award,
                title: 'Quality Fleet',
                description: 'Well-maintained, regularly serviced vehicles for a safe journey',
              },
              {
                icon: Check,
                title: 'Transparent Pricing',
                description: 'No hidden charges—what you see is what you pay',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-xl text-gray-900 mb-3">{item.title}</h3>
                  <p className="font-paragraph text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">Service Areas</h2>
            <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
              We operate across Kolkata and nearby regions
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
                area: 'Central Kolkata',
                locations: 'Park Street, Connaught Place, Esplanade',
              },
              {
                area: 'South Kolkata',
                locations: 'Alipore, Ballygunge, Kalighat',
              },
              {
                area: 'North Kolkata',
                locations: 'Shyambazar, Barrackpore, Dakshineswar',
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 border border-blue-200 text-center"
              >
                <h3 className="font-heading text-2xl text-gray-900 mb-3">{area.area}</h3>
                <p className="font-paragraph text-gray-600">{area.locations}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
              Experience Self-Drive Freedom Today
            </h2>
            <p className="font-paragraph text-lg text-gray-300 max-w-2xl mx-auto mb-12">
              Book your car and explore Kolkata at your own pace
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-now">
                <Button className="bg-blue-600 text-white font-heading text-base px-8 py-3 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                  Book Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white font-heading text-base px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-all"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
