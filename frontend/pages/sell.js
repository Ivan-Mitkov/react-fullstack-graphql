import React from "react";
import CreateProduct from "../components/CreateProduct";
import GatedSignIn from "../components/GatedSignIn";

const Sell = () => (
  <div>
    <GatedSignIn>
      <CreateProduct />
    </GatedSignIn>
  </div>
);

export default Sell;
