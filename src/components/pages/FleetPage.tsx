import { Vehicles } from '@/entities';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

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

  // Filter out scooters and bikes - only show cars
  const carsOnly = vehicles.filter((v) => v.type && !['scooty', 'bike', 'scooter'].includes(v.type.toLowerCase()));

  const vehicleTypes = ['all', ...new Set(carsOnly.map((v) => v.type).filter(Boolean))];
  const transmissionTypes = ['all', ...new Set(carsOnly.map((v) => v.transmissionType).filter(Boolean))];
  const fuelTypes = ['all', ...new Set(carsOnly.map((v) => v.fuelType).filter(Boolean))];

  const filteredVehicles = carsOnly.filter((v) => {
    const typeMatch = selectedType === 'all' || v.type === selectedType;
    const transmissionMatch = selectedTransmission === 'all' || v.transmissionType === selectedTransmission;
    const fuelMatch = selectedFuel === 'all' || v.fuelType === selectedFuel;
    const priceMatch = (v.rentalPricePerDay || 0) >= priceRange[0] && (v.rentalPricePerDay || 0) <= priceRange[1];
    return typeMatch && transmissionMatch && fuelMatch && priceMatch;
  });

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

  const getVehicleDetailLink = (vehicle: Vehicles) => {
    return vehicle.vehicleSlug ? `/fleet/${vehicle.vehicleSlug}` : `/fleet/${vehicle._id}`;
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
              Self-Drive Car Rental in Kolkata
            </h1>
            <p className="font-paragraph text-lg text-gray-300 max-w-2xl mx-auto">
              Explore our carefully curated selection of well-maintained vehicles for your self-drive rental needs. Book your perfect car today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-6 md:px-8 bg-white border-b border-gray-200">
        <div className="max-w-[120rem] mx-auto">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-6 flex justify-between items-center">
            <h3 className="font-heading text-lg text-gray-900">Filters</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-heading"
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>

          {/* Filters Container */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-6 md:space-y-0 md:flex md:flex-wrap md:gap-6`}>
            {/* Vehicle Type Filter */}
            <div className="flex-1 min-w-[200px]">
              <p className="font-heading text-sm text-gray-700 mb-3">Vehicle Type</p>
              <div className="flex flex-wrap gap-2">
                {vehicleTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`font-paragraph text-sm px-4 py-2 rounded-full transition-all ${
                      selectedType === type
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type === 'all' ? 'All Types' : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Transmission Filter */}
            {transmissionTypes.length > 1 && (
              <div className="flex-1 min-w-[200px]">
                <p className="font-heading text-sm text-gray-700 mb-3">Transmission</p>
                <div className="flex flex-wrap gap-2">
                  {transmissionTypes.map((trans) => (
                    <button
                      key={trans}
                      onClick={() => setSelectedTransmission(trans)}
                      className={`font-paragraph text-sm px-4 py-2 rounded-full transition-all ${
                        selectedTransmission === trans
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {trans === 'all' ? 'All' : trans}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fuel Type Filter */}
            {fuelTypes.length > 1 && (
              <div className="flex-1 min-w-[200px]">
                <p className="font-heading text-sm text-gray-700 mb-3">Fuel Type</p>
                <div className="flex flex-wrap gap-2">
                  {fuelTypes.map((fuel) => (
                    <button
                      key={fuel}
                      onClick={() => setSelectedFuel(fuel)}
                      className={`font-paragraph text-sm px-4 py-2 rounded-full transition-all ${
                        selectedFuel === fuel
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {fuel === 'all' ? 'All' : fuel}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range Filter */}
            <div className="flex-1 min-w-[200px]">
              <p className="font-heading text-sm text-gray-700 mb-3">Max Price</p>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1"
                />
                <span className="font-paragraph text-sm text-gray-700 whitespace-nowrap">
                  ₹{priceRange[1]}/day
                </span>
              </div>
            </div>

            {/* Reset Filters Button */}
            {(selectedType !== 'all' || selectedTransmission !== 'all' || selectedFuel !== 'all' || priceRange[1] !== 100000) && (
              <div className="w-full md:w-auto">
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedTransmission('all');
                    setSelectedFuel('all');
                    setPriceRange([0, 100000]);
                  }}
                  className="font-paragraph text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Reset Filters
                </button>
              </div>
            )}
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
            <>
              <p className="font-paragraph text-sm text-gray-600 mb-8">
                Showing {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''}
              </p>
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
                    {/* Image Section */}
                    <Link to={getVehicleDetailLink(vehicle)} className="block">
                      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden cursor-pointer">
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
                    </Link>

                    <div className="p-6">
                      <Link to={getVehicleDetailLink(vehicle)} className="block hover:text-blue-600 transition-colors">
                        <h3 className="font-heading text-2xl text-gray-900 mb-2 cursor-pointer">{vehicle.name || 'Vehicle Name'}</h3>
                      </Link>

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
                        {vehicle.transmissionType && (
                          <div className="flex items-center gap-2 text-sm">
                            <Zap className="w-4 h-4 text-blue-600" />
                            <span className="font-paragraph text-gray-700">{vehicle.transmissionType}</span>
                          </div>
                        )}
                        {vehicle.fuelType && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="font-paragraph text-gray-700">{vehicle.fuelType}</span>
                          </div>
                        )}
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

                      <div className="space-y-2">
                        <Link to={getVehicleDetailLink(vehicle)}>
                          <Button className="w-full bg-gray-200 text-gray-900 font-heading rounded-full py-2 hover:bg-gray-300 transition-colors inline-flex items-center justify-center gap-2">
                            View Details <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to={`/book-now?car=${vehicle._id}`}>
                          <Button className="w-full bg-blue-600 text-white font-heading rounded-full py-2 hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2">
                            Book This Car <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <div className="text-center py-24">
              <p className="font-paragraph text-lg text-gray-600 mb-6">No vehicles match your filters.</p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedTransmission('all');
                  setSelectedFuel('all');
                  setPriceRange([0, 100000]);
                }}
                className="font-heading text-blue-600 hover:text-blue-700 underline"
              >
                Reset Filters
              </button>
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
