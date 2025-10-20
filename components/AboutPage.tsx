import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-4xl mx-auto animate-fade-in-up">
      <h1 className="text-4xl font-bold text-brand-dark mb-6 text-center">About Kree</h1>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="lead text-xl text-center mb-8">
          Revolutionizing car rental in Morocco by eliminating price opacity and building trust through the country's first "Name Your Price" marketplace.
        </p>

        <h2 className="text-2xl font-semibold text-brand-primary">Our Mission</h2>
        <p>
          KREE aims to revolutionize Morocco’s car rental industry. We empower customers to decide what they are willing to pay for a rental, while allowing our trusted partner agencies to bid competitively for their business. Our mission is to become the leading mobility platform in North Africa by 2030, connecting millions of tourists to high-quality, affordable, and transparent transport solutions.
        </p>
        
        <h2 className="text-2xl font-semibold text-brand-primary">How It Works</h2>
        <p>
          Our unique model restores transparency and trust between travelers and rental agencies, offering significant savings and helping local businesses thrive. The process is simple:
        </p>
        <ol>
          <li><strong>You Propose a Price:</strong> Enter your rental dates, car category, and the price you are willing to pay.</li>
          <li><strong>Agencies Submit Offers:</strong> Our network of verified local agencies receives your proposal and responds with their best offers.</li>
          <li><strong>You Choose the Best Bid:</strong> Review the competing offers and select the one that best fits your needs and budget.</li>
          <li><strong>Book Securely:</strong> The entire transaction—from payment to contract signing—is handled securely within the KREE platform.</li>
        </ol>
        
        <h2 className="text-2xl font-semibold text-brand-primary">A Win-Win Ecosystem</h2>
        <p>
          We are creating a fair and balanced marketplace where everyone benefits. Travelers get the best possible price without the hassle of negotiation, and rental agencies increase their vehicle occupancy rate, reducing their dependence on high-fee intermediaries. At Kree, we believe that fairness and customer satisfaction are the keys to driving sustainable market growth.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;