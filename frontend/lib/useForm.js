import React from "react";

export default function useForm(initialState = {}) {
  const [inputs, setInputs] = React.useState(initialState);

  const handleChange = (e) => {
    let { value, name, type } = e.target;

    if (type === "number") {
      value = +parseFloat(value).toFixed(2);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    setInputs({ ...inputs, [name]: value });
  };

  const resetForm = () => {
    setInputs(initialState);
  };

  const clearForm = () => {
    //create object from the array
    const blankState = Object.fromEntries(
      //returns array [[key,''],[key,'']]
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  };

  return { inputs, handleChange, resetForm, clearForm };
}
