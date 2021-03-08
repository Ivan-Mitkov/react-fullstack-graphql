import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

//!!!!UPDATE APOLLO CACHE
const update = (cache, payload) => {
  console.log(`Running the update function after delete`);
  console.log(payload);
  //payload is what we receive from delete mutation
  //https://www.apollographql.com/docs/react/caching/garbage-collection/#cacheevict
  //https://www.apollographql.com/docs/react/caching/cache-interaction/#obtaining-an-objects-custom-id
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      //clear apollo cash
      update: update,
    }
  );

  const handleClick = async () => {
    if (confirm("Are you sure you want to delete this product")) {
      await deleteProduct().catch((err) => alert(err.message));
    }
  };
  return (
    <button disabled={loading} type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default DeleteProduct;
