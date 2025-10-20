import React, { useState } from 'react';
import { BookingRequest, CarCategory, User } from '../types';

interface BookingFormProps {
  onSubmit: (details: BookingRequest) => void;
  currentUser: User | null;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, currentUser }) => {
  const [pickupLocation, setPickupLocation] = useState('Casablanca');
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [carCategory, setCarCategory] = useState<CarCategory>(CarCategory.ECONOMY);
  const [proposedPrice, setProposedPrice] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      pickupLocation,
      pickupDate,
      returnDate,
      carCategory,
      proposedPrice,
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      {currentUser && (
        <p className="text-center text-gray-600 mb-6 -mt-2">
          Welcome back, {currentUser.name}! Let's find your next ride.
        </p>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
        
        {/* Location and Dates */}
        <div className="lg:col-span-1">
          <label htmlFor="location" className="block text-sm font-medium text-white-700 mb-1">Pickup Location</label>
          <input type="text" id="location" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" required />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <div>
            <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
            <input type="date" id="pickup-date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" required />
          </div>
          <div>
            <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
            <input type="date" id="return-date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} min={pickupDate} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" required />
          </div>
        </div>
        
        {/* Car and Price */}
        <div className="md:col-span-1">
            <label htmlFor="car-category" className="block text-sm font-medium text-gray-700 mb-1">Car Category</label>
            <select id="car-category" value={carCategory} onChange={(e) => setCarCategory(e.target.value as CarCategory)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary bg-white">
                {Object.values(CarCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </div>
        <div className="md:col-span-1">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Your Price (per day)</label>
            <div className="flex items-center">
                <input type="range" min="15" max="150" value={proposedPrice} onChange={(e) => setProposedPrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary" />
                <span className="ml-4 font-semibold text-brand-dark w-20 text-center">{proposedPrice} EUR</span>
            </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 lg:col-span-1">
          <button type="submit" className="w-full bg-brand-primary hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Find My Ride
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
