import React from 'react';
import { User, Page } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLoginClick, onSignupClick, onLogout, onNavigate }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button onClick={() => onNavigate(Page.HOME)} className="text-3xl font-bold text-brand-primary">Kree</button>
        <nav className="flex items-center space-x-6">
           <button onClick={() => onNavigate(Page.ABOUT)} className="text-gray-600 hover:text-brand-primary font-medium transition-colors">About Us</button>
           <button onClick={() => onNavigate(Page.CONTACT)} className="text-gray-600 hover:text-brand-primary font-medium transition-colors">Contact</button>
          <div className="border-l border-gray-300 h-6"></div>
          {currentUser ? (
            <>
              <button onClick={() => onNavigate(Page.PROFILE)} className="text-gray-700 hover:text-brand-primary transition-colors font-medium">Hi, {currentUser.name.split(' ')[0]}!</button>
              <button onClick={onLogout} className="text-gray-600 hover:text-brand-primary font-medium">Log Out</button>
            </>
          ) : (
            <>
              <button onClick={onLoginClick} className="text-gray-600 hover:text-brand-primary font-medium">Log In</button>
              <button onClick={onSignupClick} className="bg-brand-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">Sign Up</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;