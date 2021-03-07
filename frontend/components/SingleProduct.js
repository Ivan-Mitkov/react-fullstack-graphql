import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { formatMoney } from "../lib/formatMoney";
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

const SingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id: id,
    },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorMessage error={error} />;
  // console.log({ data, loading, error });
  const {
    Product: {
      name,
      description,
      price,
      photo: {
        image: { publicUrlTransformed },
        altText,
      },
    },
  } = data;
  return (
    <div>
      <img src={publicUrlTransformed} alt={altText}></img>
      <div className="details">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{formatMoney(price)}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
