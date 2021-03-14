import React from "react";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import SickButton from "./styles/SickButton";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;
//get stripe input elements
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

/**https://stripe.com/docs/stripe-js/react#elements-provider */

const Checkout = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormStyles onSubmit={handleSubmit}>
        <CardElement></CardElement>
        <SickButton>Checkout Now</SickButton>
      </CheckoutFormStyles>
    </Elements>
  );
};

export default Checkout;
