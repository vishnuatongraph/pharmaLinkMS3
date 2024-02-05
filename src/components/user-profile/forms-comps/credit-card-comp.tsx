"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import SpinnerLoader from "@/components/common/SpinnerLoader";
// import { StripeElementsOptions } from "@stripe/react-stripe-js";
import * as stripeJs from "@stripe/stripe-js";

// import CheckoutForm from "../components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CreditCardComp() {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) {
    return (
      <>
        <div className="flex justify-center mt-[150px]">
          <SpinnerLoader isPageLoader={true} />;
        </div>
      </>
    );
  }
  const elementsOptions = options as stripeJs.StripeElementsOptions;

  return (
    <div className="App">
      {clientSecret && stripePromise && (
        <Elements options={elementsOptions} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
