import { useEffect, useState } from 'react';
import { PaystackButton } from 'react-paystack';

interface PaymentProps {
  amount: number;
  email: string;
  name: string;  
  contact: string;
}

const PaystackPayment = ({ amount, email }: PaymentProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const config = {
    email: email,
    amount: amount * 100, // Convert to pesewas (Ghana currency)
    currency: 'GHS',
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    text: "Pay Now",
    onSuccess: () => {
      window.location.href = "https://lifemac.org";
    },
    onClose: () => {
      alert("Payment cancelled");
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <PaystackButton 
        {...config}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
      />
    </div>
  );
};

export default PaystackPayment; 