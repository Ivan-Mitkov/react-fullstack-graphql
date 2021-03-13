import React from "react";
import { gql, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
const ADD_TO_CART = gql`
  mutation ADD_TO_CART($productId: ID!) {
    addToCart(productId: $productId) {
      id
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart, { error, loading }] = useMutation(ADD_TO_CART, {
    variables: {
      productId: id,
    },
    //update cart after adding
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleClick = () => {
    addToCart();
  };
  return (
    <button type="button" onClick={handleClick} disabled={loading}>
      Add{loading && "ing"} To Cart
    </button>
  );
};

export default AddToCart;
