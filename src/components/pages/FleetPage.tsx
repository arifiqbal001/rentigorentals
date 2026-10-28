import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Vehicles>('vehicles');
      setVehicles(result.items || []);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const vehicleTypes = ['all', ...new Set(vehicles.map((v) => v.type).filter(Boolean))];

  const filteredVehicles =
    selectedType === 'all' ? vehicles : vehicles.filter((v) => v.type === selectedType);

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
              Our Premium Fleet
            </h1>
            <p className="font-paragraph text-lg text-gray-300 max-w-2xl mx-auto">
              Explore our carefully curated selection of well-maintained vehicles for your self-drive rental needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-6 md:px-8 bg-white border-b border-gray-200">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {vehicleTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`font-paragraph text-sm px-6 py-2 rounded-full transition-all ${
                  selectedType === type
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'All Vehicles' : type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Grid Section */}
      <section className="py-24 px-6 md:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-[120rem] mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <LoadingSpinner />
            </div>
          ) : filteredVehicles.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredVehicles.map((vehicle) => (
                <motion.div
                  key={vehicle._id}
                  variants={itemVariants}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all hover:shadow-xl"
                >
                  {/* Glassmorphism card */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <Image
                      src={vehicle.mainImage || 'https://static.wixstatic.com/media/2ab110_541cf182860d4fe1ad1bbab85f6eb5ba~mv2.png?originWidth=576&originHeight=384'}
                      alt={vehicle.name || 'Vehicle'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                    {/* Availability Badge */}
                    {vehicle.isAvailable !== undefined && (
                      <div className="absolute top-4 right-4">
                        <span
                          className={`font-heading text-xs px-3 py-1 rounded-full ${
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

                  <div className="p-6">
                    <h3 className="font-heading text-2xl text-gray-900 mb-2">{vehicle.name || 'Vehicle Name'}</h3>
                    {vehicle.type && (
                      <p className="font-paragraph text-sm text-blue-600 mb-4 capitalize">{vehicle.type}</p>
                    )}

                    {vehicle.description && (
                      <p className="font-paragraph text-sm text-gray-600 mb-4 line-clamp-2">
                        {vehicle.description}
                      </p>
                    )}

                    {/* Specifications */}
                    <div className="space-y-3 mb-6">
                      {vehicle.numberOfSeats && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="font-paragraph text-gray-700">{vehicle.numberOfSeats} Seats</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span className="font-paragraph text-gray-700">Automatic Transmission</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-paragraph text-gray-700">Full Insurance Included</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      {vehicle.rentalPricePerDay ? (
                        <>
                          <p className="font-heading text-2xl text-gray-900 mb-1">
                            ₹{vehicle.rentalPricePerDay}/day
                          </p>
                          <p className="font-paragraph text-xs text-gray-600">Flexible rental periods available</p>
                        </>
                      ) : (
                        <p className="font-paragraph text-sm text-gray-600">Price on request</p>
                      )}
                    </div>

                    <Link to={`/book-now?car=${vehicle._id}`}>
                      <Button className="w-full bg-blue-600 text-white font-heading rounded-full py-2 hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2">
                        Book This Car <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-24">
              <p className="font-paragraph text-lg text-gray-600 mb-6">No vehicles available at the moment.</p>
              <Link to="/">
                <Button className="bg-blue-600 text-white font-heading px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                  Back to Home
                </Button>
              </Link>
            </div>
          )}
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
              Can't Find Your Perfect Car?
            </h2>
            <p className="font-paragraph text-lg text-gray-300 max-w-2xl mx-auto mb-12">
              Contact us for custom rental options and special requests
            </p>

            <Link to="/contact">
              <Button className="bg-blue-600 text-white font-heading text-base px-8 py-3 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
