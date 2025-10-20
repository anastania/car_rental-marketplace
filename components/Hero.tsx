
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-center py-16 mb-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Your Moroccan Adventure, Your Price.</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Welcome to Morocco's first "Name Your Price" car rental marketplace.
        You decide the price, and our trusted local agencies will bid for your business.
        Transparent, fair, and simple.
      </p>
    </section>
  );
};

export default Hero;
