'use client';
import {cardElement, useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {useState} from 'react';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            // Call backend to create subscription with paymentMethod.id
            // I dont really understand
            console.log('Payment method:', paymentMethod.id);
        } else {
            console.log("Error happened");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Subscribe</button>
        </form>
    );
};

export default CheckoutForm;