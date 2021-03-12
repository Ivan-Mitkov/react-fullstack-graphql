import React from "react";
import { formatMoney } from "../lib/formatMoney";
import { calcTotalPrice } from "../lib/calcTotalPrice";
import CartItem from "./CartItem";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import { useUser } from "./User";

const Cart = () => {
  const me = useUser();
  if (!me) {
    return null;
  }
  console.log(me);
  return (
    <CartStyles open={true}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
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
