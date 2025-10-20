import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import BiddingProcess from './components/BiddingProcess';
import PaymentPage from './components/PaymentPage';
import BookingConfirmation from './components/BookingConfirmation';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import TermsPage from './components/TermsPage';
import UserProfile from './components/UserProfile';
import ManageBookingPage from './components/ManageBookingPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminSidebar from './components/admin/AdminSidebar';
import UserManagement from './components/admin/UserManagement';
import BookingManagement from './components/admin/BookingManagement';
import CarManagement from './components/admin/CarManagement';
import { Page, BookingRequest, Offer, User, BookingHistoryItem, Car } from './types';
import { CARS_DATA } from './constants';

// Demo data
const DEMO_USERS: User[] = [
    { id: 'user-1', name: 'Alex Morocco', email: 'alex.m@email.com', role: 'customer' },
    { id: 'user-2', name: 'Jane Doe', email: 'jane.d@email.com', role: 'customer' },
    { id: 'admin-1', name: 'Admin User', email: 'admin@kree.com', role: 'admin' },
];

const DEMO_BOOKINGS: BookingHistoryItem[] = [
    { bookingId: 'BK-12345', carName: 'Dacia Duster', carImageUrl: 'https://picsum.photos/seed/dacia-duster/400/300', agencyName: 'Aircar', pickupDate: '2025-09-10', returnDate: '2025-09-17', totalPrice: 280, status: 'Upcoming' },
    { bookingId: 'BK-67890', carName: 'Renault Clio', carImageUrl: 'https://picsum.photos/seed/renault-clio/400/300', agencyName: 'Hertz', pickupDate: '2025-07-01', returnDate: '2025-07-05', totalPrice: 150, status: 'Completed' },
];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [bookingDetails, setBookingDetails] = useState<BookingRequest | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Data state (for demo purposes)
  const [users, setUsers] = useState<User[]>(DEMO_USERS);
  const [bookingHistory, setBookingHistory] = useState<BookingHistoryItem[]>(DEMO_BOOKINGS);
  const [cars, setCars] = useState<Car[]>(CARS_DATA);
  const [managingBooking, setManagingBooking] = useState<BookingHistoryItem | null>(null);

  const handleBookingSubmit = (details: BookingRequest) => {
    setBookingDetails(details);
    setSelectedOffer(null);
    setIsBookingConfirmed(false);
    setCurrentPage(Page.HOME);
  };
  
  const handleSelectOffer = (offer: Offer) => {
    setSelectedOffer(offer);
  };
  
  const handlePaymentSuccess = () => {
    if (bookingDetails && selectedOffer) {
        const durationInDays = Math.ceil((new Date(bookingDetails.returnDate).getTime() - new Date(bookingDetails.pickupDate).getTime()) / (1000 * 60 * 60 * 24)) || 1;
        const addOnCost = (bookingDetails.addOns.gps ? 5 : 0) + (bookingDetails.addOns.babySeat ? 7 : 0);
        const totalCost = (durationInDays * selectedOffer.price) + (durationInDays * addOnCost);
        const newBooking: BookingHistoryItem = {
            bookingId: `BK-${Date.now()}`,
            carName: selectedOffer.car.name,
            carImageUrl: selectedOffer.car.imageUrl,
            agencyName: selectedOffer.agency.name,
            pickupDate: bookingDetails.pickupDate,
            returnDate: bookingDetails.returnDate,
            totalPrice: totalCost,
            status: 'Upcoming'
        };
        setBookingHistory(prev => [newBooking, ...prev]);
        setIsBookingConfirmed(true);
    }
  };
  
  const handleStartOver = () => {
    setBookingDetails(null);
    setSelectedOffer(null);
    setIsBookingConfirmed(false);
    setCurrentPage(Page.HOME);
  };

  const handleLogin = (asAdmin: boolean) => {
      setCurrentUser(asAdmin ? users.find(u => u.role === 'admin')! : users.find(u => u.role === 'customer')!);
      setIsAuthModalOpen(false);
  }

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage(Page.HOME);
  }

  const handleManageBooking = (booking: BookingHistoryItem) => {
    setManagingBooking(booking);
    setCurrentPage(Page.PROFILE); // Will show ManageBookingPage
  };

  // Admin CRUD operations
  const handleUpdateUser = (updatedUser: User) => setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
  const handleUpdateBooking = (updatedBooking: BookingHistoryItem) => setBookingHistory(bookingHistory.map(b => b.bookingId === updatedBooking.bookingId ? updatedBooking : b));
  const handleUpdateCar = (updatedCar: Car) => setCars(cars.map(c => c.id === updatedCar.id ? updatedCar : c));
  const handleAddCar = (newCar: Car) => setCars(prev => [...prev, { ...newCar, id: `car-${Date.now()}` }]);
  const handleDeleteCar = (carId: string) => setCars(cars.filter(c => c.id !== carId));

  const renderAdminContent = () => {
    const AdminContent = () => {
         switch(currentPage) {
            case Page.ADMIN_DASHBOARD: return <AdminDashboard />;
            case Page.ADMIN_USERS: return <UserManagement users={users} onUpdateUser={handleUpdateUser} />;
            case Page.ADMIN_BOOKINGS: return <BookingManagement bookings={bookingHistory} onUpdateBooking={handleUpdateBooking} />;
            case Page.ADMIN_CARS: return <CarManagement cars={cars} onUpdateCar={handleUpdateCar} onAddCar={handleAddCar} onDeleteCar={handleDeleteCar} />;
            default: setCurrentPage(Page.ADMIN_DASHBOARD); return <AdminDashboard />; // Default admin page
         }
    }
    return (
         <div className="flex flex-col md:flex-row gap-8">
            <AdminSidebar currentPage={currentPage} onNavigate={setCurrentPage} />
            <div className="flex-1">
                <AdminContent />
            </div>
         </div>
    );
  };

  const renderHomePageContent = () => {
    if (isBookingConfirmed && bookingDetails && selectedOffer) {
      return <BookingConfirmation bookingDetails={bookingDetails} selectedOffer={selectedOffer} onStartOver={handleStartOver} />;
    }
    if (bookingDetails && selectedOffer) {
      return <PaymentPage bookingDetails={bookingDetails} selectedOffer={selectedOffer} onPaymentSuccess={handlePaymentSuccess} onBack={() => setSelectedOffer(null)} />;
    }
    if (bookingDetails) {
      return <BiddingProcess bookingDetails={bookingDetails} onSelectOffer={handleSelectOffer} onBack={() => { setBookingDetails(null); setIsBookingConfirmed(false); }} />;
    }
    return (
      <>
        <Hero />
        <BookingForm onSubmit={handleBookingSubmit} />
      </>
    );
  };

  const renderContent = () => {
    if (currentUser?.role === 'admin' && Object.values(Page).some(p => p.startsWith('ADMIN') && p === currentPage)) {
        return renderAdminContent();
    }

    switch (currentPage) {
      case Page.ABOUT: return <AboutPage />;
      case Page.CONTACT: return <ContactPage />;
      case Page.TERMS: return <TermsPage />;
      case Page.PROFILE:
        if (currentUser) {
            if (managingBooking) {
                return <ManageBookingPage booking={managingBooking} onStatusUpdate={()=>{}} />;
            }
            return <UserProfile user={currentUser} bookingHistory={bookingHistory} onManageBooking={handleManageBooking} />;
        }
        return null;
      case Page.HOME:
      default:
        return renderHomePageContent();
    }
  };
  
  useEffect(() => {
    if (currentPage !== Page.PROFILE) {
      setManagingBooking(null);
    }
    // if user is admin, but page is not an admin page, redirect to admin dashboard
    if (currentUser?.role === 'admin' && !Object.values(Page).some(p => p.startsWith('ADMIN') && p === currentPage)) {
        if ([Page.HOME, Page.ABOUT, Page.CONTACT, Page.TERMS].includes(currentPage)) {
            // allow navigation to some public pages
        } else {
            setCurrentPage(Page.ADMIN_DASHBOARD);
        }
    }
  }, [currentPage, currentUser]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header 
        onNavigate={(page) => {
            if (currentUser?.role === 'admin' && page === Page.PROFILE) {
                setCurrentPage(Page.ADMIN_DASHBOARD);
            } else {
                setCurrentPage(page);
            }
        }}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        currentUser={currentUser}
      />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />}
    </div>
  );
}

export default App;
