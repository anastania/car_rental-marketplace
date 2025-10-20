import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import BiddingProcess from './components/BiddingProcess';
import BookingConfirmation from './components/BookingConfirmation';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import TermsPage from './components/TermsPage';
import UserProfile from './components/UserProfile';
import { AppState, BookingRequest, Offer, User, Page } from './types';
import { MOCK_USER } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.FORM);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [bookingDetails, setBookingDetails] = useState<BookingRequest | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);

  const handleBookingSubmit = (details: BookingRequest) => {
    setBookingDetails(details);
    setAppState(AppState.BIDDING);
  };

  const handleOfferAccept = (offer: Offer) => {
    setSelectedOffer(offer);
    setAppState(AppState.CONFIRMATION);
  };
  
  const handleStartOver = () => {
    setBookingDetails(null);
    setSelectedOffer(null);
    setAppState(AppState.FORM);
    setCurrentPage(Page.HOME);
  };

  const handleLogin = () => {
    // In a real app, you'd verify credentials. Here, we just use mock data.
    setCurrentUser(MOCK_USER);
    setAuthModal(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage(Page.HOME);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    // If navigating home, reset the booking flow state
    if (page === Page.HOME) {
      setBookingDetails(null);
      setSelectedOffer(null);
      setAppState(AppState.FORM);
    }
  }

  const handleProfileUpdate = (updatedData: Partial<User>) => {
    if (currentUser) {
      setCurrentUser(prevUser => ({
        ...prevUser!,
        ...updatedData,
      }));
    }
  };

  const renderHomePageContent = () => {
    switch (appState) {
      case AppState.BIDDING:
        return bookingDetails && <BiddingProcess bookingDetails={bookingDetails} onOfferAccepted={handleOfferAccept} />;
      case AppState.CONFIRMATION:
        return bookingDetails && selectedOffer && <BookingConfirmation bookingDetails={bookingDetails} selectedOffer={selectedOffer} onStartOver={handleStartOver} />;
      case AppState.FORM:
      default:
        return (
          <>
            <Hero />
            <BookingForm onSubmit={handleBookingSubmit} currentUser={currentUser} />
          </>
        );
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case Page.ABOUT:
        return <AboutPage />;
      case Page.CONTACT:
        return <ContactPage />;
      case Page.TERMS:
        return <TermsPage />;
      case Page.PROFILE:
        return currentUser ? <UserProfile currentUser={currentUser} onUpdateProfile={handleProfileUpdate} /> : renderHomePageContent();
      case Page.HOME:
      default:
        return renderHomePageContent();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-brand-dark flex flex-col">
      <Header 
        currentUser={currentUser}
        onLoginClick={() => setAuthModal('login')}
        onSignupClick={() => setAuthModal('signup')}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate}/>
      {authModal && (
        <AuthModal 
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onLogin={handleLogin}
          onSwitchMode={setAuthModal}
        />
      )}
    </div>
  );
};

export default App;