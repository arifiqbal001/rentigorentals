import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Car, Bike, Zap } from 'lucide-react';

export default function HomePage() {
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicles[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(vehicles.filter(v => v.type?.toLowerCase() === selectedType.toLowerCase()));
    }
  }, [selectedType, vehicles]);

  const loadVehicles = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Vehicles>('vehicles');
      setVehicles(items);
      setFilteredVehicles(items);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const vehicleTypes = [
    { id: 'all', label: 'All Vehicles', icon: null },
    { id: 'car', label: 'Cars', icon: Car },
    { id: 'bike', label: 'Bikes', icon: Bike },
    { id: 'scooty', label: 'Scooties', icon: Zap },
  ];

  const getTypeIcon = (type: string) => {
    const lowerType = type?.toLowerCase();
    if (lowerType === 'car') return Car;
    if (lowerType === 'bike') return Bike;
    if (lowerType === 'scooty') return Zap;
    return null;
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-background border-b border-borderaccent">
        <div className="max-w-[120rem] mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <h2 className="font-heading text-2xl text-primary">VELOCITY RENTALS</h2>
            <nav className="flex gap-8">
              <a href="#vehicles" className="font-paragraph text-base text-secondary-foreground hover:opacity-70 transition-opacity">
                Vehicles
              </a>
              <a href="#about" className="font-paragraph text-base text-secondary-foreground hover:opacity-70 transition-opacity">
                About
              </a>
              <a href="#contact" className="font-paragraph text-base text-secondary-foreground hover:opacity-70 transition-opacity">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Inspired by the image layout */}
      <section className="w-full bg-primary py-24 px-8">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary-foreground mb-16 tracking-wide">
              FREEDOM ON WHEELS: EXPLORE<br />THE CITY, YOUR WAY.
            </h1>
            
            <div className="flex justify-center mb-16">
              <div className="relative">
                <Image
                  src="https://static.wixstatic.com/media/2ab110_0115c08c608d444e820b880193fc8636~mv2.png?originWidth=576&originHeight=384"
                  alt="Featured rental vehicle"
                  width={600}
                  className="w-full max-w-md md:max-w-lg lg:max-w-xl"
                />
                <p className="font-paragraph text-sm text-primary-foreground mt-4 tracking-wider">
                  PREMIUM FLEET
                </p>
              </div>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-foreground tracking-wide">
              DISCOVER YOUR PERFECT RIDE<br />FOR EVERY JOURNEY.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section id="vehicles" className="w-full bg-secondary py-16 px-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex justify-center gap-4 flex-wrap mb-16">
            {vehicleTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  variant={selectedType === type.id ? 'default' : 'outline'}
                  className={`font-heading text-base px-8 py-6 ${
                    selectedType === type.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-transparent text-secondary-foreground border-borderaccent hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5 mr-2" />}
                  {type.label}
                </Button>
              );
            })}
          </div>

          {/* Vehicles Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary-foreground">Loading vehicles...</p>
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary-foreground">No vehicles available in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle, index) => {
                const TypeIcon = getTypeIcon(vehicle.type || '');
                return (
                  <motion.div
                    key={vehicle._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to={`/vehicle/${vehicle._id}`}>
                      <div className="bg-background border border-borderaccent overflow-hidden hover:shadow-lg transition-shadow group">
                        <div className="aspect-[4/3] overflow-hidden bg-secondary">
                          {vehicle.mainImage ? (
                            <Image
                              src={vehicle.mainImage}
                              alt={vehicle.name || 'Vehicle'}
                              width={600}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              {TypeIcon && <TypeIcon className="w-20 h-20 text-borderaccent opacity-30" />}
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            {TypeIcon && <TypeIcon className="w-4 h-4 text-primary" />}
                            <span className="font-paragraph text-xs text-secondary-foreground uppercase tracking-wider">
                              {vehicle.type}
                            </span>
                          </div>
                          <h3 className="font-heading text-2xl text-primary mb-3">
                            {vehicle.name}
                          </h3>
                          <p className="font-paragraph text-base text-secondary-foreground mb-4 line-clamp-2">
                            {vehicle.description}
                          </p>
                          <div className="flex justify-between items-center pt-4 border-t border-borderaccent">
                            <div>
                              <p className="font-paragraph text-sm text-secondary-foreground mb-1">
                                Per Day
                              </p>
                              <p className="font-heading text-3xl text-primary">
                                ${vehicle.rentalPricePerDay}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-paragraph text-sm text-secondary-foreground mb-1">
                                Seats
                              </p>
                              <p className="font-heading text-xl text-primary">
                                {vehicle.numberOfSeats}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <span
                              className={`inline-block px-4 py-2 font-paragraph text-sm ${
                                vehicle.isAvailable
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-secondary text-secondary-foreground border border-borderaccent'
                              }`}
                            >
                              {vehicle.isAvailable ? 'Available' : 'Not Available'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full bg-primary py-24 px-8">
        <div className="max-w-[100rem] mx-auto text-center">
          <h2 className="font-heading text-5xl md:text-6xl text-primary-foreground mb-8 tracking-wide">
            WHY CHOOSE US
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground max-w-3xl mx-auto mb-16 leading-relaxed">
            Experience the ultimate freedom with our premium fleet of vehicles. Whether you need a car for a business trip, a bike for weekend adventures, or a scooty for city commutes, we have the perfect ride waiting for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="text-center">
              <h3 className="font-heading text-3xl text-primary-foreground mb-4">FLEXIBLE RENTALS</h3>
              <p className="font-paragraph text-base text-primary-foreground">
                Rent by the hour, day, or week. We adapt to your schedule.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-3xl text-primary-foreground mb-4">PREMIUM FLEET</h3>
              <p className="font-paragraph text-base text-primary-foreground">
                Well-maintained vehicles that guarantee comfort and safety.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-3xl text-primary-foreground mb-4">EASY BOOKING</h3>
              <p className="font-paragraph text-base text-primary-foreground">
                Simple process to get you on the road in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full bg-secondary py-24 px-8">
        <div className="max-w-[100rem] mx-auto text-center">
          <h2 className="font-heading text-5xl md:text-6xl text-primary mb-8 tracking-wide">
            GET IN TOUCH
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground max-w-2xl mx-auto mb-12">
            Ready to hit the road? Contact us today to reserve your vehicle or learn more about our services.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button className="bg-primary text-primary-foreground font-heading text-lg px-12 py-6 hover:opacity-90">
              BOOK NOW
            </Button>
            <Button variant="outline" className="bg-transparent text-secondary-foreground border-borderaccent font-heading text-lg px-12 py-6 hover:bg-primary hover:text-primary-foreground hover:border-primary">
              CALL US
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-borderaccent py-12 px-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="font-heading text-xl text-primary mb-4">VELOCITY RENTALS</h3>
              <p className="font-paragraph text-base text-secondary-foreground">
                Your trusted partner for vehicle rentals. Freedom on wheels, delivered.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg text-primary mb-4">QUICK LINKS</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#vehicles" className="font-paragraph text-base text-secondary-foreground hover:opacity-70">
                    Vehicles
                  </a>
                </li>
                <li>
                  <a href="#about" className="font-paragraph text-base text-secondary-foreground hover:opacity-70">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="font-paragraph text-base text-secondary-foreground hover:opacity-70">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg text-primary mb-4">CONTACT INFO</h4>
              <p className="font-paragraph text-base text-secondary-foreground mb-2">
                Email: info@velocityrentals.com
              </p>
              <p className="font-paragraph text-base text-secondary-foreground">
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-borderaccent pt-8 text-center">
            <p className="font-paragraph text-sm text-secondary-foreground">
              © 2025 Velocity Rentals. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
