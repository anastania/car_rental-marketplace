import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [status, setStatus] = useState('');

    const handleGenerateMessage = async () => {
        setIsGenerating(true);
        setStatus('');
        try {
            // As per guidelines, the API key is handled by environment variables.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Based on the following keywords, write a polite and professional inquiry message for a car rental company named Kree. The user's name is ${name || 'a customer'} and their email is ${email || 'not provided'}. Keywords: "${message}". Keep it concise and clear.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            // fix: Use response.text to get the generated content as a string.
            setMessage(response.text);
        } catch (error) {
            console.error("Error generating message:", error);
            setStatus('Failed to generate message. Please write it manually.');
        } finally {
            setIsGenerating(false);
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Thank you for your message! We will get back to you shortly.');
        setName('');
        setEmail('');
        setMessage('');
    };

  return (
    <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-4xl mx-auto animate-fade-in-up">
      <h1 className="text-4xl font-bold text-brand-dark mb-4 text-center">Get In Touch</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Have questions about our service or need help with a booking? We're here to help!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
            <h2 className="text-2xl font-semibold text-brand-primary mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900" required />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900" required />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message / Keywords</label>
                    <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={5} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900" required placeholder="Or just type keywords and let AI help..."></textarea>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button type="button" onClick={handleGenerateMessage} disabled={isGenerating || !message} className="flex-1 bg-brand-secondary text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md transform hover:-translate-y-px">
                        {isGenerating ? 'Generating...' : 'Help Me Write'}
                    </button>
                    <button type="submit" className="flex-1 bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 shadow-sm hover:shadow-md transform hover:-translate-y-px">
                        Send Message
                    </button>
                </div>
                {status && <p className="text-center text-green-600 pt-2">{status}</p>}
            </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
             <h2 className="text-2xl font-semibold text-brand-primary mb-6">Contact Information</h2>
            <div className="flex items-start space-x-4">
                <div className="mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                <div>
                    <h3 className="font-semibold text-lg text-brand-dark">Email</h3>
                    <p className="text-gray-600">support@kree.com</p>
                </div>
            </div>
             <div className="flex items-start space-x-4">
                <div className="mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                 <div>
                    <h3 className="font-semibold text-lg text-brand-dark">Phone</h3>
                    <p className="text-gray-600">+212 5 22 00 00 00</p>
                </div>
            </div>
             <div className="flex items-start space-x-4">
                <div className="mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                 <div>
                    <h3 className="font-semibold text-lg text-brand-dark">Address</h3>
                    <p className="text-gray-600">123 Boulevard d'Anfa,<br/>Casablanca, Morocco</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;