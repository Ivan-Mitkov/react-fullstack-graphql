import React from "react";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: "Name",
    price: "",
    description: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const { name, price, description, image } = inputs;

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="image">
          Add Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
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
