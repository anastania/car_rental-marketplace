
import React, { useState } from 'react';
import { BookingHistoryItem, BookingStatus } from '../../types';

interface BookingManagementProps {
  bookings: BookingHistoryItem[];
  onUpdateBooking: (updatedBooking: BookingHistoryItem) => void;
}

const getStatusChipClass = (status: BookingStatus) => {
    switch(status) {
        case 'Completed': return 'bg-green-100 text-green-800';
        // FIX: Added 'Confirmed' status to ensure it has the correct chip color.
        case 'Confirmed':
        case 'Upcoming': return 'bg-blue-100 text-blue-800';
        case 'Ongoing': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const BookingManagement: React.FC<BookingManagementProps> = ({ bookings, onUpdateBooking }) => {
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
      const bookingToUpdate = bookings.find(b => b.bookingId === bookingId);
      if(bookingToUpdate) {
          onUpdateBooking({ ...bookingToUpdate, status: newStatus });
      }
  };

  // FIX: Added 'Confirmed' to the list of statuses an admin can select.
  const allStatuses: BookingStatus[] = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled', 'Confirmed'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in-up">
      <h1 className="text-2xl font-bold text-brand-dark mb-4">Booking Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car & Agency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.bookingId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.bookingId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{booking.carName}</div>
                    <div className="text-xs text-gray-500">{booking.agencyName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.totalPrice} EUR</td>
                <td className="px-6 py-4 whitespace-nowrap">
                   {editingBookingId === booking.bookingId ? (
                     <select 
                        value={booking.status} 
                        onChange={(e) => handleStatusChange(booking.bookingId, e.target.value as BookingStatus)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                       {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                  ) : (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusChipClass(booking.status)}`}>
                        {booking.status}
                    </span>
                   )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingBookingId === booking.bookingId ? (
                    <button onClick={() => setEditingBookingId(null)} className="text-indigo-600 hover:text-indigo-900">Save</button>
                  ) : (
                    <button onClick={() => setEditingBookingId(booking.bookingId)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;
