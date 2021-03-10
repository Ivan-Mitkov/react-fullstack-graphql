import React from "react";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import useForm from "../lib/useForm";
// import { gql } from "graphql-tag";
import { useMutation, gql } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;
const SignIn = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: "",
    password: "",
  });
  const [signin, {  loading, data }] = useMutation(SIGN_IN_MUTATION, {
    variables: { email: inputs.email, password: inputs.password },
    //refetch currently logged user, so the app knows that we are logged in and NAV renders like logged in
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    //send the email and password to graphqlapi
    const res = await signin();
    console.log(res);
    resetForm();
  };

  const error =
    data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    // don't put password in the url
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>

      <Error error={error} />
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
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
};

export default SignIn;
