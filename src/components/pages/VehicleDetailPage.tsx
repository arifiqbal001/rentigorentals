import { Vehicles } from '@/components/entities';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { motion } from 'framer-motion';
import { AlertCircle, Calendar, ChevronLeft, MessageCircle, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function VehicleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicles | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [rentalDays, setRentalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadVehicle();
  }, [slug]);

  useEffect(() => {
    calculateRentalPrice();
  }, [pickupDate, returnDate, vehicle]);

  const loadVehicle = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Vehicles>('vehicles');
      const foundVehicle = result.items?.find(
        (v) => v.vehicleSlug === slug || v._id === slug
      );
      setVehicle(foundVehicle || null);
    } catch (error) {
      console.error('Error loading vehicle:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateRentalPrice = () => {
    if (!pickupDate || !returnDate || !vehicle?.rentalPricePerDay) {
      setRentalDays(0);
      setTotalPrice(0);
      return;
    }

    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const days = Math.ceil((returnD.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));

    if (days > 0) {
      setRentalDays(days);
      setTotalPrice(days * vehicle.rentalPricePerDay);
    } else {
      setRentalDays(0);
      setTotalPrice(0);
    }
  };

  const galleryImages = [
    vehicle?.mainImage,
    vehicle?.galleryImage2,
    vehicle?.galleryImage3,
  ].filter(Boolean);

  const handleBooking = () => {
    const params = new URLSearchParams({
      car: vehicle?._id || '',
      ...(pickupDate && { pickupDate }),
      ...(returnDate && { returnDate }),
    });
    navigate(`/book-now?${params.toString()}`);
  };

  const handleWhatsAppEnquiry = () => {
    const message = `Hi, I'm interested in booking ${vehicle?.name}. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    // Replace with actual business WhatsApp number
    window.open(`https://wa.me/919876543210?text=${encodedMessage}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-16 px-6 md:px-8 flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="pt-32 pb-16 px-6 md:px-8 bg-gray-50 min-h-screen">
          <div className="max-w-[120rem] mx-auto text-center">
            <h1 className="font-heading text-4xl text-gray-900 mb-4">Vehicle Not Found</h1>
            <p className="font-paragraph text-lg text-gray-600 mb-8">
              Sorry, we couldn't find the vehicle you're looking for.
            </p>
            <Button
              onClick={() => navigate('/fleet')}
              className="bg-blue-600 text-white font-heading px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Back to Fleet
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Back Button */}
      <section className="pt-28 px-6 md:px-8 bg-white">
        <div className="max-w-[120rem] mx-auto">
          <button
            onClick={() => navigate('/fleet')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-paragraph text-sm mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Fleet
          </button>
        </div>
      </section>

      {/* Hero Section with Image Gallery */}
      <section className="px-6 md:px-8 bg-white">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Main Image and Gallery */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Main Image */}
                <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={
                      galleryImages[selectedImageIndex] ||
                      'https://static.wixstatic.com/media/2ab110_541cf182860d4fe1ad1bbab85f6eb5ba~mv2.png?originWidth=576&originHeight=384'
                    }
                    alt={`${vehicle.name} - Image ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {vehicle.isAvailable !== undefined && (
                    <div className="absolute top-4 right-4">
                      <span
                        className={`font-heading text-sm px-4 py-2 rounded-full ${
                          vehicle.isAvailable
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {vehicle.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {galleryImages.length > 1 && (
                  <div className="flex gap-3">
                    {galleryImages.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        whileHover={{ scale: 1.05 }}
                        className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? 'border-blue-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Image
                          src={image || ''}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Pricing Card - Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32 bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="font-heading text-2xl text-gray-900 mb-6">Pricing</h3>

                {/* Daily Rate */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="font-paragraph text-sm text-gray-600 mb-2">Daily Rate</p>
                  <p className="font-heading text-3xl text-blue-600">
                    ₹{vehicle.rentalPricePerDay || 'N/A'}/day
                  </p>
                </div>

                {/* Date Selection */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="font-paragraph text-sm text-gray-700 block mb-2">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-paragraph text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-paragraph text-sm text-gray-700 block mb-2">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-paragraph text-sm"
                    />
                  </div>
                </div>

                {/* Rental Duration and Total */}
                {rentalDays > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6 pb-6 border-b border-gray-200 bg-blue-50 rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-paragraph text-sm text-gray-700">
                        {rentalDays} day{rentalDays > 1 ? 's' : ''}
                      </span>
                      <span className="font-paragraph text-sm text-gray-700">
                        ₹{vehicle.rentalPricePerDay}/day
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-200">
                      <span className="font-heading text-sm text-gray-900">Estimated Total</span>
                      <span className="font-heading text-lg text-blue-600">₹{totalPrice}</span>
                    </div>
                    <p className="font-paragraph text-xs text-gray-600 mt-3">
                      ⓘ Subject to availability and booking confirmation
                    </p>
                  </motion.div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleBooking}
                    disabled={!vehicle.isAvailable}
                    className="w-full bg-blue-600 text-white font-heading py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Book This Car
                  </Button>
                  <Button
                    onClick={handleWhatsAppEnquiry}
                    className="w-full bg-green-600 text-white font-heading py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Enquiry
                  </Button>
                </div>

                {/* Trust Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="font-heading text-sm text-gray-900 mb-3">Why Book With Us?</p>
                  <ul className="space-y-2 font-paragraph text-xs text-gray-600">
                    <li>✓ Verified vehicles</li>
                    <li>✓ Transparent pricing</li>
                    <li>✓ 24/7 support</li>
                    <li>✓ Full insurance included</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vehicle Information Section */}
      <section className="px-6 md:px-8 bg-gray-50 py-16">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl text-gray-900 mb-8">Vehicle Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Name */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <p className="font-paragraph text-sm text-gray-600 mb-2">Vehicle Name</p>
                <p className="font-heading text-xl text-gray-900">{vehicle.name || 'N/A'}</p>
              </div>

              {/* Type */}
              {vehicle.type && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="font-paragraph text-sm text-gray-600 mb-2">Vehicle Type</p>
                  <p className="font-heading text-xl text-gray-900 capitalize">{vehicle.type}</p>
                </div>
              )}

              {/* Seats */}
              {vehicle.numberOfSeats && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <p className="font-paragraph text-sm text-gray-600">Seating Capacity</p>
                  </div>
                  <p className="font-heading text-xl text-gray-900">{vehicle.numberOfSeats} Seats</p>
                </div>
              )}

              {/* Transmission */}
              {vehicle.transmissionType && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <p className="font-paragraph text-sm text-gray-600">Transmission</p>
                  </div>
                  <p className="font-heading text-xl text-gray-900">{vehicle.transmissionType}</p>
                </div>
              )}

              {/* Fuel Type */}
              {vehicle.fuelType && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="font-paragraph text-sm text-gray-600 mb-2">Fuel Type</p>
                  <p className="font-heading text-xl text-gray-900">{vehicle.fuelType}</p>
                </div>
              )}

              {/* AC */}
              {vehicle.hasAc !== undefined && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="font-paragraph text-sm text-gray-600 mb-2">Air Conditioning</p>
                  <p className="font-heading text-xl text-gray-900">
                    {vehicle.hasAc ? '✓ Yes' : '✗ No'}
                  </p>
                </div>
              )}

              {/* Luggage */}
              {vehicle.luggageCapacity && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="font-paragraph text-sm text-gray-600 mb-2">Luggage Capacity</p>
                  <p className="font-heading text-xl text-gray-900">{vehicle.luggageCapacity}</p>
                </div>
              )}
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="font-heading text-xl text-gray-900 mb-4">About This Vehicle</h3>
                <p className="font-paragraph text-gray-700 leading-relaxed">{vehicle.description}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Rental Information Section */}
      <section className="px-6 md:px-8 bg-white py-16">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl text-gray-900 mb-8">Rental Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* What's Included */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
                <h3 className="font-heading text-xl text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  What's Included
                </h3>
                <ul className="space-y-3 font-paragraph text-gray-700">
                  <li>✓ Full insurance coverage</li>
                  <li>✓ Unlimited kilometers</li>
                  <li>✓ 24/7 roadside assistance</li>
                  <li>✓ Free fuel top-up</li>
                  <li>✓ GPS navigation device</li>
                </ul>
              </div>

              {/* Important Notes */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-8 border border-amber-200">
                <h3 className="font-heading text-xl text-gray-900 mb-6 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Important Notes
                </h3>
                <ul className="space-y-3 font-paragraph text-gray-700 text-sm">
                  <li>• Booking request does not confirm reservation</li>
                  <li>• Our team will contact you for confirmation</li>
                  <li>• Valid driving license required</li>
                  <li>• Security deposit applicable</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Process Section */}
      <section className="px-6 md:px-8 bg-gray-50 py-16">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl text-gray-900 mb-12 text-center">How to Book</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Select Dates', desc: 'Choose your pickup and return dates' },
                { step: '2', title: 'Submit Request', desc: 'Fill in your details and submit' },
                { step: '3', title: 'Confirmation', desc: 'We confirm your booking' },
                { step: '4', title: 'Pickup', desc: 'Collect your car and enjoy!' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                >
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-heading text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-lg text-gray-900 mb-2">{item.title}</h3>
                  <p className="font-paragraph text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 p-4 z-40">
        <Button
          onClick={handleBooking}
          disabled={!vehicle.isAvailable}
          className="w-full bg-blue-600 text-white font-heading py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Book This Car
        </Button>
      </div>

      {/* Add padding to prevent content overlap on mobile */}
      <div className="h-24 md:h-0"></div>

      <Footer />
    </div>
  );
}
