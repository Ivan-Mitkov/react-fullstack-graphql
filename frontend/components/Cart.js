import React from "react";
import { formatMoney } from "../lib/formatMoney";
import { calcTotalPrice } from "../lib/calcTotalPrice";
import CartItem from "./CartItem";
import CartStyles from "./styles/CartStyles";
import CloseButton from "./styles/CloseButton";
import Supreme from "./styles/Supreme";
import { useUser } from "./User";
import { useCart } from "../lib/cartState";

const Cart = () => {
  const me = useUser();
  const { cartOpen, closeCart, openCart, toggleCart } = useCart();
  if (!me) {
    return null;
  }
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />;
        })}
      </ul>
      <footer>
        <p>Total: {formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;
