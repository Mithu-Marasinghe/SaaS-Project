import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { customerId, priceId } = await req.json();

        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{price: priceId}],
            payment_behavior: 'default_incomplete',
            expand: ['latest_invoice.payment_intent'],
        });

        return new Response(JSON.stringify(subscription), { status: 200});
    } catch (error) {
        return new Response(
            JSON.stringify({ error: {message: error.message} }),
            {status: 400}
        );
    }
}