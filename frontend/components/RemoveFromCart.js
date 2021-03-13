import React from "react";
import { gql, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import styled from "styled-components";

const REMOVE_FROMCART = gql`
  mutation REMOVE_FROMCART($productId: ID!) {
    removeFromCart(productId: $productId) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: none;
  padding: 2rem;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;
//No arrow function
function update(cache, payload) {
  // console.log("Apollo Cache: ", cache);
  // console.log("Payload: ", payload.data);
  cache.evict(cache.identify(payload.data.removeFromCart));
}
const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { error, loading }] = useMutation(REMOVE_FROMCART, {
    variables: {
      productId: id,
    },
    //update cart after adding
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    update,
    //USE OPTIMISTIC UPDATE
    //NOT WORKING
    // optimisticResponse: {
    //   removeFromCart: {
    //     __typename: "CartItem",
    //     id,
    //   },
    // },
  });
  const handleClick = () => {
    removeFromCart();
  };
  return (
    <BigButton type="button" onClick={handleClick} disabled={loading}>
      &times;
    </BigButton>
  );
};

export default RemoveFromCart;
