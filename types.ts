export enum AppState {
  FORM,
  BIDDING,
  CONFIRMATION
}

export enum Page {
  HOME,
  ABOUT,
  CONTACT,
  TERMS,
  PROFILE,
}

export enum CarCategory {
  ECONOMY = 'Economy',
  COMPACT = 'Compact',
  SUV = 'SUV',
  LUXURY = 'Luxury',
  VAN = 'Van'
}

export interface BookingRequest {
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  carCategory: CarCategory;
  proposedPrice: number;
}

export interface Agency {
  name: string;
  rating: number;
  logoUrl: string;
}

export interface Car {
    name: string;
    imageUrl: string;
    category: CarCategory;
    seats: number;
    storage: string;
}

export interface Offer {
  id: string;
  car: Car;
  agency: Agency;
  price: number; // per day
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface BookingHistoryItem {
  bookingId: string;
  carName: string;
  agencyName: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: 'Completed' | 'Upcoming' | 'Cancelled';
  carImageUrl: string;
}