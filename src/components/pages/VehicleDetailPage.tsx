import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Car, Bike, Zap, Users, DollarSign, CheckCircle, XCircle } from 'lucide-react';

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicles | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadVehicle(id);
    }
  }, [id]);

  const loadVehicle = async (vehicleId: string) => {
    try {
      const item = await BaseCrudService.getById<Vehicles>('vehicles', vehicleId);
      setVehicle(item);
    } catch (error) {
      console.error('Error loading vehicle:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    const lowerType = type?.toLowerCase();
    if (lowerType === 'car') return Car;
    if (lowerType === 'bike') return Bike;
    if (lowerType === 'scooty') return Zap;
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="font-paragraph text-lg text-secondary-foreground">Loading vehicle details...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center">
        <p className="font-paragraph text-lg text-secondary-foreground mb-8">Vehicle not found.</p>
        <Link to="/">
          <Button className="bg-primary text-primary-foreground font-heading">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const TypeIcon = getTypeIcon(vehicle.type || '');

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-background border-b border-borderaccent">
        <div className="max-w-[120rem] mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <h2 className="font-heading text-2xl text-primary">VELOCITY RENTALS</h2>
            <Link to="/">
              <Button variant="outline" className="bg-transparent text-secondary-foreground border-borderaccent font-heading hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Vehicle Detail Section */}
      <section className="w-full py-16 px-8">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Image Section */}
            <div className="bg-background border border-borderaccent p-8">
              <div className="aspect-[4/3] bg-secondary flex items-center justify-center overflow-hidden">
                {vehicle.mainImage ? (
                  <Image
                    src={vehicle.mainImage}
                    alt={vehicle.name || 'Vehicle'}
                    width={800}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center">
                    {TypeIcon && <TypeIcon className="w-32 h-32 text-borderaccent opacity-30" />}
                  </div>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {TypeIcon && <TypeIcon className="w-6 h-6 text-primary" />}
                  <span className="font-paragraph text-sm text-secondary-foreground uppercase tracking-wider">
                    {vehicle.type}
                  </span>
                </div>

                <h1 className="font-heading text-5xl md:text-6xl text-primary mb-6 tracking-wide">
                  {vehicle.name}
                </h1>

                <p className="font-paragraph text-lg text-secondary-foreground mb-8 leading-relaxed">
                  {vehicle.description}
                </p>

                {/* Specifications */}
                <div className="border-t border-borderaccent pt-8 mb-8">
                  <h3 className="font-heading text-2xl text-primary mb-6">SPECIFICATIONS</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Users className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-paragraph text-sm text-secondary-foreground">Number of Seats</p>
                        <p className="font-heading text-xl text-primary">{vehicle.numberOfSeats}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <DollarSign className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-paragraph text-sm text-secondary-foreground">Rental Price Per Day</p>
                        <p className="font-heading text-xl text-primary">${vehicle.rentalPricePerDay}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {vehicle.isAvailable ? (
                        <CheckCircle className="w-6 h-6 text-primary" />
                      ) : (
                        <XCircle className="w-6 h-6 text-destructive" />
                      )}
                      <div>
                        <p className="font-paragraph text-sm text-secondary-foreground">Availability Status</p>
                        <p className={`font-heading text-xl ${vehicle.isAvailable ? 'text-primary' : 'text-destructive'}`}>
                          {vehicle.isAvailable ? 'Available Now' : 'Currently Unavailable'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-borderaccent pt-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-primary text-primary-foreground font-heading text-lg px-8 py-6 flex-1 hover:opacity-90"
                    disabled={!vehicle.isAvailable}
                  >
                    {vehicle.isAvailable ? 'RESERVE NOW' : 'NOT AVAILABLE'}
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent text-secondary-foreground border-borderaccent font-heading text-lg px-8 py-6 flex-1 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    CONTACT US
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="w-full bg-primary py-16 px-8">
        <div className="max-w-[100rem] mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-8 tracking-wide">
            RENTAL INFORMATION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <h3 className="font-heading text-2xl text-primary-foreground mb-4">INSURANCE INCLUDED</h3>
              <p className="font-paragraph text-base text-primary-foreground">
                All rentals come with comprehensive insurance coverage for your peace of mind.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-2xl text-primary-foreground mb-4">24/7 SUPPORT</h3>
              <p className="font-paragraph text-base text-primary-foreground">
                Our team is available around the clock to assist you during your rental period.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-2xl text-primary-foreground mb-4">FREE DELIVERY</h3>
              <p className="font-paragraph text-base text-primary-foreground">
                We deliver the vehicle to your location at no additional charge.
              </p>
            </div>
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
                  <Link to="/#vehicles" className="font-paragraph text-base text-secondary-foreground hover:opacity-70">
                    Vehicles
                  </Link>
                </li>
                <li>
                  <Link to="/#about" className="font-paragraph text-base text-secondary-foreground hover:opacity-70">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/#contact" className="font-paragraph text-base text-secondary-foreground hover:opacity-70">
                    Contact
                  </Link>
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
