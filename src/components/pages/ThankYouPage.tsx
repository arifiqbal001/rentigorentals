import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PHONE_NUMBER = '9330315009';
const PHONE_LINK = `tel:+91${PHONE_NUMBER}`;
const EMAIL = 'info@rentigo.com';

export default function ThankYouPage() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Retrieve booking data from session storage
      const data = sessionStorage.getItem('bookingData');
      if (data) {
        setBookingData(JSON.parse(data));
        // Clear the session storage after retrieving
        sessionStorage.removeItem('bookingData');
      }
    } catch (error) {
      console.error('Error parsing booking data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // If no booking data after loading, redirect to home after 5 seconds
    if (!isLoading && !bookingData) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, bookingData, navigate]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="pt-32 pb-24 px-6 md:px-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Thank You Section */}
      <section className="pt-32 pb-24 px-6 md:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 100 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <CheckCircle className="w-24 h-24 text-blue-600 relative" />
              </div>
            </motion.div>

            {/* Main Message */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="font-heading text-5xl md:text-6xl text-gray-900 mb-4">
                Booking Confirmed!
              </h1>
              <p className="font-paragraph text-xl text-gray-600 leading-relaxed">
                Thank you for your booking enquiry. Our team will contact you shortly to confirm all the details and finalize your reservation.
              </p>
            </motion.div>

            {/* Booking Details */}
            {bookingData && (
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 border border-blue-200 mb-8 text-left"
              >
                <h2 className="font-heading text-2xl text-gray-900 mb-6">Your Booking Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-paragraph text-sm text-gray-600 mb-1">Full Name</p>
                    <p className="font-heading text-lg text-gray-900">{bookingData.fullName}</p>
                  </div>

                  <div>
                    <p className="font-paragraph text-sm text-gray-600 mb-1">Mobile Number</p>
                    <p className="font-heading text-lg text-gray-900">{bookingData.mobileNumber}</p>
                  </div>

                  <div>
                    <p className="font-paragraph text-sm text-gray-600 mb-1">Email Address</p>
                    <p className="font-heading text-lg text-gray-900">{bookingData.email}</p>
                  </div>

                  <div>
                    <p className="font-paragraph text-sm text-gray-600 mb-1">Pickup Location</p>
                    <p className="font-heading text-lg text-gray-900">{bookingData.pickupLocation}</p>
                  </div>

                  <div>
                    <p className="font-paragraph text-sm text-gray-600 mb-1">Pickup Date & Time</p>
                    <p className="font-heading text-lg text-gray-900">
                      {bookingData.pickupDate} at {bookingData.pickupTime}
                    </p>
                  </div>

                  <div>
                    <p className="font-paragraph text-sm text-gray-600 mb-1">Return Date & Time</p>
                    <p className="font-heading text-lg text-gray-900">
                      {bookingData.returnDate} at {bookingData.returnTime}
                    </p>
                  </div>
                </div>

                {bookingData.message && (
                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <p className="font-paragraph text-sm text-gray-600 mb-2">Additional Message</p>
                    <p className="font-paragraph text-gray-700 italic">{bookingData.message}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Next Steps */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h3 className="font-heading text-2xl text-gray-900 mb-6">What Happens Next?</h3>

              <div className="space-y-4 text-left">
                {[
                  {
                    step: '1',
                    title: 'Confirmation Call',
                    description: 'Our team will call you within 2 hours to confirm your booking details',
                  },
                  {
                    step: '2',
                    title: 'Payment Processing',
                    description: 'We'll discuss payment options and secure your reservation',
                  },
                  {
                    step: '3',
                    title: 'Pickup Instructions',
                    description: 'You'll receive detailed pickup instructions and vehicle information',
                  },
                  {
                    step: '4',
                    title: 'Enjoy Your Ride',
                    description: 'Pick up your car and start your self-drive adventure!',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold">
                      {item.step}
                    </div>
                    <div className="text-left">
                      <p className="font-heading text-gray-900 mb-1">{item.title}</p>
                      <p className="font-paragraph text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="mb-8">
              <p className="font-paragraph text-gray-600 mb-6">
                If you have any questions, feel free to reach out to us:
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={PHONE_LINK} className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-heading px-6 py-3 rounded-full transition-colors border border-blue-200">
                  <Phone className="w-5 h-5" />
                  {PHONE_NUMBER}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-heading px-6 py-3 rounded-full transition-colors border border-blue-200">
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/fleet">
                <Button className="bg-gray-900 text-white font-heading px-8 py-3 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
                  Explore More Cars <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="bg-white border-2 border-gray-900 text-gray-900 font-heading px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-24 px-6 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-gray-900 mb-8">
              Important Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Documents Required',
                  items: [
                    'Valid driving license',
                    'ID proof (Aadhar/Passport)',
                    'Address proof',
                    'Credit/Debit card for security deposit',
                  ],
                },
                {
                  title: 'What\'s Included',
                  items: [
                    'Comprehensive insurance',
                    '24/7 roadside assistance',
                    'Free fuel top-up',
                    'GPS navigation system',
                  ],
                },
                {
                  title: 'Cancellation Policy',
                  items: [
                    'Free cancellation up to 24 hours',
                    '50% refund within 24 hours',
                    'No refund within 6 hours',
                    'Contact us for modifications',
                  ],
                },
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 text-left"
                >
                  <h3 className="font-heading text-xl text-gray-900 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="font-paragraph text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-blue-600 font-bold mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
