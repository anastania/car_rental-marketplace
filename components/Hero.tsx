
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="text-center py-12 md:py-20 animate-fade-in-up">
      <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark leading-tight">
        Your Moroccan Adventure, <span className="text-brand-primary">Your Price.</span>
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        The first car rental marketplace in Morocco where you name the price.
        Submit your offer and let agencies bid for your business.
      </p>
    </div>
  );
};

export default Hero;
