import { Car, Agency, User, BookingHistoryItem, CarCategory, BookingStatus } from './types';

export const AGENCIES: Agency[] = [
  { id: 'agency-1', name: 'Maroc-Car', rating: 4.5, logoUrl: 'https://picsum.photos/seed/maroc-car-logo/40/40' },
  { id: 'agency-2', name: 'Atlas Rent', rating: 4.8, logoUrl: 'https://picsum.photos/seed/atlas-rent-logo/40/40' },
  { id: 'agency-3', name: 'Sahara Wheels', rating: 4.2, logoUrl: 'https://picsum.photos/seed/sahara-logo/40/40' },
  { id: 'agency-4', name: 'Casablanca Drives', rating: 4.6, logoUrl: 'https://picsum.photos/seed/casa-drives-logo/40/40' },
];

export const CARS_DATA: Car[] = [
  { id: 'car-1', name: 'Dacia Logan', category: CarCategory.ECONOMY, imageUrl: 'https://picsum.photos/seed/dacia/400/300', seats: 5, storage: '2 bags' },
  { id: 'car-2', name: 'Renault Clio', category: CarCategory.ECONOMY, imageUrl: 'https://picsum.photos/seed/clio/400/300', seats: 5, storage: '2 bags' },
  { id: 'car-3', name: 'Hyundai i20', category: CarCategory.COMPACT, imageUrl: 'https://picsum.photos/seed/hyundai/400/300', seats: 5, storage: '3 bags' },
  { id: 'car-4', name: 'Dacia Duster', category: CarCategory.SUV, imageUrl: 'https://picsum.photos/seed/duster/400/300', seats: 5, storage: '4 bags' },
  { id: 'car-5', name: 'Peugeot 3008', category: CarCategory.SUV, imageUrl: 'https://picsum.photos/seed/peugeot/400/300', seats: 5, storage: '4 bags' },
  { id: 'car-6', name: 'Mercedes C-Class', category: CarCategory.LUXURY, imageUrl: 'https://picsum.photos/seed/mercedes/400/300', seats: 5, storage: '3 bags' },
  { id: 'car-7', name: 'Dacia Lodgy', category: CarCategory.VAN, imageUrl: 'https://picsum.photos/seed/lodgy/400/300', seats: 7, storage: '5 bags' },
  { id: 'car-8', name: 'VW Touareg', category: CarCategory.LUXURY, imageUrl: 'https://picsum.photos/seed/touareg/400/300', seats: 5, storage: '5 bags' },
];

export const USERS_DATA: User[] = [
    { id: 'user-1', name: 'Alex Morocco', email: 'alex.m@example.com', role: 'customer' },
    { id: 'user-2', name: 'Fatima Zahra', email: 'fatima.z@example.com', role: 'customer' },
    { id: 'user-3', name: 'Admin Kree', email: 'admin@kree.com', role: 'admin' },
];

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date();
nextWeek.setDate(tomorrow.getDate() + 7);

const lastMonth_start = new Date();
lastMonth_start.setMonth(lastMonth_start.getMonth() - 1);
const lastMonth_end = new Date();
lastMonth_end.setMonth(lastMonth_end.getMonth() - 1);
lastMonth_end.setDate(lastMonth_end.getDate() + 7);


export const BOOKING_HISTORY_DATA: BookingHistoryItem[] = [
    {
        bookingId: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
        carName: 'Dacia Duster',
        carImageUrl: 'https://picsum.photos/seed/duster/400/300',
        agencyName: 'Atlas Rent',
        pickupDate: tomorrow.toISOString().split('T')[0],
        returnDate: nextWeek.toISOString().split('T')[0],
        totalPrice: 280,
        status: 'Upcoming' as BookingStatus
    },
    {
        bookingId: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
        carName: 'Renault Clio',
        carImageUrl: 'https://picsum.photos/seed/clio/400/300',
        agencyName: 'Maroc-Car',
        pickupDate: lastMonth_start.toISOString().split('T')[0],
        returnDate: lastMonth_end.toISOString().split('T')[0],
        totalPrice: 195,
        status: 'Completed' as BookingStatus
    },
];
