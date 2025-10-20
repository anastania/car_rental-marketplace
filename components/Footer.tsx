import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-dark text-white mt-12">
      <div className="container mx-auto px-4 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Kree. All rights reserved.</p>
        <p className="text-sm text-gray-400">Revolutionizing Car Rental in Morocco.</p>
        <div className="flex justify-center space-x-4 mt-4">
            <button onClick={() => onNavigate(Page.ABOUT)} className="hover:text-brand-secondary">About Us</button>
            <button onClick={() => onNavigate(Page.CONTACT)} className="hover:text-brand-secondary">Contact</button>
            <button onClick={() => onNavigate(Page.TERMS)} className="hover:text-brand-secondary">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;