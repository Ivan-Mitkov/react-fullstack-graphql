import React from "react";
import useForm from "../lib/useForm";
const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: "Name",
    price: "",
    description: "",
  });
  const { name, price, description } = inputs;

  return (
    <form>
      <label htmlFor="name">
        Name
        <input
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
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleChange}
        />
      </label>
      {/* type button for not refreshing the page */}
      <button type="button" onClick={clearForm}>
        Clear form
      </button>
      <button type="button" onClick={resetForm}>
        Reset form
      </button>
    </form>
  );
};

export default CreateProduct;
