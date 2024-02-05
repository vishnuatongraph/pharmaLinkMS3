import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import BackButton from "@/components/common/BackButton";
import SaveContinueBtn from "@/components/common/SaveContinueBtn";
import useRouting from "@/hooks/routing";
import { AVAILABLITY_PAGE } from "@/utils/constants/pageName";
// import SpinnerLoader from "../Common/SpinnerLoader";

const CheckoutForm: React.FC<any> = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { pushToPage } = useRouting();

  const [message, setMessage] = useState<string | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      pushToPage(`/${AVAILABLITY_PAGE}`);
    }, 1000);
    // pushToPage("");

    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-success`,
    //   },
    // });

    // if (error?.type === "card_error" || error?.type === "validation_error") {
    //   setMessage(error.message || "");
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }

    // setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: {
      type: "accordion",
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: true,
    },
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="flex w-full flex-col font-inter"
    >
      <div className="bg-white px-5 py-[25px] rounded-[10px]">
        <label
          className="block text-dark text-2xl mb-5 font-semibold leading-[29px] text-left w-[80%]"
          htmlFor={"label"}
        >
          Credit card information for monthly fees - Free trial 1 month
        </label>
        <div>
          <p className="text-dark text-xl font-medium leading-6 text-left mb-5">
            Credit card information
          </p>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions as any}
            className=""
          />
        </div>

        {/* <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="mt-2 cursor-pointer rounded-lg bg-blueBg px-4 py-2 text-center text-base font-medium text-black focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <span id="button-text" className="text-base">
          {isLoading ? (
            <div
              role="status"
              className="flex h-full w-full cursor-not-allowed items-center justify-center rounded-lg bg-blueBg text-base font-medium text-black focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <SpinnerLoader isPageLoader={false} />
            </div>
          ) : (
            "Pay now"
          )}
        </span>
      </button> */}
        {message && (
          <div id="payment-message" className="text-error">
            {message}
          </div>
        )}
      </div>
      <div className="flex gap-5 mt-8">
        <BackButton />
        <SaveContinueBtn loading={isLoading} />
      </div>
    </form>
  );
};

export default CheckoutForm;
