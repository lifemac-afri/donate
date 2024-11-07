import { useEffect, useState } from 'react';
import { PaystackButton } from 'react-paystack';

interface PaymentProps {
  amount: number;
  email: string;
  name: string;  
  contact: string;
}

const PaystackPayment = ({ amount, email, name, contact }: PaymentProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSuccess = () => {
    if (typeof window !== 'undefined') {
      window.location.href = "https://lifemac.org";
    }
  };

  const config = {
    email,
    amount: amount * 100, // Convert to pesewas (Ghana currency)
    currency: 'GHS',
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    text: "Donate Now",
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: name
        },
        {
          display_name: "Contact",
          variable_name: "contact",
          value: contact
        }
      ]
    },
    onSuccess: handleSuccess,
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