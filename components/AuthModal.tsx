import React from 'react';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (asAdmin: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center animate-fade-in-up" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm m-4 relative text-center" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <h2 className="text-3xl font-bold text-brand-dark mb-2">Welcome Back!</h2>
        <p className="text-gray-500 mb-8">This is a demo. Please select a user role to continue.</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => onLogin(false)}
            className="w-full bg-brand-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-px"
          >
            Login as Customer
          </button>
          <button 
            onClick={() => onLogin(true)}
            className="w-full bg-brand-secondary hover:bg-opacity-90 text-brand-dark font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-px"
          >
            Login as Admin
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          In a real application, this would be a full login form with email and password fields.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;