import React from 'react';
import { BookingHistoryItem, BookingStatus } from '../types';

interface ManageBookingPageProps {
  booking: BookingHistoryItem;
  onStatusUpdate: (bookingId: string, status: BookingStatus) => void; // For potential admin use
}

const TimelineStep: React.FC<{ title: string; isActive: boolean; isCompleted: boolean; isFirst?: boolean; isLast?: boolean; }> = ({ title, isActive, isCompleted, isFirst = false, isLast = false }) => {
    return (
        <div className="relative flex items-center">
            {!isFirst && <div className={`flex-auto border-t-2 ${isCompleted || isActive ? 'border-brand-primary' : 'border-gray-300'}`}></div>}
            <div className="flex items-center text-brand-primary z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-brand-primary text-white ring-4 ring-blue-200' : isCompleted ? 'bg-brand-primary text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {isCompleted && !isActive ? '✓' : ''}
                </div>
                <div className={`absolute top-0 mt-8 text-xs font-medium uppercase ${isActive ? 'text-brand-dark' : 'text-gray-500'}`}>{title}</div>
            </div>
            {!isLast && <div className={`flex-auto border-t-2 ${isCompleted ? 'border-brand-primary' : 'border-gray-300'}`}></div>}
        </div>
    );
};


const ManageBookingPage: React.FC<ManageBookingPageProps> = ({ booking, onStatusUpdate }) => {
  const statusOrder: BookingStatus[] = ['Confirmed', 'Upcoming', 'Ongoing', 'Completed'];
  const currentStatusIndex = statusOrder.indexOf(booking.status);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up space-y-8">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-brand-dark mb-2 text-center">Manage Your Booking</h1>
        <p className="text-center text-gray-500 mb-8">Booking ID: {booking.bookingId}</p>

        {/* Status Timeline */}
        <div className="w-full py-8 px-4">
            <div className="flex">
                {statusOrder.map((status, index) => (
                    <TimelineStep
                        key={status}
                        title={status}
                        isActive={index === currentStatusIndex}
                        isCompleted={index < currentStatusIndex}
                        isFirst={index === 0}
                        isLast={index === statusOrder.length - 1}
                    />
                ))}
            </div>
        </div>

        {/* Booking Details */}
        <div className="text-left border-t border-gray-200 py-6 mt-6">
          <h3 className="text-xl font-semibold mb-4 text-brand-dark">Rental Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold">{booking.carName}</p>
              <p className="text-sm text-gray-600">Rented from: {booking.agencyName}</p>
            </div>
            <img src={booking.carImageUrl} alt={booking.carName} className="rounded-lg w-full h-auto md:w-48 object-cover md:ml-auto" />
            <div>
              <p className="font-semibold">Pickup Date</p>
              <p className="text-gray-600">{new Date(booking.pickupDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Return Date</p>
              <p className="text-gray-600">{new Date(booking.returnDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Total Price</p>
              <p className="text-gray-600 font-bold text-brand-primary">{booking.totalPrice} EUR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookingPage;
