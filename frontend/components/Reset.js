import React from "react";
import { useRouter } from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import useForm from "../lib/useForm";
import { useMutation, gql } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;
const Reset = ({ token }) => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: "",
    password: "",
    token: "",
  });

  const [resetPassword, { error, loading, data }] = useMutation(
    RESET_MUTATION,
    {
      variables: { ...inputs, token },
    }
  );
  const fullError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send the email and password to graphqlapi
    try {
      const res = await resetPassword();
    } catch (error) {
      console.log(error.message);
    }

    resetForm();
  };

  return (
    // don't put password in the url
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      {data?.redeemUserPasswordResetToken === null && (
        <>
          <p>Success! You can now sign in!</p>
        </>
      )}
      <Error error={error || fullError} />
      {/**fieldsets for disable the whole form */}
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
};

export default Reset;
