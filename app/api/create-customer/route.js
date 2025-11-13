import Stripe from 'stripe'
const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const {email, userId} = req.body;

    const customer = await stripe.customers.create({
        email,
        metadata: {superbaseUserId: userId}
    });

    

    res.status(200).json({ customerId: customer.id });

}