import { Car, Agency, CarCategory } from './types';

export const AGENCIES: Agency[] = [
    { id: 'agency-1', name: 'Aircar', rating: 4.5, logoUrl: 'https://picsum.photos/seed/aircar/100/100' },
    { id: 'agency-2', name: 'Hertz', rating: 4.8, logoUrl: 'https://picsum.photos/seed/hertz/100/100' },
    { id: 'agency-3', name: 'Europcar', rating: 4.6, logoUrl: 'https://picsum.photos/seed/europcar/100/100' },
    { id: 'agency-4', name: 'Sixt', rating: 4.7, logoUrl: 'https://picsum.photos/seed/sixt/100/100' },
    { id: 'agency-5', name: 'Local Morocco Cars', rating: 4.3, logoUrl: 'https://picsum.photos/seed/local/100/100' },
];

export const CARS_DATA: Car[] = [
    // Economy
    { id: 'car-1', name: 'Dacia Logan', category: CarCategory.ECONOMY, imageUrl: 'https://picsum.photos/seed/dacia-logan/400/300', seats: 5, storage: '2 bags' },
    { id: 'car-2', name: 'Renault Clio', category: CarCategory.ECONOMY, imageUrl: 'https://picsum.photos/seed/renault-clio/400/300', seats: 5, storage: '1 bag' },
    // Compact
    { id: 'car-3', name: 'Hyundai i30', category: CarCategory.COMPACT, imageUrl: 'https://picsum.photos/seed/hyundai-i30/400/300', seats: 5, storage: '2 bags' },
    { id: 'car-4', name: 'Volkswagen Golf', category: CarCategory.COMPACT, imageUrl: 'https://picsum.photos/seed/vw-golf/400/300', seats: 5, storage: '2 bags' },
    // Mid-size
    { id: 'car-5', name: 'Skoda Octavia', category: CarCategory.MIDSIZE, imageUrl: 'https://picsum.photos/seed/skoda-octavia/400/300', seats: 5, storage: '3 bags' },
    { id: 'car-6', name: 'Peugeot 508', category: CarCategory.MIDSIZE, imageUrl: 'https://picsum.photos/seed/peugeot-508/400/300', seats: 5, storage: '3 bags' },
    // SUV
    { id: 'car-7', name: 'Dacia Duster', category: CarCategory.SUV, imageUrl: 'https://picsum.photos/seed/dacia-duster/400/300', seats: 5, storage: '4 bags' },
    { id: 'car-8', name: 'Jeep Compass', category: CarCategory.SUV, imageUrl: 'https://picsum.photos/seed/jeep-compass/400/300', seats: 5, storage: '3 bags' },
    // Luxury
    { id: 'car-9', name: 'Mercedes C-Class', category: CarCategory.LUXURY, imageUrl: 'https://picsum.photos/seed/mercedes-c/400/300', seats: 5, storage: '2 bags' },
    { id: 'car-10', name: 'BMW 3 Series', category: CarCategory.LUXURY, imageUrl: 'https://picsum.photos/seed/bmw-3/400/300', seats: 5, storage: '2 bags' },
    // Van
    { id: 'car-11', name: 'Mercedes Vito', category: CarCategory.VAN, imageUrl: 'https://picsum.photos/seed/mercedes-vito/400/300', seats: 8, storage: '6 bags' },
    { id: 'car-12', name: 'Ford Tourneo', category: CarCategory.VAN, imageUrl: 'https://picsum.photos/seed/ford-tourneo/400/300', seats: 9, storage: '5 bags' },
];
