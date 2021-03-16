import React from "react";
import { useUser } from "./User";
import SignIn from "./SignIn";

const GatedSignIn = ({ children }) => {
  const me = useUser();
  if (!me) return <SignIn />;
  return children;
};

export default GatedSignIn;
