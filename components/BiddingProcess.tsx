
import React, { useState, useEffect, useMemo } from 'react';
import { BookingRequest, Offer, Agency, Car } from '../types';
import { AGENCIES, CARS } from '../constants';
import OfferCard from './OfferCard';
import { generateTripItinerary } from '../services/geminiService';

interface BiddingProcessProps {
  bookingDetails: BookingRequest;
  onOfferAccepted: (offer: Offer) => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        <h3 className="text-2xl font-semibold mt-4">Searching for the best offers...</h3>
        <p className="text-gray-600">Our partner agencies are preparing their bids for you!</p>
    </div>
);

const BiddingProcess: React.FC<BiddingProcessProps> = ({ bookingDetails, onOfferAccepted }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isSearching, setIsSearching] = useState(true);
  const [itinerary, setItinerary] = useState<string>('');
  const [itineraryLoading, setItineraryLoading] = useState(true);

  const durationInDays = useMemo(() => {
    const pickup = new Date(bookingDetails.pickupDate);
    const dropoff = new Date(bookingDetails.returnDate);
    const diffTime = Math.abs(dropoff.getTime() - pickup.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [bookingDetails.pickupDate, bookingDetails.returnDate]);

  useEffect(() => {
    // Simulate receiving offers
    const relevantCars = CARS.filter(c => c.category === bookingDetails.carCategory);
    
    const timeouts = AGENCIES.map((agency, index) => {
        return setTimeout(() => {
            const car = relevantCars[Math.floor(Math.random() * relevantCars.length)];
            const priceVariance = (Math.random() - 0.2) * 10; // -2 to +8 EUR variance
            const newOffer: Offer = {
                id: `${agency.name}-${car.name}-${Date.now()}`,
                agency,
                car,
                price: Math.round(bookingDetails.proposedPrice + priceVariance)
            };
            setOffers(prev => [...prev].sort((a,b) => a.price - b.price).concat(newOffer));
        }, (index + 1) * 1500);
    });

    const searchTimeout = setTimeout(() => setIsSearching(false), AGENCIES.length * 1500 + 500);
    
    // Fetch Gemini Itinerary
    const fetchItinerary = async () => {
      setItineraryLoading(true);
      const generatedItinerary = await generateTripItinerary(bookingDetails.pickupLocation, durationInDays);
      setItinerary(generatedItinerary);
      setItineraryLoading(false);
    };

    fetchItinerary();
    
    return () => {
        timeouts.forEach(clearTimeout);
        clearTimeout(searchTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingDetails]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold mb-4">Your Offers</h2>
        {isSearching && offers.length === 0 && <LoadingSpinner />}
        <div className="space-y-4">
            {offers.map(offer => (
                <OfferCard key={offer.id} offer={offer} onAccept={onOfferAccepted} />
            ))}
        </div>
        {!isSearching && offers.length === 0 && (
            <div className="text-center p-8 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold">No offers matched your price.</h3>
                <p className="text-gray-600">Try adjusting your proposed price or car category and search again.</p>
            </div>
        )}
      </div>
      <div className="lg:col-span-1">
        <div className="sticky top-8 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 011.447-.894L9 9m0 11l6-3m-6 3V9m6 8l6-3V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            Trip Idea
          </h3>
          <p className="text-sm text-gray-500 mb-4">While you wait, here's a Gemini-powered itinerary for your {durationInDays}-day trip from {bookingDetails.pickupLocation}:</p>
          {itineraryLoading ? (
            <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : (
            <div className="prose prose-sm max-h-96 overflow-y-auto" dangerouslySetInnerHTML={{ __html: itinerary.replace(/\n/g, '<br />') }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiddingProcess;
