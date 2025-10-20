import React from 'react';
import jsPDF from 'jspdf';
import { BookingRequest, Offer } from '../types';

interface BookingConfirmationProps {
  bookingDetails: BookingRequest;
  selectedOffer: Offer;
  onStartOver: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ bookingDetails, selectedOffer, onStartOver }) => {
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

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Kree Booking Receipt", 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Booking ID: BK-${Date.now()}`, 14, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 47);

    doc.setFontSize(16);
    doc.text("Rental Details", 14, 60);
    doc.setFontSize(12);
    doc.text(`Vehicle: ${car.name} or similar`, 14, 70);
    doc.text(`Agency: ${agency.name}`, 14, 77);
    doc.text(`Pickup: ${bookingDetails.pickupLocation} on ${new Date(bookingDetails.pickupDate).toLocaleDateString()}`, 14, 84);
    doc.text(`Return: ${bookingDetails.pickupLocation} on ${new Date(bookingDetails.returnDate).toLocaleDateString()}`, 14, 91);
    doc.text(`Duration: ${durationInDays} day(s)`, 14, 98);

    doc.setFontSize(16);
    doc.text("Cost Summary", 14, 115);
    doc.setFontSize(12);
    doc.text(`Car Rental (${durationInDays} days @ ${price} EUR/day): ${durationInDays * price} EUR`, 14, 125);
    if(addOnCost > 0) {
        doc.text(`Add-ons (${durationInDays} days @ ${addOnCost} EUR/day): ${durationInDays * addOnCost} EUR`, 14, 132);
    }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Paid: ${totalCost} EUR`, 14, 145);
    
    doc.save(`Kree-Receipt-BK-${Date.now()}.pdf`);
  }

  return (
    <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="mx-auto bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-brand-dark mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">Your Moroccan adventure is waiting. We've sent a confirmation to your email.</p>

        <div className="text-left border-t border-b border-gray-200 py-6 my-6">
          <h3 className="text-xl font-semibold mb-4 text-brand-dark">Your Rental Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold">{car.name} <span className="font-normal text-gray-500">or similar</span></p>
              <p className="text-sm text-gray-600">Rented from: {agency.name}</p>
            </div>
            <img src={car.imageUrl} alt={car.name} className="rounded-lg w-full h-auto md:w-48 object-cover md:ml-auto" />
            <div>
              <p className="font-semibold">Pickup Location</p>
              <p className="text-gray-600">{bookingDetails.pickupLocation}</p>
            </div>
             <div>
              <p className="font-semibold">Pickup Date</p>
              <p className="text-gray-600">{new Date(bookingDetails.pickupDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Return Date</p>
              <p className="text-gray-600">{new Date(bookingDetails.returnDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Total Duration</p>
              <p className="text-gray-600">{durationInDays} day(s)</p>
            </div>
             {(bookingDetails.addOns.gps || bookingDetails.addOns.babySeat) && (
              <div className="md:col-span-2">
                <p className="font-semibold">Selected Add-ons</p>
                <ul className="list-disc list-inside text-gray-600">
                  {bookingDetails.addOns.gps && <li>GPS Navigation</li>}
                  {bookingDetails.addOns.babySeat && <li>Baby Seat</li>}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="text-left">
            <h3 className="text-xl font-semibold mb-2 text-brand-dark">Total Price</h3>
            <p className="text-4xl font-bold text-brand-primary">{totalCost} <span className="text-2xl">EUR</span></p>
            <p className="text-gray-500">(Car: {price} EUR/day, Add-ons: {addOnCost} EUR/day)</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={onStartOver} className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors">
              Make Another Booking
            </button>
             <button onClick={handleDownloadReceipt} className="bg-brand-secondary text-brand-dark font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors">
              Download Receipt
            </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;