import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Shield, MapPin, Phone, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

const WHATSAPP_LINK = 'https://wa.me/message/V5CZDZ4UYO5GI1';
const PHONE_NUMBER = '8584004528';
const PHONE_LINK = `tel:${PHONE_NUMBER}`;

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}>
        <div className="max-w-[120rem] mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="https://static.wixstatic.com/media/2ab110_f0c045c52bac496fa9a7ff186bfc437e~mv2.jpg" alt="Rentigo Tours & Travels Logo" className="h-12 w-auto" />
            <div>
              <h1 className="font-heading text-xl font-bold text-black">RENTIGO</h1>
              <p className="font-paragraph text-xs text-gray-700 tracking-wider">TOURS & TRAVELS</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#services" className="font-paragraph text-sm text-black hover:text-[#0066CC] transition-colors">
              Services
            </a>
            <a href="#invest" className="font-paragraph text-sm text-black hover:text-[#0066CC] transition-colors">
              Invest
            </a>
            <a href="#about" className="font-paragraph text-sm text-black hover:text-[#0066CC] transition-colors">
              About
            </a>
            <a href="#contact" className="font-paragraph text-sm text-black hover:text-[#0066CC] transition-colors">
              Contact
            </a>
          </nav>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#0066CC] text-white font-heading text-sm px-6 py-2 rounded-full hover:bg-black transition-colors">
              Book Now
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 bg-gradient-to-br from-black to-[#1a1a1a]">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
              Explore the World Your Way
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12">
              Premium rental solutions for adventurers, travelers, and explorers. Choose your ride, embrace your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#0066CC] text-white font-heading text-base px-8 py-3 rounded-full hover:bg-[#FFD700] hover:text-black transition-all">
                  Explore Services
                </Button>
              </a>
              <Button variant="outline" className="bg-transparent border-2 border-white text-white font-heading text-base px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-8 bg-white">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-black mb-4">Our Services</h2>
            <p className="font-paragraph text-lg text-gray-700 max-w-2xl mx-auto">
              Tailored mobility solutions for every need and budget
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Scooters for Gig Workers */}
            <motion.div
              variants={itemVariants}
              className="bg-white border-2 border-black rounded-3xl p-8 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#0066CC] rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-2xl text-black mb-4">Scooters for Gig Workers</h3>
              <p className="font-paragraph text-gray-700 mb-6">
                Affordable, reliable scooters designed for delivery partners and gig economy workers. Perfect for daily commutes with minimal maintenance.
              </p>
              <div className="bg-[#F0F8FF] rounded-2xl p-6 mb-6">
                <p className="font-heading text-3xl text-[#0066CC] mb-2">₹250<span className="text-lg">/day</span></p>
                <p className="font-paragraph text-sm text-gray-700">Flexible daily rental</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#0066CC]" />
                  <span className="font-paragraph text-gray-700">Fuel-efficient & eco-friendly</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#0066CC]" />
                  <span className="font-paragraph text-gray-700">24/7 roadside support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#0066CC]" />
                  <span className="font-paragraph text-gray-700">Insurance included</span>
                </li>
              </ul>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-[#0066CC] text-white font-heading rounded-full py-3 hover:bg-black transition-colors">
                  Rent a Scooter
                </Button>
              </a>
            </motion.div>

            {/* Cars & Bikes */}
            <motion.div
              variants={itemVariants}
              className="bg-white border-2 border-black rounded-3xl p-8 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#0066CC] rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-2xl text-black mb-4">Cars & Bikes</h3>
              <p className="font-paragraph text-gray-700 mb-6">
                Premium vehicles for daily use and tourist adventures. Comfortable, well-maintained, and ready for your next journey.
              </p>
              <div className="bg-[#F0F8FF] rounded-2xl p-6 mb-6">
                <p className="font-heading text-3xl text-[#0066CC] mb-2">From ₹500<span className="text-lg">/day</span></p>
                <p className="font-paragraph text-sm text-gray-700">Flexible rental periods</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#0066CC]" />
                  <span className="font-paragraph text-gray-700">Wide vehicle selection</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#0066CC]" />
                  <span className="font-paragraph text-gray-700">Hourly, daily & weekly rates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#0066CC]" />
                  <span className="font-paragraph text-gray-700">Free delivery & pickup</span>
                </li>
              </ul>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-[#0066CC] text-white font-heading rounded-full py-3 hover:bg-black transition-colors">
                  Explore Fleet
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-24 px-8 bg-[#F5F5F5]">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-black mb-4">Why Choose Rentigo?</h2>
            <p className="font-paragraph text-lg text-gray-700 max-w-2xl mx-auto">
              We're committed to providing the best rental experience
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
                icon: Shield,
                title: 'Trusted & Secure',
                description: 'Verified vehicles with comprehensive insurance coverage',
              },
              {
                icon: MapPin,
                title: 'Easy Booking',
                description: 'Simple online process with instant confirmation',
              },
              {
                icon: TrendingUp,
                title: 'Best Prices',
                description: 'Competitive rates with transparent pricing',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="w-16 h-16 bg-[#0066CC] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading text-xl text-black mb-3">{item.title}</h3>
                <p className="font-paragraph text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="invest" className="py-24 px-8 bg-white">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-black mb-4">Investment Opportunity</h2>
            <p className="font-paragraph text-lg text-gray-700 max-w-2xl mx-auto">
              Grow your wealth with our proven scooter rental model
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-black to-[#1a1a1a] rounded-3xl p-12 text-white max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-heading text-3xl mb-8">Investment Package</h3>
                <div className="space-y-6">
                  <div>
                    <p className="font-paragraph text-white/80 text-sm mb-2">Initial Investment</p>
                    <p className="font-heading text-4xl">240000</p>
                  </div>
                  <div>
                    <p className="font-paragraph text-white/80 text-sm mb-2">Monthly Payout</p>
                    <p className="font-heading text-4xl">₹15,000</p>
                  </div>
                  <div>
                    <p className="font-paragraph text-white/80 text-sm mb-2">Duration</p>
                    <p className="font-heading text-4xl">36 Months</p>
                  </div>
                  <div>
                    <p className="font-paragraph text-white/80 text-sm mb-2">Scooters Included</p>
                    <p className="font-heading text-4xl">4 Units</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-2xl mb-6">What You Get</h3>
                <ul className="space-y-4">
                  {[
                    '4 fully maintained scooters',
                    'Complete insurance coverage',
                    'Regular maintenance & repairs',
                    'Guaranteed monthly returns',
                    'Dedicated support team',
                    'Flexible exit options',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1" />
                      <span className="font-paragraph text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-12 border-t border-white/20">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-[#0066CC] text-white font-heading text-lg py-4 rounded-full hover:bg-[#FFD700] hover:text-black transition-colors">
                  Invest Now <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-8 bg-[#F5F5F5]">
        <div className="max-w-[100rem] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-black mb-6">Ready to Get Started?</h2>
            <p className="font-paragraph text-lg text-gray-700 max-w-2xl mx-auto mb-12">
              Join thousands of satisfied customers and experience premium mobility solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-black text-white font-heading text-base px-8 py-3 rounded-full hover:bg-[#0066CC] transition-colors">
                  Book Your Ride
                </Button>
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#0066CC] text-white font-heading text-base px-8 py-3 rounded-full hover:bg-black transition-colors">
                  Become an Investor
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="https://static.wixstatic.com/media/2ab110_f0c045c52bac496fa9a7ff186bfc437e~mv2.jpg" alt="Rentigo Tours & Travels Logo" className="h-10 w-auto" />
              </div>
              <p className="font-paragraph text-white/80 text-sm">
                Premium mobility solutions for everyone
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="font-paragraph text-white/80 text-sm hover:text-white">Scooters</a></li>
                <li><a href="#services" className="font-paragraph text-white/80 text-sm hover:text-white">Cars & Bikes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="font-paragraph text-white/80 text-sm hover:text-white">About Us</a></li>
                <li><a href="#invest" className="font-paragraph text-white/80 text-sm hover:text-white">Invest</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg mb-4">Contact</h4>
              <p className="font-paragraph text-white/80 text-sm mb-2">Email: info@rentigo.com</p>
              <a href={PHONE_LINK} className="font-paragraph text-white/80 text-sm hover:text-white transition-colors inline-block mb-2">
                Call: {PHONE_NUMBER}
              </a>
              <br />
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-paragraph text-white/80 text-sm hover:text-white transition-colors inline-block">
                WhatsApp: Message Us
              </a>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="font-paragraph text-white/80 text-sm">
              © 2025 Rentigo Tours & Travels. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.a>

      {/* Floating CTA Button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 left-8 w-14 h-14 bg-[#0066CC] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
      >
        <Phone className="w-7 h-7 text-white" />
      </motion.a>
    </div>
  );
}
