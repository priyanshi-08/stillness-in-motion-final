import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import {
    PaymentElement,
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import useUser from '../../../../hooks/useUser';
import { Navigate, useNavigate } from 'react-router-dom';

const PaymentCheckout = ({ price, cartItm }) => {
    const URL = `https://stillness-in-motion-server.onrender.com/payment-info?${cartItm && `classId=${cartItm}`}`;
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { isLoading, currentUser } = useUser();
    const [clientSecret, setClientSecret] = useState('');
    const [succeeded, setSucceeded] = useState('');
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    if (price <= 0 || !price) {
        return (
            <Navigate to="/dashboard/my-selected" replace />
        );
    }

    useEffect(() => {
        axiosSecure.get(`/cart/${currentUser?.email}`).then(result => {
            const classesId = result.data.map(item => item._id);
            setCart(classesId);
        }).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price }).then(res => {
            setClientSecret(res.data.clientSecret);
        }).catch(err => console.log(err));
    }, []);

    const handleSubmit = async (event) => {
        setMessage('');
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: card,
        });

        if (error) {
            console.log(error);
            setMessage(error.message);
        } else {
            console.log(paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: currentUser?.name || "Unknown",
                    email: currentUser?.email || "****@***.com"
                }
            }
        });

        if (confirmError) {
            console.log("[Confirm Error]", confirmError);
        } else {
            console.log("[paymentIntent]", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                const transactionId = paymentIntent.id;
                const paymentMethod = paymentIntent.payment_method;
                const amount = paymentIntent.amount / 100;
                const currency = paymentIntent.currency;
                const paymentStatus = paymentIntent.status;
                const userName = currentUser?.name;
                const userEmail = currentUser?.email;

                const payment = {
                    transactionId,
                    paymentMethod,
                    amount,
                    currency,
                    paymentStatus,
                    userName,
                    userEmail,
                    classesId: cartItm ? [cartItm] : cart,
                    date: new Date()
                };

                fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(payment)
                }).then(res => res.json())
                    .then(res => {
                        if(res.cartData.deletedCount > 0 && res.paymentInfoData.insertedId && res.updatedResult.modifiedCount > 0){
                            setSucceeded("Payment Successful, You can now access your classes");
                            navigate("/dashboard/enrolled-class");
                        } else {
                            setSucceeded("Payment Failed, Please try again");
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    };

    return (
        <>
            <div className='text-center'>
                <h1 className='text-2xl font-bold my-2'>
                    Payment Amount: <span className='text-secondary'>{price}</span>
                </h1>
            </div>
            <form onSubmit={handleSubmit}>
                <CardElement options={ {
                    base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: "#9e2146"
                    }
                } } />
                <button className='button-pay' disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
                {succeeded && <p className='text-green-500'>{succeeded}</p>}
            </form>
        </>
    );
}

export default PaymentCheckout;
