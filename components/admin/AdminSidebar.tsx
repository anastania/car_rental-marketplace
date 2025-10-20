import React from 'react';
import { Page } from '../../types';

interface AdminSidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, onNavigate, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onNavigate(page)}
      className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
        isActive ? 'bg-brand-primary text-white shadow' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <aside className="w-full md:w-64 bg-white p-4 rounded-xl shadow-lg flex-shrink-0">
      <h2 className="text-xl font-bold text-brand-dark mb-4 px-2">Admin Menu</h2>
      <nav className="space-y-2">
        <NavLink page={Page.ADMIN_DASHBOARD} currentPage={currentPage} onNavigate={onNavigate}>
          Dashboard
        </NavLink>
        <NavLink page={Page.ADMIN_USERS} currentPage={currentPage} onNavigate={onNavigate}>
          User Management
        </NavLink>
        <NavLink page={Page.ADMIN_BOOKINGS} currentPage={currentPage} onNavigate={onNavigate}>
          Booking Management
        </NavLink>
        <NavLink page={Page.ADMIN_CARS} currentPage={currentPage} onNavigate={onNavigate}>
          Car Fleet
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
