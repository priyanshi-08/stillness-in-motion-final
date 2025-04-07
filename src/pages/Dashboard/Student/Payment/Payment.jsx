import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { Navigate, useLocation } from 'react-router-dom';
import PaymentCheckout from './PaymentCheckout';
import './Payment.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const Payment = () => {
  const location = useLocation();
  const price = location?.state?.price;
  const itemId = location?.state?.itemId;
  if (!price) {
    <Navigate to="/dashboard/my-selected" replace />
  }

  return (
    <div className='my-40 text-center mx-auto'>
      <Elements stripe={stripePromise}>
        <PaymentCheckout price={price} cartItm={itemId} />
      </Elements>

    </div>

  );
}

export default Payment;
