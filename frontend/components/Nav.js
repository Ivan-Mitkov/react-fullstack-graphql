import React from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";
import SignOut from "./SignOut";
import { useCart } from "../lib/cartState";
import CartCount from "./CartCount";

const Nav = () => {
  const user = useUser();
  const { openCart } = useCart();

  const countItems = () => {
    const items = user.cart
      .map((q) => q.quantity)
      .reduce((acc, q) => acc + q, 0);
    return items;
  };

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/orders">Orders</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount count={countItems()}></CartCount>
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
