import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-4xl mx-auto animate-fade-in-up">
      <h1 className="text-4xl font-bold text-brand-dark mb-6 text-center">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="text-sm text-gray-500">Last updated: October 20, 2025</p>

        <h2 className="text-2xl font-semibold text-brand-primary">1. Introduction</h2>
        <p>
          Welcome to Kree ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service") govern your use of our web pages and mobile application (collectively or individually "Service") operated by Kree. Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.
        </p>

        <h2 className="text-2xl font-semibold text-brand-primary">2. Using Our Service</h2>
        <p>
          Our Service provides a marketplace for users to name a price for a car rental and for car rental agencies to bid on that price. You agree to comply with all applicable laws and regulations when using the Service. You are responsible for all activities that occur under your account.
        </p>

        <h2 className="text-2xl font-semibold text-brand-primary">3. Bids, Offers, and Bookings</h2>
        <p>
          When you submit a price proposal, it is an offer to rent a vehicle for that price. When an agency submits a counteroffer, it is an offer to you. A binding contract is formed only when you accept an agency's offer through our platform. All payments must be processed through our secure payment gateway unless a cash payment option is explicitly offered and selected.
        </p>
        
        <h2 className="text-2xl font-semibold text-brand-primary">4. Content</h2>
        <p>
          Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
        </p>

        <h2 className="text-2xl font-semibold text-brand-primary">5. Prohibited Uses</h2>
        <p>
          You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service in any way that violates any applicable national or international law or regulation.
        </p>
        
        <h2 className="text-2xl font-semibold text-brand-primary">6. Changes To Service</h2>
        <p>
          We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period.
        </p>

        <h2 className="text-2xl font-semibold text-brand-primary">7. Contact Us</h2>
        <p>
          Please send your feedback, comments, requests for technical support by email to <strong className="font-medium">support@kree.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;