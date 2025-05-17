import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { userId, eventId, groupId, price } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "Test Event Ticket",
          },
          unit_amount: price * 100,
        },
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
      }],
      metadata: {
        userId,
        eventId,
        groupId
      },
      success_url: `http://localhost:3000/events/${eventId}`,
      cancel_url: `http://localhost:3000/events/${eventId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
