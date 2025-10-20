// FIX: Restored file content to fix parsing errors and removed a stale 'FIX' comment.
import React, { useState, useEffect } from 'react';
import { BookingRequest, Offer, CarCategory } from '../types';
import OfferCard from './OfferCard';
import EditOfferModal from './EditOfferModal';
import { CARS_DATA, AGENCIES } from '../constants';

interface BiddingProcessProps {
  bookingDetails: BookingRequest;
  onSelectOffer: (offer: Offer) => void;
  onBack: () => void;
}

const BiddingProcess: React.FC<BiddingProcessProps> = ({ bookingDetails: initialBookingDetails, onSelectOffer, onBack }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState(initialBookingDetails);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setOffers([]);
    const timer = setTimeout(() => {
      // Simulate receiving offers from agencies
      const relevantCars = CARS_DATA.filter(car => car.category === bookingDetails.carCategory);
      const generatedOffers: Offer[] = [];

      AGENCIES.forEach((agency, index) => {
        // Simple logic to decide if an agency makes an offer
        const priceDifference = bookingDetails.proposedPrice - (20 + index * 2 + (Object.values(CarCategory).indexOf(bookingDetails.carCategory) * 5)); // Base price for category
        if (priceDifference > -5 && relevantCars.length > 0) {
          const car = relevantCars[index % relevantCars.length];
          const offerPrice = bookingDetails.proposedPrice + Math.floor(Math.random() * 6) - 2; // +/- a few euros
          generatedOffers.push({
            id: `offer-${index}-${Date.now()}`,
            agency,
            car,
            price: Math.max(15, offerPrice) // ensure price is not too low
          });
        }
      });
      setOffers(generatedOffers.sort((a,b) => a.price - b.price));
      setIsLoading(false);
    }, 2500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [bookingDetails]);

  const handleUpdateBid = (updatedDetails: BookingRequest) => {
    setBookingDetails(updatedDetails);
    setIsEditModalOpen(false);
  }

  const durationInDays = React.useMemo(() => {
    const pickup = new Date(bookingDetails.pickupDate);
    const dropoff = new Date(bookingDetails.returnDate);
    const diffTime = Math.abs(dropoff.getTime() - pickup.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [bookingDetails.pickupDate, bookingDetails.returnDate]);


  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <div className="text-center mb-8">
        <button onClick={onBack} className="text-sm text-brand-primary mb-4 font-semibold">&larr; Back to search form</button>
        <h2 className="text-3xl font-bold text-brand-dark">Agencies are bidding...</h2>
        <p className="text-gray-600 mt-2">
          We've sent your request for a <span className="font-semibold">{bookingDetails.carCategory}</span> car from <span className="font-semibold">{new Date(bookingDetails.pickupDate).toLocaleDateString()}</span> to <span className="font-semibold">{new Date(bookingDetails.returnDate).toLocaleDateString()}</span> for <span className="font-semibold text-brand-primary">{bookingDetails.proposedPrice} EUR/day</span>.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-20">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <p className="text-gray-500">Searching for the best deals...</p>
             <style>{`.loader { border-top-color: #FDBA74; animation: spinner 1.5s linear infinite; } @keyframes spinner { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      ) : offers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <OfferCard key={offer.id} offer={offer} onSelect={() => onSelectOffer(offer)} durationInDays={durationInDays}/>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-brand-dark">No offers yet.</h3>
          <p className="text-gray-500 mt-2">Your proposed price might be a bit low for this category and period. Try adjusting your bid.</p>
          <button onClick={() => setIsEditModalOpen(true)} className="mt-4 bg-brand-secondary text-brand-dark font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors">
            Adjust Bid
          </button>
        </div>
      )}
      
      {isEditModalOpen && (
          <EditOfferModal 
              bookingDetails={bookingDetails}
              onClose={() => setIsEditModalOpen(false)}
              onUpdate={handleUpdateBid}
          />
      )}
    </div>
  );
};

export default BiddingProcess;