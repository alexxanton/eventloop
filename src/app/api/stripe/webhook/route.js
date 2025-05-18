import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;
    const eventId = session.metadata.eventId;
    const groupId = session.metadata.groupId;

    if (!userId || !eventId) {
      console.error("Missing userId or eventId in metadata");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const newMember = {user_id: userId, group_id: groupId};
    const ticket = {user_id: userId, event_id: eventId};
    const tickets = Array.from({ length: 10 }, () => ({ ...ticket }));

    const { error: memberError } = await supabase
      .from("group_members")
      .upsert(newMember, { onConflict: "user_id,group_id" });

    const { error: ticketError } = await supabase.from("tickets").insert(tickets);

    if (memberError || ticketError) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ error: "DB insert failed" }, { status: 500 });
    }

    console.log(`Ticket created for user ${userId} and event ${eventId}`);
  }

  return NextResponse.json({ received: true });
}
