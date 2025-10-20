
import React from 'react';
import { User, BookingHistoryItem, BookingStatus } from '../types';

interface UserProfileProps {
  user: User;
  bookingHistory: BookingHistoryItem[];
  onManageBooking: (booking: BookingHistoryItem) => void;
}

const getStatusChipClass = (status: BookingStatus) => {
    switch(status) {
        case 'Completed': return 'bg-green-100 text-green-800';
        case 'Upcoming': return 'bg-blue-100 text-blue-800';
        case 'Ongoing': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const UserProfile: React.FC<UserProfileProps> = ({ user, bookingHistory, onManageBooking }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-brand-dark">Welcome, {user.name}!</h1>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-brand-dark mb-4">Your Booking History</h2>
        {bookingHistory.length > 0 ? (
          <div className="space-y-6">
            {bookingHistory.map(booking => (
              <div key={booking.bookingId} className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-lg">
                <img src={booking.carImageUrl} alt={booking.carName} className="w-full md:w-32 h-24 object-cover rounded-md" />
                <div className="flex-1 text-center md:text-left">
                  <p className="font-bold text-lg">{booking.carName}</p>
                  <p className="text-sm text-gray-500">with {booking.agencyName}</p>
                  <p className="text-sm text-gray-600">{new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Total Price</p>
                  <p className="font-bold text-brand-primary">{booking.totalPrice} EUR</p>
                </div>
                 <div className="text-center">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusChipClass(booking.status)}`}>{booking.status}</span>
                </div>
                <div>
                   <button onClick={() => onManageBooking(booking)} className="bg-brand-secondary text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm">
                      Manage
                    </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
