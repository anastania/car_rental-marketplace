
import React from 'react';

const AdminDashboard: React.FC = () => {
    // In a real app, this data would come from state or an API call
    const stats = {
        totalBookings: 124,
        totalRevenue: 35600,
        activeUsers: 45,
        fleetSize: 32,
    };

  return (
    <div className="animate-fade-in-up space-y-6">
        <h1 className="text-3xl font-bold text-brand-dark">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500">Total Bookings</h3>
                <p className="text-3xl font-bold text-brand-primary">{stats.totalBookings}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500">Total Revenue</h3>
                <p className="text-3xl font-bold text-brand-primary">{stats.totalRevenue} EUR</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500">Active Users</h3>
                <p className="text-3xl font-bold text-brand-primary">{stats.activeUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500">Fleet Size</h3>
                <p className="text-3xl font-bold text-brand-primary">{stats.fleetSize}</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-brand-dark mb-4">Recent Activity</h2>
            {/* This would be a list or table of recent events */}
            <p className="text-gray-500">Activity feed coming soon.</p>
        </div>
    </div>
  );
};

export default AdminDashboard;
