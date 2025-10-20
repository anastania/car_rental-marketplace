
import React from 'react';
import { Offer } from '../types';
import { StarIcon } from './icons/StarIcon';

interface OfferCardProps {
  offer: Offer;
  onSelect: () => void;
  durationInDays: number;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onSelect, durationInDays }) => {
  const { agency, car, price } = offer;
  const totalCost = durationInDays * price;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <img src={car.imageUrl} alt={car.name} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-brand-dark">{car.name} <span className="font-normal text-gray-500">or similar</span></h3>
        
        <div className="flex items-center my-2">
            <img src={agency.logoUrl} alt={agency.name} className="w-8 h-8 rounded-full mr-2 object-cover" />
            <div>
                <p className="text-sm font-semibold">{agency.name}</p>
                <div className="flex items-center text-sm text-gray-500">
                    <StarIcon className="text-yellow-400 mr-1" />
                    <span>{agency.rating}</span>
                </div>
            </div>
        </div>

        <div className="flex justify-between items-baseline text-sm text-gray-600 mt-2">
            <span>{car.seats} seats</span>
            <span>{car.storage}</span>
        </div>
        
        <div className="mt-auto pt-4">
            <div className="text-center my-2">
                <p className="text-gray-500 text-sm">Total for {durationInDays} days</p>
                <p className="text-3xl font-bold text-brand-primary">{totalCost} <span className="text-xl font-medium">EUR</span></p>
                <p className="text-gray-500 text-sm">({price} EUR/day)</p>
            </div>
            
            <button
            onClick={onSelect}
            className="w-full bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors mt-2"
            >
            Select & Book
            </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
