
import React from 'react';
import { Offer } from '../types';
import { StarIcon } from './icons/StarIcon';

interface OfferCardProps {
  offer: Offer;
  onAccept: (offer: Offer) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onAccept }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl animate-fade-in-up">
      <div className="flex flex-col md:flex-row">
        <img src={offer.car.imageUrl} alt={offer.car.name} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-brand-dark">{offer.car.name}</h3>
                <p className="text-sm text-gray-500">{offer.car.category}</p>
              </div>
              <div className="flex items-center">
                <img src={offer.agency.logoUrl} alt={offer.agency.name} className="w-8 h-8 rounded-full mr-2" />
                <div>
                  <p className="text-sm font-semibold">{offer.agency.name}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <StarIcon className="w-4 h-4 text-brand-secondary mr-1" />
                    {offer.agency.rating}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-4">
              <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg> {offer.car.seats} Seats</span>
              <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v2h2a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8a2 2 0 012-2h2V4z" /></svg> {offer.car.storage}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-end">
            <div>
              <p className="text-sm text-gray-500">Price per day</p>
              <p className="text-3xl font-bold text-brand-primary">{offer.price} <span className="text-lg">EUR</span></p>
            </div>
            <button
              onClick={() => onAccept(offer)}
              className="bg-brand-secondary hover:bg-opacity-90 text-brand-dark font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Accept & Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
