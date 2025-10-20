export enum Page {
  HOME = 'home',
  BIDDING = 'bidding',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation',
  ABOUT = 'about',
  CONTACT = 'contact',
  TERMS = 'terms',
  PROFILE = 'profile',
  MANAGE_BOOKING = 'manage_booking',
  ADMIN_DASHBOARD = 'admin_dashboard',
  ADMIN_USERS = 'admin_users',
  ADMIN_BOOKINGS = 'admin_bookings',
  ADMIN_CARS = 'admin_cars',
}

export enum CarCategory {
  ECONOMY = 'Economy',
  COMPACT = 'Compact',
  SUV = 'SUV',
  LUXURY = 'Luxury',
  VAN = 'Van',
}

export interface AddOns {
  gps: boolean;
  babySeat: boolean;
}

export interface BookingRequest {
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  carCategory: CarCategory;
  proposedPrice: number;
  addOns: AddOns;
}

export interface Car {
  id: string;
  name: string;
  category: CarCategory;
  imageUrl: string;
  seats: number;
  storage: string;
}

export interface Agency {
  id: string;
  name: string;
  rating: number;
  logoUrl: string;
}

export interface Offer {
  id: string;
  agency: Agency;
  car: Car;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
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
