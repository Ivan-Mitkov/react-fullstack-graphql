import React from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import SickButton from "./styles/SickButton";
import nProgress from "nprogress";

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

const CheckoutForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const stripe = useStripe();
  const elements=useElements()
  const handleSubmit = async (e) => {
    //1. stop the form from submitting and turn the loader on
    e.preventDefault();
    setLoading(true)
    //2.start the page transition
    nProgress.start()
    //3.create payment method via stripe (Token comes back here)
    const {error,paymentMethod}=await stripe.createPaymentMethod({
      type:"card",
      card:elements.getElement(CardElement)

    })
    //https://stripe.com/docs/testing
    console.log(paymentMethod)
    //4. handle any errors from stripe
    if(error){
      setError(error)
    }
    //5.send Token to keystone server via custom mutation

    //6. Change the page to view the order

    //7. close the cart

    //8. turn the loader off
    setLoading(false)
    nProgress.done()
  };
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement></CardElement>
      <SickButton>Checkout Now</SickButton>
    </CheckoutFormStyles>
  );
};

//GET ACCESS in form to useStripe()
const Checkout = () => (
  <Elements stripe={stripeLib}>
    <CheckoutForm />
  </Elements>
);
export default Checkout;
