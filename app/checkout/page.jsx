'use client';

import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../lib/stripe';
import CheckoutForm from './checkoutForm'

export default function CheckoutPage() {
    return (
        <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
            <h1>Subscribe to a Plan</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}