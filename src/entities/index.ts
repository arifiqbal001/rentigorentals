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
  type?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType number */
  rentalPricePerDay?: number;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
  /** @wixFieldType number */
  numberOfSeats?: number;
}
