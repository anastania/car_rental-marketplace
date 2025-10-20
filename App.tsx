import React, { useState } from 'react';
import { Page, BookingRequest, Offer, User, BookingHistoryItem, Car } from './types';
import { USERS_DATA, BOOKING_HISTORY_DATA, CARS_DATA } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import BiddingProcess from './components/BiddingProcess';
import PaymentPage from './components/PaymentPage';
import BookingConfirmation from './components/BookingConfirmation';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import TermsPage from './components/TermsPage';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import ManageBookingPage from './components/ManageBookingPage';

// Admin Components
import AdminSidebar from './components/admin/AdminSidebar';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import BookingManagement from './components/admin/BookingManagement';
import CarManagement from './components/admin/CarManagement';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [bookingDetails, setBookingDetails] = useState<BookingRequest | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [bookingHistory, setBookingHistory] = useState<BookingHistoryItem[]>(BOOKING_HISTORY_DATA);
  const [managedBooking, setManagedBooking] = useState<BookingHistoryItem | null>(null);

  // Admin state
  const [allUsers, setAllUsers] = useState<User[]>(USERS_DATA);
  const [allCars, setAllCars] = useState<Car[]>(CARS_DATA);


  const handleBookingSubmit = (details: BookingRequest) => {
    setBookingDetails(details);
    setCurrentPage(Page.BIDDING);
  };

  const handleSelectOffer = (offer: Offer) => {
    if (!currentUser) {
      setSelectedOffer(offer);
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedOffer(offer);
    setCurrentPage(Page.PAYMENT);
  };

  const handlePaymentSuccess = () => {
    setCurrentPage(Page.CONFIRMATION);
  };

  const handleStartOver = () => {
    setBookingDetails(null);
    setSelectedOffer(null);
    setCurrentPage(Page.HOME);
  };

  const handleBackToBidding = () => {
    setSelectedOffer(null);
    setCurrentPage(Page.BIDDING);
  };

  const handleLogin = (asAdmin: boolean) => {
    const user = asAdmin 
      ? allUsers.find(u => u.role === 'admin') 
      : allUsers.find(u => u.role === 'customer');
    setCurrentUser(user || null);
    setIsAuthModalOpen(false);
    // If login was triggered by selecting an offer, proceed to payment
    if(currentPage === Page.BIDDING && selectedOffer) {
        setCurrentPage(Page.PAYMENT);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage(Page.HOME); // Or wherever you want to redirect after logout
  };
  
  const handleManageBooking = (booking: BookingHistoryItem) => {
      setManagedBooking(booking);
      setCurrentPage(Page.MANAGE_BOOKING);
  }

  // Admin handlers
  const handleUpdateUser = (updatedUser: User) => {
      setAllUsers(allUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
  }
  const handleUpdateBooking = (updatedBooking: BookingHistoryItem) => {
      setBookingHistory(bookingHistory.map(b => b.bookingId === updatedBooking.bookingId ? updatedBooking : b));
  }
  const handleUpdateCar = (updatedCar: Car) => {
      setAllCars(allCars.map(c => c.id === updatedCar.id ? updatedCar : c));
  }
  const handleAddCar = (newCar: Car) => {
      setAllCars([...allCars, { ...newCar, id: `car-${Date.now()}` }]);
  }
  const handleDeleteCar = (carId: string) => {
      setAllCars(allCars.filter(c => c.id !== carId));
  }


  const renderContent = () => {
    if (currentPage.startsWith('admin_')) {
        return (
            <div className="flex flex-col md:flex-row gap-8">
                <AdminSidebar currentPage={currentPage} onNavigate={setCurrentPage} />
                <main className="flex-1">
                    {currentPage === Page.ADMIN_DASHBOARD && <AdminDashboard />}
                    {currentPage === Page.ADMIN_USERS && <UserManagement users={allUsers} onUpdateUser={handleUpdateUser}/>}
                    {currentPage === Page.ADMIN_BOOKINGS && <BookingManagement bookings={bookingHistory} onUpdateBooking={handleUpdateBooking} />}
                    {currentPage === Page.ADMIN_CARS && <CarManagement cars={allCars} onUpdateCar={handleUpdateCar} onAddCar={handleAddCar} onDeleteCar={handleDeleteCar} />}
                </main>
            </div>
        )
    }

    switch (currentPage) {
      case Page.HOME:
        return (
          <>
            <Hero />
            <BookingForm onSubmit={handleBookingSubmit} />
          </>
        );
      case Page.BIDDING:
        return bookingDetails ? (
          <BiddingProcess
            bookingDetails={bookingDetails}
            onSelectOffer={handleSelectOffer}
            onBack={() => setCurrentPage(Page.HOME)}
          />
        ) : null;
      case Page.PAYMENT:
        return bookingDetails && selectedOffer ? (
            <PaymentPage 
                bookingDetails={bookingDetails} 
                selectedOffer={selectedOffer}
                onPaymentSuccess={handlePaymentSuccess}
                onBack={handleBackToBidding}
             />
        ) : null;
      case Page.CONFIRMATION:
        return bookingDetails && selectedOffer ? (
            <BookingConfirmation 
                bookingDetails={bookingDetails}
                selectedOffer={selectedOffer}
                onStartOver={handleStartOver}
            />
        ) : null;
      case Page.ABOUT:
          return <AboutPage />;
      case Page.CONTACT:
          return <ContactPage />;
      case Page.TERMS:
          return <TermsPage />;
      case Page.PROFILE:
          return currentUser ? <UserProfile user={currentUser} bookingHistory={bookingHistory} onManageBooking={handleManageBooking} /> : null;
      case Page.MANAGE_BOOKING:
          return managedBooking ? <ManageBookingPage booking={managedBooking} onStatusUpdate={()=>{}} /> : null;
      default:
        return (
          <>
            <Hero />
            <BookingForm onSubmit={handleBookingSubmit} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header 
        onNavigate={setCurrentPage} 
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        currentUser={currentUser}
      />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={setCurrentPage} />

      {isAuthModalOpen && (
          <AuthModal 
            onClose={() => setIsAuthModalOpen(false)}
            onLogin={handleLogin}
          />
      )}
    </div>
  );
};

export default App;
