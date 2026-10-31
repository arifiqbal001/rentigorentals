import type { Vehicles } from '@/entities';

// ONE place for business details. Change here and it updates on every page.
export const SITE = {
  name: 'Rentigo Rental',
  url: 'https://rentigorental.com',
  phone: '9330315009',
  phoneDisplay: '+91 93303 15009',
  address: '8, E Mall Rd, K.B.Sarani, Arjunpur, Kaikhali, Kolkata, West Bengal 700080',
};

export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;
export const telLink = `tel:+91${SITE.phone}`;
export const waLink = (text = 'Hi Rentigo, I want to book a self drive car in Kolkata') =>
  `https://wa.me/91${SITE.phone}?text=${encodeURIComponent(text)}`;

// Hourly pickup / drop slots (24x7)
export const TIMES = Array.from({ length: 24 }, (_, i) => `${i % 12 || 12}:00 ${i < 12 ? 'AM' : 'PM'}`);

// Shown ONLY while the CMS "vehicles" collection is empty. Add cars in the CMS and these disappear.
const base = { isAvailable: true, hasAc: true, luggageCapacity: '2 bags', description: 'Clean, insured and well maintained. Pickup and drop at our Kaikhali, Kolkata location.' };
export const DEMO_VEHICLES: Vehicles[] = [
  { _id: 'd1', name: 'Maruti Swift Dzire', vehicleSlug: 'maruti-swift-dzire-self-drive-kolkata', type: 'Sedan', numberOfSeats: 5, fuelType: 'Petrol', transmissionType: 'Manual', rentalPricePerDay: 1499, ...base },
  { _id: 'd2', name: 'Hyundai i20', vehicleSlug: 'hyundai-i20-self-drive-kolkata', type: 'Hatchback', numberOfSeats: 5, fuelType: 'Petrol', transmissionType: 'Manual', rentalPricePerDay: 1599, ...base },
  { _id: 'd3', name: 'Honda City', vehicleSlug: 'honda-city-self-drive-kolkata', type: 'Sedan', numberOfSeats: 5, fuelType: 'Petrol', transmissionType: 'Automatic', rentalPricePerDay: 2199, ...base },
  { _id: 'd4', name: 'Hyundai Creta', vehicleSlug: 'hyundai-creta-self-drive-kolkata', type: 'SUV', numberOfSeats: 5, fuelType: 'Diesel', transmissionType: 'Automatic', rentalPricePerDay: 2799, ...base },
  { _id: 'd5', name: 'Mahindra Thar', vehicleSlug: 'mahindra-thar-self-drive-kolkata', type: 'SUV', numberOfSeats: 4, fuelType: 'Diesel', transmissionType: 'Manual', rentalPricePerDay: 3299, ...base },
  { _id: 'd6', name: 'Toyota Innova Crysta', vehicleSlug: 'toyota-innova-crysta-self-drive-kolkata', type: 'SUV', numberOfSeats: 7, fuelType: 'Diesel', transmissionType: 'Manual', rentalPricePerDay: 3999, ...base },
];
