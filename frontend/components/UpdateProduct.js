import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import Router from "next/router";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";
//GRAPHQL
const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $price: Int
    $description: String
  ) {
    updateProduct(
      id: $id
      data: { name: $name, price: $price, description: $description }
    ) {
      id
      name
      description
      price
    }
  }
`;
//COMPONENT
const UpdateProduct = ({ query }) => {
  //1.get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id: query.id,
    },
  });

  //create state for the form inputs
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: data?.Product?.name,
    price: data?.Product?.price,
    description: data?.Product?.description,
  });
  const { name, price, description, image } = inputs;

  //2.get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  //need the form to handle the update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct({
        variables: {
          id: query.id,
          name: inputs.name,
          description: inputs.description,
          price: inputs.price,
        },
      });
      // console.log(res);
      //go to products page
      Router.push({ pathname: `/product/${res.data.updateProduct.id}` });
    } catch (error) {
      throw new Error(error);
    }
    clearForm();
  };
  if (loading) return <p>Loading...</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            required
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Edit Product</button>
      </fieldset>
    </Form>
  );
};

export default UpdateProduct;
