import Stripe from 'stripe';
import { buffer } from 'micro';

export const config = {
    api: { bodyParser: false },
};

const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'customer.subscription.created':
            const subscription = event.data.object;
            //handle subscription creation
            console.log('Subscription created:', subscription.id);
            break;
        //handle other cases
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).end();
}
