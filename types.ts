export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  PROFILE = 'PROFILE',
  TERMS = 'TERMS',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ADMIN_USERS = 'ADMIN_USERS',
  ADMIN_BOOKINGS = 'ADMIN_BOOKINGS',
  ADMIN_CARS = 'ADMIN_CARS',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export enum CarCategory {
  ECONOMY = 'Economy',
  COMPACT = 'Compact',
  MIDSIZE = 'Mid-size',
  SUV = 'SUV',
  LUXURY = 'Luxury',
  VAN = 'Van',
}

export interface BookingRequest {
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  carCategory: CarCategory;
  proposedPrice: number;
  addOns: {
    gps: boolean;
    babySeat: boolean;
  };
}

export interface Agency {
    id: string;
    name: string;
    rating: number;
    logoUrl: string;
}

export interface Car {
    id: string;
    name: string;
    category: CarCategory;
    imageUrl: string;
    seats: number;
    storage: string; // e.g., '2 bags'
}

export interface Offer {
    id: string;
    agency: Agency;
    car: Car;
    price: number; // price per day
}

export type BookingStatus = 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled' | 'Confirmed';

export interface BookingHistoryItem {
    bookingId: string;
    carName: string;
    carImageUrl: string;
    agencyName: string;
    pickupDate: string;
    returnDate: string;
    totalPrice: number;
    status: BookingStatus;
}
