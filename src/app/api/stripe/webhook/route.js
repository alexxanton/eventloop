// app/api/stripe/webhook/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const signature = req.headers.get('stripe-signature');
    const body = await req.text(); // get raw body as text

    console.log('Stripe webhook received!');
    console.log('Stripe-Signature header:', signature);
    console.log('Raw webhook body:', body);

    // Just return 200 OK to acknowledge
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handling failed' }, { status: 500 });
  }
}
