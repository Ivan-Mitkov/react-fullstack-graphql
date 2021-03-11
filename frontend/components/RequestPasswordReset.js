import React from "react";
import { useRouter } from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import useForm from "../lib/useForm";
import { useMutation, gql } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;
const RequestReset = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: "",
  });
  const router = useRouter();
  const [resetPassword, { error, loading, data }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: {
        email: inputs.email,
      },

      //refetch currently logged user, so the app knows that we are logged in and NAV renders like logged in
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
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
      <h2>Request a Password Reset</h2>
      {data?.sendUserPasswordResetLink === null && (
        <>
          <p>Success! Check your email for link!</p>
        </>
      )}
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

        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
