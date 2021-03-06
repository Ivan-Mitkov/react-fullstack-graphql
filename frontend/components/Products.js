import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import ProductItem from "./ProductItem";
const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      description
      price
      photo {
        id
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;
const Products = () => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  // console.log(error, loading, data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ProductList>
        {data.allProducts.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </ProductList>
    </div>
  );
};

export default Products;
