import React, { useState, useEffect } from 'react';
import { User, BookingHistoryItem } from '../types';
import { MOCK_BOOKING_HISTORY } from '../constants';

interface UserProfileProps {
  currentUser: User;
  onUpdateProfile: (updatedData: Partial<User>) => void;
}

const StatusBadge: React.FC<{ status: BookingHistoryItem['status'] }> = ({ status }) => {
    const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
    let colorClasses = '';
    switch (status) {
        case 'Completed':
            colorClasses = 'bg-green-100 text-green-800';
            break;
        case 'Upcoming':
            colorClasses = 'bg-blue-100 text-blue-800';
            break;
        case 'Cancelled':
            colorClasses = 'bg-red-100 text-red-800';
            break;
    }
    return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};

const UserProfile: React.FC<UserProfileProps> = ({ currentUser, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  useEffect(() => {
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up space-y-8">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-brand-dark mb-6 text-center">My Profile</h1>
        
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Full Name</label>
              <p className="text-lg text-gray-800">{currentUser.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email Address</label>
              <p className="text-lg text-gray-800">{currentUser.email}</p>
            </div>
            <div className="pt-4 text-right">
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-brand-primary hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" 
                required 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" 
                required 
              />
            </div>
            <div className="pt-4 flex justify-end space-x-4">
              <button 
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-brand-secondary hover:bg-opacity-90 text-brand-dark font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-brand-dark mb-6">Booking History</h2>
        <div className="space-y-4">
          {MOCK_BOOKING_HISTORY.length > 0 ? (
            MOCK_BOOKING_HISTORY.map((booking) => (
              <div key={booking.bookingId} className="flex flex-col md:flex-row items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                <img src={booking.carImageUrl} alt={booking.carName} className="w-32 h-20 object-cover rounded-md mb-4 md:mb-0 md:mr-4" />
                <div className="flex-grow text-center md:text-left">
                  <p className="font-bold text-lg text-brand-dark">{booking.carName}</p>
                  <p className="text-sm text-gray-500">with {booking.agencyName}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end mt-4 md:mt-0 md:ml-4">
                  <p className="font-bold text-xl text-brand-primary">{booking.totalPrice} EUR</p>
                  <div className="mt-2">
                    <StatusBadge status={booking.status} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">You have no past bookings.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;