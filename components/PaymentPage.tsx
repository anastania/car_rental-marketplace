
import React, { useState } from 'react';
import { BookingRequest, Offer } from '../types';

interface PaymentPageProps {
  bookingDetails: BookingRequest;
  selectedOffer: Offer;
  onPaymentSuccess: () => void;
  onBack: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ bookingDetails, selectedOffer, onPaymentSuccess, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { car, agency, price } = selectedOffer;

  const durationInDays = React.useMemo(() => {
    const pickup = new Date(bookingDetails.pickupDate);
    const dropoff = new Date(bookingDetails.returnDate);
    const diffTime = Math.abs(dropoff.getTime() - pickup.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [bookingDetails.pickupDate, bookingDetails.returnDate]);

  const addOnCost = (bookingDetails.addOns.gps ? 5 : 0) + (bookingDetails.addOns.babySeat ? 7 : 0);
  const totalCost = (durationInDays * price) + (durationInDays * addOnCost);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
       <button onClick={onBack} className="text-sm text-brand-primary mb-4 font-semibold">&larr; Back to offers</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Booking Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">{car.name} ({durationInDays} days)</span>
              <span className="font-semibold">{durationInDays * price} EUR</span>
            </div>
            {bookingDetails.addOns.gps && (
              <div className="flex justify-between">
                <span className="text-gray-600">GPS ({durationInDays} days)</span>
                <span className="font-semibold">{durationInDays * 5} EUR</span>
              </div>
            )}
             {bookingDetails.addOns.babySeat && (
              <div className="flex justify-between">
                <span className="text-gray-600">Baby Seat ({durationInDays} days)</span>
                <span className="font-semibold">{durationInDays * 7} EUR</span>
              </div>
            )}
            <div className="border-t pt-4 mt-4 flex justify-between items-baseline">
              <span className="text-xl font-bold text-brand-dark">Total</span>
              <span className="text-2xl font-bold text-brand-primary">{totalCost} EUR</span>
            </div>
          </div>
          <div className="mt-6 border-t pt-4">
            <p className="font-semibold">{car.name} <span className="font-normal text-gray-500">or similar</span></p>
            <p className="text-sm text-gray-600">From {agency.name}</p>
            <p className="text-sm text-gray-600 mt-2">{bookingDetails.pickupLocation}</p>
            <p className="text-sm text-gray-600">{new Date(bookingDetails.pickupDate).toLocaleDateString()} - {new Date(bookingDetails.returnDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Secure Payment</h2>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">Name on Card</label>
              <input type="text" id="card-name" defaultValue="Alex Morocco" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
              <input type="text" id="card-number" placeholder="•••• •••• •••• 4242" defaultValue="4242 4242 4242 4242" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry</label>
                <input type="text" id="expiry" placeholder="MM/YY" defaultValue="12/28" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
              </div>
              <div className="flex-1">
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                <input type="text" id="cvc" placeholder="•••" defaultValue="123" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
              </div>
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors shadow-md mt-4 disabled:bg-gray-400"
            >
              {isProcessing ? 'Processing...' : `Pay ${totalCost} EUR`}
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">This is a simulated payment process.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
