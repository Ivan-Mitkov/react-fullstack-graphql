import React from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";
const Nav = () => {
  const user = useUser();
  console.log(user);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/orders">Orders</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/account">Account</Link>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
