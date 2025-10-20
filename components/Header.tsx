
import React, { useState } from 'react';
import { Page, User } from '../types';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  onLoginClick: () => void;
  onLogout: () => void;
  currentUser: User | null;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onLoginClick, onLogout, currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileNavigate = (page: Page) => {
    onNavigate(page);
    setIsProfileOpen(false);
  };
  
  const handleLogoutClick = () => {
    onLogout();
    setIsProfileOpen(false);
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => onNavigate(Page.HOME)} className="flex items-center space-x-2">
          <svg className="h-8 w-8 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-2xl font-bold text-brand-dark">Kree</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={() => onNavigate(Page.ABOUT)} className="text-gray-600 hover:text-brand-primary">About</button>
          <button onClick={() => onNavigate(Page.CONTACT)} className="text-gray-600 hover:text-brand-primary">Contact</button>
          {currentUser ? (
             <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
                   <span className="font-semibold">{currentUser.name}</span>
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        {currentUser.role === 'admin' ? (
                            <button onClick={() => handleProfileNavigate(Page.ADMIN_DASHBOARD)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Admin Dashboard</button>
                        ) : (
                            <button onClick={() => handleProfileNavigate(Page.PROFILE)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">My Profile</button>
                        )}
                        <button onClick={handleLogoutClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
                    </div>
                )}
             </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-brand-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
             <button onClick={() => { onNavigate(Page.ABOUT); setIsMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-brand-primary">About</button>
             <button onClick={() => { onNavigate(Page.CONTACT); setIsMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-brand-primary">Contact</button>
             <div className="pt-4 mt-4 border-t border-gray-200">
                {currentUser ? (
                     <>
                        {currentUser.role === 'admin' ? (
                            <button onClick={() => { handleProfileNavigate(Page.ADMIN_DASHBOARD); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-brand-primary">Admin Dashboard</button>
                        ) : (
                           <button onClick={() => { handleProfileNavigate(Page.PROFILE); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-brand-primary">My Profile</button>
                        )}
                        <button onClick={() => { handleLogoutClick(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-brand-primary">Logout</button>
                     </>
                ) : (
                   <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="w-full text-left bg-brand-primary text-white font-bold py-2 px-3 rounded-lg hover:bg-opacity-90 transition-colors">
                      Login
                    </button>
                )}
             </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
