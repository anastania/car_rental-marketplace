import { Agency, Car, CarCategory, User, BookingHistoryItem } from './types';

export const AGENCIES: Agency[] = [
  { name: 'Maroc Auto', rating: 4.5, logoUrl: 'https://picsum.photos/seed/agency1/40/40' },
  { name: 'Atlas Wheels', rating: 4.8, logoUrl: 'https://picsum.photos/seed/agency2/40/40' },
  { name: 'Sahara Drives', rating: 4.2, logoUrl: 'https://picsum.photos/seed/agency3/40/40' },
  { name: 'Casablanca Cars', rating: 4.9, logoUrl: 'https://picsum.photos/seed/agency4/40/40' },
];

export const CARS: Car[] = [
  { name: 'Dacia Logan', category: CarCategory.ECONOMY, imageUrl: 'https://picsum.photos/seed/dacia/400/300', seats: 5, storage: '2 bags' },
  { name: 'Hyundai i10', category: CarCategory.ECONOMY, imageUrl: 'https://picsum.photos/seed/hyundaii10/400/300', seats: 4, storage: '1 bag' },
  { name: 'Renault Clio', category: CarCategory.COMPACT, imageUrl: 'https://picsum.photos/seed/clio/400/300', seats: 5, storage: '2 bags' },
  { name: 'Peugeot 208', category: CarCategory.COMPACT, imageUrl: 'https://picsum.photos/seed/peugeot208/400/300', seats: 5, storage: '2 bags' },
  { name: 'Dacia Duster', category: CarCategory.SUV, imageUrl: 'https://picsum.photos/seed/duster/400/300', seats: 5, storage: '3 bags' },
  { name: 'Hyundai Tucson', category: CarCategory.SUV, imageUrl: 'https://picsum.photos/seed/tucson/400/300', seats: 5, storage: '4 bags' },
  { name: 'Mercedes C-Class', category: CarCategory.LUXURY, imageUrl: 'https://picsum.photos/seed/mercedes/400/300', seats: 5, storage: '3 bags' },
  { name: 'BMW 3 Series', category: CarCategory.LUXURY, imageUrl: 'https://picsum.photos/seed/bmw/400/300', seats: 5, storage: '3 bags' },
  { name: 'Renault Trafic', category: CarCategory.VAN, imageUrl: 'https://picsum.photos/seed/trafic/400/300', seats: 9, storage: '8 bags' },
];

export const MOCK_USER: User = {
  id: 'user-123',
  name: 'Alex Morocco',
  email: 'alex@kree.com',
};

export const MOCK_BOOKING_HISTORY: BookingHistoryItem[] = [
  {
    bookingId: 'BK-12345',
    carName: 'Dacia Duster',
    agencyName: 'Atlas Wheels',
    pickupDate: '2024-04-10',
    returnDate: '2024-04-15',
    totalPrice: 175,
    status: 'Completed',
    carImageUrl: 'https://picsum.photos/seed/duster/400/300'
  },
  {
    bookingId: 'BK-67890',
    carName: 'Renault Clio',
    agencyName: 'Maroc Auto',
    pickupDate: '2024-07-20',
    returnDate: '2024-07-27',
    totalPrice: 210,
    status: 'Upcoming',
    carImageUrl: 'https://picsum.photos/seed/clio/400/300'
  },
  {
    bookingId: 'BK-54321',
    carName: 'Mercedes C-Class',
    agencyName: 'Casablanca Cars',
    pickupDate: '2024-01-05',
    returnDate: '2024-01-08',
    totalPrice: 240,
    status: 'Cancelled',
    carImageUrl: 'https://picsum.photos/seed/mercedes/400/300'
  }
];