
import React, { useState } from 'react';
import { BookingRequest } from '../types';

interface EditOfferModalProps {
  bookingDetails: BookingRequest;
  onClose: () => void;
  onUpdate: (updatedDetails: BookingRequest) => void;
}

const EditOfferModal: React.FC<EditOfferModalProps> = ({ bookingDetails, onClose, onUpdate }) => {
  const [proposedPrice, setProposedPrice] = useState(bookingDetails.proposedPrice);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...bookingDetails,
      proposedPrice,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in-up">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <h2 className="text-2xl font-bold text-center text-brand-dark mb-2">Adjust Your Bid</h2>
        <p className="text-center text-gray-500 mb-6">Not getting enough offers? Try increasing your proposed price per day.</p>

        <form onSubmit={handleSubmit}>
            <div className="md:col-span-1">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Your Price (per day)</label>
                <div className="flex items-center">
                    <input type="range" min="15" max="150" value={proposedPrice} onChange={(e) => setProposedPrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary" />
                    <span className="ml-4 font-semibold text-brand-dark w-20 text-center">{proposedPrice} EUR</span>
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
               <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors">
                 Cancel
               </button>
               <button type="submit" className="bg-brand-primary hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded-lg shadow-md">
                 Update Bid
               </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditOfferModal;
