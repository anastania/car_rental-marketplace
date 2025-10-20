import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-2xl mx-auto text-center animate-fade-in-up">
        <h1 className="text-3xl font-bold text-brand-dark mb-4">Thank You!</h1>
        <p className="text-gray-700">Your message has been sent. Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-4xl mx-auto animate-fade-in-up">
      <h1 className="text-4xl font-bold text-brand-dark mb-6 text-center">Get in Touch</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Have questions or feedback? We'd love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-brand-primary mb-4">Contact Information</h2>
          <div className="space-y-4 text-gray-700">
            <p><strong className="font-medium">Address:</strong> 123 Auto Avenue, Casablanca, Morocco</p>
            <p><strong className="font-medium">Email:</strong> support@kree.com</p>
            <p><strong className="font-medium">Phone:</strong> +212 5 00 00 00 00</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" required></textarea>
          </div>
          <button type="submit" className="w-full bg-brand-primary hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;