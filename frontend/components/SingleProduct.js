import React from "react";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
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

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 40px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
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
    <>
      <Head>
        <title>Sick Fits | {name}</title>
      </Head>
      <ProductStyles>
        <img src={publicUrlTransformed} alt={altText}></img>
        <div className="details">
          <h2>{name}</h2>
          <p>{description}</p>
          <p>{formatMoney(price)}</p>
        </div>
      </ProductStyles>
    </>
  );
};

export default SingleProduct;
