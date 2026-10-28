import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, Mail, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    preferredCar: searchParams.get('car') || '',
    pickupDate: searchParams.get('pickupDate') || '',
    pickupTime: '',
    returnDate: searchParams.get('returnDate') || '',
    returnTime: '',
    pickupLocation: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setIsLoadingVehicles(true);
      const result = await BaseCrudService.getAll<Vehicles>('vehicles');
      setVehicles(result.items || []);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setIsLoadingVehicles(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.preferredCar) newErrors.preferredCar = 'Please select a car';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
    if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
    if (!formData.returnTime) newErrors.returnTime = 'Return time is required';
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';

    // Validate dates
    if (formData.pickupDate && formData.returnDate) {
      const pickupDateTime = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
      const returnDateTime = new Date(`${formData.returnDate}T${formData.returnTime}`);

      if (returnDateTime <= pickupDateTime) {
        newErrors.returnDate = 'Return date/time must be after pickup date/time';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate booking submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store booking data in session storage for thank you page
      sessionStorage.setItem('bookingData', JSON.stringify(formData));

      // Redirect to thank you page
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
              Book Your Car
            </h1>
            <p className="font-paragraph text-lg text-gray-300 max-w-2xl mx-auto">
              Complete your booking details and we'll confirm your reservation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-24 px-6 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="font-heading text-2xl text-gray-900 mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-blue-600" />
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <motion.div variants={itemVariants}>
                    <label className="font-paragraph text-sm text-gray-700 block mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 rounded-lg border transition-all font-paragraph ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-sm mt-1 font-paragraph">{errors.fullName}</p>
                    )}
                  </motion.div>

                  {/* Mobile Number */}
                  <motion.div variants={itemVariants}>
                    <label className="font-paragraph text-sm text-gray-700 block mb-2">
                      Mobile Number *
                    </label>
                    <Input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="Your mobile number"
                      className={`w-full px-4 py-3 rounded-lg border transition-all font-paragraph ${
                        errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
                    />
                    {errors.mobileNumber && (
                      <p className="text-red-600 text-sm mt-1 font-paragraph">{errors.mobileNumber}</p>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={itemVariants}>
                    <label className="font-paragraph text-sm text-gray-700 block mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-lg border transition-all font-paragraph ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1 font-paragraph">{errors.email}</p>
                    )}
                  </motion.div>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Vehicle Selection Section */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="font-heading text-2xl text-gray-900 mb-6 flex items-center gap-3">
                  <ChevronRight className="w-6 h-6 text-blue-600" />
                  Select Your Vehicle
                </h2>

                <motion.div variants={itemVariants}>
                  <label className="font-paragraph text-sm text-gray-700 block mb-2">
                    Preferred Car *
                  </label>
                  {isLoadingVehicles ? (
                    <div className="flex justify-center py-4">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <select
                      name="preferredCar"
                      value={formData.preferredCar}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all font-paragraph ${
                        errors.preferredCar ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
                    >
                      <option value="">-- Select a car --</option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                          {vehicle.name} {vehicle.rentalPricePerDay ? `(₹${vehicle.rentalPricePerDay}/day)` : ''}
                        </option>
                      ))}
                    </select>
                  )}
                  {errors.preferredCar && (
                    <p className="text-red-600 text-sm mt-1 font-paragraph">{errors.preferredCar}</p>
                  )}
                </motion.div>
              </motion.div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Rental Dates Section */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="font-heading text-2xl text-gray-900 mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  Rental Dates & Times
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pickup Date */}
                  <motion.div variants={itemVariants}>
                    <label className="font-paragraph text-sm text-gray-700 block mb-2">
                      Pickup Date *
                    </label>
                    <Input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all font-paragraph ${
                        errors.pickupDate ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
                    />
                    {errors.pickupDate && (
                      <p className="text-red-600 text-sm mt-1 font-paragraph">{errors.pickupDate}</p>
                    )}
                  </motion.div>

                  {/* Pickup Time */}
                  <motion.div variants={itemVariants}>
                    <label className="font-paragraph text-sm text-gray-700 block mb-2">
                      Pickup Time *
                    </label>
                    <Input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all font-paragraph ${
                        errors.pickupTime ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
                    />
                    {errors.pickupTime && (
                      <p className="text-red-600 text-sm mt-1 font-paragraph">{errors.pickupTime}</p>
                    )}
                  </motion.div>

                  {/* Return Date */}
                  <motion.div variants={itemVariants}>
                    <label className="font-paragraph text-sm text-gray-700 block mb-2">
                      Return Date *
                    </label>
                    <Input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all font-paragraph ${
                        errors.returnDate ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
                    />
                    {errors.returnDate && (
                      <p className="text-red-600 text-sm mt-1 font-paragraph">{errors.returnDate}</p>
                    )}
                  </motion.div>

                  {/* Return Time */}
                  <motion.div variants={itemVariants}>
                    <label className="font-paragraph text-sm text-gray-700 block mb-2">
                      Return Time *
                    </label>
                    <Input
                      type="time"
                      name="returnTime"
                      value={formData.returnTime}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all font-paragraph ${
                        errors.returnTime ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
                    />
                    {errors.returnTime && (
                      <p className="text-red-600 text-sm mt-1 font-paragraph">{errors.returnTime}</p>
                    )}
                  </motion.div>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Location & Message Section */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="font-heading text-2xl text-gray-900 mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Pickup Location & Additional Info
                </h2>

                <div className="space-y-6">
                  {/* Pickup Location */}
                  <motion.div variants={itemVariants}>
                    <label className="font-paragraph text-sm text-gray-700 block mb-2">
                      Pickup Location *
                    </label>
                    <Input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      placeholder="e.g., Park Street, Kolkata"
                      className={`w-full px-4 py-3 rounded-lg border transition-all font-paragraph ${
                        errors.pickupLocation ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
                    />
                    {errors.pickupLocation && (
                      <p className="text-red-600 text-sm mt-1 font-paragraph">{errors.pickupLocation}</p>
                    )}
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={itemVariants}>
                    <label className="font-paragraph text-sm text-gray-700 block mb-2">
                      Additional Message (Optional)
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any special requests or additional information..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-paragraph resize-none"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="pt-6 border-t border-gray-200"
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-heading py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? 'Processing Your Booking...' : 'Complete Booking'}
                </Button>
                <p className="font-paragraph text-sm text-gray-600 text-center mt-4">
                  Our team will contact you to confirm your booking details
                </p>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
