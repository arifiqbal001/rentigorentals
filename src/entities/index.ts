/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: vehicles
 * Interface for Vehicles
 */
export interface Vehicles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  luggageCapacity?: string;
  /** @wixFieldType boolean */
  hasAc?: boolean;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  galleryImage3?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  galleryImage2?: string;
  /** @wixFieldType text */
  vehicleSlug?: string;
  /** @wixFieldType text */
  fuelType?: string;
  /** @wixFieldType text */
  transmissionType?: string;
  /** @wixFieldType text */
  type?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType number */
  rentalPricePerDay?: number;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
  /** @wixFieldType number */
  numberOfSeats?: number;
}

/**
 * Collection ID: bookings
 * Interface for Bookings (booking requests from the website forms)
 */
export interface Bookings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  phone?: string;
  /** @wixFieldType text */
  vehicleName?: string;
  /** @wixFieldType text */
  pickupDate?: string;
  /** @wixFieldType text */
  pickupTime?: string;
  /** @wixFieldType text */
  dropDate?: string;
  /** @wixFieldType text */
  dropTime?: string;
  /** @wixFieldType text */
  note?: string;
  /** @wixFieldType text */
  status?: string;
}
