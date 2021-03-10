import React from "react";
import { useRouter } from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import useForm from "../lib/useForm";
import { useMutation, gql } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
      name
      email
    }
  }
`;
const SignUp = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: "",
    password: "",
    name: "",
  });
  const router = useRouter();
  const [signup, { error, loading, data }] = useMutation(SIGN_UP_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password,
      name: inputs.name,
    },

    //refetch currently logged user, so the app knows that we are logged in and NAV renders like logged in
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    //send the email and password to graphqlapi
    try {
      await signup();
    } catch (error) {
      console.log(error.message);
    }

    resetForm();
  };

  return (
    // don't put password in the url
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      {data?.createUser && (
        <>
          <p>
            Signed up with{" "}
            <span style={{ fontStyle: "italic" }}>
              {" "}
              {data.createUser.email}
            </span>{" "}
            - Please sign in!
          </p>
        </>
      )}
      <Error error={error} />
      {/**fieldsets for disable the whole form */}
      <fieldset>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
