import React, { useState } from 'react';
import { BookingRequest, CarCategory } from '../types';
import { generateTripItinerary } from '../services/geminiService';

interface BookingFormProps {
  onSubmit: (details: BookingRequest) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split('T')[0];
  
  const returnDateDefault = new Date();
  returnDateDefault.setDate(returnDateDefault.getDate() + 8);

  const [pickupLocation, setPickupLocation] = useState('Casablanca');
  const [pickupDate, setPickupDate] = useState(tomorrow);
  const [returnDate, setReturnDate] = useState(returnDateDefault.toISOString().split('T')[0]);
  const [carCategory, setCarCategory] = useState<CarCategory>(CarCategory.ECONOMY);
  const [proposedPrice, setProposedPrice] = useState(25);
  const [addOns, setAddOns] = useState({ gps: false, babySeat: false });
  const [itinerary, setItinerary] = useState('');
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);
  const [formError, setFormError] = useState('');

  const handleItineraryGeneration = async () => {
    const pickup = new Date(pickupDate);
    const dropoff = new Date(returnDate);
    if (dropoff <= pickup) {
      setItinerary("Return date must be after pickup date to generate an itinerary.");
      return;
    }
    const diffTime = Math.abs(dropoff.getTime() - pickup.getTime());
    const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (duration > 0 && pickupLocation) {
        setIsGeneratingItinerary(true);
        setItinerary('');
        try {
            const result = await generateTripItinerary(pickupLocation, duration);
            setItinerary(result);
        } catch (error) {
            setItinerary('Could not generate an itinerary. Please try again.');
        } finally {
            setIsGeneratingItinerary(false);
        }
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(returnDate) <= new Date(pickupDate)) {
        setFormError("Return date must be after the pickup date.");
        return;
    }
    setFormError('');
    onSubmit({
      pickupLocation,
      pickupDate,
      returnDate,
      carCategory,
      proposedPrice,
      addOns,
    });
  };

  const handleAddOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAddOns(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto animate-fade-in-up mt-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        <div className="lg:col-span-4">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">Find Your Perfect Ride</h2>
        </div>
        
        <div>
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
          <input type="text" id="pickupLocation" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" required />
        </div>
        
        <div>
          <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
          <input type="date" id="pickupDate" min={today} value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" required />
        </div>
        
        <div>
          <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
          <input type="date" id="returnDate" min={pickupDate || today} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" required />
        </div>

        <div>
            <label htmlFor="carCategory" className="block text-sm font-medium text-gray-700 mb-1">Car Category</label>
            <select id="carCategory" value={carCategory} onChange={(e) => setCarCategory(e.target.value as CarCategory)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary">
                {Object.values(CarCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </div>
        
        <div className="md:col-span-2 lg:col-span-3">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Your Price (per day)</label>
          <div className="flex items-center">
            <input type="range" min="15" max="150" value={proposedPrice} onChange={(e) => setProposedPrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary" />
            <span className="ml-4 font-semibold text-brand-dark w-20 text-center">{proposedPrice} EUR</span>
          </div>
        </div>

        <div className="lg:col-span-1 flex items-center justify-start space-x-4 pt-6">
            <div className="flex items-center">
                <input id="gps" name="gps" type="checkbox" checked={addOns.gps} onChange={handleAddOnchange} className="h-4 w-4 text-brand-primary focus:ring-brand-secondary border-gray-300 rounded" />
                <label htmlFor="gps" className="ml-2 block text-sm text-gray-900">GPS</label>
            </div>
             <div className="flex items-center">
                <input id="babySeat" name="babySeat" type="checkbox" checked={addOns.babySeat} onChange={handleAddOnchange} className="h-4 w-4 text-brand-primary focus:ring-brand-secondary border-gray-300 rounded" />
                <label htmlFor="babySeat" className="ml-2 block text-sm text-gray-900">Baby Seat</label>
            </div>
        </div>

        <div className="lg:col-span-4 mt-4">
            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors shadow-md">
            Find My Ride
            </button>
            {formError && <p className="text-red-500 text-sm mt-2 text-center">{formError}</p>}
        </div>

        <div className="lg:col-span-4 mt-4 border-t pt-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <h3 className="text-lg font-semibold text-brand-dark">Need some inspiration for your trip?</h3>
                <button type="button" onClick={handleItineraryGeneration} disabled={isGeneratingItinerary} className="bg-brand-secondary text-brand-dark font-bold py-2 px-5 rounded-lg hover:bg-opacity-90 disabled:bg-gray-300 flex-shrink-0">
                    {isGeneratingItinerary ? 'Generating...' : 'Suggest a Trip'}
                </button>
            </div>
            {itinerary && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-bold mb-2 text-brand-dark">Suggested Itinerary:</h4>
                    <pre className="whitespace-pre-wrap font-sans text-gray-700 text-sm">{itinerary}</pre>
                </div>
            )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
