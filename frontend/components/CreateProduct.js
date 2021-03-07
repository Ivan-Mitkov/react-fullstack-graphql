import React from "react";
import Router from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $price: Int!
    $description: String!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        price: $price
        description: $description
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      description
      price
      status
    }
  }
`;
const CreateProduct = () => {
  const inputRef = React.useRef("");
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const clearFileNameFromInput = () => {
    inputRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createProduct();
    clearForm();
    clearFileNameFromInput();
    //go to products page
    Router.push({ pathname: `/product/${res.data.createProduct.id}` });
  };
  const { name, price, description, image } = inputs;

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Add Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            ref={inputRef}
          />
        </label>
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
        <button type="submit">Add Product</button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
