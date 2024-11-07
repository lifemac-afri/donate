'use client';

import { useState } from 'react';
import PaystackPayment from '@/components/PaystackPayment';

const PRESET_AMOUNTS = [
  { label: '₵100', value: 100 },
  { label: '₵500', value: 500 },
  { label: '₵1000', value: 1000 },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [amount, setAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePresetAmount = (value: number) => {
    setAmount(value.toString());
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support LIFE-MAC Africa</h1>
          <p className="text-lg text-gray-600">Your donation helps us make a difference in Africa</p>
        </div>

        {!showPayment ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose Amount</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => handlePresetAmount(preset.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      Number(amount) === preset.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <span className="block text-xl font-bold">{preset.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="relative mt-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₵</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 text-gray-700">
                  Make this donation anonymous
                </label>
              </div>

              {!isAnonymous && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Donate ₵{amount || '0'}
              </button>
            </form>
          </div>
        ) : (
          <PaystackPayment 
            email={email} 
            amount={Number(amount)}
            name={name}
            contact={contact}
          />
        )}
      </div>
    </main>
  );
} 