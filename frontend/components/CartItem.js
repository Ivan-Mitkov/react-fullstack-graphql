import React from "react";
import styled from "styled-components";
import { formatMoney } from "../lib/formatMoney";
import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border: 1px solid #e1e1e1;
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
    object-fit: contain;
  }
  h3 p {
    margin: 0;
  }
`;
const CartItem = ({ cartItem }) => {
  const product = cartItem.product;
  return (
    <CartItemStyles>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
        width="100"
      ></img>
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}
          <em>
            - {cartItem.quantity} &times; {formatMoney(product.price)}
          </em>
        </p>
      </div>
      <RemoveFromCart id={product.id} cartItem={cartItem} />
    </CartItemStyles>
  );
};

export default CartItem;
