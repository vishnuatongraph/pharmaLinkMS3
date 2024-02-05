export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");

export async function POST() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: "usd",
      payment_method_types: ["card"],
      customer: "cus_POIelSpaXlpy3T",
      setup_future_usage: "off_session",
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({
      message: error.message || "Internal Server Error",
      status: 500,
    });
  }
}
